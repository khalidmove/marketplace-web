import React, { useContext, useEffect, useState } from 'react';
// import { contextData } from '../Context/AppContext';
import { IoCartOutline } from 'react-icons/io5';
import { FiShoppingCart } from "react-icons/fi";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/router";

function GroceryCategories({ item, i, url }) {
  const router = useRouter();
  // const { BuyProductByCategoris, currency } = useContext(contextData);
  // const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // useEffect(() => {
  //   if (selectedCategory === 'All') {
  //     setFilteredProducts(BuyProductByCategoris);
  //   } else {
  //     const filtered = BuyProductByCategoris.filter(
  //       (item) => item.type === selectedCategory
  //     );
  //     setFilteredProducts(filtered);
  //   }
  // }, [BuyProductByCategoris, selectedCategory]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = [
    {
      image: '/featuredProductsImg.png',
      name: 'Vegetables',
      title: 'Redish 500g',
      price: '$2',
      offer: '$3.99',
    },
    {
      image: '/featuredProductsImg-1.png',
      name: 'Vegetables',
      title: 'Potatos 1kg',
      price: '$2',
      offer: '$3.99',
    },
    {
      image: '/featuredProductsImg-2.png',
      name: 'Fruits',
      title: 'Tomatos 200g',
      price: '$2',
      offer: '$3.99',
    },
    {
      image: '/featuredProductsImg-3.png',
      name: 'Vegetables',
      title: 'Broccoli 1kg',
      price: '$2',
      offer: '$3.99',
    },
    {
      image: '/featuredProductsImg-4.png',
      name: 'Vegetables',
      title: 'Green Beans 250g',
      price: '$2',
      offer: '$3.99',
    },
  ]

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="bg-white w-full">
      {/* <div className="md:flex justify-between items-center w-full">
        <p className="text-black md:text-[32px] text-2xl font-semibold w-full">Featured Products</p>
        <div className="flex md:gap-5 gap-3 w-full md:items-end items-center md:justify-end justify-start md:pt-0 pt-2">
          <p className="text-custom-darkGray text-base font-medium">All</p>
          <p className="text-custom-purple text-base font-semibold">Vegetables</p>
          <p className="text-custom-darkGray text-base font-medium">Fruits</p>
          <p className="text-custom-darkGray text-base font-medium">Coffe & teas</p>
          <p className="text-custom-darkGray text-base font-medium">Meat</p>
        </div>
      </div> */}

      {/* <div className='w-full grid grid-cols-5 gap-5 pt-10'> */}
      <Carousel className="h-full w-full gap-5"
        responsive={responsive}
        autoPlay={true}
        infinite={true}
        arrows={false}
      >
        {filteredProducts?.map((item, i) => (
          <div key={i} className="flex border border-featuredProducts-borderColor bg-white flex-col md:pb-5 cursor-pointer text-center text-xs flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 p-5  md:mr-5 md:mt-10 mt-5" onClick={() => { router.push(url) }}>
            <img className='h-[144px] w-full' src={item?.image} />
            <div className='flex flex-col justify-start items-start pt-5'>
              <p className='text-custom-gray font-normal text-xs'>{item?.name}</p>
              <p className='text-custom-darkGray text-base font-semibold pt-2'>{item?.title}</p>
            </div>
            <div className='flex justify-between items-center pt-5'>
              <p className='text-custom-purple text-lg	font-semibold'>{item?.price} <del className='font-medium text-sm text-custom-gray'>{item?.offer}</del></p>
              <button className='bg-custom-lightGrayColor py-[8px] w-[90px] rounded-[2px] font-medium text-sm text-custom-purple flex justify-center items-center'>
                {/* className='bg-custom-lightGrayColor h-[34px] w-[90px] rounded-[2px] font-medium text-sm text-custom-purple flex justify-center items-center' */}
                <FiShoppingCart className='w-[14px] h-[14px] text-custom-purple mr-2' />
                Add</button>
            </div>
          </div>
        ))}
      </Carousel>
      {/* </div> */}

    </div>
  );
}

export default GroceryCategories;
