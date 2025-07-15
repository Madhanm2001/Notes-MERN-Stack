import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import {faClock } from '@fortawesome/free-solid-svg-icons';
import {useParams } from 'react-router-dom';
import useFetch from '../hooks/UseFetch';
import { URL } from '../Api/settings';


const NoteShare = () => {

  const { id } = useParams()
  const { axiosFunction } = useFetch()
  const [notesDetail, setNotesDetail] = useState({ name: '', content: '', date: '', time: '', isArchived: false, isPinned: false, noteId: id })
  const [notesContent, setNotesContent] = useState({ name: '', content: '', date: '', time: '', isArchived: false, isPinned: false, noteId: id })



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

  const fetchNotes = () => {

    axiosFunction("get", URL.Note.get, id, "", "").then((res) => {
      setNotesContent({ name: res.name, content: res.content, date: TimeFormat(res.updatedAt).date, time: TimeFormat(res.updatedAt).time, isArchived: res.isArchived, isPinned: res.isPinned, noteId: id })
    })
  }


  return (
    <div >
      <div className='flex flex-col justify-center items-center h-screen'>
        <div className='bg-[#3c3c3c] max-[500px]:flex-start max-[500px]:h-[30%] h-[20%] w-[80%] p-5 m-3 my-auto rounded flex justify-between flex-wrap gap-[15px]'>
          <div className='my-auto'>
            <div className='flex gap-10'><h1 className='font-bold truncate w-[110px] text-white'>{notesContent.name}</h1></div>
            <p className='text-white text-[12px] flex gap-[10px] my-[10px]'><span><FontAwesomeIcon className='text-white' icon={faClock} /></span> {`${notesContent.date}, ${notesContent.time}`}</p>
          </div>
        </div>
        <div className='bg-[#3c3c3c] h-[60%] w-[80%] p-5 m-3 rounded text-white overflow-y-scroll hide-scrollbar' dangerouslySetInnerHTML={{ __html: notesContent.content }}>

        </div>
      </div>
    </div>
  )
}

export default NoteShare
