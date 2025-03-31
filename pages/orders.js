import { Api } from "@/services/service";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { RxCrossCircled } from "react-icons/rx";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import currencySign from "@/utils/currencySign";
import { FaChevronDown } from "react-icons/fa";
import dateFormat, { masks } from "dateformat";

function orders(props) {
  const router = useRouter();
  const [ordersData, setOrdersData] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [reviewsData, setReviewsData] = useState({
    description: "",
    reviews: 0,
  });
  const [productId, setProductId] = useState("");
  const [reviews, setReviews] = useState("product");
  const [sellerId, setSellerId] = useState("");
  const [showProduct, setShowProduct] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    getProductRequestbyUser();
  }, []);

  const getProductRequestbyUser = async () => {
    props.loader(true);
    Api("get", "getProductRequestbyUser", "", router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        setOrdersData(res.data);
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  const groupOrdersByBookingId = () => {
    return ordersData.reduce((groups, order) => {
      const bookingId = order.bookingId;
      if (!groups[bookingId]) {
        groups[bookingId] = [];
      }
      groups[bookingId].push(order);
      return groups;
    }, {});
  };

  const groupedOrders = groupOrdersByBookingId();
  // console.log("data---------->", groupedOrders);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const createProductRquest = (e) => {
    e.preventDefault();
    if (reviewsData?.reviews === 0) {
      props.toaster({ type: "success", message: "Rating is required" });
      return;
    }

    let data = {
      description: reviewsData?.description,
      // product: productId,
      rating: reviewsData?.reviews,
    };

    if (reviews === "product") {
      data.product = productId;
    } else {
      data.seller = sellerId;
    }

    console.log(data);
    props.loader(true);
    Api("post", "giverate", data, router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        if (res.status) {
          setShowReviews(false);
          setReviewsData({
            description: "",
            reviews: "",
          });
          setProductId("");
          setSellerId("");
          props.toaster({ type: "success", message: res.data?.message });
        } else {
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

  //   const handleProductClick = (productId, productDetailId) => {
  //     router.push({
  //         pathname: "/myorder",
  //         query: { id: productId, productDetailId: productDetailId }
  //     });
  // };

  return (
    <div className="bg-white w-full">
      <section className="bg-white w-full relative flex flex-col justify-center items-center lg:h-screen">
        <div className="max-w-7xl mx-auto w-full md:px-6 px-5 2xl:px-0 md:pt-10 pt-5 md:pb-10 pb-5 h-full">
          {ordersData?.length > 0 && (
            <div className=" my-5 md:mt-6 md:mb-10 flex flex-col gap-3 md:gap-3 justify-center items-center">
              <p className="text-xl md:text-3xl text-custom-purple font-semibold">
                My Order
              </p>
              <p className="text-base text-black">
                View and manage all your order in one place.
              </p>
            </div>
          )}
          {/* <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-5">
            {Object.keys(groupedOrders).length > 0 ? (
             Object.keys(groupedOrders).map((item, i) => (
                <div
                  key={i}
                  className="grid md:grid-cols-3 grid-cols-1 w-full gap-5 bg-white shadow-2xl p-5 rounded-[10px]"
                >
                  <div className="col-span-2 flex gap-5"
                    onClick={() => { router.push(`/myorder/${item?._id}?product_id=${item?.productDetail[0]?._id}`) }}
                  >
                    <img
                      className="w-20 h-20 rounded-[10px] object-contain"
                      src={item?.productDetail[0]?.image[0]}
                    />
                    <div>
                      <p className="text-black text-base font-bold">
                      {item?.productDetail[0]?.product?.name}
                      </p>
                      {item?.productDetail?.color && (
                        <div className="flex justify-start items-center pt-[6px]">
                          <p className="text-custom-purple text-xs font-bold">
                            Color:
                          </p>
                          <p
                            className="h-[10px] w-[10px] rounded-full border border-black ml-2"
                            style={{
                              backgroundColor: item?.productDetail?.color,
                            }}
                          ></p>
                        </div>
                      )}
                      <p className="text-custom-purple text-xs font-bold pt-[6px]">
                        Quantity: {item?.productDetail?.qty || 1}
                      </p>
                      <p className="text-custom-purple text-xs font-bold pt-[6px]">
                        Order ID: {item?._id}
                      </p>
                    </div>
                 </div>
                 
                  <div className="flex flex-col">
                    <p className="text-custom-red text-base font-bold text-right">
                      $ {item?.total}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center md:mt-5 w-full md:h-[300px] h-[200px] col-span-4">
                <p className="text-center text-black text-2xl">
                  No orders available.
                </p>
              </div>
            )}
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mx-6 md:mx-auto md:gap-12 gap-8 max-w-6xl">
            {ordersData.length > 0 ? (
              ordersData.map((order, index) => (
                <div
                  key={order?._id}
                  className="bg-white p-4 rounded-md border-2 border-[#999999] h-auto self-start"
                >
                  <div className="flex items-center justify-between  ">
                    <div className="flex flex-col justify-start w-full">
                      <div className="flex flex-row justify-between items-center mb-4">
                        <p className="w-8 h-8 pt-1 text-center bg-custom-purple text-white rounded-full">
                          {" "}
                          {index + 1}
                        </p>
                        <p className="text-[18px] text-black md:text-[24px]">
                          <FaChevronDown
                            onClick={() => toggleOrderDetails(order._id)}
                            className={`text-xl cursor-pointer ${
                              expandedOrderId === order._id
                                ? "transform rotate-180"
                                : ""
                            }`}
                          />
                        </p>
                      </div>
                      <div className="flex justify-start gap-3  pb-5">
                        <p className="text-black  text-xl md:text-2xl ">
                          My Booking
                        </p>
                        <p className="text-black text-xl md:text-2xl">
                          ({dateFormat(order?.updatedAt, "isoDate")})
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 grid-cols-1 w-full gap-5 bg-white p-3 rounded-[10px] border border-gray-200">
                    {expandedOrderId === order._id &&
                      order.productDetail.map((product, index) => {
                        // console.log("product------>", order);
                        // console.log("order------>", product);

                        return (
                          <div
                            key={index}
                            className="col-span-2 flex gap-5 cursor-pointer"
                            onClick={() => {
                              router.push(
                                `/myorder/${order?._id}?product_id=${product?._id}`
                              );
                            }}
                          >
                            <img
                              className="w-20 h-20 text-black rounded-[10px] object-contain "
                              src={product.image[0]}
                              alt="Product"
                            />
                            <div>
                              <p className="text-black text-base font-bold">
                                {product.product?.name || "Product Name"}
                              </p>
                              <p className="text-black text-xs font-bold pt-[6px]">
                                Quantity: {product.qty || 1}
                              </p>
                              <p className="text-black text-xs   max-w-sm sm:w-full font-bold pt-[6px]">
                                Order Id: {order._id}
                              </p>
                            </div>
                          </div>
                        );
                      })}

                    <div className={`${expandedOrderId === order._id ? "col-span-1" : "col-span-3"} flex flex-col justify-center items-end`}>
                      <p className="text-gray-600 text-base font-bold">
                        Total: {currencySign(order.total) || "0.00"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center md:mt-5 w-full md:h-[300px] h-[200px] col-span-4">
                <p className="text-center text-black text-2xl">
                  No orders available.
                </p>
              </div>
            )}
          </div>
          {showReviews && (
            <div className="fixed top-0 left-0 w-screen h-screen bg-black/30 flex justify-center items-center z-50">
              <div className="relative w-[300px] md:w-[360px] h-auto  bg-white rounded-[15px] m-auto">
                <div
                  className="absolute top-2 right-2 p-1 rounded-full  text-black w-8 h-8 cursor-pointer"
                  onClick={() => {
                    setShowReviews(false);
                  }}
                >
                  <RxCrossCircled className="h-full w-full font-semibold " />
                </div>

                <form className="px-5 py-5" onSubmit={createProductRquest}>
                  <p className="text-black font-bold text-2xl mb-5">Reviews</p>

                  <div className="flex justify-center items-center mb-5 gap-5">
                    <button
                      className={`h-[30px] w-32 rounded-[5px] text-black font-semibold text-sm ${
                        reviews === "product"
                          ? "underline underline-offset-8"
                          : ""
                      } `}
                      onClick={() => {
                        setReviews("product");
                      }}
                    >
                      Product
                    </button>
                    <button
                      className={`h-[30px] w-32 rounded-[5px] text-black font-semibold text-sm ${
                        reviews === "product"
                          ? ""
                          : "underline underline-offset-8"
                      }`}
                      onClick={() => {
                        setReviews("seller");
                      }}
                    >
                      Seller
                    </button>
                  </div>

                  <div className="flex flex-col justify-center items-center  border border-custom-newGray rounded-[10px] py-3 mb-5">
                    <Box
                      sx={{
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Rating
                        name="text-feedback"
                        value={reviewsData?.reviews}
                        onChange={(e, value) => {
                          console.log(e, value);
                          setReviewsData({ ...reviewsData, reviews: value });
                        }}
                        precision={0.5}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                      {/* <Box sx={{ ml: 2 }}>rating</Box> */}
                    </Box>
                    <p className="text-custom-newGrayColors font-bold text-center text-base mt-2">
                      Rated {Number(reviewsData?.reviews || 0)?.toFixed(1)}/5.0
                      by users
                    </p>
                  </div>

                  <div className="w-full">
                    <textarea
                      className="bg-white md:w-full w-full px-5 py-2 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none md:my-5 my-3"
                      rows={4}
                      placeholder="Description"
                      value={reviewsData.description}
                      onChange={(e) => {
                        setReviewsData({
                          ...reviewsData,
                          description: e.target.value,
                        });
                      }}
                      required
                    />
                  </div>

                  <div className="flex md:justify-start justify-center">
                    <button
                      className="bg-custom-purple w-full md:h-[50px] h-[40px] rounded-[5px] text-white font-normal text-base"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default orders;
