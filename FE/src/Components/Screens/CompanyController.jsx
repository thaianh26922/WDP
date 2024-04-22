import { useEffect, useState } from "react";
import AdminLayout from "../Layouts/AdminLayout";
import axios from "axios";
import { toast } from "react-toastify";

function CompanyController() {
    const [companies, setCompanies] = useState([]);
    useEffect(() => {
        document.title = 'Danh sách quản lý trang web';
        async function getAllMods() {
            try {
                const response = await axios.get('http://localhost:9999/api/company/get-all-companies').catch((error) => { console.log(error); });
                setCompanies(response.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        getAllMods();

    }, []);

    return (
        <AdminLayout heading='Danh sách công ty trong BestCV'>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-white uppercase bg-gradient-to-r from-[#4973CE] to-[#47BDE1]">
                    <tr>
                        <th scope="col" class="px-3 py-3 text-center">
                            Tên công ty
                        </th>
                        <th scope='col' className='px-3 py-3'>
                            <div class="flex items-center">
                                Email
                                <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg></a>
                            </div>
                        </th>
                        <th scope='col' className='px-3 py-3'>
                            <div class="flex items-center">
                                Mã số thuế
                                <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg></a>
                            </div>
                        </th>
                        <th scope='col' className='px-3 py-3'>
                            <div class="flex items-center">
                                Số điện thoại
                                <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg></a>
                            </div>
                        </th>
                        <th scope='col' className='px-3 py-3'>
                            <div class="flex items-center">
                                Địa chỉ
                                <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                </svg></a>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {companies && companies.map((c, index) => (
                        <tr class="bg-white border-b border-gray-200">
                            <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap text-center">
                                {c.name}
                            </th>
                            <td class="px-3 py-4">
                                {c.email}
                            </td>
                            <td class="px-3 py-4">
                                {c.taxCode}
                            </td>
                            <td class="px-3 py-4">
                                {c.phone}
                            </td>
                            <td class="px-3 py-4">
                                {c.location}
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </AdminLayout>
    )
}

export default CompanyController;