'use client';
import { IChildrenDB } from '@/backend/models/data/IChildren';
import React, { useState } from 'react';

//Icon
import BlackDropdownIcon from '@/public/vector/dropdown-black.svg';

const SelectGroupTwo: React.FC<{
  children: IChildrenDB[];
  setOption;
}> = ({ children, setOption }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div>
      <div className="relative z-20 rounded-md bg-white ring-2 ring-rose-500 dark:bg-form-input sm:w-full md:w-full">
        <select
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e.target.value);
            setOption(e.target.value);
            changeTextColor();
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-2.5 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input ${
            isOptionSelected ? 'text-sm text-black dark:text-white' : ''
          }`}
        >
          {children.map((children) => (
            <option key={children.childrenID} value={children.childrenID}>
              {children.name}
            </option>
          ))}
        </select>

        <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
          <BlackDropdownIcon />
        </span>
      </div>
    </div>
  );
};

export default SelectGroupTwo;
