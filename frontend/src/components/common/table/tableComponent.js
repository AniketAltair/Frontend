import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import PopUp from "../tablepopUp/popUp";

const TableComponent = ({ data, columns }) => {
  const recordsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Filter and Sort Logic
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  // Handlers
  const handlePageChange = (page) => setCurrentPage(page);

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const handleViewRow = (record) => {
    const popupData = {
      From: record.sender,
      Date: record.date,
      Message: record.message,
    };
    setSelectedRow(popupData);
  };

  const handleClosePopup = () => setSelectedRow(null);

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border-2 border-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-xl text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-xl rounded-md">
        <table className="min-w-full text-left border-2 border-red-500 rounded-md">
          <thead className="bg-gray-100 rounded-md">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-2 cursor-pointer rounded-md text-red-500"
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  {column.label}{" "}
                  {sortConfig.key === column.key
                    ? sortConfig.direction === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record, index) => (
              <tr key={index} className="border-t hover:bg-red-100 text-black">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-2">
                    {column.key === "message" ? (
                      <span className="inline-block max-w-xs truncate">
                        {record[column.key].length > 20
                          ? record[column.key].substring(0, 20) + "..."
                          : record[column.key]}
                      </span>
                    ) : column.key === "view" ? (
                      <button
                        onClick={() => handleViewRow(record)}
                        className="text-black hover:text-red-700"
                      >
                        <FaEye />
                      </button>
                    ) : (
                      record[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded-lg ${
              currentPage === index + 1
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-red-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Popup */}
      <PopUp isOpen={!!selectedRow} data={selectedRow} onClose={handleClosePopup} />
    </div>
  );
};

export default TableComponent;
