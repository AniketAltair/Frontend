import React from 'react'

const ToastComponent = ({toastMessage,toastVisible,istoastValidtype}) => {
  return (
    <>
    {toastVisible && (
        <div
        className={`fixed top-[75px] right-1 px-4 py-2 rounded-lg shadow-lg ${
          istoastValidtype ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        {toastMessage}
      </div>
      
      )}
    </>
  )
}

export default ToastComponent;