import React, { useState } from 'react'
import { useRouter } from "next/router";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { Api } from '@/services/service';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
function forgotPassword(props) {
    const router = useRouter();
    const {t} = useTranslation()
    const [eyeIcon, setEyeIcon] = useState(false);
    const [eyeIcons, setEyeIcons] = useState(false);
    const [showEmail, setShowEmail] = useState(true);
    const [email, setEmail] = useState("");
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [token, setToken] = useState();

    const sendOtp = () => {
        if (email === "") {
            props.toaster({ type: "error", message: "Email is required" });
            return;
        }

        const data = {
            email: email,
        };
        console.log(data);
        props.loader(true);
        Api("post", "sendOTP", data, router).then(
            (res) => {
                console.log("res================>", res);
                props.loader(false);

                if (res?.status) {
                    setShowEmail(false);
                    setShowOtp(true);
                    setShowPassword(false);
                    setToken(res?.data?.token);
                    props.toaster({ type: "success", message: res?.data?.message });
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

    const verifyOtp = () => {
        if (otp === "") {
            props.toaster({ type: "error", message: "OTP is required" });
            return;
        }

        const data = {
            otp,
            token,
        };

        console.log(data);
        props.loader(true);
        Api("post", "verifyOTP", data, router).then(
            (res) => {
                console.log("res================>", res);
                props.loader(false);

                if (res?.status) {
                    setShowEmail(false);
                    setShowOtp(false);
                    setShowPassword(true);
                    setToken(res?.data?.token);
                    props.toaster({ type: "success", message: res?.data?.message });
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

    const Submit = () => {
        if (confirmPassword !== password) {
            props.toaster({
                type: "error",
                message: "Your password is not matched with confirm password",
            });
            return;
        }

        if (password === "") {
            props.toaster({ type: "error", message: "New Password is required" });
            return;
        }
        if (confirmPassword === "") {
            props.toaster({ type: "error", message: "Confirm Password is required" });
            return;
        }

        const data = {
            password,
            token,
        };
        Api("post", "changePassword", data, router).then(
            (res) => {
                console.log("res================>", res);
                props.loader(false);

                if (res?.status) {
                    setShowEmail(true);
                    setShowOtp(false);
                    setShowPassword(false);
                    props.toaster({ type: "success", message: res?.data?.message });
                    router.push("/auth/signIn");
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
                        <p className='text-custom-black md:text-[64px]  text-2xl font-bold md:leading-[80px]'>{t("Welcome")}</p>
                        <p className='text-custom-newGrayColor font-normal md:text-xl text-base'>
                            {t("Please enter your forgot password details")}.</p>
                        {/* <div className="bg-custom-gray w-full rounded-[20px] border border-black md:p-10 p-5"> */}
                        <div className="grid md:grid-cols-2 grid-cols-1 w-full md:gap-0 gap-5 md:pt-10 pt-5">
                            <div className='md:flex justify-start items-center hidden'>
                                <img className='h-96 object-contain' src='/image-1.png' />
                            </div>
                            <div className="flex flex-col justify-center border border-black rounded-[15px] md:p-10 p-5">
                                <p className="md:text-3xl text-2xl text-black font-bold md:pb-10 pb-5 text-center">{t("Forgot Password")}</p>

                                {showEmail && (<input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-black font-normal md:text-lg text-base text-black outline-none mb-5" type="text" placeholder={t("Email")}
                                    value={email}
                                    onChange={(text) => {
                                        setEmail(text.target.value);
                                    }}
                                />)}

                                {showOtp && (<input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-black font-normal md:text-lg text-base text-black outline-none mb-5" type="number" placeholder={t("OTP")}
                                    value={otp}
                                    onChange={(text) => {
                                        setOtp(text.target.value);
                                    }} />)}


                                {showPassword && (<div>
                                    <div className='relative'>
                                        <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-black font-normal md:text-lg text-base text-black outline-none mb-10" placeholder={t("New Password")}
                                            type={!eyeIcon ? "password" : "text"}
                                            value={password}
                                            onChange={(text) => {
                                                setPassword(text.target.value);
                                            }}
                                        />
                                        <div className='absolute top-[10px] right-[12px]'>
                                            {!eyeIcon && <IoEyeOffOutline className='w-[20px] h-[20px] text-custom-gray' onClick={() => { setEyeIcon(true); }} />}
                                            {eyeIcon && <IoEyeOutline className='w-[20px] h-[20px] text-custom-gray' onClick={() => { setEyeIcon(false); }} />}
                                        </div>
                                    </div>

                                    <div className='relative'>
                                        <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-black font-normal md:text-lg text-base text-black outline-none mb-10" placeholder={t("Confirm Password")}
                                            type={!eyeIcons ? "password" : "text"}
                                            value={confirmPassword}
                                            onChange={(text) => {
                                                setConfirmPassword(text.target.value);
                                            }}
                                        />
                                        <div className='absolute top-[14px] right-[12px]'>
                                            {!eyeIcons && <IoEyeOffOutline className='w-[20px] h-[20px] text-custom-gray' onClick={() => { setEyeIcons(true); }} />}
                                            {eyeIcons && <IoEyeOutline className='w-[20px] h-[20px] text-custom-gray' onClick={() => { setEyeIcons(false); }} />}
                                        </div>
                                    </div>
                                </div>)}

                                {showEmail && (<button className="bg-custom-purple md:h-[50px] h-[40px] w-full rounded-[10px] font-bold md:text-xl text-base text-white md:mb-10 mb-5" onClick={sendOtp}>{t("Send OTP")}</button>)}
                                {showOtp && (<button className="bg-custom-purple md:h-[50px] h-[40px] w-full rounded-[10px] font-bold md:text-xl text-base text-white md:mb-10 mb-5" onClick={verifyOtp}>{t("Verify")}</button>)}
                                {showPassword && (<button className="bg-custom-purple md:h-[50px] h-[40px] w-full rounded-[10px] font-bold md:text-xl text-base text-white md:mb-10 mb-5" onClick={Submit}>{t("Submit")}</button>)}
                                <p className="md:text-lg text-base text-custom-darkGray font-normal">
                                    {t("Already have an account")} <span className="font-bold text-custom-purple cursor-pointer" onClick={() => {
                                        router.push("/auth/signIn");
                                    }}>{t("sign in")}</span>
                                </p>
                            </div>

                        </div>
                        {/* </div> */}
                    </div>
                </section>
            </div>
        </>
    )
}

export default forgotPassword
