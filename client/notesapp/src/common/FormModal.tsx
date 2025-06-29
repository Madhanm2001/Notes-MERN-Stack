import React, { useState } from 'react'
import TextEditor from './TextEditor'
import closeLogo from '../images/closeLogo.png'

const FormModal = (props:any) => {
  const [content, setContent] = useState('<p>Hello World!</p>')
  const [show, setShow] = useState(false)

  const handleSubmit = () => {
    console.log('Submitting:', content)
    // call your API here
  }

 return (
        <div>
            {show&&<div className={`layoutPosition
    ${show ? 'layoutBlur': 'z-[-1]'}`} onClick={()=>setShow(false)}></div>}
            {show && <section className={`${1?'notesContainer':'formContainer'}`}>
                <img src={closeLogo} onClick={() => setShow(!show)} className='closeIcon' alt="" />
                <h2 className='layoutHeader'>Notes</h2>
                <div className='layoutField'>
                    <label htmlFor="" className='layoutLabel'>name:</label>
                    <input type="text" className='layoutInput' />
                </div>
                <div className='layoutField'>
                    <label htmlFor="" className='layoutLabel'>Content:</label>
                    <input type="text" className='layoutInput' />
                   <div> <TextEditor content={content} onChange={setContent} /></div>
                </div>
                <div className='layoutButtonDiv'>
                    <button className='button'>submit</button>
                    <button className='button' onClick={() => setShow(!show)}>cancel</button>
                </div>
            </section>}

            <button className='text-white font-weight-10' onClick={()=>setShow(!show)}>click me</button>

        </div>
    )

}

export default FormModal
