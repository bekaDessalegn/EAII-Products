import React from 'react'
import Navbar from '../../../components/navbar'
import ProductsComponent from '../../../components/products_component'
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';

const Products = () => {
  return (
    <>
    <Navbar />
    <ProductsComponent />
    <div className='fixed bottom-16 right-16'>
      <Link href='products/add_products'>
      <div className='p-4 rounded-full cursor-pointer bg-primaryColor text-onPrimary hover:bg-secondaryColor'>
        <AddIcon />
      </div>
      </Link>
      </div>
    </>
  )
}

export default Products