import React from 'react';
import InfoIcon from '@/public/vector/user.svg';
import EmailIcon from '@/public/vector/email.svg';
import ProfileUpload from '@/components/element/other/profileUpload';

const Profile = () => {
  return (
    <div className="font-manrope mx-auto max-w-full">
      <div className="grid grid-cols-1">
        <div className="">
          <div className="rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
              <h3 className="font-manrope mb-2 mt-2 text-center text-xl font-bold text-black dark:text-white min-[890px]:text-left">
                Thông Tin Cá Nhân
              </h3>
            </div>
            <div className="p-7">
              {/* ảnh đại diện */}
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <ProfileUpload />
              </div>
              <form action="#">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Họ & Tên
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <InfoIcon />
                      </span>
                      <input
                        className="bg-slate w-full rounded-xl border border-stroke py-3 pl-11.5 pr-4.5 text-sm text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Hòa Phúc Hằng"
                        defaultValue="Hòa Phúc Hằng"
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="Username"
                    >
                      Tài Khoản
                    </label>
                    <input
                      className="bg-slate w-full rounded-xl border border-stroke px-4.5 py-3 text-sm text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="Username"
                      id="Username"
                      placeholder="hoaphuchang"
                      defaultValue="hoaphuchang"
                    />
                  </div>
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Địa chỉ Email
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <EmailIcon />
                      </span>
                      <input
                        className="bg-slate w-full rounded-xl border border-stroke py-3 pl-11.5 pr-4.5 text-sm text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="emailAddress"
                        id="emailAddress"
                        placeholder="kimngocagiang@gmail.com"
                        defaultValue="kimngocagiang@gmail.com"
                      />
                    </div>
                  </div>

                  <div className="w-full sm:w-1/2">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="phoneNumber"
                    >
                      Số Điện Thoại
                    </label>
                    <input
                      className="bg-slate w-full rounded-xl border border-stroke px-4.5 py-3 text-sm text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="+84 9412567590"
                      defaultValue="+84 9412567590"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded-xl border border-slate-300 px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                    type="submit"
                  >
                    Hủy
                  </button>
                  <button
                    className="flex justify-center rounded-xl bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90"
                    type="submit"
                  >
                    Cập nhật thông tin
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
