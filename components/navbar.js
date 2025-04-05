import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { TiArrowSortedUp } from "react-icons/ti";
import { useContext } from "react";
import {
  cartContext,
  openCartContext,
  userContext,
  wishlistContext,
} from "@/pages/_app";
import Swal from "sweetalert2";
// import * as rdd from "react-device-detect";
import { LuLogIn } from "react-icons/lu";
import { Api } from "@/services/service";
// import { MdNavigateNext } from "react-icons/md";
import { Drawer, Typography, IconButton, Button } from "@mui/material";
// import Categoriess from "./Categoriess";
// import ProductCard from "./ProductCard";
import Badge from "@mui/material/Badge";
import { FaMapMarker, FaMapMarkerAlt, FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
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
import { GoCart } from "react-icons/go";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";
import currencySign from "@/utils/currencySign";
import formatShippingAddress from "@/utils/formatShippingAddress";
import { FaCircleUser } from "react-icons/fa6";
import AddressInput from "./AddressInput ";
import { useJsApiLoader } from "@react-google-maps/api";
// Google place api integration

// Set google api key
const GOOGLE_API_KEY = "AIzaSyDHd5FoyP2sDBo0vO2i0Zq7TIUZ_7GhBcI";

const Navbar = (props) => {
  // console.log(props)
  const [navbar, setNavbar] = useState(false);
  const [showHover, setShowHover] = useState(true);
  const [showSub, setShowSub] = useState("");
  const router = useRouter();
  const [user, setUser] = useContext(userContext);
  const [wishlist, setWishlist] = useContext(wishlistContext);
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
  const [redeemPoints, setRedeemPoints] = useState();
  const [CartTotal, setCartTotal] = useState(0);
  const [openCart, setOpenCart] = useContext(openCartContext);
  const [CartItem, setCartItem] = useState(0);
  const [cartData, setCartData] = useContext(cartContext);
  const [showcart, setShowcart] = useState(false);
  const [shippingAddressData, setShippingAddressData] = useState({
    firstName: "",
    houseNo: "",
    address: "",
    pinCode: "",
    phoneNumber: "",
    city: "",
    country: "",
    lat: null,
    lng: null,
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

  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: GOOGLE_API_KEY,
  //   libraries: ["places"],
  // });

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

  // useEffect(() => {
  //   // const d = cartData.find(
  //   //   (f) => f._id === f.category._id
  //   // );
  //   // console.log(d)
  //   if (cartData?.length > 0) {
  //     getproductByCategory();
  //   }
  //   // getCategory()
  // }, []);
  
    const getFavourite = async () => {
      props.loader(true);
      Api("get", "getFavourite", "", router).then(
        (res) => {
          props.loader(false);
          console.log("res================>", res);
          setWishlist(res.data);
        },
        (err) => {
          props.loader(false);
          console.log(err);
          props.toaster({ type: "error", message: err?.message });
        }
      );
    };

  // useEffect(() => {
  //   const wishList = localStorage.getItem("wishlist");
  //   if (wishList) {
  //     const wishListData = JSON.parse(wishList);
  //     setWishlist(wishListData);
  //   }
  // }, []);

  // console.log("wish list data----->", wishlist);

  const getShippingAddress = useCallback(() => {
    props.loader(true);

    Api("get", "getShippingAddress", "", router)
      .then((res) => {
        props.loader(false);
        console.log("res================>", res);
        setShippingAddressData(res?.data || {});
      })
      .catch((err) => {
        props.loader(false);
        console.log(err);
        // props.toaster({
        //   type: "error",
        //   message: err?.message || "Failed to fetch shipping address",
        // });
      });
  }, [router]);

  useEffect(() => {
    if (user?.token) {
      getFavourite();
      getShippingAddress();
    }
  }, [user, getShippingAddress]);

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
    setOpenCart(false);
    props?.toaster({
      type: "success",
      message: "Items removed from cart",
    });
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
    console.log("im address ", shippingAddressData);

    if (e) {
      e.preventDefault();
    }
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
      console.log("hey i'm image ", element?.selectedImage);
      data.push({
        product: element?._id,
        image: element.selectedColor?.image,
        color: element.selectedColor?.color || "",
        total: element.total,
        price: element.price,
        qty: element.qty,
        seller_id: element.userid,
      });
    });

    let newData = {
      productDetail: data,
      sold_pieces: d?.qty,
      total: mainTotal.toFixed(2),
      shipping_address: {
        ...shippingAddressData,
        location: {
          type: "Point",
          coordinates: [
            shippingAddressData.lng ? Number(shippingAddressData.lng) : 0,
            shippingAddressData.lat ? Number(shippingAddressData.lat) : 0,
          ],
        },
      },
      location: {
        type: "Point",
        coordinates: [
          shippingAddressData.lng ? Number(shippingAddressData.lng) : 0,
          shippingAddressData.lat ? Number(shippingAddressData.lat) : 0,
        ],
      },
      paymentmode: "cod",
    };

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

  // console.log("cart data::", cartData);

  const pricePerPoint = 0.001;
  const minPointsRequired = 25000;
  let redeemablePoints;
  if (user?.referalpoints > minPointsRequired) {
    if (CartTotal >= 400) {
      redeemablePoints = Math.floor(user?.referalpoints / 1000) * 1000;
    } else if (CartTotal < 400) {
      redeemablePoints = Math.floor(user?.referalpoints / 10000) * 1000;
    } else {
      redeemablePoints = 0;
    }
  } else {
    redeemablePoints = 0;
  }

  const redeemableAmount = redeemablePoints * pricePerPoint;
  const finalAmount = CartTotal - redeemableAmount;

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setMainTotal(finalAmount);
    } else {
      setMainTotal(CartTotal + deliveryCharge + deliveryPartnerTip);
    }
  };

  return (
    <div>
      <nav
        className={`flex flex-col justify-center min-h-max h-auto  bg-white w-full z-50 md:p-0 p-3`}
      >
        {/* drop-shadow-md */}
        <div className="w-full md:border-b border-b-0 border-b-gray-400 px-1 md:px-6 2xl:px-0">
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
                          getproductBySearchCategory(serchData);
                          router.push(`/search-result?query=${serchData}`);
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
                      <div className="relative">
                        <div className="cursor-pointer">
                          <FaRegHeart className="w-[24px] h-[24px] text-custom-purple" />
                        </div>
                        {wishlist?.length > 0 && (
                          <span className="bg-red-500 absolute w-5 h-5 rounded-full top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-white text-center">
                            {wishlist?.length}
                          </span>
                        )}
                      </div>
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
                      <div className="relative">
                        <div className="cursor-pointer">
                          <FiShoppingCart className="w-[24px] h-[24px] text-custom-purple" />
                        </div>
                        {cartData.length > 0 && (
                          <span className="bg-red-500 absolute w-5 h-5 rounded-full top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-white text-center">
                            {cartData?.length}
                          </span>
                        )}
                      </div>
                      {/* <FiShoppingCart className="w-[24px] h-[24px] text-custom-purple" /> */}
                      <span className="text-black text-xs	font-medium">
                        My cart
                      </span>
                    </li>
                  </ul>

                  <div className="md:flex hidden justify-start items-center">
                    {user?.token === undefined && (
                      <div
                        className="bg-custom-purple cursor-pointer text-white  h-[35px] w-[35px] rounded-full md:flex justify-center items-center hidden"
                        onClick={() => {
                          router.push("/auth/signIn");
                        }}
                      >
                        <FaUserCircle className="text-white text-3xl" />
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
                                <li className="px-5 shadow-inner feature1  py-2">
                                  <div
                                    className="block px-5 py-1  pl-0 text-white text-left font-semibold text-base"
                                    aria-current="page"
                                    onClick={() => {
                                      router.push("/MyProfile");
                                    }}
                                  >
                                    {"My Profile"}
                                  </div>
                                </li>
                                <li className="px-5 shadow-inner feature1  py-2">
                                  <div
                                    className="block px-5 py-1  pl-0 text-white text-left font-semibold text-base"
                                    aria-current="page"
                                    onClick={() => {
                                      router.push("/orders");
                                    }}
                                  >
                                    {"My order"}
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

                <div
                  className="cursor-pointer flex items-center justify-center"
                  onClick={() => {
                    router.push("/favourite");
                  }}
                >
                  <div className="relative">
                    <div className="cursor-pointer">
                      <FaRegHeart className="w-[24px] h-[24px] text-custom-purple" />
                    </div>
                    {wishlist?.length > 0 && (
                      <span className="bg-red-500 text-sm absolute w-5 h-5 rounded-full top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-white text-center">
                        {wishlist?.length}
                      </span>
                    )}
                  </div>
                </div>
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
        <div
          className={`md:w-[700px] w-[330px] relative   pb-5 bg-custom-purple  pt-5 md:px-10 px-5 ${
            !cartData.length ? "h-full" : ""
          }`}
        >
          <div className="bg-white w-full rounded-[5px]  boxShadows md:p-5 p-2 flex justify-between items-center">
            <div
              className="flex justify-start items-center  gap-1 cursor-pointer"
              onClick={() => {
                setOpenCart(false);
              }}
            >
              <IoIosArrowBack className="md:w-[38px] w-[28px] md:h-[31px] h-[21px] text-black" />
              <p className="text-custom-purple md:text-2xl text-base font-bold">
                Your Cart
              </p>
            </div>
            {cartData.length > 0 && (
              <button
                className="text-white font-medium text-base bg-custom-red rounded-[12px] md:h-[50px] h-[40px] md:w-[112px] w-[105px]"
                // onClick={() => {
                //   emptyCart();
                // }}
                onClick={() => {
                  // Get the drawer element reference
                  const drawerElement =
                    document.querySelector(".MuiDrawer-paper");

                  // Set up SweetAlert
                  Swal.fire({
                    title: "Are you sure you want to empty your cart?",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    confirmButtonColor: "#35035C",
                    cancelButtonColor: "#d33",  
                    reverseButtons: true,
                    // width: "320px",
                    target: drawerElement,
                    didOpen: () => {
                      // Add custom styling to position the alert within the drawer
                      const swalContainer = document.querySelector(
                        ".swal2-drawer-container"
                      );
                      if (swalContainer) {
                        swalContainer.style.position = "absolute";
                        swalContainer.style.zIndex = "9999";
                      }
                    },
                  }).then(function (result) {
                    if (result.isConfirmed) {
                      emptyCart();
                    }
                  });
                }}
              >
                Empty Cart
              </button>
            )}
          </div>

          {/* <div className="bg-white w-full rounded-[5px] boxShadows md:p-5 p-2 mt-5">
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
          </div> */}

          <div className="bg-white w-full rounded-[5px] boxShadows md:p-5 p-2 mt-5">
            {cartData && cartData.length > 0 ? (
              <div className="flex justify-start items-center gap-5">
                <div className="w-[50px] h-[39px] rounded-[8px] bg-custom-purple flex justify-center items-center">
                  <GoClock className="text-white w-[38px] h-[29px]" />
                </div>
                <p className="text-custom-purple font-semibold text-xl">
                  Items
                </p>
                {/* Delivery in 8 mins */}
              </div>
            ) : (
              <div className="bg-white w-full rounded-[5px]  md:p-5 p-2 mt-5 text-center">
                <MdOutlineShoppingCart className="text-custom-purple text-5xl mx-auto mb-4" />
                <p className="text-custom-purple font-semibold text-xl">
                  Your cart is empty
                </p>
                {/* <p className="text-custom-newGrayColors text-sm mt-2">
              Looks like you haven't added any items to your cart yet. Start shopping now!
            </p> */}
                <button
                  className="bg-custom-red text-white text-base font-medium rounded-[12px] md:w-[200px] w-full mt-5 py-3"
                  onClick={() => {
                    setOpenCart(false);
                    router.push("/");
                  }}
                >
                  Start Shopping
                </button>
              </div>
            )}
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
                      <span className="pl-3">
                        {item?.price_slot?.value ?? 1}
                      </span>{" "}
                      <span>{item?.price_slot?.unit ?? "unit"}</span>
                    </p>
                    <p className="text-custom-newGrayColors font-normal text-sm pt-2">
                      <span className="pl-3">
                        {currencySign(item?.price_slot?.our_price)}
                      </span>{" "}
                      <span className="line-through">
                        {currencySign(item?.price_slot?.other_price)}
                      </span>
                    </p>
                  </div>
                  <div className="flex md:justify-center justify-start md:items-center items-start col-span-2 md:mt-0 mt-2 md:hidden">
                    <p className="text-custom-purple font-semibold text-base">
                      {currencySign(item?.our_price)}
                      <del className="text-custom-red font-normal text-xs ml-2">
                        {currencySign(item?.other_price)}
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
                      className="h-[39px] w-[51px] bg-custom-purple cursor-pointer rounded-[8px] rounded-r-none	 flex justify-center items-center"
                      onClick={() => {
                        if (item.qty > 1) {
                          const nextState = produce(cartData, (draft) => {
                            draft[i].qty -= 1;
                            draft[i].total = (
                              parseFloat(draft[i]?.price_slot?.our_price) *
                              draft[i].qty
                            ).toFixed(2);
                          });
                          setCartData(nextState);
                          localStorage.setItem(
                            "addCartDetail",
                            JSON.stringify(nextState)
                          );
                        }
                        // Remove only the specific price slot variation when qty = 1

                        // else {
                        //   const updatedCart = cartData.filter(
                        //     (cartItem) =>
                        //       !(cartItem._id === item._id && cartItem.price_slot.value === item.price_slot.value)
                        //   );

                        //   setCartData(updatedCart);
                        //   localStorage.setItem("addCartDetail", JSON.stringify(updatedCart));
                        // }
                      }}
                    >
                      <IoRemoveSharp className="h-[30px] w-[30px] text-white" />
                    </div>
                    <p className="text-black md:text-xl text-lg font-medium text-center mx-5">
                      {item?.qty}
                    </p>
                    <div
                      className="h-[39px] w-[51px] bg-custom-purple cursor-pointer rounded-[8px] rounded-l-none flex justify-center items-center"
                      onClick={() => {
                        const nextState = produce(cartData, (draft) => {
                          draft[i].qty += 1;
                          draft[i].total = (
                            parseFloat(draft[i]?.price_slot?.our_price) *
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
                    {currencySign(item?.total)}
                    <del className="text-custom-red font-normal text-xs ml-2">
                      {currencySign(item?.price_slot?.other_price * item?.qty)}
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

          {cartData.length > 0 && (
            <div className="bg-white w-full rounded-[5px] boxShadows md:p-5 p-2 mt-5">
              <div className="flex justify-between items-center w-full">
                <p className="text-custom-purple font-normal text-base">
                  Total Amount
                </p>
                <p className="text-custom-purple font-normal text-base">
                  {currencySign(CartTotal)}
                </p>
                {/* <del className="font-normal text-base text-custom-grayColors mr-5">₹941</del> */}
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-custom-purple text-base">
                  You have total point
                </p>
                <div className="flex gap-1 ">
                  <span>
                    <MdOutlineStar className="text-lg mt-[2px] text-custom-red" />
                  </span>
                  <span className="text-custom-purple">
                    {user?.referalpoints || 0}
                  </span>
                </div>
              </div>
              {user?.referalpoints > 25000 ? (
                <div className="mt-1">
                  <input type="checkbox" onChange={handleCheckboxChange} />{" "}
                  <span>
                    Use{" "}
                    <span className="text-custom-purple font-semibold">
                      {redeemablePoints}
                    </span>{" "}
                    points
                  </span>
                </div>
              ) : (
                <p className="mt-1 text-base text-custom-purple">
                  Minimum{" "}
                  <span className="font-semibold text-custom-purple">
                    25,000{" "}
                  </span>
                  points required to redeem
                </p>
              )}

              <div className="flex justify-between items-center w-full pt-3">
                <p className="text-custom-red font-normal text-base">
                  Delivery Fee ({currencySign(35)} Saved)
                </p>
                <p className="text-custom-purple font-normal text-base">
                  {currencySign(deliveryCharge)}
                </p>
                {/* <del className="font-normal text-base text-custom-grayColors mr-5">₹35</del> */}
              </div>

              <div className="flex justify-between items-center w-full pt-3 border-b border-b-[#97999B80] pb-5">
                <p className="text-custom-grayColors font-normal text-base">
                  Delivery Partner Tip
                </p>
                <p className="font-normal text-base text-custom-purple">
                  {currencySign(deliveryPartnerTip)}
                </p>
              </div>

              <div className="flex justify-between items-center w-full pt-3 border-b border-b-[#97999B80] pb-5">
                <p className="text-custom-grayColors font-normal text-base">
                  Delivery Partner Tip
                </p>
                <p className="font-normal text-base text-custom-purple">
                  {currencySign(deliveryPartnerTip)}
                </p>
              </div>

              <div className="flex justify-between items-center w-full pt-5">
                <p className="text-custom-purple font-normal text-base">
                  Total Payable
                </p>
                <p className="text-custom-purple font-medium text-base">
                  {currencySign(mainTotal)}
                </p>
              </div>

              {shippingAddressData &&
                user?.token &&
                (shippingAddressData.firstName ||
                  shippingAddressData.address ||
                  shippingAddressData.city ||
                  shippingAddressData.country) && (
                  <div
                    onClick={() => {
                      setOpenCart(false);
                      setShowcart(true);
                    }}
                    className="flex justify-between items-center w-full pt-5"
                  >
                    <p className="text-custom-purple font-normal text-base">
                      Delivery Address
                    </p>
                    <p className="text-custom-purple font-medium text-base flex items-center">
                      <FaMapMarkerAlt />{" "}
                      {formatShippingAddress(shippingAddressData)}
                    </p>
                  </div>
                )}
            </div>
          )}

          {/* {productList.map((item, i) => (
            <GroceryCategories
              item={item}
              i={i}
              loader={props?.loader}
              toaster={props?.toaster}
            />
          ))} */}

          {cartData.length > 0 && (
            <button
              className="bg-custom-red h-[50px] rounded-[12px] w-full font-semibold text-white text-base text-center mt-5"
              onClick={() => {
                if (mainTotal <= 0) {
                  props.toaster({
                    type: "warning",
                    message: "Product is not valid!",
                  });
                  return;
                }
                if (cartData?.length === 0) {
                  props.toaster({
                    type: "warning",
                    message: "Your cart is empty",
                  });
                  return;
                }

                if (!shippingAddressData?.address || !user?.token) {
                  setShowcart(true);
                  setOpenCart(false);
                  return;
                }

                createProductRquest();
                setOpenCart(false);
              }}
            >
              CONTINUE TO PAY {currencySign(mainTotal)}
            </button>
          )}
        </div>
      </Drawer>

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

      {showcart && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/30 flex justify-center items-center z-50">
          <div className="relative w-[300px] md:w-[360px] h-auto max-h-[90vh] overflow-y-auto  bg-white rounded-[15px] m-auto">
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
                  placeholder="House No. / Street Address"
                  required
                  value={shippingAddressData?.houseNo}
                  onChange={(text) => {
                    setShippingAddressData({
                      ...shippingAddressData,
                      houseNo: text.target.value,
                    });
                  }}
                />
              </div>

              <div className="w-full">
                <AddressInput
                  setShippingAddressData={setShippingAddressData}
                  shippingAddressData={shippingAddressData}
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
                      <GroceryCategories
                        item={item}
                        i={i}
                        url={`/product-details/${item?.slug}`}
                        loader={props?.loader}
                        toaster={props?.toaster}
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
    </div>
  );
};

export default Navbar;
