import ShopFasterMarketplace from '@/components/ShopFasterMarketplace'
import React, { useContext, useState } from 'react'
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon,
} from "react-share";
import { RxCrossCircled } from 'react-icons/rx';
import { IoIosSend } from "react-icons/io";
import { userContext } from './_app';

function Referal() {
    const [viewPopup, setviewPopup] = useState(false)
    const [user, setUser] = useContext(userContext);

    // const shareUrl = "https://yourwebsite.com";
    const shareUrl = "https://main.d29wph1akkhrww.amplifyapp.com/";
    // const title = "Check out this amazing content!";
    const title = `${user?.referal}`;
    const hashtags = ["ReactShare", "SocialSharing"];

    return (
        <div className='bg-white w-full'>

            <section className='bg-white w-full md:py-10 py-5 md:px-0 px-5'>
                <div className="max-w-7xl  mx-auto w-full flex justify-center items-center">
                    <div className='bg-[#5C108380] md:w-[680px] w-[320px] border border-custom-newPurple rounded-[15px] md:p-10 p-5 flex flex-col justify-center items-center'>
                        <img className='md:w-[300px] w-[100px] md:h-[300px] h-[100px]' src='/image-2.png' />
                        <p className='text-black md:text-[32px] text-xl font-semibold pt-5 text-center'>Refer a friend to earn points.</p>
                        <button className='w-[230px] md:h-[50px] h-[40px] border-[2px] border-custom-red rounded-[12px] md:text-2xl text-base font-medium text-custom-red mt-2'>{user?.referalpoints} Points</button>
                        <p className='text-black md:text-xl text-base font-medium w-[237px] text-center py-5'>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
                        <button className='md:w-[426px] w-[230px] md:h-[50px] h-[40px] border border-custom-red rounded-[12px] md:text-xl text-base font-medium text-custom-red'>{user?.referal}</button>
                        <button className='bg-custom-red md:h-[50px] h-[40px] md:w-[426px] w-[230px] rounded-[12px] text-white md:text-xl text-base font-semibold mt-5'
                            onClick={() => {
                                setviewPopup(true)
                            }}>Send invite</button>
                    </div>
                </div>
            </section>

            {viewPopup && (
                <div className="fixed top-0 left-0 w-screen h-screen bg-black/30 flex justify-center items-center z-50">
                    <div className="relative w-[300px] md:w-[360px] h-auto  bg-white rounded-[15px] m-auto">
                        <div className="absolute top-2 right-2 p-1 rounded-full  text-black w-8 h-8 cursor-pointer"
                            onClick={() => setviewPopup(!viewPopup)}>
                            <RxCrossCircled className="h-full w-full font-semibold " />
                        </div>

                        <div className='text-center p-5'>
                            {/* <h2>Share this page!</h2> */}
                            <div className='flex justify-center items-center py-5'>
                                <IoIosSend className='text-custom-purple h-16 w-16' />
                            </div>
                            <div className='flex justify-center gap-[10px]'>
                                <FacebookShareButton url={shareUrl} quote={title} onClick={() => setviewPopup(!viewPopup)}>
                                    <FacebookIcon size={40} round />
                                </FacebookShareButton>

                                <TwitterShareButton url={shareUrl} title={title} hashtags={hashtags} onClick={() => setviewPopup(!viewPopup)}>
                                    <TwitterIcon size={40} round />
                                </TwitterShareButton>

                                <LinkedinShareButton url={shareUrl} title={title} source="YourWebsite" onClick={() => setviewPopup(!viewPopup)}>
                                    <LinkedinIcon size={40} round />
                                </LinkedinShareButton>

                                <WhatsappShareButton url={shareUrl} title={title} onClick={() => setviewPopup(!viewPopup)}>
                                    <WhatsappIcon size={40} round />
                                </WhatsappShareButton>
                            </div>
                        </div>

                        {/* <div className='px-5 '>
                            <p className='text-center mt-2 font-semibold text-xl text-custom-black'>Query</p>
                            <p className="text-base mt-3 pb-3 text-center font-bold text-custom-newGray">
                                {popupData.description}
                            </p>
                        </div> */}
                    </div>
                </div>
            )}

            <section className="w-full md:pt-10 pt-5">
                <ShopFasterMarketplace />
            </section>



        </div>
    )
}

export default Referal
