import { Inter } from 'next/font/google'
import Navbar from '../../components/navbar'
import Dashboard from '../../components/dashboard'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Navbar />
    <Dashboard />
    </>
  )
}
