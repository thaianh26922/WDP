import moment from 'moment';
import React, { useState } from 'react';
import Calendar from 'react-calendar';

function CalendarModal({ dateState, setDateState }) {
    const [focuscalendar, setFocuscalendar] = useState(false);
    const handleFocus = () => {
        focuscalendar(true);
    }

    const handleBlur = () => {
        setFocuscalendar(false);
    }

    console.log(focuscalendar);
    return (
        <>
            <div className='mt-2 relative'>
                <div  onClick={() => setFocuscalendar(!focuscalendar)} className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input type="text" className=" cursor-pointer block flex-1 border-0 bg-transparent py-1.5 pl-1 outline-none text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-8" placeholder="Chọn thời gian" value={dateState ? moment(dateState).format('MMMM Do YYYY') : ''}  disabled />
                </div>
            </div>
            {
                focuscalendar ?
                    <Calendar
                        value={dateState}
                        onChange={setDateState}
                        className='absolute z-20'
                    />
                    :
                    ""
            }
        </>
    );
}

export default CalendarModal;