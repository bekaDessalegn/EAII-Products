import React, { useEffect, useState } from 'react'
import landing from '../../public/images/landing.png'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const Landing = () => {

  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {

    setIsLoading(true);

    const query = `
        query {
          categories(order_by: {created_at: asc}){
            id
            name
            description
            icon
          }
          }
        `;

        const options = {
        method: 'POST',
        headers: {
          "Accept": "*/*",
          "Content-Type": "application/json"
      },
        body: JSON.stringify({ query })
        };

        fetch(process.env.baseUrl, options)
        .then(response => response.json())
        .then(data => {

          let cats = data.data;

          if((typeof cats === 'undefined')) {
            setIsLoading(false);
          } else {
            console.log(data.data.categories)
            setCategories(data.data.categories);
            setIsLoading(false);
          }
        });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <div className='hero h-[100vh] relative mb-32'>
    <div className='absolute w-full -bottom-[150px] overflow-hidden'>
      <svg width="100%" height="355px" viewBox="0 0 1920 355" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Apple-TV" transform="translate(0.000000, -402.000000)" fill="#FFFFFF">
            <path d="M0,439.134243 C175.04074,464.89273 327.944386,477.771974 458.710937,477.771974 C654.860765,477.771974 870.645295,442.632362 1205.9828,410.192501 C1429.54114,388.565926 1667.54687,411.092417 1920,477.771974 L1920,757 L1017.15166,757 L0,757 L0,439.134243 Z" id="Path"></path>
          </g>
        </g>
      </svg>

    </div>

    <div className='hidden md:h-full md:flex flex-row items-center justify-center'>
        <motion.div 
        initial={{opacity: 0, x:-100}}
        animate={{opacity:1, x:0}}
        exit={{opacity: 0, x: -100}}
        transition={{delay: 0.6}}
        className=' w-1/2 flex flex-col items-center justify-center -mt-40'>
            <p className={`text-[42px] text-onPrimary text-center font-bold`}>Products of Ethiopian Artificial Intelligence Institute</p>
        </motion.div>
        <motion.div 
        initial={{opacity: 0, x:100}}
        animate={{opacity:1, x:0}}
        exit={{opacity: 0, x: 100}}
        transition={{delay: 0.6}}
        className='w-[400px] mt-40'>
            <Image src={landing} className='w-full h-full' alt='landing'/>
        </motion.div>
    </div>

    <div className='md:hidden h-full flex flex-col items-center justify-center'>
        <motion.div 
        initial={{opacity: 0, x:-100}}
        animate={{opacity:1, x:0}}
        exit={{opacity: 0, x: -100}}
        transition={{delay: 0.6}}
        className=' w-full flex flex-col items-center justify-center mt-40'>
            <p className={`text-[42px] text-onPrimary text-center font-bold`}>Products of Ethiopian Artificial Intelligence Institute</p>
        </motion.div>
        <motion.div 
        initial={{opacity: 0, x:100}}
        animate={{opacity:1, x:0}}
        exit={{opacity: 0, x: 100}}
        transition={{delay: 0.6}}
        className='w-[200px]'>
            <Image src={landing} />
        </motion.div>
    </div>
  </div>
  <div className='grid lg:grid-cols-4 md:grid-cols-3 gap-10 mx-24 mb-10 z-50'>
    {categories.map((category, index) => (
      <div key={index}>
        <Link href={`/category/${category.id}/category`}>
        <motion.div 
        initial= {{opacity: 0, y: 100}}
        whileInView={{opacity: 1, y: 0}}
        transition={{delay: 0.4}}
         className='border-2 border-white rounded-md px-8 py-8 text-secondaryColor cursor-pointer hover:shadow hover:shadow-primaryColor hover:px-10 hover:py-10 transition-all hover:text-primaryColor'>
        <img src={category.icon} className='w-[40px] h-[40px] mb-2' alt={`category icon ${index}`} />
        <p className='text-[24px] font-bold'>{category.name}</p>
        <p className='text-[16px] text-secondaryColor'>{category.description}</p>
      </motion.div>
      </Link>
      </div>
      ))}
    </div>
    </>
  )
}

export default Landing