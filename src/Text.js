import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Text = () => {
    const [defaultState, setState] = useState([])
    const test = (value)=>{
      console.log(value)
    }
     let myArr = [1,3,5,7,9]

    useEffect(() => {
    const fetchData = async ()=>{
        let getData =await axios.get("https://jsonplaceholder.typicode.com/posts")
        setState(getData.data)
    }
    fetchData()
    },[])

  return (
    <div>
      {/* <button onClick={() => setState(true)}>Add</button> */}
      {
        defaultState?.map((curElem)=>{
            return (
                <div key={curElem.id}>
                    <h1>{curElem.title}</h1>
                    <h1>{curElem.body}</h1>
                </div>
            )
        })
      }
    </div>
  )
}

export default Text
