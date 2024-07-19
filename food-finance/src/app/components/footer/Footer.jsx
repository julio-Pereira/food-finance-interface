

export default function Footer() {

    return (
        <>
            <footer className="bg-white text-gray-700 border border-t-gray-300 z-0 py-2">
                <div className="md:container md:mx-auto">
                    <div className="grid justify-center items-center">
                        <div className="mb-4 md:mb-0 justify-items-center">
                            <h1 className="text-lg text-center font-bold">Food Finance</h1>
                            <p>&copy; {new Date().getFullYear()} Food Finance. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}