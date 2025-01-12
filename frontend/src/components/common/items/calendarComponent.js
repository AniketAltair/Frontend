import React from 'react';

const CalendarComponent = ({
  isOpen,
  selectedDate,
  handleChangeDate,
  dates,
  rows,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="border-red-500 border-2 bg-white p-6 rounded-lg shadow-lg max-w-md w-[300px] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-7 gap-2">
          {/* Weekday headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-sm text-center font-bold text-red-500">
              {day}
            </div>
          ))}

          {/* Dates */}
          {rows.map((row, rowIndex) =>
            row.map((date, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={`p-2 rounded-lg hover:bg-blue-100 border border-gray-300 text-sm text-center ${
                  date &&
                  selectedDate &&
                  selectedDate.toDateString() === date.toDateString()
                    ? 'bg-red-400 text-white'
                    : 'bg-white text-gray-800'
                } ${!date ? 'invisible' : ''}`}
                onClick={() => {
                  if (date) {
                    handleChangeDate(date);
                    onClose();
                  }
                }}
              >
                {date ? date.getDate() : ''}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;