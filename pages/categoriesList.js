import React, { useState, useEffect } from 'react'
import ProductCategory from "@/components/ProductCategory";
import ShopFasterMarketplace from '@/components/ShopFasterMarketplace';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Api } from '@/services/service';
import { useRouter } from "next/router";

function CategoriesList(props) {
    const router = useRouter();
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        getCategory();
    }, []);

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

    const getCategory = async () => {
        props.loader(true);
        Api("get", "getCategory", "", router).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);
                setCategoryData(res.data);
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    };

    return (
        <div className='bg-white w-full'>
            <section className='bg-white w-full md:py-10 py-5 md:px-0 px-5'>
                <div className="max-w-7xl  mx-auto w-full">
                    <p className='text-custom-darkGray md:text-[32px] text-2xl font-bold'>Grocery & Kitchen</p>
                    <div className="bg-white w-full">
                        <Carousel className="h-full w-full gap-5"
                            responsive={responsive}
                            autoPlay={true}
                            infinite={true}
                            arrows={false}
                        >
                            {categoryData.map((item, i) => (<ProductCategory item={item} i={i} />))}
                        </Carousel>
                    </div >
                </div>
            </section>

            <section className='bg-white w-full md:py-10 py-5 md:px-0 px-5'>
                <div className="max-w-7xl  mx-auto w-full">
                    <p className='text-custom-darkGray md:text-[32px] text-2xl font-bold'>Snacks & Drinks</p>
                    <div className="bg-white w-full">
                        <Carousel className="h-full w-full gap-5"
                            responsive={responsive}
                            autoPlay={true}
                            infinite={true}
                            arrows={false}
                        >
                            {categoryData.map((item, i) => (<ProductCategory item={item} i={i} />))}
                        </Carousel>
                    </div >
                </div>
            </section>

            <section className='bg-white w-full md:py-10 py-5 md:px-0 px-5'>
                <div className="max-w-7xl  mx-auto w-full">
                    <p className='text-custom-darkGray md:text-[32px] text-2xl font-bold'>Beauty & Personal Care</p>
                    <div className="bg-white w-full">
                        <Carousel className="h-full w-full gap-5"
                            responsive={responsive}
                            autoPlay={true}
                            infinite={true}
                            arrows={false}
                        >
                            {categoryData.map((item, i) => (<ProductCategory item={item} i={i} />))}
                        </Carousel>
                    </div >
                </div>
            </section>

            <section className='bg-white w-full md:py-10 py-5 md:px-0 px-5'>
                <div className="max-w-7xl  mx-auto w-full">
                    <p className='text-custom-darkGray md:text-[32px] text-2xl font-bold'>Household Essentials</p>
                    <div className="bg-white w-full">
                        <Carousel className="h-full w-full gap-5"
                            responsive={responsive}
                            autoPlay={true}
                            infinite={true}
                            arrows={false}
                        >
                            {categoryData.map((item, i) => (<ProductCategory item={item} i={i} />))}
                        </Carousel>
                    </div >
                </div>
            </section>

            <section className="w-full md:pt-10 pt-5">
                <ShopFasterMarketplace />
            </section>

        </div>
    )
}

export default CategoriesList
