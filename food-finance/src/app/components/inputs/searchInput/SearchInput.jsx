function SearchInput() {
    return (
        <>
            <div className="flex items-center border rounded-lg border-gray-300 max-w-80">
                <img src="/search-svgrepo-com.svg" alt="Icon Description" className="my-1 px-2 py-1" />
                <input type="text" placeholder="Search..." className="my-1 py-1 px-1 border-none focus:outline-none text-gray-600" />
            </div>
        </>
    );
}

export default SearchInput;