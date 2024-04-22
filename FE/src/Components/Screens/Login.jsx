import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, verifyEmail } from "../../Store/userSlice";
import { emailRegex } from "../../Util/regex";
import { toast } from "react-toastify";
import "../../Styles/styles.css";
import DefaultLogin from "../Layouts/DefaultLogin";
const Login = ({ children }) => {

  const [resetEmail, setRestEmail] = useState('');
  const [buttonSendEmail, setButtonSendEmail] = useState(false);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.users.status);
  const statusLogin = useSelector((state) => state.users.statusLogin);
  const [buttonLogin, setButtonLogin] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/trang-chu";



  const openConfirmationModal = () => {
    setButtonSendEmail(!buttonSendEmail);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };



  useEffect(() => {
    const handlePostLogin = async () => {
      try {
        if (buttonLogin) {
          await dispatch(loginUser(buttonLogin))
        }
      } catch (rejectedValueOrSerializedError) {
        toast.error('Đăng nhập thất bại');
        console.error('Error:', rejectedValueOrSerializedError);
      }
    }
    handlePostLogin();
  }, [buttonLogin, dispatch]);

  //xu ly forgot password
  // http://localhost:9999/api/user/forgot-password
  useEffect(() => {
    const handleVerification = async () => {
      try {
        if (buttonSendEmail && emailRegex.test(resetEmail.target?.value)) {
          await dispatch(verifyEmail(`${resetEmail.target?.value}`));
        }
      } catch (rejectedValueOrSerializedError) {

        console.error('Error:', rejectedValueOrSerializedError);
      }
    };
    handleVerification();
  }, [resetEmail, buttonSendEmail, dispatch])

  useEffect(() => {
    if (status === 'succeeded') {
      setIsConfirmationModalOpen(true);
    }
  }, [status]);

  useEffect(() => {
    if (statusLogin === 'succeeded') {
      toast.success('Đăng nhập thành công!');
      setTimeout(() => {
        nav(from, { replace: true });
      }, 1000);
    }
    if (statusLogin === 'failed') {
      toast.error('Đăng nhập thất bại.');
    }
  }, [statusLogin, nav, from]);

  return (
    <DefaultLogin resetEmail={resetEmail} setRestEmail={setRestEmail}
     setButtonLogin={setButtonLogin} openConfirmationModal={openConfirmationModal}
     closeConfirmationModal={closeConfirmationModal} isConfirmationModalOpen={isConfirmationModalOpen}/>
  );
};

export default Login;
