import React, { useState } from "react";
import { FaEye, FaEdit, FaPaperPlane  } from "react-icons/fa";
import PopUp from "../tablepopUp/popUp";

const TableComponent = ({ data, columns }) => {
  const recordsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [popUpAction,setPopUpAction] = useState("");

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
  const currentRecords = sortedData.slice(indexOfFirstRecord, indexOfLastRecord);

  // Handlers
  const handlePageChange = (page) => setCurrentPage(page);

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const handleViewRow = (record,action) => {
    if(action==="view"){
      setPopUpAction("view");
    }else{
      setPopUpAction("edit");
    }

    let popupData = {};

    columns.forEach((col) => {
      if((col.key)!=="view" && (col.key)!=="edit" && (col.key)!=="send"){
        popupData = Object.assign({}, popupData, {
          [col.label]: record[col.key],
        });
      }
    });
    setSelectedRow(popupData);
  };

  const handleClosePopup = () => setSelectedRow(null);

  const handleSendNotification = (record) => {
    console.log(record);
  }

  return (
    <div>
      {/* Check for empty data */}
      {data.length === 0 ? (
        <p className="text-center text-gray-600">No available data</p>
      ) : (
        <>
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
                {currentRecords.length > 0 ? (
                  currentRecords.map((record, index) => (
                    <tr key={index} className="border-t hover:bg-red-100 text-black">
                      {columns.map((column) => (
                        <td key={column.key} className="px-4 py-2">
                          {(column.key === "sendTo")?
                          <span className="text-[12px] text-green-700">
                            Click View button to view Members
                          </span>:
                          (column.key === "message" || column.key === "address") ? (
                            <span className="inline-block max-w-xs truncate">
                              {record[column.key].length > 20
                                ? record[column.key].substring(0, 20) + "..."
                                : record[column.key]}
                            </span>
                          ) : column.key === "send" ? (
                            <button
                              onClick={() => handleSendNotification(record)}
                              className="text-black hover:text-red-700"
                            >
                              <FaPaperPlane />
                            </button>
                          )
                          : column.key === "view" ? (
                            <button
                              onClick={() => handleViewRow(record,"view")}
                              className="text-black hover:text-red-700"
                            >
                              <FaEye />
                            </button>
                          ) : column.key === "edit" ? (
                            <button
                              onClick={() => handleViewRow(record, "edit")}
                              className="text-black hover:text-red-700"
                            >
                              <FaEdit />
                            </button>
                          ) : (
                            record[column.key]
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="text-center px-4 py-2 text-gray-500"
                    >
                      No data available
                    </td>
                  </tr>
                )}
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
          <PopUp
            isOpen={!!selectedRow}
            data={selectedRow}
            onClose={handleClosePopup}
            action={popUpAction}
          />
        </>
      )}
    </div>
  );
};

export default TableComponent;
