import { Button, Form, Toast } from "react-bootstrap"
import background from '../../Image/background.jpg'
import logo from '../../Image/logo-dragon-2.png'
import { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function CompanyRegister() {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Đăng ký tài khoản doanh nghiệp"
        async function handleSignUp(e) {
            const form = document.querySelector('form');
            e.preventDefault();
            const taxCode = form.querySelector('input[type="number"]').value;
            const companyName = form.querySelectorAll('input[type="text"]')[0].value;
            const phone = form.querySelectorAll('input[type="number"]')[1].value;
            const email = form.querySelector('input[type="email"]').value;
            const password = form.querySelectorAll('input[type="password"]')[0].value;
            const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;
            if (password !== confirmPassword) {
                document.getElementById('notification-password').innerHTML = "Mật khẩu không trùng khớp";
            }
            else {
                const res = await axios.post('http://localhost:9999/api/company/insert-company', {
                    taxCode: taxCode,
                    name: companyName,
                    phone: phone,
                    email: email,
                    account: email,
                    password: password
                }).catch((err) => {
                    console.log(err);
                })

                try {
                    console.log(res.data);
                    if (res.data.result === 'SUCCESS') {
                        sessionStorage.setItem('company', JSON.stringify(res.data.data));
                        navigate('/ho-so-cong-ty');
                    } else if (res.data.result === 'FAIL') {
                        toast.error('Đăng ký không thành công');
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }

        document.getElementById('register-button').addEventListener('click', (event) => handleSignUp(event));

    }, [])
    return (
        <div className="d-flex flex-shrink">
            <div className="mx-5 w-50">
                <div className="mt-20">
                    <h2 className="fw-bold text-2xl my-3">ĐĂNG KÝ</h2>
                    <p className="text-sm my-4">Bạn đang đăng ký tài khoản doanh nghiệp tại BestCV. Nền tảng trực tuyến số kết nối ứng viên và doanh nghiệp, giải pháp công nghệ số.</p>
                    <Form >
                        <Form.Label className="fw-bold">Mã số thuế:<span className="text-red-500">(*)</span></Form.Label>
                        <Form.Control type="number" placeholder="Mã số thuế" />
                        <Form.Label className="fw-bold">Tên công ty:<span className="text-red-500">(*)</span></Form.Label>
                        <Form.Control type="text" placeholder="Tên công ty" />
                        <Form.Label className="fw-bold">Email:<span className="text-red-500">(*)</span></Form.Label>
                        <Form.Control type="email" placeholder="Email" />
                        <Form.Label className="fw-bold">Số điện thoại:<span className="text-red-500">(*)</span></Form.Label>
                        <Form.Control type="number" placeholder="Số điện thoại" />
                        <Form.Label className="fw-bold">Mật khẩu:<span className="text-red-500">(*)</span></Form.Label>
                        <Form.Control type="password" placeholder="Mật khẩu" />
                        <Form.Label className="fw-bold">Nhập lại mật khẩu<span className="text-red-500">(*)</span></Form.Label>
                        <Form.Control type="password" placeholder="Nhập lại mật khẩu" />
                        <span id="notification-password" className="text-red-500"></span>
                        <button className="w-full border-1 border-orange-300 bg-orange-400 rounded-sm py-2 mt-3" id="register-button">Đăng ký</button>
                    </Form>
                </div>
            </div>
            <div>
                <div className="h-20 bg-slate-800">
                    <img src={logo} className="w-20 mx-5" />
                </div>
                <img src={background} className="h-screen w-auto" alt="company" />
            </div>
        </div>
    )
}

export default CompanyRegister