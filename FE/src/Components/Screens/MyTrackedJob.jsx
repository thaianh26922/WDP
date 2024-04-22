import React, { useEffect } from 'react';
import HeaderV2 from '../Util/Header/HeaderV2';
import DashboardCustomer from '../Layouts/DashboardCustomer';
import { WiTime12 } from "react-icons/wi";
import { CiSearch } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { followPost, getAllPostFollowed, unfollowPost } from '../../Store/jobPostSlice';
import { getCurrentUser } from '../../Store/userSlice';
import moment from 'moment';
import parse, { domToReact } from 'html-react-parser';
import PostItemSkeleton from '../Util/ViewUtil/PostItemSkeleton';
import UsePagination from '../Util/Pagination/UsePagination';
const itemsPerPage = 10;
function MyTrackedJob(props) {
    const [itemOffset, setItemOffset] = useState(0);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const postJob = useSelector((state) => state.jobPost.postArrFollow);
    const statusPost = useSelector((state) => state.jobPost.statusPAF);
    const getUser = useSelector((state) => state.users.currentUser);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const options = {
        replace: ({ attribs, children, name }) => {
            if (!attribs) {
                return;
            }
            if (name === 'ul') {
                return (
                    <ul className='list-disc pl-5'>
                        {domToReact(children, options)}
                    </ul>
                )
            }
            if (name === 'li') {
                return (
                    <li>
                        {domToReact(children, options)}
                    </li>
                )
            }
        }
    };

    useEffect(() => {
        console.log('line 48: ');
        if (getUser?._id) {
            dispatch(getAllPostFollowed(getUser._id));
        }
    }, [getUser?._id, dispatch])

    useEffect(() => {
        const filteredData = postJob.filter((pp, index) => { return pp });
        setFilteredPosts(filteredData);
    }, [postJob])

    const handlePageChange = (newOffset) => {
        setItemOffset(newOffset);
    };

    const handleHeart = async (postId) => {
        // console.log(postId);
        if (!getUser) {
            nav('/dang-nhap');
        }
        else {
            // console.log('line 125: ', getUser);
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

    // console.log(filteredPosts);

    return (
        <DashboardCustomer>
            <HeaderV2 hrefType={'Việc làm đã lưu'} />
            <main>
                <div className='info-pageCurrent pt-16 pl-32'>
                    <h2 className="text-[2em] font-bold leading-7 text-gray-700">Việc làm đã lưu</h2>
                    <p class="mt-3 text-[0.8em] leading-6 text-gray-600 w-[27%]">Tại NodeJS, chúng tôi không chỉ cung cấp công việc, chúng tôi tạo ra cơ hội nghề nghiệp.</p>
                </div>
                <section id='list-feature-jobs' className='grid lg:grid-cols-3  gap-9 sm:w-[509px] lg:w-[1166px] mx-auto mt-5 mb-5'>
                    <div className='groupFilter hidden bg-red-250 row-span-6 md:hidden lg:block'>
                        <form action="">
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-black sm:text-sm"><CiSearch /></span>
                                    <input type="text" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-8" placeholder="Nhập vị trí chức danh" />
                                </div>
                            </div>
                            {/* <div className='mt-3'>
                                <fieldset>
                                    <label className="text-sm font-semibold leading-6 text-blue-900"><WiTime12 size={20} className='inline-block' /> <span>Hình thức</span></label>
                                    <div className="mt-6 space-y-3">
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input id="staffOperate" name="staffOperate" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label for="staffOperate" className="font-medium text-gray-900">Chọn tất cả</label>
                                            </div>
                                        </div>
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input id="realEstate" name="realEstate" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label for="candidates" className="font-medium text-gray-900">Toàn thời gian</label>
                                            </div>
                                        </div>
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input id="faas" name="faas" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label for="faas" className="font-medium text-gray-900">Bán thời gian</label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div className='mt-6'>
                                <fieldset>
                                    <label className="text-sm font-semibold leading-6 text-blue-900"><WiTime12 size={20} className='inline-block' /> <span>Thời gian</span></label>
                                    <div className="mt-6 space-y-3">
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input id="realEstate" name="realEstate" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label for="candidates" className="font-medium text-gray-900">Gần đây nhất</label>
                                            </div>
                                        </div>
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input id="faas" name="faas" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label for="faas" className="font-medium text-gray-900">Cũ nhất</label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div> */}
                        </form>
                    </div>
                    <div className='col-span-2 grid lg:grid-cols-2 gap-4'>

                        {
                            statusPost === 'failed' && filteredPosts.length === 0 && (
                                <p className='text-gray-400 text-xl'>Không tìm thấy bài viết nào.</p>
                            )
                        }
                        {
                            statusPost === 'pending' && (
                                <PostItemSkeleton card={10} />
                            )
                        }
                        {
                            statusPost === 'succeeded' && filteredPosts &&
                                filteredPosts.length !== 0 ?
                                (
                                    filteredPosts
                                        ?.map((post, index) => (
                                            <div className='flex items-stretch' key={index}>
                                                <div className=' bg-gray-200 shadow-md rounded p-3'>
                                                    <div className='flex justify-between items-center'>
                                                        <h2 className='text-[0.9em] text-blue-900 font-bold py-2'>{post?.companyId.name}</h2>

                                                    </div>
                                                    <p className='tracking-wide mt-3'>{post?.title}</p>

                                                    <div className='py-4 border-b border-b-gray-700'>
                                                        <h2 className='text-[1.1em] font-semibold text-black mb-2'>Yêu cầu:</h2>
                                                        {parse(post?.candidateReq, options)}
                                                    </div>
                                                    <div className='pt-3 pb-1'>
                                                        <p>Hạn ứng tuyển:  {moment(post?.deadline).format('MM/DD/YYYY')}</p>
                                                    </div>
                                                    <div className='pt-1 pb-1'>
                                                        <p>{post?.location}</p>
                                                    </div>
                                                    <div className='pt-2 pb-1 flex justify-evenly items-center'>
                                                        <Link to={`/co-hoi-nghe-nghiep/post_id=${post?._id}`} className='px-10 py-3 bg-blue-950 text-white rounded-md mr-4 font-thin hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-400'>Chi tiết</Link>
                                                        <Link className='px-10 py-3 bg-orange-600 text-white rounded-md mr-4 font-thin hover:bg-orange-500 focus:outline-none focus:ring focus:ring-orange-400'>Ứng tuyển</Link>
                                                        <div onClick={() => handleHeart(post._id)}>
                                                            <FaHeart size={20}
                                                                color={getUser?.savedPost?.find(p => post._id === p) ? 'red' : ''}
                                                                // color={likePost ? 'red' : ''} 
                                                                className='cursor-pointer transition duration-500 ease-in-out hover:text-red-500 transform hover:-translate-y-1 hover:scale-100' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )).slice(itemOffset, itemOffset + itemsPerPage)
                                )
                                :
                                <p className='text-gray-400 text-xl'>Không tìm thấy bài viết nào.</p>
                        }
                    </div>
                    <div className='row-span-4 col-span-2'>
                        <UsePagination listItem={filteredPosts} itemsPerPage={itemsPerPage} itemOffset={itemOffset} setItemOffset={handlePageChange} />
                    </div>

                </section>
            </main>
        </DashboardCustomer>
    );
}

export default MyTrackedJob;