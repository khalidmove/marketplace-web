import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { userContext, languageContext } from './_app';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { PiSignOutFill } from 'react-icons/pi';
import { useTranslation } from "react-i18next";

function Account() {
    const router = useRouter();
    const [user, setUser] = useContext(userContext);
    const [globallang, setgloballang] = useContext(languageContext);
    const [lang, setLang] = useState(null);
    const { i18n, t } = useTranslation();

    useEffect(() => {
        // Get language from localStorage or default to 'en'
        const savedLang = localStorage.getItem("LANGUAGE") || "en";
        setLang(savedLang);
        i18n.changeLanguage(savedLang);
        setgloballang(savedLang);
    }, []);

    const logOut = () => {
        setUser({});
        localStorage.removeItem('userDetail');
        localStorage.removeItem('token');
        router.push('/auth/signIn');
    };

    const handleClick = (language) => {
        try {
            setLang(language);
            i18n.changeLanguage(language);
            setgloballang(language);
            localStorage.setItem("LANGUAGE", language);
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className='w-full px-5 pt-5'>
            <div className='flex justify-start items-center gap-5'>
                {user?.username ? (
                    <div className='bg-custom-purple h-[40px] w-[40px] rounded-full flex justify-center items-center'>
                        <p className="font-bold text-white text-base text-center capitalize">
                            {user.username.charAt(0).toUpperCase()}
                        </p>
                    </div>
                ) : (
                    <button
                        className='bg-custom-purple rounded-[20px] h-[40px] w-[180px] text-white text-base font-normal'
                        onClick={() => router.push('/auth/signIn')}
                    >
                        {t("Sign in or Register")}
                    </button>
                )}

                <div className='w-[40px] h-[40px] bg-custom-purple rounded-full flex justify-center items-center' onClick={logOut}>
                    <PiSignOutFill className='text-white w-[23px] h-[23px]' />
                </div>

                <div className="md:hidden flex border border-black">
                    <select
                        className="bg-white w-full font-normal text-sm text-black outline-none p-1.5 cursor-pointer"
                        value={lang}
                        onChange={(e) => handleClick(e.target.value)}
                    >
                        <option value="en">English</option>
                        <option value="ku">Kurdish</option>
                        <option value="ar">Arabic</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Account;
