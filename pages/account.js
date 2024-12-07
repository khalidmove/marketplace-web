import React, { useContext } from 'react'
import { useRouter } from "next/router";
import { userContext } from './_app';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { PiSignOutFill } from 'react-icons/pi'

function Account() {
    const router = useRouter();
    const [user, setUser] = useContext(userContext);

    const logOut = () => {
        setUser({});
        localStorage.removeItem('userDetail');
        localStorage.removeItem('token');
        router.push('/auth/signIn')
    }

    return (
        <div className='w-full px-5 pt-5'>
            <div className='flex justify-start items-center gap-5'>
                {user?.username && <div className='bg-custom-purple h-[40px] w-[40px] rounded-full flex justify-center items-center'>
                    <p className="font-bold text-white text-base text-center capitalize">
                        {user?.username
                            ?.charAt(0)
                            .toUpperCase()}
                    </p>
                </div>}
                {!user?.username && <button className='bg-custom-purple rounded-[20px] h-[40px] w-[180px] text-white text-base font-normal' onClick={() => { router.push('/auth/signIn') }}>Sign in or Register</button>}
                {/* {user?.username && <div className='w-[40px] h-[40px] bg-custom-purple rounded-full flex justify-center items-center' onClick={() => { router.push('/favourite') }}>
                    <FaRegHeart className='text-white w-[23px] h-[23px]' />
                </div>} */}
                <div className='w-[40px] h-[40px] bg-custom-purple rounded-full flex justify-center items-center' onClick={() => { logOut() }}>
                    <PiSignOutFill className='text-white w-[23px] h-[23px]' />
                </div>
            </div>
        </div>
    )
}

export default Account
