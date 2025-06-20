import GroceryCategories from "@/components/GroceryCatories";
import { Api } from "@/services/service";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

function SearchResult(props) {
  const router = useRouter();
  const [searchData, setSearchData] = useState([]);
  const { query } = router.query;
  // console.log("query ::", query);
  const { t } = useTranslation()
  useEffect(() => {
    if (query) {
      getProductBySearchCategory(query);
    }
  }, [query]);

  const getProductBySearchCategory = (searchQuery) => {
    props.loader(true);
    let url = `productsearch?key=${searchQuery}`;
    Api("get", url, " ", router).then(
      (res) => {
        props.loader(false);
        console.log("Search result ::", res);
        setSearchData(res?.data);
      },
      (error) => {
        props.loader(false);
        console.log(error);
        props.toaster({ type: "error", Message: error?.message });
      }
    );
  };

  return (
    <div className="bg-white w-full">
      <div className="max-w-7xl  mx-auto w-full">
        <div className="grid md:grid-cols-5 gap-3 grid-cols-1 md:pt-10 pt-5">
          {searchData.length > 0 ? (
            searchData.map((data, i) => (
              <div key={i} className="">
                <GroceryCategories
                  i={i}
                  item={data}
                  url={`product-details/${data?.slug}`}
                  loader={props?.loader}
                  toaster={props?.toaster}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center min-h-[180px] md:min-h-[300px]">
              <p className="text-lg md:text-3xl text-black font-semibold text-center ">
                {t("No product available")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResult;