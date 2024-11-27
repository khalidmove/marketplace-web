import React from 'react'
import { IoIosAdd } from "react-icons/io";

function SimilarProducts() {
    return (
        <div className='grid grid-cols-5 w-full gap-5'>
            <div className='bg-white w-full border border-black rounded-[12px] boxShadow p-[10px] relative'>
                <img className='w-[60px] h-[60px] object-contain absolute -top-[30px] -right-[30px]' src='/starImg.png' />
                <p className='text-white text-[8px] font-medium absolute -top-[11px] -right-[6px]'>5%<br />off</p>
                <div className='flex justify-center items-center'>
                    <img className='h-[107px] w-[178px]' src='/similarProductsImg.png' />
                </div>
                <p className='text-black font-semibold text-sm w-[138px] pt-5'>Yadu -  Natural Sugar (Double...</p>
                <p className='text-custom-newGray font-normal text-xs pt-2 pb-2'>1 kg</p>
                <div className='flex justify-between items-center'>
                    <div>
                        <del className='text-black font-normal text-xs'>₹60</del>
                        <p className='text-custom-newPurpleColor font-semibold text-sm pt-2'>₹57</p>
                    </div>
                    <div className='bg-white w-[32px] h-[32px] rounded-[8px] boxShadow flex justify-center items-center'>
                        <IoIosAdd className='w-[50px] h-[50px] text-custom-purple' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SimilarProducts
