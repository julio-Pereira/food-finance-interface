import React, { useState, useEffect, useRef } from 'react';

function ChartAccountsDropdown({ data, value, onChange, mandatory }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            if (searchTerm.length >= 3) {
                setFilteredData(
                    data.filter(item =>
                        item.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                );
            } else {
                setFilteredData(data);
            }
        }
    };

    const handleItemClick = (item) => {
        onChange(item);
        setIsOpen(false);
        setSearchTerm(''); // Clear the search term after selection
        setHighlightedIndex(-1); // Reset the highlighted index
    };

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term.length >= 1) {
            setFilteredData(
                data.filter(item =>
                    item.toLowerCase().includes(term.toLowerCase())
                )
            );
            setIsOpen(true);
        } else {
            setFilteredData(data);
            setIsOpen(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, filteredData.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (highlightedIndex >= 0 && highlightedIndex < filteredData.length) {
                handleItemClick(filteredData[highlightedIndex]);
            }
        }
    };

    useEffect(() => {
        if (searchTerm.length >= 1) {
            setFilteredData(
                data.filter(item =>
                    item.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredData(data);
        }
    }, [searchTerm, data]);

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
        <div className={`relative inline-block mx-4 rounded-md bg-white justify-between ${mandatory ? 'border border-red-500' : ''}`} ref={dropdownRef}>
            <div className="flex">
                <input
                    type="text"
                    value={searchTerm || value} // Display the search term or the selected value
                    onChange={handleSearchChange}
                    onClick={() => {
                        if (searchTerm.length >= 3) {
                            setIsOpen(true);
                        }
                    }} // Open the dropdown if already typed at least 3 characters
                    placeholder="Select an option"
                    className="px-4 py-2 bg-white text-gray-500 rounded-l-md focus:outline-none hover:text-gray-600 w-80"
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                />
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className="px-4 py-2 bg-white text-gray-500 rounded-r-md border-l border-gray-300 focus:outline-none hover:text-gray-600"
                >
                    <svg
                        className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-30">
                    {filteredData.map((item, index) => (
                        <div
                            key={index}
                            className={`px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-100 ${highlightedIndex === index ? 'bg-gray-200' : ''}`}
                            onClick={() => handleItemClick(item)} // Use onClick instead of onMouseDown
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ChartAccountsDropdown;
