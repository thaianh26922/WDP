import React from 'react';
import NavBar from '../Util/Header/NavBar';
import NavBarV2 from '../Util/NavBarV2';
import '../../Styles/headerV2.css'

function DashboardCustomer({ children, roleCo2, roleCo3, setTogNavBar, togNavBar, useNavBarV2 }) {
    return (
        <div className='flex'>
            {useNavBarV2 ? (
                <NavBarV2 roleCo3={roleCo3} setTogNavBar={setTogNavBar} togNavBar={togNavBar}/>
            ) : (
                <NavBar roleCo2={roleCo2} setTogNavBar={setTogNavBar} togNavBar={togNavBar}/>
            )}
            <div className='info-specific w-screen'>
                {children}
            </div>
        </div>
    );
}

export default DashboardCustomer;
