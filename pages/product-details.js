import GroceryCategories from '@/components/GroceryCatories';
import ShopFasterMarketplace from '@/components/ShopFasterMarketplace';
import SimilarProducts from '@/components/SimilarProducts';
import React from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { IoRemoveSharp } from "react-icons/io5";
import { IoAddSharp } from "react-icons/io5";

function ProductDetails() {
    return (
        <div className='bg-white w-full'>

            <section className='bg-white w-full md:py-10 py-5 md:px-0 px-5'>
                <div className="max-w-7xl  mx-auto w-full">
                    <div className='grid md:grid-cols-2 grid-cols-1 w-full gap-5'>
                        <div className='bg-white w-full md:h-[446px] border border-black p-[10px] rounded-[15px]'>
                            <img className='h-full w-full' src='/image.png' />
                        </div>
                        <div className='flex justify-start items-center w-full'>
                            <div className='flex flex-col justify-start items-start w-full'>
                                <p className='text-black md:text-[32px] text-2xl font-semibold'>Tata Salt</p>
                                <div className='flex justify-start items-center pt-2'>
                                    <p className='text-custom-newPurple font-semibold md:text-xl text-base'>See All Tata Products</p>
                                    <IoIosArrowBack className='text-custom-newPurple rotate-180 w-[15px] h-[15px] ml-2' />
                                </div>

                                <div className='pt-5 grid md:grid-cols-3 grid-cols-1 w-full gap-5'>
                                    <div className='bg-custom-lightPurple w-full rounded-[8px] border border-custom-darkPurple p-[10px] relative'>
                                        <img className='w-[60px] h-[60px] object-contain absolute -top-[20px] -right-[18px]' src='/starImg.png' />
                                        <p className='text-white text-[8px] font-medium absolute -top-[2px] right-[5px]'>4%<br />off</p>
                                        <p className='text-black font-normal text-sm'>500 gms</p>
                                        <p className='text-black font-normal text-base pt-1'>₹24</p>
                                        <p className='text-custom-newPurpleColor font-normal text-sm pt-2'>₹ 4.4 / 100 gms</p>
                                    </div>

                                    <div className='bg-white w-full rounded-[8px] border border-custom-newLightGray p-[10px] relative'>
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
                                    </div>
                                </div>

                                <p className='text-custom-newPurpleColor font-semibold md:text-2xl text-lg pt-5'>₹24<del className='text-custom-newGray font-normal text-base mx-3'>₹25</del><span className='text-custom-purple font-medium text-base'>4% OFF</span></p>

                                <div className='bg-custom-offWhite w-[100px] h-[32px] rounded-[8px] md:mt-5 mt-3 flex items-center'>
                                    <div className='h-[32px] w-[32px] bg-custom-purple rounded-[8px] rounded-r-none	 flex justify-center items-center'>
                                        <IoRemoveSharp className='h-[15px] w-[15px] text-white' />
                                    </div>
                                    <p className='text-black md:text-xl text-lg font-medium text-center mx-3'>1</p>
                                    <div className='h-[32px] w-[32px] bg-custom-purple rounded-[8px] rounded-l-none flex justify-center items-center'>
                                        <IoAddSharp className='h-[15px] w-[15px] text-white' />
                                    </div>
                                </div>

                                <button className='bg-custom-purple w-[96px] h-[32px] rounded-[8px] text-white font-semibold text-xl md:mt-5 mt-4'>ADD</button>

                            </div>
                        </div>
                    </div>

                    <div className='w-full bg-[#FC096530] md:my-10 my-5 p-5'>
                        <div className='grid md:grid-cols-2 grid-cols-1 w-full gap-5'>
                            <div className='flex flex-col justify-start items-start'>
                                <p className='text-black md:text-2xl text-xl font-bold'>About Product</p>
                                <p className='text-black font-medium md:text-xl text-base pt-2'>Description : <span className='text-custom-newGray font-normal md:text-xl text-base'>Tata Salt which assures purity and guarantees the right amount of iodine in the salt. Iodine helps in the proper mental development of children and prevents iodine deficiency disorders in adults.</span></p>
                            </div>
                            <div className='flex flex-col justify-start items-start'>
                                <p className='text-black font-medium md:text-xl text-base'>Country of Origin : <span className='text-custom-newGray font-normal md:text-xl text-base'>India</span></p>
                                <p className='text-black font-medium md:text-xl text-base pt-2'>Self Life : <span className='text-custom-newGray font-normal md:text-xl text-base'>24 Months</span></p>
                                <p className='text-black font-medium md:text-xl text-base pt-2'>Manufacturer Name : <span className='text-custom-newGray font-normal md:text-xl text-base'>TCPL</span></p>
                                <p className='text-black font-medium md:text-xl text-base pt-2'>Manufacturer Address : <span className='text-custom-newGray font-normal md:text-xl text-base'>Tata Food Zone, Plot No 5/B, IDA,Cherlapally-50005.</span></p>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white w-full md:py-10 py-5'>
                        <p className='text-black text-xl font-bold'>Similar Products</p>
                        <GroceryCategories />
                    </div>

                    <div className='bg-white w-full md:pt-10 pt-5'>
                        <p className='text-black text-xl font-bold'>You might also like</p>
                        <GroceryCategories />
                    </div>

                </div>
            </section>

            <section className="w-full md:pt-10 pt-5">
                <ShopFasterMarketplace />
            </section>

        </div>
    )
}

export default ProductDetails
