import { Inter } from 'next/font/google'
import NavBar from '@/components/navbar'
import Landing from '@/components/landing'
import Footer from '@/components/footer'
import { useState } from 'react'
import Image from "next/image";
import logo from "../../public/images/logo.png"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [isLoading, setIsLoading] = useState(false)

  return (
    // isLoading ? <>
    // <div className='w-screen h-screen bg-white flex justify-center items-center'>
    //   <Image src={logo} className='animate-pulse max-w-[200px]' />
    // </div>
    // </> : 
    <>
    <NavBar loadingState = {(value) => setIsLoading(value)} />
    <Landing />
    <Footer />
    </>
  )
}
