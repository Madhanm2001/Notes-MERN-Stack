import { useState } from 'react'
import closeLogo from '../images/closeLogo.png'

const FormModal = () => {
    const [show, setShow] = useState(false)
    return (
        <div>
            {show&&<div className={`layoutPosition
    ${show ? 'layoutBlur': 'z-[-1]'}`} onClick={()=>setShow(false)}></div>}
            {show && <section className='formContainer'>
                <img src={closeLogo} onClick={() => setShow(!show)} className='closeIcon' alt="" />
                <h2 className='layoutHeader'>Sign-up</h2>
                <div className='layoutField'>
                    <label htmlFor="" className='layoutLabel'>name:</label>
                    <input type="text" className='layoutInput' />
                </div>
                <div className='layoutField'>
                    <label htmlFor="" className='layoutLabel'>username:</label>
                    <input type="text" className='layoutInput' />
                </div>
                <div className='layoutField'>
                    <label htmlFor="" className='layoutLabel'>email:</label>
                    <input type="text" className='layoutInput' />
                </div>
                <div className='layoutField'>
                    <label htmlFor="" className='layoutLabel'>phoneno:</label>
                    <input type="text" className='layoutInput' />
                </div>
                <div className='layoutField'>
                    <label htmlFor="" className='layoutLabel'>age:</label>
                    <input type="text" className='layoutInput' />
                </div>
                <div className='layoutField'>
                    <label htmlFor="" className='layoutLabel'>password:</label>
                    <input type="password" className='layoutInput' />
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
