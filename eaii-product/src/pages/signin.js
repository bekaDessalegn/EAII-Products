import React, { useState } from 'react'
import logo from '../../public/images/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import cookieCutter from 'cookie-cutter'
import { useRouter } from 'next/router'

let router
const SignIn = () => {
    router = useRouter()
    const [isValid, setIsValid] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <div className='flex h-screen w-screen justify-center'>
        <div className='w-1/2 h-full hidden md:flex justify-center items-center'>
            <div className=''>
                <Image className='max-w-[350px]' src={logo} />
            </div>
        </div>
        <div className='md:w-1/2 h-full flex justify-center items-center lg:mr-40'>
            <div className='flex-col text-center'>
                <p className='text-4xl text-primaryColor'>HELLO</p>
                <p className='font-bold text-4xl text-secondaryColor'>ADMIN</p>
                <div className='text-left mt-16'>
                <p className='text-gray mb-2'>Please sign in to your account</p>
                <form onSubmit={submit}>
                <div className='text-left my-1'>
        <p className='font-bold mb-1'>Email</p>
        <input type= 'text' name="username" placeholder={'Enter your email'} className='bg-textFormbg border-textFormBorderbg border-2 outline-none w-full py-2 px-2 rounded-lg' required />
    </div>
    <div className='text-left my-1'>
        <p className='font-bold mb-1'>Password</p>
        <input type= 'password' name='password' placeholder={'Enter your password'} className='bg-textFormbg border-textFormBorderbg border-2 outline-none w-80 py-2 px-2 rounded-lg' required/>
    </div>
    <div className='text-red-400 mt-10 w-full text-center mb-2 font-medium'>{isValid ? "" : "Invalid Credentials"}</div>
                <div className='mt-10'>
                <button type='submit' disabled={isSubmitting} className='w-full bg-secondaryColor disabled:bg-gray-300 disabled:text-gray-600 text-onPrimary rounded-lg cursor-pointer  py-2 text-center hover:bg-primaryColor'>
                                {isSubmitting ? "Please Wait..." : "Sign In"}
                            </button>
                </div>
                </form>
                </div>
            </div>
        </div>
    </div>
  )

  async function submit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    const query = `mutation{
        loginAdmin(email: "${event.target.username.value}", password: "${event.target.password.value}"){
          token
        }
      }`;

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
            
          let value = data.data;

          if((typeof value === 'undefined')) {
            console.log(value);
            setIsSubmitting(false)
            setIsValid(false)
          } else {
            let token = value.loginAdmin.token;
            localStorage.setItem('token', token);
            console.log(token);
            setIsValid(true)
            cookieCutter.set('signed-in', true)
            router.replace('/')
          }
        });
}
}

export default SignIn