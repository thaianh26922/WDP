import React from 'react';
import ReactPaginate from 'react-paginate';
import '../../../Styles/paginationStyle.css'
import { useState } from 'react';


function UsePagination({listItem, itemsPerPage, itemOffset ,setItemOffset}) {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    // const currentItems = listItem.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(listItem.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % listItem.length;
        console.log(newOffset,event.selected);
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);

    }
    return (
        <>
            {/* <Items currentItems={currentItems} />/ */}
            <div className='flex flex-col justify-center items-center m-auto'>
                <ReactPaginate
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    activeClassName={"paginationactive"}
                    breakLabel="..."
                    nextLabel={
                        <>
                            Next
                        </>
                    }
                    onPageChange={handlePageClick}
                    pageCount={pageCount}
                    forcePage={itemOffset / itemsPerPage}
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
}

export default UsePagination;