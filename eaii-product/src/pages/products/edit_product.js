import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/navbar'
import {IoMdAdd} from 'react-icons/io'
import {BiEdit} from 'react-icons/bi'
import Dropdown from '../../../components/dropdown'
import { useRouter } from 'next/router'
import cookieCutter from 'cookie-cutter'
import TypeDropdown from '../../../components/type_dropdown'
import { AiOutlineDelete } from 'react-icons/ai'

const EditProducts = () => {
    const [image, setImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("Options")
    const [selectedType, setSelectedType] = useState("Options")
    const [isValid, setIsValid] = useState(true)
    const [isTypeValid, setIsTypeValid] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [types, setTypes] = useState([])
    const [inputValues, setInputValues] = useState({
        id: "",
        title: "",
        description: ""
      })

    const router = useRouter();

    const { id } = router.query;

    const fetchData = () => {

        const token = localStorage.getItem('token');
    
        const query = `
              query{
                products{
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
                if(data.errors[0].message === "Could not verify JWT: JWTExpired") {
                  cookieCutter.set('signed-in', false)
                  localStorage.removeItem('token');
                  router.replace('/signin')
              }
              } else {
                const prod = prods.products.filter((item) => item.id == id)[0];
                setInputValues({
                    id: prod.id,
                    title: prod.title,
                    description: prod.description
                  })
                setTypes(prod.link);
                setSelectedCategory(prod.category_name);
                setImage(prod.image_path);
              }
            });
      }
    
      useEffect(() => {
        fetchData();
      }, []);

    const hiddenClicked = () => {
        document.getElementById("hiddenFile").click();
      }

      const handleImageChange = (e) => {
        setImage(e.target.files[0]);
      };

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

      const handleChange = (event) => {
        const { name, value } = event.target;
        setInputValues((prevState) => ({ ...prevState, [name]: value }));
      };

      function editProduct(title, description, image_path, category_name) {

        const token = localStorage.getItem('token');

        let headersList = {
          "Accept": "*/*",
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
         }
         
         let gqlBody = {
           query: `mutation updateProduct($spec: jsonb){
           update_products_by_pk(pk_columns: {id: ${parseInt(id)}}
           _set: {
             title: "${title}",
             category_name: "${category_name}",
             link: $spec,
             description: "${description}",
             image_path: "${image_path}"
           }){
              title
              link
           }
         }`,
           variables: {"spec":types}
         }
         
         let bodyContent =  JSON.stringify(gqlBody);

         fetch(process.env.baseUrl, { 
          method: "POST",
          body: bodyContent,
          headers: headersList
        })
            .then(response => response.json())
            .then(data => {
    
              let category = data.data;
    
              if((typeof category === 'undefined')) {
                console.log(data)
                setIsSubmitting(false);
                if(data.errors[0].message === "Could not verify JWT: JWTExpired") {
                  cookieCutter.set('signed-in', false)
                  localStorage.removeItem('token');
                  router.replace('/signin')
              }
              } else {
                // setIsSubmitting(false)
                router.replace('/products')
              }
            });
      }

      async function onSubmit(event) {
        event.preventDefault();
        if(types.length > 0) {
          if(selectedCategory == "Options") {
            setIsValid(false);
          } else {
            setIsValid(true);
            if(image) {
              setIsSubmitting(true)
              if(typeof image === 'string' || image instanceof String){
                  editProduct(event.target.title.value, event.target.description.value, image, selectedCategory);
              } else {
                  const imageUrl = await uploadImage();
                  editProduct(event.target.title.value, event.target.description.value, imageUrl, selectedCategory);
              }
              setIsSubmitting(false);
            } else {
              setIsSubmitting(false);
            }
          }
        } else {
          setIsTypeValid(false);
          if (typeof window !== 'undefined') {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }
        }
      }

      function addType(type, url) {
        console.log(`"${JSON.stringify(types)}"`);
        if(selectedType !== "Options" && document.getElementById('url').value !== ''){
          setIsTypeValid(true);
          setTypes([...types, {type: type, url: url}]);
          document.getElementById('url').value = "";
          setSelectedType("Options");
        } else {
          setIsTypeValid(false);
        }
      }

  return (
    <>
    <Navbar />
    <div className='w-screen flex justify-center'>
        <div className='w-3/5 items-center border-2 rounded-lg border-textFormBorderbg px-10 pb-10 mt-10'>
        <div className='grid text-center gap-2 mb-5 mt-10'>
        <div className='text-3xl'>Edit Product</div>
                </div>
                <form onSubmit={onSubmit}>
                <div className='text-left my-1'>
        <p className='font-bold mb-1'>Title</p>
        <input id="title" type= 'text' name="title" placeholder={'Enter the product title'} value={inputValues.title} onChange={handleChange} className='bg-textFormbg border-textFormBorderbg border-2 outline-none w-full py-2 px-2 rounded-lg' required/>
    </div>
    {types.map((type, index) => (
      <div key={index} className='text-left text-secondaryColor my-4 flex flex-row gap-3'>
      <div className='w-full'>
          <p className='font-bold mb-1'>Type</p>
          <div className='w-full border-2 bg-surface rounded-md py-2 px-2'>{type.type}</div>
          </div>
          <div className='w-full'>
          <p className='font-bold mb-1'>URL</p>
          <div className='w-full border-2 bg-surface rounded-md py-2 px-2'>{type.url}</div>
          </div>
          <AiOutlineDelete onClick={() => {
            setTypes([...types.slice(0, index), ...types.slice(index + 1)]);
          }} size={50} className='text-dangerColor cursor-pointer mt-6'/>
      </div>
    ))}
    <div className='text-left my-4 flex flex-row gap-3'>
      <div>
          <p className='font-bold mb-1'>Type</p>
          <TypeDropdown selectedType={selectedType} setType= {(category) => setSelectedType(category)} />
          </div>
          <div className='w-full'>
          <p className='font-bold mb-1'>URL</p>
          <input id="url" type= 'text' name="url" placeholder={'Enter the product url'} className='bg-textFormbg border-textFormBorderbg border-2 outline-none w-full py-2 px-2 rounded-lg'/>
          </div>
          <div onClick={() => addType(selectedType, document.getElementById('url').value)} className='text-onPrimary rounded-md bg-primaryColor hover:bg-secondaryColor px-6 flex items-center text-center cursor-pointer'>Add</div>
      </div>
      {isTypeValid ? "" : <div className='text-red-400 mt-2 w-full font-medium'>{"Please fill this field"}</div>}
    <div className='text-left my-4'>
        <p className='font-bold mb-1'>Category</p>
        <Dropdown selectedCategory={selectedCategory} setCategory= {(category) => setSelectedCategory(category)} />
        <div className='text-red-400 mt-10 w-full text-center mb-2 font-medium'>{isValid ? "" : "Please select a category"}</div>
    </div>
    <div className='text-left my-1'>
        <p className='font-bold mb-1'>Description</p>
        <textarea name="description" rows="5" id="description" placeholder={'Enter the product description'} value={inputValues.description} onChange={handleChange} className='bg-textFormbg border-textFormBorderbg border-2 outline-none w-full py-1 px-2 rounded-lg' required/>
    </div>
    <div className='text-left my-1'>
        <p className='font-bold mb-1'>Image</p>
        {image ? (
              <div className='relative z-0 max-w-[400px] h-[250px]'>
                <img className="max-w-[400px] h-[250px] rounded-lg my-5" src={(typeof image === 'string' || image instanceof String) ? image : URL.createObjectURL(image)} />
                <BiEdit onClick={hiddenClicked} className='text-primaryColor absolute inset-0 z-10 cursor-pointer' size={25}/>
                <input
                name="mainImage"
                type="file"
                accept="image/*"
                id='hiddenFile'
                onChange={handleImageChange}
                className="invisible h-0"
              />
              </div>
            ) : (<div className='w-full h-[153px] border-2 border-dashed border-textFormBorderbg flex flex-col justify-center items-center'>
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
    </div>
    <button type='submit' disabled={isSubmitting} className='w-full bg-primaryColor font-bold disabled:bg-gray-300 disabled:text-gray-600 text-onPrimary rounded-lg cursor-pointer mt-14 py-2 text-center hover:bg-secondaryColor'>
                                {isSubmitting ? "Please Wait..." : "Edit Product"}
                            </button>
            </form>
        </div>
    </div>
    </>
  )
}

export default EditProducts