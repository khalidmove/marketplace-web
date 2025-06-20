import React, { useContext, useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/router";
import { cartContext, openCartContext } from "@/pages/_app";
import { produce } from "immer"; // Add this line
import currencySign from "@/utils/currencySign";
import { IoAddSharp, IoRemoveSharp } from "react-icons/io5";
import Carousel from "react-multi-carousel";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function ComboGroceryCategories({ item, i, url, toaster, loader }) {
  // console.log(item);
  const router = useRouter();
  const [cartData, setCartData] = useContext(cartContext);
  const [openCart, setOpenCart] = useContext(openCartContext);
  const [isInCart, setIsInCart] = React.useState(false);
  const [availableQty, setAvailableQty] = React.useState(0);
  // console.log(cartData);

  const handleAddToCart = () => {
    setCartData((prevCartData) => {
      const existingItem = prevCartData.find((f) => f._id === item?._id);

      if (!existingItem) {
        const newItem = {
          _id: item._id, // Unique combo ID
          name: item.comboItems
            .map((comboItem) => comboItem?.product?.name)
            .join(", "),
          comboItems: item.comboItems,
          qty: 1,
          price: item.offer_price,
          total: Number(item.offer_price).toFixed(2),
          type: "combo",
          image:
            item.comboItems?.[0]?.product?.varients?.[0]?.image?.[0] ||
            "https://via.placeholder.com/150",
          other_price: item.old_price,
        };

        const updatedCart = [...prevCartData, newItem];
        localStorage.setItem("addCartDetail", JSON.stringify(updatedCart));
        return updatedCart;
      }

      return prevCartData;
    });

    toaster({ type: "success", message: "Combo added to cart" });
  };

  useEffect(() => {
    if (cartData.length > 0) {
      const cartItem = cartData.find((f) => f._id === item?._id);
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
  }, [cartData, item]);

  return (
    <div
      key={i}
      className="flex border border-featuredProducts-borderColor bg-white flex-col md:pb-5 cursor-pointer text-center text-xs flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 p-3"
    >
      {/* w-[228px]  */}
      {/* <img
        className="h-[144px] w-full object-cover"
        src={item?.product?.varients[0]?.image[0]}
        onClick={() => {
          router.push(url);
        }}
      /> */}
      {/* <Carousel
        responsive={{
            desktop: { 
                breakpoint: { max: 3000, min: 1024 },
                items: 1,
                slidesToSlide: 1,
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 1,
                slidesToSlide: 1,
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1,
            },
        }}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
        dotListClass="custom-dot-list-style"
        className="w-full h-[144px] object-cover"
        showDots={true}
        renderDotsOutside={true}
        >
        {item?.comboItems?.map((comboItem, index) => (
            <img
                key={index}
                className="h-[144px] w-full object-cover"
                src={comboItem?.product?.varients[0]?.image[0]}
                onClick={() => {
                    router.push(url);
                }}
            />
        ))}
        </Carousel> */}
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        modules={[Pagination, Navigation]}
        infinite={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="h-[144px] w-full"
        onClick={() => router.push(url)}
      >
        {item?.comboItems?.map((comboItem, index) => {
          const imageUrl = comboItem?.product?.varients?.[0]?.image?.[0];
          const altText = comboItem?.product?.name || "Combo Item";

          return (
            <SwiperSlide key={index}>
              {imageUrl ? (
                <img
                  className="h-[144px] w-full object-cover"
                  src={imageUrl}
                  alt={altText}
                />
              ) : (
                <div className="h-[144px] w-full flex items-center justify-center bg-gray-100 text-gray-500">
                  No Image Available
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="flex flex-col justify-start items-start pt-5">
        <p className="text-custom-gray font-normal text-xs">
          {/* {item?.categoryName} */}
          {item?.comboItems?.map((comboItem, index) => (
            <span key={index}>
              {comboItem?.product?.categoryName}
              {index < item?.comboItems?.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
        <div className="flex gap-2 w-full">
          <span className="text-custom-darkGray text-base font-semibold pt-2 text-left">
            {/* {item?.name} */}
            {item?.comboItems?.map((comboItem, index) => (
              <span key={index}>
                {comboItem?.product?.name} -{" "}
                {comboItem?.product?.price_slot[0]?.value}
                {comboItem?.product?.price_slot[0]?.unit}{" "}
                {index < item?.comboItems?.length - 1 ? ", " : ""}
              </span>
            ))}
          </span>
          {/* <span className="text-custom-darkGray text-base font-semibold pt-2">
            - {item?.price_slot?.value}{item?.price_slot?.unit}
          </span> */}
        </div>
      </div>
      <div className="flex justify-between items-center pt-5">
        <p className="text-custom-purple text-lg font-semibold flex items-center gap-1">
          {/* ${item?.price_slot?.our_price}{" "} */}
          {currencySign(item?.offer_price)}
          <del className="font-medium text-sm text-custom-gray">
            {currencySign(item?.old_price)}
          </del>
        </p>
        {!isInCart ? (
          <button
            className="bg-custom-lightGrayColor py-[8px] w-[90px] rounded-[2px] font-medium text-sm text-custom-purple flex justify-center items-center"
            onClick={handleAddToCart}
          >
            <FiShoppingCart className="w-[14px] h-[14px] text-custom-purple mr-2" />
            Add
          </button>
        ) : (
          <div className="bg-custom-offWhite w-[90px] h-[32px] rounded-[8px] flex gap-2 items-center">
            <div
              className="h-[32px] w-[32px] bg-custom-purple rounded-[8px] rounded-r-none flex gap-2 px-1 justify-center items-center cursor-pointer"
              onClick={() => {
                if (availableQty > 1) {
                  const updatedCart = cartData.map((cartItem) =>
                    cartItem._id === item._id
                      ? {
                          ...cartItem,
                          qty: cartItem.qty - 1,
                          total: (cartItem.price * (cartItem.qty - 1)).toFixed(
                            2
                          ),
                        }
                      : cartItem
                  );
                  setCartData(updatedCart);
                  localStorage.setItem(
                    "addCartDetail",
                    JSON.stringify(updatedCart)
                  );
                } else {
                  const updatedCart = cartData.filter(
                    (cartItem) => cartItem._id !== item._id
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

            <p className="text-black md:text-lg text-base font-medium text-center mx-1">
              {availableQty}
            </p>

            <div
              className="h-[32px] w-[32px] bg-custom-purple rounded-[8px] rounded-l-none flex gap-2 px-1 justify-center items-center cursor-pointer"
              onClick={() => {
                const updatedCart = cartData.map((cartItem) =>
                  cartItem._id === item._id
                    ? {
                        ...cartItem,
                        qty: cartItem.qty + 1,
                        total: (cartItem.price * (cartItem.qty + 1)).toFixed(2),
                      }
                    : cartItem
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
        )}
        {/* <button
          className="bg-custom-lightGrayColor py-[8px] w-[90px] rounded-[2px] font-medium text-sm text-custom-purple flex justify-center items-center"
          onClick={handleAddToCart}
        >
          <FiShoppingCart className="w-[14px] h-[14px] text-custom-purple mr-2" />
          Add
        </button> */}
      </div>
    </div>
  );
}

export default ComboGroceryCategories;
