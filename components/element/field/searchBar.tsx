//Icon
import FindIcon from '@/public/vector/find.svg';

interface SearchProperties {
  // eslint-disable-next-line
  onChange: (e) => void;
}

const SearchBar: React.FC<SearchProperties> = ({ onChange }) => {
  return (
    <div className="relative flex w-full items-center dark:bg-black">
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
        <FindIcon className="h-5 w-5 fill-black dark:fill-white" />
      </div>
      <input
        type="search"
        id="search"
        className="block w-full rounded-lg border border-slate-300 bg-slate-50 p-2 ps-10 text-sm text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 dark:focus:border-blue-500"
        placeholder="Tìm kiếm..."
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
