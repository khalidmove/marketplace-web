import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { TiArrowSortedUp } from "react-icons/ti";
import { useContext } from "react";
import { cartContext, openCartContext, userContext } from "@/pages/_app";
import Swal from "sweetalert2";
// import * as rdd from "react-device-detect";
import { LuLogIn } from "react-icons/lu";
import { Api } from "@/services/service";
import { FaSortUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
// import { MdNavigateNext } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { Drawer, Typography, IconButton, Button } from '@mui/material';
import { FaCircleChevronDown } from "react-icons/fa6";
import { FaCircleChevronUp } from "react-icons/fa6";
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { IoIosSearch } from "react-icons/io";
// import Categoriess from "./Categoriess";
// import ProductCard from "./ProductCard";
import Badge from '@mui/material/Badge';
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { IoAddSharp, IoCloseCircleOutline, IoList, IoRemoveSharp } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { GoClock } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import GroceryCategories from "./GroceryCatories";

const Navbar = (props) => {
  console.log(props)
  const [navbar, setNavbar] = useState(false);
  const [showHover, setShowHover] = useState(true);
  const [showSub, setShowSub] = useState("");
  const router = useRouter();
  const [user, setUser] = useContext(userContext);
  // const [cartData, setCartData] = useContext(cartContext);
  console.log(user)
  const [services, setServices] = useState([]);
  const [list, setList] = useState([
    { href: "/profile", title: "Profile" },
    { href: "/history", title: "History" },
  ]);
  const [currentCity, setCurrentCity] = useState('');
  // const [commonCity, setCommonCity] = useContext(cityContext)
  // const [initial, setInitial] = useContext(Context)
  // const [mobile, setMobile] = useState(false);

  // useEffect(() => {
  //   setMobile(rdd.isMobile);
  //   if (rdd.isBrowser) {
  //     setToggleDrawer(true);
  //   }
  // }, [mobile]);

  const [showCategory, setShowCategory] = React.useState(false);
  const [showCategory1, setShowCategory1] = React.useState(false);
  const [openData, setOpenData] = React.useState(false);
  const [openColor, setOpenColor] = React.useState(false);
  const [openPrice, setOpenPrice] = React.useState(false);
  const [openBrand, setOpenBrand] = React.useState(false);
  const [openGender, setOpenGender] = React.useState(false);

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const [serchData, setSearchData] = useState('')
  const [productsList, setProductsList] = useState([]);

  const [mobileMenu, setMobileMenu] = useState(false);

  const [CartTotal, setCartTotal] = useState(0);
  const [openCart, setOpenCart] = useContext(openCartContext);
  const [CartItem, setCartItem] = useState(0);
  const [cartData, setCartData] = useContext(cartContext);

  useEffect(() => {
    // getCategory()
  }, [])

  const getproductByCategory = async (text) => {
    let parmas = {}
    let url = `productsearch?key=${text}`

    Api("get", url, "", router, parmas).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        setProductsList(res.data)
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };



  const closeDrawer = async () => {
    setShowCategory(false);
  }

  const closeDrawers = async () => {
    setOpenCart(false);
  }

  const openDrawer = async () => {
    setShowCategory(true)
  };


  const closeDrawer1 = async () => {
    inputRef1.current.blur();
    setTimeout(() => {
      setShowCategory1(false);
    }, 500);
  }

  const getCategory = async () => {
    props.loader(true);
    Api("get", "getCategory", "", router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        const d = []
        res.data.forEach(element => {
          d.push({
            href: `/categories?cat_id=${element._id}`, title: element?.name
          })
        });
        setServices(d);
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  const menuItems = [
    {
      href: `/`,
      title: "Home",
      sub: false,
    },
    {
      href: "/categories",
      title: "Categories",
      sub: true,
      list: services,
    },
    {
      href: "/blogs",
      title: "Blogs",
      sub: false,
    },
    {
      href: "/custom-made",
      title: "Custom made",
      sub: false,
    },
    {
      href: "/contact",
      title: "Contact us",
      sub: false,
    },
  ];

  useEffect(() => { }, [user])
  console.log(props?.user);

  useEffect(() => {
    const sumWithInitial = cartData?.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue?.total || 0),
      0,
    );
    const sumWithInitial1 = cartData?.reduce(
      (accumulator, currentValue) => accumulator + Number(currentValue?.qty || 0),
      0,
    );
    setCartItem(sumWithInitial1)
    setCartTotal(sumWithInitial)
  }, [cartData, openCart])

  return (
    <>
      <nav className={`flex flex-col justify-center   min-h-max h-auto  bg-white w-full z-50 md:p-0 p-3`}>
        {/* drop-shadow-md */}
        <div className="w-full md:border-b border-b-0 border-b-gray-400 ">
          <div className="max-w-7xl  mx-auto w-full">
            <div className="">
              {/* overflow-x-hidden */}
              <div className={` flex items-center justify-between md:py-4 py-0 text-sm md:px-0 px-0 max-w-full`}>
                <div className="flex gap-1 items-center text-xl justify-center font-bold">
                  <img
                    onClick={() => { router.push("/") }}
                    className="w-[165px] h-[43px] object-contain cursor-pointer"
                    src="/logo.png"
                    alt="MarketPlace Logo"
                  />
                </div>

                <div className="hidden md:flex gap-10 font-medium">
                  <div className="relative flex justify-end w-full ">
                    <input
                      type="text"
                      placeholder="Search items"
                      className="w-[455px] bg-custom-lightGray outline-none h-[42px] px-5 rounded-[2px] text-black font-medium	text-sm"
                    />
                    <div className="absolute right-0 w-[42px] h-[42px] bg-custom-purple cursor-pointer flex justify-center items-center  rounded-[2px] rounded-l-none	">
                      <FiSearch className="w-[24px] h-[24px] text-white" />
                    </div>
                  </div>
                </div>

                <div className="md:flex hidden gap-10">
                  <ul className="hidden md:flex gap-10  font-medium">
                    {/* <li>
                      <div className="relative flex justify-end w-full ">
                        <input
                          type="text"
                          placeholder="Search items"
                          className="w-[455px] bg-custom-lightGray outline-none h-[42px] px-5 rounded-[2px] text-black font-medium	text-sm"
                        />
                        <div className="absolute right-0 w-[42px] h-[42px] bg-custom-purple cursor-pointer flex justify-center items-center  rounded-[2px] rounded-l-none	">
                          <FiSearch className="w-[24px] h-[24px] text-white" />
                        </div>
                      </div>
                    </li> */}
                    <li
                      className="cursor-pointer flex gap-2 items-center justify-center"
                      onClick={() => { router.push("/wishlist") }}
                    >
                      <FaRegHeart className="w-[24px] h-[24px]" />
                      <span className="text-black text-xs	font-medium">Wishlist</span>
                    </li>
                    <li
                      className="cursor-pointer flex gap-2 items-center justify-center"
                      onClick={() => { setOpenCart(true); setMobileMenu(!mobileMenu) }}
                    >
                      <FiShoppingCart className="w-[24px] h-[24px]" />
                      <span className="text-black text-xs	font-medium">My cart</span>
                    </li>
                  </ul>

                  {/* <div className="hidden md:flex gap-3">
                  <div className="flex items-center gap-3 cursor-pointer" onClick={() => { router.push('/auth/signIn') }}>
                    <img
                      className="w-8 rounded-full"
                      src="/profilePhoto.jpg"
                      alt="User Profile"
                    />
                    <p className="text-black font-semibold text-[16px]">David Pal</p>
                  </div>
                </div> */}

                  <div className="md:flex hidden justify-start items-center">

                    {user?.token === undefined && (
                      <div className="bg-custom-purple text-white  h-[40px] w-[40px] rounded-full md:flex justify-center items-center hidden" onClick={() => { router.push("/auth/signIn") }}>
                        <LuLogIn className="text-white text-xl" />
                      </div>
                      // <div className="flex items-center gap-3 cursor-pointer" onClick={() => { router.push('/auth/signIn') }}>
                      //   <img
                      //     className="w-8 rounded-full"
                      //     src="/profilePhoto.jpg"
                      //     alt="User Profile"
                      //   />
                      //   <p className="text-black font-semibold text-[16px]">David Pal</p>
                      // </div>
                    )}

                    {user?.token !== undefined && (

                      <div className="bg-custom-purple text-white  h-[40px] w-[40px] rounded-full  items-center justify-center md:justify-self-end cursor-pointer md:flex hidden relative group"
                        onClick={() => { setShowHover(true) }}
                      >
                        <p className="font-bold text-white text-base	text-center capitalize">
                          {user?.username
                            ?.charAt(0)
                            .toUpperCase()}
                        </p>
                        {showHover && (

                          <div
                            className={` lg:absolute top-4 right-0 lg:min-w-[250px] group-hover:text-black   hidden group-hover:lg:block hover:lg:block md:z-40`}
                          >
                            <div className="bg-custom-purple  lg:shadow-inner z-10 rounded-md lg:mt-8 shadow-inner">
                              <TiArrowSortedUp
                                className={`group-hover:lg:block lg:hidden h-5 w-5 text-custom-purple  absolute top-5 right-0`}
                              />

                              <ul>

                                {/* <li className="px-5 py-2 shadow-inner feature1 border-b-2 border-white">
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
                            </li> */}

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
                                </li>
                              </ul>
                            </div>
                          </div>
                        )}

                      </div>
                    )}
                  </div>

                </div>

                {/* <img
                onClick={() => setMobileMenu(true)}
                className="md:hidden w-6"
                src="/menu.png"
                alt="Mobile Menu Icon"
              /> */}

                {/* <div
                className={`${mobileMenu ? "fixed w-full" : "hidden"
                  } md:hidden  top-0 right-0 overflow-y-auto z-20 bg-white transition-all`}
              >
                bottom-0
                <div className="flex items-center justify-between px-2 py-2">
                  <img className="w-[165px] h-[43px] object-contain cursor-pointer" src="/logo.png" alt="MarketPlace Logo" />
                  <img
                    className="w-10 cursor-pointer"
                    onClick={() => setMobileMenu(false)}
                    src="/cros.png"
                    alt="Close Menu"
                  />
                </div>
                <ul className="flex items-start justify-start flex-col gap-2 mt-5 px-5 text-lg font-medium">
                  <Link onClick={() => setMobileMenu(false)} href={"/"}>
                    HOME
                  </Link>
                  <Link onClick={() => setMobileMenu(false)} href={"/cart"} >
                    MY CART
                  </Link>
                  <Link onClick={() => setMobileMenu(false)} href={"/about-us"} >
                    ABOUT US
                  </Link>
                  <Link onClick={() => setMobileMenu(false)} href={"/contact-us"} >
                    CONTACT US
                  </Link>
                </ul>
              </div> */}

                <div className="lg:hidden flex">
                  <button
                    onClick={() => { setMobileMenu(!mobileMenu); console.log(mobileMenu) }}
                    data-collapse-toggle="navbar-sticky"
                    type="button"
                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden  focus:outline-none focus:ring-2"
                    aria-controls="navbar-sticky"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    <svg
                      className="w-6 h-6 bg-black"
                      aria-hidden="true"
                      fill="white"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>

                </div>

              </div>

              {mobileMenu && <div className="">
                <ul className="flex items-start justify-start flex-col gap-2 mt-5 px-5 text-lg font-medium lg:hidden">
                  <Link onClick={() => setMobileMenu(false)} href={"/"}>
                    Home
                  </Link>
                  <Link onClick={() => setMobileMenu(false)} href={"/cart"} >
                    My Cart
                  </Link>
                  <Link onClick={() => setMobileMenu(false)} href={"/about-us"} >
                    About Us
                  </Link>
                  <Link onClick={() => setMobileMenu(false)} href={"/contact-us"} >
                    Contact Us
                  </Link>
                </ul>
              </div>}

            </div>
          </div>
        </div>

        {/* {props?.opens && <div className="bg-custom-orange w-full h-[60px] md:flex hidden">
        <div className="relative">
          <img className="ml-[200px]" src="/image.png" />
          <img className="absolute top-[10px] left-[350px]" src="/image-2.png" />
          <p className="text-white font-bold text-[26px] absolute top-[12px] left-[500px]">SAVE FOR SURE</p>
          <p className="text-2xl text-white font-normal absolute top-[15px] left-[750px]">Lowest prices in 90 days</p>
        </div>
        <div className="relative">
          <img className="-ml-[31px] h-[60px]" src="/image-1.png" />
          <button className="bg-white h-[30px] w-[130px] rounded-[20px] absolute top-[13px] left-[10px] text-custom-red font-semibold text-base" onClick={() => router.push('/categories')}>View more</button>
        </div>
      </div>} */}

        {/* <div className="bg-white w-full h-[130px] md:block hidden">
        <div className="max-w-7xl mx-auto w-full">

          <div className="pt-10 pb-5 flex">
            <img className="w-[134px] h-[32px] cursor-pointer" src="/logo.png" onClick={() => { router.push('/') }} />
            <div className="border border-custom-darkRed rounded-[20px] h-[38px] w-[860px] ml-10 flex justify-start items-center overflow-hidden"
              onClick={() => {
                setShowCategory1(true)
                setTimeout(() => {
                  inputRef2.current.focus();
                }, 200);
              }}>
              <p type="text" ref={inputRef1} placeholder="Search for products..."
                className="bg-white  justify-start items-center px-5 h-10 w-full rounded-[62px] outline-none md:flex hidden text-black text-xs font-normal"
              > {serchData || 'Search for products...'}</p>
              <button className="text-white font-semibold text-sm	bg-custom-darkRed h-full w-[140px]">Search</button>
            </div>

            <div className="flex justify-start items-center ml-10">
              {user?.token === undefined && (<p className="text-[#00000080] text-[10px] font-normal cursor-pointer" onClick={() => { router.push('/auth/signIn') }}>Sign in <br />join for free</p>)}
              {user?.token !== undefined && (

                <div className="bg-custom-gray text-white  h-[40px] w-[40px] rounded-full  items-center justify-center md:justify-self-end cursor-pointer md:flex hidden relative group"
                  onClick={() => { setShowHover(true) }}
                >
                  <p className="font-bold text-white text-base	text-center capitalize">
                    {user?.username
                      ?.charAt(0)
                      .toUpperCase()}
                  </p>
                  {showHover && (

                    <div
                      className={` lg:absolute top-4 right-0 lg:min-w-[250px] group-hover:text-black   hidden group-hover:lg:block hover:lg:block md:z-40`}
                    >
                      <div className="bg-custom-gray  lg:shadow-inner z-10 rounded-md lg:mt-8 shadow-inner">
                        <TiArrowSortedUp
                          className={`group-hover:lg:block lg:hidden h-5 w-5 text-custom-gray  absolute top-5 right-0`}
                        />
                        <ul>
                          {user?.type === 'SELLER' && !user?.store && <li className="px-5 py-2 shadow-inner feature1 border-b-2 border-white">
                            <Link
                              href={"/store-create"}
                              onClick={() => {
                                setShowHover(false);
                              }}
                              className="block px-5  py-1  pl-0  text-white text-left font-semibold text-base"
                              aria-current="page"
                            >
                              {("Create Store")}
                            </Link>
                          </li>}

                          {user?.type === 'SELLER' && user?.store && <li className="px-5 py-2 shadow-inner feature1 border-b-2 border-white">
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
                          </li>}

                          <li className="px-5 py-2 shadow-inner feature1 border-b-2 border-white">
                            <Link
                              href={"/favourite"}
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
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}

                </div>
              )}
              <div className="flex flex-col justify-center items-center mx-10 cursor-pointer" onClick={() => { router.push('/orders') }}>
                <img className="w-[20px] h-[20px]" src="/order-icon.png" />
                <p className="text-[#00000080] text-[10px] font-normal pt-1">Orders</p>
              </div>

              <div className="flex flex-col justify-center items-center cursor-pointer" onClick={() => { router.push('/cart') }}>
                <Badge badgeContent={cartData.length} color="primary">
                  <img className="w-[20px] h-[20px]" src="/shopping-cart.png" />
                </Badge>
                <p className="text-[#00000080] text-[10px] font-normal pt-1">Cart</p>
              </div>
            </div>
          </div>

          <div className="border-t border-t-[#D6B6B666] flex justify-between items-center pt-1">
            <div className="flex justify-center items-center">
              {!showCategory && <img className="w-[24px] h-[24px]" src="/list.png" onClick={openDrawer} />}
              <p className="text-black font-normal text-xs ml-3">Categories</p>
            </div>

            <Drawer open={showCategory} onClose={closeDrawer} >
              <div className='w-[310px] relative'>
                <div className="flex items-center justify-between border-b border-custom-newLightGray p-5">
                  <p className='text-black text-2xl font-normal'>Categories</p>
                  <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </IconButton>
                </div>
              </div>

            </Drawer>

          </div>
        </div >
      </div> */}

        {/* {props?.opens && <div className='bg-custom-lightBlue h-[44px] md:flex justify-center items-center hidden cursor-pointer' onClick={() => { router.push('/faq') }}>
        <div className="max-w-7xl mx-auto w-full flex justify-center items-center">
          <div className="w-[24px] h-[24px] rounded-full bg-custom-blue flex justify-center items-center">
            <IoLocation className="text-white h-4 w-4" />
          </div>
          <p className="text-black text-sm font-normal ml-5 cursor-pointer">See FAQs if you have any kind of Questions and doubts.</p>
          <div className="ml-20 flex justify-center items-center">
            <p className="text-black text-sm font-normal">Learn more</p>
            <MdNavigateNext className="text-[#00000080] w-[20px] h-[20px" />
          </div>
        </div>
      </div>} */}

        {/* <div className='md:hidden flex flex-row'>
        <img className="w-[134px] h-[38px] cursor-pointer object-contain" src="/logo.png" onClick={() => { router.push('/') }} />

        <div className="border border-custom-darkRed rounded-[20px] h-[38px] w-full ml-5 flex justify-start items-center overflow-hidden">
          <IoIosSearch className="w-5 h-5 text-[#00000060] ml-2" />
          <p type="text" ref={inputRef1} placeholder="Search for products..."
            onClick={() => {
              setShowCategory1(true)
              setTimeout(() => {
                inputRef2.current.focus();
              }, 200);
            }}

            className="bg-white min-w-32 justify-start items-center px-3 h-10 w-full rounded-[62px] outline-none flex  text-black text-xs font-normal"
          > {serchData || 'Search for products...'}</p>
        </div>

      </div> */}

        {/* <Drawer open={showCategory1} anchor="top" onClose={closeDrawer1} >
        <div className=' max-w-7xl  mx-auto w-full  relative'>
          <div className="flex items-center justify-between border-b border-custom-newLightGray p-5 gap-5">
            <input type="text"
              ref={inputRef2}
              value={serchData}
              onChange={(text) => {
                setSearchData(text.target.value);
                if (text.target.value) {
                  getproductByCategory(text.target.value)
                } else {
                  setProductsList([])
                }
              }}
              placeholder="Search for products..."
              className="bg-custom-lightGray px-5 h-10 w-full rounded-[62px] outline-none  text-black" />
            <IconButton variant="text" color="blue-gray" onClick={() => { setShowCategory1(false); setSearchData('') }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>

          </div>
          <div>
            <section className="w-full ">
              <div className="max-w-7xl mx-auto w-full md:px-0 px-5 md:py-5 py-5">
                <p className="md:text-[48px] text-2xl text-black font-normal text-center">Products</p>
                <div className="md:py-10 py-5 grid md:grid-cols-4 grid-cols-1 gap-5 w-full">
                  {productsList.map((item, i) => (
                    <div onClick={() => { setShowCategory1(false); setSearchData(''); setProductsList([]) }}>
                      <ProductCard item={item} i={i} url={`/product-details/${item?.slug}`
                      } />
                    </div>
                  ))}
                </div>
                {productsList?.length === 0 && <p className="text-2xl text-black font-normal text-center">No Products</p>}
              </div>
            </section>
          </div>


        </div>

      </Drawer> */}
      </nav >

      <Drawer className='' open={openCart} onClose={closeDrawers} anchor={'right'}>
        <div className='w-[700px] relative bg-custom-purple py-5 px-10'>

          <div className="bg-white w-full rounded-[5px] boxShadows p-5 flex justify-between items-center">
            {/* h-[109px] */}
            <div className="flex justify-start items-center gap-1">
              <IoIosArrowBack className="w-[38px] h-[31px] text-black" />
              <p className="text-custom-purple text-2xl	font-bold">Your Cart</p>
            </div>
            <button className="text-white font-medium text-base bg-custom-red rounded-[12px] h-[50px] w-[112px]">Empty Cart</button>
          </div>

          <div className="bg-white w-full rounded-[5px] boxShadows p-5 mt-5">
            {/* h-[192px] */}
            <div className="flex justify-between items-start gap-5 border-b border-b-[#85808080] pb-5">
              <div className="flex justify-start items-center">
                <img className="w-[71px] h-[71px]" src="/starImg-1.png" />
                <div className="pl-2">
                  <p className="text-custom-purple font-semibold text-xl">Upto $10 cashback with CRED</p>
                  <p className="text-xl font-normal text-custom-newGrayColor pt-2">Code: MARK123</p>
                </div>
              </div>

              <button className="w-[183px] h-[61px] rounded-[8px] border border-custom-red text-custom-red font-semibold text-xl">Apply</button>
            </div>

            <div className="pt-5 flex justify-center items-center gap-1">
              <p className="text-custom-purple font-medium text-lg">View all coupons</p>
              <IoIosArrowBack className="w-[31px] h-[26px] text-black rotate-180" />
            </div>

          </div>

          <div className="bg-white w-full rounded-[5px] boxShadows p-5 mt-5">
            {/* h-[450px] */}

            <div className="flex justify-start items-center gap-5">
              <div className="w-[50px] h-[39px] rounded-[8px] bg-[#FC096599] flex justify-center items-center">
                <GoClock className="text-white w-[38px] h-[29px]" />
              </div>
              <p className="text-custom-purple font-semibold text-xl">Delivery in 8 mins</p>
            </div>


            <div className="grid grid-cols-5 w-full gap-5 mt-5">
              <div className="flex justify-start items-start col-span-2">
                <img className="w-[145px] h-[104px]" src="/tataSaltImg.png" />
                <div className="pt-2">
                  <p className="text-custom-purple font-semibold text-base">Tata Salt</p>
                  <p className="text-custom-newGrayColors font-normal text-sm pt-2">500 g</p>
                </div>
              </div>

              <div className="flex justify-center items-center  col-span-2">
                <div className='bg-custom-offWhite w-[153px] h-[39px] rounded-[8px] flex justify-center items-center'>
                  {/* md:mt-5 mt-3  */}
                  <div className='h-[39px] w-[51px] bg-custom-purple rounded-[8px] rounded-r-none	 flex justify-center items-center'>
                    <IoRemoveSharp className='h-[30px] w-[30px] text-white' />
                  </div>
                  <p className='text-black md:text-xl text-lg font-medium text-center mx-5'>1</p>
                  <div className='h-[39px] w-[51px] bg-custom-purple rounded-[8px] rounded-l-none flex justify-center items-center'>
                    <IoAddSharp className='h-[30px] w-[30px] text-white' />
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <p className="text-custom-purple font-semibold text-base">₹24<del className="text-custom-red font-normal text-xs ml-5">₹25</del></p>
                <IoMdClose className="w-[22px] h-[22px] text-custom-newGray ml-3" />
              </div>
            </div>

          </div>

          <div className="bg-white w-full rounded-[5px] boxShadows p-5 mt-5">
            <div className="flex justify-between items-center w-full">
              <p className="text-custom-purple font-normal text-base">Item Total</p>
              <p className="text-custom-purple font-normal text-base"><del className="font-normal text-base text-custom-grayColors mr-5">₹941</del>₹901</p>
            </div>

            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-custom-red font-normal text-base">Delivery Fee (₹35 Saved)</p>
              <p className="text-custom-purple font-normal text-base"><del className="font-normal text-base text-custom-grayColors mr-5">₹35</del>₹0</p>
            </div>

            <div className="flex justify-between items-center w-full pt-3 border-b border-b-[#97999B80] pb-5">
              <p className="text-custom-grayColors font-normal text-base">Delivery Partner Tip</p>
              <del className="font-normal text-base text-custom-grayColors">₹35</del>
            </div>

            <div className="flex justify-between items-center w-full pt-5">
              <p className="text-custom-purple font-normal text-base">Total Payable</p>
              <p className="text-custom-purple font-medium text-base">₹921</p>
            </div>
          </div>

          {/* <GroceryCategories /> */}

          {/* <div className='w-full p-5'>
            <div className='!z-50 top-0 w-full border-b border-[#00000050]'>
              <div className='flex justify-between items-center pb-5 w-full'>
                <p className='text-black text-base font-normal'>Cart • {CartItem}</p>
                <IoCloseCircleOutline className='text-black w-5 h-5' onClick={closeDrawers} />
              </div>
            </div>

            {cartData.map((item, i) => (
              <div className="w-full" key={i}>
                <div className='grid grid-cols-4 w-full gap-2 py-5'>

                  <div className='flex justify-center items-center'>
                    <img className='w-[50px] h-[50px] object-contain' src={item?.selectedColor?.image[0]} />
                  </div>
                  <div className='col-span-2 w-full'>
                    <p className='text-black text-xs font-normal'>{item?.name}</p>
                    <div className="flex justify-start items-center gap-1">
                      <p className='text-[#1A1A1A70] text-xs font-normal mr-2'>Colour:</p>
                      <p className='md:w-[10px] w-[10px] md:h-[10px] h-[10px] rounded-full flex justify-center items-center border border-black' style={{ background: item?.selectedColor?.color }}></p>
                    </div>
                    <div className='flex justify-start items-center border border-black rounded-[20px] h-[25px] w-[100px] mt-5'>
                      <IoRemoveSharp onClick={() => {
                        if (item.qty > 1) {

                          const nextState = produce(cartData, draft => {
                            draft[i].qty = draft[i].qty - 1
                            draft[i].total = (draft[i]?.price * draft[i].qty).toFixed(2)
                          })
                          setCartData(nextState)
                          localStorage.setItem("addCartDetail", JSON.stringify(nextState));
                        }

                      }} className='h-[24px] w-[24px] text-black md:mr-2 mx-2 ' />
                      <p className='text-black text-base font-normal outline-none text-center w-[30px] bg-transparent border-r border-r-black  border-l border-l-black'>{item?.qty}</p>
                      <IoAddSharp className='h-[24px] w-[24px] text-black md:mx-2' onClick={() => {

                        const nextState = produce(cartData, draft => {
                          draft[i].qty = draft[i].qty + 1
                          draft[i].total = (draft[i]?.price * draft[i].qty).toFixed(2)
                        })
                        setCartData(nextState)
                        localStorage.setItem("addCartDetail", JSON.stringify(nextState));
                      }} />
                    </div>
                  </div>
                  <div className='flex flex-col justify-start items-end'>
                    <MdDeleteOutline className='text-black w-5 h-5' onClick={() => { cartClose(item, i) }} />
                    <p className='text-black text-xs font-normal pt-5'>₹{item?.total || item?.price}</p>
                  </div>
                </div>
              </div>
            ))}


            <div className='mt-5 !z-50 fixed bottom-0  flex flex-col justify-start'>
              <div className='flex justify-between items-center pb-5'>
                <p className='text-black text-xl font-normal'>Subtotal</p>
                <p className='text-black text-xl font-normal'>₹{CartTotal.toFixed(2)}</p>
              </div>
              <button onClick={() => {
                if (cartData?.length === 0) {
                  toaster({ type: "warning", message: 'Your cart is empty' });
                  return
                } else {
                  setShowcart(true)
                  setOpenCart(false);
                }

              }} className='bg-custom-blackColor !w-[270px] h-[50px] rounded-[60px] text-white text-lg font-bold flex justify-center items-center mb-5' >Checkout • ₹{CartTotal.toFixed(2)}</button>

            </div>

          </div> */}

        </div>
      </Drawer>

    </>
  );
};

export default Navbar;
