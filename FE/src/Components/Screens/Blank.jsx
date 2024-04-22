// import React, { useState, useEffect } from 'react';
// import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';

// function Blank(props) {

//     const [user, setUser] = useState(0);
//     const [profile, setProfile] = useState([]);

//     const login = useGoogleLogin({
//         onSuccess: (codeResponse) => { console.log(codeResponse); setUser(codeResponse) },
//         onError: (error) => console.log('Login Failed:', error)
//     });


//     useEffect(() => {
//         const getUser = () => {
//             if (user) {
//                 axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
//                     headers: {
//                         Authorization: `Bearer ${user.access_token}`,
//                         Accept: 'application/json'
//                     }
//                 })
//                     .then((res) => {
//                         console.log(res.data);
//                         setProfile(res.data);
//                     })
//                     .catch((err) => console.log(err));
//             }
//         }

//         getUser();
//     }, [user])

//     // log out function to log the user out of google and set the profile array to null
//     const logOut = () => {
//         googleLogout();
//         setProfile(null);
//     };

//     return (
//         <div>
//             {profile && profile.length !== 0 ?
//                 <div>
//                     <img src={profile.picture} alt="user image" />
//                     <h3>User Logged in</h3>
//                     <p>Name: {profile.name}</p>
//                     <p>Email Address: {profile.email}</p>
//                     <br />
//                     <br />
//                     <button onClick={logOut}>Log out</button>
//                 </div>
//                 :
//                 <>
//                     <h2>React Google Login</h2>
//                     <br />
//                     <br />
//                     <button onClick={() => login()}>Sign in with Google 🚀</button>
//                 </>}
//         </div>
//     )


// }

// export default Blank;

import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import '../../Styles/paginationStyle.css'

// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14
  , 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
  , 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50
  , 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70
  , 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90
  , 91, 92, 93, 94, 95, 96, 97, 98, 99, 100];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}

const Blank = ({ itemsPerPage }) => {
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);

  }
  return (
    <>
      <Items currentItems={currentItems} />
      <div className='flex flex-col justify-center items-center m-auto'>
        <ReactPaginate
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          activeClassName={"active"}
          breakLabel="..."
          nextLabel={
            <>
              Next
            </>
          }
          onPageChange={handlePageClick}
          pageCount={pageCount}
          previousLabel={
            <>
              Previous
            </>
          }
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};

export default Blank;


