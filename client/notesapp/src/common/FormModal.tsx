import React, { useState } from 'react'
import TextEditor from './TextEditor'
import closeLogo from '../images/closeLogo.png'

const FormModal = (props: any) => {
    const [content, setContent] = useState('<p>Hello World!</p>')
    const [show, setShow] = useState(false)

    const handleSubmit = () => {
        console.log('Submitting:', content)
        // call your API here
    }

    return (
        <div>
            {props.show && <div className={`layoutPosition
            ${props.show ? 'layoutBlur' : 'z-[-1]'}`} onClick={props.onlayoutclose}></div>}
            {props.show && 
            <section className={`${props.isNotes ? 'notesContainer' : 'formContainer'}`}>
                <img src={closeLogo} onClick={props.onclose} className='closeIcon' alt=""/>
                <h2 className='layoutHeader'>{props.header}</h2>
                <div className='layoutField'>
                    {props.content}
                </div>
                <div className='layoutButtonDiv'>
                    {props.footer}
                </div>
            </section>}

        </div>
    )

}

export default FormModal
