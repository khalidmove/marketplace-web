import { Api, ApiFormData } from "@/services/service";
import { Box, Modal } from "@mui/material";
import Compressor from "compressorjs";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";

const RefundButton = ({
  deliveredAt,
  refunded,
  returned,
  id,
  productId,
  loader,
  toaster,
  getProductRequestbyUser,
}) => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [singleImg, setSingleImg] = useState([]);

  const router = useRouter();
  const shouldShowRefund = useMemo(() => {
    if (!deliveredAt) return false;
    if (returned) return false;
    if (refunded) return false;
    // if (returned && refunded) return false;

    const deliveredTime = new Date(deliveredAt).getTime();
    const currentTime = Date.now();
    const fiveMinutes = 15 * 60 * 1000;

    return currentTime - deliveredTime <= fiveMinutes;
  }, [deliveredAt, returned, refunded]);

  console.log(deliveredAt, returned, refunded, id, productId);

  const refundProduct = (order_id) => {
    if (!reason) {
      toaster({
        type: "error",
        message: "Please enter a reason for the return",
      });
      return;
    }

    if (singleImg?.length < 2) {
      toaster({ type: "error", message: "Please upload atleast two images" });
      return;
    }
    let data = {
      product_id: productId,
      reason: reason,
      refundProof: singleImg,
    };
    loader(true);
    Api("patch", `refundProduct/${order_id?.id}`, data, router).then(
      (res) => {
        loader(false);
        console.log("res================>", res);
        setOpen(false);
        if (res.status) {
          toaster({ type: "success", message: res.data?.message });
          getProductRequestbyUser();
          setReason("");
          setSingleImg("");
        } else {
          toaster({ type: "error", message: res?.data?.message });
        }
      },
      (err) => {
        loader(false);
        setOpen(false);
        console.log(err);
        toaster({ type: "error", message: err?.message });
      }
    );
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const fileSizeInMb = file.size / (1024 * 1024);
    if (fileSizeInMb > 1) {
      toaster({
        type: "error",
        message: "Too large file. Please upload a smaller image",
      });
      return;
    } else {
      new Compressor(file, {
        quality: 0.6,
        success: (compressedResult) => {
          console.log(compressedResult);
          const data = new FormData();
          data.append("file", compressedResult);
          loader(true);
          ApiFormData("post", "user/fileupload", data, router).then(
            (res) => {
              loader(false);
              if (res.status) {
                // setSingleImg(res.data.file)
                setSingleImg((prev) => [...prev, res.data.file]);
                toaster({ type: "success", message: res.data.message });
              }
            },
            (err) => {
              loader(false);
              console.log(err);
              toaster({ type: "error", message: err?.message });
            }
          );
          // compressedResult has the compressed file.
          // Use the compressed file to upload the images to your server.
          //   setCompressedFile(res)
        },
      });
    }
    const reader = new FileReader();
  };

  const closeIcon = (itemToRemove) => {
    setSingleImg((prev) => prev.filter((item) => item !== itemToRemove));
  };

  if (!shouldShowRefund) return null;

  return (
    <div className="flex items-center justify-center">
      {open && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/30 flex justify-center items-center z-50 cursor-default">
          <div className="relative w-[300px] md:w-[460px] h-auto  bg-white rounded-[15px] m-auto cursor-default">
            <div
              className="absolute top-2 right-2 p-1 rounded-full  text-black w-8 h-8 cursor-pointer"
              onClick={() => {
                setOpen(false);
                setReason("");
                setSingleImg("");
              }}
            >
              <RxCrossCircled className="h-full w-full font-semibold " />
            </div>

            <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-lg p-4">
              <h2 className="text-custom-purple text-2xl font-bold">
                Return Product
              </h2>
              <p className="text-base text-gray-600">
                Are you sure you want to return this product?
              </p>
              <div className="flex flex-col mt-4 space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-base text-gray-600 font-semibold">
                    Reason for Return:
                  </label>
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="bg-white w-full h-[40px] px-2 rounded-[5px] border border-black/30 font-medium text-base text-black outline-none"
                    placeholder="Enter reason"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-base text-gray-600 font-semibold">
                    Upload Proof:
                  </label>
                  <input
                    type="file"
                    className="bg-white w-full h-[40px] py-1 px-2 rounded-[5px] border border-black/30 font-medium text-base text-black outline-none"
                    accept="image/*,video/*"
                    onChange={(event) => {
                      handleImageChange(event);
                    }}
                  />
                  <span className="text-xs text-gray-700">
                    Upload atleast two images
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {singleImg &&
                    singleImg?.map((item, i) => (
                      <div className="relative" key={i}>
                        <img
                          className="md:w-20 w-[85px] h-20 object-contain"
                          src={item}
                        />
                        <IoCloseCircleOutline
                          className="text-red-700 cursor-pointer h-3 w-3 absolute left-[5px] top-[10px]"
                          onClick={() => {
                            closeIcon(item);
                          }}
                        />
                      </div>
                    ))}
                </div>
              </div>
              <div className="flex mt-4 space-x-2">
                <button
                  onClick={() => {
                    setOpen(false);
                    setReason("");
                    setSingleImg("");
                  }}
                  className="bg-red-500 text-sm font-bold px-4 py-2 rounded-sm !text-white"
                >
                  Cancel
                </button>
                <button
                  disabled={!reason || !singleImg}
                  onClick={() => {
                    refundProduct({ id });
                  }}
                  className="bg-custom-purple text-sm font-bold px-4 py-2 rounded-sm disabled:bg-custom-purple/50 disabled:cursor-not-allowed !text-white"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(true)}
        className="bg-custom-purple text-xs font-bold px-4 py-2 rounded-sm !text-white"
      >
        Return
      </button>
    </div>
  );
};

export default RefundButton;
