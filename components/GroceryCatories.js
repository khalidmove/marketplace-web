import React, { useContext, useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/router";
import { cartContext, openCartContext } from "@/pages/_app";
import { produce } from "immer"; // Add this line

function GroceryCategories({ item, i, url }) {
  // console.log(item);
  const router = useRouter();
  const [cartData, setCartData] = useContext(cartContext);
  const [openCart, setOpenCart] = useContext(openCartContext);
  // console.log(cartData);

  const handleAddToCart = () => {
    let updatedCart = [...cartData];
    const existingItemIndex = updatedCart.findIndex((f) => f._id === item?._id);

    const price = parseFloat(item?.price_slot[0]?.our_price);

    if (existingItemIndex === -1) {
      const newItem = {
        ...item,
        selectedColor: item?.varients[0],
        image: item?.varients[0]?.image[0],
        total:price,
          // parseFloat(item.price_slot[0]?.our_price),
        qty: 1,
      };
      updatedCart.push(newItem);
    } else {
      
      const nextState = produce(updatedCart, (draft) => {
        draft[existingItemIndex].qty += 1;  
        draft[existingItemIndex].total = (price * draft[existingItemIndex].qty).toFixed(2)
      });
      updatedCart = nextState;  
    }

    setCartData(updatedCart);
    localStorage.setItem("addCartDetail", JSON.stringify(updatedCart));
    setOpenCart(true);
  }

  return (
    <div
      key={i}
      className="flex border border-featuredProducts-borderColor bg-white flex-col md:pb-5 cursor-pointer text-center text-xs flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 p-5  md:mr-5"
    >
      {/* w-[228px]  */}
      <img
        className="h-[144px] w-full"
        src={item?.varients[0]?.image[0]}
        onClick={() => {
          router.push(url);
        }}
      />
      <div className="flex flex-col justify-start items-start pt-5">
        <p className="text-custom-gray font-normal text-xs">
          {item?.categoryName}
        </p>
        <p className="text-custom-darkGray text-base font-semibold pt-2">
          {item?.name}
        </p>
      </div>
      <div className="flex justify-between items-center pt-5">
        <p className="text-custom-purple text-lg	font-semibold">
          ${item?.price_slot[0]?.our_price}{" "}
          <del className="font-medium text-sm text-custom-gray">
            ${item?.price_slot[0]?.other_price}
          </del>
        </p>
        <button
          className="bg-custom-lightGrayColor py-[8px] w-[90px] rounded-[2px] font-medium text-sm text-custom-purple flex justify-center items-center"
          onClick={handleAddToCart}
        >
          <FiShoppingCart className="w-[14px] h-[14px] text-custom-purple mr-2" />
          Add
        </button>
      </div>
    </div>
  );
}

export default GroceryCategories;
