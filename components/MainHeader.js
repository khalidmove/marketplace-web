// import { asstes } from "../assets/assets";
import { Api } from "@/services/service";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useRouter } from "next/router";

function MainHeader(props) {
  const router = useRouter();
  const [userDetail, setUserDetail] = useState({
    subscriber: "",
  });

  const addSubscriber = (e) => {
    e.preventDefault();
    props.loader(true);
    const data = {
      email: userDetail?.subscriber,
      // type: ""
    }
    Api("post", "add-subscriber", data, router).then(
      (res) => {
        console.log("res================>", res);
        props.loader(false);
        if (res?.status) {
          setUserDetail({
            subscriber: "",
          });
          props.toaster({ type: "success", message: res?.data?.message });
        }
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.data?.message });
      }
    );
  };

  return (
    <div className="bg-[url('/backgroundImg.png')] bg-cover bg-no-repeat w-full md:h-[477px]">
      <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-5 max-w-7xl  mx-auto h-full px-1 md:px-6 2xl:px-0">
        <div className="flex flex-col justify-center items-start md:p-0 p-5">
          <p className="md:text-[55px] text-2xl font-bold text-custom-purple md:leading-[60px]">Don’t miss our daily amazing deals.</p>
          <p className="text-custom-purple font-medium md:text-xl text-base	pt-5">
            Save up to 60% off on your first order
          </p>
          <form className="flex flex-col md:flex-row items-center relative pt-5 w-full" onSubmit={addSubscriber}>
            <div className="relative md:w-[350px] w-full">
            <p className="absolute pl-2 top-1/2 -translate-y-1/2"><FiSend color="#35035C" className="text-custom-purple" /></p>
            <input
              type="email"
              placeholder="Enter your email address"
              className="text-black font-medium text-sm md:h-[52px] h-[40px] md:w-[350px] w-full md:pr-10 md:pl-10  pl-8 outline-none"
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+" title="Invalid email address"
              required={true}
              value={userDetail.subscriber}
              onChange={(text) => {
                setUserDetail({ ...userDetail, subscriber: text.target.value });
              }} />
            </div>
            <button className=" bg-custom-purple md:h-[52px] h-[40px] w-full md:w-auto px-5 text-white font-semibold text-base" type='submit'>Subscribe</button>
          </form>
        </div>
      </div>

    </div>
  );
}

export default MainHeader;
