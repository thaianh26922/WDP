import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const validationSchema = Yup.object({
  name: Yup.string().required("Nhập tên của bạn"),
  position: Yup.string().required("Chức vụ"),
  phone: Yup.string().required("Số điện thoại"),
  email: Yup.string().required("Email"),
  address: Yup.string().required("Địa chỉ"),
  careerGoals: Yup.string().required("Mục tiêu nghề nghiệp"),
  companyName: Yup.string().required("Tên công ty"),
  startDate: Yup.string().required("Ngày bắt đầu"),
  endDate: Yup.string().required("Ngày kết thúc"),
  jobTitle: Yup.string().required("Tên vị trí"),
  jobDescription: Yup.string().required("Miêu tả công việc"),
  projectName: Yup.string().required("Tên dự án"),
  projectClient: Yup.string().required("Khách hàng"),
  projectRole: Yup.string().required("Vị trí trong dự án"),
  projectTech: Yup.string().required("Công nghệ sử dụng"),
  projectDescription: Yup.string().required("Miêu tả về công nghệ"),
  educationStartDate: Yup.string().required("Ngày bắt đầu"),
  educationEndDate: Yup.string().required("Ngày kết thúc"),
  major: Yup.string().required("Ngành học"),
  schoolName: Yup.string().required("Tên trường học"),
  educationDescription: Yup.string().required("Miêu tả quá trình học tập"),
  skillName: Yup.string().required("Kỹ năng"),
  skillDescription: Yup.string().required("Miêu tả"),
  awardStartDate: Yup.string().required("Ngày bắt đầu"),
  awardEndDate: Yup.string().required("Ngày kết thúc"),
  awardSchoolName: Yup.string().required("Tên trường học"),
  awardDescription: Yup.string().required("Miêu tả quá trình học tập"),
  certProjectName: Yup.string().required("Tên dự án"),
  certStartDate: Yup.string().required("Ngày bắt đầu"),
  certEndDate: Yup.string().required("Ngày kết thúc"),
  certClient: Yup.string().required("Khách hàng"),
});

