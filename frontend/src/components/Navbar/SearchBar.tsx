  

import  { ChangeEvent, FC } from "react";

interface Props {
  value: string; // The current value of the search input
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; // Function to handle input change
  onSearch: () => void; // Function to handle search button click
}

const SearchBar: FC<Props> = ({ value, onChange, onSearch }) => {
  return (
    <div className="flex items-center justify-center pt-7 bg-[#ffffff]">
      <div className="flex rounded-full bg-cyan-950 px-2 w-full max-w-[600px]">
        <input
          type="text"
          className="w-full bg-cyan-950 flex bg-transparent pl-2 text-[#cccccc] outline-0"
          placeholder="Search for doctors"
          value={value}
          onChange={onChange} // Pass the input change event to the handler
        />

        <button
          type="submit"
          onClick={onSearch} // Trigger the search function when clicked
          className="relative p-2 bg-cyan-950 rounded-full"
        >
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* <path
              d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="#999"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            /> */}
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

