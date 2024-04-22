import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import "quill/dist/quill.snow.css";
function DescriptionPost({ desc, setDesc }) {

    const ref = useRef(null);

    useEffect(() => {
        ref.current.editor.root.setAttribute("spellcheck", "false");
        ref.current.focus();
    }, []);

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            [{ 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        ],
    };
    return (
        <div className='mt-3'>
            <ReactQuill
                ref={ref}
                theme="snow"
                value={desc}
                onChange={setDesc}
                placeholder='Nhập mô tả công việc'
                modules={modules} />
        </div>
    )
}
export default DescriptionPost;
