'use client';
import React, { useEffect, useState, useRef } from "react"
import Table from "../../components/table/Table"
import SearchInput from "@/app/components/inputs/searchInput/SearchInput";
import Dropdown from "@/app/components/dropdowns/Dropdown";
import { files, months } from "@/mockData";
import Calendar from "@/app/components/calendar/Calendar";

function CashFlowMain({ data }) {
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef(null);
    const dropdownRef = useRef(null);

    const handleShowCalendar = () => {
        setShowCalendar(true);
    }

    const handleClickOutside = (event) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target) &&
            dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShowCalendar(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <section className="lg:pl-4 my-5 z-10">
            <div className="flex flex-col border px-5 py-5 mx-5 bg-white shadow-md sm:rounded-lg min-h-screen">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <SearchInput />
                    </div>
                    <div className="flex items-center justify-between">
                        <Dropdown data={files} title={"Exportar"}/>
                        <div ref={dropdownRef}>
                            <Dropdown data={months} onShowCalendar={handleShowCalendar}/>
                        </div>
                        {showCalendar && (
                            <div ref={calendarRef}>
                                <Calendar />
                            </div>
                        )}
                    </div>
                </div>
                <Table data={data} />
            </div>
        </section>
    )
}

export default CashFlowMain;