import { PiCirclesFourLight } from "react-icons/pi";
import { FaPhoneAlt } from "react-icons/fa";
import Link from "next/link";
import { FiHome } from "react-icons/fi";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { TiArrowSortedUp } from "react-icons/ti";
import { IoIosArrowBack } from "react-icons/io";
import { Api } from "@/services/service";
import { FaQuestion } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { SiLivechat } from "react-icons/si";
import { userContext } from "@/pages/_app";
import { useTranslation } from "react-i18next";
import { languageContext } from "@/pages/_app";

function HeaderFirst(props) {
  const router = useRouter();
  const [showHover, setShowHover] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("home");
  const [user, setUser] = useContext(userContext);

  console.log("user ::", user);
  const [lang, setLang] = useState(null);
  const [globallang, setgloballang] = useContext(languageContext);
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    props.loader(true);
    Api("get", "getCategory", "", router).then(
      (res) => {
        props.loader(false);
        console.log("res================>", res);
        setCategoryData(res.data);
      },
      (err) => {
        props.loader(false);
        console.log(err);
        // props.toaster({ type: "error", message: err?.message });
      }
    );
  };

  // useEffect(() => {
  //   // Get language from localStorage or default to 'en'
  //   const savedLang = localStorage.getItem("LANGUAGE") || "en";
  //   setLang(savedLang);
  //   i18n.changeLanguage(savedLang);
  //   setgloballang(savedLang);
  // }, []);

  function handleClick(idx) {
    try {
      setLang(idx);
      const language = idx || "en";
      console.log(language);
      i18n.changeLanguage(language);
      setgloballang(language);
      localStorage.setItem("LANGUAGE", language);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="w-full md:border-b border-b-0 border-b-gray-400 px-1 md:px-6 2xl:px-0">
      <div className="max-w-7xl  mx-auto w-full bg-white">
        <div className="hidden lg:flex justify-between my-2 ">
          <div
            className="relative group"
            onClick={() => {
              setShowHover(true);
            }}
          >
            <button className="h-[52px] rounded-[2px] bg-custom-purple font-semibold text-white text-base flex justify-center items-center px-5">
              <PiCirclesFourLight className="w-[35px] h-[35px] text-white" />
              <span className="ml-5">{t("Browse All Categories")}</span>
            </button>
            {/* onClick={() => { router.push('/categoriesList') }} */}

            {showHover && (
              <div
                className={` lg:absolute top-[34px] right-0 lg:min-w-[265px] group-hover:text-black   hidden group-hover:lg:block hover:lg:block md:z-40`}
              >
                <div className="bg-custom-purple  lg:shadow-inner z-10 rounded-md lg:mt-8 shadow-inner">
                  <TiArrowSortedUp
                    className={`group-hover:lg:block lg:hidden h-5 w-5 text-custom-purple  absolute top-5 right-0`}
                  />
                  <div className="w-full cursor-pointer">
                    {categoryData.map((item, i) => (
                      <div
                        key={i}
                        className={`px-5 py-2 shadow-inner feature1  flex justify-between items-center cursor-pointer1 ${
                          categoryData?.length !== i + 1
                            ? "border-b-2 border-white"
                            : ""
                        }`}
                        onClick={() => {
                          router.push(`/categories/${item?.slug}`);
                        }}
                      >
                        <p className="text-white text-base cursor-pointer	font-normal">
                          {item?.name}
                        </p>
                        <IoIosArrowBack className="w-[22px] h-[22px] text-white rotate-180" />
                      </div>
                    ))}

                    {/* <div className="px-5 py-2 shadow-inner feature1 border-b-2 border-white flex justify-between items-center">
                      <p className="text-white text-base	font-normal">Snacks & Drinks</p>
                      <IoIosArrowBack className="w-[22px] h-[22px] text-white rotate-180" />
                    </div>

                    <div className="px-5 py-2 shadow-inner feature1 border-b-2 border-white flex justify-between items-center">
                      <p className="text-white text-base	font-normal">Beauty & Personal care</p>
                      <IoIosArrowBack className="w-[22px] h-[22px] text-white rotate-180" />
                    </div>

                    <div className="px-5 py-2 shadow-inner feature1 border-b-2 border-white flex justify-between items-center">
                      <p className="text-white text-base	font-normal">Household Essentials</p>
                      <IoIosArrowBack className="w-[22px] h-[22px] text-white rotate-180" />
                    </div>

                    <div className="px-5 py-2 shadow-inner feature1 border-b-2 border-white flex justify-between items-center">
                      <p className="text-white text-base	font-normal">Electronics</p>
                      <IoIosArrowBack className="w-[22px] h-[22px] text-white rotate-180" />
                    </div>

                    <div className="px-5 py-2 shadow-inner feature1 border-b-2 border-white flex justify-between items-center">
                      <p className="text-white text-base	font-normal">Packaged Food</p>
                      <IoIosArrowBack className="w-[22px] h-[22px] text-white rotate-180" />
                    </div>

                    <div className="px-5 py-2 shadow-inner feature1 flex justify-between items-center">
                      <p className="text-white text-base	font-normal">Toys & Sports</p>
                      <IoIosArrowBack className="w-[22px] h-[22px] text-white rotate-180" />
                    </div> */}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center items-center">
            <ul className="flex items-center gap-8 my-2">
              <div className="flex items-center">
                <FiHome
                  className={`w-5 h-5 ${
                    selectedTab === "home"
                      ? "text-custom-purple"
                      : "text-custom-darkGray"
                  }`}
                />
                <p
                  className={`text-base font-medium cursor-pointer ml-2 ${
                    selectedTab === "home"
                      ? "text-custom-purple"
                      : "text-custom-darkGray"
                  }`}
                  onClick={() => {
                    router.push("/");
                    setSelectedTab("home");
                  }}
                >
                  {t("Home")}
                </p>
              </div>
              <div className="flex items-center">
                {/* <img className="w-5 h-5 object-contain" src="/referalImg.png" /> */}
                <div
                  className={`w-5 h-5 rounded-full flex justify-center items-center ${
                    selectedTab === "referal"
                      ? "bg-custom-purple"
                      : "bg-custom-darkGray"
                  }`}
                >
                  <FaQuestion className="text-white w-4 h-4" />
                </div>
                <p
                  className={`text-base font-medium cursor-pointer ml-2 ${
                    selectedTab === "referal"
                      ? "text-custom-purple"
                      : "text-custom-darkGray"
                  }`}
                  onClick={() => {
                    router.push("/referal");
                    setSelectedTab("referal");
                  }}
                >
                  {t("Referral")}
                </p>
              </div>
              <div className="flex items-center">
                {/* {selectedTab !== 'categories' && <img className="w-5 h-5 object-contain" src="/aboutUsImg.png" />}
                {selectedTab === 'categories' && <img className="w-5 h-5 object-contain" src="/categoriesImg.png" />} */}
                <BiCategory
                  className={`w-5 h-5 ${
                    selectedTab === "categories"
                      ? "text-custom-purple"
                      : "text-custom-darkGray"
                  }`}
                />
                <p
                  className={`text-base font-medium cursor-pointer ml-2 ${
                    selectedTab === "categories"
                      ? "text-custom-purple"
                      : "text-custom-darkGray"
                  }`}
                  onClick={() => {
                    router.push("/categories/all");
                    setSelectedTab("categories");
                  }}
                >
                  {t("Categories")}
                </p>
              </div>
              {/* <div className="flex items-center"> */}
              {/* <img className="w-5 h-5 object-contain" src="/liveChatImg.png" /> */}
              {/* <SiLivechat className={`w-5 h-5  ${selectedTab === 'live chat' ? 'text-custom-purple' : 'text-custom-darkGray'}`} />
                <p className={`text-base font-medium cursor-pointer ml-2 ${selectedTab === 'live chat' ? 'text-custom-purple' : 'text-custom-darkGray'}`} onClick={() => { router.push('/'); setSelectedTab('live chat'); }}>
                  Live chat
                </p>
              </div> */}
            </ul>
          </div>

          <div className="my-2 flex items-center gap-5 justify-center">
            <p className="my-1 text-red-500">
              <FaPhoneAlt />
            </p>
            <a
              href="tel:+964-751-092-1850"
              className="text-red-500 font-medium cursor-pointer"
            >
              +964-751-092-1850
            </a>
            <p
              className="font-medium text-gray-900 cursor-pointer "
              onClick={() => {
                router.push("/create-store");
              }}
            >
              {user.type == "SELLER" ? (
                <span>My Store</span>
              ) : (
                <span>Become a seller</span>
              )}
            </p>
            <div className="rounded-lg md:flex hidden">
              <select
                className="bg-white w-full font-normal text-sm text-black outline-none cursor-pointer"
                value={lang}
                onChange={(e) => handleClick(e.target.value)}
              >
                <option value={"en"}>English</option>
                <option value={"ckb"}>Kurdish</option>
                <option value={"ar"}>Arabic</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderFirst;
