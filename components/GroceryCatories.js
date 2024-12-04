import React, { useContext, useEffect, useState } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/router";

function GroceryCategories({ item, i, url }) {
  const router = useRouter();

  return (
    <div key={i} className="flex border border-featuredProducts-borderColor bg-white flex-col md:pb-5 cursor-pointer text-center text-xs flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 p-5  md:mr-5" onClick={() => { router.push(url) }}>
      {/* w-[228px]  */}
      <img className='h-[144px] w-full' src={item?.varients[0]?.image[0]} />
      <div className='flex flex-col justify-start items-start pt-5'>
        <p className='text-custom-gray font-normal text-xs'>{item?.category?.name}</p>
        <p className='text-custom-darkGray text-base font-semibold pt-2'>{item?.name}</p>
      </div>
      <div className='flex justify-between items-center pt-5'>
        <p className='text-custom-purple text-lg	font-semibold'>${item?.price} <del className='font-medium text-sm text-custom-gray'>${item?.offer}</del></p>
        <button className='bg-custom-lightGrayColor py-[8px] w-[90px] rounded-[2px] font-medium text-sm text-custom-purple flex justify-center items-center'>
          {/* className='bg-custom-lightGrayColor h-[34px] w-[90px] rounded-[2px] font-medium text-sm text-custom-purple flex justify-center items-center' */}
          <FiShoppingCart className='w-[14px] h-[14px] text-custom-purple mr-2' />
          Add</button>
      </div>
    </div>
  );
}

export default GroceryCategories;
