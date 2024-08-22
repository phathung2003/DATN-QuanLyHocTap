import React, { useState } from 'react';
import Datepicker from 'tailwind-datepicker-react';

const options = {
  title: 'Chọn ngày giao bài',
  autoHide: true,
  todayBtn: true,
  todayBtnText: 'Hôm nay',
  clearBtn: true,
  clearBtnText: 'Đặt lại',
  rangePicker: false,
  minDate: new Date(),
  theme: {
    background: 'bg-rose-200 dark:bg-slate-600',
    todayBtn: '',
    clearBtn: 'dark:bg-rose-800',
    icons: 'dark:bg-slate-800 dark:text-white',
    text: '',
    disabledText: 'text-slate-400 dark:text-slate-900 dark:text-opacity-50',
    input:
      'z-99 py-3 border-slate-200 ring-2 ring-rose-500 dark:bg-slate-800 w-5/6',
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
  datepickerClassNames: 'top-15 z-100',
  defaultDate: new Date(),
  language: 'vi',
  disabledDates: [],
  weekDays: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
  inputNameProp: 'date',
  inputIdProp: 'date',
  inputPlaceholderProp: 'Chọn ngày',
  inputDateFormatProp: {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  } as const,
};
const DatePicker: React.FC<{ setPickDate }> = ({ setPickDate }) => {
  const [show, setShow] = useState(false);
  const handleChange = (selectedDate) => {
    setPickDate(selectedDate);
  };
  const handleClose = (state) => {
    setShow(state);
  };
  return (
    <div className="py-2.5 text-sm">
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
