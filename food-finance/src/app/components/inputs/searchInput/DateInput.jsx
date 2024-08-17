import React from 'react';

function DateInput({ value, onChange, mandatory, disabled }) {
    return (
        <div className={`flex items-center bg-white border rounded-lg border-gray-300 max-w-48 mx-2 px-2 my-2 ${mandatory ? 'border border-red-500' : ''}`}>
            <input
                type="date"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="left-0 my-1 py-1 px-1 border-none focus:outline-none text-gray-600 z-30"
                disabled={disabled}
            />
        </div>
    );
}

export default DateInput;
