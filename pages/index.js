import { useEffect, useState } from "react";
import BestSells from "@/components/BestSells";
import GroceryCategories from "@/components/GroceryCatories";
import MainHeader from "@/components/MainHeader";
import ProductCategory from "@/components/ProductCategory";
import ShopFasterMarketplace from "@/components/ShopFasterMarketplace";
import { IoArrowBack } from "react-icons/io5";
import { Api } from "@/services/service";
import { useRouter } from "next/router";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useTranslation } from "react-i18next";

export default function Home(props) {
  const router = useRouter();
  const {t} = useTranslation()
  const [categoryData, setCategoryData] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [bestSellsData, setBestSellsData] = useState([]);
  const [carouselImg, setCarouselImg] = useState([]);
  // Paginations
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const [totalProductPages, setTotalProductPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    getCategory();
    getProduct();
    getBestSells();
    getsetting();
  }, []);

  // useEffect(() => {
  //   getProduct(currentProductPage);
  // }, [currentProductPage]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 7,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const responsived = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const responsiveCarousel = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const getCategory = async () => {
    props.loader(true);
    Api("get", "getCategory", "", router).then(
      (res) => {
        props.loader(false);
        console.log("res================> category", res);
        setCategoryData(res.data);
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  const getProduct = async (page) => {
    props.loader(true);
    Api("get", `getProduct`, "", router).then(
      (res) => {
        props.loader(false);
        if (res.data && Array.isArray(res.data)) {
          const activeProducts = res.data.filter(
            (product) => product.status !== "suspended"
          );

          console.log("Filtered Data: featured products", activeProducts);
          // setTotalProductPages(res.data.totalPages);

          if (activeProducts.length > 0) {
            setProductsList(activeProducts);
          } else {
            props.toaster({
              type: "info",
              message: "No active products found",
            });
          }
        } else {
          console.error("Unexpected response format:", res);
          props.toaster({
            type: "error",
            message: "Unexpected response format",
          });
        }
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  const getBestSells = async (page) => {
    props.loader(true);
    Api(
      "get",
      `getTopSoldProduct?page=${page}&limit=${limit}`,
      "",
      router
    ).then(
      (res) => {
        props.loader(false);
        console.log("res================> best sells", res);
        if (res.data && Array.isArray(res.data)) {
          const activeProducts = res.data.filter(
            (product) => product.status !== "suspended"
          );

          console.log("Filtered Data: best sells", activeProducts);
          setTotalProductPages(res?.pagination?.totalPages);

          if (activeProducts.length > 0) {
            setBestSellsData(activeProducts);
          } else {
            props.toaster({
              type: "info",
              message: "No active products found",
            });
          }
        } else {
          console.error("Unexpected response format:", res);
          props.toaster({
            type: "error",
            message: "Unexpected response format",
          });
        }
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  const getsetting = async () => {
    props.loader(true);
    Api("get", "getsetting", "", router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        if (res?.success) {
          if (res?.setting?.length > 0) {
            // setCarouselImg(res?.setting[0].carousel?.slice(0, 2));
            setCarouselImg(res?.setting[0].carousel);
          }
        } else {
          props.loader(false);
          console.log(res?.data?.message);
          props.toaster({ type: "error", message: res?.data?.message });
        }
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalProductPages) return;
    setCurrentProductPage(newPage);
    getBestSells(newPage);
  };

  return (
    <div className="bg-white w-full">
      <section className="w-full">
        <MainHeader {...props} />
      </section>

      <section className="max-w-7xl mx-auto w-full md:py-10 py-5 md:px-0 px-5">
        <div className="md:flex justify-between items-center w-full">
          <p className="text-black md:text-[32px] text-2xl font-semibold w-full px-1 md:px-6 2xl:px-0">
            {t("Explore by Categories")}
          </p>
          {/* <div className="flex md:gap-5 gap-3 w-full md:items-end items-center md:justify-end justify-start md:pt-0 pt-2">
            <p className="text-custom-purple text-base font-bold cursor-pointer" onClick={() => { router.push(`/categories/all?is_top=true`) }}>View All</p>
            <p className="text-custom-red text-base font-medium">Vegetables</p>
            <p className="text-custom-red text-base font-medium">Fruits</p>
            <p className="text-custom-red text-base font-medium">Coffe & teas</p>
            <p className="text-custom-red text-base font-medium">Meat</p>
          </div> */}
        </div>
        <div className="bg-white w-full px-1 md:px-6 2xl:px-0">
          <Carousel
            className="h-full w-full gap-5"
            responsive={responsive}
            autoPlay={true}
            infinite={true}
            arrows={false}
          >
            {categoryData.map((item, i) => (
              <ProductCategory
                item={item}
                i={i}
                url={`/categories/${item?.slug}`}
              />
            ))}
          </Carousel>
        </div>
      </section>

      <section className="max-w-7xl  mx-auto w-full   md:py-10 py-5 md:px-0 px-5">
        <div className="md:flex justify-between items-center w-full  md:mb-10 mb-5 px-1 md:px-6 2xl:px-0">
          <p className="text-black md:text-[32px] text-2xl font-semibold w-full">
            {t('Featured Products')}
          </p>
          <div className="flex md:gap-5 gap-3 w-full md:items-end items-center md:justify-end justify-start md:pt-0 pt-2">
            <p
              className="text-custom-purple text-base font-bold cursor-pointer"
              onClick={() => {
                router.push(`/categories/all?category=all&sort_by=featured`);
              }}
            >
              {t("View All")}
            </p>
            {/* <p className="text-custom-purple text-base font-semibold">Vegetables</p>
            <p className="text-custom-darkGray text-base font-medium">Fruits</p>
            <p className="text-custom-darkGray text-base font-medium">Coffe & teas</p>
            <p className="text-custom-darkGray text-base font-medium">Meat</p> */}
          </div>
        </div>

        <div className="bg-white w-full px-1 md:px-6 2xl:px-0">
          <Carousel
            className="h-full w-full gap-5"
            responsive={responsived}
            autoPlay={true}
            infinite={true}
            arrows={false}
          >
            {productsList.map((item, i) => (
              <GroceryCategories
                item={item}
                i={i}
                url={`/product-details/${item?.slug}`}
                loader={props?.loader}
                toaster={props?.toaster}
              />
            ))}
          </Carousel>
        </div>
      </section>

      <section className="w-full bg-white px-1 md:px-6 2xl:px-0 hidden md:block">
        <div className="max-w-7xl  mx-auto w-full md:py-10 py-5 md:px-0 px-5">
          <div className="w-full gap-5">
            <Carousel
              className="h-full w-full gap-5"
              responsive={responsiveCarousel}
              autoPlay={true}
              infinite={true}
              arrows={true}
            >
            {carouselImg.map((d, i) => {
              return (
                <div
                  className="flex flex-col justify-center items-center h-full"
                  key={i}
                >
                  <img
                    className={`w-full object-contain`}
                    src={d?.image}
                    onClick={() => {
                      router.push(`/categories/all`);
                    }}
                  />
                </div>
              );
            })}
            </Carousel>

            {/* <div className="bg-[url('/backgroundImg-2.png')] bg-cover bg-no-repeat w-full md:h-[300px]">
              <div className="grid grid-cols-3 w-full gap-5">
                <div className="md:py-10 md:pl-10 col-span-2 md:p-0 p-5">
                  <button className="bg-custom-purple w-[86px] h-[26px] rounded-[3px] text-white font-medium text-xs">Free delivery</button>
                  <p className="text-custom-darkGray font-semibold md:text-[28px] text-xl pt-5">Free delivery over $50</p>
                  <p className="text-custom-darkGrayColor md:text-lg text-base	font-medium md:w-[310px] pt-3">Shop $50 product and get free delivery anywhre.</p>
                  <button className="bg-custom-purple w-[143px] md:h-[52px] h-[40px] rounded-[2px] rounded-l-none	mt-5 text-white font-semibold text-base flex justify-center items-center">Shop Now <IoArrowBack className="w-[18px] h-[18px] text-white ml-2 rotate-180" /></button>
                </div>
              </div>
            </div>

            <div className="bg-[url('/backgroundImg-3.png')] bg-cover bg-no-repeat w-full md:h-[300px]">
              <div className="grid grid-cols-3 w-full gap-5">
                <div className="md:py-10 md:pl-10 col-span-2 md:p-0 p-5">
                  <button className="bg-white w-[86px] h-[26px] rounded-[3px] text-black font-medium text-xs">60% off</button>
                  <p className="text-white font-semibold md:text-[28px] text-xl pt-5">Organic Food</p>
                  <p className="text-white md:text-lg text-base	font-medium md:w-[250px] pt-3">Save up to 60% off on your first order</p>
                  <button className="bg-white w-[143px] md:h-[52px] h-[40px] rounded-[2px] rounded-l-none	mt-5 text-black font-semibold text-base flex justify-center items-center">Order Now <IoArrowBack className="w-[18px] h-[18px] text-black ml-2 rotate-180" /></button>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto w-full">
        <div className="bg-white w-full md:py-10 py-5 md:px-0 px-5">
          <div className="md:flex md:justify-between items-center w-full">
            <div className="md:flex w-full md:justify-between items-center gap-5 px-1 md:px-6 2xl:px-0">
              <p className="text-black md:text-[32px] text-2xl font-semibold w-full">
                {t("Daily Best Sells")}
              </p>
              <div className="flex md:gap-5 gap-3 w-full md:items-end items-center md:justify-end  justify-start md:pt-0 pt-2">
                <p
                  className="text-custom-purple text-base font-bold cursor-pointer"
                  onClick={() => {
                    router.push(`/categories/all?category=all&sort_by=is_top`);
                  }}
                >
                  {t("View All")}
                </p>
              </div>
              {/* <div className='flex justify-start items-center gap-5 md:pt-0 pt-3'>
                <p className='text-custom-purple text-base font-semibold'>Featured</p>
                <p className='text-custom-darkGray text-base font-medium'>Popular</p>
                <p className='text-custom-darkGray text-base font-medium'>New</p>
              </div> */}
            </div>
            {/* <div className='flex justify-start items-center gap-5 md:pt-0 pt-3'>
              <img className='w-[46px]  h-[46px] object-contain' src='/backImg.png' />
              <img className='w-[46px]  h-[46px] object-contain' src='/nextImg.png' />
            </div> */}
          </div>

          <div className="grid md:grid-cols-5 grid-cols-1 w-full gap-5 md:pt-10 pt-5 px-1 md:px-6 2xl:px-0">
            {bestSellsData?.map((item, i) => (
              <GroceryCategories
                item={item}
                i={i}
                url={`/product-details/${item?.slug}`}
                loader={props?.loader}
                toaster={props?.toaster}
              />
            ))}
            {/* {bestSellsData.map((item, i) => (<BestSells item={item} i={i} />))} */}
          </div>
        </div>
        {/* <div className="bg-custom-newPurpleColor/10 border border-custom-newPurpleColor text-custom-purple w-32 mx-auto justify-center items-center flex rounded-[10px] py-2">
        <button className="">
          More
        </button>
        </div> */}
        {/* <div className="text-black">
          <button
            onClick={() => handlePageChange(currentProductPage - 1)}
            disabled={currentProductPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentProductPage} of {totalProductPages}{" "}
          </span>
          <button
            onClick={() => handlePageChange(currentProductPage + 1)}
            disabled={currentProductPage === totalProductPages}
          >
            Next
          </button>
        </div> */}
      </section>

      <section className="w-full md:pt-10 pt-5">
        <ShopFasterMarketplace />
      </section>
    </div>
  );
}
