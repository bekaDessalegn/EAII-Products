import React, { useEffect, useState } from 'react'
import {BiEdit} from 'react-icons/bi'
import Link from 'next/link'
import { AiOutlineDelete } from 'react-icons/ai'
import DeleteModal from './delete_modal'
import { useRouter } from 'next/router'
import cookieCutter from 'cookie-cutter'
import {CgWebsite} from 'react-icons/cg';
import {AiFillAndroid} from 'react-icons/ai';
import {SiIos} from 'react-icons/si';
import {FaTelegram, FaDesktop} from 'react-icons/fa';

const ProductsComponent = () => {

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const productIcons = [
    {type: "Website", icon: CgWebsite, text: "Visit Website"}, 
    {type: "Android", icon: AiFillAndroid, text: "Download app on Playstore"}, 
    {type: "iOS", icon: SiIos, text: "Download app on Appstore"}, 
    {type: "Desktop", icon: FaDesktop, text: "Download setup here"}, 
    {type: "Telegram Bot", icon: FaTelegram, text: "Go to Telegram Bot"}];

  const router = useRouter();

  function deleteProduct() {

    const token = localStorage.getItem('token');

    const query = `
        mutation{
          delete_products_by_pk(id: ${productId}){
            id
            title
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

          let admin = data.data;

          if((typeof admin === 'undefined')) {
            if(data.errors[0].message === "Could not verify JWT: JWTExpired") {
              cookieCutter.set('signed-in', false)
              localStorage.removeItem('token');
              router.replace('/signin')
          }
          } else {
            setProducts(products.filter((product) => product.id !== productId))
            setIsDeleteOpen(false);
          }
        });
  }

  const fetchData = () => {

    setIsLoading(true);

    const token = localStorage.getItem('token');

    const query = `
          query{
            products(order_by: {created_at: desc}){
              id
              title
              description
              link
              image_path
              category_name
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

          let prods = data.data;

          if((typeof prods === 'undefined')) {
            setIsLoading(false);
            if(data.errors[0].message === "Could not verify JWT: JWTExpired") {
              cookieCutter.set('signed-in', false)
              localStorage.removeItem('token');
              router.replace('/signin')
          }
          } else {
            setProducts(data.data.products);
            setIsLoading(false);
          }
        });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <DeleteModal onClick={deleteProduct} isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete link">
        <p>Are you sure you want to delete this product ?</p>
      </DeleteModal>
    {products.map((product,index) => (
      <div key={index}>
    <div className='w-screen flex flex-row justify-end pr-36'>
      <Link href={`/products/edit_product?id=${product.id}`}><BiEdit size={28} className='cursor-pointer text-primaryColor'/></Link>
      <AiOutlineDelete onClick={() => {
        setProductId(product.id);
        setIsDeleteOpen(true)}} size={28} className='text-dangerColor cursor-pointer ml-2'/>
    </div>
    <div className='w-screen flex flex-row'>
    <div className='w-full pr-20 md:w-1/2 md:pr-0 pl-20'>
      <p className='font-semibold text-[36px] pb-3'>{product.title}</p>
      <p>{product.description}</p>
      {product.link.map((link, index) => (
        <div key={index} className='flex flex-row gap-6 mt-6 items-center'>
        {productIcons.map((productIcon) => ((productIcon.type === link.type) && <div className='flex flex-row gap-6 items-center'>
          <productIcon.icon size={30} className='text-primaryColor'/>
          <Link href={link.url}><p className='text-primaryColor cursor-pointer'>{productIcon.text}</p></Link>
          </div>))}
  </div>
      ))}
    </div>
    <div className='w-1/2 h-full hidden md:flex justify-center items-center'>
            <div className=''>
                <img className='max-w-[350px]' src={product.image_path} />
            </div>
        </div>
    </div></div>))}
    </>
  )
}

export default ProductsComponent