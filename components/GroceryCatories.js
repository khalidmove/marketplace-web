import React, { useContext, useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/router";
import { cartContext, openCartContext } from "@/pages/_app";
import { produce } from "immer"; // Add this line
import currencySign from "@/utils/currencySign";
import { IoAddSharp, IoRemoveSharp } from "react-icons/io5";

function GroceryCategories({ item, i, url, toaster, loader }) {
  // console.log(item);
  const router = useRouter();
  const [cartData, setCartData] = useContext(cartContext);
  const [openCart, setOpenCart] = useContext(openCartContext);
  const [isInCart, setIsInCart] = React.useState(false);
  const [availableQty, setAvailableQty] = React.useState(0);
  // console.log(cartData);

  const handleAddToCart = () => {
    // let updatedCart = [...cartData];
    // const existingItemIndex = updatedCart.findIndex((f) => f._id === item?._id);

    // const price = parseFloat(item?.price_slot[0]?.our_price);

    // if (existingItemIndex === -1) {
    //   const newItem = {
    //     ...item,
    //     selectedColor: item?.varients[0],
    //     image: item?.varients[0]?.image[0],
    //     total: price,
    //     // parseFloat(item.price_slot[0]?.our_price),
    //     qty: 1,
    //   };
    //   updatedCart.push(newItem);
    // } else {
    //   const nextState = produce(updatedCart, (draft) => {
    //     draft[existingItemIndex].qty += 1;
    //     draft[existingItemIndex].total = (
    //       price * draft[existingItemIndex].qty
    //     ).toFixed(2);
    //   });
    //   updatedCart = nextState;
    // }

    // setCartData(updatedCart);
    // localStorage.setItem("addCartDetail", JSON.stringify(updatedCart));
    // // setOpenCart(true);
    // toaster({ type: "success", message: "Product added to cart" });

    setCartData((prevCartData) => {
        const existingItem = prevCartData.find(
          (f) => f._id === item?._id
        );

        if (!existingItem) {
          const newItem = {
            ...item,
            selectedColor: item?.varients[0] || {},
            selectedImage: item?.varients[0]?.image[0] || "",
            qty: 1,
            total: item.price,
          };

          const updatedCart = [...prevCartData, newItem];
          localStorage.setItem(
            "addCartDetail",
            JSON.stringify(updatedCart)
          );

          return updatedCart;
        }

        return prevCartData;
      });

      toaster({ type: "success", message: "Product added to cart" });
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
      className="flex border border-featuredProducts-borderColor bg-white flex-col md:pb-5 cursor-pointer text-center text-xs flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 p-5"
    >
      {/* w-[228px]  */}
      <img
        className="h-[144px] w-full object-contain"
        src={item?.varients[0]?.image[0]}
        onClick={() => {
          router.push(url);
        }}
      />
      <div className="flex flex-col justify-start items-start pt-5">
        <p className="text-custom-gray font-normal text-xs">
          {item?.categoryName}
        </p>
        <div className="flex gap-2 w-full">
          <span className="text-custom-darkGray text-base font-semibold pt-2 text-left">
            {item?.name}
          </span>
          <span className="text-custom-darkGray text-base font-semibold pt-2">
            - {item?.price_slot[0]?.value}{item?.price_slot[0]?.unit}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center pt-5">
        <p className="text-custom-purple text-lg font-semibold flex items-center gap-1">
          {/* ${item?.price_slot[0]?.our_price}{" "} */}
          {currencySign(item?.price_slot[0]?.our_price)}
          <del className="font-medium text-sm text-custom-gray">
            {currencySign(item?.price_slot[0]?.other_price)}
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
                          total: (
                            (cartItem.price || 0) *
                            (cartItem.qty - 1)
                          ).toFixed(2),
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
                        total: (
                          (cartItem.price || 0) *
                          (cartItem.qty + 1)
                        ).toFixed(2),
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

export default GroceryCategories;
