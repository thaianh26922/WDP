import React, { useEffect, useState } from "react";
import "../../Styles/styles.css";
import backgroundImage from "../../Image/wallpaperflare.com_wallpaper.jpg";
import backgroundImage1 from "../../Image/logo-dragon-2.png";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import NotFound from "./NotFound";
import { newPassWord } from "../../Store/userSlice";

const ForgotPassword = () => {
  const [updatePassword, setUpdatePassword] = useState({
    password: "pw",
    confirmPassword: "cpw",
  });
  const [buttonRestore, setButtonRestore] = useState(0);
  const param = useParams();
  const dispatch = useDispatch();
  const emailCookies = Cookies.get('email') || '';
  const status = useSelector((state) => state.users.statusnewPassWord);
  const codeDecode = Cookies.get('code-verify') || '';



  //http://localhost:9999/api/user/update-password
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUpdatePassword((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonRestore(!buttonRestore);
    console.log(updatePassword);
  };


  useEffect(() => {

    const handleUpdatePassWord = async () => {
      try {
        if (updatePassword.password === updatePassword.confirmPassword) {
          const data = { email: emailCookies, password: updatePassword.password };
          console.log(data);
          await dispatch(newPassWord(data))
        }
      } catch (rejectedValueOrSerializedError) {
        console.error('Error:', rejectedValueOrSerializedError);
      }
    }

    handleUpdatePassWord();

  }, [buttonRestore, dispatch])


  useEffect(() => {
    if (status === 'succeeded') {
      console.log('Cập nhật thành công!');
    }
  }, [status]);


  if (atob(codeDecode.toString()) !== param.code) {
    return <NotFound />
  }


  return (
    <div className="all">
      <div className="full-screen-image">
        <img src={backgroundImage} alt="img" />
      </div>
      <div className="logo">
        <img src={backgroundImage1} alt="img" />
        <Link href="/" className="flex items-center ">
          <i className="fas fa-undo mr-2"></i> Quay lại trang chủ
        </Link>
      </div>

      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4 text-dark  font-bold">Khôi phục mật khẩu</h2>
          <p>
            Tại Nodejs, chúng tôi không chỉ cung cấp công việc, chúng tôi
            tạo ra cơ hội nghề nghiệp.
          </p>
          {buttonRestore !== 0 ?
            updatePassword.password === updatePassword.confirmPassword ?
              <p className="bg-green-200 text-center p-3 rounded">Tốt! Mật khẩu xác nhận trùng khớp</p>
              :
              <p className="bg-red-300 text-center p-3 rounded" style={{ fontSize: '1em' }}>Lỗi! Mật khẩu xác nhận không trùng</p>
            : ""
          }
          <div className="form-group font-bold">
            <label htmlFor="password" className="mb-3">
              Mật khẩu
            </label>
            <span className="text-red-500">*</span>
            <input
              type="password"
              className="form-control p-3"
              onChange={handleChange}
              name="password"
              placeholder="Nhập mật khẩu của bạn"
              required
            />
          </div>
          <div className="form-group  font-bold">
            <label htmlFor="confirmPassword" className="mb-3">
              Xác nhận mật khẩu
            </label>
            <span className="text-red-500">*</span>
            <input
              type="password"
              className="form-control p-3"
              name="confirmPassword"
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu của bạn"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white p-2 w-full rounded-md "
          >
            Khôi Phục
          </button>
          <div className="mt-2 text-center">
            <p>
              <Link href="/dang-nhap" className="text-red-500 font-bold">
                Hủy
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
