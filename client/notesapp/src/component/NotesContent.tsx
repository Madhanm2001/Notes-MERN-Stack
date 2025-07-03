import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faArrowDownShortWide, faArrowUpAZ, faArrowUpShortWide,faTrash, faThumbtack,faFileCirclePlus,faArrowUpFromBracket, faPenToSquare, faBars, faFilter, faArrowUpZA, faList, faListSquares, faEdit, faArchive, faClock } from '@fortawesome/free-solid-svg-icons';
import AllFolders from './AllFolders';


const NotesContent = () => {
  return (
    <div >
        <div className='m-[20px]'>
          <AllFolders/>
        </div>

      <div className='flex flex-col justify-center items-center h-screen'>
        <div className='bg-[#3c3c3c] max-[500px]:flex-start max-[500px]:h-[30%] h-[20%] w-[80%] p-5 m-3 my-auto rounded flex justify-between flex-wrap gap-[15px]'>
          <div className='my-auto'>
          <div className='flex gap-10'><h1 className='font-bold truncate w-[110px] text-white'>Workout Split Workout SplitWorkout SplitWorkout Split</h1><span className='text-[10px] mt-[8px] bg-[#cdca00] font-bold rounded-full px-[10px]'>Archived</span></div>
         <p className='text-white text-[12px] flex gap-[10px] my-[10px]'><span><FontAwesomeIcon className='text-white' icon={faClock}/></span> Jun 8, 2025, 12:00 AM</p>
          </div>
          <div className='flex justify-center gap-[20px] my-auto text-white'>
              <FontAwesomeIcon icon={faTrash} className='hover:text-red-500 cursor-pointer' />
              <FontAwesomeIcon icon={faEdit} className='hover:text-yellow-500 cursor-pointer' />
              <div className="shadow rounded flex ">
                <FontAwesomeIcon
                  icon={faThumbtack}
                  className={`${1?'text-[#00809f]':"text-white"} cursor-pointer [#00809f] hover:text-blue-500 transition-colors duration-300 ms-auto`}
                  style={{ transform: "rotate(45deg)" }}
                />
              </div>
              <FontAwesomeIcon icon={faArrowUpFromBracket} className='hover:text-green-500 cursor-pointer' />

          </div>
        </div>
        <div className='bg-[#3c3c3c] h-[60%] w-[80%] p-5 m-3 rounded text-white overflow-y-scroll hide-scrollbar'>
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
          col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2col-2
        </div>
      </div>
    </div>
  )
}

export default NotesContent
