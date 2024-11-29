import { useContext, useState, useEffect } from "react";

function ProductCategory({ item, i, url }) {
  return (
    <div key={i} className="bg-custom-lightGrayColor md:h-[204px] cursor-pointer shadow-sm overflow-hidden hover:scale-105 hover:shadow-lg transition-all duration-200 ease-in-out p-5 flex flex-col justify-center items-center rounded-[3px] md:mr-5 md:mt-10 mt-5">
      <img className="w-[117px] h-[68px] rounded-[12px] object-contain" src={item?.image} />
      <p className="text-custom-darkGray text-lg	font-semibold	text-center md:pt-10 pt-5">{item?.name}</p>
    </div>
  );
}

export default ProductCategory;
