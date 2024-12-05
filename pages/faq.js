import React, { useState } from 'react'
import Head from "next/head";

function Faq() {
    const [open, setOpen] = useState([]);

    const faqData = [
        {
            question: 'Alright, but what exactly do you do?',
            answer: 'As a creative agency we work with you to develop solutions to address your brand needs. That includes various aspects of brand planning and strategy, marketing and design.'
        },
        {
            question: 'Alright, but what exactly do you do?',
            answer: 'As a creative agency we work with you to develop solutions to address your brand needs. That includes various aspects of brand planning and strategy, marketing and design.'
        },
        {
            question: 'Alright, but what exactly do you do?',
            answer: 'As a creative agency we work with you to develop solutions to address your brand needs. That includes various aspects of brand planning and strategy, marketing and design.'
        },
        {
            question: 'Alright, but what exactly do you do?',
            answer: 'As a creative agency we work with you to develop solutions to address your brand needs. That includes various aspects of brand planning and strategy, marketing and design.'
        },
    ]

    const selected = (type) => {
        console.log(type)
        if (open.includes(type)) {
            const data = open.filter((f) => f !== type);
            setOpen(data);
            return;
        }
        open.push(type);
        console.log(open);
        setOpen([...open]);
    };

    return (
        <div className="bg-white w-full">
            <section className="bg-white w-full  relative flex flex-col justify-center items-center">
                <div className="max-w-7xl mx-auto w-full md:px-0 px-5 md:pt-10 pt-5">
                    <p className='text-2xl text-black font-bold text-center md:pb-5 pb-5'>FAQ</p>
                    {faqData.map((item, i) => (< div key={i} className={` md:p-10 p-5 border-b border-white ${open.includes(i) ? 'bg-custom-lightPurple' : 'bg-custom-purple'}`} onClick={() => selected(i)}>
                        <div className='flex justify-between md:items-center items-start pb-3'>
                            <div className='flex justify-start md:items-center items-start'>
                                <p className={`md:text-xl text-lg font-normal ${open.includes(i) ? 'text-black' : 'text-white'}`}>{i + 1}</p>
                                <p className={`md:text-xl text-lg font-bold pl-5 md:leading-[35px] ${open.includes(i) ? 'text-black' : 'text-white'}`}>{item?.question}</p>
                            </div>
                            {open.includes(i) && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-3.png' />}
                            {!open.includes(i) && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-4.png' />}
                        </div>
                        {open.includes(i) && <p className={`md:text-lg text-base font-normal md:pl-[72px] ${open.includes(i) ? 'text-black' : 'text-white'}`}>{item?.answer}</p>}
                    </div>))}

                </div>
            </section >
        </div >
    )
}

export default Faq
