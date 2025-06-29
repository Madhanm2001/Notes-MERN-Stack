import React, { useEffect, useRef, useState } from 'react'
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
import { faArrowDownShortWide, faArrowUpAZ, faArrowUpShortWide,faBars, faFilter, faArrowUpZA, faList, faListSquares } from '@fortawesome/free-solid-svg-icons';
import pinnedLogo from '../images/ispinned.jpg' 


const AllNotes: React.FC = () => {

  const folderList = [{data:"workout routine",isPinned:false}, {data:"workout routine",isPinned:true}, {data:"workout routine",isPinned:false}, {data:"workout routine",isPinned:false}, {data:"workout routine",isPinned:true}, {data:"workout routine",isPinned:false}]
  const sortOptions = ['A-Z', 'Z-A', 'old-new', 'new-old']
  const [filterVal, setFilterVal] = useState('All')
  const [isFilter, setIsFilter] = useState(false)
  const [isSort, setIsSort] = useState(false)
  const [SortVal, setSortVal] = useState('')

  const onClickFilter = (data: string | undefined) => {
    setFilterVal(data ? data : '')
  }
  const onClickPinned=(id:any)=>{

 

  }
  return (
    <div>
      <div className='flex flex-wrap justify-between m-[25px] relative'>
        <img src={AddNotes} id="Addnotes" title='Add-Notes' className='cursor-pointer' alt="" />
        <div className='flex gap-[80px] max-sm:gap-[10px] flex-wrap relative'>
          <span className='flex gap-1'>
            <input
              type="text"
              className='border-[2px] border-white text-white h-[35px] sm:w-[500px] w-[200px] rounded mt-[25px] max-sm:ml-[20px]'
            />
            <img
              className='h-[10px] w-[10px] mt-[25px] p-[0_10px] h-[35px] w-[35px] p-[8px] bg-[#313131] rounded'
              src={searchLogo}
              alt=""
            />
          </span>
        </div>
        <p className='text-white mt-[25px] max-sm:ml-[20px] cursor-pointer'>clear all</p>
      </div>

      {/*old filter and sort tags
       <div className='flex flex-wrap justify-around max-[430px]:flex-col max-[430px]:items-center'>
        <ul className='flex justify-center gap-[10%]'>
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


      </div> */}

      <div className='flex justify-between'>
        <li className='cursor-pointer' onClick={() => {setIsFilter(!isFilter),setIsSort(false)}}><FontAwesomeIcon icon={faFilter} style={{ width: "25px", height: "25px" }} className={`fa-solid fa-bars-filter ${isFilter ? 'text-black bg-[#cdca00]' : 'text-white bg-[#313131]'} p-2 rounded`} /></li>
        <li className='cursor-pointer'><FontAwesomeIcon onClick={() => {setIsSort(!isSort),setIsFilter(false)}} icon={faListSquares} style={{ width: "25px", height: "25px" }} className={`fa-solid fa-bars-filter ${isSort ? 'text-black bg-[#cdca00]' : 'text-white bg-[#313131]'} p-2 rounded`} /></li>
      </div>

      <div className='flex justify-between w-[100%]'>
        <div className='flex bg-black p-3 gap-[3%] rounded mt-[5px] w-[100%] flex-wrap'>
          
            {isFilter &&<>
              <button onClick={() => onClickFilter('All')} className={`p-[2px_10px] cursor-pointer w-[100px] h-[30px] mt-[5px] ${filterVal === 'All' ? 'text-black bg-[#cdca00]' : 'text-white bg-[#5c5c5c]'} font-semibold rounded-[20px]`}>All</button>
              <button onClick={() => onClickFilter('Active')} className={`p-[2px_10px] cursor-pointer w-[100px] h-[30px] mt-[5px] ${filterVal === 'Active' ? 'text-black bg-[#cdca00]' : 'text-white bg-[#5c5c5c]'} font-semibold rounded-[20px]`}>Active</button>
              <button onClick={() => onClickFilter('Archived')} className={`p-[2px_10px] cursor-pointer w-[100px] h-[30px] mt-[5px] ${filterVal === 'Archived' ? 'text-black bg-[#cdca00]' : 'text-white bg-[#5c5c5c]'} font-semibold rounded-[20px]`}>Archived</button>
              </> }
        </div>

        {isSort && <ul className='flex max-[400px]:gap-[3%] gap-[10%] mt-[20px] flex-wrap'>
          <li className='cursor-pointer'><FontAwesomeIcon icon={faArrowUpAZ} style={{ width: "20px", height: "20px" }} onClick={() => setSortVal('a-z')} className={`fa-sharp fa-solid fa-arrow-up-a-z ${SortVal === 'a-z' ? 'text-black bg-[#cdca00]' : 'text-white bg-[#5c5c5c]'} p-2 rounded`} /></li>
          <li className='cursor-pointer'><FontAwesomeIcon icon={faArrowUpZA} style={{ width: "20px", height: "20px" }} onClick={() => setSortVal('z-a')} className={`fa-sharp fa-solid fa-arrow-up-a-z ${SortVal === 'z-a' ? 'text-black bg-[#cdca00]' : 'text-white bg-[#5c5c5c]'} p-2 rounded`} /></li>
          <li className='cursor-pointer'><FontAwesomeIcon icon={faArrowDownShortWide} style={{ width: "20px", height: "20px" }} onClick={() => setSortVal('new to old')} className={`fa-sharp fa-solid fa-arrow-up-a-z ${SortVal === 'new to old' ? 'text-black bg-[#cdca00]' : 'text-white bg-[#5c5c5c]'} p-2 rounded`} /></li>
          <li className='cursor-pointer'><FontAwesomeIcon icon={faArrowUpShortWide} style={{ width: "20px", height: "20px" }} onClick={() => setSortVal('old to new')} className={`fa-sharp fa-solid fa-arrow-up-a-z ${SortVal === 'old to new' ? 'text-black bg-[#cdca00]' : 'text-white bg-[#5c5c5c]'} p-2 rounded`} /></li>
        </ul>}


      </div>




      {/* <div className='flex gap-[3%]'>
        <button className='bg-[#cdca00] p-[2px_10px] text-black font-semibold rounded-[20px]'>All</button>
        <button className='bg-[#cdca00] p-[2px_10px] text-black font-semibold rounded-[20px]'>Active</button>
        <button className='bg-[#cdca00] p-[2px_10px] text-black font-semibold rounded-[20px]'>Archived</button>
      </div> */}


      {/* <h3 className='text-center text-white font-sans font-weight-[4vh] m-[2.5vh] text-[4vh]'>Folders</h3> */}

      <ul id='folders'>
        {folderList.map((data, id) => {
          return <li key={id} className='shadow-[0px_0px_10px_2px_#989898] p-[15px] rounded-[10px] my-[10px] w-[250px]'>
            <img src={data.isPinned?pinnedLogo:notpinnedLogo} onClick={onClickPinned} alt="" className='h-[30px] w-[30px] my-[10px] ms-auto' />
            <img className='mx-auto my-[8px]' id='noteslogo' src={appLogo} alt="" /><p id='folderName' className='text-center truncate w-full'>{data.data}</p>
            <div className='flex justify-center gap-[20px] my-[10px]'>
              <img src={deleteLogo} alt="" className='h-[25px] w-[25px] my-[10px]' />
              <img src={editLogo} alt="" className='h-[25px] w-[25px] my-[10px]' />
              <img src={ArchivedLogo} alt="" className='h-[25px] w-[25px] my-[10px]' />\
            </div>
            <p className='text-white text-center'>updated-date : June-08-2001</p>
          </li>
        })}
      </ul>
    </div>
  )
}


export default AllNotes
