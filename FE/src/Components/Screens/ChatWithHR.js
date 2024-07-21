import { useEffect, useRef, useState } from "react";
import Default from "../Layouts/Default";
import socketIOClient from "socket.io-client";
import NoFooter from "../Layouts/NoFooter";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client'
import Img1 from '../../assets/img1.jpg'
import tutorialsdev from '../../assets/tutorialsdev.png'
import Input from '../Input/index.js'
import Cookies from 'js-cookie';

function ChatWithHR({ type }) {
	const getUsers = useSelector(state => state.users.currentUser);

	const [user, setUser] = useState(getUsers);
	const [conversations, setConversations] = useState([])
	const [messages, setMessages] = useState({})
	const [message, setMessage] = useState('')
	const [users, setUsers] = useState([])
	const [socket, setSocket] = useState(null)
	const messageRef = useRef(null)
	const companydetail = useSelector((state) => state.companies.companyDetail);
	const loggedInUser = useSelector((state) => state.users.currentUser);
	const staff = JSON.parse(sessionStorage.getItem('staff')); // Parse JSON string to an object

	function isEmpty(obj) {
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				return false;
			}
		}
		return true;
	}
	const fetchAndSetConversations = async () => {
		const getId = '';

		if (!isEmpty(loggedInUser)) {
			var res = await fetch(`http://localhost:9999/api/conversations/${loggedInUser?._id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			});
		} else {
			var res = await fetch(`http://localhost:9999/api/conversations/${staff?._id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			});
		}

		const resData = await res.json();
		console.log(resData);
		if (!isEmpty(companydetail) && resData !== null) {
			var findReceiver = resData.find(value => {
				return value.user.receiverId === companydetail?.hr._id;
			});
		}

		if (findReceiver == null && !isEmpty(companydetail)) {
			console.log("no conversation");
			await createNewConversation(loggedInUser._id, companydetail?.hr._id);
			fetchAndSetConversations(); // Gọi lại hàm fetchAndSetConversations
		} else {
			console.log(resData);
			setConversations(resData);
		}
	};

	const createNewConversation = async (senderId, receiverId) => {
		const resNew = await fetch(`http://localhost:9999/api/conversation`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				senderId,
				receiverId
			})
		});
		const resNewData = await resNew.json();
		console.log(resNewData);
		return resNewData;
	};

	useEffect(() => {
		fetchAndSetConversations();
	}, []);
	console.log(conversations);
	useEffect(() => {
		setSocket(io('http://localhost:8081'))
	}, [])

	useEffect(() => {
		console.log(user);
		if (isEmpty(user)) {
			socket?.emit('addUser', staff?._id);
		} else {
			socket?.emit('addUser', user?._id);
		}
		socket?.on('getUsers', users => {
			console.log('activeUsers :>> ', users);
		})
		socket?.on('getMessage', data => {
			console.log(data);
			setMessages(prev => ({
				...prev,
				messages: [...prev.messages, { user: data.user, message: data.message }]
			}))
		})
	}, [socket])

	useEffect(() => {
		messageRef?.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages?.messages])


	useEffect(() => {
		const fetchUsers = async () => {
			const res = await fetch(`http://localhost:9999/api/users/${user?._id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			});
			const resData = await res.json()
			setUsers(resData)
		}
		fetchUsers()
	}, [])

	const fetchMessages = async (conversationId, receiver) => {
		console.log(receiver);
		const res = await fetch(`http://localhost:9999/api/message/${conversationId}?senderId=${user?._id}&&receiverId=${receiver?._id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		});
		const resData = await res.json()
		setMessages({ messages: resData, receiver, conversationId })
	}

	const sendMessage = async (e) => {
		setMessage('')
		if (isEmpty(user)) {
			socket?.emit('sendMessage', {
				senderId: staff?._id,
				receiverId: messages?.receiver?.receiverId,
				message,
				conversationId: messages?.conversationId
			});
			const res = await fetch(`http://localhost:9999/api/message`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					conversationId: messages?.conversationId,
					senderId: staff?._id,
					message,
					receiverId: messages?.receiver?.receiverId
				})
			});
		} else {
			socket?.emit('sendMessage', {
				senderId: user?._id,
				receiverId: messages?.receiver?.receiverId,
				message,
				conversationId: messages?.conversationId
			});
			const res = await fetch(`http://localhost:9999/api/message`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					conversationId: messages?.conversationId,
					senderId: user?._id,
					message,
					receiverId: messages?.receiver?.receiverId
				})
			});
		}


	}

	return (
		<div className='w-screen flex'>
			<div className='w-[25%] h-screen bg-secondary overflow-scroll'>
				<div className='flex items-center my-8 mx-14'>
					<div><img src={tutorialsdev} width={75} height={75} className='border border-primary p-[2px] rounded-full' /></div>
					<div className='ml-8'>
						<h3 className='text-2xl'>{user?.username}</h3>
						<p className='text-lg font-light'>My Account</p>
					</div>
				</div>
				<hr />
				<div className='mx-14 mt-10'>
					<div className='text-primary text-lg'>Messages</div>
					<div>
						{
							conversations.length > 0 ?
								conversations.map(({ conversationId, user }) => {
									return (
										<div className='flex items-center py-8 border-b border-b-gray-300'>
											<div className='cursor-pointer flex items-center' onClick={() => fetchMessages(conversationId, user)}>
												<div><img src={Img1} className="w-[60px] h-[60px] rounded-full p-[2px] border border-primary" /></div>
												<div className='ml-6'>
													<h3 className='text-lg font-semibold'>{user?.username}</h3>
													<p className='text-sm font-light text-gray-600'>{user?.email}</p>
												</div>
											</div>
										</div>
									)
								}) : <div className='text-center text-lg font-semibold mt-24'>No Conversations</div>
						}
					</div>
				</div>
			</div>
			<div className='w-[75%] h-screen bg-white flex flex-col items-center'>
				{
					messages?.receiver?.username &&
					<div className='w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-14 py-2'>
						<div className='cursor-pointer'><img src={Img1} width={60} height={60} className="rounded-full" /></div>
						<div className='ml-6 mr-auto'>
							<h3 className='text-lg'>{messages?.receiver?.username}</h3>
							<p className='text-sm font-light text-gray-600'>{messages?.receiver?.email}</p>
						</div>
						<div className='cursor-pointer'>
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone-outgoing" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
								<line x1="15" y1="9" x2="20" y2="4" />
								<polyline points="16 4 20 4 20 8" />
							</svg>
						</div>
					</div>
				}
				<div className='h-[75%] w-full overflow-scroll shadow-sm'>
					<div className='p-14'>
						{
							messages?.messages?.length > 0 ?
								messages.messages.map(({ message, user: { id } = {} }) => {
									return (
										<>
											<div className={`max-w-[40%] rounded-b-xl p-4 mb-6 ${id === (isEmpty(user) ? staff._id : user?._id) ? 'bg-primary text-white rounded-tl-xl ml-auto' : 'bg-secondary rounded-tr-xl'}`}>{message}</div>
											<div ref={messageRef}></div>
										</>

									)
								}) : <div className='text-center text-lg font-semibold mt-24'>No Messages or No Conversation Selected</div>
						}
					</div>
				</div>
				{
					messages?.receiver?.username &&
					<div className='p-14 w-full flex items-center'>
						<Input placeholder='Type a message...' value={message} onChange={(e) => setMessage(e.target.value)} className='w-[75%]' inputClassName='p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none' />
						<div className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${!message && 'pointer-events-none'}`} onClick={() => sendMessage()}>
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<line x1="10" y1="14" x2="21" y2="3" />
								<path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
							</svg>
						</div>
						<div className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${!message && 'pointer-events-none'}`}>
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<circle cx="12" cy="12" r="9" />
								<line x1="9" y1="12" x2="15" y2="12" />
								<line x1="12" y1="9" x2="12" y2="15" />
							</svg>
						</div>
					</div>
				}
			</div>

		</div>
	)
}

export default ChatWithHR;