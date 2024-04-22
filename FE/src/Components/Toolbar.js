import { useEffect } from "react";
import { Container } from "react-bootstrap";

function Toolbar() {

    useEffect(() => {
        const btns = document.querySelectorAll(".btn-align");
        console.log(btns);
        btns.forEach(btn => {
            btn.addEventListener("click", () => {
                console.log("Clicked");
                btns.forEach(btn => {
                    btn.style.backgroundColor = 'white';   
                });
                btn.style.backgroundColor = 'green';   
            });
        });
    }, []);
    return (
        <div className="shadow-lg p-3 bg-light p-3 fixed-top">
            <Container className="d-flex justify-content-center">
                <span className="border-end border-black px-5">Font chữ</span>
                <span className="border-end border-black px-5">Cỡ chữ</span>
                <span className="border-end border-black px-5">
                    <button type="button" className="mx-1 border-0  btn-align p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-text-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </button>
                    <button type="button" className="mx-1 border-0 btn-align p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-text-center" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </button>
                    <button type="button" className="mx-1 border-0 btn-align p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-text-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </button>

                </span>
                <span className="border-end border-black px-5">Màu chữ</span>
                <span className="px-5">Khoảng cách dòng
                    <select className="border-0 px-3">
                        <option>1.2</option>
                        <option>1.3</option>
                        <option>1.4</option>
                        <option>1.5</option>
                    </select>
                </span>
            </Container>
        </div>
    );
}


export default Toolbar; 