import { Api, ApiFormData } from '@/services/service';
import React, { useRef, useState, useMemo, useContext } from 'react'
import { MdOutlineFileUpload } from "react-icons/md";
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { useRouter } from "next/router";
import { userContext } from './_app';
import Swal from 'sweetalert2';


function CreateStore(props) {
    const f = useRef(null);
    const f1 = useRef(null);
    const router = useRouter();
    const [createStoreData,  setCreateStoreData] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        country: "",
        address: "",
        city: "",
        kbis: "",
        identity: "",
        phone: "",
        email: ""
    });

    const options = useMemo(() => countryList().getData(), [])
    const [value, setValue] = useState('')
    const [user, setUser] = useContext(userContext);
    const changeHandler = value => {
        setValue(value)
    }
     
    console.log("user :: ", user);
    

    const submit = (e) => {
        e.preventDefault();
        // return
        props.loader(true);
        const data = {
            userid: user?._id,
            ...createStoreData
        };
        console.log("data ::", data);
        console.log(" user id ::", user?._id);
        
        
        Api("post", "createStore", data, router).then(
            (res) => {
                console.log("res================>", res);
                props.loader(false);

                if (res?.status) {
                    setCreateStoreData({
                        firstName: "",
                        lastName: "",
                        companyName: "",
                        country: "",
                        address: "",
                        city: "",
                        kbis: "",
                        identity: "",
                        phone: "",
                        email: ""
                    });
                    const updatedUser = {
                        ...user,
                        store: res.data.store,
                        type:"SELLER"
                    };
                    setUser(updatedUser);
                    localStorage.setItem('userDetail', JSON.stringify(updatedUser));
                    // props.toaster({ type: "success", message: res?.data?.message });
                    Swal.fire({
                        title: res?.data?.message,
                        showDenyButton: false,
                        showCancelButton: true,
                        confirmButtonText: "OK",
                        cancelButtonText: "Dashboard",
                        cancelButtonColor: '#FE3E00'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            router.replace("/");
                        } else {
                            router.replace("/");
                            
                        }

                    });
                } else {
                    console.log(res?.data?.message);
                    props.toaster({ type: "error", message: res?.data?.message });
                }
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
    };

    const handleImageChange = (event, type) => {
        const file = event.target.files[0];
        const data = new FormData()
        data.append('file', file)
        props.loader(true);
        ApiFormData("post", "/user/fileupload", data, router).then(
            (res) => {
                props.loader(false);
                console.log("res================>", res);
                if (res.status) {
                    setCreateStoreData({ ...createStoreData, [type]: res.data.file })
                    props.toaster({ type: "success", message: res.data.message });
                }
            },
            (err) => {
                props.loader(false);
                console.log(err);
                props.toaster({ type: "error", message: err?.message });
            }
        );
        const reader = new FileReader();
        
    };

    return (
       
            <div className="bg-white w-full">
            <section className="bg-white w-full flex flex-col justify-center items-center">
                <div className=" max-w-7xl mx-auto w-full md:px-0 px-5 md:pt-10 pt-5 md:pb-10 pb-5">

                    <form className='' onSubmit={submit}>
                        <div className='grid md:grid-cols-2 grid-cols-1 w-full gap-x-24'>

                            <div className='md:order-1 order-2'>
                                <p className='text-black font-semibold md:text-4xl text-2xl pb-5'>Create Store</p>

                                <div className='grid grid-cols-2 w-full gap-5'>
                                    <div className='w-full'>
                                        <p className='text-black font-normal  text-base'>First Name</p>
                                        <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none md:my-5 my-3" type="text" placeholder="First Name"
                                            required
                                            value={createStoreData.firstName}
                                            onChange={(text) => {
                                                setCreateStoreData({
                                                    ...createStoreData,
                                                    firstName: text.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className='w-full'>
                                        <p className='text-black font-normal  text-base'>Last Name</p>
                                        <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none md:my-5 my-3"
                                            type="text" placeholder="Last Name"
                                            required
                                            value={createStoreData.lastName}
                                            onChange={(text) => {
                                                setCreateStoreData({
                                                    ...createStoreData,
                                                    lastName: text.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className='w-full'>
                                    <p className='text-black font-normal  text-base'>Company Name (Optional)</p>
                                    <input
                                        className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none md:my-5 my-3"
                                        type="text" placeholder="Company Name (Optional)"
                                        // required
                                        value={createStoreData.companyName}
                                        onChange={(text) => {
                                            setCreateStoreData({
                                                ...createStoreData,
                                                companyName: text.target.value,
                                            });
                                        }}
                                    />
                                </div>

                                <div className='w-full'>
                                    <p className='text-black font-normal  text-base'>Country / Region</p>
                                    <Select className='md:min-h-[50px] min-h-[40px] md:my-5 my-3' options={options}
                                        value={createStoreData.country}
                                        onChange={(text) => {
                                            console.log(text)
                                            let c = { ...text }
                                            setCreateStoreData({
                                                ...createStoreData,
                                                country: text,
                                            });
                                        }} />
                                </div>
                            </div>

                            <div className='md:order-2 order-1 md:mb-0 mb-5'>
                                <img className='w-full md:h-[390px] object-contain' src='/store.png' />
                            </div>
                        </div>

                        <div className='grid md:grid-cols-2 grid-cols-1 w-full gap-x-24'>
                            <div className='w-full'>
                                <p className='text-black font-normal  text-base'>Street address</p>
                                <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none md:my-5 my-3"
                                    type="text" placeholder="Street address"
                                    required
                                    value={createStoreData.address}
                                    onChange={(text) => {
                                        setCreateStoreData({
                                            ...createStoreData,
                                            address: text.target.value,
                                        });
                                    }}
                                />
                            </div>

                            <div className='w-full'>
                                <p className='text-black font-normal  text-base'>Town / City</p>
                                <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none md:my-5 my-3"
                                    type="text" placeholder="Town / City"
                                    required
                                    value={createStoreData.city}
                                    onChange={(text) => {
                                        setCreateStoreData({
                                            ...createStoreData,
                                            city: text.target.value,
                                        });
                                    }}
                                />
                            </div>

                            <div className='w-full'>
                                <p className='text-black font-normal  text-base'>Upload Documents ( kbis )</p>
                                <div className='relative'>
                                    <div className='w-full md:h-[50px] h-[40px] bg-white border border-custom-newGray rounded-[10px]  md:my-5 my-3 flex px-5'>
                                        <input className="outline-none font-normal  text-base text-black md:w-[95%] w-[90%]"
                                            type="text" placeholder="Upload document"
                                            required
                                            value={createStoreData.kbis}
                                            onChange={(text) => {
                                                setCreateStoreData({
                                                    ...createStoreData,
                                                    kbis: text.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="absolute md:top-[13px] top-[8px] md:right-[10px] right-[10px]">
                                        <MdOutlineFileUpload className="text-black h-6 w-6"
                                            onClick={() => {
                                                f.current.click();
                                            }} />
                                        <input type="file"
                                            ref={f}
                                            className="hidden"
                                            onChange={(event) => { handleImageChange(event, 'kbis') }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='w-full'>
                                <p className='text-black font-normal  text-base'>Upload Documents ( Identity document )</p>
                                <div className='relative'>
                                    <div className='w-full md:h-[50px] h-[40px] bg-white border border-custom-newGray rounded-[10px]  md:my-5 my-3 flex px-5'>
                                        <input className="outline-none font-normal  text-base text-black md:w-[95%] w-[90%]"
                                            type="text" placeholder="Upload document"
                                            required
                                            value={createStoreData.identity}
                                            onChange={(text) => {
                                                setCreateStoreData({
                                                    ...createStoreData,
                                                    identity: text.target.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="absolute md:top-[13px] top-[8px] md:right-[10px] right-[10px]">
                                        <MdOutlineFileUpload className="text-black h-6 w-6"
                                            onClick={() => {
                                                f1.current.click();
                                            }} />
                                        <input type="file"
                                            ref={f1}
                                            className="hidden"
                                            onChange={(event) => { handleImageChange(event, 'identity') }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='w-full'>
                                <p className='text-black font-normal  text-base'>Phone</p>
                                <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none md:my-5 my-3"
                                    type="number" placeholder="Phone"
                                    required
                                    value={createStoreData.phone}
                                    onChange={(text) => {
                                        setCreateStoreData({
                                            ...createStoreData,
                                            phone: text.target.value,
                                        });
                                    }}
                                />
                            </div>

                            <div className='w-full'>
                                <p className='text-black font-normal  text-base'>Email address</p>
                                <input className="bg-white w-full md:h-[50px] h-[40px] px-5 rounded-[10px] border border-custom-newGray font-normal  text-base text-black outline-none md:my-5 my-3"
                                    type="text" placeholder="Email address"
                                    required
                                    value={createStoreData.email}
                                    onChange={(text) => {
                                        setCreateStoreData({
                                            ...createStoreData,
                                            email: text.target.value,
                                        });
                                    }}
                                />
                            </div>

                        </div>

                        <div className='flex justify-center items-center md:mt-5 mt-2'>
                            <button className='bg-custom-purple w-[237px] md:h-[50px] h-[40px] rounded-[5px] text-white font-normal text-base' type="submit">Submit</button>
                        </div>
                    </form>

                </div>
            </section>
        </div >
        

    )
}

export default CreateStore
