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
import { faArrowDownShortWide, faArrowUpAZ, faArrowUpShortWide,faTrash, faThumbtack,faFileCirclePlus,faArrowUpFromBracket, faPenToSquare, faBars, faFilter, faArrowUpZA, faList, faListSquares, faEdit, faArchive, faClock, faSort } from '@fortawesome/free-solid-svg-icons';
import pinnedLogo from '../images/ispinned.jpg'
import FormModal from '../common/FormModal'
import TextEditor from '../common/TextEditor'
import AllFolders from './AllFolders'


const AllNotes: React.FC = () => {

  const folderList = [{ data: "workout routine", isPinned: false }, { data: "workout routine", isPinned: true }, { data: "workout routine", isPinned: false }, { data: "workout routine", isPinned: false }, { data: "workout routine", isPinned: true }, { data: "workout routine", isPinned: false }]
  const sortOptions = ['A-Z', 'Z-A', 'old-new', 'new-old']
  const [filterVal, setFilterVal] = useState('All')
  const [isFilter, setIsFilter] = useState(false)
  const [isSort, setIsSort] = useState(false)
  const [SortVal, setSortVal] = useState('')
  const [content, setContent] = useState('<p>Hello World!</p>')
  const [show, setShow] = useState(false)

  const onClickFilter = (data: string | undefined) => {
    setFilterVal(data ? data : '')
  }
  const onClickPinned = (id: any) => {



  }
  const handleSortClick = (sortValue:any) => {
  setSortVal(sortValue);
  navigator.clipboard.writeText(sortValue)
    .then(() => console.log("Copied:", sortValue))
    .catch(err => console.error("Copy failed", err));
}
  return (

    
    <div>
      
      <div className='flex flex-wrap justify-between m-[25px] relative'>
        <AllFolders/>
        {/* <FontAwesomeIcon icon={faFileCirclePlus} style={{height:'40px',width:'40px'}} className={`${show?'text-[#cdca00]':'text-[#878787]'} mt-[20px] cursor-pointer`} onClick={()=>setShow(true)}/> */}
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
        <p className='text-white mt-[25px] max-sm:ml-[20px] cursor-pointer hover:text-red-500'>clear all</p>
      </div>

      <FormModal
        show={show}
        isclose={true}
        isNotes={true}
        onclose={() => setShow(false)}
        onlayoutclose={() => setShow(false)}
        cancel={() => setShow(false)}
        header={'Create-Notes'}
        content={<>
          <div className='layoutField'>
            <label htmlFor="" className='layoutLabel'>Title:</label>
            <input type="text" className='layoutInput'/>
          </div>
          <div className='layoutField'>
            <label htmlFor="" className='layoutLabel'>Content:</label>
            <div> <TextEditor content={content} onChange={setContent} /></div>
          </div>
        </>}
        footer={
          <>
            <button className='button'>submit</button>
            <button className='button' onClick={() => setShow(!show)}>cancel</button>
          </>
        }
      />

      <div className='flex justify-between m-[25px]'>
        <li className='cursor-pointer flex gap-[50px]'>
          <FontAwesomeIcon icon={faFilter} style={{ width: "23px", height: "23px" }} className={`fa-solid fa-bars-filter ${isFilter ? 'text-black bg-[#cdca00]' : 'text-black bg-[#878787]'} p-2 rounded`} onClick={() => { setIsFilter(!isFilter), setIsSort(false) }} />
        <FontAwesomeIcon icon={faFileCirclePlus} style={{height:'40px',width:'40px'}} className={`${show?'text-[#cdca00]':'text-[#878787]'} cursor-pointer`} onClick={()=>setShow(true)}/>
          </li>
        <li className='cursor-pointer'><FontAwesomeIcon onClick={() => { setIsSort(!isSort), setIsFilter(false) }} icon={faSort} style={{ width: "23px", height: "23px" }} className={`fa-solid fa-bars-filter ${isSort ? 'text-black bg-[#cdca00]' : 'text-black bg-[#878787]'} p-2 rounded`} /></li>
      </div>

      <div className='flex justify-between w-[100%]'>
        <div className='flex bg-black p-3 gap-[3%] rounded mt-[5px] w-[100%] flex-wrap'>

          {isFilter && <>
            <button onClick={() => onClickFilter('All')} className={`p-[2px_10px] cursor-pointer w-[100px] h-[30px] mt-[5px] ${filterVal === 'All' ? 'text-black bg-[#cdca00]' : 'text-white bg-[#5c5c5c]'} font-semibold rounded-[20px]`}>All</button>
            <button onClick={() => onClickFilter('Active')} className={`p-[2px_10px] cursor-pointer w-[100px] h-[30px] mt-[5px] ${filterVal === 'Active' ? 'text-black bg-[#cdca00]' : 'text-white bg-[#5c5c5c]'} font-semibold rounded-[20px]`}>Active</button>
            <button onClick={() => onClickFilter('Archived')} className={`p-[2px_10px] cursor-pointer w-[100px] h-[30px] mt-[5px] ${filterVal === 'Archived' ? 'text-black bg-[#cdca00]' : 'text-white bg-[#5c5c5c]'} font-semibold rounded-[20px]`}>Archived</button>
          </>}
        </div>

        {isSort && <ul className='flex max-[400px]:gap-[3%] gap-[10%] mt-[20px] flex-wrap'>
          <li className='cursor-pointer'><FontAwesomeIcon icon={faArrowUpAZ} style={{ width: "20px", height: "20px" }} onClick={() => setSortVal('a-z')} className={`fa-sharp fa-solid fa-arrow-up-a-z ${SortVal === 'a-z' ? 'text-black bg-[#cdca00]' : 'text-white bg-[#5c5c5c]'} p-2 rounded`} /></li>
          <li className='cursor-pointer'><FontAwesomeIcon icon={faArrowUpZA} style={{ width: "20px", height: "20px" }} onClick={() => setSortVal('z-a')} className={`fa-sharp fa-solid fa-arrow-up-a-z ${SortVal === 'z-a' ? 'text-black bg-[#cdca00]' : 'text-white bg-[#5c5c5c]'} p-2 rounded`} /></li>
          <li className='cursor-pointer'><FontAwesomeIcon icon={faArrowDownShortWide} style={{ width: "20px", height: "20px" }} onClick={() => setSortVal('new to old')} className={`fa-sharp fa-solid fa-arrow-up-a-z ${SortVal === 'new to old' ? 'text-black bg-[#cdca00]' : 'text-white bg-[#5c5c5c]'} p-2 rounded`} /></li>
          <li className='cursor-pointer'><FontAwesomeIcon icon={faArrowUpFromBracket} style={{ width: "20px", height: "20px" }} onClick={() => setSortVal('old to new')} className={`fa-sharp fa-solid fa-arrow-up-a-z ${SortVal === 'old to new' ? 'text-black bg-[#cdca00]' : 'text-white bg-[#5c5c5c]'} p-2 rounded`} /></li>
        </ul>}


      </div>




      {/* <div className='flex gap-[3%]'>
        <button className='bg-[#cdca00] p-[2px_10px] text-black font-semibold rounded-[20px]'>All</button>
        <button className='bg-[#cdca00] p-[2px_10px] text-black font-semibold rounded-[20px]'>Active</button>
        <button className='bg-[#cdca00] p-[2px_10px] text-black font-semibold rounded-[20px]'>Archived</button>
      </div> */}


      {/* <h3 className='text-center text-white font-sans font-weight-[4vh] m-[2.5vh] text-[4vh]'>Folders</h3> */}

      <ul id='folders' className='max-sm:justify-center'>
        {folderList.map((data, id) => {
          return (<li key={id} className='shadow-[0px_0px_10px_2px_#989898] p-[25px] rounded-[10px] my-[10px] w-[200px] hover:scale-[1.02]'>
             <div className="shadow rounded flex ">
  <FontAwesomeIcon
    icon={faThumbtack}
    className={`${data.isPinned?'text-[#00809f]':"text-[#878787]"} hover:text-blue-500 transition-colors duration-300 ms-auto`}
    style={{ transform: "rotate(45deg)" }}
  />
</div>

            <img className='mx-auto my-[8px]' id='noteslogo' src={appLogo} alt="" /><p id='folderName' className='text-center truncate w-full'>{data.data}</p>
            <div className='flex justify-center gap-[25px] my-[25px]'>
              <FontAwesomeIcon icon={faTrash} className='text-[#878787] hover:text-red-500' />
              <FontAwesomeIcon icon={faEdit} className='text-[#878787] hover:text-yellow-500' />
              <FontAwesomeIcon icon={faArchive} className='text-[#878787] hover:text-orange-500' />
              <FontAwesomeIcon icon={faArrowUpFromBracket} onClick={() => handleSortClick('old to new')} className='text-[#878787] hover:text-green-500' />
            </div>
         <p className='text-[#878787] text-[13px] flex justify-center gap-[10px] '><span><FontAwesomeIcon className='text-[#878787]' icon={faClock}/></span> Jun 8, 2025, 12:00 AM</p>
          </li>)
        })}
      </ul>
    </div>
  )
}


export default AllNotes
