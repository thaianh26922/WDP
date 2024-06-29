import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";  // Import axios
import Cookies from "js-cookie";  // Import js-cookie
const validationSchema = Yup.object({
  name: Yup.string().required("Nhập tên của bạn"),
  position: Yup.string().required("Chức vụ"),
  phone: Yup.string().required("Số điện thoại"),
  email: Yup.string().required("Email"),
  address: Yup.string().required("Địa chỉ"),
  careerGoals: Yup.string().required("Mục tiêu nghề nghiệp"),
  experience: Yup.array().of(
    Yup.object({
      companyName: Yup.string().required("Tên công ty"),
      from: Yup.string().required("Ngày bắt đầu"),
      to: Yup.string().required("Ngày kết thúc"),
      jobName: Yup.string().required("Tên vị trí"),
      jobDescription: Yup.string().required("Miêu tả công việc"),
    })
  ),
  project: Yup.array().of(
    Yup.object({
      projectName: Yup.string().required("Tên dự án"),
      from: Yup.string().required("Ngày bắt đầu"),
      to: Yup.string().required("Ngày kết thúc"),
      customer: Yup.string().required("Khách hàng"),
      projectScope: Yup.string().required("Công nghệ sử dụng"),
      projectDescription: Yup.string().required("Miêu tả về công nghệ"),
    })
  ),
  education: Yup.object({
    from: Yup.string().required("Ngày bắt đầu"),
    to: Yup.string().required("Ngày kết thúc"),
    chuyennganh: Yup.string().required("Ngành học"),
    school: Yup.string().required("Tên trường học"),
    description: Yup.string().required("Miêu tả quá trình học tập"),
  }),
  skill: Yup.object({
    skill: Yup.string().required("Kỹ năng"),
    description: Yup.string().required("Miêu tả"),
  }),
  awards: Yup.array().of(
    Yup.object({
      from: Yup.string().required("Ngày bắt đầu"),
      to: Yup.string().required("Ngày kết thúc"),
      awardName: Yup.string().required("Tên giải thưởng"),
      awardDescription: Yup.string().required("Miêu tả giải thưởng"),
    })
  ),
  certificate: Yup.array().of(
    Yup.object({
      from: Yup.string().required("Ngày bắt đầu"),
      to: Yup.string().required("Ngày kết thúc"),
      certificateDes: Yup.string().required("Miêu tả chứng chỉ"),
    })
  ),
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
  const [user, setUser] = useState(JSON.parse(Cookies.get("user-profile")))
  const userId = user._id;
  const handleSaveCV = (values) => {
    console.log(values);
    const formattedValues = {
      ...values,
      experience: values.experience.map(exp => ({
        companyName: exp.companyName,
        from: new Date(exp.from),
        to: new Date(exp.to),
        jobName: exp.jobName,
        jobDescription: exp.jobDescription,
      })),
      project: values.project.map(proj => ({
        projectName: proj.projectName,
        from: new Date(proj.from),
        to: new Date(proj.to),
        customer: proj.customer,
        projectScope: proj.projectScope,
        projectDescription: proj.projectDescription,
      })),
      education: {
        from: new Date(values.education.from),
        to: new Date(values.education.to),
        chuyennganh: values.education.chuyennganh,
        school: values.education.school,
        description: values.education.description,
      },
      skill: {
        skill: values.skill.skill,
        description: values.skill.description,
      },
      awards: values.awards.map(award => ({
        from: new Date(award.from),
        to: new Date(award.to),
        awardName: award.awardName,
        awardDescription: award.awardDescription,
      })),
      certificate: values.certificate.map(cert => ({
        from: new Date(cert.from),
        to: new Date(cert.to),
        certificateDes: cert.certificateDes,
      })),
      idUser: userId,
    };

    axios.post("http://localhost:9999/api/tao-cv", formattedValues)
      .then((response) => {
        console.log("CV saved successfully", response.data);
      })
      .catch((error) => {
        console.error("There was an error saving the CV!", error);
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
            chucvu: "",
            phone: "",
            email: "",
            address: "",
            muctieu: "",
            experience: [{ companyName: "", from: "", to: "", jobName: "", jobDescription: "" }],
            project: [{ projectName: "", from: "", to: "", customer: "", projectScope: "", projectDescription: "" }],
            education: { from: "", to: "", chuyennganh: "", school: "", description: "" },
            skill: { skill: "", description: "" },
            awards: [{ from: "", to: "", awardName: "", awardDescription: "" }],
            certificate: [{ from: "", to: "", certificateDes: "" }],
          }}
          // validationSchema={validationSchema}
          onSubmit={handleSaveCV}
        >
          {({ values, errors, touched, handleSubmit }) => (
            <Form id="pdf-content">
              <div className="flex">
                <div className="flex-[1] mt-3">
                  <Field
                    name="name"
                    className="name text-4xl border-1 border-black w-auto border-dotted font-bold editText"
                    placeholder="Nhập tên của bạn"
                  />
                  {errors.name && touched.name ? <div>{errors.name}</div> : null}
                  <Field
                    name="chucvu"
                    className="text-1xl border-1 border-black w-auto border-dotted mt-3 editText"
                    placeholder="Chức vụ"
                  />
                  {errors.chucvu && touched.chucvu ? <div>{errors.chucvu}</div> : null}
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
                  name="muctieu"
                  className="border-1 border-dotted border-black mt-2 pr-10 editText"
                  placeholder="Mục tiêu nghề nghiệp"
                />
                {errors.muctieu && touched.muctieu ? <div>{errors.muctieu}</div> : null}
              </div>
              <div className="flex align-items-center mt-3">
                <div className="text-2xl font-bold mt-2 flex-shrink-0">
                  KINH NGHIỆM LÀM VIỆC
                </div>
                <div className="w-full h-0 border-1 border-black ml-2"></div>
              </div>
              <FieldArray name="experience">
                {({ insert, remove, push }) => (
                  <>
                    {values.experience.length > 0 &&
                      values.experience.map((exp, index) => (
                        <div key={index}>
                          {/* Experience fields */}
                          <div className="flex hover:border-2 hover:border-black hover:border-dotted py-2 editBox">
                            <div>
                              <Field name={`experience.${index}.companyName`} className="text-lg border-1 border-black border-dotted editText"
                                placeholder="Tên công ty" />
                              {errors.companyName && touched.companyName ? <div>{errors.companyName}</div> : null}
                              <Field name={`experience.${index}.from`} type="date" className="border-1 border-black border-dotted editText"
                                placeholder="Ngày bắt đầu"
                              />
                              {errors.startDate && touched.from ? <div>{errors.startDate}</div> : null}
                              <span className="font-bold text-lg px-2">-</span>
                              <Field name={`experience.${index}.to`} type="date" className="border-1 border-black border-dotted editText"
                                placeholder="Ngày kết thúc"
                              />
                              {errors.endDate && touched.to ? <div>{errors.endDate}</div> : null}
                            </div>
                            <div className="flex flex-col align-items-center mx-5">
                              <div className="rounded-3xl w-[20px] h-[20px] border-2 border-black bg-black"></div>
                              <div className="border-2 border-black w-0 h-[100px] border-dashed"></div>
                            </div>
                            <div>
                              <Field name={`experience.${index}.jobName`} className="font-bold text-xl border-1 border-black border-dotted editText"
                                placeholder="Tên vị trí"
                              />
                              {errors.jobName && touched.jobName ? <div>{errors.jobName}</div> : null}
                              <Field name={`experience.${index}.jobDescription`} className="border-1 border-black border-dotted mt-2 editText"
                                placeholder="Miêu tả công việc của bạn"
                              />
                              {errors.jobDescription && touched.jobDescription ? <div>{errors.jobDescription}</div> : null}
                            </div>
                          </div>


                        </div>
                      ))}

                  </>
                )}
              </FieldArray>
              <div className="flex align-items-center mt-3">
                <div className="text-2xl font-bold mt-2 flex-shrink-0">
                  NHỮNG DỰ ÁN ĐÃ THAM GIA
                </div>
                <div className="w-full h-0 border-1 border-black ml-2"></div>
              </div>
              <FieldArray name="project">
                {({ insert, remove, push }) => (
                  <>
                    {values.project.length > 0 &&
                      values.project.map((exp, index) => (
                        <div key={index}>
                          {/* Experience fields */}
                          <div className="flex hover:border-2 hover:border-black hover:border-dotted py-2 editBox">
                            <div>
                              <Field name={`project.${index}.projectName`} className="text-lg border-1 border-black border-dotted editText"
                                placeholder="Tên dự án" />
                              {errors.companyName && touched.companyName ? <div>{errors.companyName}</div> : null}
                              <Field name={`project.${index}.from`} type="date" className="border-1 border-black border-dotted editText"
                                placeholder="Ngày bắt đầu"
                              />
                              {errors.startDate && touched.from ? <div>{errors.startDate}</div> : null}
                              <span className="font-bold text-lg px-2">-</span>
                              <Field name={`project.${index}.to`} type="date" className="border-1 border-black border-dotted editText"
                                placeholder="Ngày kết thúc"
                              />
                              {errors.to && touched.to ? <div>{errors.to}</div> : null}
                              <Field name={`project.${index}.customer`} type="text" className="border-1 border-black border-dotted editText"
                                placeholder="Khách hàng"
                              />
                              {errors.customer && touched.customer ? <div>{errors.customer}</div> : null}
                            </div>
                            <div className="flex flex-col align-items-center mx-5">
                              <div className="rounded-3xl w-[20px] h-[20px] border-2 border-black bg-black"></div>
                              <div className="border-2 border-black w-0 h-[100px] border-dashed"></div>
                            </div>
                            <div>
                              <Field name={`project.${index}.projectScope`} className="font-bold text-xl border-1 border-black border-dotted editText"
                                placeholder="Tên vị trí"
                              />
                              {errors.projectScope && touched.projectScope ? <div>{errors.projectScope}</div> : null}
                              <Field name={`project.${index}.projectDescription`} className="border-1 border-black border-dotted mt-2 editText"
                                placeholder="Miêu tả công việc của bạn"
                              />
                              {errors.projectDescription && touched.projectDescription ? <div>{errors.projectDescription}</div> : null}
                            </div>
                          </div>
                        </div>
                      ))}

                  </>
                )}
              </FieldArray>
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
                              name={`education.from`}
                              className="border-1 border-black border-dotted editText"
                              placeholder="Ngày bắt đầu"
                            />
                            {errors.education && errors.education.from && touched.education && touched.education.from ? (
                              <div>{errors.education.from}</div>
                            ) : null}
                            <span className="font-bold text-lg px-2">-</span>
                            <Field
                              name={`education.to`}
                              className="border-1 border-black border-dotted editText"
                              placeholder="Ngày kết thúc"
                            />
                            {errors.education && errors.education.to && touched.education && touched.education.to ? (
                              <div>{errors.education.to}</div>
                            ) : null}
                          </div>
                          <div>
                            <Field
                              name={`education.chuyennganh`}
                              className="border-1 border-black border-dotted editText"
                              placeholder="Ngành học"
                            />
                            {errors.education && errors.education.chuyennganh && touched.education && touched.education.chuyennganh ? (
                              <div>{errors.education.chuyennganh}</div>
                            ) : null}
                          </div>
                          <div className="my-2">
                            <Field
                              name={`education.school`}
                              className="border-1 border-black border-dotted editText"
                              placeholder="Tên trường học"
                            />
                            {errors.education && errors.education.school && touched.education && touched.education.school ? (
                              <div>{errors.education.school}</div>
                            ) : null}
                          </div>
                          <div>
                            <Field
                              name={`education.description`}
                              className="border-1 border-black border-dotted editText"
                              placeholder="Miêu tả quá trình học tập của bạn"
                            />
                            {errors.education && errors.education.description && touched.education && touched.education.description ? (
                              <div>{errors.education.description}</div>
                            ) : null}
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
                            name={`skill.skill`}
                            className="text-lg border-1 border-black border-dotted editText"
                            placeholder="Kĩ năng"
                          />
                          {errors.skill && touched.skill ? <div>{errors.skill}</div> : null}
                          <div className="my-2">
                            <Field
                              name={`skill.description`}
                              className="border-1 border-black border-dotted editText"
                              placeholder="Miêu tả"
                            />
                            {errors.description && touched.description ? <div>{errors.description}</div> : null}
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
                  <FieldArray name="awards">
                    {({ insert, remove, push }) => (
                      <>
                        {values.awards.length > 0 &&
                          values.awards.map((exp, index) => (
                            <div key={index}>
                              {/* Experience fields */}
                              <div className="flex hover:border-2 hover:border-black hover:border-dotted py-2 editBox">
                                <div>
                                  <Field name={`awards.${index}.awardName`} className="font-bold text-xl border-1 border-black border-dotted editText"
                                    placeholder="Tên giải thưởng"
                                  />
                                  {errors.awardName && touched.awardName ? <div>{errors.awardName}</div> : null}
                                  <Field name={`awards.${index}.from`} type="date" className="border-1 border-black border-dotted editText"
                                    placeholder="Ngày bắt đầu"
                                  />
                                  {errors.startDate && touched.from ? <div>{errors.startDate}</div> : null}
                                  <span className="font-bold text-lg px-2">-</span>
                                  <Field name={`awards.${index}.to`} type="date" className="border-1 border-black border-dotted editText"
                                    placeholder="Ngày kết thúc"
                                  />
                                  {errors.to && touched.to ? <div>{errors.to}</div> : null}

                                  <Field name={`awards.${index}.awardDescription`} className="border-1 border-black border-dotted mt-2 editText"
                                    placeholder="Miêu tả giải thưởng"
                                  />
                                  {errors.awardDescription && touched.awardDescription ? <div>{errors.awardDescription}</div> : null}
                                </div>
                              </div>
                            </div>
                          ))}

                      </>
                    )}
                  </FieldArray>
                </div>
                <div className="mx-2"></div>
                <div className="w-[50%]">
                  <div className="flex align-items-center mt-3">
                    <div className="text-2xl font-bold mt-2 flex-shrink-0">
                      <span className="border-b-4 border-black">CHỨNG CHỈ</span>
                    </div>
                    <div className="w-full h-0 border-1 border-black ml-2"></div>
                  </div>
                  <FieldArray name="certificate">
                {({ insert, remove, push }) => (
                  <>
                    {values.certificate.length > 0 &&
                      values.certificate.map((exp, index) => (
                        <div key={index}>
                          {/* Experience fields */}
                          <div className="flex hover:border-2 hover:border-black hover:border-dotted py-2 editBox">
                            <div>
                              
                              <Field name={`certificate.${index}.from`} type="date" className="border-1 border-black border-dotted editText"
                                placeholder="Ngày bắt đầu"
                              />
                              {errors.startDate && touched.from ? <div>{errors.startDate}</div> : null}
                              <span className="font-bold text-lg px-2">-</span>
                              <Field name={`certificate.${index}.to`} type="date" className="border-1 border-black border-dotted editText"
                                placeholder="Ngày kết thúc"
                              />
                              {errors.to && touched.to ? <div>{errors.to}</div> : null}
                              
                              <Field name={`certificate.${index}.certificateDes`} className="border-1 border-black border-dotted mt-2 editText"
                                placeholder="Miêu tả chứng chỉ"
                              />
                              {errors.certificateDes && touched.certificateDes ? <div>{errors.certificateDes}</div> : null}
                            </div>
                          </div>
                        </div>
                      ))}

                  </>
                )}
              </FieldArray>
                </div>
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded mt-4"
              >
                Lưu CV
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SimpleTemplate;
