//Icon
import FunnelIcon from '@/public/vector/funnel-black.svg';
import DropdownIcon from '@/public/vector/dropdown-black.svg';

interface FilterButtonProperties {
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProperties> = ({ onClick }) => {
  return (
    <button
      id="filter_Button"
      type="button"
      className="flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-medium text-slate-900 hover:bg-slate-100 hover:text-slate-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-600 dark:focus:ring-slate-700 min-[890px]:w-auto"
      onClick={onClick}
      data-dropdown-toggle="filterDropdown"
    >
      <FunnelIcon className="mr-2 h-4 w-4 text-slate-400" />
      Lọc
      <DropdownIcon className="-mr-1 ml-1.5 h-5 w-5" />
    </button>
  );
};

export default FilterButton;
