import React, { useState } from 'react'
import Head from "next/head";

function Faq() {
    const [open, setOpen] = useState([]);

    const faqData = [
        {
            question: 'What is Resaz and what does it do?',
            answer: [
                'Resaz is a leading online ordering, where all producers can have the chance to display their products with us worldwide.',
                'We connect our customers with their favorite products. It takes just a few taps from our platform to place an order from your favorite products.'
            ]
        },
        {
            question: 'What does Resaz do?',
            answer: [
                `We simply take your order from your favorite products list in an easy and quick automated process so you don't have to deal with all the hassle of ordering and we make sure that you receive your order on time, every time!`
            ]
        },
        {
            question: 'How can I place an order?',
            answer: [
                'It’s very simple! Go to the Resaz app, log in with your account, then place an order for your favorite products and we will take care of the rest!'
            ]
        },
        {
            question: 'How can I track my order?',
            answer: [
                `Right after your order has placed, you can check the latest location of it anytime in “my orders” section.`
            ]
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

    console.log(faqData)

    return (
        <div className="bg-white w-full">
            <section className="bg-white w-full  relative flex flex-col justify-center items-center">
                <div className="max-w-7xl mx-auto w-full md:px-0 px-5 md:pt-10 pt-5">
                    <p className='text-2xl text-black font-bold text-center md:pb-5 pb-5'>FAQ</p>
                    {/* {faqData.map((item, i) => (< div key={i} className={` md:px-10 px-5 md:pt-10 pt-5 pb-5 border-b border-white ${open.includes(i) ? 'bg-custom-lightPurple' : 'bg-custom-purple'}`} onClick={() => selected(i)}>
                        <div className='flex justify-between md:items-center items-start pb-3'>
                            <div className='flex justify-start md:items-center items-start'>
                                <p className={`md:text-xl text-lg font-normal ${open.includes(i) ? 'text-black' : 'text-white'}`}>{i + 1}</p>
                                <p className={`md:text-xl text-lg font-bold pl-5 md:leading-[35px] ${open.includes(i) ? 'text-black' : 'text-white'}`}>{item?.question}</p>
                            </div>
                            {open.includes(i) && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-3.png' />}
                            {!open.includes(i) && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-4.png' />}
                        </div>
                        {open.includes(i) && <p className={`md:text-lg text-base font-normal md:pl-[72px] ${open.includes(i) ? 'text-black' : 'text-white'}`}>{item?.answer}</p>}
                        {item?.answer?.map((ans, inx) => (open.includes(i) && <p key={inx} className={`md:text-lg text-base font-normal md:pl-[72px] pb-5 ${open.includes(i) ? 'text-black' : 'text-white'}`}>{ans}</p>))}
                    </div>))} */}

                    <div className={`md:px-10 px-5 md:pt-10 pt-5 pb-5 border-b border-white ${open.includes('1') ? 'bg-custom-lightPurple' : 'bg-custom-purple pb-10'}`} onClick={() => selected('1')}>
                        <div className='flex justify-between md:items-center items-start pb-3'>
                            <div className='flex justify-start md:items-center items-start'>
                                <p className={`md:text-xl text-lg font-normal ${open.includes('1') ? 'text-black' : 'text-white'}`}>1</p>
                                <p className={`md:text-xl text-lg font-bold pl-5 md:leading-[35px] ${open.includes('1') ? 'text-black' : 'text-white'}`}>What is Resaz and what does it do?</p>
                            </div>
                            {open.includes('1') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-3.png' />}
                            {!open.includes('1') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-4.png' />}
                        </div>
                        {open.includes('1') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 pb-2 ${open.includes('1') ? 'text-black' : 'text-white'}`}>Resaz is a leading online ordering, where all producers can have the chance to display their products with us worldwide.</p>}
                        {open.includes('1') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 ${open.includes('1') ? 'text-black' : 'text-white'}`}>We connect our customers with their favorite products. It takes just a few taps from our platform to place an order from your favorite products.</p>}
                    </div>

                    <div className={`md:px-10 px-5 md:pt-10 pt-5 pb-5 border-b border-white ${open.includes('2') ? 'bg-custom-lightPurple' : 'bg-custom-purple pb-10'}`} onClick={() => selected('2')}>
                        <div className='flex justify-between md:items-center items-start pb-3'>
                            <div className='flex justify-start md:items-center items-start'>
                                <p className={`md:text-xl text-lg font-normal ${open.includes('2') ? 'text-black' : 'text-white'}`}>2</p>
                                <p className={`md:text-xl text-lg font-bold pl-5 md:leading-[35px] ${open.includes('2') ? 'text-black' : 'text-white'}`}>What does Resaz do?</p>
                            </div>
                            {open.includes('2') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-3.png' />}
                            {!open.includes('2') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-4.png' />}
                        </div>
                        {open.includes('2') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 ${open.includes('2') ? 'text-black' : 'text-white'}`}>We simply take your order from your favorite products list in an easy and quick automated process so you don't have to deal with all the hassle of ordering and we make sure that you receive your order on time, every time!</p>}
                    </div>

                    <div className={`md:px-10 px-5 md:pt-10 pt-5 pb-5 border-b border-white ${open.includes('3') ? 'bg-custom-lightPurple' : 'bg-custom-purple pb-10'}`} onClick={() => selected('3')}>
                        <div className='flex justify-between md:items-center items-start pb-3'>
                            <div className='flex justify-start md:items-center items-start'>
                                <p className={`md:text-xl text-lg font-normal ${open.includes('3') ? 'text-black' : 'text-white'}`}>3</p>
                                <p className={`md:text-xl text-lg font-bold pl-5 md:leading-[35px] ${open.includes('3') ? 'text-black' : 'text-white'}`}>How can I place an order?</p>
                            </div>
                            {open.includes('3') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-3.png' />}
                            {!open.includes('3') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-4.png' />}
                        </div>
                        {open.includes('3') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 ${open.includes('3') ? 'text-black' : 'text-white'}`}>It’s very simple! Go to the Resaz app, log in with your account, then place an order for your favorite products and we will take care of the rest!</p>}
                    </div>

                    <div className={`md:px-10 px-5 md:pt-10 pt-5 pb-5 border-b border-white ${open.includes('4') ? 'bg-custom-lightPurple' : 'bg-custom-purple pb-10'}`} onClick={() => selected('4')}>
                        <div className='flex justify-between md:items-center items-start pb-3'>
                            <div className='flex justify-start md:items-center items-start'>
                                <p className={`md:text-xl text-lg font-normal ${open.includes('4') ? 'text-black' : 'text-white'}`}>4</p>
                                <p className={`md:text-xl text-lg font-bold pl-5 md:leading-[35px] ${open.includes('4') ? 'text-black' : 'text-white'}`}>How can I track my order?</p>
                            </div>
                            {open.includes('4') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-3.png' />}
                            {!open.includes('4') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-4.png' />}
                        </div>
                        {open.includes('4') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 ${open.includes('4') ? 'text-black' : 'text-white'}`}>Right after your order has placed, you can check the latest location of it anytime in “<span className='text-red-500'>my orders</span>” section.</p>}
                    </div>

                    <div className={`md:px-10 px-5 md:pt-10 pt-5 pb-5 border-b border-white ${open.includes('5') ? 'bg-custom-lightPurple' : 'bg-custom-purple pb-10'}`} onClick={() => selected('5')}>
                        <div className='flex justify-between md:items-center items-start pb-3'>
                            <div className='flex justify-start md:items-center items-start'>
                                <p className={`md:text-xl text-lg font-normal ${open.includes('5') ? 'text-black' : 'text-white'}`}>5</p>
                                <p className={`md:text-xl text-lg font-bold pl-5 md:leading-[35px] ${open.includes('5') ? 'text-black' : 'text-white'}`}>How can I edit/cancel my order?</p>
                            </div>
                            {open.includes('5') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-3.png' />}
                            {!open.includes('5') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-4.png' />}
                        </div>
                        {open.includes('5') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 pb-2 ${open.includes('5') ? 'text-black' : 'text-white'}`}>You can add/ remove/ change the items in your order through the App in “<span className='text-red-500'>my orders</span>” sections.</p>}
                        {open.includes('5') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 ${open.includes('5') ? 'text-black' : 'text-white'}`}>If the order has not been sent out yet, you have the cancellation option too.</p>}
                    </div>

                    <div className={`md:px-10 px-5 md:pt-10 pt-5 pb-5 border-b border-white ${open.includes('6') ? 'bg-custom-lightPurple' : 'bg-custom-purple pb-10'}`} onClick={() => selected('6')}>
                        <div className='flex justify-between md:items-center items-start pb-3'>
                            <div className='flex justify-start md:items-center items-start'>
                                <p className={`md:text-xl text-lg font-normal ${open.includes('6') ? 'text-black' : 'text-white'}`}>6</p>
                                <p className={`md:text-xl text-lg font-bold pl-5 md:leading-[35px] ${open.includes('6') ? 'text-black' : 'text-white'}`}>My order has arrived but it has some issues. What should I do?</p>
                            </div>
                            {open.includes('6') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-3.png' />}
                            {!open.includes('6') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-4.png' />}
                        </div>
                        {open.includes('6') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 ${open.includes('6') ? 'text-black' : 'text-white'}`}>If your order has arrived but it has some issues such as missing/wrong items/… You can contact us through “live chat” or email us on: <a href="mailto:help@resazonline.com" className='text-blue-400'>help@resazonline.com</a> so our customer service team can take care of it for you.</p>}
                    </div>

                    <div className={`md:px-10 px-5 md:pt-10 pt-5 pb-5 border-b border-white ${open.includes('7') ? 'bg-custom-lightPurple' : 'bg-custom-purple pb-10'}`} onClick={() => selected('7')}>
                        <div className='flex justify-between md:items-center items-start pb-3'>
                            <div className='flex justify-start md:items-center items-start'>
                                <p className={`md:text-xl text-lg font-normal ${open.includes('7') ? 'text-black' : 'text-white'}`}>7</p>
                                <p className={`md:text-xl text-lg font-bold pl-5 md:leading-[35px] ${open.includes('7') ? 'text-black' : 'text-white'}`}>How long does it take to receive my order?</p>
                            </div>
                            {open.includes('7') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-3.png' />}
                            {!open.includes('7') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-4.png' />}
                        </div>
                        {open.includes('7') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 ${open.includes('7') ? 'text-black' : 'text-white'}`}>We would love to deliver your order as soon as possible! Which usually depends on your location and the road traffic congestion and of course You can always track your order in “<span className='text-red-500'>my orders</span>” section</p>}
                    </div>

                    <div className={`md:px-10 px-5 md:pt-10 pt-5 pb-5 border-b border-white ${open.includes('8') ? 'bg-custom-lightPurple' : 'bg-custom-purple pb-10'}`} onClick={() => selected('8')}>
                        <div className='flex justify-between md:items-center items-start pb-3'>
                            <div className='flex justify-start md:items-center items-start'>
                                <p className={`md:text-xl text-lg font-normal ${open.includes('8') ? 'text-black' : 'text-white'}`}>8</p>
                                <p className={`md:text-xl text-lg font-bold pl-5 md:leading-[35px] ${open.includes('8') ? 'text-black' : 'text-white'}`}>Can I re-order a previous order?</p>
                            </div>
                            {open.includes('8') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-3.png' />}
                            {!open.includes('8') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-4.png' />}
                        </div>
                        {open.includes('8') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 ${open.includes('8') ? 'text-black' : 'text-white'}`}>Of course! you can simply go to the "<span className='text-red-500'>My Orders</span>" section and choose an order from your previous orders, and re-order it.</p>}
                    </div>

                    <div className={`md:px-10 px-5 md:pt-10 pt-5 pb-5 border-b border-white ${open.includes('9') ? 'bg-custom-lightPurple' : 'bg-custom-purple pb-10'}`} onClick={() => selected('9')}>
                        <div className='flex justify-between md:items-center items-start pb-3'>
                            <div className='flex justify-start md:items-center items-start'>
                                <p className={`md:text-xl text-lg font-normal ${open.includes('9') ? 'text-black' : 'text-white'}`}>9</p>
                                <p className={`md:text-xl text-lg font-bold pl-5 md:leading-[35px] ${open.includes('9') ? 'text-black' : 'text-white'}`}>What are the payment methods?</p>
                            </div>
                            {open.includes('9') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-3.png' />}
                            {!open.includes('9') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-4.png' />}
                        </div>
                        {open.includes('9') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 pb-2 ${open.includes('9') ? 'text-black' : 'text-white'}`}>We provide a variety of payment methods for your convenience which you can pick based on your preferences.</p>}
                        {open.includes('9') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 pb-2 ${open.includes('9') ? 'text-black' : 'text-white'}`}>including:</p>}
                        {open.includes('9') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 pb-2 ${open.includes('9') ? 'text-black' : 'text-white'}`}>Google Pay / Apple Pay/ SamsungPay</p>}
                        {open.includes('9') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 pb-2 ${open.includes('9') ? 'text-black' : 'text-white'}`}>Debit Card/Credit Card</p>}
                        {open.includes('9') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 pb-2 ${open.includes('9') ? 'text-black' : 'text-white'}`}>American Express</p>}
                        {open.includes('9') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 pb-2 ${open.includes('9') ? 'text-black' : 'text-white'}`}>MasterCard/ Visa Card</p>}
                        {open.includes('9') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 pb-2 ${open.includes('9') ? 'text-black' : 'text-white'}`}>Venmo/ Cash App</p>}
                        {open.includes('9') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 pb-2 ${open.includes('9') ? 'text-black' : 'text-white'}`}>Stripe/Payoneer/PayPal</p>}
                        {open.includes('9') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 ${open.includes('9') ? 'text-black' : 'text-white'}`}>AmazonPay/ AliPay/ and more…</p>}
                    </div>

                    <div className={`md:px-10 px-5 md:pt-10 pt-5 pb-5 border-b border-white ${open.includes('10') ? 'bg-custom-lightPurple' : 'bg-custom-purple pb-10'}`} onClick={() => selected('10')}>
                        <div className='flex justify-between md:items-center items-start pb-3'>
                            <div className='flex justify-start md:items-center items-start'>
                                <p className={`md:text-xl text-lg font-normal ${open.includes('10') ? 'text-black' : 'text-white'}`}>10</p>
                                <p className={`md:text-xl text-lg font-bold pl-5 md:leading-[35px] ${open.includes('10') ? 'text-black' : 'text-white'}`}>How much will it cost me to use Resaz?</p>
                            </div>
                            {open.includes('10') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-3.png' />}
                            {!open.includes('10') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-4.png' />}
                        </div>
                        {open.includes('10') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 ${open.includes('10') ? 'text-black' : 'text-white'}`}>Using Resaz App is 100% free!</p>}
                    </div>

                    <div className={`md:px-10 px-5 md:pt-10 pt-5 pb-5 border-b border-white ${open.includes('11') ? 'bg-custom-lightPurple' : 'bg-custom-purple pb-10'}`} onClick={() => selected('11')}>
                        <div className='flex justify-between md:items-center items-start pb-3'>
                            <div className='flex justify-start md:items-center items-start'>
                                <p className={`md:text-xl text-lg font-normal ${open.includes('11') ? 'text-black' : 'text-white'}`}>11</p>
                                <p className={`md:text-xl text-lg font-bold pl-5 md:leading-[35px] ${open.includes('11') ? 'text-black' : 'text-white'}`}>Do you have any special offers/ discounts?</p>
                            </div>
                            {open.includes('11') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-3.png' />}
                            {!open.includes('11') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-4.png' />}
                        </div>
                        {open.includes('11') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 ${open.includes('11') ? 'text-black' : 'text-white'}`}>For sure! You can find the latest discounts/ promotions/ coupons/ … in the “<span className='text-red-500'>Hot deals</span>” tab.</p>}
                    </div>

                    <div className={`md:px-10 px-5 md:pt-10 pt-5 pb-5 border-b border-white ${open.includes('12') ? 'bg-custom-lightPurple' : 'bg-custom-purple pb-10'}`} onClick={() => selected('12')}>
                        <div className='flex justify-between md:items-center items-start pb-3'>
                            <div className='flex justify-start md:items-center items-start'>
                                <p className={`md:text-xl text-lg font-normal ${open.includes('12') ? 'text-black' : 'text-white'}`}>12</p>
                                <p className={`md:text-xl text-lg font-bold pl-5 md:leading-[35px] ${open.includes('12') ? 'text-black' : 'text-white'}`}>My account is blocked, what should I do?</p>
                            </div>
                            {open.includes('12') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-3.png' />}
                            {!open.includes('12') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-4.png' />}
                        </div>
                        {open.includes('12') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 ${open.includes('12') ? 'text-black' : 'text-white'}`}>If you entered the wrong combination of email/password repeatedly up to 5 times, your account will be blocked temporarily. The system will automatically email you a verification link where you need to unblock your account. In this email, we will also ask you to choose a new password.</p>}
                    </div>

                    <div className={`md:px-10 px-5 md:pt-10 pt-5 pb-5 border-b border-white ${open.includes('13') ? 'bg-custom-lightPurple' : 'bg-custom-purple pb-10'}`} onClick={() => selected('13')}>
                        <div className='flex justify-between md:items-center items-start pb-3'>
                            <div className='flex justify-start md:items-center items-start'>
                                <p className={`md:text-xl text-lg font-normal ${open.includes('13') ? 'text-black' : 'text-white'}`}>13</p>
                                <p className={`md:text-xl text-lg font-bold pl-5 md:leading-[35px] ${open.includes('13') ? 'text-black' : 'text-white'}`}>How long does the online payment refund process take?</p>
                            </div>
                            {open.includes('13') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-3.png' />}
                            {!open.includes('13') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-4.png' />}
                        </div>
                        {open.includes('13') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 pb-2 ${open.includes('13') ? 'text-black' : 'text-white'}`}>The duration of the refund process varies depending on the payment method you used.</p>}
                        {open.includes('13') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 ${open.includes('13') ? 'text-black' : 'text-white'}`}>We try our best to shorten the payment process as much as possible.</p>}
                    </div>

                    <div className={`md:px-10 px-5 md:pt-10 pt-5 pb-5 border-b border-white ${open.includes('14') ? 'bg-custom-lightPurple' : 'bg-custom-purple pb-10'}`} onClick={() => selected('14')}>
                        <div className='flex justify-between md:items-center items-start pb-3'>
                            <div className='flex justify-start md:items-center items-start'>
                                <p className={`md:text-xl text-lg font-normal ${open.includes('14') ? 'text-black' : 'text-white'}`}>14</p>
                                <p className={`md:text-xl text-lg font-bold pl-5 md:leading-[35px] ${open.includes('14') ? 'text-black' : 'text-white'}`}>How can I make a review about my order?</p>
                            </div>
                            {open.includes('14') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-3.png' />}
                            {!open.includes('14') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-4.png' />}
                        </div>
                        {open.includes('14') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 ${open.includes('14') ? 'text-black' : 'text-white'}`}>You can rate or write a review about your order simply by going to '<span className='text-red-500'>My Orders</span>' tab on my account page and click on a particular order to rate/review.</p>}
                    </div>

                    <div className={`md:px-10 px-5 md:pt-10 pt-5 pb-5 border-b border-white ${open.includes('15') ? 'bg-custom-lightPurple' : 'bg-custom-purple pb-10'}`} onClick={() => selected('15')}>
                        <div className='flex justify-between md:items-center items-start pb-3'>
                            <div className='flex justify-start md:items-center items-start'>
                                <p className={`md:text-xl text-lg font-normal ${open.includes('15') ? 'text-black' : 'text-white'}`}>15</p>
                                <p className={`md:text-xl text-lg font-bold pl-5 md:leading-[35px] ${open.includes('15') ? 'text-black' : 'text-white'}`}>I need more help, what should I do?</p>
                            </div>
                            {open.includes('15') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-3.png' />}
                            {!open.includes('15') && <img className={`md:w-[48px] w-[20px] md:h-[48px] h-[20px] md:ml-0 ml-5`} src='/image-4.png' />}
                        </div>
                        {open.includes('15') && <p className={`md:text-lg text-base font-normal md:pl-[72px] md:pb-5 ${open.includes('15') ? 'text-black' : 'text-white'}`}>You can contact us 24/7 through “live chat” or email us on: “<a href="mailto:help@resazonline.com" className='text-blue-400'>help@resazonline.com</a>”</p>}
                    </div>

                </div>
            </section >
        </div >
    )
}

export default Faq
