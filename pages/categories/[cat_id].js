import React, { useEffect, useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { MdNavigateNext } from "react-icons/md";
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { Api } from '@/services/service';
import { useRouter } from 'next/router';
import FormControl from '@mui/material/FormControl';
import { FaCircleChevronDown } from "react-icons/fa6";
import { FaCircleChevronUp } from "react-icons/fa6";
import GroceryCategories from '@/components/GroceryCatories';

const sortByData = [
    {
        name: 'Featured',
        value: 'featured'
    },
    {
        name: 'Best selling',
        value: 'is_top'
    },
    {
        name: 'Alphabetically, A-Z',
        value: 'a_z'
    },
    {
        name: 'Alphabetically, Z-A',
        value: 'z_a'
    },
    {
        name: 'Price, low to high',
        value: 'low'
    },
    {
        name: 'Price, high to low',
        value: 'high'
    },
    {
        name: 'Date, old to new',
        value: 'old'
    },
    {
        name: 'Date, new to old',
        value: 'new'
    },
]

function Categories(props) {
    const router = useRouter()
    console.log(router)
    const [productList, SetProductList] = useState([])
    const [category, setCategory] = useState({})
    const [categoryList, SetCategoryList] = useState([])
    const [selectedCategories, setSelectedCategories] = useState('')
    const [selectedSortBy, setSelectedSortBy] = useState('')
    const [openData, setOpenData] = useState(false);
    const [openCategory, setOpenCategory] = useState(true)

    useEffect(() => {
        // if (category?._id) {
        getproductByCategory(router?.query?.cat_id)
        setSelectedCategories(router?.query?.cat_id)
        // }
    }, [router])

    useEffect(() => {
        getCategory()
    }, [])


    useEffect(() => {
        if (selectedCategories) {
            getproductByCategory(selectedCategories)
        }
    }, [selectedSortBy])

    const getCategory = async (cat) => {
        props.loader(true);
        Api("get", "getCategory", "", router).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);
                res.data.push({
                    name: 'All',
                    slug: 'all'
                })
                SetCategoryList(res.data);
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    };

    const getproductByCategory = async (cat) => {
        props.loader(true);
        let parmas = { status: 'verified' }
        let url = `getProductBycategoryId`
        if (cat) {
            parmas.category = cat
        }
        if (selectedSortBy) {
            parmas.sort_by = selectedSortBy
        }
        Api("get", url, "", router, parmas).then(
            (res) => {
                props.loader(false);
                console.log("res================>12", res);
                
                if (res.data && Array.isArray(res.data)) {
                    console.log("original data", res.data[0].status);

                    const activeProducts = res.data.filter(product => product.status !== 'suspended');

                    console.log("Filtered Data:", activeProducts);
                  
                    if (activeProducts.length > 0) {
                      SetProductList(activeProducts);
                    } else {
                      props.toaster({ type: "info", message: "No active products found" });
                    }
                  } else {
                    console.error("Unexpected response format:", res);
                    props.toaster({ type: "error", message: "Unexpected response format" });
                  }
                  
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    };

    return (
        <div className="bg-white w-full">
            <section className="bg-white w-full  relative flex flex-col justify-center items-center">
                <div className="max-w-7xl mx-auto w-full md:px-0 px-5 md:pt-10 pt-5 md:pb-10 pb-0">
                    <div className='grid md:grid-cols-4 grid-cols-1 w-full md:gap-5'>

                        <div className='bg-custom-lightGrayColor w-full px-5 py-5'>
                            <div className='border-b border-custom-gray'>
                                <div className='flex justify-between items-center w-full  pb-5'>
                                    <p className='text-custom-black font-semibold text-lg'>Sort By</p>
                                    {!openData && <FaCircleChevronDown className='text-lg text-custom-purple'
                                        onClick={() => { setOpenData(true); }} />}
                                    {openData && < FaCircleChevronUp className='text-lg text-custom-purple'
                                        onClick={() => setOpenData(false)} />}
                                </div>
                                {openData && <FormControl className=''>
                                    <FormGroup className='flex flex-col' >
                                        {sortByData.map((item, i) => (<FormControlLabel className='text-black' key={i}
                                            control={
                                                <Checkbox onChange={() => {
                                                    if (selectedSortBy === item?.value) {
                                                        setSelectedSortBy('')
                                                    } else {
                                                        setSelectedSortBy(item?.value)
                                                    }
                                                }}
                                                    checked={item?.value === selectedSortBy}
                                                />}
                                            label={item?.name} />))}
                                    </FormGroup>
                                </FormControl>}
                            </div>

                            <div className='pt-5'>
                                <div className='flex justify-between items-center w-full  pb-5'>
                                    <p className='text-custom-black font-semibold text-lg'>Categories</p>
                                    {!openCategory && <FaCircleChevronDown className='text-lg text-custom-purple cursor-pointer' onClick={() => { setOpenCategory(true); }} />}
                                    {openCategory && < FaCircleChevronUp className='text-lg text-custom-purple cursor-pointer' onClick={() => setOpenCategory(false)} />}
                                </div>

                                {openCategory && <FormGroup>
                                    {
                                        categoryList.map((item, i) => (
                                            <FormControlLabel className='text-black'
                                            key={i} control={<Checkbox
                                            onChange={() => {
                                            router.replace(`/categories/${item.slug}`)
                                            setSelectedCategories(item?.slug)
                                        }}
                                        checked={item.slug === selectedCategories}
                                                />} label={item?.name} />
                                        ))}
                                </FormGroup>}
                            </div>
                        </div>

                        <div className='col-span-3 md:mt-0 mt-5'>
                            <div className="grid md:grid-cols-4 grid-cols-1 md:gap-0 gap-5">
                                {productList.length > 0 ? (
                                    productList.map((item, i) => (
                                        <div key={i} className='w-full md:mb-5'>
                                            <GroceryCategories item={item} i={i} url={`/product-details/${item?.slug}`} />
                                        </div>
                                    ))
                                ) : (
                                     <div className='flex justify-center items-center h-[200px] md:h-[400px] col-span-4 '>
                                        <p className='text-black text-center font-semibold text-2xl'>No products available in this category.</p>
                                     </div>
                                )}
                            </div>
                        </div>
                    </div>
                    </div>

                    {/* <div className='pt-5 flex justify-end items-end'>
                        <Stack spacing={2}>
                            <Pagination count={10} shape="rounded" size="small" />
                        </Stack>
                    </div> */}
                
            </section>

        </div>
    )
}

export default Categories
