import React, { Suspense } from 'react';
import Header from '../Util/Header/Header.jsx';
import Footer from '../Util/StaticUtil/Footer.jsx';
const LazyHeader = React.lazy(() => import('../Util/Header/Header.jsx'));

function Default({ children }) {
    return (
        <>
            <Suspense>
                <LazyHeader />
                {children}
                <Footer />
            </Suspense>
        </>
    );
}

export default Default;