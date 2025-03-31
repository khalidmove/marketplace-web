import { Api } from "@/services/service";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import GroceryCategories from "@/components/GroceryCatories";

function Favourite(props) {
  const router = useRouter();
  const [favouriteList, setFavouriteList] = useState([]);

  useEffect(() => {
    getFavourite();
  }, []);

  const getFavourite = async () => {
    props.loader(true);
    Api("get", "getFavourite", "", router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        setFavouriteList(res.data);
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
      <section className="bg-white w-full relative flex flex-col justify-center items-center 2xl:container mx-auto lg:h-screen">
        <div className="max-w-7xl mx-auto w-full px-1 md:px-6 2xl:px-0 md:pt-10 pt-5 h-full">
          <p className="text-2xl text-black font-bold pb-5">
            My Favourite Product
          </p>
          <div className="grid md:grid-cols-5 grid-cols-1 w-full gap-5">
            {favouriteList.length > 0 ? (
              favouriteList.map((item, i) => (
                <div key={i} className="w-full">
                  <GroceryCategories
                    item={item?.product}
                    i={i}
                    url={`/product-details/${item?.product?.slug}`}
                    loader={props?.loader}
                toaster={props?.toaster}
                  />
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center  col-span-10 h-[200px] md:h-[300px]">
                <p className="text-black font-semibold text-xl md:text-2xl text-center">
                  No favourites product available
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Favourite;
