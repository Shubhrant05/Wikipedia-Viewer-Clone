import React from 'react'
import './Styles.css'
const InfoCard = (props) => {
    return (
            <div className='data-card' onClick={() => {window.open(`https://en.wikipedia.org/?curid=${props.link}`,"_self")}}>
                <div style={{ fontSize: "1rem", fontFamily: "sans-serif", textAlign: "left" , fontWeight:"600" }}>{props.title}</div>
                <p style={{ textAlign: "left" }}>{props.desc}</p>
            </div>
     
    )
}

export default InfoCard