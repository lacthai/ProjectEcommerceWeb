import React, { useRef, useState } from 'react'
import './SearchForm.css'
import { useNavigate } from 'react-router-dom';
const SearchForm = () => {

  const ref = useRef(0)
  const inputRef = useRef()
  const navigate = useNavigate()
  const handleSubmit = (e)=>{
    e.preventDefault()
    const value = inputRef.current.value
    if(!value.trim()) return;
    return navigate(`/search/${value}`)
  }
  return (
    <div className='search_form'>
      <h2>Render: {ref.current++}</h2>
  
      <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
        <button>Search</button>
      </form>
    </div>
  )
}

export default SearchForm