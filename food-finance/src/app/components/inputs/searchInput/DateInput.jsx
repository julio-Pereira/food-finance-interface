function DateInput() {
    return (
        <>
            <div className="flex items-center bg-white border rounded-lg border-gray-300  max-w-80 mx-2 px-2 my-2">
                <input
                    type="date"
                    className="left-0 my-1 py-1 px-1 border-none focus:outline-none text-gray-600 z-30" />
            </div>
        </>
    );
}

export default DateInput;