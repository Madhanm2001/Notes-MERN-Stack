import React from 'react'
import AddNotes from '../images/AddNotes.jpg'
import deleteLogo from '../images/delete.png'
import editLogo from '../images/edit.jpg'
import ArchivedLogo from '../images/Archived.png'
import ispinnedLogo from '../images/ispinned.jpg'
import notpinnedLogo from '../images/notpinned.jpg'
import appLogo from '../images/AppLogo.jpg'
import filterIcon from '../images/filterIcon.jpg'
import '../styles/folder.css'
import searchLogo from '../images/searchLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownShortWide, faArrowUpAZ, faArrowUpShortWide, faArrowUpZA } from '@fortawesome/free-solid-svg-icons';



const AllNotes: React.FC = () => {

  const folderList = ['workout routine workout routine workout routine workout routine workout routineworkout routine workout routine workout routine workout routine workout routineworkout routine workout routine workout routine workout routine workout routine', "workout routine", "workout routine", "workout routine", "workout routine", "workout routine", "workout routine"]
  const sortOptions = ['A-Z', 'Z-A', 'old-new', 'new-old']
  return (
    <div>
      <div className='flex flex-wrap z-[-100] justify-between m-[25px] relative'>
        <img src={AddNotes} id="Addnotes" title='Add-Notes' className='cursor-pointer' alt="" />
        <div className='flex gap-[80px] max-sm:gap-[10px] flex-wrap relative'>
          <span className='flex'>
            <input
              type="text"
              className='border-[2px] border-white h-[35px] sm:w-[500px] w-[200px] rounded-tl rounded-bl mt-[25px] max-sm:ml-[20px]'
            />
            <img
              className='h-[10px] w-[10px] mt-[25px] h-[35px] w-[35px] p-[8px] bg-[#313131] rounded-tr rounded-br'
              src={searchLogo}
              alt=""
            />
          </span>
        </div>
        <p className='text-white mt-[25px] max-sm:ml-[20px]'>clear all</p>
      </div>

      <div className='flex flex-wrap justify-around max-[430px]:flex-col max-[430px]:items-center'>
        <ul className='flex gap-[5%]'>
          <li><FontAwesomeIcon icon={faArrowUpAZ} style={{ width: "20px", height: "20px" }} className='fa-sharp fa-solid fa-arrow-up-a-z bg-[#cdca00] p-2 rounded' /></li>
          <li><FontAwesomeIcon icon={faArrowUpZA} style={{ width: "20px", height: "20px" }} className="fa-solid fa-arrow-up-z-a bg-[#cdca00] p-2 rounded" /></li>
          <li><FontAwesomeIcon icon={faArrowDownShortWide} style={{ width: "20px", height: "20px" }} className="fa-solid fa-arrow-down-wide-short bg-[#cdca00] p-2 rounded" /></li>
          <li><FontAwesomeIcon icon={faArrowUpShortWide} style={{ width: "20px", height: "20px" }} className="fa-solid fa-arrow-down-wide-short bg-[#cdca00] p-2 rounded" /></li>
        </ul>
        <select
          name=""
          id=""
          className="border-2 border-white rounded text-white bg-black px-3 py-2 w-[200px] max-[430px]:mt-[10%]"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>


      </div>


      {/* <h3 className='text-center text-white font-sans font-weight-[4vh] m-[2.5vh] text-[4vh]'>Folders</h3> */}

      <ul id='folders'>
        {folderList.map((data, id) => {

          return <li key={id} className='shadow-[0px_0px_10px_2px_#989898] p-[15px] rounded-[10px] my-[10px] '>
            <img src={notpinnedLogo} alt="" className='h-[30px] w-[30px] my-[10px] ms-auto' />
            <img className='mx-auto my-[8px]' id='noteslogo' src={appLogo} alt="" /><p id='folderName'>{data}</p>
            <div className='flex justify-center gap-[20px] my-[10px]'>
              <img src={deleteLogo} alt="" className='h-[25px] w-[25px] my-[10px]' />
              <img src={editLogo} alt="" className='h-[25px] w-[25px] my-[10px]' />
              <img src={ArchivedLogo} alt="" className='h-[25px] w-[25px] my-[10px]' />
            </div>
          </li>

        })}
      </ul>
    </div>
  )
}


export default AllNotes
