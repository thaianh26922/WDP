import axios from "axios"
import DashboardCustomer from "../Layouts/DashboardCustomer"
import HeaderV2 from "../Util/Header/HeaderV2"
import { useEffect, useState } from "react";

function VIPRegister() {
    const [company, setCompany] = useState(JSON.parse(sessionStorage.getItem('company')));
    async function handleVipRegister(amount) {
        const res = await axios.post('http://localhost:9999/api/payment/create_payment_url', {
            "amount": amount,
            "bankCode": "VNBANK",
            "language": "vn",
            "returnUrl": "http://localhost:3000/dang-ky-vip",
            "companyId": company._id,
            'status': amount === 1000000 ? 'NORMAL' : 'LUX'
        });
        window.location.href = res.data;
    }

    useEffect(() => {
        document.title = 'Đăng ký VIP';
        async function getCompany() {
            const res = await axios.get(`http://localhost:9999/api/company/get-by-id-company/${company._id}`);
            if (res && res.data.result === 'SUCCESS') {
                setCompany(res.data.data);
            }
        }
        getCompany();
    }, [])



    return (
        <DashboardCustomer roleCo2={'Dashboard công  ty'} >
            <HeaderV2 hrefType={'Đăng ký VIP'} roleCo2={'Dashboard công ty'} />
            <main>
                <h2 className="text-2xl font-bold mx-10 mt-10">Đăng ký VIP</h2>
                <p className="mx-10 mt-5">Đăng ký trở thành thành viên VIP để kết nối với nhiều ứng viên tiềm năng</p>
                <div className="flex justify-center mt-10">
                    {
                        company && company?.vip === 'NORMAL' ? '' : <div className="w-auto h-auto  rounded-xl px-10 py-5 shadow-lg flex flex-col flex-shrink-0">
                            <div>
                                <p className="text-2xl font-bold text-center ">Thường</p>
                                <p>Thời hạn: <span className="text-red-500 font-bold">1 ngày</span></p>
                                <p>Quyền lợi: <span className="text-red-500 font-bold">Bài viết tuyển dụng được đẩy lên trang nhất <br /> của trang tìm kiếm</span></p>
                                <p>Mức giá: <span className="text-red-500 font-bold">1.000.000 VNĐ</span></p>
                            </div>
                            <div className="text-center mt-auto"><button className="bg-red-500 text-white px-5 py-2 rounded-md mt-5 " onClick={() => handleVipRegister(1000000)}>Đăng ký</button></div>
                        </div>
                    }
                    <div className="mx-2"></div>
                    {company && company?.vip === 'LUX' ? '' : <div className="w-auto h-auto  rounded-xl px-10 py-5 shadow-lg flex flex-col flex-shrink-0">
                        <div className="">
                            <p className="text-2xl font-bold text-center">Cao cấp</p>
                            <p>Thời hạn: <span className="text-red-500 font-bold">2 ngày</span></p>
                            <p>Quyền lợi: <span className="text-red-500 font-bold">Bài viết tuyển dụng được đẩy lên trang nhất <br /> của trang tìm kiếm</span></p>
                            <p><span className="text-red-500 font-bold">Bài viết xuất hiện tại trang đầu tiên của Website <br /> của trang tìm kiếm</span></p>
                            <p>Mức giá: <span className="text-red-500 font-bold">3.000.000 VNĐ</span></p>
                        </div>
                        <div className="text-center mt-auto"><button className="bg-red-500 text-white px-5 py-2 rounded-md mt-5" onClick={() => handleVipRegister(3000000)}>Đăng ký</button></div>
                    </div>}
                </div>
            </main>
        </DashboardCustomer>
    )
}

export default VIPRegister