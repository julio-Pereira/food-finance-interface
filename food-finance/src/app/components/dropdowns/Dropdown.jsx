import React, { useEffect, useState, useRef } from 'react';

function Dropdown({ data, title, onShowCalendar }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsOpen(false);

        if (item === "Custom...") {
            onShowCalendar();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 text-gray-500 rounded-md focus:outline-none hover:text-gray-600 min-w-40 max-w-48"
      >
        {title == null ? selectedItem || data[0] : selectedItem || title}
        <svg
          className={`w-4 h-4 inline-block ml-2 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-30">
          {data.map((item, index) => (
            item == "Custom..."   ?
                <div
                    key={index}
                    className="px-4 py-2 border-t border-t-gray-200 x-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                    onClick={() => handleItemClick(item)}
                >
                        {item}
                </div>
            :
                <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                onClick={() => handleItemClick(item)}
                >
                    {item}
                </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;