import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ImCross } from 'react-icons/im'
import "./Styles.css"
import InfoCard from './InfoCard'
const Home = () => {
    const [value, setValue] = useState("")
    const [data, setData] = useState([])
    const inputHandler = (e) => {
        setValue(e.target.value)
    }
    const getData = async () => {
        try {

            const res = await axios.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=15&prop=extracts|pageimages&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=${value}`)
            let resArray = Object.values(res.data.query.pages)
            let resData = []
            resArray.forEach(ele => {
                let resultObj = {
                    index: ele.index,
                    curid: ele.pageid,
                    title: ele.title,
                    desc: ele.extract
                }
                resData.push(resultObj)
            });
            setData(resData)


        } catch (err) {
            console.log(err)
        }
    }

    const onClear = () => {
        setValue("")
        setData([])
    }
    useEffect(() => {
        getData()
    }, [value])

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div className='logo-div'>
                <img className="logo" src='https://wikepedia.surge.sh/img/logo.png' alt="logo" />
                <div>
                    <h1>Wikipedia</h1>
                    <p>The free encyclopedia</p>
                </div>
            </div>
            <div className='main'>
                <form action='#' className='form-area'>
                    <input className='input-area' value={value} onChange={inputHandler} />
                    <ImCross style={{margin: 'auto 0rem auto 1rem' , color:'white' , fontSize:'1.5rem' , cursor:"pointer"}} onClick = {() => {onClear()}}/>
                </form>
                <button onClick={() => {
                    window.open("https://en.wikipedia.org/wiki/Special:Random")
                }
                }>Random</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {

                    data.map((resObj, index) => {
                        return <InfoCard key={index} title={resObj.title} desc={resObj.desc} link={resObj.curid} value={value} />
                    })

                }
            </div>
        </div>
    )
}

export default Home