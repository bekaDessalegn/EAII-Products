import React, { useEffect, useState } from 'react'
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai"

const TypeDropdown = ({selectedType, setType}) => {

  const [isOpen, setIsOpen] = useState(false)
  const types = ["Android", "iOS", "Website", "Desktop", "Telegram Bot"]

  return (
    <div className='w-full relative flex flex-col md:w-[340px] rounded-lg'>
      <div onClick={() => setIsOpen((prev) => !prev)} className='bg-textFormbg border-textFormBorderbg rounded-lg p-2 w-full flex items-center justify-between border-2 active:border-accentColor duration-300 active:text-accentColor cursor-pointer'>
        <p>{selectedType}</p>
        {!isOpen ? (
          <AiFillCaretDown />
        ) : (
          <AiFillCaretUp />
        ) }
        </div>
        {isOpen && (<div className='bg-textFormbg border-textFormBorderbg border-2 absolute top-14 flex flex-col items-start rounded-lg p-2 w-full z-50'>
          {types.map((category, i) => (
            <div onClick={() => {
              setType(category)
              setIsOpen((prev) => !prev)
              }} className='hover:bg-background2 cursor-pointer w-full rounded-r-lg border-l-transparent hover:border-l-accentColor border-l-4' key={i}>
              <h3 id="category">{category}</h3>
            </div>
          ))}
        </div>)}
    </div>
  )
}

export default TypeDropdown