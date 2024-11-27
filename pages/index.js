import BestSells from "@/components/BestSells";
import GroceryCategories from "@/components/GroceryCatories";
import MainHeader from "@/components/MainHeader";
import ProductCategory from "@/components/ProductCategory";
import ShopFasterMarketplace from "@/components/ShopFasterMarketplace";
import { IoArrowBack } from "react-icons/io5";

export default function Home() {
  return (

    <div className="bg-white w-full">
      <section className="w-full">
        <MainHeader />
      </section>

      <section className="max-w-7xl  mx-auto w-full  md:py-10 py-5 md:px-0 px-5">
        <div className="md:flex justify-between items-center w-full">
          <p className="text-custom-darkGray md:text-[32px] text-2xl font-semibold w-full">Explore by Categories</p>
          <div className="flex md:gap-5 gap-3 w-full md:items-end items-center md:justify-end justify-start md:pt-0 pt-2">
            <p className="text-custom-purple text-base font-bold">All</p>
            <p className="text-custom-red text-base font-medium">Vegetables</p>
            <p className="text-custom-red text-base font-medium">Fruits</p>
            <p className="text-custom-red text-base font-medium">Coffe & teas</p>
            <p className="text-custom-red text-base font-medium">Meat</p>
          </div>
        </div>
        <ProductCategory />
      </section>

      <section className="max-w-7xl  mx-auto w-full   md:py-10 py-5 md:px-0 px-5">

        <div className="md:flex justify-between items-center w-full">
          <p className="text-black md:text-[32px] text-2xl font-semibold w-full">Featured Products</p>
          <div className="flex md:gap-5 gap-3 w-full md:items-end items-center md:justify-end justify-start md:pt-0 pt-2">
            <p className="text-custom-darkGray text-base font-medium">All</p>
            <p className="text-custom-purple text-base font-semibold">Vegetables</p>
            <p className="text-custom-darkGray text-base font-medium">Fruits</p>
            <p className="text-custom-darkGray text-base font-medium">Coffe & teas</p>
            <p className="text-custom-darkGray text-base font-medium">Meat</p>
          </div>
        </div>

        <GroceryCategories url={`/product-details`} />
        {/* item={item} i={i} url={`/product-detail/${item?.slug}`} */}
      </section>

      <section className="w-full bg-white ">
        <div className="max-w-7xl  mx-auto w-full md:py-10 py-5 md:px-0 px-5">
          <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-5">

            <div className="bg-[url('/backgroundImg-2.png')] bg-cover bg-no-repeat w-full md:h-[300px]">
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
            </div>

          </div>
        </div>
      </section >



      <section className="max-w-7xl  mx-auto w-full">
        <BestSells />
      </section>

      <section className="w-full md:pt-10 pt-5">
        <ShopFasterMarketplace />
      </section>

    </div >
  );
}
