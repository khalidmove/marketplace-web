import GroceryCategories from '@/components/GroceryCatories';
import ShopFasterMarketplace from '@/components/ShopFasterMarketplace';
import SimilarProducts from '@/components/SimilarProducts';
import React, { useContext, useEffect, useState } from 'react'
import { IoIosArrowBack } from "react-icons/io";
import { IoRemoveSharp } from "react-icons/io5";
import { IoAddSharp } from "react-icons/io5";
import { useRouter } from "next/router";
import { cartContext, openCartContext, userContext } from '../_app';
import { Api } from '@/services/service';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { produce } from 'immer';

function ProductDetails(props) {
    const router = useRouter();
    console.log(router)
    const [user, setUser] = useContext(userContext);
    const [productsId, setProductsId] = useState({});
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedImageList, setSelectedImageList] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');
    const [productReviews, setProductReviews] = useState([]);
    const [productList, SetProductList] = useState([])
    const [cartData, setCartData] = useContext(cartContext);
    const [openCart, setOpenCart] = useContext(openCartContext);

    useEffect(() => {
        if (router?.query?.id) {
            getProductById()
        }
    }, [router?.query?.id])

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
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

    const getProductById = async () => {
        let url = `getProductByslug/${router?.query?.id}`
        if (user?.token) {
            url = `getProductByslug/${router?.query?.id}?user=${user?._id}`
        }
        props.loader(true);
        Api("get", url, '', router).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);
                res.data.qty = 1;
                res.data.total = (res.data?.price * res.data.qty).toFixed(2)
                setProductsId(res.data);
                console.log(res?.data?.minQuantity)

                res.data?.varients[0].selected.forEach(ele => {
                    ele.request = 0
                })
                setSelectedColor(res.data?.varients[0])
                setSelectedImageList(res.data?.varients[0].image)
                setSelectedImage(res.data?.varients[0].image[0])
                getproductByCategory(res.data.category?.slug, res.data._id)
                setProductReviews(res.data?.reviews)
                if (router.query.clientSecret) {
                    setShowPayment(false)
                    createProductRquest()
                }
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    };

    const getproductByCategory = async (category_id, product_id) => {
        props.loader(true);
        Api("get", `getProductBycategoryId?category=${category_id}&product_id=${product_id}`, "", router).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);
                const sameItem = res.data.filter(f => f._id !== router?.query?.id)
                SetProductList(sameItem)
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

            <section className='bg-white w-full md:pt-10 pt-5 md:pb-5 pb-5 md:px-0 px-5'>
                <div className="max-w-7xl  mx-auto w-full">
                    <div className='grid md:grid-cols-2 grid-cols-1 w-full gap-5'>
                        <div className='border border-black p-[10px] rounded-[15px]'>
                            <Carousel className="h-full w-full"
                                responsive={responsive}
                                autoPlay={false}
                                infinite={true}
                                arrows={true}
                            >
                                {selectedImageList?.map((item, i) => (<div key={i} className='bg-white w-full md:h-[446px]'>
                                    <img className='h-full w-full object-contain' src={item} />
                                </div>))}
                            </Carousel>
                        </div>
                        <div className='flex justify-start items-center w-full'>
                            <div className='flex flex-col justify-start items-start w-full'>
                                <p className='text-black md:text-[32px] text-2xl font-semibold'>{productsId?.name}</p>
                                {/* <div className='flex justify-start items-center pt-2'>
                                    <p className='text-custom-newPurple font-semibold md:text-xl text-base'>See All Tata Products</p>
                                    <IoIosArrowBack className='text-custom-newPurple rotate-180 w-[15px] h-[15px] ml-2' />
                                </div> */}

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

                                <p className='text-custom-newPurpleColor font-semibold md:text-2xl text-lg pt-5'>₹{productsId?.offer}<del className='text-custom-newGray font-normal text-base mx-3'>₹{productsId?.price}</del><span className='text-custom-purple font-medium text-base'>{(Math.round((productsId?.price * 100) / productsId?.offer)) - 100}% OFF</span></p>

                                <div className='bg-custom-offWhite w-[100px] h-[32px] rounded-[8px] md:mt-5 mt-3 flex items-center'>
                                    <div className='h-[32px] w-[32px] bg-custom-purple rounded-[8px] rounded-r-none	 flex justify-center items-center'
                                        onClick={() => {
                                            if (productsId.qty > 1) {
                                                productsId.qty = productsId.qty - 1;
                                                productsId.total = (productsId?.price * productsId.qty).toFixed(2)
                                                setProductsId({ ...productsId })
                                            }
                                        }}>
                                        <IoRemoveSharp className='h-[15px] w-[15px] text-white' />
                                    </div>
                                    <p className='text-black md:text-xl text-lg font-medium text-center mx-3'>{productsId?.qty || 0}</p>
                                    <div className='h-[32px] w-[32px] bg-custom-purple rounded-[8px] rounded-l-none flex justify-center items-center'
                                        onClick={() => {
                                            productsId.qty = productsId.qty + 1;
                                            productsId.total = (productsId?.price * productsId.qty).toFixed(2)
                                            setProductsId({ ...productsId })
                                        }}>
                                        <IoAddSharp className='h-[15px] w-[15px] text-white' />
                                    </div>
                                </div>

                                <button className='bg-custom-purple w-[96px] h-[32px] rounded-[8px] text-white font-semibold text-xl md:mt-5 mt-4'
                                    onClick={() => {
                                        const d = cartData?.length > 0 ? cartData : [];
                                        const c = d.find(f => f._id === productsId?._id)
                                        console.log(c)
                                        if (!c) {
                                            // console.log(d)
                                            // // if (selectedColor) {
                                            // //     productsId.selectedColor = selectedColor
                                            // // }
                                            // productsId.total = productsId.price
                                            // productsId.image = selectedImage
                                            // d.push(productsId)
                                            // setCartData(d)
                                            // localStorage.setItem("addCartDetail", JSON.stringify(d));

                                            const nextState = produce(cartData, draft => {
                                                draft.push({
                                                    ...productsId,
                                                    // selectedColor,
                                                    selectedImage,
                                                    // qty: 1,
                                                    total: productsId.price
                                                })
                                            })
                                            setCartData(nextState)
                                            localStorage.setItem("addCartDetail", JSON.stringify(nextState));
                                        }
                                        // else {
                                        //     c.qty = c.qty + productsId.qty
                                        //     setCartData(d)
                                        //     localStorage.setItem("addCartDetail", JSON.stringify(d));
                                        // }
                                        setOpenCart(true);
                                        // router.push('/cart')
                                    }}>ADD</button>

                            </div>
                        </div>
                    </div>

                    <div className='w-full bg-[#FC096530] md:my-10 my-5 p-5'>
                        <div className='grid md:grid-cols-2 grid-cols-1 w-full gap-5'>
                            <div className='flex flex-col justify-start items-start'>
                                <p className='text-black md:text-2xl text-xl font-bold'>About Product</p>
                                <p className='text-black font-medium md:text-xl text-base pt-2'>Description : <span className='text-custom-newGray font-normal md:text-xl text-base'>{productsId?.short_description}</span></p>
                            </div>
                            <div className='flex flex-col justify-start items-start'>
                                <p className='text-black font-medium md:text-xl text-base'>Country of Origin : <span className='text-custom-newGray font-normal md:text-xl text-base'>India</span></p>
                                <p className='text-black font-medium md:text-xl text-base pt-2'>Self Life : <span className='text-custom-newGray font-normal md:text-xl text-base'>24 Months</span></p>
                                <p className='text-black font-medium md:text-xl text-base pt-2'>Manufacturer Name : <span className='text-custom-newGray font-normal md:text-xl text-base'>TCPL</span></p>
                                <p className='text-black font-medium md:text-xl text-base pt-2'>Manufacturer Address : <span className='text-custom-newGray font-normal md:text-xl text-base'>Tata Food Zone, Plot No 5/B, IDA,Cherlapally-50005.</span></p>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white w-full md:pt-10 md:pb-10 pb-5'>
                        <p className='text-black text-xl font-bold md:mb-10 mb-5'>Similar Products</p>
                        <div className="grid md:grid-cols-5 grid-cols-1 md:gap-0 gap-5">
                            {productList.map((item, i) => (<div key={i} className='w-full md:mb-5'>
                                <GroceryCategories item={item} i={i} />
                            </div>))}
                        </div>
                    </div>

                    <div className='bg-white w-full'>
                        <p className='text-black text-xl font-bold md:mb-10 mb-5'>You might also like</p>
                        <div className="grid md:grid-cols-5 grid-cols-1 md:gap-0 gap-5">
                            {productList.map((item, i) => (<div key={i} className='w-full md:mb-5'>
                                <GroceryCategories item={item} i={i} />
                            </div>))}
                        </div>
                    </div>

                </div>
            </section>

            <section className="w-full ">
                {/* md:pt-10 pt-5 */}
                <ShopFasterMarketplace />
            </section>

        </div>
    )
}

export default ProductDetails
