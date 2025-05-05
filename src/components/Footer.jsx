import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col fixed bottom-0 w-full justify-center items-center'>
            <div className="logo font-bold text-white text-2xl">
                <span className='text-green-700'>&lt;</span>
                Pass
                <span className='text-green-700'>OP/&gt;</span>
            </div>
            <div className='flex'>
                Created with love <img className='w-7' src="icons/heart.png" alt="" />
                by Lohith 
            </div>

        </div>
    )
}

export default Footer
