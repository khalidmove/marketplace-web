import React from 'react'

function AboutUs() {
    return (

        <div className="bg-white w-full">
            <section className="bg-custom-lightGrayColor w-full  relative flex flex-col justify-center items-center">
                <div className="max-w-6xl mx-auto w-full md:px-0 px-5 md:pt-10 pt-5 md:pb-10 pb-5  group">

                    <div className="relative overflow-hidden">
                        <img className="md:h-[462px] h-96 w-full flex justify-end items-end rounded-[20px] object-cover " src='/backgroundImg-1a.png' />
                        <div className="flex justify-center items-end w-full h-[70px] rounded-[20px] rounded-t-[0px] absolute bottom-0 bg-[#00000050] group-hover:rounded-[20px] group-hover:rounded-t-[0px]   group-hover:h-[70px] group-hover:-transition group-hover:duration-1000">
                            <p className='md:text-[40px] text-2xl text-white font-normal md:pb-5 pb-5 md:pt-5'>About us</p>
                        </div>
                    </div>
                    <div className='max-w-[100%]'>
                        <p className='text-black md:text-xl text-lg font-normal md:pt-10 pt-5'>ResazOnline, at this moment, is a wholesaler focused on customers and driven by technology, designed to aid individuals in reducing expenses and improving their quality of life.</p>

                        <p className='text-black md:text-xl text-lg font-normal pt-2 mt-3'> Since our inception, we have embraced a multitude of shoppers from around the world. Consumers everywhere have .</p>

                        <p className='text-black md:text-xl text-lg font-normal pt-2 mt-3'>
                            <span className='font-bold'>Similar desires: </span> low prices, a vast selection of quality goods and services, a pleasant and straightforward shopping journey, and the confidence of engaging with a trustworthy source. We aim to deliver what our clients and members seek, in their preferred manner and timing. While our approaches to delivering these experiences are rapidly changing, our dedication to improving the experiences of both our customers and staff remains steadfast. </p>

                        <p className='text-black md:text-xl text-lg font-normal pt-2 mt-3'>
                            We live by our values and provide our team members with opportunities to develop, thrive, and gain a sense of community. Our focus is on fostering delightful experiences, operating efficiently, and paving the way for a brighter future through creativity and innovation.
                        </p>
                        <p className='text-black md:text-xl text-lg font-normal pt-2 mt-3'>
                        We meet our customers’ and members’ needs by providing the products they want, at their convenience, thus allowing them to save precious time. Our commitment to maintaining Everyday Low Prices is unwavering.

                        </p>
                        <p className='text-black md:text-xl text-lg font-normal pt-2 mt-3'>
                        We assist individuals in enhancing their health and financial well-being while also supporting local communities and our environment.

                        </p>

                        <p className='text-black md:text-xl text-lg font-normal pt-2 mt-3'>
                        In a world that is constantly changing, we recognize the necessity of evolving while staying true to our foundational principles. 
                        </p>
                        <p className='text-black md:text-xl text-lg font-normal '>
                        We do this by growing and innovating together with our associates and clients in ways that align with our lasting values. This approach allows us to uplift communities and enrich our surroundings. We introduce convenience to the globe, encouraging sustainable growth for all and spearheading advancements in our markets, while making a positive impact in the communities we serve.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutUs
