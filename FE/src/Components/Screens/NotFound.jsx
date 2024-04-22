import React from 'react';
import { NavLink } from 'react-router-dom';

function NotFound({ text, pathAttach }) {
    return (
        <section className="flex items-center  p-16  text-gray-700">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl ">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">{text || "Một trang không tồn tại trên website."}</p>
                    <p className="mt-4 mb-8 ">Nhưng đừng lo lắng, bạn có thẻ tìm thấy nhiều thứ khác trên trang chủ của chúng tôi.</p>
                    <NavLink to={`${pathAttach || "/trang-chu"}`} className="px-8 py-3 font-semibold rounded bg-orange-600 p-3  text-white">Trở lại trang</NavLink>
                </div>
            </div>
        </section>
    );
}

export default NotFound;
