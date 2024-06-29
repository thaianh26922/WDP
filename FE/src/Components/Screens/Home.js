import Default from "../Layouts/Default";
import background from "../../Image/background.jpg";
import Select from "react-select";
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../Store/jobCategorySlice";
import { getAllPost } from "../../Store/jobPostSlice";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

const time = [
    { value: 'Fulltime', label: 'Toàn thời gian' },
    { value: 'Partime', label: 'Bán thời gian' },
];
const location = [
    { value: 'Hà Nội', label: 'Hà Nội' },
    { value: 'Thành Phố Hồ Chí Minh', label: 'Thành Phố Hồ Chí Minh' },
];
function Home() {
    const dispatch = useDispatch();
    const jobCategory = useSelector((state) => state.jobCategory.categoryArr);
    const options = jobCategory.map(item => {
        return {
            value: item._id,
            label: item.name
        };
    });
    const [postArr, setPost] = useState([])
    useEffect(() => {
        dispatch(getAllCategory());
        dispatch(getAllPost());
    }, [dispatch]);
    const post =  useSelector(state => state.jobPost.postArr);
    console.log(post);
    const fetchPostbyUser = async (idUser) => {
            try{
                const postByUser =await axios.get(`http://localhost:9999/api/cv/${idUser}/chucvu`) ;
            console.log(postByUser.data.chucvu );
            console.log(options);
            const filteredResults = post.filter(item => {
                return options.some(option => 
                    item.jobCategory._id === option.value && option.label === postByUser.data.chucvu
                );
            });
            
            console.log(filteredResults);
            setPost(filteredResults);
            }catch{
                setPost(post)

            }
        }
        const [user, setUser] = useState(() => {
            const userProfile = Cookies.get("user-profile");
            return userProfile ? JSON.parse(userProfile) : null; // Hoặc giá trị mặc định khác
          });
        useEffect(() => {
        if(user != null){
            fetchPostbyUser(user._id)
        }else{
            setPost(post)
        }
    }, [post]);
    const handleSearch = (event) => {
        const filteredResults = post.filter(item => {
            return item.jobCategory._id == selectedOption.value
        });
        console.log(filteredResults);
        setPost(filteredResults);
    };
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedTime, setSelectedTime] = useState(time[0]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState([]);
    const [fragment, setFragment] = useState(1);
    useEffect(() => {
        const classification = document.querySelectorAll('.classification');
        classification.forEach((item) => {
            item.addEventListener('click', () => {
                classification.forEach((item) => {
                    item.style.border = 'none';
                })
                item.style.borderBottom = '5px solid #f25b29ff';
            })
        })

        axios.get('http://localhost:9999/api/job-category/get-all-categories').then((res) => {
            setSelectedPosition(res.data);
        }).catch((err) => {
            console.log(err);
        })

        // async function fetchData() {
        //     selectedPosition.forEach((item) => {
        //         options.push({ value: item._id, label: item.name });
        //     });
        // }
        // fetchData();

    }, [])

    function filterByCategory(event) {

    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-CA'); // Định dạng theo tiêu chuẩn ISO (YYYY-MM-DD)
    };

    return (
        <Default>
            <div className="relative">
                <img src={background} alt="background" className="w-ful object-cover opacity-90" />
                <div className="absolute text-center bottom-0 left-[32em] translate-y-[-30%]">
                    <span className="text-5xl font-serif font-semibold text-white ">Tham gia cùng BestCV !</span>
                    <p className="text-white text-lg">Tại BestCV, chúng tôi tin rằng con người là tài sản quý báu nhất. <br />
                        Chúng tôi không chỉ tạo ra môi trường  làm việc đáng sống mà còn cung cấp cơ hội phát triển sự nghiệp của bạn</p>
                    <div className="mx-auto flex">
                        <Select
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                            className="w-[20%] h-full mt-5 rounded-lg p-2"
                            placeholder="Chọn lĩnh vực"
                        />
                        <Select
                            defaultValue={selectedTime}
                            onChange={setSelectedTime}
                            options={time}
                            className="w-[20%] h-full mt-5 rounded-lg p-2"
                        />
                        <Select
                            defaultValue={''}
                            onChange={''}
                            options={location}
                            placeholder="Chọn địa điểm"
                            className="w-[20%] h-full mt-5 rounded-lg p-2"
                        />
                        <InputGroup className="w-[20%] h-full mt-5 rounded-lg p-2">
                            <InputGroup.Text><i class="fa-solid fa-magnifying-glass"></i></InputGroup.Text>
                            <Form.Control id="inlineFormInputGroup" placeholder="Nhập vị trí chức danh" />
                        </InputGroup>
                        <div className="w-[20%] h-full mt-5 rounded-lg p-2">
                            <Button className="w-full font-bold bg-yellow-500 text-black hover:bg-yellow-500 hover:outline-white" onClick={event => handleSearch(event)}>Tìm kiếm</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-16">
                <span className="text-5xl text-[#203066ff] font-serif">Cơ hội việc làm</span>
                <p className="text-lg mt-3">Tại BestCV, chúng tôi tin rằng con người là tài sản quý báu nhất. <br />
                    Chúng tôi không chỉ tạo ra môi trường  làm việc đáng sống mà còn cung cấp cơ hội phát triển sự nghiệp của bạn</p>
                <div className="flex text-xl font-bold mx-auto w-3/5 justify-between mt-5 font-['time']">
                    <span className="classification">Vị trí lãnh đạo</span>
                    <span className="classification">Cần có kinh nghiệm</span>
                    <span className="classification">Người mới tốt nghiệp</span>
                    <span className="classification">Tuyển thực tập</span>
                </div>
            </div>
            <div className="flex flex-wrap gap-3 mx-auto w-[80%] mb-3 mt-5">
                {/* Phần dành cho in những thông tin */}
                {
                    postArr.map((value) => {
                        return (
                            <div className="w-[24%] rounded-lg shadow-xl shadow-slate-300 p-3 flex flex-col">
                                <div className="flex flex-col">
                                    <div className="flex flex-col">
                                        <span className="font-bold ">{value.title}</span>
                                        <div className="py-3 ">{value.jobDescription}</div>
                                    </div>
                                    <p className="mt-auto flex-shrink-0">
                                        <span className="font-bold">Yêu cầu:</span>
                                        <div dangerouslySetInnerHTML={{ __html: value.candidateReq }} />
                                    </p>
                                </div>
                                <div className="mt-auto flex-shrink-0 border-t-2">
                                    <div>Hạn ứng tuyển: <span className="font-bold">{formatDate(value.deadline)}</span></div>
                                    <div>Địa điểm: <span className="font-bold">{value.location}</span></div>
                                    <div>
                                    <Link to={`/cac-cong-ty-con/company_id=${value.companyId._id}`} className='px-7 py-2 bg-green-600 text-white rounded-md mr-4 font-thin' >Chi tiết</Link>
                                        <button className="text-white bg-[#f25b29ff] rounded-md px-4 py-2 m-2"> Ứng tuyển</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }


                <button className="text-white bg-[#f25b29ff] rounded-md px-4 py-2 m-2 hover:bg-[#f25b29ff] outline-none mx-auto">Xem thêm</button>
            </div>
            <div className="ml-[15%]">
                <p className="text-2xl font-['time'] font-bold text-[#203066ff]">Các công ty thành viên khác</p>
                <p>Hãy cùng chúng tôi chia sẻ niềm đam mê với biển cả tham gia vào các sự kiện độc đáo mà <br />
                    chúng tôi tổ chức tại Dragon Ocean</p>
            </div>
            <div className="flex flex-wrap gap-3 mx-auto w-3/4 mb-3 mt-5">
                {/* Phần dành cho in những thông tin */}
                <div className="w-[32%] rounded-lg shadow-xl shadow-slate-300 p-3 flex flex-col">
                    <div className="flex flex-col mb-2">
                        <div className="flex flex-col">
                            <img src={background} alt="background" className="w-full h-[200px] object-cover" />
                            <span className="font-bold mt-2">Công ty cổ phần TMDV HGD. Công ty cổ phần TMDV HGD. Công ty cổ phần TMDV HGD</span>
                        </div>
                    </div>
                    <div className="mt-auto flex-shrink-0 border-t-2">
                        <div>
                            <button className="text-white small bg-[#141a45ff] rounded-md px-4 py-2 m-2 w-[45%]">Tìm hiểu thêm</button>
                            <button className="text-white small bg-[#f25b29ff] rounded-md px-4  py-2 m-2 w-[45%]"> Cơ hội việc làm</button>
                        </div>
                    </div>
                </div>

                <div className="w-[32%] rounded-lg shadow-xl shadow-slate-300 p-3 flex flex-col">
                    <div className="flex flex-col mb-2">
                        <div className="flex flex-col">
                            <img src={background} alt="background" className="w-full h-[200px] object-cover" />
                            <span className="font-bold mt-2">Công ty cổ phần TMDV HGD. Công ty cổ phần TMDV HGD. Công ty cổ phần TMDV HGD</span>
                        </div>
                    </div>
                    <div className="mt-auto flex-shrink-0 border-t-2">
                        <div>
                            <button className="text-white small bg-[#141a45ff] rounded-md px-4 py-2 m-2 w-[45%]">Tìm hiểu thêm</button>
                            <button className="text-white small bg-[#f25b29ff] rounded-md px-4  py-2 m-2 w-[45%]"> Cơ hội việc làm</button>
                        </div>
                    </div>
                </div>

                <div className="w-[32%] rounded-lg shadow-xl shadow-slate-300 p-3 flex flex-col">
                    <div className="flex flex-col mb-2">
                        <div className="flex flex-col">
                            <img src={background} alt="background" className="w-full h-[200px] object-contain" />
                            <span className="font-bold mt-2">Công ty cổ phần TMDV HGD. Công ty cổ phần TMDV HGD. Công ty cổ phần TMDV HGD</span>
                        </div>
                    </div>
                    <div className="mt-auto flex-shrink-0 border-t-2">
                        <div>
                            <button className="text-white small bg-[#141a45ff] rounded-md px-4 py-2 m-2 w-[45%]">Tìm hiểu thêm</button>
                            <button className="text-white small bg-[#f25b29ff] rounded-md px-4  py-2 m-2 w-[45%]"> Cơ hội việc làm</button>
                        </div>
                    </div>
                </div>
                {/* Phân trang */}
                <div className="flex gap-2 font-bold align-items-center">
                    <i className="fa-solid fa-angle-left font-bold" id="left-angle" onClick={() => setFragment(fragment - 4)}></i>
                    <div className="rounded-lg border-1 py-2 px-3 border-[#a5abb0ff]">{fragment < 0 ? setFragment(0) : fragment}</div>
                    <div className="rounded-lg border-1 py-2 px-3 border-[#a5abb0ff]">{fragment + 1}</div>
                    <div className="rounded-lg border-1 py-2 px-3 border-[#a5abb0ff]">{fragment + 2}</div>
                    <div className="rounded-lg border-1 py-2 px-3 border-[#a5abb0ff]">{fragment + 3}</div>
                    <div className="rounded-lg border-1 py-2 px-3 border-[#a5abb0ff]">...</div>
                    <i className="fa-solid fa-angle-right font-bold" id="right-angle" onClick={() => setFragment(fragment + 4)}></i>
                </div>




            </div>
        </Default>
    )
}

export default Home;