import React, { useState } from "react";
import DashboardCustomer from "../Layouts/DashboardCustomer";
import HeaderV2 from "../Util/HeaderV2";
function ListCompanyMod(props) {
  const [togNavBar, setTogNavBar] = useState("Open");
  const [showPopup, setShowPopup] = useState(false); 

  const openPopup = () => {
    setShowPopup(true);
  };


  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <DashboardCustomer
      roleCo3={"Dashboard moderator"}
      setTogNavBar={setTogNavBar}
      togNavBar={togNavBar}
      useNavBarV2={true} 
    >
      <HeaderV2
        hrefType={"Danh sách báo cáo"}
      />
      <main>
        <div class="info-pageCurrent pt-16 pl-10 flex">
          <button class="font-bold py-2 px-4 rounded mr-2 bg-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-6 h-6 mr-2 inline-block align-middle"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M6 12l-2.731-8.875A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
            Gửi phản hồi
          </button>

          <button class="font-bold py-2 px-4 rounded mr-2 bg-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-6 h-6 mr-2 inline-block align-middle"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
            Thùng rác
          </button>

          <div class="relative">
            <input
              type="text"
              class="border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-lg text-sm focus:outline-none"
              placeholder="Tìm kiếm báo cáo"
            />
            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
          </div>
        </div>

        <section
          id="list-feature-jobs"
          className={`grid gap-9 sm:w-[509px] mx-5 mt-5 mb-5 ease-in-out duration-500 ${
            togNavBar === "Close" ? " lg:w-[1373px]" : "lg:w-[1166px]"
          }`}
        >
          <div className="col-span-3">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-white uppercase bg-blue-900">
                  <tr>
                    <th scope="col" class="px-3 py-3 text-center">
                      Người gửi
                    </th>
                    <th scope="col" className="px-3 py-3 text-center">
                      Nội dung
                    </th>
                    <th scope="col" className="px-3 py-3 text-center">
                      Ngày gửi
                    </th>
                    <th scope="col" class="px-3 py-3 text-center">
                      Quản lý
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(function func() {
                    const items = [];
                    for (let index = 0; index < 10; index++) {
                      items.push(
                        <tr class="bg-white border-b border-gray-200">
                          <th
                            scope="row"
                            class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap text-center"
                          >
                            lamtt@gmail.com
                          </th>
                          <td class="px-3 py-4 text-gray-900 text-center">
                            Báo cáo tin tuyển dụng của công ty TNHH Ocean
                            Dragon. Kính gửi lorem ipsum dolor sit ...
                          </td>

                          <td class="px-3 py-4 text-gray-900">21/01/2024</td>
                          <td class="px-3 py-4 text-center font-medium">
                            <span class="mr-3 text-green-600" onClick={openPopup}>Phản hồi</span>
                            <span class="ml-3 text-red-600">Xóa</span>
                          </td>
                        </tr>
                      );
                    }
                    return items;
                  })()}
                </tbody>
              </table>
            </div>
          </div>
          {/* //////////////////// */}
          <div className="flex items-center">
            <button
              disabled
              className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                ></path>
              </svg>
              Previous
            </button>
            <div className="flex items-center gap-2">
              <button
                className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg bg-orange-600 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  1
                </span>
              </button>
              <button
                className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  2
                </span>
              </button>
              <button
                className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  3
                </span>
              </button>
              <button
                className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  4
                </span>
              </button>
              <button
                className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  5
                </span>
              </button>
            </div>
            <button
              className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                ></path>
              </svg>
            </button>
          </div>
        </section>
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-[500px]">
              <h2 className="text-lg font-semibold mb-4">Nhập nội dung báo cáo</h2>
              <textarea
                className="w-full h-32 border rounded-lg p-2 mb-4"
                placeholder="Nhập nội dung báo cáo..."
              ></textarea>
              <div className="flex justify-end">
                <button
                  className="bg-blue-900 hover:bg-blue-950 text-white font-semibold py-2 px-4 rounded-lg mr-2"
                  onClick={closePopup}
                >
                  Hủy
                </button>
                <button
                  className="bg-orange-600 hover:bg-orange-650 text-white font-semibold py-2 px-4 rounded-lg"
                  onClick={closePopup}
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </DashboardCustomer>
  );
}

export default ListCompanyMod;
