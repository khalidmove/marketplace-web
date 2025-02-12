import React, { useEffect, useState } from "react";
import { Api } from "@/services/service";
import { useRouter } from "next/router";

function faq() {
    const [open, setOpen] = useState([]);
    const [faq, setFaq] = useState([]);
    const router = useRouter();

    useEffect(() => {
        getFAQ();
    }, []);  // ✅ Fix: Added dependency array to avoid infinite re-renders

    const getFAQ = () => {
        Api("get", "faq", "", router).then(
            (res) => {
                if (res?.status && Array.isArray(res?.data)) {
                    setFaq(res.data); 
                    console.log("Fetched FAQ data:", res.data);
                } else {
                    console.log("Error:", res?.data?.message);
                }
            },
            (err) => {
                console.log("API Error:", err);
            }
        );
    };

    const toggleOpen = (index) => {
        setOpen((prevOpen) => 
            prevOpen.includes(index) ? prevOpen.filter((i) => i !== index) : [...prevOpen, index]
        );
    };

    return (
        <div className="bg-white w-full">
            <section className="bg-white w-full flex flex-col justify-center items-center">
                <div className="max-w-6xl mx-auto w-full  md:px-0 px-5 md:pt-10 pt-5 md:pb-10 pb-5">
                    <p className="text-2xl text-black font-bold text-center md:pb-5 pb-5">FAQ</p>

                    {faq.length > 0 ? (
                        faq.map((item, index) => (
                            <div 
                                key={index} 
                                className={`md:px-10 px-5 md:pt-5 pt-3 pb-3 border-b border-white cursor-pointer

                                     ${
                                    open.includes(index) ? "bg-custom-purple" : "bg-custom-purple"
                                }`} 
                                onClick={() => toggleOpen(index)}
                            >
                                <div className="flex justify-between items-center md:h-[100px]">
                                    <p className="md:text-xl text-lg font-bold text-white">
                                        {index + 1}. {item?.question}
                                    </p>
                                    <img 
                                        className="md:w-[32px] w-[24px]" 
                                        src={open.includes(index) ? "/image-3.png" : "/image-4.png"} 
                                        alt="toggle"
                                    />
                                </div>

                                {open.includes(index) && (
                                    <div className="md:text-lg text-base font-normal text-white md:pl-[2px] pt-3">
                                        {Array.isArray(item?.answer) ? (
                                            item.answer.map((ans, inx) => (
                                                <p key={inx} className="pb-3">{ans}</p>
                                            ))
                                        ) : (
                                            <p className="ms-4 ">{item?.answer}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">No FAQs available.</p>
                    )}
                </div>
            </section>
        </div>
    );
}

export default faq;
