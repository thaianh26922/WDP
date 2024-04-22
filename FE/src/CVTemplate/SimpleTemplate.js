import { useEffect, useState } from "react";

function SimpleTemplate() {
    useEffect(() => {

        const contextMenu = document.getElementById('context-menu');
        let editBox;
        const dupElement = document.getElementById('dupElement');
        const removeElement = document.getElementById('removeElement');
        const editText = document.querySelectorAll('.editText');
        let selectedBox = null;

        editText.forEach((text) => {
            text.addEventListener('click', () => {
                const input = document.createElement('textarea');
                input.style.width = `${text.offsetWidth}px`;
                input.style.overflow = 'hidden';
                input.value = text.innerText;
                text.innerHTML = '';
                text.appendChild(input);
                input.focus();
                input.style.outline = 'none';
                input.addEventListener('blur', () => {
                    text.innerHTML = input.value;
                }
                )
                
            })
        })


        function check() {
            editBox = document.querySelectorAll('.editBox');
            editBox.forEach((box) => {
                box.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    contextMenu.style.display = 'block';
                    contextMenu.style.position = 'relative';
                    contextMenu.style.left = `${e.pageX}px`;
                    contextMenu.style.top = `${e.pageY}px`;
                    selectedBox = box;
                })
            });
        }
        check();

        dupElement.addEventListener('click', () => {
            if (selectedBox != null) {
                const newElement = selectedBox.cloneNode(true);
                selectedBox.parentNode.appendChild(newElement);
                check();
            }
        });

        removeElement.addEventListener('click', () => {
            if (selectedBox != null && editBox.length > 1) {
                selectedBox.remove();
            }
        })

        document.addEventListener('click', () => {
            contextMenu.style.display = 'none';
        });



    }, [])



    return (
        <div>
            {/* Context menu */}
            <div className="border-1 border-black shadow-xl shadow-slate-500 w-fit rounded-md hidden bg-slate-400" id="context-menu">
                <ul className="text-white cursor-pointer">
                    <li id="dupElement">Nhân đôi thành phần</li>
                    <li id="removeElement" className="border-t-2 border-black">Xóa thành phần</li>
                </ul>
            </div>

            <div className="shadow-lg shadow-slate-500 px-5 w-[60%] h-auto mx-auto my-5">
                <div className="flex">
                    <div className=" flex-[1] mt-3">
                        <div className="name text-4xl border-1 border-black w-auto border-dotted font-bold editText">Nhập tên của bạn</div>
                        <div className="text-1xl border-1 border-black w-auto border-dotted mt-3 editText">Chức vụ</div>
                    </div>
                    <div className="flex flex-col align-items-center mr-9">
                        <div className="rounded-3xl w-[20px] h-[20px] border-2 border-black bg-black"></div>
                        <div className="border-2 border-black w-0 h-[100px]"></div>
                    </div>
                    <div className="text-gray-400 italic">
                        <div className="border-1 border-black border-dotted mt-2 pr-16 editText">Số điện thoại</div>
                        <div className="border-1 border-black border-dotted mt-2 pr-16 editText">Email</div>
                        <div className="border-1 border-black border-dotted mt-2 pr-16 editText">Địa chỉ</div>
                    </div>
                </div>
                <div className="border-t-2 mt-2 border-black">
                    <div className="border-1 border-dotted border-black mt-2 pr-10 editText">Mục tiêu nghề nghiệp</div>
                </div>
                <div className="flex align-items-center mt-3">
                    <div className="text-2xl font-bold mt-2 flex-shrink-0">KINH NGHIỆM LÀM VIỆC</div>
                    <div className="w-full h-0 border-1 border-black ml-2"></div>
                </div>
                <div>
                    <div>
                        <div className="flex hover:border-2 hover:border-black hover:border-dotted py-2 editBox">
                            <div>
                                <div className="text-lg border-1 border-black border-dotted editText">Tên công ty</div>
                                <div className="my-2">
                                    <span className="border-1 border-black border-dotted editText">Ngày bắt đầu</span>
                                    <span className="font-bold text-lg px-2">-</span>
                                    <span className="border-1 border-black border-dotted editText">Ngày kết thúc</span>
                                </div>
                            </div>
                            <div className="flex flex-col align-items-center mx-5">
                                <div className="rounded-3xl w-[20px] h-[20px] border-2 border-black bg-black"></div>
                                <div className="border-2 border-black w-0 h-[100px] border-dashed"></div>
                            </div>
                            <div>
                                <div className="font-bold text-xl border-1 border-black border-dotted editText">Tên vị trí</div>
                                <div className="border-1 border-black border-dotted mt-2 editText">Miêu tả công việc của bạn</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex align-items-center mt-3">
                    <div className="text-2xl font-bold mt-2 flex-shrink-0">NHỮNG DỰ ÁN ĐÃ THAM GIA</div>
                    <div className="w-full h-0 border-1 border-black ml-2"></div>
                </div>
                <div>
                    <div>
                        <div className="flex hover:border-2 hover:border-black hover:border-dotted py-2 editBox">
                            <div>
                                <div className="text-lg border-1 border-black border-dotted editText">Tên dự án</div>
                                <div className="my-2">
                                    <span className="border-1 border-black border-dotted editText">Ngày bắt đầu</span>
                                    <span className="font-bold text-lg px-2">-</span>
                                    <span className="border-1 border-black border-dotted editText">Ngày kết thúc</span>
                                </div>
                                <div>
                                    <span className="border-1 border-black border-dotted editText">Khách hàng</span>
                                </div>
                            </div>
                            <div className="flex flex-col align-items-center mx-5">
                                <div className="rounded-3xl w-[20px] h-[20px] border-2 border-black bg-black"></div>
                                <div className="border-2 border-black w-0 h-[100px] border-dashed"></div>
                            </div>
                            <div>
                                <div className="font-bold text-xl border-1 border-black border-dotted editText">Vị trí trong dự án</div>
                                <div className="border-1 border-black border-dotted mt-2 editText">Miêu tả vai trò của bạn trong dự án</div>
                                <div className="border-1 border-black border-dotted mt-2 editText">Công nghệ sử dụng</div>
                                <div className="border-1 border-black border-dotted mt-2 editText">Miêu tả về công nghệ được sử dụng trong dự án như thế nào</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-[50%]">
                        <div className="flex align-items-center mt-3">
                            <div className="text-2xl font-bold mt-2 flex-shrink-0"><span className="border-b-4 border-black">HỌC VẤN</span></div>
                            <div className="w-full h-0 border-1 border-black ml-2"></div>
                        </div>
                        <div>
                            <div>
                                <div className="hover:border-2 hover:border-black hover:border-dotted py-2 editBox">
                                    <div>
                                        <div className="my-2">
                                            <span className="border-1 border-black border-dotted editText">Ngày bắt đầu</span>
                                            <span className="font-bold text-lg px-2">-</span>
                                            <span className="border-1 border-black border-dotted editText">Ngày kết thúc</span>
                                        </div>
                                        <div >
                                            <span className="border-1 border-black border-dotted editText">Ngành học</span>
                                        </div>
                                        <div className="my-2">
                                            <span className="border-1 border-black border-dotted editText">Tên trường học</span>
                                        </div>
                                        <div>
                                            <span className="border-1 border-black border-dotted editText">Miêu tả quá trình học tập của bạn</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-2"></div>
                    <div className="w-[50%]">
                        <div className="flex align-items-center mt-3">
                            <div className="text-2xl font-bold mt-2 flex-shrink-0"><span className="border-b-4 border-black">KĨ NĂNG</span></div>
                            <div className="w-full h-0 border-1 border-black ml-2"></div>
                        </div>
                        <div>
                            <div>
                                <div className="flex hover:border-2 hover:border-black hover:border-dotted py-2 editBox">
                                    <div>
                                        <div className="text-lg border-1 border-black border-dotted editText">Kĩ năng</div>
                                        <div className="my-2">
                                            <span className="border-1 border-black border-dotted editText">Miêu tả</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-[50%]">
                        <div className="flex align-items-center mt-3">
                            <div className="text-2xl font-bold mt-2 flex-shrink-0"><span className="border-b-4 border-black">GIẢI THƯỞNG</span></div>
                            <div className="w-full h-0 border-1 border-black ml-2"></div>
                        </div>
                        <div>
                            <div>
                                <div className="hover:border-2 hover:border-black hover:border-dotted py-2 editBox">
                                    <div>
                                        <div className="my-2">
                                            <span className="border-1 border-black border-dotted editText">Ngày bắt đầu</span>
                                            <span className="font-bold text-lg px-2">-</span>
                                            <span className="border-1 border-black border-dotted editText">Ngày kết thúc</span>
                                        </div>
                                        <div>
                                            <span className="border-1 border-black border-dotted editText">Tên trường học</span>
                                        </div>
                                        <div>
                                            <span className="border-1 border-black border-dotted editText">Miêu tả quá trình học tập của bạn</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mx-2"></div>
                    <div className="w-[50%]">
                        <div className="flex align-items-center mt-3">
                            <div className="text-2xl font-bold mt-2 flex-shrink-0"><span className="border-b-4 border-black">CHỨNG CHỈ</span></div>
                            <div className="w-full h-0 border-1 border-black ml-2"></div>
                        </div>
                        <div>
                            <div>
                                <div className="flex hover:border-2 hover:border-black hover:border-dotted py-2 editBox">
                                    <div>
                                        <div className="text-lg border-1 border-black border-dotted editText">Tên dự án</div>
                                        <div className="my-2">
                                            <span className="border-1 border-black border-dotted editText">Ngày bắt đầu</span>
                                            <span className="font-bold text-lg px-2">-</span>
                                            <span className="border-1 border-black border-dotted editText">Ngày kết thúc</span>
                                        </div>
                                        <div>
                                            <span className="border-1 border-black border-dotted editText">Khách hàng</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SimpleTemplate;