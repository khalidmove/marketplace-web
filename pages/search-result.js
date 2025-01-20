import GroceryCategories from "@/components/GroceryCatories";
import { Api } from "@/services/service";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

function SearchResult(props) {
  const router = useRouter();
  const [searchData, setSearchData] = useState([]);
  const { query } = router.query;
  console.log("query ::", query);

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
    <div>
      <div className="mx-10 grid md:grid-cols-5 grid-cols-1 mt-8">
        {searchData.length > 0 ? (  
          searchData.map((data, i) => (
            <div key={i} className="">
              <GroceryCategories
                i={i}
                item={data}
                url={`product-details/${data?.slug}`}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center min-h-[200px] md:min-h-[300px]">
            <p className="text-lg md:text-3xl text-black font-semibold text-center mt-20">
              No product available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResult;