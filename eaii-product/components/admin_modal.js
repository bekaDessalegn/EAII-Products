import React, { useState } from 'react'
import {AiOutlineClose} from 'react-icons/ai'

const AdminModal = ({addAdmin, quickAdd, isOpen, onTap}) => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [isEmailValid, setIsEmailValid] = useState(true);

    const validateEmail = (email) => {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    
      return emailPattern.test(email);
    };

    function registerAdmin(username, email, password) {

        const token = localStorage.getItem('token');
        setIsSubmitting(true)
    
        const query = `
                mutation{
                    registerAdmin(username: "${username}", email: "${email}", password: "${password}"){
                    token
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
                setIsSubmitting(false)
                setIsValid(false)
              } else {
                if(addAdmin){
                  addAdmin({username: `${username}`, email: `${email}`});
                }
                if(quickAdd) {
                  quickAdd();
                }
                setIsSubmitting(false)
                setIsValid(true)
                onTap();
              }
            });
      }

      function onSubmit(event) {
        event.preventDefault()
        if(validateEmail(event.target.email.value)){
          setIsEmailValid(true);
          registerAdmin(event.target.username.value, event.target.email.value, event.target.admin_password.value)
        } else {
          setIsEmailValid(false);
        }
      }

  return isOpen ? (
    <div className='fixed inset-0 bg-black/25 backdrop-blur-sm flex justify-center items-center z-50'>
        <div className='bg-white p-12 rounded-md flex flex-col justify-center items-center w-[500px]'>
            <div className='w-full flex justify-end'>
                <AiOutlineClose onClick={onTap} className='cursor-pointer' size={25}/>
            </div>
        <p className='text-[20px] font-bold mb-8 mt-5'>Add Admin</p>
        <form onSubmit={onSubmit} className='w-full'>
        <div className='text-left my-1 w-full'>
        <p className='font-bold mb-1'>Username</p>
        <input id="username" type= 'text' name="username" placeholder={'Enter username'} className='bg-textFormbg border-textFormBorderbg border-2 outline-none w-full py-2 px-2 rounded-lg' required/>
    </div>
    <div className='text-left my-1 w-full'>
        <p className='font-bold mb-1'>Email</p>
        <input id="email" type= 'text' name="email" placeholder={'Enter email'} className='bg-textFormbg border-textFormBorderbg border-2 outline-none w-full py-2 px-2 rounded-lg' required/>
    </div>
    {!isEmailValid && <div className='text-red-400 mt-2 w-full mb-2 font-medium'>Invalid Email</div>}
    <div className='text-left my-1 w-full'>
        <p className='font-bold mb-1'>Password</p>
        <input id="admin_password" type= 'password' name="admin_password" placeholder={'Enter password'} className='bg-textFormbg border-textFormBorderbg border-2 outline-none w-full py-2 px-2 rounded-lg' required/>
    </div>
    <div className='text-red-400 mt-10 w-full text-center mb-2 font-medium'>{isValid ? "" : "Something went wrong"}</div>
    <button type='submit' disabled={isSubmitting} className='w-full bg-secondaryColor disabled:bg-gray-300 disabled:text-gray-600 text-onPrimary rounded-lg cursor-pointer  py-2 text-center hover:bg-primaryColor'>
                                {isSubmitting ? "Please Wait..." : "Add"}
                            </button>
        </form>
        </div>
    </div>
  ) : (<></>)
}

export default AdminModal