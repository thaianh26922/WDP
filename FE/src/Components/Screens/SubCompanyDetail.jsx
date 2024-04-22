import React, { useEffect, useRef, useState } from 'react';
import Default from '../Layouts/Default';
import Breadcrumb from '../Util/StaticUtil/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { followCompany, getACompany, unfollowCompany } from '../../Store/companySlice';
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Company1 from '../../Image/company1.png'
import Company2 from '../../Image/company2.png'
import Company3 from '../../Image/company3.png'
import Company4 from '../../Image/company4.png'
import ProvinceDropdown from '../Util/Modal/ProvinceDropdown';
import { getCurrentUser } from '../../Store/userSlice';
import { followPost, getAllPostByIdCompany, unfollowPost } from '../../Store/jobPostSlice';
import UsePagination from '../Util/Pagination/UsePagination';
const itemsPerPage = 4;
function SubCompanyDetail(props) {
    const [provinceChoose, setProvinceChoose] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const formRef = useRef(null);
    const companydetail = useSelector((state) => state.companies.companyDetail);
    const postJob = useSelector((state) => state.jobPost.postArrForCompany);
    const getUser = useSelector((state) => state.users.currentUser);
    const dispatch = useDispatch();
    const param = useParams();
    const nav = useNavigate();


    useEffect(() => {
        dispatch(getACompany(param['ten-cong-ty-con'].split('=')[1]));
        dispatch(getAllPostByIdCompany(param['ten-cong-ty-con'].split('=')[1]));
    }, [dispatch])

    useEffect(() => {
        const filteredData = postJob.map((pp, index) => {
            return pp;
        });
        setFilteredPosts(filteredData);
    }, [postJob])

    const handleHeartForCompany = async () => {
        console.log(companydetail);
        if (!getUser) {
            nav('/dang-nhap');
        }
        else {
            console.log('line 125: ', getUser);
            let statusCompany = getUser.followCompany.find(p => companydetail._id === p);
            let fCompany = {
                _id: companydetail._id
            }
            let payload = {
                id: getUser._id,
                followCompany: fCompany
            };
            if (statusCompany) {
                dispatch(unfollowCompany(payload));
            } else {
                dispatch(followCompany(payload));
            }
            dispatch(getCurrentUser());
        }

    }

    const handleHeartForPost = async (postId) => {
        console.log(postId);
        if (!getUser) {
            nav('/dang-nhap');
        }
        else {
            console.log('line 125: ', getUser);
            let statusPost = getUser.savedPost.find(p => postId === p);
            let savedPost = {
                _id: postId
            }
            let payload = {
                id: getUser._id,
                savedPost: savedPost
            };
            if (statusPost) {
                dispatch(unfollowPost(payload));
            } else {
                dispatch(followPost(payload));
            }
            dispatch(getCurrentUser());
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = formRef.current;

        const txtSearch = form.elements['validationCustom01'].value;

        const filteredData = postJob.filter((pp, index) => {
            const titleMatch = !txtSearch || pp.title.toLowerCase().includes(txtSearch.toLowerCase());
            const locationMatch = !provinceChoose || pp.location === provinceChoose;
            return titleMatch && locationMatch;
        });
        setFilteredPosts(filteredData);
    }

    const handlePageChange = (newOffset) => {
        setItemOffset(newOffset);
    };


    return (
        <Default>
            <section id='section-header' className=' bg-blue-900 text-gray-200 relative'>
                <div className='pl-[9em] py-16'>
                    <Breadcrumb text1={'Trang chủ'} text2={'Các công ty con'} text3={companydetail.name} />
                    <h2 className='text-[1.5em] font-semibold leading-7 py-3'>{companydetail.name}</h2>
                    <p className='text-[0.8em] font-thin'>Tại Nodejs, chúng tôi không chỉ cung cấp công việc, chúng tôi tạo ra cơ hội nghề nghiệp</p>
                </div>
            </section>

            <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
                <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
                    <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                        <div className="px-4 py-10 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] ">
                            <img src={Company1} alt="Product" className="w-full rounded object-cover" />
                        </div>
                        <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
                            <div className="rounded-xl p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
                                <img src={Company1} alt="Product2" className="w-24 cursor-pointer" />
                            </div>
                            <div className="rounded-xl p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
                                <img src={Company2} alt="Product2" className="w-24 cursor-pointer" />
                            </div>
                            <div className="rounded-xl p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
                                <img src={Company3} alt="Product2" className="w-24 cursor-pointer" />
                            </div>
                            <div className="rounded-xl p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
                                <img src={Company4} alt="Product2" className="w-24 cursor-pointer" />
                            </div>
                        </div>

                    </div>
                    <div className="lg:col-span-2 relative">
                        <h2 className="text-2xl font-semibold text-[#1F2F65]">Giới thiệu</h2>
                        <button type="button" className="absolute top-2 right-4" onClick={() => handleHeartForCompany()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill={getUser?.followCompany?.find(p => companydetail._id === p) ? '#cb2929' : '#ccc'} className="mr-1 hover:fill-[#333]" viewBox="0 0 64 64">
                                <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" data-original="#000000"></path>
                            </svg>
                        </button>
                        <div className="flex flex-wrap gap-4 mt-6">
                            {companydetail.bio}
                        </div>
                        <div className='grid grid-cols-1 gap-y-4 p-4 mx-auto mt-10'>
                            <div className='flex items-center'>
                                <div className='icon-phone p-2.5 mr-3 bg-[#1F2F65] rounded-full text-white'>
                                    <FiPhoneCall size={15} />
                                </div>
                                <div className='content_icon text-left text-[0.8em]'>
                                    <p className=''>Điện thoại</p>
                                    <p className='text-[1em]  intro-content'>{companydetail.phone}</p>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <div className='icon-email p-2.5 mr-3 bg-[#1F2F65] rounded-full text-white'>
                                    <MdOutlineEmail size={15} />
                                </div>
                                <div className='content_icon text-left text-[0.8em]'>
                                    <p className=''>Email</p>
                                    <p className='text-[1em]  intro-content'>{companydetail.email}</p>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <div className='icon-phone p-2.5 mr-3 bg-[#1F2F65] rounded-full text-white'>
                                    <CiLocationOn size={15} />
                                </div>
                                <div className='content_icon text-left text-[0.8em]'>
                                    <p className=''>Địa chỉ</p>
                                    <p className='text-[1em]  intro-content'>{companydetail.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-10">
                    <div className='mt-10 lg:col-span-3 w-full'>
                        <h2 className=' text-white text-left font-semibold bg-gradient-to-r from-[#1F2F65] to-[#5569ac] p-3 rounded-t-lg'>Tuyển dụng</h2>

                        <div className='p-4 border border-gray-400'>
                            <Form onSubmit={handleSubmit} ref={formRef}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                                        <div
                                            className="flex rounded-md shadow-sm  mt-2 border border-gray-400 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <span className="flex select-none items-center pl-3 text-black sm:text-sm"><CiSearch /></span>
                                            <Form.Control
                                                type="text"
                                                placeholder="Tên công việc"
                                                defaultValue=""
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-8"
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group as={Col} md="4" className='pl-0'>
                                        <div className="dropdown-content mt-2 relative">
                                            <ProvinceDropdown searchTerm={provinceChoose} setSearchTerm={setProvinceChoose} />
                                        </div>
                                    </Form.Group>
                                    <Button type="submit" className='bg-[#1F2F65] leading-8 mt-2 w-auto'><CiSearch size={20} className='inline-block' />{' '}Tìm kiếm</Button>
                                </Row>
                            </Form>

                            <div className='pt-3 pb-4 text-wrap rounded-b-lg'>
                                {
                                    filteredPosts &&
                                        filteredPosts.length !== 0 ?
                                        (
                                            filteredPosts
                                                ?.map((post, index) => (
                                                    <div key={index}
                                                        className="flex flex-col flex-1 rounded-lg p-2 my-4 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700  md:flex-row cursor-pointer transition ease-in-out delay-300 hover:border border-[#1F2F65]">
                                                        <img
                                                            className="h-44 w-full rounded-t-lg object-cover md:w-48 md:rounded-none md:rounded-l-lg"
                                                            src={Company1}
                                                            alt="" />
                                                        <div className="flex flex-1 flex-col justify-start p-3">
                                                            <div className='flex justify-between gap-4'>
                                                                <div>
                                                                    <h5
                                                                        onClick={() => nav(`/co-hoi-nghe-nghiep/post_id=${post?._id}`)}
                                                                        className="text-[1em] text-neutral-800 font-semibold">
                                                                        {post?.title}

                                                                    </h5>
                                                                    <p className="mb-4 mt-2 text-[0.8em] text-neutral-600 text-ellipsis">
                                                                        {post?.companyId.name}
                                                                    </p>
                                                                </div>
                                                                <p className='text-[0.9em] text-[#1F2F65] font-bold min-w-32 text-right'> {post?.salary}</p>
                                                            </div>


                                                            <div className='flex justify-end gap-2 items-center'>
                                                                <Link className='px-3 py-2  bg-orange-600 text-white rounded-md font-thin hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-400'><span className='text-sm font-semibold'>Ứng tuyển</span></Link>
                                                                <div className="" onClick={() => handleHeartForPost(post._id)}>
                                                                    <FaHeart size={15}
                                                                        color={getUser?.savedPost?.find(p => post._id === p) ? 'red' : ''}
                                                                        className='cursor-pointer transition duration-500 ease-in-out hover:text-red-500 transform hover:-translate-y-1 hover:scale-100' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )).slice(itemOffset, itemOffset + itemsPerPage)
                                        ) :
                                        <p className='text-gray-400 text-xl'>Không tìm thấy bài viết nào.</p>
                                }

                                <UsePagination listItem={filteredPosts} itemsPerPage={itemsPerPage} itemOffset={itemOffset} setItemOffset={handlePageChange} />
                            </div>
                        </div>
                    </div>
                    {/* <div className="mt-10 lg:col-span-2 w-full">
                        <h2 className=' text-white text-left font-semibold bg-gradient-to-r from-[#1F2F65] to-[#5569ac] p-3 rounded-t-lg'>Xem bản đồ</h2>
                        <iframe
                            title="google map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3473115.9060003995!2d-9.790797163012584!3d31.778265070846214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b88619651c58d%3A0xd9d39381c42cffc3!2sMorocco!5e0!3m2!1sen!2sma!4v1709282907766!5m2!1sen!2sma"
                            width="100%"
                            height="350"
                            style={{ border: 0 }}
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div> */}
                </div>
            </div>

        </Default >

    );
}

export default SubCompanyDetail;