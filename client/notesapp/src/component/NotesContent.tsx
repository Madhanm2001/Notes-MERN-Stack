import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { faCopy, faTrash, faThumbtack, faEdit, faArchive, faClock } from '@fortawesome/free-solid-svg-icons';
import AllFolders from './SideBarList';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/UseFetch';
import { URL } from '../Api/settings';
import TextEditor from '../common/TextEditor';
import FormModal from '../common/FormModal';
import UseValidator from '../hooks/UseValidator';
import { toast } from 'react-toastify';


const NotesContent = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const [notesId, setNotesId] = useState('')
  const { axiosFunction } = useFetch()
  const [show, setShow] = useState(false)
  const [notesDetail, setNotesDetail] = useState({ name: '', content: '', date: '', time: '', isArchived: false, isPinned: false, noteId: id })
  const [notesContent, setNotesContent] = useState({ name: '', content: '', date: '', time: '', isArchived: false, isPinned: false, noteId: id })
  const [noteErr, setNoteErr] = useState({ name: '', content: '' })
  const[deleteShow,setDeleteShow]=useState(false)
  const { noteValidator } = UseValidator()


  useEffect(() => {
    console.log(id);
    fetchNotes()
  }, [notesDetail])

  const TimeFormat = (time: any) => {

    const tim = time?.split('T')

    const d = tim[1]?.split(':')
    console.log(tim, d);

    const date = tim[0].split('-')

    return { date: `${date[2]}/${date[1]}/${date[0]}`, time: `${d[0]}:${d[1]} ${d[0] > 12 ? 'PM' : 'AM'}` }


  }

  const onclickEdit = (data: any) => {
    console.log(data);
    setNotesId(data.noteId)
    axiosFunction("get", URL.Note.get, id, "", "").then((res) => {
      setNotesDetail({ name: res.name, content: res.content, isArchived: res.isArchived, isPinned: res.isPinned, noteId: res.noteId, date: TimeFormat(res.updatedAt).date, time: TimeFormat(res.updatedAt).time })
      setShow(true)
    })

  }

   const onclickDelete = () => {
    setDeleteShow(true)
};


  const onDeleteConfirm = () => {
    axiosFunction("delete", URL.Note.delete, id, "", "")
      .then(() => {
        toast.error('Note is Deleted')
        navigate(-1)
      });
  };

  const onTooglePinned = (data: any) => {

    if (data.isPinned) {
          axiosFunction('put', URL.Note.unpinned, id, '', { isPinned: true }).then(()=>{
            toast.info('note is unpinned')
          })
        }
        else {
          axiosFunction('put', URL.Note.pinned, id, '', { isPinned: false }).then(()=>{
            toast.info('note is pinned')
          })
        }
    fetchNotes()
  }
  const onToogleArchived = (data: any) => {

    if (data.isArchived) {
        axiosFunction('put', URL.Note.unarchived, id, '', { isArchived: false }).then(()=>{
            toast.info('note is unarchived')
    
        })
      } else {
        axiosFunction('put', URL.Note.archived, id, '', { isArchived: true }).then(()=>{
            toast.info('note is archived')
        })
      }
    fetchNotes()

  }
  const onchangeNoteName = (e: any) => {

    const { name, value } = e.target

    setNotesDetail(ps => ({
      ...ps,
      [name]: value
    }))

  }

  const onchangeNote = (content: any) => {

    setNotesDetail(ps => ({
      ...ps,
      content: content
    }))

  }

  const fetchNotes = () => {

    axiosFunction("get", URL.Note.get, id, "", "").then((res) => {
      setNotesContent({ name: res.name, content: res.content, date: TimeFormat(res.updatedAt).date, time: TimeFormat(res.updatedAt).time, isArchived: res.isArchived, isPinned: res.isPinned, noteId: id })
    })
  }

  const onSubmitNote = () => {
    const error = noteValidator(notesDetail) || {}
    const params = notesId || "";
    setNoteErr(error)
    if (Object.keys(error).length === 0) {
      axiosFunction('put', URL.Note.update, params || id, '', notesDetail)
        .then(() => {
          fetchNotes()
          setShow(false)
        })
    }
  }
  

  const handleShareClick = (link: any) => {
    navigator.clipboard.writeText(link)
      .then(() => console.log("Copied:", link))
      .catch(err => console.error("Copy failed", err));
  }

  return (
    <div >
<FormModal
        show={deleteShow}
        isNotes={false}
        onlayoutclose={() => setDeleteShow(false)}
        cancel={() => setDeleteShow(false)}
        content='Are you sure you want to delete this note?'
        footer={
          <>
            <button className='button cursor-pointer' onClick={onDeleteConfirm}>delete</button>
            <button className='button cursor-pointer' onClick={() => setDeleteShow(!deleteShow)}>cancel</button>
          </>
        }
      />
      <FormModal
        show={show}
        isclose={true}
        isNotes={true}
        onclose={() => setShow(false)}
        onlayoutclose={() => setShow(false)}
        cancel={() => setShow(false)}
        header={'Update-Notes'}
        content={<>
          <div className='layoutField'>
            <label htmlFor="" className='layoutLabel'>Title:</label>
            <input type="text" name='name' value={notesDetail.name} onChange={onchangeNoteName} className='layoutInput' />
            <div className='text-[red] text-[12px]'>{noteErr.name}</div>
          </div>
          <div className='layoutField'>
            <label htmlFor="" className='layoutLabel'>Content:</label>
            <div> <TextEditor content={notesDetail.content} onChange={onchangeNote} /></div>
            <div className='text-[red] text-[12px]'>{noteErr.content}</div>
          </div>
        </>}
        footer={
          <>
            <button className='button' onClick={onSubmitNote}>submit</button>
            <button className='button' onClick={() => setShow(!show)}>cancel</button>
          </>
        }
      />
      <div className='m-[20px] flex gap-[10px] justify-between'>
        <AllFolders />
        <div className='text-[white] mt-[30px] text-[15px] cursor-pointer' onClick={() => { navigate(-1) }}>{'< back to notes'}</div>
      </div>

      <div className='flex flex-col justify-center items-center h-screen'>
        <div className='bg-[#3c3c3c] max-[500px]:flex-start max-[500px]:h-[30%] h-[20%] w-[80%] p-5 m-3 my-auto rounded flex justify-between flex-wrap gap-[15px]'>
          <div className='my-auto'>
            <div className='flex gap-10'><h1 className='font-bold truncate w-[110px] text-white'>{notesContent.name}</h1>{notesContent.isArchived && <span className='text-[10px] mt-[8px] bg-[#cdca00] font-bold rounded-full px-[10px]'>Archived</span>}</div>
            <p className='text-white text-[12px] flex gap-[10px] my-[10px]'><span><FontAwesomeIcon className='text-white' icon={faClock} /></span> {`${notesContent.date}, ${notesContent.time}`}</p>
          </div>
          <div className='flex justify-center gap-[20px] my-auto text-white'>
            <FontAwesomeIcon icon={faTrash} className='hover:text-red-500 cursor-pointer' onClick={onclickDelete} />
            <FontAwesomeIcon icon={faEdit} className='hover:text-yellow-500 cursor-pointer' onClick={onclickEdit} />
            <div className="shadow rounded flex ">
              <FontAwesomeIcon
                icon={faThumbtack}
                onClick={() => onTooglePinned(notesContent)}
                className={`${notesContent.isPinned ? 'text-[#00809f]' : "text-white"} cursor-pointer [#00809f] hover:text-blue-500 transition-colors duration-300 ms-auto`}
                style={{ transform: "rotate(45deg)" }}
              />
            </div>
            <FontAwesomeIcon icon={faArchive} onClick={() => onToogleArchived(notesContent)} className={`${notesContent.isArchived ? 'text-[#cf8000]' : "text-white"} hover:text-orange-500 cursor-pointer`} />
            <FontAwesomeIcon icon={faCopy} onClick={() => handleShareClick(`localhost:5173/notes-view/${id}`)} className='hover:text-green-500 cursor-pointer' />

          </div>
        </div>
        <div className='bg-[#3c3c3c] h-[60%] w-[80%] p-5 m-3 rounded text-white overflow-y-scroll hide-scrollbar' dangerouslySetInnerHTML={{ __html: notesContent.content }}>

        </div>
      </div>
    </div>
  )
}

export default NotesContent
