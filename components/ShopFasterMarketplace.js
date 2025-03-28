import React from 'react'

function ShopFasterMarketplace() {
    return (
        <div className="bg-[url('/backgroundImg-1a.png')] bg-cover bg-no-repeat w-full md:h-[750px]  md:p-0 p-5">
            <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-5 max-w-7xl  mx-auto h-full px-1 md:px-6 2xl:px-0">
                <div className="flex flex-col justify-center items-start">
                    <p className="md:text-[55px] text-2xl font-bold text-custom-purple md:leading-[60px]">Shop Faster With Marketplace App</p>
                    <p className="text-custom-purple font-medium text-xl pt-5 md:w-full w-[250px]">Available on both IOS & Android</p>
                    <div className="flex md:flex-row flex-col justify-start items-center gap-5 md:pt-10 pt-5">
                        <img className="md:h-[63px] h-[50px] md:w-[219px] w-full object-contain" src="/appstore_button_@x2.png" />
                        <img className="md:h-[63px] h-[50px] md:w-[219px] w-full object-contain " src="/googleplay_button@x2.png" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopFasterMarketplace
