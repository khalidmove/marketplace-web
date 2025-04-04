import React, { useState, useEffect } from 'react';
import { Api } from '@/services/service';
import { useRouter } from "next/router";

function TermsAndConditions(props) {
    const [termsAndConditions, setTermsAndConditions] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const getTermsAndConditions = () => {
        props.loader(true);
        Api("get", "/content", router).then(
            (res) => {
                props.loader(false);
                console.log("API Response =>", res.data);

                if (res?.data?.length > 0 && res?.data[0]?.termsAndConditions) {
                    setTermsAndConditions(res?.data[0]?.termsAndConditions);
                    setLoading(false);
                } else {
                    props.toaster({ type: "error", message: "Terms and Conditions not found" });
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
        getTermsAndConditions();
    }, []);

    return (
        <section className="bg-white w-full flex flex-col justify-center items-center">
            <div className="max-w-7xl mx-auto w-full md:px-6 px-5 2xl:px-0 md:pt-10 pt-5 md:pb-10 pb-5 md:min-h-screen">
                {/* {loading ? (
                    <p className="text-base text-black font-normal md:pb-5">Loading...</p>
                ) : ( */}
                    <div>
                        <p className='text-2xl text-black font-bold md:pb-5 pb-2'>Terms and conditions</p>
                        <div className="text-base text-black font-normal md:pb-5" dangerouslySetInnerHTML={{ __html: termsAndConditions }} />
                    </div>
                {/* )} */}
            </div>
        </section>
    );
}

export default TermsAndConditions;

