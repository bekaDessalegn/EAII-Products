import CategoryComponent from '@/components/category_component'
import Footer from '@/components/footer'
import NavBar from '@/components/navbar'
import React, { useState } from 'react'
import Image from "next/image";
import logo from "../../../../public/images/logo.png"

const CategoryPage = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [isCategoryLoading, setIsCategoryLoading] = useState(false)

  return (
    // isLoading ? <>
    // <div className='w-screen h-screen bg-white flex justify-center items-center'>
    //   <Image src={logo} className='animate-pulse max-w-[200px]' />
    // </div>
    // </> : 
    <>
    <NavBar loadingState = {(value) => setIsLoading(value)} />
    <CategoryComponent loadingState = {(value) => setIsCategoryLoading(value)} />
    {!isCategoryLoading && <Footer />}
    </>
  )
}

export default CategoryPage