import React from 'react'
import './FaceRecognition.css'

const FaceRecognition=({box,imageUrl})=>{
    return (
        <div className="center ma">
            <div className="absolute mt2">
            <img id='faceimage' alt='image' src={imageUrl} width='500px' height='auto' />
            <div className="bounding-box" style={{top:box.topRow, left:box.leftCol,bottom:box.bottomRow,right:box.rightCol}}>

            </div>
            </div>
        </div>
    )
}

export default FaceRecognition