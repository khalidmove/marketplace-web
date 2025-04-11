import React, { useState } from "react";
import { useRouter } from "next/router";
import { Api } from "@/services/service";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

function signUp(props) {
  const router = useRouter();
  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    referal: "",
    phoneNumber: "",
    password: "",
  });
  const [eyeIcon, setEyeIcon] = useState(false);

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const submit = (e) => {
    e.preventDefault();

    if (
      userDetail.name === "" ||
      userDetail.phoneNumber === "" ||
      userDetail.password === "" ||
      userDetail.email === ""
    ) {
      props.toaster({ type: "error", message: "Please fill all fields" });
      return;
    }
    if (userDetail.password.length < 6) {
      props.toaster({
        type: "error",
        message: "Password should be at least 8 characters",
      });
      return;
    }

    if (userDetail.phoneNumber.length < 10) {
      props.toaster({
        type: "error",
        message: "Phone number should be at least 10 digits",
      });
      return;
    }

    // if (userDetail.referal.length < 12) {
    //   props.toaster({
    //     type: "error",
    //     message: "Referral code should be at least 12 characters",
    //   });
    //   return;
    // }

    if (!regex.test(userDetail.email)) {
      props.toaster({ type: "error", message: "Please enter a valid email" });
      return;
    }

    props.loader(true);
    const data = {
      email: userDetail.email.toLowerCase(),
      username: userDetail.name,
      referal: userDetail.referal,
      password: userDetail.password,
      number: userDetail.phoneNumber,
      type: "USER",
    };
    Api("post", "signUp", data, router).then(
      (res) => {
        console.log("res================>", res);
        props.loader(false);

        if (res?.success) {
          router.push("/auth/signIn");
          setUserDetail({
            name: "",
            email: "",
            referal: "",
            phoneNumber: "",
            password: "",
          });
          props.toaster({ type: "success", message: "Register successfully" });
        } else {
          console.log(res?.data?.message);
          props.toaster({ type: "error", message: res?.data?.message });
        }
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  return (
    <>
      <div className="bg-white w-full">
        <section className="bg-white w-full relative flex flex-col justify-center items-center">
          <div className="max-w-7xl mx-auto w-full px-1 md:px-6 2xl:px-0 md:pt-10 pt-5">
            <p className="text-custom-black md:text-[64px]  text-2xl font-bold md:leading-[80px]">
              Welcome
            </p>
            <p className="text-custom-newGrayColor font-normal md:text-xl text-base">
              Please enter your sign up details.
            </p>
            {/* <div className="bg-custom-gray w-full rounded-[20px] border border-black md:p-10 p-5"> */}
            <form
              className="grid md:grid-cols-2 grid-cols-1 w-full md:gap-0 gap-5 md:pt-10 pt-5"
              onSubmit={submit}
            >
              <div className="md:flex justify-end items-center hidden">
                <img className="h-[550px] object-contain" src="/image-1.png" />
              </div>

              <div className="flex flex-col justify-center border border-black rounded-[15px] md:p-10 p-5">
                <p className="md:text-3xl text-2xl text-black font-bold  md:pb-10 pb-5 text-center">
                  Sign up
                </p>
                <input
                  className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-black font-normal md:text-lg text-base text-black outline-none mb-5"
                  type="text"
                  placeholder="Name"
                  required
                  value={userDetail.name}
                  onChange={(text) => {
                    setUserDetail({
                      ...userDetail,
                      name: text.target.value,
                    });
                  }}
                />

                <input
                  className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-black font-normal md:text-lg text-base text-black outline-none mb-5"
                  type="text"
                  placeholder="Email"
                  required
                  value={userDetail.email}
                  onChange={(text) => {
                    setUserDetail({
                      ...userDetail,
                      email: text.target.value,
                    });
                  }}
                />

                <input
                  className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-black font-normal md:text-lg text-base text-black outline-none mb-5"
                  type="text"
                  placeholder="Referral"
                  value={userDetail.referal}
                  onChange={(text) => {
                    setUserDetail({
                      ...userDetail,
                      referal: text.target.value,
                    });
                  }}
                  maxLength={12}
                />

                <input
                  className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-black font-normal md:text-lg text-base text-black outline-none mb-5"
                  type="number"
                  placeholder="Phone Number"
                  required
                  value={userDetail.phoneNumber}
                  onChange={(text) => {
                    setUserDetail({
                      ...userDetail,
                      phoneNumber: text.target.value,
                    });
                  }}
                />
                <div className="relative">
                  <input
                    className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[5px] border border-black font-normal md:text-lg text-base text-black outline-none"
                    placeholder="*********"
                    required
                    type={!eyeIcon ? "password" : "text"}
                    value={userDetail.password}
                    onChange={(text) => {
                      setUserDetail({
                        ...userDetail,
                        password: text.target.value,
                      });
                    }}
                  />
                  <div className="absolute top-[10px] right-[12px]">
                    {!eyeIcon && (
                      <IoEyeOffOutline
                        className="w-[20px] h-[20px] text-custom-gray"
                        onClick={() => {
                          setEyeIcon(true);
                        }}
                      />
                    )}
                    {eyeIcon && (
                      <IoEyeOutline
                        className="w-[20px] h-[20px] text-custom-gray"
                        onClick={() => {
                          setEyeIcon(false);
                        }}
                      />
                    )}
                  </div>
                </div>

                <button
                  // disabled={
                  //   userDetail.name === "" ||
                  //   userDetail.phoneNumber === "" ||
                  //   userDetail.password === "" ||
                  //   !regex.test(userDetail.email)
                  // }
                  className="bg-custom-purple md:h-[50px] h-[40px] w-full rounded-[10px] font-bold md:text-xl text-base text-white md:mb-10 mb-5 mt-5 disabled:bg-opacity-50"
                  type="submit"
                >
                  Sign up
                </button>
                <p className="md:text-lg text-base text-custom-darkGray font-normal Lato">
                  Already have an account{" "}
                  <span
                    className="font-bold text-custom-purple cursor-pointer"
                    onClick={() => {
                      router.push("/auth/signIn");
                    }}
                  >
                    sign in
                  </span>
                </p>
              </div>
            </form>
            {/* </div> */}
          </div>
        </section>
      </div>
    </>
  );
}

export default signUp;
