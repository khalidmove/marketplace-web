import React, { useContext, useState, useEffect } from 'react';
// import { contextData } from '../Context/AppContext';
import { IoCartOutline } from 'react-icons/io5';
import { FiShoppingCart } from "react-icons/fi";

function BestSells({ item, i, url }) {
  console.log(item)
  // const { BuyProductByCategoris, currency } = useContext(contextData);
  // const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // useEffect(() => {
  //   if (selectedCategory === 'All') {
  //     const filtered = BuyProductByCategoris.filter(item => item._id < 6);
  //     setFilteredProducts(filtered);
  //   } else if (selectedCategory === 'Popular') {
  //     const filtered = BuyProductByCategoris.filter(item => item.bestSells);
  //     setFilteredProducts(filtered);
  //   } else if (selectedCategory === 'New') {
  //     const filtered = BuyProductByCategoris.filter(item => item.upcomming);
  //     setFilteredProducts(filtered);
  //   } else {
  //     const filtered = BuyProductByCategoris.filter(
  //       item => item.type === selectedCategory
  //     );
  //     setFilteredProducts(filtered);
  //   }
  // }, [BuyProductByCategoris, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = [
    {
      image: '/dailyBestSellsImg.png',
      name: 'Coffe & teas',
      title: 'Coffe 1kg',
      price: '$20',
      offer: '$25',
      sold: 'Sold: 20/50',
    },
    {
      image: '/dailyBestSellsImg.png',
      name: 'Coffe & teas',
      title: 'Coffe 1kg',
      price: '$20',
      offer: '$25',
      sold: 'Sold: 20/50',
    },
    {
      image: '/dailyBestSellsImg.png',
      name: 'Coffe & teas',
      title: 'Coffe 1kg',
      price: '$20',
      offer: '$25',
      sold: 'Sold: 20/50',
    },
    {
      image: '/dailyBestSellsImg.png',
      name: 'Coffe & teas',
      title: 'Coffe 1kg',
      price: '$20',
      offer: '$25',
      sold: 'Sold: 20/50',
    },
    {
      image: '/dailyBestSellsImg.png',
      name: 'Coffe & teas',
      title: 'Coffe 1kg',
      price: '$20',
      offer: '$25',
      sold: 'Sold: 20/50',
    },
  ]

  return (
    <div key={i} className="border border-featuredProducts-borderColor flex flex-col pb-5 cursor-pointer text-center text-xs hover:translate-y-[-10px] transition-all duration-500 p-5" >
      <img className='h-[154px] w-full' src={item?.varients[0]?.image[0]} />
      <div className='flex flex-col justify-start items-start pt-5'>
        <p className='text-custom-gray font-normal text-xs'>{item?.category?.name}</p>
        <p className='text-custom-darkGray text-base font-semibold pt-2'>{item?.name}</p>
        <p className='text-custom-purple text-lg	font-semibold pt-5'>{item?.price} <del className='font-medium text-sm text-custom-gray'>{item?.offer}</del></p>
        <img className='w-full h-full mt-5' src='/progressBarImg.png' />
        <p className='text-custom-darkGray text-[13px] font-medium pt-3'>Sold: 20/50</p>
        <div className='w-full'>
          <button className='bg-custom-purple w-full h-[40px] rounded-[2px] font-medium text-sm text-white flex justify-center items-center mt-5'><FiShoppingCart className='w-[14px] h-[14px] text-white mr-2' />Add to cart</button>
        </div>
      </div>
    </div >
  );
}

export default BestSells;
