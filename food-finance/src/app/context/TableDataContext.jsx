'use client';
import React, { createContext, useState } from 'react';

const TableDataContext = createContext();

export const TableDataProvider = ({ children }) => {
    const [tableData, setTableData] = useState([]);

    return (
        <TableDataContext.Provider value={{ tableData, setTableData }}>
            {children}
        </TableDataContext.Provider>
    );
};

export default TableDataContext;
