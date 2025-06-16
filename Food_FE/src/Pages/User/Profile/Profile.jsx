import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { formatDate, formatTime } from "../../../Components/Common/finance";

export default function Profile() {
  const [dataprofile, setdataprofile] = useState();
  const [Error, setError] = useState("");
  const [modalUpdateProfile, setmodalUpdateProfile] = useState(false);
  const [modalUpdatePassword, setmmodalUpdatePassword] = useState(false);
  const [formData, setFormData] = useState({
    gioitinh: "",
    ngaysinh: "",
    sdt: "",
    tuoi: "",
  });
  const [formChangePassword, setformChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const Name = localStorage.getItem("Name");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/getProfile?Name='${Name}'`
        );
        setdataprofile(response.data[0]);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [Name]);

  useEffect(() => {
    if (dataprofile) {
      if (
        dataprofile.gioitinh === null ||
        dataprofile.ngaysinh === null ||
        dataprofile.sdt === null ||
        dataprofile.tuoi === null
      ) {
        setmodalUpdateProfile(true);
      }
    }
  }, [dataprofile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setformChangePassword((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.gioitinh ||
      !formData.ngaysinh ||
      !formData.sdt ||
      !formData.tuoi
    ) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    } else {
      setError("");
    }
    console.log(formData);
    try {
      const Name = localStorage.getItem("Name");

      const response = await axios.post("http://localhost:3000/updateProfile", {
        formData,
        Name,
      });

      // Cập nhật dữ liệu trên client
      setdataprofile((prevData) => ({
        ...prevData,
        ...formData,
      }));

      setmodalUpdateProfile(false);
    } catch (err) {
      setError(
        err.response?.data?.message || "Đã xảy ra lỗi, vui lòng thử lại."
      );
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    console.log(formChangePassword);
    if (!formChangePassword.oldPassword || !formChangePassword.newPassword) {
      setError("Vui lòng điền đầy đủ thông tin.");
      console.log("Vui lòng điền đầy đủ thông tin.");
      return;
    } else {
      setError("");
    }

    if (formChangePassword.oldPassword === formChangePassword.newPassword) {
      setError("Mật khẩu mới phải khác mật khẩu cũ.");
      console.log("Mật khẩu mới phải khác mật khẩu cũ.");
      return;
    } else {
      setError("");
    }

    console.log(formChangePassword);
    try {
      const Name = localStorage.getItem("Name");
      const newPassword = formChangePassword.newPassword;
      const response = await axios.post(
        "http://localhost:3000/updatepassword",
        {
          Name,
          newPassword,
        }
      );
      setmmodalUpdatePassword(false);
    } catch (err) {
      setError(
        err.response?.data?.message || "Đã xảy ra lỗi, vui lòng thử lại."
      );
    }
  };

  return (
    <div>
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url(http://localhost:3000/assets/bgprofile.jpg)",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-gray-300">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src=""
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                        style={{ maxWidth: "150px" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                    {Name} - {dataprofile && dataprofile.tuoi} <span>Tuổi</span>
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                    Quê quán:
                  </div>
                  <div className="mb-2 text-gray-700 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                    Số điện thoại: - {dataprofile && dataprofile.sdt}
                  </div>
                  <div className="mb-2 text-gray-700">
                    <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                    Ngày sinh :{" "}
                    {dataprofile && formatDate(dataprofile.ngaysinh)}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <button
                        onClick={() => setmmodalUpdatePassword(true)}
                        className="py-2.5 px-8 rounded-lg border border-green-500 bg-green-500 text-[#ffffff] hover:bg-green-600"
                      >
                        Đổi mật khẩu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Transition appear show={modalUpdatePassword} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setmodalUpdateProfile(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Cập nhật mật khẩu
                  </Dialog.Title>
                  <form onSubmit={handleChangePasswordSubmit}>
                    <div className="mt-2">
                      <label
                        htmlFor="oldPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Mật khẩu cũ
                      </label>
                      <input
                        type="text"
                        name="oldPassword"
                        value={formChangePassword.oldPassword}
                        onChange={handleChangePassword}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-4"
                      />
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor="newPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Mật khẩu mới
                      </label>
                      <input
                        type="text"
                        name="newPassword"
                        value={formChangePassword.newPassword}
                        onChange={handleChangePassword}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-4"
                      />
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Cập nhật
                      </button>
                    </div>
                    <div className="mt-4 text-[#f92424]">{Error}</div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={modalUpdateProfile} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setmodalUpdateProfile(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Cập nhật thông tin
                  </Dialog.Title>
                  <form onSubmit={handleSubmit}>
                    <select
                      id="gioitinh"
                      name="gioitinh"
                      value={formData.gioitinh}
                      onChange={handleChange}
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-4"
                    >
                      <option value="" disabled>
                        Chọn giới tính
                      </option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                    <div className="mt-2">
                      <label
                        htmlFor="ngaysinh"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ngày sinh
                      </label>
                      <input
                        type="date"
                        name="ngaysinh"
                        value={formData.ngaysinh}
                        onChange={handleChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-4"
                      />
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor="sdt"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Số điện thoại
                      </label>
                      <input
                        type="text"
                        name="sdt"
                        value={formData.sdt}
                        onChange={handleChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-4"
                      />
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor="tuoi"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tuổi
                      </label>
                      <input
                        type="number"
                        name="tuoi"
                        value={formData.tuoi}
                        onChange={handleChange}
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2 px-4"
                      />
                    </div>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Cập nhật
                      </button>
                    </div>
                    <div className="mt-4 text-[#f92424]">{Error}</div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
