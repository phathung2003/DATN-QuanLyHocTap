import React, { useState } from 'react';
import Datepicker from 'tailwind-datepicker-react';

const options = {
  title: 'Chọn ngày giao bài',
  autoHide: true,
  todayBtn: true,
  clearBtn: true,
  clearBtnText: 'Xóa',
  maxDate: new Date('2030-01-01'),
  minDate: new Date('1950-01-01'),
  theme: {
    background: 'bg-slate-200 dark:bg-slate-600',
    todayBtn: '',
    clearBtn: 'dark:bg-rose-800',
    icons: 'dark:bg-slate-800 dark:text-white',
    text: '',
    disabledText:
      'bg-slate-200 text-slate-300 dark:bg-slate-600 dark:text-slate-800',
    input: 'py-3 border-slate-200 ring-2 ring-rose-500 dark:bg-slate-800',
    inputIcon: '',
    selected: 'dark:bg-slate-800',
  },
  icons: {
    prev: () => (
      <svg
        className="dark:text-white"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    ),
    next: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    ),
  },
  datepickerClassNames: 'top-32',
  defaultDate: new Date(),
  language: 'vi',
  disabledDates: [],
  weekDays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  inputNameProp: 'date',
  inputIdProp: 'date',
  inputPlaceholderProp: 'Chọn ngày',
  inputDateFormatProp: {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  },
};

const DatePicker = () => {
  const [show, setShow] = useState(false);
  const handleChange = (selectedDate) => {
    console.log(selectedDate);
  };
  const handleClose = (state) => {
    setShow(state);
  };
  return (
    <div>
      <Datepicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
      />
    </div>
  );
};

export default DatePicker;
