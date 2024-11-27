import { PiCirclesFourLight } from "react-icons/pi";
import { FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";
import { FiHome } from "react-icons/fi";
import { useRouter } from "next/router";
import { useState } from "react";
import { TiArrowSortedUp } from "react-icons/ti";
import { IoIosArrowBack } from "react-icons/io";

function HeaderFirst() {
  const router = useRouter();
  const [showHover, setShowHover] = useState(true);

  return (
    <div className="w-full md:border-b border-b-0 border-b-gray-400">
      <div className="max-w-7xl  mx-auto w-full bg-white">
        <div className="hidden lg:flex justify-between my-2 ">
          <div className="relative group" onClick={() => { setShowHover(true) }} >
            <button className="h-[52px] rounded-[2px] bg-custom-purple font-semibold text-white text-base flex justify-center items-center px-5">
              <PiCirclesFourLight className="w-[35px] h-[35px] text-white" />
              <span className="ml-5">Browse All Categories</span>
            </button>
            {/* onClick={() => { router.push('/categoriesList') }} */}

            {showHover && (

              <div
                className={` lg:absolute top-[34px] right-0 lg:min-w-[265px] group-hover:text-black   hidden group-hover:lg:block hover:lg:block md:z-40`}
              >
                <div className="bg-custom-purple  lg:shadow-inner z-10 rounded-md lg:mt-8 shadow-inner">
                  <TiArrowSortedUp
                    className={`group-hover:lg:block lg:hidden h-5 w-5 text-custom-purple  absolute top-5 right-0`}
                  />
                  <div>
                    <div className="px-5 py-2 shadow-inner feature1 border-b-2 border-white flex justify-between items-center" onClick={() => { router.push('/categoriesList') }}>
                      <p className="text-white text-base	font-normal">Grocery & Kitchen</p>
                      <IoIosArrowBack className="w-[22px] h-[22px] text-white rotate-180" />
                    </div>

                    <div className="px-5 py-2 shadow-inner feature1 border-b-2 border-white flex justify-between items-center">
                      <p className="text-white text-base	font-normal">Snacks & Drinks</p>
                      <IoIosArrowBack className="w-[22px] h-[22px] text-white rotate-180" />
                    </div>

                    <div className="px-5 py-2 shadow-inner feature1 border-b-2 border-white flex justify-between items-center">
                      <p className="text-white text-base	font-normal">Beauty & Personal care</p>
                      <IoIosArrowBack className="w-[22px] h-[22px] text-white rotate-180" />
                    </div>

                    <div className="px-5 py-2 shadow-inner feature1 border-b-2 border-white flex justify-between items-center">
                      <p className="text-white text-base	font-normal">Household Essentials</p>
                      <IoIosArrowBack className="w-[22px] h-[22px] text-white rotate-180" />
                    </div>

                    <div className="px-5 py-2 shadow-inner feature1 border-b-2 border-white flex justify-between items-center">
                      <p className="text-white text-base	font-normal">Electronics</p>
                      <IoIosArrowBack className="w-[22px] h-[22px] text-white rotate-180" />
                    </div>

                    <div className="px-5 py-2 shadow-inner feature1 border-b-2 border-white flex justify-between items-center">
                      <p className="text-white text-base	font-normal">Packaged Food</p>
                      <IoIosArrowBack className="w-[22px] h-[22px] text-white rotate-180" />
                    </div>

                    <div className="px-5 py-2 shadow-inner feature1 flex justify-between items-center">
                      <p className="text-white text-base	font-normal">Toys & Sports</p>
                      <IoIosArrowBack className="w-[22px] h-[22px] text-white rotate-180" />
                    </div>

                    {/* <li className="px-5 py-2 shadow-inner feature1 border-b-2 border-white">
                      <Link
                        href={"https://main.d3u137s4z5bz92.amplifyapp.com/"}
                        target="_blank"
                        onClick={() => {
                          setShowHover(false);
                        }}
                        className="block px-5  py-1  pl-0  text-white text-left font-semibold text-base"
                        aria-current="page"
                      >
                        {("My Store")}
                      </Link>
                    </li>

                    <li className="px-5 py-2 shadow-inner feature1 border-b-2 border-white">
                      <Link
                        href={"/favourite"}
                        // target="_blank"
                        onClick={() => {
                          setShowHover(false);
                        }}
                        className="block px-5  py-1  pl-0  text-white text-left font-semibold text-base"
                        aria-current="page"
                      >
                        {("My Favourite")}
                      </Link>
                    </li>

                    <li className="px-5 shadow-inner feature1  py-2">
                      <div
                        onClick={() => {
                          Swal.fire({
                            title: "Are you sure?",
                            text: "Do you want to signout?",
                            icon: "warning",
                            showCancelButton: true,
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes",
                            cancelButtonText: "No",
                          }).then(function (result) {
                            if (result.isConfirmed) {
                              setUser({})
                              setShowHover(false);
                              localStorage.removeItem(
                                "userDetail"
                              );
                              localStorage.removeItem("token");
                              router.push('/auth/signIn')
                            }
                          })
                        }}

                        className="block px-5 py-1  pl-0 text-white text-left font-semibold text-base"
                        aria-current="page"
                      >
                        {("Sign out")}
                      </div>
                    </li> */}
                  </div>
                </div>
              </div>
            )}


          </div>
          <div>
            <ul className="flex items-center gap-8 my-2">
              <div className="flex items-center">
                <FiHome className="w-5 h-5 text-custom-purple" />
                <Link className="text-custom-purple text-base font-medium cursor-pointer ml-2" href={"/"}>
                  Home
                </Link>
              </div>
              <div className="flex items-center">
                <img className="w-5 h-5 object-contain" src="/referalImg.png" />
                <Link className="text-custom-darkGray text-base font-medium cursor-pointer ml-2" href={"/referal"}>
                  Referal
                </Link>
              </div>
              <div className="flex items-center">
                <img className="w-5 h-5 object-contain" src="/aboutUsImg.png" />
                <Link className="text-custom-darkGray text-base font-medium cursor-pointer ml-2" href={"/"}>
                  Categories
                </Link>
              </div>
              <div className="flex items-center">
                <img className="w-5 h-5 object-contain" src="/liveChatImg.png" />
                <Link className="text-custom-darkGray text-base font-medium cursor-pointer ml-2" href={"/"}>
                  Live chat
                </Link>
              </div>
            </ul>
          </div>
          <div className="my-2 flex items-center gap-5 justify-center">
            <p className="my-1 text-red-500">
              <FaPhoneAlt />
            </p>
            <a href="tel:6393274099" className="text-red-500 font-medium cursor-pointer">6393274099</a>
            <p className="font-medium text-gray-500 cursor-pointer">
              Support Center
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderFirst;
