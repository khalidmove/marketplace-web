import React from 'react'

function AboutUs() {
    return (
        // <section className="bg-white w-full flex flex-col justify-center items-center">
        //     <div className="max-w-7xl mx-auto w-full md:px-0 px-5 md:pt-10 pt-5">
        //         <p className='text-2xl text-black font-bold md:pb-5 pb-2'>About us</p>
        //     </div>
        // </section>

        <div className="bg-white w-full">
            <section className="bg-custom-lightGrayColor w-full  relative flex flex-col justify-center items-center">
                <div className="max-w-7xl mx-auto w-full md:px-0 px-5 md:pt-10 pt-5 md:pb-10 pb-5  group">

                    <div className="relative overflow-hidden">
                        <img className="md:h-[462px] h-96 w-full flex justify-end items-end rounded-[20px] object-cover " src='/backgroundImg-1a.png' />
                        <div className="flex justify-center items-end w-full h-[70px] rounded-[20px] rounded-t-[0px] absolute bottom-0 bg-[#00000050] group-hover:rounded-[20px] group-hover:rounded-t-[0px]   group-hover:h-[70px] group-hover:-transition group-hover:duration-1000">
                            <p className='md:text-[40px] text-2xl text-white font-normal md:pb-5 pb-5 md:pt-5'>About us</p>
                        </div>
                    </div>

                    <p className='text-black md:text-xl text-lg font-normal md:pt-10 pt-5'>Lorem ipsum dolor sit amet consectetur. Fringilla nunc risus pretium facilisis massa id.</p>
                    <p className='text-black md:text-xl text-lg font-normal pt-2'>Lorem ipsum dolor sit amet consectetur. Fringilla nunc risus pretium facilisis massa id.</p>
                    <p className='text-black md:text-xl text-lg font-normal pt-2'>Lorem ipsum dolor sit amet consectetur. Fringilla nunc risus pretium facilisis massa id.</p>

                    <div className='md:py-10 py-5'>
                        <div className="w-full mx-auto max-w-6xl grid md:grid-cols-11 grid-cols-6  md:pr-0 pr-5">
                            <div className="col-span-5 flex flex-col md:items-end items-start md:pb-10 pb-5 md:order-1 order-2">

                                <p className="text-black md:text-xl text-lg md:text-left text-left  font-normal my-4">
                                    Lorem ipsum dolor sit amet consectetur.
                                </p>
                                <p className="text-black md:text-xl text-lg md:text-right text-left  font-normal">
                                    Lorem ipsum dolor sit amet consectetur.
                                </p>
                            </div>
                            <div className="flex flex-col items-center  md:order-2 order-1">
                                <div className="md:h-10 h-5 md:w-10 w-5 bg-black rounded-full"></div>

                                <p className="border-dashed border-2  border-black md:h-[160px] h-[280px]"></p>
                            </div>
                            <div className="col-span-5 md:order-3 md:block hidden"></div>
                        </div>

                        <div className="w-full mx-auto max-w-6xl grid md:grid-cols-11 grid-cols-6  md:pr-0 pr-5">
                            <div className="col-span-5 md:order-1 md:block hidden"></div>
                            <div className="flex flex-col items-center  md:order-2 order-1">
                                <div className="md:h-10 h-5 md:w-10 w-5 bg-black rounded-full"></div>

                                <p className="border-dashed border-2  border-black md:h-[160px] h-[280px]"></p>
                            </div>
                            <div className="col-span-5 flex flex-col items-start md:pb-10 pb-5 md:order-3 order-2">
                                <p className="text-black md:text-xl text-lg text-left font-normal my-4">
                                    Lorem ipsum dolor sit amet consectetur.
                                </p>
                                <p className="text-black md:text-xl text-lg text-left font-normal">
                                    Lorem ipsum dolor sit amet consectetur.
                                </p>
                            </div>
                        </div>

                        <div className="w-full mx-auto max-w-6xl grid md:grid-cols-11 grid-cols-6  md:pr-0 pr-5">
                            <div className="col-span-5 flex flex-col md:items-end items-start md:pb-10 pb-5 md:order-1 order-2">

                                <p className="text-black md:text-xl text-lg md:text-left text-left  font-normal my-4">
                                    Lorem ipsum dolor sit amet consectetur.
                                </p>
                                <p className="text-black md:text-xl text-lg md:text-right text-left  font-normal">
                                    Lorem ipsum dolor sit amet consectetur.
                                </p>
                            </div>
                            <div className="flex flex-col items-center  md:order-2 order-1">
                                <div className="md:h-10 h-5 md:w-10 w-5 bg-black rounded-full"></div>
                            </div>
                            <div className="col-span-5 md:order-3 md:block hidden"></div>
                        </div>


                    </div>

                    <p className='text-black md:text-xl text-lg font-normal'>Reach out today to bring your ideas to life!</p>
                    <p className='text-black md:text-xl text-lg font-normal pt-2'>Lorem ipsum dolor sit amet consectetur.</p>
                </div>
            </section>
        </div>
    )
}

export default AboutUs
