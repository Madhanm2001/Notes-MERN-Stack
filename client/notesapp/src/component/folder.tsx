import React, { useState } from 'react'
import AddFolder from '../images/AddFolder.png'
import folderLogo from '../images/folderLogo.jpg'
import deleteLogo from '../images/delete.png'
import filterIcon from '../images/filterIcon.jpg'
import AddNotes from '../images/AddNotes.jpg'
import editLogo from '../images/edit.jpg'
import '../styles/folder.css'
import searchLogo from '../images/searchLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownShortWide, faArrowUpAZ,faSort,faEdit, faFolderPlus,faArrowUpShortWide,faFilter,faArrowUpZA ,faBars,faListSquares, faTrash} from '@fortawesome/free-solid-svg-icons';
import AllFolders from './AllFolders'
import FormModal from '../common/FormModal'
import TextEditor from '../common/TextEditor'
import { FaEdit } from 'react-icons/fa'

const Folder: React.FC = () => {

  const folderList = ["workout routine","workout routine","workout routine","workout routine","workout routine","workout routine","workout routine","workout routine","workout routine","workout routine","workout routine","workout routine","workout routineworkout routineworkout routineworkout routineworkout routineworkout routineworkout routineworkout routineworkoutroutineworkoutroutineworkoutroutineworkoutroutineworkoutroutineworkoutroutineworkoutroutineworkoutroutineworkoutroutineworkoutroutineworkoutroutineworkout routineworkout routine climbing",'chess']
   const FilterList = ["workout routine","routin eworkoutroutineworkoutroutineworkoutroutineworkoutroutineworkoutroutineworkoutroutineworkoutroutineworkoutroutineworkoutroutineworkoutroutineworkoutroutineworkoutroutineworkoutroutineworkoutroutineworkoutroutineworkoutroutineworkout", "routine workout routine workout", "routine workout routineworkout" ,"routineworkout routineworkout" ,"routineworkout routine" ,"climbing",'chess']
  const sortOptions = ['A-Z', 'Z-A', 'old-new', 'new-old']
  const [content, setContent] = useState('<p>Hello World!</p>')
      const [show, setShow] = useState(false)
  const[filterVal,setFilterVal]=useState('')
   const[isFilter,setIsFilter]=useState(false)
   const[isSort,setIsSort]=useState(false)
   const[SortVal,setSortVal]=useState('')
  
    const onClickFilter=(e:string|any)=>{
      setFilterVal(e?e.target.value:'')
    }
    
  return (
    <div>
      <FormModal
        show={show}
        isclose={true}
        isNotes={false}
        onclose={() => setShow(false)}
        onlayoutclose={() => setShow(false)}
        cancel={() => setShow(false)}
        header={'Create-Folder'}
        content={<>
          <div className='layoutField'>
            <label htmlFor="" className='layoutLabel'>Title:</label>
            <input type="text" className='layoutInput' />
          </div>
          <div className='layoutField'>
            <label htmlFor="" className='layoutLabel'>Category:</label>
            <input type="text" className='layoutInput' />
          </div>
        </>}
        footer={
          <>
            <button className='button'>submit</button>
            <button className='button' onClick={() => setShow(!show)}>cancel</button>
          </>
        }
      />
    <div className='flex flex-wrap justify-between m-[25px] relative'>
      <AllFolders/>
        <FontAwesomeIcon icon={faFolderPlus} style={{height:'45px',width:'45px'}} className={`hover:text-[#cdca00] text-white mt-[20px] cursor-pointer`}onClick={()=>setShow(true)}/>
        <div className='flex gap-[80px] max-sm:gap-[10px] flex-wrap relative'>
          <span className='flex gap-1'>
            <input
              type="text"
              className='border-[2px] border-white p-[0_10px] text-white h-[35px] sm:w-[500px] w-[200px] rounded mt-[25px] max-sm:ml-[20px]'
            />
            <img
              className='h-[10px] w-[10px] mt-[25px] h-[35px] w-[35px] p-[8px] bg-[#313131] rounded'
              src={searchLogo}
              alt=""
            />
          </span>
        </div>
        <p className='text-white mt-[25px] max-sm:ml-[20px] cursor-pointer'>clear all</p>
      </div>

<div className='flex justify-between'>
          <li className='cursor-pointer' onClick={() => {setIsFilter(!isFilter),setIsSort(false)}}><FontAwesomeIcon icon={faFilter} style={{ width: "25px", height: "25px" }} className={`fa-solid fa-bars-filter ${isFilter?'text-black bg-[#cdca00]':'text-white bg-[#313131]'} p-2 rounded`} /></li>
          <li className='cursor-pointer'><FontAwesomeIcon onClick={() => {setIsSort(!isSort),setIsFilter(false)}} icon={faSort} style={{ width: "25px", height: "25px" }} className={`fa-solid fa-bars-filter ${isSort?'text-black bg-[#cdca00]':'text-white bg-[#313131]'} p-2 rounded`} /></li>
      </div>

      <div className='flex justify-between w-[95%]'>
        <div className='flex bg-black p-3 gap-[3%] rounded mt-[5px] w-[100%] flex-wrap'>
{FilterList.map((data,id)=>{
return  (isFilter&&<button value={data} onClick={(e)=>onClickFilter(e)} className={`p-[2px_10px] mt-[5px] text-center truncate cursor pointer max-w-[150px] ${filterVal===data?'text-black bg-[#cdca00]':'text-white bg-[#5c5c5c]'} font-semibold rounded-[20px]`}>{data}</button>)
})}     
 </div>

        {isSort&&<ul className='flex max-[400px]:gap-[3%] gap-[10%] mt-[20px] flex-wrap'>
          <li className='cursor-pointer'><FontAwesomeIcon icon={faArrowUpAZ} style={{ width: "20px", height: "20px" }} onClick={()=>setSortVal('a-z')} className={`fa-sharp fa-solid fa-arrow-up-a-z ${SortVal==='a-z'?'text-black bg-[#cdca00]':'text-white bg-[#5c5c5c]'} p-2 rounded`} /></li>
          <li className='cursor-pointer'><FontAwesomeIcon icon={faArrowUpZA} style={{ width: "20px", height: "20px" }} onClick={()=>setSortVal('z-a')} className={`fa-sharp fa-solid fa-arrow-up-a-z ${SortVal==='z-a'?'text-black bg-[#cdca00]':'text-white bg-[#5c5c5c]'} p-2 rounded`} /></li>
          <li className='cursor-pointer'><FontAwesomeIcon icon={faArrowDownShortWide} style={{ width: "20px", height: "20px" }} onClick={()=>setSortVal('new to old')} className={`fa-sharp fa-solid fa-arrow-up-a-z ${SortVal==='new to old'?'text-black bg-[#cdca00]':'text-white bg-[#5c5c5c]'} p-2 rounded`} /></li>
          <li className='cursor-pointer'><FontAwesomeIcon icon={faArrowUpShortWide} style={{ width: "20px", height: "20px" }} onClick={()=>setSortVal('old to new')} className={`fa-sharp fa-solid fa-arrow-up-a-z ${SortVal==='old to new'?'text-black bg-[#cdca00]':'text-white bg-[#5c5c5c]'} p-2 rounded`} /></li>
        </ul>}

      </div>
      {/* <h3 className='text-center text-white font-sans font-weight-[4vh] m-[2.5vh] text-[4vh]'>Folders</h3> */}

      <ul id='folders' className='max-sm:justify-center'>
        {folderList.map((data, id) => {

          return <li key={id} className='shadow-[0px_0px_10px_2px_#989898] p-[25px] rounded-[10px] my-[10px] w-[200px] hover:scale-[1.02] active:scale-[0.95]'>
            <img className='mx-auto my-[8px]' id='folderlogo' src={folderLogo} alt="" /><p id='folderName' className='text-center truncate w-full'>
  {data}
</p>
            <div className='flex justify-center gap-[25px] my-[25px] flex-wrap'>
              <FontAwesomeIcon icon={faTrash} className='text-white hover:text-red-500' />
              <FontAwesomeIcon icon={faEdit} className='text-white hover:text-blue-500' />
            </div>
            <p className='text-white text-center'>Date : Jun-08-2001</p>
          </li>

        })}
      </ul>
    </div>
  )
}

export default Folder
