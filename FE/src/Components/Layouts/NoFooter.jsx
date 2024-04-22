import React from 'react';
import Header from '../Util/Header/Header';

function NoFooter({children, type}) {
    return (
        <>
        <Header type={type}/>
        {children}
        </>
    );
}

export default NoFooter;