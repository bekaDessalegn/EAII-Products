import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from '../public/images/logo.png'
import Link from 'next/link'
import { BsFillPersonFill } from 'react-icons/bs'
import { BiCategory, BiPackage } from 'react-icons/bi'
import AdminModal from './admin_modal'
import CategoryModal from './category_modal'
import cookieCutter from 'cookie-cutter'
import { useRouter } from 'next/router'
 
const Dashboard = () => {

    const [isAdminOpen, setIsAdminOpen] = useState(false)
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    const [productCount, setProductCount] = useState();
    const [categoryCount, setCategoryCount] = useState();
    const [adminCount, setAdminCount] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const stats = [
        { id: 1, name: 'Admins', stat: `${adminCount}`,  link: "/admins", icon: <BsFillPersonFill className="h-6 w-6 text-white" /> },
        { id: 2, name: 'Products', stat: `${productCount}`,  link: "/products", icon: <BiPackage className="h-6 w-6 text-white" /> },
        { id: 3, name: 'Categories', stat: `${categoryCount}`,  link: "/categories", icon: <BiCategory className="h-6 w-6 text-white" /> }
    ];

    const fetchData = () => {

        setIsLoading(true)

        const token = localStorage.getItem('token');

        const query = `
                query {
                    categories_aggregate {
                    aggregate {
                        count
                    }
                    }
                    products_aggregate {
                    aggregate {
                        count
                    }
                    }
                    admin_aggregate{
                        aggregate{
                          count
                        }
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
                console.log(data)
                if(data.errors[0].message === "Could not verify JWT: JWTExpired") {
                    cookieCutter.set('signed-in', false)
                    localStorage.removeItem('token');
                    router.replace('/signin')
                }
              } else {
                setCategoryCount(data.data.categories_aggregate.aggregate.count);
                setProductCount(data.data.products_aggregate.aggregate.count);
                setAdminCount(data.data.admin_aggregate.aggregate.count);
                setIsLoading(false);
              }
            });
      }
    
      useEffect(() => {
        fetchData();
      }, []);

    return (
        isLoading ? <></> : <div className='flex flex-col justify-center items-center'>
            <div className='max-w-fit'>
            <div className='flex flex-row px-10 py-10 border-2 rounded-md mx-10'>
                <div>
                    <p className='text-[28px] font-bold text-secondaryColor'>Hello, Admin👋</p>
                    <p className='text-[18px] font-bold text-secondaryColor'>Welcome to EAII Products Admin Dashboard</p>
                </div>
                <Image className='ml-[100px]' src={logo} width={80} height={80} />
            </div>
            <div className='w-full'>
                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mx-10">
                    {
                        stats.map(item => (
                            <div v-for="item in stats" key={item.id}
                                className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 border border-gray-100 hover:border-primaryColor shadow sm:px-6 sm:pt-6">
                                <dt>
                                    <div className="absolute rounded-md bg-primaryColor p-3">
                                        {item.icon}
                                    </div>
                                    <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                                </dt>
                                <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                                    <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                                    <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                                        <div className="text-sm">
                                            <Link href={item.link} className="font-medium text-primaryColor">
                                                View all
                                                <span className="sr-only"> {item.name} stats</span>
                                            </Link>
                                        </div>
                                    </div>
                                </dd>
                            </div>
                        ))
                    }
                </dl>
            </div>
            <div className='m-10'>
                <p className='text-[20px] font-bold text-secondaryColor'>Quick Links</p>
                <div className='grid grid-cols-3 mt-4 gap-3'>
                    <div onClick={() => setIsAdminOpen(true)} className='border-2 border-primaryColor px-3 py-2 rounded-md text-primaryColor text-center font-bold cursor-pointer flex items-center justify-center'>Add Admin</div>
                    <Link href="products/add_products"><div className='border-2 border-primaryColor px-3 py-2 rounded-md text-primaryColor text-center font-bold cursor-pointer'>Add Product</div></Link>
                    <div onClick={() => setIsCategoryOpen(true)} className='border-2 border-primaryColor px-3 py-2 rounded-md text-primaryColor text-center font-bold cursor-pointer'>Add Category</div>
                </div>
            </div>
            </div>
            <AdminModal quickAdd={() => setAdminCount(adminCount + 1)} isOpen={isAdminOpen} onTap={() => setIsAdminOpen(!isAdminOpen)}/>
            <CategoryModal quickAdd={() => setCategoryCount(categoryCount + 1)} isOpen={isCategoryOpen} onTap={() => setIsCategoryOpen(!isCategoryOpen)}/>
        </div>
    )
}

export default Dashboard