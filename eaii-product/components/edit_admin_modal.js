import React, { useEffect, useState } from 'react'
import {AiOutlineClose} from 'react-icons/ai'

const EditAdminModal = ({admin, editAdmin, isOpen, onTap}) => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [inputValues, setInputValues] = useState({
        username: admin.username,
        email: admin.email
      })
    const [isEmailValid, setIsEmailValid] = useState(true);

    const validateEmail = (email) => {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    
      return emailPattern.test(email);
    };

    useEffect(() => {
        setInputValues({
            id: admin.id,
            username: admin.username,
            email: admin.email
          })
      }, [admin]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputValues((prevState) => ({ ...prevState, [name]: value }));
      };

    function registerAdmin(username, email) {

        const token = localStorage.getItem('token');
        setIsSubmitting(true)
    
        const query = `
                    mutation {
                        update_admin_by_pk(pk_columns: {id: "${inputValues.id}"}
                        _set: {
                        username: "${username}",
                        email: "${email}"
                        }
                        ){
                        username
                        email
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

              console.log(data)
    
              if((typeof admin === 'undefined')) {
                setIsSubmitting(false)
                setIsValid(false)
              } else {
                editAdmin({id: `${inputValues.id}`, username: `${username}`, email: `${email}`});
                setIsSubmitting(false)
                setIsValid(true)
                onTap();
              }
            });
      }

      function onSubmit(event) {
        event.preventDefault()
        // console.log(event.target.username.value)
        if(validateEmail(event.target.email.value)){
          setIsEmailValid(true);
          registerAdmin(event.target.username.value, event.target.email.value)
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
        <p className='text-[20px] font-bold mb-8 mt-5'>Edit Admin</p>
        <form onSubmit={onSubmit} className='w-full'>
        <div className='text-left my-1 w-full'>
        <p className='font-bold mb-1'>Username</p>
        <input value={inputValues.username} type= 'text' name="username" placeholder={'Enter username'} onChange={handleChange} className='bg-textFormbg border-textFormBorderbg border-2 outline-none w-full py-2 px-2 rounded-lg' required/>
    </div>
    <div className='text-left my-1 w-full'>
        <p className='font-bold mb-1'>Email</p>
        <input value={inputValues.email} type= 'text' name="email" placeholder={'Enter email'} onChange={handleChange} className='bg-textFormbg border-textFormBorderbg border-2 outline-none w-full py-2 px-2 rounded-lg' required/>
    </div>
    {!isEmailValid && <div className='text-red-400 mt-2 w-full mb-2 font-medium'>Invalid Email</div>}
    {/* <div className='text-left my-1 w-full'>
        <p className='font-bold mb-1'>Password</p>
        <input type= 'password' name="admin_password" placeholder={'Enter password'} className='bg-textFormbg border-textFormBorderbg border-2 outline-none w-full py-2 px-2 rounded-lg' required/>
    </div> */}
    <div className='text-red-400 mt-10 w-full text-center mb-2 font-medium'>{isValid ? "" : "Something went wrong"}</div>
    <button type='submit' disabled={isSubmitting} className='w-full bg-secondaryColor disabled:bg-gray-300 disabled:text-gray-600 text-onPrimary rounded-lg cursor-pointer  py-2 text-center hover:bg-primaryColor'>
                                {isSubmitting ? "Please Wait..." : "Edit"}
                            </button>
        </form>
        </div>
    </div>
  ) : (<></>)
}

export default EditAdminModal