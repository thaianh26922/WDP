import { useEffect, useRef, useState } from "react";
import Default from "../Layouts/Default";
import socketIOClient from "socket.io-client";
import NoFooter from "../Layouts/NoFooter";
import { useSelector } from "react-redux";


function ChatWithHR({type}) {
    const host = "http://localhost:8080";
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const socketRef = useRef();
    const [mess, setMess] = useState([]);
    const [message, setMessage] = useState('');
    const [id, setId] = useState();
    const  [user, setUser] = useState({});  

    useEffect(() => {
        const boxChat = document.querySelectorAll('.box-chat');
        const userChat = document.getElementById('chat-area');
        const chatArea = document.getElementById('user-chat');

        boxChat.forEach((item) => {
            item.addEventListener('click', () => {
                boxChat.forEach((item) => {
                    item.classList.remove('bg-[#f0f0f0ff]');
                });
                item.classList.add('bg-[#f0f0f0ff]');
            });
        });

        userChat.addEventListener('keydown', (event) => {
            // Xử lí ki người dùng nhấn enter
            if (event.keyCode === 13 && userChat.value !== '') {
                chatArea.appendChild(document.createElement('div')).innerHTML = `<div class="bg-[#203066ff] rounded-3xl p-2 w-auto text-white">${userChat.value}</div>`;
                userChat.value = '';
            }
        });

        socketRef.current = socketIOClient.connect(host)
        socketRef.current.on('getId', data => {
            setId(data)
        })

        socketRef.current.on('sendDataServer', dataGot => {
            setMess(oldMsgs => [...oldMsgs, dataGot.data])
        })

        return () => {
            socketRef.current.disconnect();
        };


    }, []);

    const sendMessage = () => {
        if(type === '2'){
            setUser(JSON.parse(sessionStorage.getItem('staff')));
        } else {
            setUser(JSON.parse(sessionStorage.getItem('user')));
        }
        if (message !== null && user) {
            const msg = {
                content: message,
                id: user._id
            }
            socketRef.current.emit('sendDataClient', msg)
            setMessage('')
        }
    }

    const myChat = mess.filter(m => m.id == id);
    const ortherChat = mess.filter(m => m.id != id);

    const renderOrtherMess = ortherChat.map((m, index) =>
        <div key={index} className="bg-[#5baac9ff] rounded-3xl p-2 w-max">
            <p> {m.content}</p>
        </div>
    )

    const renderMyMess = myChat.map((m, index) => (
        <div key={index} className="bg-[#203066ff] rounded-3xl p-2 w-auto text-white">
            <p>{m.content}</p>
        </div>
    ));



    return (
        <NoFooter type={type}>
            <div className="flex w-full relative">
                <div id="side-name-chat" className="flex flex-col w-[25%] border-r-2 border-[#f0f0f0ff] overflow-y-auto h-screen gap-3 p-2">
                    {array.map((item, index) => {
                        return (
                            <div className="flex align-items-center gap-3 box-chat">
                                <div id="avatar">
                                    <img src="https://via.placeholder.com/150" alt="avatar" className="h-[80px] w-[80px] object-fill rounded-full" />
                                </div>
                                <div id="name">
                                    <h2>Nguyễn Văn A</h2>
                                    <div className="small italic">Công ty TNHH Wecan Group</div>
                                </div>
                                <div className="rounded-full bg-red-500 h-[30px] w-[30px] text-center text-white p-1">1</div>
                            </div>
                        )
                    })}
                </div>
                <div id="chat-box" className="w-full h-screen">

                    <div className="px-[5%]  py-[1%] shadow-lg">
                        <div className="flex align-items-center gap-3 box-chat">
                            <div id="avatar">
                                <img src="https://via.placeholder.com/150" alt="avatar" className="h-[80px] w-[80px] object-fill rounded-full" />
                            </div>
                            <div id="name">
                                <h2>Nguyễn Văn A</h2>
                                <div className="small italic">Công ty TNHH Wecan Group</div>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 overflow-auto h-[800px]">
                        <div id="client-chat" className="flex gap-3">
                            <div id="avatar">
                                <img src="https://via.placeholder.com/150" alt="avatar" className="h-[40px] w-[40px] object-fill rounded-full" />
                            </div>
                            <div id="client-chat-content" className="flex flex-col gap-3">
                                <div className="bg-[#5baac9ff] rounded-3xl p-2 w-max">
                                    <p>Hello</p>
                                </div>
                                <div className="bg-[#5baac9ff] rounded-3xl p-2 w-max">
                                    <p>Xin chào em</p>
                                </div>
                                {renderOrtherMess}
                            </div>
                        </div>
                        <div id="user-chat" className="flex flex-col align-items-end gap-3">
                            <div className="bg-[#203066ff] rounded-3xl p-2 w-auto text-white">
                                <p>Hello</p>
                            </div>
                            {/* {array.map((item, index) => ( */}
                            <div className="bg-[#203066ff] rounded-3xl p-2 w-auto text-white">
                                <p>Hello chị</p>
                            </div>
                            {/* ))} */}
                            {renderMyMess}

                        </div>
                    </div>

                    <div className="h-[5%] w-auto absolute bottom-[2%] left-[30%]">
                        <input type="text" id="chat-area" value={message} onEnter={sendMessage} onChange={e => setMessage(e.target.value)} className="xl:w-[1200px] h-full bg-[#d9d9d9ff] rounded-3xl px-2 outline-none relative" />
                        <span className="inline-block" onClick={sendMessage}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-right-square-fill absolute bottom-3 right-3" viewBox="0 0 16 16">
                            <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1" />
                        </svg></span>
                    </div>
                </div>
            </div>
        </NoFooter>
    );
}

export default ChatWithHR;