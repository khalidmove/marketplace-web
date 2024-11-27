import ShopFasterMarketplace from '@/components/ShopFasterMarketplace'
import React from 'react'

function Referal() {
    return (
        <div className='bg-white w-full'>

            <section className='bg-white w-full md:py-10 py-5 md:px-0 px-5'>
                <div className="max-w-7xl  mx-auto w-full flex justify-center items-center">
                    <div className='bg-[#5C108380] md:w-[680px] w-[320px] border border-custom-newPurple rounded-[15px] md:p-10 p-5 flex flex-col justify-center items-center'>
                        <img className='md:w-[300px] w-[100px] md:h-[300px] h-[100px]' src='/image-2.png' />
                        <p className='text-black md:text-[32px] text-xl font-semibold pt-5 text-center'>Refer a friend to earn points.</p>
                        <button className='w-[230px] md:h-[50px] h-[40px] border-[2px] border-custom-red rounded-[12px] md:text-2xl text-base font-medium text-custom-red mt-2'>GHAVRU3463463</button>
                        <p className='text-black md:text-xl text-base font-medium w-[237px] text-center py-5'>Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum</p>
                        <button className='bg-custom-red md:h-[50px] h-[40px] md:w-[426px] w-[230px] rounded-[12px] text-white md:text-xl text-base font-semibold'>Send invite</button>
                        <button className='md:w-[426px] w-[230px] md:h-[50px] h-[40px] border border-custom-red rounded-[12px] md:text-xl text-base font-medium text-custom-red mt-5'>GHAVRU3463463</button>
                    </div>
                </div>
            </section>

            <section className="w-full md:pt-10 pt-5">
                <ShopFasterMarketplace />
            </section>

        </div>
    )
}

export default Referal
