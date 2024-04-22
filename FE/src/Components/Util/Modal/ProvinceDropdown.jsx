import React, { useEffect, useState } from 'react';
import { CiLocationOn } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { getProvince } from '../../../Store/provinceSlice';
import Form from 'react-bootstrap/Form';
function ProvinceDropdown({ searchTerm, setSearchTerm }) {
    const [focusLocation, setFocusLocation] = useState(false);
    const dispatch = useDispatch();
    const arrProvince = useSelector((state) => state.provinces.provinceArr);

    useEffect(() => {
        const fetchProvince = async () => {
            try {
                await dispatch(getProvince());
            } catch (error) {
                console.log(error);
            }
        }
        fetchProvince();
    }, [dispatch])

    const handleClick = () => {
        setFocusLocation(true);
    }

    const handleBlur = () => {
        setFocusLocation(false);
    }

    const handleChooseLocation = (selectedLocation) => {
        setSearchTerm(selectedLocation);
        setFocusLocation(false);
    }


    return (
        <>
            <div className="flex rounded-md shadow-sm  border border-gray-400 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <span className="flex select-none items-center pl-3 text-black sm:text-sm"><CiLocationOn /></span>
                <Form.Control
                 className="block flex-1 border-0 bg-transparent py-1.5 pl-1 outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-8"
                placeholder="Tìm kiếm địa điểm" 
                onChange={(e) => setSearchTerm(e.target.value)} 
                onClick={handleClick} 
                onBlur={handleBlur} 
                value={searchTerm} />
            </div>
            {
                focusLocation ?
                    <div className='absolute bg-[#f15b2a] rounded-md top-[100%] left-[1%] min-w-48 z-20 px-2 pt-1'>
                        <ul className='text-white  max-h-52 overflow-y-auto'>
                            {
                                arrProvince.length > 0 && arrProvince.filter((provItem) => {
                                    return searchTerm.toLowerCase() === '' ? provItem : provItem.Name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
                                })
                                    .map((item, index) => (
                                        <li key={index} className='p-2 text-[0.8rem] hover:bg-gray-300 cursor-pointer' onMouseDown={() => handleChooseLocation(item.Name)}>{item.Name}</li>
                                    ))
                            }
                        </ul>
                    </div>
                    :
                    ""
            }
        </>
    );
}

export default ProvinceDropdown;