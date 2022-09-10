import React, { useState, useEffect } from "react";

export default function Todo() {
const getLocalData = ()=>{
  const lists = localStorage.getItem("todolist")
  if(lists){
    return JSON.parse(lists)
  }else{
    return [];
  }
}

  const [Data, setData]=useState("")
  const [item,setItem]=useState(getLocalData())
  const [curItem,setEditItem]=useState("")
  const [toggleButton,setToggleButton]=useState(false)

  const addItem= ()=>{
    if(!Data){
      alert("Please fill the data")
    }else if (Data && toggleButton ){
        setItem(item.map((curElem)=>{
            if(curElem.id ===curItem){
              return {...curElem, name: Data}
            }
            return curElem;
        })
        );
        setData([])
    setEditItem(null)
    setToggleButton(false)
    } else{
      const newData = {
        id: new Date().getTime().toString(),
        name:Data
      }
      setItem([...item, newData])
      setData("")
    }
  }
  const deleteFun = (index)=>{
    const updatedItem = item.filter((curElem)=>{
     return curElem.id !== index;
    } )
      setItem(updatedItem)
  }
  
  const removeAll = ()=>{
    setItem([])
  }
  

  useEffect(()=>{
    localStorage.setItem("todolist", JSON.stringify(item));
  },[item]);


  const editItem = (index)=>{
    const edit = item.find((curElem)=>{
     return curElem.id === index;
    } )
    setData(edit.name)
    setEditItem(index)
    setToggleButton(true)
  }

  return (
    <div className="flex  flex-col items-center py-10 font-popins" >
      <div>
        <img className="w-20" src="../img/logo.png" alt="" />
        <h1 className="mb-3 text-2xl font-bold text-white ">Todo List</h1>
      </div>
      <div className="flex items-center relative">
        <input
          className="  py-1 px-3  mt-3 rounded-sm shadow-2xl w-80 bg-white outline-none"
          type="text"
          placeholder="Add Items"
          value={Data}
          onChange={(e)=>setData(e.target.value)}
        />
        {toggleButton ? (<i className="fa-solid fa-pen-to-square absolute top-5 -right-8 h-16 w-16 hover:text-sky-900" onClick={addItem}></i>) : (<i className="fa-solid fa-plus   absolute top-5 -right-8 h-16 w-16 hover:text-sky-900" onClick={addItem}></i>)}
       
        {/* <button className=" py-1 px-3 bg-white ml-1 rounded-sm hover:bg-sky-600 hover:text-white    ">
          Add
        </button> */}
      </div>
      <div>
        {item.map((curElem)=>{
          return(
            <div className="flex items-center relative" key={curElem.id}>
            <h1 className="  py-1 px-3  mt-3 rounded-sm shadow-lg w-80 bg-white hover:bg-yellow-300 ">
              {curElem.name}
            </h1>
            <i className="fa-solid fa-pen-to-square absolute top-5 right-2 h-16 w-16 hover:text-sky-900 " onClick={()=>editItem(curElem.id)}></i>
            <i className="fa-solid fa-trash absolute top-5 -right-8 h-16 w-16 hover:text-red-900" onClick={()=>deleteFun(curElem.id)}></i>
          </div>
          )
        })}
       
        </div>
        <div>
          <button className="mt-3 ml-22 py-1 px-3 bg-white shadow-2xl  rounded-sm hover:bg-sky-600 hover:text-white  " onClick={removeAll}>
            Remove All
          </button>
      </div>
    </div>
  );
}
