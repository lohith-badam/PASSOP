import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuivdv4 } from 'uuid';
const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }


    const showPassword = () => {
        //alert("show the password");
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "text"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "password"
        }
    }

    const savePassword = () => {

        setPasswordArray([...passwordArray, { ...form, id: uuivdv4() }])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuivdv4() }]))
        console.log([...passwordArray, { ...form, id: uuivdv4() }])
        setForm ({ site: "", username: "", password: "" })
    }
    const deletePassword = (id) => {
        console.log("deleting password with id", id)
        setPasswordArray(passwordArray.filter(item => item.id !== id))
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
    }
    const editPassword = (id) => {
        console.log("editing password with id", id)
        setForm(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))

    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
            <div className="md:mycontainer">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-green-700'>&lt;</span>
                    Pass
                    <span className='text-green-700'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-center'>Your own Password Manager</p>
                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} className="rounded-full border border-green-500 w-full p-4 py-1" type="text" name='site' placeholder='Enter website URL' id='' />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} className="rounded-full border border-green-500 w-full p-4 py-1" type="text" name='username' placeholder='Enter Username' id='' />
                        <div className="relative">
                            <input value={form.password} ref={passwordRef} onChange={handleChange} className="rounded-full border border-green-500 w-full p-4 py-1" type="text" name='password' placeholder='Enter Password' id='' />
                            <span className='absolute right-0 top-1 cursor-pointer' onClick={showPassword}>
                                <img width={24} src="icons/eye.png" alt="eye" ref={ref} />
                            </span>
                        </div>

                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-400 hover:bg-green-500 gap-2 rounded-full px-4 py-2 w-fit'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover" >
                        </lord-icon>Save Password</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}

                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className='w-32 py-2 border border-white items-center justify-center'>
                                            <div className='flex items-center justify-center text-center'>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className="lordiconcopy cursor-pointer justify-center text-center" onClick={() => { copyText(item.site) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>

                                        <td className='w-32 py-2 border border-white items-center justify-center'>
                                            <div className='flex items-center justify-center text-center'>
                                                {item.username}
                                                <div className="lordiconcopy cursor-pointer justify-center text-center" onClick={() => { copyText(item.username) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='w-32 py-2 border border-white items-center justify-center'>
                                            <div className='flex items-center justify-center text-center' >
                                                {item.password}
                                                <div className="lordiconcopy cursor-pointer justify-center text-center" onClick={() => { copyText(item.password) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover" >
                                                    </lord-icon>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='w-32 py-2 border border-white items-center justify-center text-center'>
                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager
