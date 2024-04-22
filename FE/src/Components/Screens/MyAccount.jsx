import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CiImageOn } from "react-icons/ci";
import { RiVipCrownLine } from "react-icons/ri";
import HeaderV2 from '../Util/Header/HeaderV2';
import DashboardCustomer from '../Layouts/DashboardCustomer';
import { useSelector } from 'react-redux';
import {  useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
function MyAccount(props) {
    const nav = useNavigate();
    const [avatarPreview, setAvatarPreview] = useState('/logo192.png');
    const getCurrentUser = useSelector((state) => state.users.currentUser);
    const token = Cookies.get("accessToken") || '';
    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storage = getStorage();


    console.log(getCurrentUser);
    // console.log(spaceRef);


    const handleSaveImage = (e) => {
        const imagesRef = ref(storage, `imagesAvatar/${e.target.files[0].name}`);
        const metadata = {
            contentType: 'image/jpeg'
        };
        // Upload file and metadata to the object 'images/mountains.jpg'
        const uploadTask = uploadBytesResumable(imagesRef, e.target.files[0], metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress1 = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress1 + '% done');
                // SetProcess(progress1);
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    setAvatarPreview(downloadURL);
                });
            }
        );

    }
    if (getCurrentUser) {
        return (
            <DashboardCustomer>
                <HeaderV2 hrefType={'Quản lý tài khoản'} />
                <ToastContainer />
                <main>
                    <div className='info-pageCurrent mt-16 ml-16'>
                        <h2 className="text-[2em] font-bold leading-7 text-gray-700">Thông tin tài khoản</h2>
                        <p className="mt-3 text-[0.8em] leading-6 text-gray-600 w-[27%]">Tại NodeJS, chúng tôi không chỉ cung cấp công việc, chúng tôi tạo ra cơ hội nghề nghiệp.</p>
                    </div>
                    <div className='flex justify-between items-center p-[2.6em]'>
                        <div className='w-[100%]'>
                            <Formik
                                initialValues={{ phone: getCurrentUser?.phone, fullname: getCurrentUser?.username, email: getCurrentUser?.email, newpassword: '', newpassword2: '' }}
                                validationSchema={Yup.object({
                                    phone: Yup.number(),
                                    fullname: Yup.string(),
                                    email: Yup.string().email('* Invalid email address'),
                                    newpassword: Yup.string()
                                        .min(6, "Password is too short - should be 6 chars minimum")
                                    ,
                                    newpassword2: Yup.string()
                                        .min(6, "Password is too short - should be 6 chars minimum")
                                        .oneOf([Yup.ref('newpassword'), null], 'Passwords must match')
                                })}
                                onSubmit={async (values, { setSubmitting, setErrors }) => {
                                    let info = {
                                        username: values.fullname || getCurrentUser?.username,
                                        email: values.email || getCurrentUser?.email,
                                        phone: values.phone,
                                        ...(values.newpassword && { password: values.newpassword }),
                                        savedPost: getCurrentUser.savedPost,
                                        followCompany: getCurrentUser.followCompany,
                                        avatar: avatarPreview
                                    }
                                    const cookieInfo = { ...info };
                                    delete cookieInfo.password;
                                    try {
                                        const res = await axios.put(`http://localhost:9999/api/user/update-user/${getCurrentUser?._id}`, {
                                            ...info
                                        }, {
                                            headers: {
                                                "Content-Type": "application/json",
                                                'Authorization': "Bearer " + JSON.parse(token)
                                            },
                                        })
                                        toast.success("Cập nhật thông tin thành công!")
                                        // alert('oke')
                                        console.log(res.data);
                                        Cookies.set('user-profile', JSON.stringify(cookieInfo));

                                    } catch (error) {
                                        console.log(error);
                                        toast.error('Cập nhật thông tin thất bại!');
                                    } finally {
                                        setSubmitting(false);

                                    }


                                }}
                            >
                                {({ errors, touched }) => (
                                    <Form className="mt-10 container">
                                        <div className='row justify-center gap-x-4'>
                                            <div className='col-8'>
                                                <div className="row bg-slate-300-100 shadow-sm  p-5 rounded">
                                                    <div className='col-6'>
                                                        <div className='row'>
                                                            <div className="col-md-12">
                                                                <div className='mt-3'>
                                                                    <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-gray-900">Họ và tên</label>
                                                                    <div className='input-group input-group-lg mt-2'>
                                                                        <Field name="fullname" type="text" placeholder={getCurrentUser?.username} className={`form-control rounded ${errors.fullname && touched.fullname ? 'border-danger' : ''}`} />
                                                                        <span className='absolute text-red-500 text-[0.7em] font-semibold left-[1em] error-message'><ErrorMessage name="fullname" /></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-md-12'>
                                                                <div className="mt-3">
                                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                                                    <div className='input-group input-group-lg mt-2'>
                                                                        <Field name="email" type="email" placeholder={getCurrentUser?.email} className={`form-control rounded ${errors.email && touched.email ? 'border-danger' : ''}`} />
                                                                        <span className='absolute text-red-500 text-[0.7em] font-semibold left-[1em] error-message'><ErrorMessage name="email" /></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-md-12'>
                                                                <div className="mt-3">
                                                                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Số điện thoại</label>
                                                                    <div className='input-group input-group-lg mt-2'>
                                                                        <Field name="phone" type="text" placeholder={getCurrentUser?.phone} className={`form-control rounded ${errors.phone && touched.phone ? 'border-danger' : ''}`} />
                                                                        <span className='absolute text-red-500 text-[0.7em] font-semibold left-[1em] error-message'><ErrorMessage name="phone" /></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-6'>
                                                        <div className="row">
                                                            <div className='col-md-12'>
                                                                <div className="mt-3">
                                                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Mật khẩu</label>
                                                                    <div className=' input-group input-group-lg mt-2'>
                                                                        <Field name="password" type="password" placeholder="**********" className={`form-control rounded`} disabled={true} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-md-12'>
                                                                <div className="mt-3">
                                                                    <label htmlFor="newpassword" className="block text-sm font-medium leading-6 text-gray-900">Nhập mật khẩu mới của bạn</label>
                                                                    <div className='input-group input-group-lg mt-2'>
                                                                        <Field name="newpassword" type="password" placeholder="**********" className={`form-control rounded ${errors.newpassword && touched.newpassword ? 'border-danger' : ''}`} />
                                                                        <span className='absolute text-red-500 text-[0.7em] font-semibold left-[1em] error-message'><ErrorMessage name="newpassword" /></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='col-md-12'>
                                                                <div className="mt-3">
                                                                    <label htmlFor="newpassword2" className="block text-sm font-medium leading-6 text-gray-900">Nhập lại mật khẩu của bạn</label>
                                                                    <div className='input-group input-group-lg mt-2'>
                                                                        <Field name="newpassword2" type="password" placeholder="**********" className={`form-control rounded ${errors.newpassword2 && touched.newpassword2 ? 'border-danger' : ''}`} />
                                                                        <span className='absolute text-red-500 text-[0.7em] font-semibold left-[1em] error-message'><ErrorMessage name="newpassword2" /></span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-3 relative'>
                                                <div className='row text-center bg-gray-100 rounded p-4'>
                                                    <div className='col-md-12 pb-3'>
                                                        <div className='relative'>
                                                            <img src={getCurrentUser?.avatar || avatarPreview}
                                                                alt='avatar.png' className='mx-auto rounded-full shadow-lg object-cover w-[15em] h-[14em]' />
                                                            <label htmlFor="avatar" className='p-2 mt-1 absolute cursor-pointer bg-orange-600 rounded-full bottom-[-0.9em] right-[3em]'><CiImageOn size={20} color='#fff' /></label>
                                                            <input
                                                                name='avatar'
                                                                type='file'
                                                                accept=".jpg, .jpeg, .png"
                                                                id="avatar"
                                                                hidden
                                                                onChange={handleSaveImage}
                                                            />

                                                        </div>
                                                    </div>
                                                    {/* <div className='col-md-12'>
                                                        <div className='accountType'>
                                                            <p className='text-sm font-bold'>Tài khoản chưa được nâng cấp</p>
                                                        </div>
                                                    </div> */}
                                                    <div className='col-md-12'>
                                                        <div className='mt-3'>
                                                            {
                                                                getCurrentUser?.isVip ?
                                                                    <div className='md:px-5 md:py-3 bg-orange-600 text-white rounded-md mr-4 font-medium mx-auto cursor-pointer'><RiVipCrownLine size={25} className='inline-block' /> <span>VIP</span></div>
                                                                    :
                                                                    <div className='md:px-5 md:py-3 bg-orange-600 text-white rounded-md mr-4 font-medium mx-auto cursor-pointer' onClick={() => nav('/nang-cap')}>Nâng cấp ngay</div>
                                                            }

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='col-12'>
                                                <div className='mt-3 ml-14'>
                                                    <button type="submit" className=' md:px-8 md:py-3 bg-orange-600 text-white rounded-md mr-4 font-medium'>Lưu</button>
                                                </div>
                                            </div>
                                        </div>

                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>

                </main>
            </DashboardCustomer >
        );
    }

}

export default MyAccount;