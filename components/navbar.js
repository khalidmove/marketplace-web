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
// import { MdNavigateNext } from "react-icons/md";
import { Drawer, Typography, IconButton, Button } from "@mui/material";
// import Categoriess from "./Categoriess";
// import ProductCard from "./ProductCard";
import Badge from "@mui/material/Badge";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import {
  IoAddSharp,
  IoCloseCircleOutline,
  IoList,
  IoRemoveSharp,
} from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { GoClock } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import GroceryCategories from "./GroceryCatories";
import { produce } from "immer";
import { RxCrossCircled } from "react-icons/rx";

const Navbar = (props) => {
  // console.log(props)
  const [navbar, setNavbar] = useState(false);
  const [showHover, setShowHover] = useState(true);
  const [showSub, setShowSub] = useState("");
  const router = useRouter();
  const [user, setUser] = useContext(userContext);
  const [services, setServices] = useState([]);
  const [list, setList] = useState([
    { href: "/profile", title: "Profile" },
    { href: "/history", title: "History" },
  ]);
  const [currentCity, setCurrentCity] = useState("");
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

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const [serchData, setSearchData] = useState("");
  const [productsList, setProductsList] = useState([]);

  const [mobileMenu, setMobileMenu] = useState(false);

  const [CartTotal, setCartTotal] = useState(0);
  const [openCart, setOpenCart] = useContext(openCartContext);
  const [CartItem, setCartItem] = useState(0);
  const [cartData, setCartData] = useContext(cartContext);
  const [showcart, setShowcart] = useState(false);
  const [shippingAddressData, setShippingAddressData] = useState({
    firstName: "",
    address: "",
    pinCode: "",
    phoneNumber: "",
    city: "",
    country: "",
  });
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [deliveryPartnerTip, setDeliveryPartnerTip] = useState(0);
  const [mainTotal, setMainTotal] = useState(0);
  const [productList, SetProductList] = useState([]);
  const [noProductsFound, setNoProductsFound] = useState(false);

  const timeoutRef = useRef(null);

  // const handleSearch = () => {
  //   if (serchData && productsList.length > 0 && productsList[0]?.slug) {
  //     router.push(`/product-details/${productsList[0].slug}`);
  //   } else {
       
  //     Swal.fire({
  //       title: "No product found",
  //       text: "Please refine your search.",
  //       icon: "info",
  //       confirmButtonText: "Okay"
  //     });
  //   }
  // };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchData(value);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (value) {
        getproductBySearchCategory(value);
      } else {
        setProductsList([]);  
      }
    }, 500); 
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // const d = cartData.find(
    //   (f) => f._id === f.category._id
    // );
    // console.log(d)
    if (cartData?.length > 0) {
      getproductByCategory();
    }
    // getCategory()
  }, []);

  console.log(productList);

  const getproductByCategory = async () => {
    props.loader(true);
    Api(
      "get",
      `getProductBycategoryId?category=${cartData[0]?.category._id}&product_id=${cartData[0]?._id}`,
      "",
      router
    ).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        // const sameItem = res.data.filter(f => f._id !== router?.query?.id)
        SetProductList(res.data);
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  const getproductBySearchCategory = async (text) => {
    let parmas = {};
    let url = `productsearch?key=${text}`;

    Api("get", url, "", router, parmas).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        setProductsList(res.data);
        if (res.data.length === 0) {
          setNoProductsFound(true);  
        } else {
          setNoProductsFound(false);  
        }
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
  };

  const closeDrawers = async () => {
    setOpenCart(false);
  };

  const openDrawer = async () => {
    setShowCategory(true);
  };

  const closeDrawer1 = async () => {
    inputRef1.current.blur();
    setTimeout(() => {
      setShowCategory1(false);
    }, 500);
  };

  const getCategory = async () => {
    props.loader(true);
    Api("get", "getCategory", "", router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        const d = [];
        res.data.forEach((element) => {
          d.push({
            href: `/categories?cat_id=${element._id}`,
            title: element?.name,
          });
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

  useEffect(() => {}, [user]);
  // console.log(props?.user);

  useEffect(() => {
    const sumWithInitial = cartData?.reduce(
      (accumulator, currentValue) =>
        accumulator + Number(currentValue?.total || 0),
      0
    );
    const sumWithInitial1 = cartData?.reduce(
      (accumulator, currentValue) =>
        accumulator + Number(currentValue?.qty || 0),
      0
    );
    setCartItem(sumWithInitial1);
    setCartTotal(sumWithInitial);
    setMainTotal(sumWithInitial + deliveryCharge + deliveryPartnerTip);
  }, [cartData, openCart]);

  const emptyCart = async () => {
    setCartData([]);
    localStorage.removeItem("addCartDetail");
  };

  const cartClose = (item, i) => {
    const nextState = produce(cartData, (draftState) => {
      if (i !== -1) {
        draftState.splice(i, 1);
      }
    });
    setCartData(nextState);
    localStorage.setItem("addCartDetail", JSON.stringify(nextState));
  };

  const createProductRquest = (e) => {
    console.log(shippingAddressData);

    e.preventDefault();
    // if (cartData?.length === 0) {
    //   toaster({ type: "warning", message: 'Your cart is empty' });
    //   return
    // }
    let data = [];
    let cart = localStorage.getItem("addCartDetail");
    // let address = localStorage.getItem("shippingAddressData");
    let d = JSON.parse(cart);
    d.forEach((element) => {
      console.log(element);
      data.push({
        product: element?._id,
        image: [element.selectedColor?.selectedImage || element?.selectedImage],
        color: element.selectedColor?.color || "",
        total: element.total,
        price: element.price,
        qty: element.qty,
        seller_id: element.userid,
      });
    });
    let newData = {
      productDetail: data,
      total: CartTotal.toFixed(2),
      shiping_address: shippingAddressData,
      // shipping_address: JSON.parse(address),
    };

    console.log(data);
    console.log("newData ::", newData);
    // return
    props.loader(true);
    Api("post", "createProductRquest", newData, router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        if (res.status) {
          setCartData([]);
          setCartTotal(0);
          setShowcart(false);
          // localStorage.setItem("shippingAddressData", JSON.stringify(shippingAddressData));
          localStorage.removeItem("addCartDetail");
          props.toaster({ type: "success", message: res.data?.message });
          router.push("/orders");
        } else {
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

  console.log("cart data::", cartData);
  

  return (
    <>
      <nav
        className={`flex flex-col justify-center   min-h-max h-auto  bg-white w-full z-50 md:p-0 p-3`}
      >
        {/* drop-shadow-md */}
        <div className="w-full md:border-b border-b-0 border-b-gray-400 ">
          <div className="max-w-7xl  mx-auto w-full">
            <div className="">
              <div
                className={` flex items-center justify-between md:py-4 py-0 text-sm md:px-0 px-0 max-w-full`}
              >
                <div className="md:flex gap-1 items-center text-xl justify-center font-bold hidden">
                  <img
                    onClick={() => {
                      router.push("/");
                    }}
                    className="md:w-[165px] w-[130px] h-[43px] object-contain cursor-pointer"
                    src="/logo.png"
                    alt="MarketPlace Logo"
                  />
                </div>

                <div className="hidden md:flex gap-10 font-medium">
                  <div
                    className="relative flex justify-end w-full "
                    // onClick={() => {
                    //   setShowCategory1(true)
                    //   setTimeout(() => {
                    //     inputRef2.current.focus();
                    //   }, 200);
                    // }}
                  >
                    <input
                      type="text"
                      placeholder="Search for items..."
                      className="w-[455px] bg-custom-lightGray outline-none h-[42px] px-5 rounded-[2px] text-black font-medium	text-sm flex justify-start items-center text-start"
                      ref={inputRef2}
                      value={serchData}
                      onChange={handleInputChange}
                    />
                    <div
                      onClick={() => {
                        if (serchData) {
                          getproductBySearchCategory(serchData)
                          router.push(`/search-result?query=${serchData}`)
                        }
                      }}
                      className="absolute right-0 w-[42px] h-[42px] bg-custom-purple cursor-pointer flex justify-center items-center  rounded-[2px] rounded-l-none	"
                    >
                      <FiSearch className="w-[24px] h-[24px] text-white" />
                    </div>
                    {/* <p
                      type="text"
                      placeholder="Search for items..."
                      className="w-[455px] bg-custom-lightGray outline-none h-[42px] px-5 rounded-[2px] text-black font-medium	text-sm flex justify-start items-center text-start"
                    >{serchData || 'Search for products...'}</p> */}
                    {/* <div className="absolute right-0 w-[42px] h-[42px] bg-custom-purple cursor-pointer flex justify-center items-center  rounded-[2px] rounded-l-none	">
                      <FiSearch className="w-[24px] h-[24px] text-white" />
                    </div> */}
                  </div>
                </div>

                <div className="md:flex hidden gap-10">
                  <ul className="hidden md:flex gap-10  font-medium">
                    <li
                      className="cursor-pointer flex gap-2 items-center justify-center"
                      onClick={() => {
                        router.push("/favourite");
                      }}
                    >
                      <FaRegHeart className="w-[24px] h-[24px] text-custom-purple" />
                      <span className="text-black text-xs	font-medium">
                        Wishlist
                      </span>
                    </li>
                    <li
                      className="cursor-pointer flex gap-2 items-center justify-center"
                      onClick={() => {
                        setOpenCart(true);
                        setMobileMenu(!mobileMenu);
                      }}
                    >
                      <FiShoppingCart className="w-[24px] h-[24px] text-custom-purple" />
                      <span className="text-black text-xs	font-medium">
                        My cart
                      </span>
                    </li>
                  </ul>

                  <div className="md:flex hidden justify-start items-center">
                    {user?.token === undefined && (
                      <div
                        className="bg-custom-purple text-white  h-[40px] w-[40px] rounded-full md:flex justify-center items-center hidden"
                        onClick={() => {
                          router.push("/auth/signIn");
                        }}
                      >
                        <LuLogIn className="text-white text-xl" />
                      </div>
                    )}

                    {user?.token !== undefined && (
                      <div
                        className="bg-custom-purple text-white  h-[40px] w-[40px] rounded-full  items-center justify-center md:justify-self-end cursor-pointer md:flex hidden relative group"
                        onClick={() => {
                          setShowHover(true);
                        }}
                      >
                        <p className="font-bold text-white text-base	text-center capitalize">
                          {user?.username?.charAt(0).toUpperCase()}
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
                                          setUser({});
                                          setShowHover(false);
                                          localStorage.removeItem("userDetail");
                                          localStorage.removeItem("token");
                                          router.push("/auth/signIn");
                                        }
                                      });
                                    }}
                                    className="block px-5 py-1  pl-0 text-white text-left font-semibold text-base"
                                    aria-current="page"
                                  >
                                    {"Sign out"}
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

                {/* <div className="lg:hidden flex">
                  <button
                    onClick={() => { setMobileMenu(!mobileMenu); }}
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

                </div> */}
              </div>

              {/* {mobileMenu && <div className="">
                <ul className="flex items-start justify-start flex-col gap-2 mt-5 px-5 text-lg font-medium lg:hidden">
                  <Link onClick={() => setMobileMenu(false)} href={"/"}>
                    Home
                  </Link>
                  <p onClick={() => { setOpenCart(true); setMobileMenu(false) }}  >
                    My Cart
                  </p>
                  <Link onClick={() => setMobileMenu(false)} href={"/about-us"} >
                    About Us
                  </Link>
                  <Link onClick={() => setMobileMenu(false)} href={"/contact-us"} >
                    Contact Us
                  </Link>
                </ul>
              </div>} */}

              <div className="md:hidden flex">
                <div className="flex gap-1 items-center text-xl justify-center font-bold">
                  <img
                    onClick={() => {
                      router.push("/");
                    }}
                    className="md:w-[165px] w-[130px] h-[43px] object-contain cursor-pointer"
                    src="/logo.png"
                    alt="MarketPlace Logo"
                  />
                </div>

                <div className="border border-custom-purple rounded-[20px] h-[38px] w-full mx-5 flex justify-start items-center overflow-hidden">
                  {/* <IoIosSearch className="w-5 h-5 text-[#00000060] ml-2" /> */}
                  <p
                    type="text"
                    ref={inputRef1}
                    placeholder="Search for items..."
                    onClick={() => {
                      setShowCategory1(true);
                      setTimeout(() => {
                        inputRef2.current.focus();
                      }, 200);
                    }}
                    className="bg-white min-w-32 justify-start items-center px-3 h-10 w-full rounded-[62px] outline-none flex  text-black text-xs font-normal"
                  >
                    {" "}
                    {serchData || "Search for items..."}
                  </p>
                </div>

                <p
                  className="cursor-pointer flex items-center justify-center"
                  onClick={() => {
                    router.push("/wishlist");
                  }}
                >
                  <FaRegHeart className="w-[24px] h-[24px] text-custom-purple" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Drawer
        className=""
        open={openCart}
        onClose={closeDrawers}
        anchor={"right"}
      >
        <div className="md:w-[700px] w-[330px] relative bg-custom-purple py-5 md:px-10 px-5">
          <div className="bg-white w-full rounded-[5px] boxShadows md:p-5 p-2 flex justify-between items-center">
            <div
              className="flex justify-start items-center gap-1 cursor-pointer"
              onClick={() => {
                setOpenCart(false);
              }}
            >
              <IoIosArrowBack className="md:w-[38px] w-[28px] md:h-[31px] h-[21px] text-black" />
              <p className="text-custom-purple md:text-2xl text-base font-bold">
                Your Cart
              </p>
            </div>
            <button
              className="text-white font-medium text-base bg-custom-red rounded-[12px] md:h-[50px] h-[40px] md:w-[112px] w-[105px]"
              onClick={() => {
                emptyCart();
              }}
            >
              Empty Cart
            </button>
          </div>

          <div className="bg-white w-full rounded-[5px] boxShadows md:p-5 p-2 mt-5">
            <div className="md:flex justify-between items-start gap-5 border-b border-b-[#85808080] pb-5">
              <div className="flex md:flex-row flex-col justify-start md:items-center items-start">
                <img className="w-[71px] h-[71px]" src="/starImg-1.png" />
                <div className="md:pl-2">
                  <p className="text-custom-purple font-semibold md:text-xl text-base">
                    Upto $10 cashback with CRED
                  </p>
                  <p className="md:text-xl text-base font-normal text-custom-newGrayColor md:pt-2 pt-1">
                    Code: MARK123
                  </p>
                </div>
              </div>

              <button className="md:w-[183px] w-[130px] md:h-[50px] h-[40px] rounded-[8px] border border-custom-red text-custom-red font-semibold md:text-xl text-base md:mt-0 mt-2">
                Apply
              </button>
            </div>

            <div className="pt-5 flex justify-center items-center gap-1">
              <p className="text-custom-purple font-medium md:text-lg text-base">
                View all coupons
              </p>
              <IoIosArrowBack className="md:w-[31px] w-[21px] md:h-[26px] h-[16px] text-black rotate-180" />
            </div>
          </div>

          <div className="bg-white w-full rounded-[5px] boxShadows md:p-5 p-2 mt-5">
            <div className="flex justify-start items-center gap-5">
              <div className="w-[50px] h-[39px] rounded-[8px] bg-[#FC096599] flex justify-center items-center">
                <GoClock className="text-white w-[38px] h-[29px]" />
              </div>
              <p className="text-custom-purple font-semibold text-xl">Items</p>
              {/* Delivery in 8 mins */}
            </div>

            {cartData?.map((item, i) => (
              <div
                key={i}
                className="grid md:grid-cols-9 grid-cols-1 w-full md:gap-5 mt-5"
              >
                <div className="flex justify-start items-start col-span-4 md:gap-0 gap-2">
                  <img
                    className="md:w-[145px] md:h-[104px] w-[50px] h-[50px] object-contain"
                    src={item?.selectedImage || item?.image}
                  />
                  <div className="pt-2">
                    <p className="text-custom-purple font-semibold text-base pl-3">
                      {item?.name}
                    </p>
                    <p className="text-custom-newGrayColors font-normal text-sm pt-2">
                      <span className="pl-3">{item?.price_slot[0]?.value}</span>{" "}
                      <span>{item?.price_slot[0]?.unit}</span>
                    </p>
                  </div>
                  <div className="flex md:justify-center justify-start md:items-center items-start col-span-2 md:mt-0 mt-2 md:hidden">
                    <p className="text-custom-purple font-semibold text-base">
                      ₹{item?.our_price}
                      <del className="text-custom-red font-normal text-xs ml-2">
                        ₹{item?.other_price}
                      </del>
                    </p>
                    <IoMdClose
                      className="w-[22px] h-[22px] text-custom-newGray ml-2 cursor-pointer"
                      onClick={() => {
                        cartClose(item, i);
                      }}
                    />
                  </div>
                </div>

                <div className="flex md:justify-center justify-start md:items-center items-start col-span-3 md:mt-0 mt-5">
                  <div className="bg-custom-offWhite w-[153px] h-[39px] rounded-[8px] flex justify-center items-center">
                    <div
                      className="h-[39px] w-[51px] bg-custom-purple rounded-[8px] rounded-r-none	 flex justify-center items-center"
                      onClick={() => {
                        if (item.qty > 1) {
                          const nextState = produce(cartData, (draft) => {
                            draft[i].qty -= 1; 
                            draft[i].total = (
                              parseFloat(draft[i].price_slot[0]?.our_price) * 
                              draft[i].qty
                            ).toFixed(2);
                          });
                          setCartData(nextState);
                          localStorage.setItem(
                            "addCartDetail",
                            JSON.stringify(nextState)
                          );
                        }
                      }}
                    >
                      <IoRemoveSharp className="h-[30px] w-[30px] text-white" />
                    </div>
                    <p className="text-black md:text-xl text-lg font-medium text-center mx-5">
                      {item?.qty}
                    </p>
                    <div
                      className="h-[39px] w-[51px] bg-custom-purple rounded-[8px] rounded-l-none flex justify-center items-center"
                      onClick={() => {
                        const nextState = produce(cartData, (draft) => {
                          draft[i].qty += 1; 
                          draft[i].total = (
                            parseFloat(draft[i].price_slot[0]?.our_price) * 
                            draft[i].qty
                          ).toFixed(2);
                        });
                        setCartData(nextState);
                        localStorage.setItem(
                          "addCartDetail",
                          JSON.stringify(nextState)
                        );
                      }}
                    >
                      <IoAddSharp className="h-[30px] w-[30px] text-white" />
                    </div>
                  </div>
                </div>

                <div className="md:flex md:justify-center justify-start md:items-center items-start col-span-2 md:mt-0 mt-5 hidden">
                  <p className="text-custom-purple font-semibold text-base">
                    ₹{item?.total}
                    <del className="text-custom-red font-normal text-xs ml-2">
                      ₹{item?.other_price}
                    </del>
                  </p>
                  <IoMdClose
                    className="w-[22px] h-[22px] text-custom-newGray ml-1 cursor-pointer"
                    onClick={() => {
                      cartClose(item, i);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white w-full rounded-[5px] boxShadows md:p-5 p-2 mt-5">
            <div className="flex justify-between items-center w-full">
              <p className="text-custom-purple font-normal text-base">
                Item Total
              </p>
              <p className="text-custom-purple font-normal text-base">
                ₹{CartTotal}
              </p>
              {/* <del className="font-normal text-base text-custom-grayColors mr-5">₹941</del> */}
            </div>

            <div className="flex justify-between items-center w-full pt-3">
              <p className="text-custom-red font-normal text-base">
                Delivery Fee (₹35 Saved)
              </p>
              <p className="text-custom-purple font-normal text-base">
                ₹{deliveryCharge}
              </p>
              {/* <del className="font-normal text-base text-custom-grayColors mr-5">₹35</del> */}
            </div>

            <div className="flex justify-between items-center w-full pt-3 border-b border-b-[#97999B80] pb-5">
              <p className="text-custom-grayColors font-normal text-base">
                Delivery Partner Tip
              </p>
              <p className="font-normal text-base text-custom-purple">
                ₹{deliveryPartnerTip}
              </p>
            </div>

            <div className="flex justify-between items-center w-full pt-5">
              <p className="text-custom-purple font-normal text-base">
                Total Payable
              </p>
              <p className="text-custom-purple font-medium text-base">
                ₹{mainTotal}
              </p>
            </div>
          </div>

          {productList.map((item, i) => (
            <GroceryCategories item={item} i={i} />
          ))}

          <button
            className="bg-custom-red h-[50px] rounded-[12px] w-full font-semibold text-white text-base text-center mt-5"
            onClick={() => {
              if (cartData?.length === 0) {
                toaster({ type: "warning", message: "Your cart is empty" });
                return;
              } else {
                setShowcart(true);
                setOpenCart(false);
              }
            }}
          >
            CONTINUE TO PAY ₹{CartTotal}
          </button>

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
                      <IoRemoveSharp 
                      onClick={() => {
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

      {showcart && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/30 flex justify-center items-center z-50">
          <div className="relative w-[300px] md:w-[360px] h-auto  bg-white rounded-[15px] m-auto">
            <div
              className="absolute top-2 right-2 p-1 rounded-full  text-black w-8 h-8 cursor-pointer"
              onClick={() => {
                setShowcart(false);
              }}
            >
              <RxCrossCircled className="h-full w-full font-semibold " />
            </div>

            <form className="px-5 py-5" onSubmit={createProductRquest}>
              <p className="text-black font-bold text-2xl mb-5">
                Shipping Address
              </p>

              <div className="w-full">
                <input
                  className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none mb-5"
                  type="text"
                  placeholder="First Name"
                  required
                  value={shippingAddressData?.firstName}
                  onChange={(text) => {
                    setShippingAddressData({
                      ...shippingAddressData,
                      firstName: text.target.value,
                    });
                  }}
                />
              </div>

              <div className="w-full">
                <input
                  className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none mb-5"
                  type="text"
                  placeholder="Address"
                  required
                  value={shippingAddressData?.address}
                  onChange={(text) => {
                    setShippingAddressData({
                      ...shippingAddressData,
                      address: text.target.value,
                    });
                  }}
                />
              </div>

              <div className="w-full">
                <input
                  className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none mb-5"
                  type="number"
                  placeholder="Pin Code"
                  required
                  value={shippingAddressData?.pinCode}
                  onChange={(text) => {
                    setShippingAddressData({
                      ...shippingAddressData,
                      pinCode: text.target.value,
                    });
                  }}
                />
              </div>

              <div className="w-full">
                <input
                  className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none mb-5"
                  type="number"
                  placeholder="Phone number"
                  required
                  value={shippingAddressData?.phoneNumber}
                  onChange={(text) => {
                    setShippingAddressData({
                      ...shippingAddressData,
                      phoneNumber: text.target.value,
                    });
                  }}
                />
              </div>

              <div className="w-full">
                <input
                  className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none mb-5"
                  type="text"
                  placeholder="City"
                  required
                  value={shippingAddressData?.city}
                  onChange={(text) => {
                    setShippingAddressData({
                      ...shippingAddressData,
                      city: text.target.value,
                    });
                  }}
                />
              </div>

              <div className="w-full">
                <input
                  className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none mb-5"
                  type="text"
                  placeholder="Country"
                  required
                  value={shippingAddressData?.country}
                  onChange={(text) => {
                    setShippingAddressData({
                      ...shippingAddressData,
                      country: text.target.value,
                    });
                  }}
                />
              </div>

              <div className="flex md:justify-start justify-center">
                <button
                  className="bg-custom-purple w-full md:h-[50px] h-[40px] rounded-[5px] text-white font-normal text-base"
                  type="submit"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Drawer open={showCategory1} anchor="top" onClose={closeDrawer1}>
        <div className="max-w-7xl  mx-auto w-full  relative">
          <div className="flex items-center justify-between border-b border-custom-newLightGray p-5 gap-5">
            {/* <p className='text-black text-2xl font-normal AbrilFatface'>Filters</p> */}
            <input
              type="text"
              ref={inputRef2}
              value={serchData}
              onChange={(text) => {
                setSearchData(text.target.value);
                if (text.target.value) {
                  getproductBySearchCategory(text.target.value);
                } else {
                  setProductsList([]);
                }
              }}
              placeholder="Search for products..."
              className="bg-custom-lightGray px-5 h-10 w-full rounded-[62px] outline-none  text-black"
            />
            <IconButton
              variant="text"
              color="blue-gray"
              onClick={() => {
                setShowCategory1(false);
                setSearchData("");
              }}
            >
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
                <p className="md:text-[48px] text-2xl text-black font-normal text-center">
                  Products
                </p>
                <div className="md:py-10 py-5 grid md:grid-cols-4 grid-cols-1 gap-5 w-full">
                  {productsList.map((item, i) => (
                    <div
                      key={i}
                      className="w-full"
                      onClick={() => {
                        setShowCategory1(false);
                        setSearchData("");
                        setProductsList([]);
                      }}
                    >
                      <GroceryCategories item={item} i={i} url={`/product-details/${item?.slug}`}
                      />
                    </div>
                  ))}
                </div>
                {productsList?.length === 0 && (
                  <p className="text-2xl text-black font-normal text-center">
                    No Products
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
