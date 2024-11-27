import React from 'react'
import { FiShoppingCart } from "react-icons/fi";
import { RiHistoryFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { TbCategory } from "react-icons/tb";

function MobileFooter() {
    const router = useRouter();

    return (
        <div className='bg-white w-full h-14 grid grid-cols-4'>
            <div className='flex flex-col justify-center items-center'>
                <IoHomeOutline className='w-[20px] h-[20px] text-black' onClick={() => { router.push('/') }} />
                <p className='text-black font-normal text-xs'>Home</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <FiShoppingCart className='w-[20px] h-[20px] text-black' onClick={() => { router.push('/cart') }} />
                <p className='text-black font-normal text-xs'>Cart</p>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <TbCategory className='w-[20px] h-[20px] text-black' onClick={() => { router.push('/') }} />
                <p className='text-black font-normal text-xs'>Categories</p>
                {/* onClick={() => { router.push('/categoriesMobileView') }} */}
            </div>
            <div className='flex flex-col justify-center items-center'>
                <CgProfile className='w-[20px] h-[20px] text-black' onClick={() => { router.push('/') }} />
                <p className='text-black font-normal text-xs'>Account</p>
                {/* onClick={() => { router.push('/account') }} */}
            </div>
        </div>
    )
}

export default MobileFooter
