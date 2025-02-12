import React, { useContext, useEffect, useRef, useState } from "react";
import { checkForEmptyKeys } from "@/services/InputsNullChecker";
import { Api, ApiFormData } from "@/services/service";
import { IoIosContact } from "react-icons/io";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { useRouter } from "next/router";
import { userContext } from "./_app";
import Head from "next/head";
import ChangePassword from "@/components/changePassword";

function Profile(props) {
  const router = useRouter();
  const [user, setUser] = useContext(userContext);

  const f = useRef(null);
  const [ProfileData, setProfileData] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",

  });

  useEffect(() => {
    profile();
    props.loader(false);
  }, []);

  const profile = () => {
    props.loader(true);
    Api("get", "getProfile", "", router).then(
      (res) => {
        console.log("res================>", res);
        props.loader(false);

        if (res?.status) {
          setProfileData(res?.data);
          setUserDetail({
            name: res?.data?.username,
            email: res?.data?.email,
          });
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

  const submit = () => {
    console.log("User details before submitting:", userDetail);

    let { anyEmptyInputs } = checkForEmptyKeys(userDetail);
    if (anyEmptyInputs.length > 0) {
        console.log("Empty fields detected:", anyEmptyInputs);
        setSubmitted(true);
        return;
    }

    props.loader(true);

    const data = {
      email: userDetail.email.toLowerCase(),
      username: userDetail.name,
  };
    console.log("Data being sent to API:", data);
    Api("post", "updateProfile", data, router).then(
        (res) => {
            console.log("API Response:", res);

            props.loader(false);
            if (res?.status) {

              console.log("Updated user data:", res.data);
              setUserDetail({
                  ...userDetail,
                  email: res.data.email, 
                  name: res.data.username,
              });
                props.toaster({ type: "success", message: res?.data?.message });
            } else {
                console.error("Update failed:", res?.data?.message);
                props.toaster({ type: "error", message: res?.data?.message });
            }
        },
        (err) => {
            console.error("API Error:", err);
            props.loader(false);
            props.toaster({ type: "error", message: err?.data?.message || err?.message });
        }
    );
};

  return (
    <>
      <h1 className="text-black mx-6 my-5 text-2xl font-semibold">
        Edit <span className="text-custom-orange">Profile</span>
      </h1>
      <Head>
        <title>Profile Settings | Update Personal Info </title>
        <meta
          name="description"
          content="Edit your personal information, update contact details, and manage account settings easily through your ADN Cleaning profile page."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_STRIPE_API_PORT}/myProfile/profile/`}
          key="canonical"
        />
      </Head>
      <div className="bg-white w-full h-full  px-2 md:px-0  flex flex-col justify-center items-center my-8">
        <div className="w-full mx-auto max-w-[500px] flex flex-col  justify-center items-center self-center  rounded-xl shadow-xl  p-2">
          <div className="flex justify-center items-center md:pt-5 pt-5 pb-5">
            <h1 className="text-black text-3xl	font-nunito font-bold	">
              My Profile
            </h1>
          </div>


          <div className="md:px-4 px-2 py-2 self-center rounded-xl w-full">
            <div className="mr-2 relative w-full  sm:pb-0 pb-1 flex rounded-2xl  justify-start items-center border outline-custom-orange ">
              <IoIosContact className=" text-custom-gray h-5 w-5 ml-2" />
              <input
                className=" w-full pl-2  text-black  sm:text-lg text-sm rounded-2xl sm:py-4 py-2 outline-none"
                placeholder="Name"
                value={userDetail.name}
                onChange={(text) => {
                  setUserDetail({ ...userDetail, name: text.target.value });
                }}
              />
            </div>
            {submitted && userDetail.name === "" && (
              <p className="text-red-700 mt-1">Name is required</p>
            )}

            <div className="mr-2 relative w-full  sm:pb-0 pb-1 flex rounded-2xl  justify-start items-center border outline-custom-orange mt-4">
              <AiOutlineMail className=" text-custom-gray h-5 w-5 ml-2" />
              <input
                className=" w-full pl-2  text-black  sm:text-lg text-sm rounded-2xl sm:py-4 py-2 outline-none"
                placeholder="Email"
                value={userDetail.email}
                onChange={(text) => {
                  setUserDetail({ ...userDetail, email: text.target.value });
                }}
              />
            </div>
            {submitted && userDetail.email === "" && (
              <p className="text-red-700 mt-1">Email is required</p>
            )}

            <div className="flex justify-center items-center mt-5">
              <button
                onClick={submit}
                type="button"
                className="text-white bg-custom-purple text-[20px]  font-nunito   text-center md:h-14 h-10 w-full rounded-2xl"
              >
                Update
              </button>
            </div>
          </div>
        </div>

        <ChangePassword {...props} />
      </div>
    </>
  );
}

export default Profile;
