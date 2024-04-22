import React, { Suspense } from 'react';
import Breadcrumb from '../StaticUtil/Breadcrumb.jsx';
const LazyHeader = React.lazy(() => import('./Authenticated.jsx'));
function HeaderV2({ hrefType, roleCo2 }) {
    return (

        <header className={`flex items-center justify-between text-white p-4 ${roleCo2 ? 'bg-gradient-to-r from-[#EF6147] to-[#F5AF51]' : 'bg-blue-950'}`}>
            <Breadcrumb text2={roleCo2} text3={hrefType} />
            {/* //--------------------------------------------- */}
            <div className='flex items-center justify-between user-navbar'>
                <Suspense>
                    <LazyHeader />
                </Suspense>
            </div>
        </header>

    );
}

export default HeaderV2;