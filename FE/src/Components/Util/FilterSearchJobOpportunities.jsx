import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import { IoFilterCircleOutline } from "react-icons/io5";
import { RiMapPinUserLine } from "react-icons/ri";
import { WiTime12 } from "react-icons/wi";
import { MdOutlinePlace } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../Store/jobCategorySlice';
import Skeleton from 'react-loading-skeleton';

function FilterSearchJobOpportunities({checkradio, setCheckedRadio, itemOffset}) {
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const nav = useNavigate();
    const categoryJob = useSelector((state) => state.jobCategory.categoryArr);
    const statusCate = useSelector((state) => state.jobCategory.status);
    const dispatch = useDispatch();


    // console.log(location);
    // console.log('line 9:', searchTerm);


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        // const categoriesFromUrl = urlParams.get('categories');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
        // if(categoriesFromUrl){
        //     console.log('omg');
        //     console.log('line 34: ',categoriesFromUrl);
        // }
    }, [location.search])

    const handleCheckboxChange = (event) => {
        const { value, id } = event.target;
        const updatedRadio = {value, id};
        setCheckedRadio(updatedRadio);
        let textSearch = updatedRadio.value;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('categories', textSearch.toLowerCase().replace(/\s\/\s/g, '_').replace(/\s/g, '-'));
        const categoryQuery = urlParams.toString();
        nav(`/co-hoi-nghe-nghiep?${categoryQuery}`);
    };

    // console.log(checkradio);

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        console.log(searchQuery);
        nav(`/co-hoi-nghe-nghiep?${searchQuery}`);
    }

    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch])


    useEffect(() => {
        localStorage.setItem('checkradioLL',JSON.stringify(checkradio));
    },[checkradio]);


    if (statusCate !== 'succeeded') {
        return <div className='border-solid border-2 rounded p-3'>
            <Skeleton className='py-3' />
            <div>
                <div className='py-2'>
                    <Skeleton className='py-1' />
                </div>
                <div>
                    {
                        Array(10).fill(1).map((_, i) => (
                            <div className='flex justify-start items-center gap-2' key={i}>
                                <Skeleton className='w-3.5 my-4' />
                                <Skeleton className='w-[14em] my-2' />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    }

    return (
        <div className='groupFilter hidden bg-red-250 row-span-2 md:hidden lg:block'>
            <form onSubmit={handleSubmit}>
                <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <span className="flex select-none items-center pl-3 text-black sm:text-sm"><CiSearch /></span>
                        <input type="text" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-8"
                            placeholder="Tìm kiếm bài tuyển dụng" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>

                <div className='mt-3'>
                    <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-blue-900"><IoFilterCircleOutline size={20} className='inline-block' /> <span>Lĩnh vực</span></legend>
                        <div className="mt-6 space-y-3">

                            {
                                categoryJob.length !== 0 &&
                                categoryJob.map((category, index) => (
                                    <div className="relative flex gap-x-3" key={index}>
                                        <div className="flex h-6 items-center">
                                            <input id={category._id} name='category_name' value={category.name} type="radio" className="h-4 w-4 rounded border-gray-300"
                                                onChange={handleCheckboxChange}
                                                checked=
                                                {
                                                    checkradio.id === category._id ? true : false
                                                }
                                                />
                                        </div>
                                        <div className="text-sm leading-6">
                                            <label htmlFor={category._id} className="font-medium text-gray-900">{category.name}</label>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </fieldset>
                </div>
                <div className='mt-6'>
                    {/* <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-blue-900"><RiMapPinUserLine size={20} className='inline-block' /> <span>Vị trí tuyển dụng</span></legend>
                    <div className="mt-6 space-y-3">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input id="staffOperate" name="staffOperate" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="staffOperate" className="font-medium text-gray-900">Vị trí lãnh đạo</label>
                            </div>
                        </div>
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input id="realEstate" name="realEstate" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="candidates" className="font-medium text-gray-900">Cần có kinh nghiệm</label>
                            </div>
                        </div>
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input id="faas" name="faas" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="faas" className="font-medium text-gray-900">Người mới tốt nghiệp</label>
                            </div>
                        </div>
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input id="faas" name="faas" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="faas" className="font-medium text-gray-900">Tuyển thực tập sinh</label>
                            </div>
                        </div>
                    </div>
                </fieldset> */}
                </div>
                <div className='mt-6'>
                    {/* <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-blue-900"><WiTime12 size={20} className='inline-block' /> <span>Thời gian</span></legend>
                    <div className="mt-6 space-y-3">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input id="staffOperate" name="staffOperate" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="staffOperate" className="font-medium text-gray-900">Chọn tất cả</label>
                            </div>
                        </div>
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input id="realEstate" name="realEstate" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="candidates" className="font-medium text-gray-900">Toàn thời gian</label>
                            </div>
                        </div>
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input id="faas" name="faas" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="faas" className="font-medium text-gray-900">Bán thời gian</label>
                            </div>
                        </div>
                    </div>
                </fieldset> */}
                </div>
                <div className='mt-6'>
                    {/* <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-blue-900"><MdOutlinePlace size={20} className='inline-block' /> <span>Địa điểm</span></legend>
                    <div className="mt-6 space-y-3">
                        <div className="relative flex gap-x-3">
                            <select id="country" name="country" autocomplete="country-name" className="block w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                <option>United States</option>
                                <option>Canada</option>
                                <option>Mexico</option>
                            </select>
                        </div>
                    </div>
                </fieldset> */}
                </div>
            </form>
        </div>
    );
}

export default FilterSearchJobOpportunities;