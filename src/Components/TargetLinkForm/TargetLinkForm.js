import React from 'react';
import './TargetLinkForm.css';
const TargetLinkForm=({onInputChange,onButtonSubmit})=>{
    return(
        <div>
           <p className='f3'>
                {'This app detect faces in given url'}
           </p>   
           <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link pv2 dib white bg-light-green' onClick={onButtonSubmit}>Detect</button>
                </div>
           </div>

        </div>
    );
}

export default TargetLinkForm;