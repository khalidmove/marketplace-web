import React, { useCallback, useEffect, useMemo, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { MdNavigateNext } from "react-icons/md";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { Api } from "@/services/service";
import { useRouter } from "next/router";
import FormControl from "@mui/material/FormControl";
import { FaCircleChevronDown } from "react-icons/fa6";
import { FaCircleChevronUp } from "react-icons/fa6";
import GroceryCategories from "@/components/GroceryCatories";
import { IoFilter } from "react-icons/io5";
import Drawer from "@mui/material/Drawer";
import { useTranslation } from "react-i18next";

const sortByData = [
  {
    name: "Featured",
    value: "featured",
  },
  {
    name: "Best selling",
    value: "is_top",
  },
  {
    name: "Alphabetically, A-Z",
    value: "a_z",
  },
  {
    name: "Alphabetically, Z-A",
    value: "z_a",
  },
  {
    name: "Price, low to high",
    value: "low",
  },
  {
    name: "Price, high to low",
    value: "high",
  },
  {
    name: "Date, old to new",
    value: "old",
  },
  {
    name: "Date, new to old",
    value: "new",
  },
];

function Categories(props) {
  const router = useRouter();
   const { t } = useTranslation()
  const [productList, SetProductList] = useState([]);
  const [category, setCategory] = useState({});
  const [categoryList, SetCategoryList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedSortBy, setSelectedSortBy] = useState("");
  const [openData, setOpenData] = useState(true);
  const [openCategory, setOpenCategory] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    currentPage: 1,
    itemsPerPage: 10,
  });

  //   useEffect(() => {
  //     // if (category?._id) {
  //     getproductByCategory(router?.query?.cat_id);
  //     setSelectedCategories(router?.query?.cat_id);
  //     // }
  //   }, [router]);

  useEffect(() => {
    const { category, sort_by, cat_id } = router.query;

    if (category && sort_by) {
      setOpenData(true);
      setSelectedCategories(cat_id || "all");
      setSelectedSortBy(sort_by || "is_top");
      // getproductByCategory(cat_id || "all", sort_by || "is_top", currentPage);
    } else if (!selectedSortBy) {
      // setSelectedSortBy('is_top');
      // getproductByCategory(router.query.cat_id || "all", currentPage);
      setSelectedCategories(cat_id || "all");
    } else {
      // getproductByCategory(router.query.cat_id || "all", selectedSortBy, currentPage);
      setSelectedCategories(cat_id || "all");
    }
  }, [router]);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async (cat) => {
    props.loader(true);
    Api("get", "getCategory", "", router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        res.data.push({
          name: "All",
          slug: "all",
        });
        SetCategoryList(res.data);
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  // const getproductByCategory = useCallback(
  //   async (cat, sortBy = "", page = 1, limit = 2) => {
  //     props.loader(true);
  //     page = Number(page) || 1;
  //     limit = Number(limit) || 2;
  //     let parmas = { status: "verified" };
  //     let url = `getProductBycategoryId?page=${page}&limit=${limit}`;
  //     if (cat) {
  //       parmas.category = cat;
  //     }
  //     if (sortBy) parmas.sort_by = sortBy || selectedSortBy;
  //     Api("get", url, "", router, parmas).then(
  //       (res) => {
  //         props.loader(false);
  //         console.log("res================>12", res);

  //         if (res.data && Array.isArray(res.data)) {
  //           console.log("original data", res.data[0]?.status);

  //           const activeProducts = res.data.filter(
  //             (product) => product.status !== "suspended"
  //           );

  //           console.log("Filtered Data:", activeProducts);

  //           if (activeProducts.length > 0) {
  //             SetProductList(activeProducts);
  //             setPagination(res?.pagination);
  //             setCurrentPage(res?.pagination?.currentPage);
  //           } else {
  //             SetProductList([]);
  //             setPagination({ ...pagination, totalPages: 1 });
  //             setCurrentPage(1);
  //             props.toaster({
  //               type: "info",
  //               message: "No active products found",
  //             });
  //           }
  //         } else {
  //           console.error("Unexpected response format:", res);
  //           props.toaster({
  //             type: "error",
  //             message: "Unexpected response format",
  //           });
  //         }
  //       },
  //       (err) => {
  //         props.loader(false);
  //         console.log(err);
  //         props.toaster({ type: "error", message: err?.message });
  //       }
  //     );
  //   },
  //   [router, selectedSortBy, selectedCategories, currentPage]
  // );

  // useEffect(() => {
  //   if (selectedCategories) {
  //     getproductByCategory(
  //       selectedCategories,
  //       selectedSortBy,
  //       currentPage || 1
  //     );
  //   }
  // }, [selectedCategories, selectedSortBy, currentPage]);

  // ✅ Controlled version: no internal fallback logic
  const getproductByCategory = useCallback(
    async (cat, sortBy, page, limit = 12) => {
      props.loader(true);
      page = Number(page) || 1;
      limit = Number(limit) || 12;

      let params = { status: "verified" };
      let url = `getProductBycategoryId?page=${page}&limit=${limit}`;

      if (cat) params.category = cat;
      if (sortBy) params.sort_by = sortBy;

      Api("get", url, "", router, params).then(
        (res) => {
          // props.loader(false);

          if (res.data && Array.isArray(res.data)) {
            const activeProducts = res.data.filter(
              (product) => product.status !== "suspended"
            );

            if (activeProducts.length > 0) {
              SetProductList(activeProducts);
              setPagination(res?.pagination);
            } else {
              SetProductList([]);
              setPagination({ totalPages: 1 });
              props.toaster({
                type: "info",
                message: "No active products found",
              });
            }
            props.loader(false);
          } else {
            console.error("Unexpected response format:", res);
            props.toaster({
              type: "error",
              message: "Unexpected response format",
            });
            props.loader(false);
          }
        },
        (err) => {
          props.loader(false);
          console.log(err);
          props.toaster({ type: "error", message: err?.message });
        }
      );
    },
    // [router]
    // []
    [selectedCategories, selectedSortBy, currentPage]
  );

  // useEffect(() => {
  //   if (selectedCategories) {
  //     getproductByCategory(selectedCategories, selectedSortBy, currentPage);
  //   }
  // }, [selectedCategories, selectedSortBy, currentPage]);

  const stableCategories = useMemo(
    () => selectedCategories,
    [selectedCategories]
  );

  // useEffect(() => {
  //   getproductByCategory(stableCategories, selectedSortBy, currentPage);
  // }, [stableCategories, selectedSortBy, currentPage]);

  useEffect(() => {
    getproductByCategory(stableCategories, selectedSortBy, currentPage);
  }, [router]);

  const handleSortChange = (sortByValue) => {
    props.loader(true);
    setSelectedSortBy(sortByValue);
    getproductByCategory(selectedCategories, sortByValue, currentPage);
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, sort_by: sortByValue },
    });
    setCurrentPage(1);
    props.loader(false);
  };

  const handlePageChange = (_, value) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: value,
    }));
    setCurrentPage(value);
  };

  return (
    <div className="bg-white w-full">
      <section className="bg-white w-full  relative flex flex-col justify-center items-center">
        <div className="max-w-7xl mx-auto w-full md:px-0 px-5 md:pt-10 pt-5 md:pb-10 pb-0">
          <div className="grid md:grid-cols-4 grid-cols-1 w-full md:gap-5">
            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
              <div className="bg-custom-lightGrayColor w-[250px] h-full px-5 py-5 md:hidden block md:col-span-1">
                <div className="border-b border-custom-gray">
                  <div className="flex justify-between items-center w-full  pb-5">
                    <p className="text-custom-black font-semibold text-lg">
                     {t("Sort By")} 
                    </p>
                    {!openData && (
                      <FaCircleChevronDown
                        className="text-lg text-custom-purple"
                        onClick={() => {
                          setOpenData(true);
                        }}
                      />
                    )}
                    {openData && (
                      <FaCircleChevronUp
                        className="text-lg text-custom-purple"
                        onClick={() => setOpenData(false)}
                      />
                    )}
                  </div>
                  {openData && (
                    <FormControl className="">
                      <FormGroup className="flex flex-col">
                        {sortByData.map((item, i) => (
                          <FormControlLabel
                            className="text-black"
                            key={i}
                            control={
                              <Checkbox
                                onChange={() => {
                                  if (selectedSortBy === item?.value) {
                                    setSelectedSortBy("");
                                  } else {
                                    setSelectedSortBy(item?.value);
                                  }
                                }}
                                checked={item?.value === selectedSortBy}
                              />
                            }
                            label={item?.name}
                          />
                        ))}
                      </FormGroup>
                    </FormControl>
                  )}
                </div>

                <div className="pt-5">
                  <div className="flex justify-between items-center w-full  pb-5">
                    <p className="text-custom-black font-semibold text-lg">
                      {t("Categories")}
                    </p>
                    {!openCategory && (
                      <FaCircleChevronDown
                        className="text-lg text-custom-purple cursor-pointer"
                        onClick={() => {
                          setOpenCategory(true);
                        }}
                      />
                    )}
                    {openCategory && (
                      <FaCircleChevronUp
                        className="text-lg text-custom-purple cursor-pointer"
                        onClick={() => setOpenCategory(false)}
                      />
                    )}
                  </div>

                  {openCategory && (
                    <FormGroup>
                      {categoryList.map((item, i) => (
                        <FormControlLabel
                          className="text-black"
                          key={i}
                          control={
                            <Checkbox
                              onChange={() => {
                                router.replace(`/categories/${item.slug}`);
                                setSelectedCategories(item?.slug);
                              }}
                              checked={item.slug === selectedCategories}
                            />
                          }
                          label={item?.name}
                        />
                      ))}
                    </FormGroup>
                  )}
                </div>
              </div>
            </Drawer>

            <div className="bg-custom-lightGrayColor w-full px-5 py-5 hidden md:block md:col-span-1">
              <div className="border-b border-custom-gray">
                <div className="flex justify-between items-center w-full  pb-5">
                  <p className="text-custom-black font-semibold text-lg">
                    Sort By
                  </p>
                  {!openData && (
                    <FaCircleChevronDown
                      className="text-lg text-custom-purple"
                      onClick={() => {
                        setOpenData(true);
                      }}
                    />
                  )}
                  {openData && (
                    <FaCircleChevronUp
                      className="text-lg text-custom-purple"
                      onClick={() => setOpenData(false)}
                    />
                  )}
                </div>
                {openData && (
                  <FormControl className="">
                    <FormGroup className="flex flex-col">
                      {sortByData.map((item, i) => (
                        <FormControlLabel
                          className="text-black"
                          key={i}
                          control={
                            <Checkbox
                              onChange={() => handleSortChange(item.value)}
                              checked={item.value === selectedSortBy}
                            />
                          }
                          label={item?.name}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                )}
              </div>

              <div className="pt-5">
                <div className="flex justify-between items-center w-full  pb-5">
                  <p className="text-custom-black font-semibold text-lg">
                    {t("Categories")}
                  </p>
                  {!openCategory && (
                    <FaCircleChevronDown
                      className="text-lg text-custom-purple cursor-pointer"
                      onClick={() => {
                        setOpenCategory(true);
                      }}
                    />
                  )}
                  {openCategory && (
                    <FaCircleChevronUp
                      className="text-lg text-custom-purple cursor-pointer"
                      onClick={() => setOpenCategory(false)}
                    />
                  )}
                </div>

                {openCategory && (
                  <FormGroup>
                    {categoryList.map((item, i) => (
                      <FormControlLabel
                        className="text-black"
                        key={i}
                        control={
                          <Checkbox
                            onChange={() => {
                              router.replace(`/categories/${item.slug}`);
                              setSelectedCategories(item?.slug);
                              getproductByCategory(
                                item?.slug,
                                selectedSortBy,
                                currentPage
                              );
                            }}
                            checked={item.slug === selectedCategories}
                          />
                        }
                        label={item?.name}
                      />
                    ))}
                  </FormGroup>
                )}
              </div>
            </div>

            <div className="md:col-span-3 col-span-1 flex justify-between items-center md:hidden">
              <p className="text-custom-black font-semibold text-lg">
                {t("Categories")}
              </p>
              <IoFilter
                onClick={() => setOpen(true)}
                className="text-lg text-custom-purple"
              />
            </div>

            <div className="col-span-3 mt-5">
              <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
                {productList.length > 0 ? (
                  productList.map((item, i) => (
                    <div key={i} className="w-full md:mb-5">
                      <GroceryCategories
                        item={item}
                        i={i}
                        url={`/product-details/${item?.slug}`}
                        loader={props?.loader}
                        toaster={props?.toaster}
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center items-center h-[200px] md:h-[400px] col-span-4 ">
                    <p className="text-black text-center font-semibold text-2xl">
                      {t("No products available in this category")}.
                    </p>
                  </div>
                )}
              </div>
              {pagination?.totalPages > 1 && (
                <div className="py-5 flex justify-center items-end">
                  <Pagination
                    count={pagination?.totalPages || 1}
                    page={currentPage}
                    onChange={(event, value) => {
                      if (!isNaN(value)) {
                        setCurrentPage(value);
                        getproductByCategory(
                          selectedCategories,
                          selectedSortBy,
                          value
                        );
                      }
                    }}
                    // currentPage={currentPage}
                    variant="outlined"
                    color="primary"
                    shape="rounded"
                    showFirstButton
                    showLastButton
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Categories;
