import { Link } from "react-router-dom";

function AdminLayout(props) {
    return (
        <div className="flex h-screen">
            <div className="bg-orange-300">
                <Link to={'/danh-sach-quan-li-trang-web'}><div className="bg-red-500  p-3 border-b-2 border-white text-white">Quản lí trang web</div></Link>
                <Link to={'/danh-sach-quan-li-cong-ty'}><div className="bg-red-500  p-3 border-b-2 border-white text-white">Quản lí các công ty</div></Link>
                <div className="bg-red-500  p-3 border-b-2 border-white text-white">Đăng xuất</div>
            </div>
            <div className="mx-5 my-10">
                <div className="bg-gray-100 p-3 border-b-2 border-white text-black text-2xl">{props.heading}</div>
                <div>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout;