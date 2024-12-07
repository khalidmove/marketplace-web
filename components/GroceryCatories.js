import React, { useContext, useEffect, useState } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/router";
import { cartContext, openCartContext } from '@/pages/_app';

function GroceryCategories({ item, i, url }) {
  console.log(item)
  const router = useRouter();
  const [cartData, setCartData] = useContext(cartContext);
  const [openCart, setOpenCart] = useContext(openCartContext);

  return (
    <div key={i} className="flex border border-featuredProducts-borderColor bg-white flex-col md:pb-5 cursor-pointer text-center text-xs flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 p-5  md:mr-5">
      {/* w-[228px]  */}
      <img className='h-[144px] w-full' src={item?.varients[0]?.image[0]} onClick={() => { router.push(url) }} />
      <div className='flex flex-col justify-start items-start pt-5'>
        <p className='text-custom-gray font-normal text-xs'>{item?.categoryName}</p>
        <p className='text-custom-darkGray text-base font-semibold pt-2'>{item?.name}</p>
      </div>
      <div className='flex justify-between items-center pt-5'>
        <p className='text-custom-purple text-lg	font-semibold'>${item?.price} <del className='font-medium text-sm text-custom-gray'>${item?.offer}</del></p>
        <button className='bg-custom-lightGrayColor py-[8px] w-[90px] rounded-[2px] font-medium text-sm text-custom-purple flex justify-center items-center'
          onClick={() => {
            let d = cartData || []
            console.log(d, cartData)
            let c = d.find(f => f._id === item?._id)
            if (!c) {
              if (item?.varients[0]?.color) {
                item.selectedColor = item?.varients[0]
              }
              item.image = item?.varients[0]?.image[0]
              item.total = item.price
              item.qty = 1
              console.log(item)
              if (d.length === 0) {
                d = [item]
              } else {
                d.push(item)
              }
              setCartData(d)
              localStorage.setItem("addCartDetail", JSON.stringify(d));
            } else {
              setCartData(d)
              localStorage.setItem("addCartDetail", JSON.stringify(d));
            }
            setOpenCart(true);
          }}
        >
          <FiShoppingCart className='w-[14px] h-[14px] text-custom-purple mr-2' />
          Add</button>
      </div>
    </div>
  );
}

export default GroceryCategories;
