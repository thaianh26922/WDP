
import { Navigate, Route, Routes } from 'react-router-dom';
import Register from '../Components/Screens/Register';
import Login from '../Components/Screens/Login';
import ForgotPassword from '../Components/Screens/ForgotPassword';
import MyAccount from '../Components/Screens/MyAccount';
import UpgradeAccount from '../Components/Screens/UpgradeAccount';
import JobOpportunities from '../Components/Screens/JobOpportunities';
import JobOpportunitiesDetail from '../Components/Screens/JobOpportunitiesDetail';
import MyCv from '../Components/Screens/MyCv';
import MyApplyJob from '../Components/Screens/MyApplyJob';
import MyFollowCompany from '../Components/Screens/MyFollowCompany';
import MyTrackedJob from '../Components/Screens/MyTrackedJob';
import CompanyProfile from '../Components/Screens/CompanyProfile';
import UpgradeAccountForCompany from '../Components/Screens/UpgradeAccountForCompany';
import ListEmployees from '../Components/Screens/ListEmployees';
import JobListHRManager from '../Components/Screens/JobListHRManager';
import RecruimentPostHR from '../Components/Screens/RecruimentPostHR';
import Home from '../Components/Screens/Home';
import SimpleTemplate from '../CVTemplate/SimpleTemplate';
import NotFound from '../Components/Screens/NotFound';
import RequireAuth from '../Components/RequireAuth';
import LoginForCompany from '../Components/Screens/LoginForCompany';
import ListCompanyMod from '../Components/Screens/ListCompanyMod';
import CompanyRegister from '../Components/Screens/CompanyRegister';
import AuthenCompany from '../Components/AuthenCompany';
import VIPRegister from '../Components/Screens/VIPRegister';
import AuthenStaff from '../Components/AuthenStaff';
import ChatWithHR from '../Components/Screens/ChatWithHR';
import EditPostHR from '../Components/Screens/EditPostHR';
import LoginForStaff from '../Components/Screens/LoginForStaff';
import AuthenHRManager from '../Components/AuthenHRManager';
import ListSubCompany from '../Components/Screens/ListSubCompany'
import SubCompanyDetail from '../Components/Screens/SubCompanyDetail'
import HRManagerCandidatesList from '../Components/Screens/HRManagerCandidatesList';
import ViewCV from '../Components/Screens/ViewCV';
import ModController from '../Components/Screens/ModController';
import CompanyController from '../Components/Screens/CompanyController';
import CandidatesListHR from '../Components/Screens/CandidatesListHR';
import JobListHR from '../Components/Screens/JobListHR';
const Router = () => {
    return (
        <Routes>
            {/* Public */}
            <Route path='/' element={<Home />} />
            <Route path='/dang-nhap' element={<Login />} />
            <Route path='/cong-ty/dang-nhap' element={<LoginForCompany />} />
            <Route path='/nhan-vien/dang-nhap' element={<LoginForStaff />} />
            <Route path='/cong-ty/dang-ky' element={<CompanyRegister />} />
            <Route path='/dang-ky' element={<Register />} />
            <Route path='/khong-xac-dinh' element={<NotFound />} />
            <Route path='/quen-mat-khau/:code' element={<ForgotPassword />} />
            <Route path='/cac-cong-ty-con' element={<ListSubCompany />} />
            <Route path='/cac-cong-ty-con/:ten-cong-ty-con' element={<SubCompanyDetail />} />
            <Route path='/co-hoi-nghe-nghiep' element={<JobOpportunities />} />
            <Route path='/danh-sach-cong-ty-mod' element={<ListCompanyMod />} />
            <Route path='/tao-bai-tuyen-dung' element={<RecruimentPostHR />} />
            <Route path='/lien-he' element={<ChatWithHR />} />
            <Route path='/danh-sach-quan-li-trang-web' element={<ModController/>}/>
            <Route path='/danh-sach-quan-li-cong-ty' element={<CompanyController/>}/>

            <Route>
                {/* Private */}
                <Route path='/tai-khoan' element={<MyAccount />} />
                <Route path='/nang-cap' element={<UpgradeAccount />} />
                <Route path='/tao-cv' element={<SimpleTemplate />} />
                <Route path='/ho-so-cua-toi' element={<MyCv />} />
                <Route path='/viec-lam-da-ung-tuyen' element={<MyApplyJob />} />
                <Route path='/cong-ty-dang-theo-doi' element={<MyFollowCompany />} />
                <Route path='/viec-lam-da-luu' element={<MyTrackedJob />} />
                <Route path='/co-hoi-nghe-nghiep/:tieu-de-cong-viec' element={<JobOpportunitiesDetail />} />
                <Route path='/lien-he-voi-nha-tuyen-dung' element={<ChatWithHR type={1} />} />
            </Route>
            <Route element={<AuthenCompany />}>
                <Route path='/ho-so-cong-ty' element={<CompanyProfile />} />
                <Route path='/danh-sach-nhan-vien' element={<ListEmployees />} />
                <Route path='/dang-ky-vip' element={<VIPRegister />} />
            </Route>
            <Route element={<AuthenStaff />}>
                <Route path='/tao-bai-tuyen-dung' element={<RecruimentPostHR />} />
                <Route path='/chinh-sua-bai-tuyen-dung/:pid' element={<EditPostHR />} />
                <Route path='/danh-sach-cong-viec' element={<JobListHR />} />
                <Route path='/danh-sach-ung-vien' element={<CandidatesListHR />} />
                <Route path='/lien-he-voi-ung-vien' element={<ChatWithHR type={2} />} />
                <Route path='/xem-cv-ung-vien/:path/:name' element={<ViewCV />} />
            </Route>
            <Route element={<AuthenHRManager />}>
                <Route path='/danh-sach-ung-vien-hrmanager' element={<HRManagerCandidatesList />} />
                <Route path='/danh-sach-cong-viec-hrmanager' element={<JobListHRManager />} />
            </Route>
            <Route path='*' element={<Navigate to="/" />} />
        </Routes>
    );
};

export default Router;

