import React, { useEffect, useState } from 'react';
import DashboardCustomer from '../Layouts/DashboardCustomer';
import HeaderV2 from '../Util/Header/HeaderV2';
import { WiTime12 } from "react-icons/wi";
import { CiSearch } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { BiEdit } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi2";
import axios from 'axios';
import { toast } from 'react-toastify';
function ListEmployees(props) {
    const [togNavBar, setTogNavBar] = useState('Open');
    const [editingIndex, setEditingIndex] = useState(null);
    const [employees, setEmployees] = useState([]);

    const handleEditClick = (index) => {
        setEditingIndex(index);
    };

    const handleEdit = async (index, field, value) => {
        try {
            const updatedEmployees = [...employees];
            updatedEmployees[index] = {
                ...updatedEmployees[index],
                [field]: value
            };
            setEmployees(updatedEmployees);
    
            const employeeToUpdate = updatedEmployees[index];
            const res = await axios.put(`http://localhost:9999/api/staff/update-staff/${employeeToUpdate._id}`, {
                password: employeeToUpdate.password,
                name: employeeToUpdate.name,
                status: employeeToUpdate.status
            });
            
            if (res.data.result === "SUCCESS") {
                toast.success('Cập nhật nhân viên thành công');
            } else {
                toast.error('Cập nhật nhân viên thất bại');
            }
        } catch (error) {
            toast.error('Đã có lỗi xảy ra khi cập nhật nhân viên');
            console.error(error);
        }
    };
    
    
    

    useEffect(() => {
        async function getEmployees() {
            const companyId = JSON.parse(sessionStorage.getItem('company'))._id;
            const res = await axios.get(`http://localhost:9999/api/staff/get-staffs/${companyId}`).catch((err) => console.log(err));
            if (res) {
                setEmployees(res.data.data);
            }
        }
        getEmployees();


        const addButton = document.getElementById('add-button');
        addButton.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.getElementById('modal');
            modal.classList.toggle('hidden');
        });

        const cancelButton = document.getElementById('cancel-button');
        cancelButton.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.getElementById('modal');
            modal.classList.toggle('hidden');
        });

        const submitButton = document.getElementById('submit-button');
        submitButton.addEventListener('click', async (e) => {
            e.preventDefault();
            const employee = {
                companyId: JSON.parse(sessionStorage.getItem('company'))._id,
                name: document.getElementById('name').value,
                position: document.getElementById('position').value,
                status: document.getElementById('status').value,
                account: document.getElementById('username').value,
                password: document.getElementById('password').value
            };
            const res = await axios.post('http://localhost:9999/api/staff/insert-staff', employee).catch((err) => console.log(toast.error(`Đã có lỗi xảy ra! ${err}`)));
            try {
                if (res) {
                    if (res.data.result === "SUCCESS") {
                        console.log(`Employee: ${employees}`);
                        setEmployees([...employees, res.data.data]);
                        toast.success('Thêm nhân viên thành công');
                    } else {
                        toast.error('Thêm nhân viên thất bại');
                    }
                }
            } catch (error) {
                toast.error('Đã có lỗi xảy ra! Vui lòng thử lại');
            }

        });
    }, []);
    return (
        <DashboardCustomer roleCo2={'Dashboard công ty'} setTogNavBar={setTogNavBar} togNavBar={togNavBar}>
            <HeaderV2 hrefType={'Danh sách nhân viên'} roleCo2={'Dashboard công ty'} />
            <main className='relative'>
                <div className='info-pageCurrent pt-16 pl-10'>
                    <h2 className="text-[2em] font-bold leading-7 text-gray-700">Danh sách nhân viên</h2>
                    <p class="mt-3 text-[0.8em] leading-6 text-gray-600 w-[27%]">Tại NodeJS, chúng tôi không chỉ cung cấp công việc, chúng tôi tạo ra cơ hội nghề nghiệp.</p>
                </div>
                <section id='list-feature-jobs' className={`grid lg:grid-cols-4  gap-9 sm:w-[509px] mx-auto mt-5 mb-5 ease-in-out duration-500 ${togNavBar === 'Close' ? " lg:w-[1373px]" : "lg:w-[1166px]"}`}>
                    <div className='groupFilter hidden bg-red-250 row-span-6 md:hidden lg:block'>
                        <form action="">
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-black sm:text-sm"><CiSearch /></span>
                                    <input type="text" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-8" placeholder="Nhập tên nhân viên để tìm kiếm" />
                                </div>
                            </div>
                            <div className='mt-3'>
                                <fieldset>
                                    <label className="text-sm font-semibold leading-6 text-blue-900"><WiTime12 size={20} className='inline-block' /> <span>Chức vụ</span></label>
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
                                                <label for="candidates" className="font-medium text-gray-900">HR</label>
                                            </div>
                                        </div>
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input id="faas" name="faas" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label for="faas" className="font-medium text-gray-900">HR Manager</label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                            <div className='mt-6'>
                                <fieldset>
                                    <label className="text-sm font-semibold leading-6 text-blue-900"><WiTime12 size={20} className='inline-block' /> <span>Trạng thái</span></label>
                                    <div className="mt-6 space-y-3">
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input id="realEstate" name="realEstate" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label for="candidates" className="font-medium text-gray-900">Chọn tất cả</label>
                                            </div>
                                        </div>
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input id="faas" name="faas" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label for="faas" className="font-medium text-gray-900">Đang hoạt động</label>
                                            </div>
                                        </div>
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input id="faas" name="faas" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label for="faas" className="font-medium text-gray-900">Đã cấm</label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </form>
                    </div>
                    <div className='col-span-3'>
                        <div className='mb-3 text-right'>
                            <button id='add-button' className='md:px-3 md:py-2 bg-blue-950 text-white rounded'><CiCirclePlus className='inline-block' size={25} /> <span className='text-[0.8em]'>Thêm nhân viên</span></button>
                        </div>
                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-white uppercase bg-gradient-to-r from-[#EF6147] to-[#F5AF51]">
                                    <tr>
                                        <th scope="col" class="px-3 py-3">
                                            Tên
                                        </th>
                                        <th scope='col' className='px-3 py-3'>
                                            <div class="flex items-center">
                                                Chức vụ
                                                <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                </svg></a>
                                            </div>
                                        </th>
                                        <th scope='col' className='px-3 py-3'>
                                            <div class="flex items-center">
                                                Trạng thái
                                                <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                </svg></a>
                                            </div>
                                        </th>
                                        <th scope='col' className='px-3 py-3'>
                                            Tài khoản
                                        </th>
                                        <th scope='col' className='px-3 py-3'>
                                            Mật khẩu
                                        </th>
                                        <th scope="col" class="px-3 py-3">
                                            Quản lý
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((employee, index) => (
                                        <tr key={index} className="bg-white border-b border-gray-200">
                                            <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {editingIndex === index ? (
                                                    <input
                                                        type="text"
                                                        value={employee.name}
                                                        onChange={(e) => handleEdit(index, 'name', e.target.value)}
                                                    />
                                                ) : (
                                                    employee.name
                                                )}
                                            </th>
                                            <td className="px-3 py-4">
                                                {editingIndex === index ? (
                                                    <input
                                                        type="text"
                                                        value={employee.role}
                                                        onChange={(e) => handleEdit(index, 'position', e.target.value)}
                                                    />
                                                ) : (
                                                    employee.role
                                                )}
                                            </td>
                                            <td className="px-3 py-4">
                                                {editingIndex === index ? (
                                                    <select
                                                        value={employee.status}
                                                        onChange={(e) => handleEdit(index, 'status', e.target.value)}
                                                        className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
                                                    >
                                                        <option value="Đang hoạt động" style={{ color: "green" }}>Đang hoạt động</option>
                                                        <option value="Cấm" style={{ color: "red" }}>Cấm</option>
                                                    </select>
                                                ) : (
                                                    employee.status
                                                )}
                                            </td>
                                            <td className="px-3 py-4">
                                                {editingIndex === index ? (
                                                    <input
                                                        type="text"
                                                        value={employee.account}
                                                        onChange={(e) => handleEdit(index, 'username', e.target.value)}
                                                    />
                                                ) : (
                                                    employee.account
                                                )}
                                            </td>
                                            <td className="px-3 py-4">
                                                {editingIndex === index ? (
                                                    <input
                                                        type="text"
                                                        value={employee.password}
                                                        onChange={(e) => handleEdit(index, 'password', e.target.value)}
                                                    />
                                                ) : (
                                                    employee.password
                                                )}
                                            </td>
                                            <td className="px-3 py-4 flex gap-x-3 justify-center">
                                                {editingIndex === index ? (
                                                    <button
                                                        onClick={() => {
                                                            setEditingIndex(null);
                                                        }}
                                                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                    >
                                                        Save
                                                    </button>
                                                ) : (
                                                    <>
                                                        <BiEdit
                                                            size={20}
                                                            color='#1c2551'
                                                            className='cursor-pointer'
                                                            onClick={() => handleEditClick(index)}
                                                        />
                                                        <HiOutlineTrash size={20} color='#d63434' className='cursor-pointer' />
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* //////////////////// */}
                    <div className="flex items-center gap-4">
                        <button disabled
                            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                aria-hidden="true" className="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                            </svg>
                            Previous
                        </button>
                        <div className="flex items-center gap-2">
                            <button
                                className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg bg-orange-600 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    1
                                </span>
                            </button>
                            <button
                                className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    2
                                </span>
                            </button>
                            <button
                                className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    3
                                </span>
                            </button>
                            <button
                                className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    4
                                </span>
                            </button>
                            <button
                                className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    5
                                </span>
                            </button>
                        </div>
                        <button
                            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button">
                            Next
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                aria-hidden="true" className="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
                            </svg>
                        </button>
                    </div>
                </section>
            </main>
            <div id='modal' className='bg-gray-100 bg-opacity-25 h-screen w-screen hidden absolute top-0 left-0'>
                <div className='modal-content w-[800px] h-[500px]  bg-white mx-auto mt-20 p-5 rounded-lg'>
                    <h2 className='text-center text-2xl font-bold'>Thêm nhân viên</h2>
                    <form action="" className='mt-5'>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label htmlFor="name" className='block text-sm font-semibold'>Tên</label>
                                <input type="text" id='name' className='w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500' />
                            </div>
                            <div>
                                <label htmlFor="position" className='block text-sm font-semibold'>Chức vụ</label>
                                <input type="text" id='position' className='w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500' />
                            </div>
                            <div>
                                <label htmlFor="status" className='block text-sm font-semibold'>Trạng thái</label>
                                <select id="status" className='w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500'>
                                    <option value="ACTIVE" style={{ color: "green" }}>Đang hoạt động</option>
                                    <option value="BANNED" style={{ color: "red" }}>Cấm</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="username" className='block text-sm font-semibold'>Tài khoản</label>
                                <input type="text" id='username' className='w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500' />
                            </div>
                            <div>
                                <label htmlFor="password" className='block text-sm font-semibold'>Mật khẩu</label>
                                <input type="text" id='password' className='w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500' />
                            </div>
                        </div>
                        <div className='mt-5 text-center'>
                            <button type="submit" id='submit-button' className='px-4 py-2 bg-blue-950 text-white rounded-md mr-4 font-medium'>Thêm</button>
                            <button type="button" id='cancel-button' className='px-4 py-2 bg-gray-300 text-black rounded-md mr-4 font-medium'>Hủy</button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardCustomer >
    );
}

export default ListEmployees;
