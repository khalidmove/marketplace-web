import React, { useContext, useState } from 'react'
import { useRouter } from "next/router";
import { Api } from '@/services/service';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { userContext } from '../_app';
import Head from 'next/head';
import { useTranslation } from "react-i18next";

function signIn(props) {
    const router = useRouter();
    const [userDetail, setUserDetail] = useState({
        email: "",
        password: "",
    });
    const [user, setUser] = useContext(userContext);
    const [eyeIcon, setEyeIcon] = useState(false);
    const { t } = useTranslation()
    const submit = (e) => {
        e.preventDefault();
        const data = {
            username: userDetail.email.toLowerCase(),
            password: userDetail.password,
        };
        props.loader(true);
        Api("post", "login", data, router).then(
            (res) => {
                console.log("res================>", res);
                props.loader(false);

                if (res?.status) {
                    router.push("/");
                    localStorage.setItem("userDetail", JSON.stringify(res.data));
                    localStorage.setItem("token", res.data.token);
                    setUser(res.data)
                    setUserDetail({
                        email: "",
                        password: "",
                    });
                    props.toaster({ type: "success", message: 'You are successfully logged in' });

                } else {
                    console.log(res?.data?.message);
                    props.toaster({ type: "error", message: res?.data?.message });
                }
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.data?.message });
                props.toaster({ type: "error", message: err?.message });
            }
        );
    };

    return (
        <>


            <div className="bg-white w-full">
                <section className="bg-white w-full  relative flex flex-col justify-center items-center">
                    <div className="max-w-7xl mx-auto w-full px-1 md:px-6 2xl:px-0 md:pt-10 pt-5">
                        <p className='text-custom-black md:text-[64px]  text-2xl font-bold md:leading-[80px]'>
                            {t('Welcome')}</p>
                        <p className='text-custom-newGrayColor font-normal md:text-xl text-base'>
                            {t("Please enter your sign in details")}.</p>
                        {/* <div className="bg-white w-full rounded-[20px] border border-black md:p-10 p-5"> */}
                        <form className="grid md:grid-cols-2 grid-cols-1 w-full md:gap-0 gap-5 md:pt-10 pt-5" onSubmit={submit}>
                            <div className='md:flex justify-start items-center hidden'>
                                <img className='h-96 object-contain' src='/image-1.png' />
                            </div>
                            <div className="flex flex-col justify-center border border-black rounded-[15px] md:p-10 p-5">
                                <p className="md:text-3xl text-2xl text-black font-bold md:pb-10 pb-5 text-center">{t("Sign in")}</p>
                                <input autoFocus className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-black font-medium md:text-lg text-base text-black outline-none mb-5" type="text" placeholder="demo@gmail.com"
                                    required
                                    value={userDetail.email}
                                    onChange={(text) => {
                                        setUserDetail({
                                            ...userDetail,
                                            email: text.target.value,
                                        });
                                    }} />
                                <div className='relative'>
                                    <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-black font-medium md:text-lg text-base text-black outline-none mb-2" placeholder="*********"
                                        required
                                        type={!eyeIcon ? "password" : "text"}
                                        value={userDetail.password}
                                        onChange={(text) => {
                                            setUserDetail({
                                                ...userDetail,
                                                password: text.target.value,
                                            });
                                        }} />
                                    <div className='absolute top-[14px] right-[12px]'>
                                        {!eyeIcon && <IoEyeOffOutline className='w-[20px] h-[20px] text-custom-gray' onClick={() => { setEyeIcon(true); }} />}
                                        {eyeIcon && <IoEyeOutline className='w-[20px] h-[20px] text-custom-gray' onClick={() => { setEyeIcon(false); }} />}
                                    </div>
                                </div>
                                <div className="flex justify-end items-end">
                                    <p className="md:text-lg text-base text-black font-medium cursor-pointer md:mb-10 mb-5"
                                        onClick={() => {
                                            router.push("/auth/forgotPassword");
                                        }}>
                                       {t("Forgot Password?")} 
                                    </p>
                                </div>
                                <button className="bg-custom-purple md:h-[50px] h-[40px] w-full rounded-[5px] font-bold md:text-xl text-base text-white md:mb-10 mb-5" type="submit">{t("Sign in")}</button>
                                <p className="md:text-lg text-base text-custom-darkGray font-medium">
                                    {t("Didn’t have an account")}  <span className="font-bold text-custom-purple cursor-pointer" onClick={() => {
                                        router.push("/auth/signUp");
                                    }}>{t("sign up")}</span>
                                </p>
                            </div>

                        </form>
                        {/* </div> */}
                    </div>
                </section>
            </div>
        </>
    )
}

export default signIn
