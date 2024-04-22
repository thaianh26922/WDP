import { useEffect, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import axios from "axios";

function ModController() {
    const [password, setPassword] = useState('');
    const [account, setAccount] = useState('');
    const [mods, setMods] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        document.title = 'Danh sách quản lý trang web';
        async function getAllMods() {
            try {
                const response = await axios.get('http://localhost:9999/api/mod').catch((error) => { console.log(error); });
                setMods(response.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        getAllMods();

    }, [openModal]);

    async function insertMod() {
        try {
            if (account !== '' && password !== '') {
                const response = await axios.post('http://localhost:9999/api/mod', {
                    account,
                    password
                });
                if (response && response.data.result === 'SUCCESS') {
                    setOpenModal(false);
                } else {
                    console.log('that baii');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AdminLayout heading='Danh sách quản lý trang web'>
            <div className="text-end"><button onClick={() => setOpenModal(true)} className="bg-orange-300 px-3 py-2"><small>Thêm quản lí trang web</small></button></div>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-white uppercase bg-gradient-to-r from-[#4973CE] to-[#47BDE1]">
                    <tr>
                        <th scope="col" class="px-3 py-3 text-center">
                            Tài khoản quản trị
                        </th>
                        <th scope='col' className='px-3 py-3'>
                            <div class="flex items-center">
                                Mật khẩu
                                <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg></a>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {mods && mods.map((c, index) => (
                        <tr class="bg-white border-b border-gray-200">
                            <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                {c.account}
                            </th>
                            <td class="px-3 py-4">
                                {c.password}
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            <div id='modal' className={`w-screen h-screen top-0 right-0 bg-black bg-opacity-25 absolute ${!openModal ? 'hidden' : ''}`}>
                <div className='w-full h-full flex flex-col align-items-center '>
                    <div className='w-1/2 h-1/4 bg-white shadow-lg rounded-md my-auto px-4 py-2'>
                        <h2 className='font-bold text-3xl'>Thêm quản lí trang web</h2>
                        <div className='mt-2'>
                            <label>Tên tài khoản:</label>
                            <input type='text' className='w-full border-b-2 rounded-md p-2  outline-none' onChange={(e) => setAccount(e.target.value)} />
                            <label>Mật khẩu:</label>
                            <input type='password' className='w-full border-b-2 rounded-md p-2 outline-none' onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className='text-center mt-2'>
                            <button className='text-white bg-blue-950 py-2 px-5 rounded-md' onClick={() => setOpenModal(false)}>Hủy</button>
                            <span className='w-10 inline-block'></span>
                            <button className='text-white bg-orange-600 p-2  px-5 rounded-md' onClick={() => insertMod()}>Thêm</button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default ModController;