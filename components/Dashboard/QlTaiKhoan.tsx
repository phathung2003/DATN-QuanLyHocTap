'use client';

import React from 'react';
import { useState } from 'react';
import AddModal from '@/components/Modal/AddModal';
import FormAddAccount from '@/components/FormCRUD/FormAddAccount';
import EditModal from '@/components/Modal/EditModal';
import FormEditAccount from '@/components/FormCRUD/FormEditAccount';
import DeleteModal from '@/components/Modal/DeleteModal';
import CheckboxOne from '@/components/Checkboxes/CheckboxOne';
import Image from 'next/image';
import Pagination from '@/components/Pagination/Pagination';
/* eslint-disable */
const QLTaiKhoan = () => {
  // modal Add
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentFormComponent, setCurrentFormComponent] = useState<React.FC>(
    () => FormAddAccount,
  );
  const handleOpenAddModal = (FormComponent: React.FC) => {
    setCurrentFormComponent(() => FormComponent);
    setIsAddModalOpen(true);
  };

  // State for Edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editAccountData, setEditAccountData] = useState<React.FC>(
    () => FormEditAccount,
  );
  const handleEditClick = (FormComponent: React.FC) => {
    setEditAccountData(() => FormComponent);
    setIsEditModalOpen(true);
  };

  //state for Delete modal
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const handleDelete = () => {
    setIsDelModalOpen(true);
  };

  const [accounts, setAccounts] = useState([
    {
      id: 1,
      image: '/images/qlthongtin/user01.png',
      phoneNumber: '07944868386',
      user: 'Nguyễn Minh',
      role: 'Admin',
    },
    {
      id: 2,
      image: '/images/qlthongtin/user01.png',
      phoneNumber: '0985939694',
      user: 'Trần Bảo Minh',
      role: 'Phụ huynh',
    },
    {
      id: 3,
      image: '/images/qlthongtin/user01.png',
      phoneNumber: '0985939694',
      user: 'Trần Bảo Minh',
      role: 'Người viết bài',
    },
    // Add more accounts as needed
  ]);

  return (
    <div className="mx-auto w-full max-w-screen-xl bg-slate-50 px-0 py-10 antialiased shadow-xl dark:bg-black lg:px-4">
      <div className="relative overflow-hidden bg-white dark:bg-slate-700 sm:rounded-lg">
        <div className="flex flex-col items-center justify-between px-2 py-2 md:flex-row">
          <div className="w-full md:w-1/2">
            <form className="border-gray-100 flex items-center dark:bg-black">
              <label htmlFor="simple-search" className="sr-only">
                Tìm Kiếm
              </label>
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 dark:bg-black">
                  <svg
                    aria-hidden="true"
                    className="text-gray-500 dark:text-gray-400 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="text-stale-900 dark:placeholder-stale-400 dark:focus:ring-primary-500 w-full rounded-lg border border-slate-300 bg-slate-100 p-2 pl-10 text-sm focus:ring-slate-100 dark:border-black dark:bg-black dark:text-white dark:focus:border-black"
                  placeholder="Tìm Kiếm"
                  required
                />
              </div>
            </form>
          </div>

          {/* button add product  */}
          <div className="flex w-full justify-end gap-2.5 px-2 py-2 md:w-auto">
            <button
              type="button"
              className="hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 ml-auto inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-primary p-1.5 px-2 py-2 text-sm text-white dark:hover:text-white md:w-auto"
              onClick={() => handleOpenAddModal(FormAddAccount)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span className="sr-only">Open modal</span>
              Thêm Tài Khoản
            </button>
          </div>

          {/* showing modal */}
          {isAddModalOpen && currentFormComponent && (
            <AddModal
              isOpen={isAddModalOpen}
              onClose={() => setIsAddModalOpen(false)}
              FormComponent={currentFormComponent}
            />
          )}

          {/* button filter  */}
          <div className="flex w-full items-center space-x-3 md:w-auto">
            <button
              id="filterDropdownButton"
              data-dropdown-toggle="filterDropdown"
              className="flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 hover:text-slate-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-600 dark:focus:ring-slate-700 md:w-auto"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="text-gray-400 mr-2 h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clipRule="evenodd"
                />
              </svg>
              Lọc
              <svg
                className="-mr-1 ml-1.5 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-5 overflow-x-auto      ">
        <table className="w-full text-left text-sm text-slate-700 dark:text-slate-600">
          <thead className="text-gray-400 bg-slate-200 text-xs uppercase dark:bg-slate-700 dark:text-white">
            <tr>
              <th scope="col" className="px-4 py-4"></th>
              <th scope="col" className="px-4 py-3">
                Hình ảnh
              </th>
              <th scope="col" className="px-4 py-3">
                Tài Khoản
              </th>
              <th scope="col" className="px-4 py-3">
                Người dùng
              </th>
              <th scope="col" className="px-4 py-3">
                Vai trò
              </th>
              <th scope="col" className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr
                key={account.id}
                className="dark:border-gray-700 border-b border-slate-200"
              >
                <th scope="row" className="whitespace-nowrap py-3">
                  <CheckboxOne />
                </th>
                <td className="px-4 py-3">
                  <Image
                    width={50}
                    height={50}
                    src={account.image}
                    alt="Logo"
                  />
                </td>
                <td className="px-4 py-3 dark:text-white">
                  {account.phoneNumber}
                </td>
                <td className="max-w-[12rem] truncate px-4 py-3 dark:text-white">
                  {account.user}
                </td>
                <td className="px-4 py-3 dark:text-white">{account.role}</td>
                <td className="flex items-center justify-end px-4 py-3">
                  {/* button edit */}
                  <button
                    type="button"
                    data-drawer-target="drawer-update-product"
                    data-modal-target="updateProductModal"
                    data-drawer-show="drawer-update-product"
                    aria-controls="drawer-update-product"
                    onClick={() => handleEditClick(FormEditAccount)}
                    className="mr-4 flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                      <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                    </svg>
                    Sửa
                  </button>

                  {/* showing modal */}
                  {isEditModalOpen && editAccountData && (
                    <EditModal
                      isOpen={isEditModalOpen}
                      onClose={() => setIsEditModalOpen(false)}
                      FormComponent={editAccountData}
                    />
                  )}

                  {/* button xem  */}
                  <button
                    type="button"
                    data-drawer-target="drawer-read-product-advanced"
                    data-drawer-show="drawer-read-product-advanced"
                    aria-controls="drawer-read-product-advanced"
                    className="text-stale-900 mr-4 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-center text-sm font-medium hover:bg-slate-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 dark:hover:text-white dark:focus:ring-slate-700"
                  >
                    <svg
                      className="stroke-current dark:text-white dark:hover:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4a4a4a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    Xem
                  </button>

                  {/* button Xóa */}
                  <button
                    type="button"
                    data-modal-target="delete-modal"
                    data-modal-toggle="delete-modal"
                    onClick={() => handleDelete()}
                    className="focus:ring-red-300 dark:hover:bg-red-600 dark:focus:ring-red-900 mr-4 flex items-center gap-2 rounded-lg border border-rose-600 px-3 py-2 text-center text-sm font-medium text-rose-600 hover:bg-rose-800 hover:stroke-white hover:text-white focus:outline-none focus:ring-4 dark:border-rose-500 dark:text-rose-500 dark:hover:text-white"
                  >
                    <svg
                      className="text-red-700 dark:text-red-500 stroke-current hover:text-white dark:hover:text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#d01d02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    Xóa
                  </button>

                  <DeleteModal
                    isOpen={isDelModalOpen}
                    onClose={() => setIsDelModalOpen(false)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <Pagination />
    </div>
  );
};

export default QLTaiKhoan;
