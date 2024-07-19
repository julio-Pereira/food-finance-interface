import React, { useEffect, useState, useMemo } from "react"
import Loading from "../loading/Loading";

export default function Table({ data }) {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [sortColumn, setSortColumn] = useState('asc');
    const [sortOrder, setSortOrder] = useState('asc');

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

    const handleCheckboxChange = (event, rowIndex) => {
        if (event.target.checked) {
            setSelectedRows((prevSelectedRows) => [...prevSelectedRows, rowIndex]);
        } else {
            setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((row) => row !== rowIndex));
        }
    };


    const sortedData = [...data].sort((a, b) => {
        if (sortColumn) {
          if (sortOrder === "asc") {
            return a[sortColumn] < b[sortColumn] ? -1 : 1;
          } else {
            return a[sortColumn] > b[sortColumn] ? -1 : 1;
          }
        } else {
          return 0;
        }
      });

    const handleSelectAll = (e) => {
        setSelectAll(e.target.checked);
        setSelectedRows(
            e.target.checked ? data.map((_, index) => index) : []
        );
    };

    const handleSort =  (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    }

    const isSelected = (rowIndex) => selectedRows.includes(rowIndex);

    const sortSvg = (column) =>
        sortColumn === column ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            {sortOrder === "asc" ? (
              <path d="M7 10l5 5 5-5z" />
            ) : (
              <path d="M7 14l5-5 5 5z" />
            )}

            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        ) : null;


    if (!data || data.length === 0) {
        return <p>No data available</p>;
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="rounded-lg overflow-x-auto max-h-lvh">
            <table className="divide-y divide-gray-200 dark:divide-neutral-700 sm:rounded-md scrollbar-thumb-gray-400 scrollbar-track-slate-200 overflow-scroll">
                <thead className="text-gray-500 uppercase text-sm sticky top-0 z-10 transition-colors duration-300 bg-gray-100 ease-in-out border-collapse sm:rounded-md">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap" scope="col">
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-700focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                        </th>
                        {Object.keys(data[0]).map((key) => (
                            <th
                                key={key}
                                className="py-3 px-6 p-10 text-left"
                                scope="col"
                                onClick={() => handleSort(key)}
                            >
                                {key}
                                {sortSvg(key)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {sortedData.map((row, index) => (
                        <tr
                            key={index}
                            className="border-b border-gray-300 hover:bg-gray-100 even:bg-gray-50"
                        >
                            <td className="py-3 px-6 whitespace-nowrap">
                                <input
                                    type="checkbox"
                                    checked={isSelected(index)}
                                    onChange={(event) => handleCheckboxChange(event, index)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-700focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                            </td>
                            {Object.values(row).map((value, i) => (
                                <td key={i} className="py-3 px-6 text-left">
                                    {value}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}