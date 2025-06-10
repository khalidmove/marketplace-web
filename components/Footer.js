import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Api } from "@/services/service";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import moment from 'moment';
import { FaTiktok } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { LuClock9 } from "react-icons/lu";
import { openCartContext } from "@/pages/_app";
import { useTranslation } from "react-i18next";

function Footer(props) {
  const router = useRouter();
  const [userDetail, setUserDetail] = useState({
    subscriber: "",
  });
    const {t} = useTranslation()
  const [openCart, setOpenCart] = useContext(openCartContext);

  const addSubscriber = (e) => {
    e.preventDefault();
    const data = {
      email: userDetail?.subscriber,
    }
    props.loader(true);
    Api("post", "add-subscriber", data, router).then(
      (res) => {
        console.log("res================>", res);
        props.loader(false);

        if (res?.status) {
          setUserDetail({
            subscriber: "",
          });
          props.toaster({ type: "success", message: res?.data?.message });
        }
      },
      (err) => {
        props.loader(false);
        console.log(err);
        props.toaster({ type: "error", message: err?.data?.message });
      }
    );
  };

  return (
    <div>
      <div className="bg-white relative">
        <div className="max-w-7xl mx-auto h-full border-b border-b-[#00000050] md:pb-10 pb-5"></div>
        <div className="max-w-7xl mx-auto h-full md:py-10 py-5 px-4 md:px-6">
          <div className="grid md:grid-cols-5 grid-cols-1">
            <div className="text-white flex flex-col md:justify-start justify-center md:items-start items-start  md:col-span-2">
              <div className="py-5">
                <img
                  className="md:w-[165px] w-[110px] h-[43px]  object-cover  rounded-[5px] -mt-6"
                  src="/logo.jpeg"
                  alt=""
                />
              </div>

              {/* <div className="flex justify-start items-center">
                <CiLocationOn className="w-[18px] h-[18px] text-custom-purple mr-2" />
                <p className="text-custom-darkGray font-semibold text-base">Address: <span className="font-medium">1762 School House Road</span></p>
              </div>

              <div className="flex justify-start items-center pt-5">
                <FiPhone className="w-[18px] h-[18px] text-custom-purple mr-2" />
                <p className="text-custom-darkGray font-semibold text-base">Call Us: <a href="tel:1233-777" className="font-medium">1233-777</a></p>
              </div> */}

              <div className="flex justify-start items-center">
                <MdOutlineEmail className="w-[18px] h-[18px] text-custom-purple mr-2" />
                <p className="text-custom-darkGray font-semibold text-base">{t("Email")}: <a href="mailto:contact@resazonline.com" className="font-medium">contact@resazonline.com</a></p>
              </div>

              <div className="flex justify-start items-center pt-5">
                <LuClock9 className="w-[18px] h-[18px] text-custom-purple mr-2" />
                <p className="text-custom-darkGray font-semibold text-base">{t("Work hours")}: <span className="font-medium">24/7</span></p>
              </div>
            </div>

            <div className="flex flex-col md:justify-start justify-center md:items-center items-start md:pt-0 pt-5">
              <div className="flex flex-col md:items-start items-start">
                <p className="text-custom-darkGray text-2xl font-semibold pb-5 uppercase">{t("Account")}</p>
                <p className="text-custom-darkGray text-base font-medium cursor-pointer pb-5" onClick={() => { router.push('/favourite') }}>{t("Wishlist")}</p>
                <p className="text-custom-darkGray text-base font-medium cursor-pointer pb-5" onClick={() => { setOpenCart(true) }}>{t("Cart")}</p>
                <p className="text-custom-darkGray text-base font-medium cursor-pointer" onClick={() => { router.push('/orders') }}>{t("Order")}</p>
                {/* <p className="text-custom-darkGray text-base font-medium cursor-pointer">Shipping Details</p> */}
              </div>
            </div>

            <div className="flex flex-col md:justify-start justify-center md:items-center items-start md:pt-0 pt-5">
              <div className="flex flex-col md:items-start items-start">
                <p className="text-custom-darkGray text-2xl font-semibold pb-5 uppercase">{t("Useful links")}</p>
                <p className="text-custom-darkGray text-base font-medium cursor-pointer pb-5" onClick={() => { router.push('/about-us') }}>{t("About us")}</p>
                <p className="text-custom-darkGray text-base font-medium cursor-pointer" onClick={() => { router.push('/contact-us') }}>{t("Contact us")}</p>
                {/* <p className="text-custom-darkGray text-base font-medium cursor-pointer pb-5">Hot deals</p>
                <p className="text-custom-darkGray text-base font-medium cursor-pointer pb-5">Promotions</p>
                <p className="text-custom-darkGray text-base font-medium cursor-pointer">New products</p> */}
              </div>
            </div>

            <div className="flex flex-col md:justify-start justify-center md:items-center items-start md:pt-0 pt-5">
              <div className="flex flex-col md:items-start items-start">
                <p className="text-custom-darkGray text-2xl font-semibold pb-5 uppercase">{t("Help Center")}</p>
                {/* <p className="text-custom-darkGray text-base font-medium cursor-pointer pb-5">Payments</p>
                <p className="text-custom-darkGray text-base font-medium cursor-pointer pb-5">Refund</p>
                <p className="text-custom-darkGray text-base font-medium cursor-pointer pb-5">Checkout</p>
                <p className="text-custom-darkGray text-base font-medium cursor-pointer pb-5">Shipping</p> */}
                <p className="text-custom-darkGray text-base font-medium cursor-pointer pb-5" onClick={() => { router.push('/faq') }}>{t("Q&A")}</p>
                <p className="text-custom-darkGray text-base font-medium cursor-pointer pb-5" onClick={() => { router.push('/privacy-policy') }}>{t("Privacy Policy")}</p>
                <p className="text-custom-darkGray text-base font-medium cursor-pointer pb-5" onClick={() => { router.push('/terms-condition') }}>{t("Term & Conditions")}</p>
                <p className="text-custom-darkGray text-base font-medium cursor-pointer pb-5" onClick={() => { router.push('/refund-policy') }}>{t("Refund Policy")}</p>
                {/* <p className="text-custom-darkGray text-base font-medium cursor-pointer"
                  onClick={() => { router.push('/contact-us') }}
                >Support Center</p> */}
              </div>
            </div>


          </div>
        </div>

        <div className="max-w-7xl mx-auto h-full border-t border-t-[#00000050] md:pb-10 pb-5"></div>
        <div className="max-w-7xl mx-auto w-full md:pb-10 pb-5 px-6">
          <div className="md:flex justify-between items-center">
            <p className="text-custom-darkGray text-base font-medium">© {moment().format('YYYY')}, 
              {t("All Rights Reserved By: RESAZ Technologies")}</p>
            <div className="flex gap-5 md:pt-0 pt-5">
              <img onClick={() => window.open("https://www.facebook.com/share/16HHQtMX53/?mibextid=wwXIfr", "_blank")} className="w-[44px] h-[44px] cursor-pointer" src="/facebookImg.png" />
              {/* <img className="w-[44px] h-[44px] cursor-pointer" src="/linkedinImg.png" /> */}
              <img onClick={() => window.open("https://www.instagram.com/resazonline?igsh=a3pkbXo4OHd6dzhv&utm_source=qr", "_blank")} className="w-[44px] h-[44px] cursor-pointer" src="/instagramImg.png" />
              <img 
              onClick={() => window.open("https://t.me/ResazOnline", "_blank")} 
              className="w-[44px] h-[44px] cursor-pointer" src="/icons-teli.png" />

            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto h-full md:pb-0 pb-14"></div>

      </div>
    </div>
  );
}

export default Footer;
