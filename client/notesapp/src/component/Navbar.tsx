import React, { useEffect, useRef, useState, type RefObject } from 'react'
import notesLogo from '../images/notesinsideLogo.png'
import profileLogo from '../images/ProfileLogo.jpg'
import '../styles/Navbar.css'
import { href, Link , useNavigate } from 'react-router-dom'
import homeLogo from '../images/homeLogo.png'
import useLocalStorage from '../hooks/UseLocalStorage'

const Navbar: React.FC = () => {

  const navigate=useNavigate()
  const[isProfileOpen,setIsProfileOpen]=useState(false)
  const[activetab,setActivetab]=useState('home')
  const{setItem,getItem,deleteItem}=useLocalStorage()


const activeRef: any= useRef(null)

useEffect(()=>{

  const onOverlayClick = (e:any) => {
      if (activeRef.current && !activeRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", onOverlayClick);

  return () => {
      document.removeEventListener("mousedown", onOverlayClick);
    };

},[])

  return (
    <div id="navbarWrap">
  <ul id="Navbar">

   {window.location.pathname.includes('/auth')&&<li>
   <div className='flex gap-1'>
    <img title='All-Notes' className={`h-[55px] w-[55px]  text-white bg-black rounded-[100px]`} src={notesLogo} alt="" />
    <span><h2 className='text-white my-[10px]'>NotesApp</h2></span>
   </div>
    </li>} 
    {/* {window.location.pathname.includes('/auth')&&<li><h2 className='text-white'>NotesApp</h2></li>
    } */}
    
   {!window.location.pathname.includes('/auth')&& <li>
      <Link to="/" onClick={()=>setActivetab('home')}>
        <img id="Homelogo" src={homeLogo} alt="" className={`${
        window.location.pathname === '/'
          ? "shadow-[0px_0px_10px_2px_#989898] text-white bg-black rounded-[100px]"
          : ""
      }`}/>
      </Link>
    </li>}

    {!window.location.pathname.includes('/auth')&&<li>
      <Link to="/notes" onClick={(e) => { setActivetab('notes'),window.location.href='/notes';
}}>
        <img title='All-Notes' className={`h-[55px] w-[55px] ${window.location.pathname=='/notes'
          ? "shadow-[0px_0px_10px_2px_#989898] text-white bg-black rounded-[100px]"
          : ""
      }`} src={notesLogo} alt="" />
      </Link>
    </li>}

    {/* <li
      className={`mt-[20px] text-[min(5vw,20px)] ${
        activeTab === true
          ? "border-b-[5px] rounded-[1px] border-yellow-400 text-white"
          : "text-white"
      }`}
    >
      <Link
        onClick={() => setActiveTab(true)}
        to="/all-notes"
        className="text-[min(5vw,18px)] font-semibold"
      >
        all-notes
      </Link>
    </li> */}

    {!window.location.pathname.includes('/auth')&&<div className='relative text-white bg-black rounded-[100px]' ref={activeRef}>
      <li onClick={() => setIsProfileOpen(!isProfileOpen)}>
        <img id="Profilelogo" src={profileLogo} alt="" />
      </li>

      {isProfileOpen && (
        <ul
          id="ProfileList"
          className="z-50 cursor-pointer absolute top-[100%] right-[2%] font-semibold text-white bg-black shadow-[0px_0px_10px_2px_#989898] rounded p-[10px] w-[150px]"
        >
          <li
            className="border-b-[2px] p-[5%]"
            onClick={() => {
              navigate("/profile");
              setIsProfileOpen(false);
            }}
          >
            Profile
          </li>
          <li
            className="p-[5%]"
            onClick={() => {
              navigate("/auth");
              setIsProfileOpen(false);
              deleteItem('NotesToken')
            }}
          >
            Sign-out
          </li>
        </ul>
      )}
    </div>}
  </ul>
</div>

  )
}

export default Navbar
