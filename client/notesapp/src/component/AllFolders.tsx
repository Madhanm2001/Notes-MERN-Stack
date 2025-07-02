import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faListSquares } from '@fortawesome/free-solid-svg-icons'
import searchLogo from '../images/searchLogo.png'

const AllFolders = () => {
    const allFolders = ['oneoneoneoneoneoneoneoneoneoneoneoneoneoneoneoneoneoneoneoneoneoneoneoneoneoneoneoneone', 'two','two','two','two','two','two','two','two','two','two','two','two','two','two','two','two','two','two','two','two','two','two','two','two','two','two','two','two', 'three', 'four', 'five']
    const [isFolderOpen, setIsFolderOpen] = useState(false)
    const [Folderkey, setFolderkey] = useState(0.5)

    const activeRef: any= useRef(null)
    
    useEffect(()=>{
    
      const onOverlayClick = (e:any) => {
          if (activeRef.current && !activeRef.current.contains(e.target)) {
            setIsFolderOpen(false);
          }
        };
        document.addEventListener("mousedown", onOverlayClick);
    
      return () => {
          document.removeEventListener("mousedown", onOverlayClick);
        };
    
    },[])

    const onclickFolder = (id:number) => {

        setFolderkey(id)
    }
    return (
        <div ref={activeRef}>
            <div className='mt-[20px]' onClick={() => setIsFolderOpen(!isFolderOpen)}><FontAwesomeIcon icon={faListSquares}  style={{height:'20px',width:"20px"}} className={`p-3 rounded ${isFolderOpen?'text-black bg-[#cdca00]':'text-black bg-[#878787]'} cursor-pointer` }/></div>
            {isFolderOpen &&
                <div className='w-[275px] bg-[black] p-2 shadow-[0px_0px_10px_0px_grey]  absolute z-[100] p-3 rounded mx-auto h-[70vh] overflow-y-scroll overflow-x-hidden hide-scrollbar mx-auto'>
        <div className='flex gap-[80px] flex-wrap relative justify-center'>
          <span className='flex gap-2'>
            <input
              type="text"
              className='border-[2px] border-white text-white h-[35px] rounded mt-[25px]'
            />
            <img
              className='h-[10px] w-[10px] mt-[25px] p-[0_10px] h-[35px] w-[35px] p-[8px] bg-[#313131] rounded'
              src={searchLogo}
              alt=""
            />
          </span>
        </div>
                    <div className='m-5'>
                        {allFolders.map((data, id) => {

                        return (
                            (<div className='flex gap-[25%] mx-auto mt-[2%] cursor-pointer' key={id} onClick={() => onclickFolder(id)}>
                                <FontAwesomeIcon icon={faFolder} className={`${id===Folderkey?'text-[#cdca00]':'text-white'} mt-[1.5%]`} />
                                <p className={`truncate max-w-[200%] ${id===Folderkey?'text-[#cdca00]':'text-white'}`}>{data}</p>
                            </div>)
                        )

                    })}
                    </div>
                    
                </div>}
        </div>
    )
}

export default AllFolders
