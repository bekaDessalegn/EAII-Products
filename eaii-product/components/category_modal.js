import React, { useState } from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import {IoMdAdd} from 'react-icons/io'
import {BiEdit} from 'react-icons/bi'

const CategoryModal = ({addCategory, quickAdd, isOpen, onTap}) => {

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [image, setImage] = useState(null);
    const [isImageNull, setIsImageNull] = useState(false)

    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
    };

    const hiddenClicked = () => {
      document.getElementById("hiddenFile").click();
    }

    async function uploadImage() {
      let headersList = {
        "Accept": "*/*"
       }
       
       let bodyContent = new FormData();
       bodyContent.append("upload_preset", "cvm3azcu");
       bodyContent.append("file", image);
       
       let response = await fetch("https://api.cloudinary.com/v1_1/ddkybdc5n/image/upload", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.json();
       console.log(data.url);
       return data.url;
    }

    function postCategory(name, description, icon) {

        const token = localStorage.getItem('token');
        setIsSubmitting(true)
    
        const query = `
                mutation{
                    insert_categories(objects: {
                    name: "${name}",
                    description: "${description}",
                    icon: "${icon}",
                    }) {
                    returning{
                        name
                        description
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
    
              let category = data.data;
    
              if((typeof category === 'undefined')) {
                setIsSubmitting(false)
                setIsValid(false)
              } else {
                if(addCategory) {
                  addCategory({name: `${name}`, description: `${description}`, icon: `${icon}`});
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

      async function onSubmit(event) {
        event.preventDefault()
        if(image) {
          setIsImageNull(false);
          const imageUrl = await uploadImage();
          postCategory(event.target.categoryname.value, event.target.categorydescription.value, imageUrl);
        } else {
          setIsImageNull(true);
        }
      }

  return isOpen ? (
    <div className='fixed inset-0 bg-black/25 backdrop-blur-sm flex justify-center items-center z-50'>
        <div className='bg-white p-12 rounded-md flex flex-col justify-center items-center w-[500px]'>
            <div className='w-full flex justify-end'>
                <AiOutlineClose onClick={onTap} className='cursor-pointer' size={25}/>
            </div>
        <p className='text-[20px] font-bold mb-8 mt-5'>Add Category</p>
        <form onSubmit={onSubmit} className='w-full'> 
        <div className='text-left my-1 w-full'>
        <p className='font-bold mb-1'>Category Name</p>
        <input id="categoryname" type= 'text' name="categoryname" placeholder={'Enter category name'} className='bg-textFormbg border-textFormBorderbg border-2 outline-none w-full py-2 px-2 rounded-lg' required/>
    </div>
    <div className='text-left my-1 w-full'>
        <p className='font-bold mb-1'>Description</p>
        <textarea name="categorydescription" rows="5" id="categorydescription" placeholder={'Enter the category description'} className='bg-textFormbg border-textFormBorderbg border-2 outline-none w-full py-1 px-2 rounded-lg' required/>
    </div>
    <div className='text-left my-1'>
        <p className='font-bold mb-1'>Icon</p>
        {image ? (
              <div className='relative z-0 max-w-[60px] h-[60px]'>
                <img className="max-w-[60px] h-[60px] rounded-lg my-5" src={URL.createObjectURL(image)} />
                <BiEdit onClick={hiddenClicked} className='text-secondaryColor absolute inset-0 z-10 cursor-pointer' size={25}/>
                <input
                name="mainImage"
                type="file"
                accept="image/*"
                id='hiddenFile'
                onChange={handleImageChange}
                className="invisible h-0"
              />
              </div>
            ) : (<div className='w-full h-[40px] border-2 border-dashed border-textFormBorderbg flex flex-col justify-center items-center'>
            <IoMdAdd onClick={hiddenClicked} size={40} className='text-primaryColor cursor-pointer'/>
            <input
                name="mainImage"
                type="file"
                accept="image/*"
                id='hiddenFile'
                onChange={handleImageChange}
                className="invisible h-0"
              />
        </div>)}
        <div className='text-red-400 mt-10 w-full text-center mb-2 font-medium'>{isImageNull ? "Icon can not be null" : ""}</div>
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

export default CategoryModal