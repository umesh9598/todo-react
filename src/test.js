import axios from 'axios'
import React,{useEffect, useState} from 'react'

const Test = () => {
    const [currentState, setCurrentState] = useState([])
useEffect(()=>{
    const getData = async ()=>{
        let fetchData =await axios.get("https://jsonplaceholder.typicode.com/posts")
        console.log(fetchData.data)
        setCurrentState(fetchData.data)
    }
    getData()
},[])
  return (
    <div className='grid md:grid md:grid-cols-3 sm:mx-auto mx-4 my-4'>
      {
        currentState.map((curElem)=>{
            return(
                <div className='mx-4 my-4 '>
            <div key={curElem.id} className= "bg-white max-w-lg max-h-96 px-5 py-5 rounded-md">
                <h1 className='mt-3 text-lg text-blue-800'>{curElem.title}</h1>
                <p>{curElem.body}</p>
            </div>
            </div>)
        })
      }
    </div>
  )
}

export default Test
