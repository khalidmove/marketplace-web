import React from 'react'
import ProductCategory from "@/components/ProductCategory";
import ShopFasterMarketplace from '@/components/ShopFasterMarketplace';

function CategoriesList() {
    return (
        <div className='bg-white w-full'>
            <section className='bg-white w-full md:py-10 py-5 md:px-0 px-5'>
                <div className="max-w-7xl  mx-auto w-full">
                    <p className='text-custom-darkGray md:text-[32px] text-2xl font-bold'>Grocery & Kitchen</p>
                    <ProductCategory />
                </div>
            </section>

            <section className='bg-white w-full md:py-10 py-5 md:px-0 px-5'>
                <div className="max-w-7xl  mx-auto w-full">
                    <p className='text-custom-darkGray md:text-[32px] text-2xl font-bold'>Snacks & Drinks</p>
                    <ProductCategory />
                </div>
            </section>

            <section className='bg-white w-full md:py-10 py-5 md:px-0 px-5'>
                <div className="max-w-7xl  mx-auto w-full">
                    <p className='text-custom-darkGray md:text-[32px] text-2xl font-bold'>Beauty & Personal Care</p>
                    <ProductCategory />
                </div>
            </section>

            <section className='bg-white w-full md:py-10 py-5 md:px-0 px-5'>
                <div className="max-w-7xl  mx-auto w-full">
                    <p className='text-custom-darkGray md:text-[32px] text-2xl font-bold'>Household Essentials</p>
                    <ProductCategory />
                </div>
            </section>

            <section className="w-full md:pt-10 pt-5">
                <ShopFasterMarketplace />
            </section>

        </div>
    )
}

export default CategoriesList
