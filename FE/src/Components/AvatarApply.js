import { useEffect } from "react";

function AvatarApply({ display }) {

    useEffect(() => {
        // Open avatar apply
        const avatar = document.getElementById('avatar-apply');
        if (display === -1) {
            avatar.style.display = 'flex';
            avatar.style.flexDirection = 'column';
            avatar.style.alignItems = 'center';
        } else {
            avatar.style.display = 'none';
        }

        // Close avatar apply
        const closeBtn = document.getElementById('close-button');
        closeBtn.addEventListener('click', () => {
            avatar.style.display = 'none';
        });
    }, [display]);

    return (
        <div className=" absolute bg-[#bbbfbc] bg-opacity-25 left-0 top-0 right-0 bottom-0" id="avatar-apply">
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="w-[50%] h-[50%] bg-white rounded-md">
                <div className="h-auto border-b-2 py-2"><span className="mx-3 font-bold text-2xl">Cập nhật ảnh đại diện</span></div>
                <div className="grid grid-flow-col grid-cols-3 gap-2 h-[70%] py-2">
                    <div className="col-span-2 text-center container">
                        <span className="text-lg">Ảnh gốc</span>
                        <div className="bg-[#f0f1f5ff] w-full h-[80%] rounded-md border-1 border-black border-dashed">
                            
                        </div>
                    </div>
                    <div className=" col-span-1 text-center">
                       <span className="text-lg">Ảnh hiển thị trên CV</span>
                    </div>
                </div>
                <div className="h-auto border-t-2 py-2 flex justify-center">
                    <button className="bg-[#edededff] p-2 m-2 rounded-md" id="close-button">Đóng lại</button>
                    <button className="bg-green-400 p-2 m-2 rounded-md text-white">Hoàn tất</button>
                </div>
            </div>
        </div>
    )
}

export default AvatarApply;