import React from "react";

function SearchDateInput({initialDate, finalDate, onInitialDateChange, onFinalDateChange, title}) {
    return (
        <div className="z-30 mx-1 min-w-64 max-w-96 bg-white text-black">
            <div className="mx-2">
                {title}
            </div>
            <div className="flex flex-row">
                <div className={`items-center bg-white border rounded-lg border-gray-300 max-w-40 max-h-20 px-2 mx-2 my-2`}>
                    <input
                        type="date"
                        value={initialDate}
                        onChange={(e) => onInitialDateChange(e.target.value)}
                        className="left-0 my-1 py-1 px-1 border-none focus:outline-none text-gray-600 z-30"
                    />
                </div>
                <div className={`items-center bg-white border rounded-lg border-gray-300 max-w-40 max-h-20 px-2 my-2`}>
                    <input
                        type="date"
                        value={finalDate}
                        onChange={(e) => onFinalDateChange(e.target.value)}
                        className="left-0 my-1 py-1 px-1 border-none focus:outline-none text-gray-600 z-30"
                    />
                </div>
            </div>
            </div>
    );
}

export default SearchDateInput;