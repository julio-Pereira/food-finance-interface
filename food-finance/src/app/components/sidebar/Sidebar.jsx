'use client';
import React, { useEffect, useState } from "react"
import Loading from "../loading/Loading";

export default function Sidebar({ data }) {

    const [mock, setMock] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 100));
                setMock(data);

                setLoading(false);
            } catch (error) {
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <p>Something went wrong: {error.message}</p>
    }

    return (
        <>
            <aside className="bg-white lg:block text-black min-w-64 p-4 overflow-y-auto min-h-screen">
                {mock.map((item, index) => (
                    <div key={index} className="flex flex-col items-start w-full">
                        <h2 className="text-sm font-semibold w-full text-start">{item.title}</h2>
                        <ul className="mt-2 mb-2 w-full my-4 border-t border-gray-300">
                            {item.subTitles.map((subItem, subIndex) => (
                                <li key={subIndex} className="py-2 p-2 my-2 hover:bg-gray-100 cursor-pointer rounded-md w-full">
                                    <a href="#" className="text-gray-800">{subItem.section}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </aside>
        </>
    )
}