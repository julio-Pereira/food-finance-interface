'use client';
import React, { useEffect, useState, useRef } from "react";
import Table from "../../components/table/Table";
import SearchInput from "@/app/components/inputs/searchInput/SearchInput";
import DateDropdown from "@/app/components/dropdowns/DateDropdown";
import { months } from "@/mockData";
import DateInput from "@/app/components/inputs/searchInput/DateInput";
import DateButton from "@/app/components/buttons/DateButton";

function CashFlowMain({ data }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const dropdownRef = useRef(null);

  const onShowCalendar = () => {
    setShowCalendar(true);
  };

  const onHideCalendar = () => {
    setShowCalendar(false);
  };

  const handleClickOutside = (event) => {
    if (
      calendarRef.current && !calendarRef.current.contains(event.target) &&
      dropdownRef.current && !dropdownRef.current.contains(event.target)
    ) {
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
    <section className="lg:pl-2 my-5 z-10">
      <div className="flex flex-col border px-5 py-5 mx-5 bg-white shadow-md sm:rounded-lg min-h-screen">
        <div className="flex flex-col lg:flex-row items-center justify-between mb-5">
          <div className="flex justify-between relative mb-5 lg:mb-0">
            <div ref={dropdownRef}>
              <DateDropdown data={months} onShowCalendar={onShowCalendar} onHideCalendar={onHideCalendar} />
              {showCalendar && (
                <div className="absolute flex flex-col sm:flex-row z-30 my-2 mx-2 py-2 bg-white border rounded-lg shadow-xl min-w-fit" ref={calendarRef}>
                  <DateInput />
                  <DateInput />
                  <DateButton />
                </div>
              )}
            </div>
          </div>
          <div className="w-full lg:w-auto">
            <SearchInput />
          </div>
        </div>
        <div className="w-full overflow-x-auto">
          <Table data={data} />
        </div>
      </div>
    </section>
  );
}

export default CashFlowMain;