function SimpleTemplate() {
    const generatePDF = () => {
        const input = document.getElementById('pdf-content');
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save("download.pdf");
          });
      };
  useEffect(() => {
    const contextMenu = document.getElementById("context-menu");
    let editBox;
    const dupElement = document.getElementById("dupElement");
    const removeElement = document.getElementById("removeElement");
    let selectedBox = null;

    function check() {
      editBox = document.querySelectorAll(".editBox");
      editBox.forEach((box) => {
        box.addEventListener("contextmenu", (e) => {
          e.preventDefault();
          contextMenu.style.display = "block";
          contextMenu.style.position = "relative";
          contextMenu.style.left = `${e.pageX}px`;
          contextMenu.style.top = `${e.pageY}px`;
          selectedBox = box;
        });
      });
    }
    check();

    dupElement.addEventListener("click", () => {
      if (selectedBox != null) {
        const newElement = selectedBox.cloneNode(true);
        selectedBox.parentNode.appendChild(newElement);
        check();
      }
    });

    removeElement.addEventListener("click", () => {
      if (selectedBox != null && editBox.length > 1) {
        selectedBox.remove();
      }
    });

    document.addEventListener("click", () => {
      contextMenu.style.display = "none";
    });
  }, []);

  return (
    <div>
      {/* Context menu */}
      <div
        className="border-1 border-black shadow-xl shadow-slate-500 w-fit rounded-md hidden bg-slate-400"
        id="context-menu"
      >
        <ul className="text-white cursor-pointer">
          <li id="dupElement">Nhân đôi thành phần</li>
          <li id="removeElement" className="border-t-2 border-black">
            Xóa thành phần
          </li>
        </ul>
      </div>
      <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">Your Form</div>
          <button
            onClick={generatePDF}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      <div className="shadow-lg shadow-slate-500 px-5 w-[60%] h-auto mx-auto my-5">
        <Formik
          initialValues={{
            name: "",
            position: "",
            phone: "",
            email: "",
            address: "",
            careerGoals: "",
            companyName: "",
            startDate: "",
            endDate: "",
            jobTitle: "",
            jobDescription: "",
            projectName: "",
            projectClient: "",
            projectRole: "",
            projectTech: "",
            projectDescription: "",
            educationStartDate: "",
            educationEndDate: "",
            major: "",
            schoolName: "",
            educationDescription: "",
            skillName: "",
            skillDescription: "",
            awardStartDate: "",
            awardEndDate: "",
            awardSchoolName: "",
            awardDescription: "",
            certProjectName: "",
            certStartDate: "",
            certEndDate: "",
            certClient: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {       
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form  id="pdf-content">
              <div className="flex">
                <div className="flex-[1] mt-3">
                  <Field
                    name="name"
                    className="name text-4xl border-1 border-black w-auto border-dotted font-bold editText"
                    placeholder="Nhập tên của bạn"
                  />
                  {errors.name && touched.name ? <div>{errors.name}</div> : null}
                  <Field
                    name="position"
                    className="text-1xl border-1 border-black w-auto border-dotted mt-3 editText"
                    placeholder="Chức vụ"
                  />
                  {errors.position && touched.position ? <div>{errors.position}</div> : null}
                </div>
                <div className="flex flex-col align-items-center mr-9">
                  <div className="rounded-3xl w-[20px] h-[20px] border-2 border-black bg-black"></div>
                  <div className="border-2 border-black w-0 h-[100px]"></div>
                </div>
                <div className="text-gray-400 italic">
                  <Field
                    name="phone"
                    className="border-1 border-black border-dotted mt-2 pr-16 editText"
                    placeholder="Số điện thoại"
                  />
                  {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
                  <Field
                    name="email"
                    className="border-1 border-black border-dotted mt-2 pr-16 editText"
                    placeholder="Email"
                  />
                  {errors.email && touched.email ? <div>{errors.email}</div> : null}
                  <Field
                    name="address"
                    className="border-1 border-black border-dotted mt-2 pr-16 editText"
                    placeholder="Địa chỉ"
                  />
                  {errors.address && touched.address ? <div>{errors.address}</div> : null}
                </div>
              </div>
              <div className="border-t-2 mt-2 border-black">
                <Field
                  name="careerGoals"
                  className="border-1 border-dotted border-black mt-2 pr-10 editText"
                  placeholder="Mục tiêu nghề nghiệp"
                />
                {errors.careerGoals && touched.careerGoals ? <div>{errors.careerGoals}</div> : null}
              </div>
              <div className="flex align-items-center mt-3">
                <div className="text-2xl font-bold mt-2 flex-shrink-0">
                  KINH NGHIỆM LÀM VIỆC
                </div>
                <div className="w-full h-0 border-1 border-black ml-2"></div>
              </div>
              <div>
                <div>
                  <div className="flex hover:border-2 hover:border-black hover:border-dotted py-2 editBox">
                    <div>
                      <Field
                        name="companyName"
                        className="text-lg border-1 border-black border-dotted editText"
                        placeholder="Tên công ty"
                      />
                      {errors.companyName && touched.companyName ? <div>{errors.companyName}</div> : null}
                      <div className="my-2">
                        <Field
                          name="startDate"
                          className="border-1 border-black border-dotted editText"
                          placeholder="Ngày bắt đầu"
                        />
                        {errors.startDate && touched.startDate ? <div>{errors.startDate}</div> : null}
                        <span className="font-bold text-lg px-2">-</span>
                        <Field
                          name="endDate"
                          className="border-1 border-black border-dotted editText"
                          placeholder="Ngày kết thúc"
                        />
                        {errors.endDate && touched.endDate ? <div>{errors.endDate}</div> : null}
                      </div>
                    </div>
                    <div className="flex flex-col align-items-center mx-5">
                      <div className="rounded-3xl w-[20px] h-[20px] border-2 border-black bg-black"></div>
                      <div className="border-2 border-black w-0 h-[100px] border-dashed"></div>
                    </div>
                    <div>
                      <Field
                        name="jobTitle"
                        className="font-bold text-xl border-1 border-black border-dotted editText"
                        placeholder="Tên vị trí"
                      />
                      {errors.jobTitle && touched.jobTitle ? <div>{errors.jobTitle}</div> : null}
                      <Field
                        name="jobDescription"
                        className="border-1 border-black border-dotted mt-2 editText"
                        placeholder="Miêu tả công việc của bạn"
                      />
                      {errors.jobDescription && touched.jobDescription ? <div>{errors.jobDescription}</div> : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex align-items-center mt-3">
                <div className="text-2xl font-bold mt-2 flex-shrink-0">
                  NHỮNG DỰ ÁN ĐÃ THAM GIA
                </div>
                <div className="w-full h-0 border-1 border-black ml-2"></div>
              </div>
              <div>
                <div>
                  <div className="flex hover:border-2 hover:border-black hover:border-dotted py-2 editBox">
                    <div>
                      <Field
                        name="projectName"
                        className="text-lg border-1 border-black border-dotted editText"
                        placeholder="Tên dự án"
                      />
                      {errors.projectName && touched.projectName ? <div>{errors.projectName}</div> : null}
                      <div className="my-2">
                        <Field
                          name="projectStartDate"
                          className="border-1 border-black border-dotted editText"
                          placeholder="Ngày bắt đầu"
                        />
                        {errors.projectStartDate && touched.projectStartDate ? <div>{errors.projectStartDate}</div> : null}
                        <span className="font-bold text-lg px-2">-</span>
                        <Field
                          name="projectEndDate"
                          className="border-1 border-black border-dotted editText"
                          placeholder="Ngày kết thúc"
                        />
                        {errors.projectEndDate && touched.projectEndDate ? <div>{errors.projectEndDate}</div> : null}
                      </div>
                      <div>
                        <Field
                          name="projectClient"
                          className="border-1 border-black border-dotted editText"
                          placeholder="Khách hàng"
                        />
                        {errors.projectClient && touched.projectClient ? <div>{errors.projectClient}</div> : null}
                      </div>
                    </div>
                    <div className="flex flex-col align-items-center mx-5">
                      <div className="rounded-3xl w-[20px] h-[20px] border-2 border-black bg-black"></div>
                      <div className="border-2 border-black w-0 h-[100px] border-dashed"></div>
                    </div>
                    <div>
                      <Field
                        name="projectRole"
                        className="font-bold text-xl border-1 border-black border-dotted editText"
                        placeholder="Vị trí trong dự án"
                      />
                      {errors.projectRole && touched.projectRole ? <div>{errors.projectRole}</div> : null}
                      <Field
                        name="projectTech"
                        className="border-1 border-black border-dotted mt-2 editText"
                        placeholder="Công nghệ sử dụng"
                      />
                      {errors.projectTech && touched.projectTech ? <div>{errors.projectTech}</div> : null}
                      <Field
                        name="projectDescription"
                        className="border-1 border-black border-dotted mt-2 editText"
                        placeholder="Miêu tả về công nghệ được sử dụng trong dự án"
                      />
                      {errors.projectDescription && touched.projectDescription ? <div>{errors.projectDescription}</div> : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="w-[50%]">
                  <div className="flex align-items-center mt-3">
                    <div className="text-2xl font-bold mt-2 flex-shrink-0">
                      <span className="border-b-4 border-black">HỌC VẤN</span>
                    </div>
                    <div className="w-full h-0 border-1 border-black ml-2"></div>
                  </div>
                  <div>
                    <div>
                      <div className="hover:border-2 hover:border-black hover:border-dotted py-2 editBox">
                        <div>
                          <div className="my-2">
                            <Field
                              name="educationStartDate"
                              className="border-1 border-black border-dotted editText"
                              placeholder="Ngày bắt đầu"
                            />
                            {errors.educationStartDate && touched.educationStartDate ? <div>{errors.educationStartDate}</div> : null}
                            <span className="font-bold text-lg px-2">-</span>
                            <Field
                              name="educationEndDate"
                              className="border-1 border-black border-dotted editText"
                              placeholder="Ngày kết thúc"
                            />
                            {errors.educationEndDate && touched.educationEndDate ? <div>{errors.educationEndDate}</div> : null}
                          </div>
                          <div>
                            <Field
                              name="major"
                              className="border-1 border-black border-dotted editText"
                              placeholder="Ngành học"
                            />
                            {errors.major && touched.major ? <div>{errors.major}</div> : null}
                          </div>
                          <div className="my-2">
                            <Field
                              name="schoolName"
                              className="border-1 border-black border-dotted editText"
                              placeholder="Tên trường học"
                            />
                            {errors.schoolName && touched.schoolName ? <div>{errors.schoolName}</div> : null}
                          </div>
                          <div>
                            <Field
                              name="educationDescription"
                              className="border-1 border-black border-dotted editText"
                              placeholder="Miêu tả quá trình học tập của bạn"
                            />
                            {errors.educationDescription && touched.educationDescription ? <div>{errors.educationDescription}</div> : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mx-2"></div>
                <div className="w-[50%]">
                  <div className="flex align-items-center mt-3">
                    <div className="text-2xl font-bold mt-2 flex-shrink-0">
                      <span className="border-b-4 border-black">KĨ NĂNG</span>
                    </div>
                    <div className="w-full h-0 border-1 border-black ml-2"></div>
                  </div>
                  <div>
                    <div>
                      <div className="flex hover:border-2 hover:border-black hover:border-dotted py-2 editBox">
                        <div>
                          <Field
                            name="skillName"
                            className="text-lg border-1 border-black border-dotted editText"
                            placeholder="Kĩ năng"
                          />
                          {errors.skillName && touched.skillName ? <div>{errors.skillName}</div> : null}
                          <div className="my-2">
                            <Field
                              name="skillDescription"
                              className="border-1 border-black border-dotted editText"
                              placeholder="Miêu tả"
                            />
                            {errors.skillDescription && touched.skillDescription ? <div>{errors.skillDescription}</div> : null}
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
                    <div className="text-2xl font-bold mt-2 flex-shrink-0">
                      <span className="border-b-4 border-black">GIẢI THƯỞNG</span>
                    </div>
                    <div className="w-full h-0 border-1 border-black ml-2"></div>
                  </div>
                  <div>
                    <div>
                      <div className="hover:border-2 hover:border-black hover:border-dotted py-2 editBox">
                        <div>
                          <div className="my-2">
                            <Field
                              name="awardStartDate"
                              className="border-1 border-black border-dotted editText"
                              placeholder="Ngày bắt đầu"
                            />
                            {errors.awardStartDate && touched.awardStartDate ? <div>{errors.awardStartDate}</div> : null}
                            <span className="font-bold text-lg px-2">-</span>
                            <Field
                              name="awardEndDate"
                              className="border-1 border-black border-dotted editText"
                              placeholder="Ngày kết thúc"
                            />
                            {errors.awardEndDate && touched.awardEndDate ? <div>{errors.awardEndDate}</div> : null}
                          </div>
                          <div>
                            <Field
                              name="awardName"
                              className="border-1 border-black border-dotted editText"
                              placeholder="Tên giải thưởng"
                            />
                            {errors.awardName && touched.awardName ? <div>{errors.awardName}</div> : null}
                          </div>
                          <div>
                            <Field
                              name="awardDescription"
                              className="border-1 border-black border-dotted editText"
                              placeholder="Miêu tả quá trình nhận giải thưởng"
                            />
                            {errors.awardDescription && touched.awardDescription ? <div>{errors.awardDescription}</div> : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mx-2"></div>
                <div className="w-[50%]">
                  <div className="flex align-items-center mt-3">
                    <div className="text-2xl font-bold mt-2 flex-shrink-0">
                      <span className="border-b-4 border-black">CHỨNG CHỈ</span>
                    </div>
                    <div className="w-full h-0 border-1 border-black ml-2"></div>
                  </div>
                  <div>
                    <div>
                      <div className="flex hover:border-2 hover:border-black hover:border-dotted py-2 editBox">
                        <div>
                          <Field
                            name="certificateName"
                            className="text-lg border-1 border-black border-dotted editText"
                            placeholder="Tên chứng chỉ"
                          />
                          {errors.certificateName && touched.certificateName ? <div>{errors.certificateName}</div> : null}
                          <div className="my-2">
                            <Field
                              name="certificateStartDate"
                              className="border-1 border-black border-dotted editText"
                              placeholder="Ngày bắt đầu"
                            />
                            {errors.certificateStartDate && touched.certificateStartDate ? <div>{errors.certificateStartDate}</div> : null}
                            <span className="font-bold text-lg px-2">-</span>
                            <Field
                              name="certificateEndDate"
                              className="border-1 border-black border-dotted editText"
                              placeholder="Ngày kết thúc"
                            />
                            {errors.certificateEndDate && touched.certificateEndDate ? <div>{errors.certificateEndDate}</div> : null}
                          </div>
                          <div>
                            <Field
                              name="certificateDescription"
                              className="border-1 border-black border-dotted editText"
                              placeholder="Miêu tả về chứng chỉ"
                            />
                            {errors.certificateDescription && touched.certificateDescription ? <div>{errors.certificateDescription}</div> : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SimpleTemplate;
