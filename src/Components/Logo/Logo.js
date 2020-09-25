import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import Brain from './Brain.png';


const Logo=()=>{
    return(
        <div className='ma4 mt0 ml3'>
            <Tilt className="Tilt br2 shadow-2 " options={{max:55 }} style={{ height: 100, width: 100 }} >
                <div className="Tilt-inner "> <img style={{paddingTop:'18px' ,height:'70px',width:'70px'}} alt='Icon' src={Brain}></img> </div>
            </Tilt>
        </div>
    );
}
export default Logo;
