import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {motion, AnimatePresence} from 'framer-motion';
import { useRouter } from 'next/router';
import {CgWebsite} from 'react-icons/cg';
import {AiFillAndroid} from 'react-icons/ai';
import {SiIos} from 'react-icons/si';
import {FaTelegram, FaDesktop} from 'react-icons/fa';

const CategoryComponent = ({loadingState}) => {

  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const {id} = router.query;

  const productIcons = [
    {type: "Website", icon: CgWebsite, text: "Visit Website"}, 
    {type: "Android", icon: AiFillAndroid, text: "Download app on Playstore"}, 
    {type: "iOS", icon: SiIos, text: "Download app on Appstore"}, 
    {type: "Desktop", icon: FaDesktop, text: "Download setup here"}, 
    {type: "Telegram Bot", icon: FaTelegram, text: "Go to Telegram Bot"}];

  const fetchData = () => {

    loadingState(true);
    setIsLoading(true);

    const query = `
        query {
          categories_by_pk(id: ${id}){
            name
            description
            categories_product(order_by: {created_at: asc}){
             title
             link
             description
             image_path
             created_at
            }
          }
          }
        `;

        const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
        };

        fetch(process.env.baseUrl, options)
        .then(response => response.json())
        .then(data => {

          loadingState(false);
          setIsLoading(false);

          let cats = data.data;

          if((typeof cats === 'undefined')) {

          } else {
            setCategories(data.data.categories_by_pk);
          }
        });
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
    {
      categories.length == 0 ? <div>  </div> :
      isLoading ? <></> : <AnimatePresence>
    <div>
        <div className='hero h-[45vh] flex flex-col justify-center items-center mb-32 relative'>
            <p className='text-[36px] font-bold text-onPrimary'>{categories.name}</p>
            <p className='text-[20px] text-onPrimary mt-2'>{categories.description}</p>
        </div>
        {categories.categories_product.map((product, idx) => (
        (idx%2 == 0) ? <div key={idx} id={product.title.split(" ").join("")} className='flex flex-row pt-6'>
        <div className='w-full pr-20 md:pr-0 md:w-1/2 pl-20'>
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
        <div className='w-1/2 h-full hidden md:flex justify-center'>
                <motion.div 
                initial= {{opacity: 0, x: 100}}
                whileInView={{opacity: 1, x: 0}}
                transition={{delay: 0.6}}
                >
                    <img className='max-w-[450px]' src={product.image_path} alt={`product image ${idx}`} />
                </motion.div>
            </div>
        </div> : <div key={idx} id={product.title.split(" ").join("")} className='flex flex-row pt-32 pb-24'>
    <div className='w-1/2 h-full hidden md:flex justify-center'>
            <motion.div
            initial= {{opacity: 0, x: -100}}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{delay: 0.6}}
            >
                <img className='max-w-[450px]' src={product.image_path} alt={`product image ${idx}`} />
            </motion.div>
        </div>
        <div className='w-full pl-20 md:pl-0 md:w-1/2 pr-20'>
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
    </div>
        ))}
    </div>
    </AnimatePresence>
}
    </>
  )
}

export default CategoryComponent