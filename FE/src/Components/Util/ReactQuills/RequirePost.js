import React, { useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import "quill/dist/quill.bubble.css";
import { CiCirclePlus } from "react-icons/ci";
import parse from 'html-react-parser';

function CustomToolBarInline({ text, setText }) {

    const ref = useRef();
    // const [focusedLine, setFocusedLine] = useState(null);
    // const [listItems, setListItems] = useState([]);

    useEffect(() => {
        ref.current.editor.root.setAttribute("spellcheck", "false");
        // ref.current.focus();
    }, []);


    const handleAddListItem = (e) => {
        e.preventDefault();
        const regex = /<ul>.*?<li>.*?<\/li>.*?<\/ul>/;

        if (!regex.test(text)) {
            setText(`<ul><li>Thêm dòng</li></ul>`);
        } else {
            setText(text.replace("</ul>", "<li>Thêm dòng ...</li></ul>"));
        }
    };

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
        ],
    };


    const handleChange = (content, delta, source, editor) => {
        // console.log(ref.current.selection);
        // console.log("content before: ", content);
        const cleanedContent = content.replace(/<p>.*?<\/p>/g, '<ul><li>Thêm dòng ...</li></ul>'); // Xóa các thẻ <p></p>
        // console.log("content after: ", cleanedContent);
        // console.log(cleanedContent);
        setText(cleanedContent);
    }



    // console.log("line 32: ", text);
    // console.log(ref.current);
    return (
        
        <div className="text-editor relative">
            <ReactQuill
                ref={ref}
                theme="bubble"
                value={text}
                onChange={handleChange}
                modules={modules}
            // onFocus={(range, source, editor) => {

            //     // Lấy index dòng hiện tại
            //     const currentLine = editor.getSelection().index;
            //     // Cập nhật state focusedLine
            //     console.log(currentLine);
            //     setFocusedLine(currentLine);

            //     // Lấy element của dòng hiện tại
            //     // const lineElement = ref.current.editor.root.querySelector(`.ql-editor ul li`);
            //     const listItems = ref.current.editor.root.querySelectorAll('.ql-editor ul li');
            //     setListItems([...listItems]);

            //     console.log('listItems', listItems);
            //     for (let i = 0; i < listItems.length; i++) {
            //         listItems[i].style.color = "red";
            //         console.log(listItems[i]);
            //         // listItems[i].onblur = function() {
            //         //     console.log('red');
            //         //     listItems[i].style.color = "red";
            //         // }
            //     }




            //     // Thay đổi màu sắc dòng
            //     // console.log(lineElement);
            //     // lineElement.style.color = "red";
            // }}

            />
            <div onClick={handleAddListItem} className='btnPlus absolute cursor-pointer hidden  right-0 bottom-[0%]'><CiCirclePlus size={20} color='gray' className='' /></div>
        </div>
    )
}

export default CustomToolBarInline;
