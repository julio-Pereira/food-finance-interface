'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import Loading from "../loading/Loading";
import DateInput from "../inputs/searchInput/DateInput";

export default function CashFlowTable({ data }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [tableData, setTableData] = useState([]);
  const [newRow, setNewRow] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [enableScroll, setEnableScroll] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100));
        const dataWithId = data.map(item => ({ ...item, id: uuidv4() }));
        setTableData(dataWithId);
        setLoading(false);
      } catch (error) {
        setError("Failed to load data");
        setLoading(false);
      }
    };
    fetchData();
  }, [data]);

  const handleCheckboxChange = (event, rowId) => {
    if (event.target.checked) {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, rowId]);
    } else {
      setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((id) => id !== rowId));
    }
  };

  const sortedData = [...tableData].sort((a, b) => {
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
    setSelectedRows(e.target.checked ? tableData.map((row) => row.id) : []);
    setEnableScroll(e.target.checked); // Enable scroll when checkbox is checked
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const isSelected = (rowId) => selectedRows.includes(rowId);

  const sortSvg = (column) =>
    sortColumn === column ? (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        {sortOrder === "asc" ? <path d="M7 10l5 5 5-5z" /> : <path d="M7 14l5-5 5 5z" />}
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    ) : null;

  const handleNewRowChange = (e, key) => {
    const newValue = e.target.value;
    setNewRow((prevNewRow) => ({
      ...prevNewRow,
      [key]: newValue
    }));
  };

  const saveNewRow = () => {
    setTableData((prevTableData) => [...prevTableData, newRow]);
    setNewRow(null);
  };

  const handleEditRowChange = (e, rowId, key) => {
    const newValue = e.target.value;
    setTableData((prevTableData) => {
      const newTableData = prevTableData.map(row => {
        if (row.id === rowId) {
          return { ...row, [key]: newValue };
        }
        return row;
      });
      return newTableData;
    });
  };

  const editRow = (rowId) => {
    setEditingRow(rowId);
  };

  const saveEditRow = () => {
    setEditingRow(null);
  };

  const removeRow = (rowId) => {
    setTableData((prevTableData) => prevTableData.filter((row) => row.id !== rowId));
    setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((id) => id !== rowId));
  };

  const handleRedirect = () => {
    router.push('/finance/financialmovement');
  };

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={`overflow-x-auto ${enableScroll ? 'scroll-x' : ''}`}>
      <table className="divide-y divide-gray-200 table-fixed">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 sm:py-3">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                aria-label="Select all rows"
              />
            </th>
            {Object.keys(data[0] || {}).map((key) => (
              <th key={key} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 sm:py-3" onClick={() => handleSort(key)}>
                {key}
                {sortSvg(key)}
              </th>
            ))}
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6 sm:py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row) => (
            <tr key={row.id}>
              <td className="px-3 py-2 whitespace-nowrap sm:px-6 sm:py-4">
                <input
                  type="checkbox"
                  checked={isSelected(row.id)}
                  onChange={(event) => handleCheckboxChange(event, row.id)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                />
              </td>
              {Object.keys(row).filter(key => key !== 'id').map((key, i) => (
                <td key={i} className="px-3 py-2 whitespace-nowrap sm:px-6 sm:py-4 text-gray-700">
                  {editingRow === row.id ? (
                    <input
                      type="text"
                      value={row[key]}
                      onChange={(e) => handleEditRowChange(e, row.id, key)}
                      className="w-full text-gray-700"
                    />
                  ) : (
                    row[key]
                  )}
                </td>
              ))}
              <td className="px-3 py-2 whitespace-nowrap sm:px-6 sm:py-4">
                {isSelected(row.id) && (
                  editingRow === row.id ? (
                    <button onClick={saveEditRow} className="bg-green-500 text-white rounded-md px-4 py-1">Save</button>
                  ) : (
                    <div className="flex flex-col">
                      <button onClick={() => editRow(row.id)} className="bg-blue-500 text-white rounded-md px-4 py-1 my-1">Edit</button>
                      <button onClick={() => removeRow(row.id)} className="bg-red-500 text-white rounded-md px-4 py-1 my-1">
                        Delete
                      </button>
                    </div>
                  )
                )}
              </td>
            </tr>
          ))}
          {newRow && (
            <tr key={newRow.id}>
              <td className="px-3 py-2 whitespace-nowrap sm:px-6 sm:py-4">
                <input type="checkbox" disabled className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
              </td>
              {Object.keys(newRow).filter(key => key !== 'id').map((key, i) => (
                <td key={i} className="px-3 py-2 whitespace-nowrap sm:px-6 sm:py-4">
                  {key === 'Data Vencimento' ? (
                    <DateInput />
                  ) :
                    <input
                      type="text"
                      value={newRow[key]}
                      onChange={(e) => handleNewRowChange(e, key)}
                      className="w-full text-gray-700 border-b-2"
                    />
                  }
                </td>
              ))}
              <td className="px-3 py-2 whitespace-nowrap sm:px-6 sm:py-4">
                <button onClick={saveNewRow} className="bg-green-500 text-white rounded-md px-4 py-1">Save</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={handleRedirect} className="bg-blue-500 text-white rounded-xl w-16 h-10 mt-2 flex justify-center">
        <img src="/add-circle-solid-svgrepo-com.svg" alt="Add new finance movement" className="my-2"/>
      </button>
    </div>
  );
}
