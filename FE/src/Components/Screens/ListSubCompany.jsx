import React, { useEffect, useState } from 'react';
import Default from '../Layouts/Default';
import Breadcrumb from '../Util/StaticUtil/Breadcrumb';
import UsePagination from '../Util/Pagination/UsePagination';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import imgTemplateCompany from '../../Image/image-brand.png';
import { getAllCompany } from '../../Store/companySlice';
import PostItemSkeleton from '../Util/ViewUtil/PostItemSkeleton';
const itemsPerPage = 9;
function ListSubCompany(props) {
    const [itemOffset, setItemOffset] = useState(0);
    const [filterCompany, setFilterCompany] = useState([]);
    const companyList = useSelector((state) => state.companies.companyArr);
    const statusCompany = useSelector((state) => state.companies.status);
    const location = useLocation();
    const dispatch = useDispatch();
    const nav = useNavigate();
    

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const pageFromUrl = urlParams.get('page');

        if (pageFromUrl) {
            setItemOffset(itemsPerPage * (Number(pageFromUrl) - 1));
        }
        dispatch(getAllCompany());
    }, [dispatch])


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
        nav(`/cac-cong-ty-con?${pageQuery}`);
    };

    return (
        <Default>
            <section id='section-header' className=' bg-blue-900 text-gray-200 relative'>
                <div className='pl-[9em] py-16'>
                    <Breadcrumb text1={'Trang chủ'} text2={'Các công ty con'} />
                    <h2 className='text-[2em] font-semibold leading-7 py-3'>Các công ty thành viên</h2>
                    <p className='text-[0.8em] font-thin'>Tại Nodejs, chúng tôi không chỉ cung cấp công việc, chúng tôi tạo ra cơ hội nghề nghiệp</p>
                </div>
            </section>
            <section id='list-feature-jobs' className='grid lg:grid-cols-3 gap-9 sm:w-[1166px] lg:w-[1357px] mx-auto mt-5 mb-5'>
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
                            <div className='flex items-stretch' key={index}>
                                <div className='shadow-md rounded p-3'>
                                    <div className=''>
                                        <img src={imgTemplateCompany} alt="template-brand.png" height={120} className='w-full' />
                                        <p className='text-[1em] text-blue-900 font-semibold py-2 '>{co.name} </p>
                                    </div>
                                    <div className='text-gray-700 text-sm py-2 text-ellipsis'>
                                        {co.bio}
                                    </div>
                                    <div className='pt-2 pb-1 flex justify-start items-center'>
                                    <Link to={`/cac-cong-ty-con/company_id=${co?._id}`}
                                         className='px-4 py-2 bg-gradient-to-r from-purple-950 to-purple-900 text-white rounded-md mr-1 font-thin'><span className='text-sm'>Tìm hiểu thêm</span></Link>
                                    </div>
                                </div>
                            </div>
                        )).slice(itemOffset, itemOffset + itemsPerPage))
                        :
                        <p className='text-gray-400 text-xl'>Không tìm thấy công ty nào.</p>

                }

                <div className='row-span-4 col-span-3'>
                    <UsePagination listItem={filterCompany} itemsPerPage={itemsPerPage} itemOffset={itemOffset} setItemOffset={handlePageChange} />
                </div>
            </section>
        </Default >
    );
}

export default ListSubCompany;