import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import "quill/dist/quill.bubble.css";

function TitlePost({ title, setTitle, getTitle }) {

    const ref = useRef(null);

    useEffect(() => {
        ref.current.editor.root.setAttribute("spellcheck", "false");
        ref.current.focus();
    }, []);

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
        ],
    };

    function handleTitleChange() {
            getTitle(ref.current.editor.getText().trim());
    }
    return (
        <ReactQuill
            ref={ref}
            theme="bubble" value={title} onChange={handleTitleChange} modules={modules} />
    )
}

export default TitlePost;


