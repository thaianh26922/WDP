import React, { useEffect, useState } from 'react';
import DashboardCustomer from '../Layouts/DashboardCustomer';
import HeaderV2 from '../Util/Header/HeaderV2';
import imgTemplateCompany from '../../Image/image-brand.png';
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAllCompanyFollowed } from '../../Store/companySlice';
import PostItemSkeleton from '../Util/ViewUtil/PostItemSkeleton';
import UsePagination from '../Util/Pagination/UsePagination';
const itemsPerPage = 9;
function MyFollowCompany(props) {
    const [itemOffset, setItemOffset] = useState(0);
    const [filterCompany, setFilterCompany] = useState([]);
    const companyList = useSelector((state) => state.companies.companyArrFollow);
    const statusCompany = useSelector((state) => state.companies.statusCAF);
    const getUser = useSelector((state) => state.users.currentUser);
    const location = useLocation();
    const dispatch = useDispatch();
    const nav = useNavigate();


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const pageFromUrl = urlParams.get('page');

        if (pageFromUrl) {
            setItemOffset(itemsPerPage * (Number(pageFromUrl) - 1));
        }
        if (getUser?._id) {
            dispatch(getAllCompanyFollowed(getUser._id));
        }
    }, [dispatch, getUser?._id,])


    useEffect(() => {
        // console.log('useEffect 3');
        const filteredData = companyList.filter((pp, index) => pp);
        setFilterCompany(filteredData);
    }, [companyList])


    const handlePageChange = (newOffset) => {
        setItemOffset(newOffset);

        const urlParams = new URLSearchParams(location.search);
        urlParams.set('page', (newOffset / itemsPerPage) + 1);
        const pageQuery = urlParams.toString();
        nav(`/cong-ty-dang-theo-doi?${pageQuery}`);
    };
    return (
        <DashboardCustomer>
            <HeaderV2 hrefType={'Công ty đang theo dõi'} />
            <main>
                <div className='info-pageCurrent pt-16 pl-32'>
                    <h2 className="text-[2em] font-bold leading-7 text-gray-700">Công ty đang theo dõi</h2>
                    <p class="mt-3 text-[0.8em] leading-6 text-gray-600 w-[27%]">Theo dõi các công ty để nhận được thông tin tuyển dụng mới nhất
                        từ họ.</p>
                </div>
                <section id='list-feature-jobs' className='grid lg:grid-cols-3  gap-9 sm:w-[509px] lg:w-[1166px] mx-auto mt-5 mb-5'>
                    {
                        statusCompany === 'failed' && filterCompany.length === 0 && (
                            <p className='text-gray-400 text-xl'>Không tìm thấy công ty nào.</p>
                        )
                    }
                    {
                        statusCompany === 'pending' && (
                            <PostItemSkeleton card={10} />
                        )
                    }
                    {
                        statusCompany === 'succeeded' && filterCompany &&
                            filterCompany.length !== 0 ?
                            (filterCompany?.map((co, index) => (
                                <div className='' key={index}>
                                    <div className=' bg-gray-200 shadow-md rounded p-3'>
                                        <div className='flex justify-start gap-x-4 items-center'>
                                            <img src={imgTemplateCompany} alt="template-brand.png" width={75} height={46} />
                                            <h2 className='text-[1em] text-blue-900 font-bold py-2'>{co.name}</h2>
                                        </div>
                                        <div className='py-4 border-b border-b-gray-300'>
                                            <h2 className='text-[1.1em] font-semibold text-black mb-2'>Giới thiệu:</h2>
                                            <ul className='list-disc pl-5 text-[#6C757D] '>
                                                <li className='my-2'>
                                                    <p className='flex gap-[0.6em]'><span className='flex-none'>Địa chỉ:</span>{co.location}</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className='pt-2 pb-1 flex justify-between items-center'>
                                            <Link to={`/cac-cong-ty-con/company_id=${co?._id}`} className='px-7 py-2 bg-orange-600 text-white rounded-md mr-4 font-thin' >Cơ hội việc làm</Link>
                                            <div>
                                                <FaHeart size={20} color='#cb1818' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )).slice(itemOffset, itemOffset + itemsPerPage))
                            :
                            <p className='text-gray-400 text-xl'>Không tìm thấy công ty nào.</p>

                    }


                    <div className='row-span-4 col-span-2'>
                        <UsePagination listItem={filterCompany} itemsPerPage={itemsPerPage} itemOffset={itemOffset} setItemOffset={handlePageChange} />
                    </div>

                </section>
            </main>
        </DashboardCustomer>
    );
}

export default MyFollowCompany;