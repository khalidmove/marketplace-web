import React, { useState, useEffect } from 'react';
import { Api } from '@/services/service';
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

function RefundPolicy(props) {
    const [returnPolicyData, setReturnPolicyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
const {t} = useTranslation()
    const getReturnPolicy = () => {
        props.loader(true);
        Api("get", "/content", router).then(
            (res) => {
                props.loader(false);
                console.log("API Response =>", res.data);

                if (res?.data?.length > 0 && res?.data[0]?.returnPolicy) {
                    setReturnPolicyData(res.data[0]);
                    setLoading(false);
                } else {
                    props.toaster({ type: "error", message: "Return policy not found" });
                    setLoading(false);
                }
            },
            (err) => {
                props.loader(false);
                console.log("API Error =>", err);
                props.toaster({ type: "error", message: err?.data?.message });
                props.toaster({ type: "error", message: err?.message });
                setLoading(false);
            }
        );
    };

    useEffect(() => {
        getReturnPolicy();
    }, []);

    return (
        <section className="bg-white w-full flex flex-col justify-center items-center">
            <div className="max-w-7xl mx-auto w-full md:px-6 px-5 2xl:px-0 md:pt-10 pt-5 md:pb-10 pb-5 md:min-h-screen">

                {/* {loading ? (
                    <p className="text-base text-black font-normal md:pb-5">Loading...</p>
                ) : ( */}
                    <div>
                        <p className='text-2xl text-black font-bold md:pb-5 pb-2'>{t("Refund Policy and Exchange")}</p>
                        <div className="text-base text-black font-normal md:pb-5 refund-policy" dangerouslySetInnerHTML={{ __html: returnPolicyData?.returnPolicy }} />
                    </div>


                {/* )} */}
            </div>
        </section>
    );
}

export default RefundPolicy;
