import React from 'react'

const AuthButton = ({text}) => {
  return (
    <button
        aria-label="sign-in"
        className="bg-white/5 z-[999] relative px-3 py-1.5 shadow rounded-xl flex items-center justify-center border-2 border-black">
            {text}
    </button>
  )
}

export default AuthButton;
