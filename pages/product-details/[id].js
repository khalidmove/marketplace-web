import GroceryCategories from "@/components/GroceryCatories";
import ShopFasterMarketplace from "@/components/ShopFasterMarketplace";
import SimilarProducts from "@/components/SimilarProducts";
import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoRemoveSharp } from "react-icons/io5";
import { IoAddSharp } from "react-icons/io5";
import { useRouter } from "next/router";
import {
  cartContext,
  openCartContext,
  userContext,
  wishlistContext,
} from "../_app";
import { Api } from "@/services/service";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { produce } from "immer";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import currencySign from "@/utils/currencySign";

function ProductDetails(props) {
  const router = useRouter();
  console.log(router);
  const [user, setUser] = useContext(userContext);
  const [wishlist, setWishlist] = useContext(wishlistContext);
  const [productsId, setProductsId] = useState({});
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImageList, setSelectedImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [productReviews, setProductReviews] = useState([]);
  const [productList, SetProductList] = useState([]);
  const [cartData, setCartData] = useContext(cartContext);
  const [openCart, setOpenCart] = useContext(openCartContext);
  const [priceSlot, setPriceSlote] = useState([]);
  const [priceIndex, setPriceIndex] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState({});
  const [isInCart, setIsInCart] = React.useState(false);
  const [availableQty, setAvailableQty] = React.useState(0);

  useEffect(() => {
    if (router?.query?.id) {
      getProductById();
    }
  }, [router?.query?.id]);

  console.log(selectedPrice);

  // useEffect(() => {
  //   if (cartData.length > 0) {
  //     const cartItem = cartData.find((f) => f._id === productsId?._id);
  //     if (cartItem) {
  //       setIsInCart(true);
  //       setAvailableQty(cartItem.qty);
  //     } else {
  //       setIsInCart(false);
  //       setAvailableQty(0);
  //     }
  //   } else {
  //     setIsInCart(false);
  //     setAvailableQty(0);
  //   }
  // }, [cartData, productsId]);

  useEffect(() => {
    if (cartData.length > 0) {
      const cartItem = cartData.find(
        (f) =>
          f._id === productsId?._id &&
          f.price_slot?.value === selectedPrice?.value
      );

      if (cartItem) {
        setIsInCart(true);
        setAvailableQty(cartItem.qty);
      } else {
        setIsInCart(false);
        setAvailableQty(0);
      }
    } else {
      setIsInCart(false);
      setAvailableQty(0);
    }
  }, [cartData, productsId, selectedPrice]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleIndex = (index) => {
    setPriceIndex(index);
  };

  const getProductById = async () => {
    let url = `getProductByslug/${router?.query?.id}`;
    if (user?.token) {
      url = `getProductByslug/${router?.query?.id}?user=${user?._id}`;
    }
    props.loader(true);
    Api("get", url, "", router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        res.data.qty = 1;
        res.data.total = (res.data?.our_price * res.data.qty).toFixed(2);

        setProductsId(res.data);

        console.log(res?.data?.minQuantity);

        // res.data?.varients[0].selected.map((ele) => {
        //   ele.request = 0;
        // });

        setSelectedColor(res.data?.varients[0]);
        setSelectedImageList(res.data?.varients[0].image);
        setSelectedImage(res.data?.varients[0].image[0]);
        getproductByCategory(res.data.category?.slug, res.data._id);
        setProductReviews(res.data?.reviews);
        if (router.query.clientSecret) {
          setShowPayment(false);
          createProductRquest();
        }
        setPriceSlote(res?.data?.price_slot);
        setSelectedPrice(res?.data?.price_slot[0]);
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  // console.log("price slot ::", priceSlot);

  const getproductByCategory = async (category_id, product_id) => {
    props.loader(true);
    Api(
      "get",
      `getProductBycategoryId?category=${category_id}&product_id=${product_id}`,
      "",
      router
    ).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        const sameItem = res?.data?.filter((f) => f._id !== router?.query?.id);
        SetProductList(sameItem);

        // if (sameItem && sameItem?.isArray(res?.data)) {
        //   const activeProducts = sameItem.filter(product => product.status !== 'suspended');
        //   console.log("Filtered Data:", activeProducts);
        //   if (activeProducts.length > 0) {
        //     SetProductList(activeProducts);
        //   } else {
        //     props.toaster({ type: "info", message: "No active products found" });
        //   }
        // } else {
        //   console.error("Unexpected response format:", res);
        //   props.toaster({ type: "error", message: "Unexpected response format" });
        // }
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  const addremovefavourite = () => {
    if (!user?.token) {
      props.toaster({ type: "success", message: "Login required" });
      return;
    }
    let data = {
      product: productsId?._id,
    };

    props.loader(true);
    Api("post", "addremovefavourite", data, router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        if (res.status) {
          props.toaster({ type: "success", message: res.data?.message });
          getProductById();
          if (res.data?.message === "Product added to favourite") {
            const updatedWishlist = [...wishlist, productsId];
            setWishlist(updatedWishlist);
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
          } else if (res?.data?.message === "Product removed to favourite") {
            const updatedWishlist = wishlist.filter(
              (item) => item._id !== productsId._id
            );
            setWishlist(updatedWishlist);
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
          }
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

  return (
    <div className="bg-white w-full">
      <section className="bg-white w-full md:pt-10 pt-5 md:pb-5 pb-5 px-1 md:px-6 px-5 2xl:px-0">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-5">
            <div className="border border-black p-[10px] rounded-[15px]">
              <Carousel
                className="h-full w-full"
                responsive={responsive}
                autoPlay={false}
                infinite={true}
                arrows={true}
              >
                {selectedImageList?.map((item, i) => (
                  <div key={i} className="bg-white w-full md:h-[446px]">
                    <img className="h-full w-full object-contain" src={item} />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="flex justify-start items-center w-full">
              <div className="flex flex-col justify-start items-start w-full">
                <div className="flex justify-between items-center w-full">
                  <p className="text-black md:text-[32px] text-2xl font-semibold">
                    {productsId?.name}
                  </p>
                  <div
                    className="w-[46px] h-[46px] bg-custom-offWhite rounded-full flex justify-center items-center cursor-pointer"
                    onClick={addremovefavourite}
                  >
                    {!productsId?.favourite && (
                      <FaRegHeart className="text-black w-[23px] h-[23px]" />
                    )}
                    {productsId?.favourite && (
                      <FaHeart className="text-red-700 w-[23px] h-[23px]" />
                    )}
                  </div>
                </div>

                {/* <div className='flex justify-start items-center pt-2'>
                                    <p className='text-custom-newPurple font-semibold md:text-xl text-base'>See All Tata Products</p>
                                    <IoIosArrowBack className='text-custom-newPurple rotate-180 w-[15px] h-[15px] ml-2' />
                                </div> */}

                <div className="pt-5 grid md:grid-cols-3 grid-cols-1 w-full gap-5">
                  {priceSlot &&
                    priceSlot.map((data, i) => {
                      const otherprice = parseFloat(data?.other_price);
                      const ourPrice = parseFloat(data?.our_price);
                      const percentageDifference =
                        otherprice && ourPrice
                          ? ((otherprice - ourPrice) / otherprice) * 100
                          : 0;
                      return (
                        <div key={i}>
                          <div
                            // onClick={() => handleIndex(i)}
                            onClick={() => {
                              setSelectedPrice(data);
                              setPriceIndex(i);
                            }}
                            className={`bg-custom-lightPurple cursor-pointer w-full rounded-[8px] border border-custom-darkPurple p-[10px] relative
                                        ${
                                          priceIndex == i
                                            ? "bg-custom-lightPurple"
                                            : "bg-white"
                                        }
                            `}
                          >
                            <img
                              className="w-[70px] h-[60px] object-contain absolute -top-[20px] -right-[18px]"
                              src="/starImg.png"
                            />
                            <p className="text-white text-center text-[8px] font-medium absolute -top-[2px] right-[1px]">
                              {percentageDifference?.toFixed(2)}%<br />
                              off
                            </p>
                            <p className="text-black font-normal text-base pt-1">
                              {currencySign(data.our_price)}
                              <span className="text-custom-newGray font-normal line-through ml-1">
                                {currencySign(data?.other_price)}
                              </span>
                            </p>
                            <p className="text-custom-newPurpleColor font-semibold text-sm pt-2">
                              <span className="text-custom-newGray font-normal">
                                {data?.value}{" "} {data?.unit ?? "unit"}
                              </span>
                            </p>
                          </div>

                          {/* {priceIndex === i && (
                            <div className="pt-3 mt-2 px-4  border-custom-darkPurple">
                              <p className="text-custom-newPurpleColor font-semibold text-lg">
                                ₹{data?.our_price}{" "}
                                <span className="text-custom-newGray text-sm font-normal line-through">
                                  {data?.other_price}
                                </span>{" "}
                                <span className="text-sm">
                                  {percentageDifference?.toFixed(2)}%
                                </span>
                              </p>
                            </div>
                          )} */}
                        </div>
                      );
                    })}
                </div>

                <div className="pt-3 mt-2 px-4  border-custom-darkPurple">
                  <p className="text-custom-newPurpleColor font-semibold text-lg">
                    {currencySign(selectedPrice?.our_price)}{" "}
                    <span className="text-custom-newGray text-sm font-normal line-through">
                      {currencySign(selectedPrice?.other_price)}
                    </span>{" "}
                    <span className="text-sm">
                      {/* {percentageDifference?.toFixed(2)}% */}
                      {(
                        ((selectedPrice?.other_price -
                          selectedPrice?.our_price) /
                          selectedPrice?.other_price) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </p>
                </div>

                {/* <div className='bg-white w-full rounded-[8px] border border-custom-newLightGray p-[10px] relative'>
                                        <img className='w-[60px] h-[60px] object-contain absolute -top-[20px] -right-[18px]' src='/starImg.png' />
                                        <p className='text-white text-[8px] font-medium absolute -top-[2px] right-[5px]'>5%<br />off</p>
                                        <p className='text-black font-normal text-sm'>1 kg</p>
                                        <p className='text-black font-normal text-base pt-1'>₹40</p>
                                        <p className='text-custom-newPurpleColor font-normal text-sm pt-2'>₹ 4 / 100 gms</p>
                                    </div>

                                    <div className='bg-white w-full rounded-[8px] border border-custom-newLightGray p-[10px] relative'>
                                        <img className='w-[60px] h-[60px] object-contain absolute -top-[20px] -right-[18px]' src='/starImg.png' />
                                        <p className='text-white text-[8px] font-medium absolute -top-[2px] right-[5px]'>5%<br />off</p>
                                        <p className='text-black font-normal text-sm'>1.5 kg</p>
                                        <p className='text-black font-normal text-base pt-1'>₹54</p>
                                        <p className='text-custom-newPurpleColor font-normal text-sm pt-2'>₹ 3.6 / 100 gms</p>
                                    </div> */}
                {isInCart ? (
                  <div className="bg-slate-100 w-[100px] h-[32px] rounded-[8px] md:mt-5 mt-3 flex items-center">
                    <div
                      className="h-[32px] w-[32px] bg-custom-purple cursor-pointer rounded-[8px] rounded-r-none flex justify-center items-center"
                      onClick={() => {
                        if (!selectedPrice || !selectedPrice.our_price) {
                          console.error("No price slot selected");
                          return;
                        }

                        if (availableQty > 1) {
                          const updatedProduct = {
                            ...productsId,
                            qty: availableQty - 1,
                            price: selectedPrice.our_price,
                            price_slot: selectedPrice,
                            total: (
                              (selectedPrice.our_price || 0) *
                              (availableQty - 1)
                            ).toFixed(2),
                            selectedImage:
                              productsId.selectedImage ||
                              productsId.varients?.[0]?.image?.[0] ||
                              "",
                            selectedColor:
                              productsId.selectedColor ||
                              productsId.varients?.[0] ||
                              {},
                          };

                          setProductsId(updatedProduct);

                          // Update only the matching product with the same price slot
                          const updatedCart = cartData.map((item) =>
                            item._id === updatedProduct._id &&
                            item.price_slot.value === selectedPrice.value
                              ? updatedProduct
                              : item
                          );

                          setCartData(updatedCart);
                          localStorage.setItem(
                            "addCartDetail",
                            JSON.stringify(updatedCart)
                          );
                        } else {
                          // Remove only the specific price slot variation
                          const updatedCart = cartData.filter(
                            (item) =>
                              !(
                                item._id === productsId._id &&
                                item.price_slot.value === selectedPrice.value
                              )
                          );

                          setCartData(updatedCart);
                          localStorage.setItem(
                            "addCartDetail",
                            JSON.stringify(updatedCart)
                          );
                          setIsInCart(false);
                          setAvailableQty(0);
                        }
                      }}
                    >
                      <IoRemoveSharp className="h-[15px] w-[15px] text-white" />
                    </div>

                    <p className="text-black md:text-xl text-lg font-medium text-center mx-3">
                      {availableQty || 0}
                    </p>

                    <div
                      className="h-[32px] w-[32px] bg-custom-purple cursor-pointer rounded-[8px] rounded-l-none flex justify-center items-center"
                      onClick={() => {
                        if (!selectedPrice || !selectedPrice.our_price) {
                          console.error("No price slot selected");
                          return;
                        }

                        const updatedProduct = {
                          ...productsId,
                          qty: availableQty + 1,
                          price: selectedPrice.our_price,
                          price_slot: selectedPrice, 
                          total: (
                            (selectedPrice.our_price || 0) *
                            (availableQty + 1)
                          ).toFixed(2),
                          selectedImage:
                            productsId.selectedImage ||
                            productsId.varients?.[0]?.image?.[0] ||
                            "",
                          selectedColor:
                            productsId.selectedColor ||
                            productsId.varients?.[0] ||
                            {},
                        };

                        setProductsId(updatedProduct);

                        const updatedCart = cartData.map((item) =>
                          item._id === updatedProduct._id &&
                          item.price_slot.value === selectedPrice.value
                            ? updatedProduct
                            : item
                        );

                        setCartData(updatedCart);
                        localStorage.setItem(
                          "addCartDetail",
                          JSON.stringify(updatedCart)
                        );
                      }}
                    >
                      <IoAddSharp className="h-[15px] w-[15px] text-white" />
                    </div>
                  </div>
                ) : (
                  <button
                    className="bg-custom-purple w-[96px] h-[32px] rounded-[8px] text-white font-semibold text-xl md:mt-5 mt-4"
                    onClick={() => {
                      if (
                        !productsId ||
                        !productsId._id ||
                        !selectedPrice?.value
                      ) {
                        console.error(
                          "Invalid product data or price selection:",
                          productsId,
                          selectedPrice
                        );
                        return;
                      }

                      const existingCart = Array.isArray(cartData)
                        ? cartData
                        : [];

                      // Check if the exact product with selected price_slot exists
                      const existingProduct = existingCart.find(
                        (f) =>
                          f._id === productsId._id &&
                          f.price_slot?.value === selectedPrice?.value
                      );

                      if (!existingProduct) {
                        const newProduct = {
                          ...productsId,
                          qty: availableQty || 1,
                          price: selectedPrice.our_price,
                          price_slot: selectedPrice,
                          total: (
                            Number(selectedPrice?.our_price || 0) * Number(availableQty || 1)
                          ).toFixed(2),
                          selectedColor:
                            productsId.selectedColor ||
                            productsId.varients?.[0] ||
                            {},
                          selectedImage:
                            productsId.selectedImage ||
                            productsId.varients?.[0]?.image?.[0] ||
                            "",
                        };

                        const updatedCart = [...existingCart, newProduct];
                        setCartData(updatedCart);
                        localStorage.setItem(
                          "addCartDetail",
                          JSON.stringify(updatedCart)
                        );
                        console.log("Product added to cart:", newProduct);
                      } else {
                        console.log(
                          "Product already in cart with this price slot:",
                          existingProduct
                        );
                      }

                      props.toaster({
                        type: "success",
                        message: "Item added to cart",
                      });
                    }}
                  >
                    ADD
                  </button>
                )}

                {productsId.attributes?.some(
                  (attribute) => attribute.name === "color"
                ) && (
                  <div className="w-full">
                    <p className="text-custom-newBlacks font-semibold text-lg md:pt-5 pt-3 pb-3">
                      Select Colors
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {productsId?.varients?.map((item, i) => (
                        <div
                          key={i}
                          className="md:w-[37px] w-[19px] md:h-[37px] h-[19px] rounded-full flex justify-center items-center border border-black"
                          style={{ background: item?.color }}
                          onClick={() => {
                            item.selected.forEach((ele) => {
                              ele.request = 0;
                            });
                            setSelectedColor(item);
                            setSelectedImageList(item?.image);
                            setSelectedImage(item?.image[0]);
                          }}
                        >
                          {selectedColor?.color === item?.color && (
                            <FaCheck className="md:w-[18px] w-[11px] md:h-[15px] h-[8px] text-white" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full bg-[#FC096530] md:my-10 my-5 p-5">
            <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-5">
              <div className="flex flex-col justify-start items-start">
                <p className="text-black md:text-2xl text-xl font-bold">
                  About Product
                </p>
                <p className="text-black font-medium md:text-xl text-base pt-2">
                  Description :{" "}
                  <span className="text-custom-newGray font-normal md:text-xl text-base">
                    {productsId?.long_description}
                  </span>
                </p>
              </div>
              <div className="flex flex-col justify-start items-start">
                <p className="text-black font-medium md:text-xl text-base">
                  Country of Origin :{" "}
                  <span className="text-custom-newGray font-normal md:text-xl text-base">
                    {productsId?.origin}
                  </span>
                </p>
                {/* <p className="text-black font-medium md:text-xl text-base pt-2">
                  Self Life :{" "}
                  <span className="text-custom-newGray font-normal md:text-xl text-base">
                    {productsId?.selflife}
                  </span>
                </p> */}
                <p className="text-black font-medium md:text-xl text-base pt-2">
                  Manufacturer Name :{" "}
                  <span className="text-custom-newGray font-normal md:text-xl text-base">
                    {productsId?.manufacturername}
                  </span>
                </p>
                <p className="text-black font-medium md:text-xl text-base pt-2">
                  Manufacturer Address :{" "}
                  <span className="text-custom-newGray font-normal md:text-xl text-base">
                    {productsId?.manufactureradd}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white w-full md:pt-10 md:pb-10 pb-5">
            <p className="text-black text-xl font-bold md:mb-10 mb-5">
              Similar Products
            </p>
            <div className="grid md:grid-cols-5 grid-cols-1 md:gap-3 gap-5">
              {productList.map((item, i) => (
                <div key={i} className="w-full md:mb-5">
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
          </div>

          <div className="bg-white w-full">
            <p className="text-black text-xl font-bold md:mb-10 mb-5">
              You might also like
            </p>
            <div className="grid md:grid-cols-5 grid-cols-1 md:gap-3 gap-5">
              {productList.map((item, i) => (
                <div key={i} className="w-full md:mb-5">
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
          </div>
        </div>
      </section>

      <section className="w-full ">
        {/* md:pt-10 pt-5 */}
        <ShopFasterMarketplace />
      </section>
    </div>
  );
}

export default ProductDetails;
