import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { Api } from "@/services/service";
import { useRouter } from "next/router";
import { validateEmailAddress, validateMobileNumber } from "@/services/validator";

function contactUs(props) {
  const router = useRouter();
  const [getInTouchData, setGetInTouchData] = useState({
    firstName: "",
    email: "",
    phoneNumber: "",
    description: "",
    reason: ""
  });

  const submit = (e) => {
      e.preventDefault();
      if (!getInTouchData?.firstName || !getInTouchData?.email || !getInTouchData?.phoneNumber || !getInTouchData?.description) {
          props.toaster({ type: "error", message: "All field are required !" });
          return
      }
      if (!validateEmailAddress(getInTouchData?.email, props.toaster)) return;
      if (!validateMobileNumber(getInTouchData?.phoneNumber, props.toaster)) return;

    props.loader(true);
    const data = {
      first_name: getInTouchData.firstName,
      email: getInTouchData.email.toLowerCase(),
      phone: getInTouchData.phoneNumber,
      description: getInTouchData.description,
      reason: getInTouchData.reason
    };
    Api("post", "getInTouch", data, router).then(
      (res) => {
        console.log("res================>", res);
        props.loader(false);

        if (res?.status) {
          setGetInTouchData({
            firstName: "",
            email: "",
            phoneNumber: "",
            description: "",
            reason: ""
          });
          props.toaster({
            type: "success",
            message:
              "Thank you for your message. We'll get back to you within 24 hours.",
          });
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
    <div className="bg-white w-full">
      <section className="bg-white w-full flex flex-col justify-center items-center">
        <div className="max-w-7xl mx-auto w-full md:px-0 px-5 md:pt-10 pt-5">
          <div className="flex flex-col justify-center items-center">
            <p className="text-black font-semibold md:text-4xl text-2xl text-center">
              Get In Touch With Us
            </p>
            <p className="text-custom-newGray font-normal text-base md:pt-5 pt-2 md:w-[560px] text-center">
              For More Information About Our Product & Services. Please Feel
              Free To Drop Us An Email. Our Staff Always Be There To Help You
              Out. Do Not Hesitate!
            </p>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 w-full md:pt-10 pt-5">
            <div className="flex flex-col justify-start md:items-center items-start">
              <div>
                <div className="flex justify-start items-center">
                  <FaLocationDot className="md:w-[22px] w-[15px] md:h-[22px] h-[15px] text-black" />
                  <p className="text-black md:text-2xl text-lg font-medium ml-5">
                    Address
                  </p>
                </div>
                <p className="text-black font-normal text-base pt-2 w-[180px] ml-10">
                  236 5th SE Avenue, New York NY10000, United States
                </p>
              </div>
              <div className="pt-5">
                <div className="flex justify-start items-center">
                  <FaPhoneAlt className="md:w-[22px] w-[15px] md:h-[22px] h-[15px] text-black" />
                  <p className="text-black md:text-2xl text-lg font-medium ml-5">
                    Phone
                  </p>
                </div>
                <p className="text-black font-normal text-base pt-2 w-[180px] ml-10">
                  Mobile: +(84) 546-6789
                </p>
                <p className="text-black font-normal text-base pt-2 w-[180px] ml-10">
                  Hotline: +(84) 456-6789
                </p>
              </div>
            </div>

            <form className="md:pt-0 pt-5 relative" onSubmit={submit}>
              <div className="w-full">
                <p className="text-black font-normal  text-base">First Name</p>
                <input
                  className="bg-white md:w-[428px] w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none md:my-5 my-3"
                  type="text"
                  placeholder="Abc"
                  required
                  value={getInTouchData.firstName}
                  onChange={(text) => {
                    setGetInTouchData({
                      ...getInTouchData,
                      firstName: text.target.value,
                    });
                  }}
                />
              </div>

              <div className="w-full">
                <p className="text-black font-normal  text-base">
                  Phone Number
                </p>
                <input
                  className="bg-white md:w-[428px] w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none md:my-5 my-3"
                  type="number"
                  placeholder="Phone number"
                  required
                  value={getInTouchData.phoneNumber}
                  onChange={(text) => {
                    setGetInTouchData({
                      ...getInTouchData,
                      phoneNumber: text.target.value,
                    });
                  }}
                />
              </div>

              <div className="w-full">
                <p className="text-black font-normal  text-base">
                  Email address
                </p>
                <input
                  className="bg-white md:w-[428px] w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none md:my-5 my-3"
                  type="text"
                  placeholder="Abc@def.com"
                  required
                  value={getInTouchData.email}
                  onChange={(text) => {
                    setGetInTouchData({
                      ...getInTouchData,
                      email: text.target.value,
                    });
                  }}
                />
              </div>

              <div className="w-full">
                <p className="text-black font-normal  text-base">
                  Reason
                </p>
                <select
                  className="bg-white md:w-[428px] w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none md:my-5 my-3"
                  type="text"
                  placeholder="Abc@def.com"
                  required
                  value={getInTouchData.reason}
                  onChange={(text) => {
                    setGetInTouchData({
                      ...getInTouchData,
                      reason: text.target.value,
                    });
                  }}
                >
                  <option hidden value="">Select Reason</option>
                  <option value="Product Inquiry">Product Inquiry</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="w-full">
                <p className="text-black font-normal  text-base">Message</p>
                <textarea
                  className="bg-white md:w-[428px] w-full px-5 py-2 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none md:my-5 my-3"
                  rows={4}
                  placeholder="Hi! i’d like to ask about"
                  value={getInTouchData.description}
                  onChange={(e) => {
                    setGetInTouchData({
                      ...getInTouchData,
                      description: e.target.value,
                    });
                  }}
                  required
                />
              </div>
              <div className="flex md:justify-start justify-center">
                <button
                  className="bg-custom-purple w-[237px] md:h-[50px] h-[40px] rounded-[5px] text-white font-normal text-base"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default contactUs;
