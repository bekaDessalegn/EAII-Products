import React, { useEffect, useState } from 'react'
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai"

const Dropdown = ({selectedCategory, setCategory}) => {

  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState([])

  const fetchData = () => {

    const token = localStorage.getItem('token');

    const query = `
        query {
          categories{
            name
          }
          }
        `;

        const options = {
        method: 'POST',
        headers: {
          "Accept": "*/*",
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
      },
        body: JSON.stringify({ query })
        };

        fetch(process.env.baseUrl, options)
        .then(response => response.json())
        .then(data => {

          let cats = data.data;

          if((typeof cats === 'undefined')) {

          } else {
            setCategories(data.data.categories);
          }
        });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='w-full relative flex flex-col md:w-[340px] rounded-lg'>
      <div onClick={() => setIsOpen((prev) => !prev)} className='bg-textFormbg border-textFormBorderbg rounded-lg p-2 w-full flex items-center justify-between border-2 active:border-accentColor duration-300 active:text-accentColor cursor-pointer'>
        <p>{selectedCategory}</p>
        {!isOpen ? (
          <AiFillCaretDown />
        ) : (
          <AiFillCaretUp />
        ) }
        </div>
        {isOpen && (<div className='bg-textFormbg border-textFormBorderbg border-2 absolute top-14 flex flex-col items-start rounded-lg p-2 w-full z-50'>
          {categories.map((category, i) => (
            <div onClick={() => {
              setCategory(category.name)
              setIsOpen((prev) => !prev)
              }} className='hover:bg-background2 cursor-pointer w-full rounded-r-lg border-l-transparent hover:border-l-accentColor border-l-4' key={i}>
              <h3 id="category">{category.name}</h3>
            </div>
          ))}
        </div>)}
    </div>
  )
}

export default Dropdown