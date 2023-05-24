import React, { useEffect, useState } from 'react'
import {BiEdit} from 'react-icons/bi'
import {AiOutlineDelete} from 'react-icons/ai'
import EditCategoryModal from './edit_category_modal'
import DeleteModal from './delete_modal'
import CategoryModal from './category_modal'
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router'
import cookieCutter from 'cookie-cutter'

const CategoriesComponent = () => {

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState();
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  function deleteCategory() {

    const token = localStorage.getItem('token');

    const query = `
            mutation{
              delete_categories_by_pk(id: "${selectedCategory.id}"){
                id
                name
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
            setCategories(categories.filter((category) => category.id !== selectedCategory.id))
            setIsDeleteOpen(false);
          }
        });
  }

  const fetchData = () => {

    setIsLoading(true);

    const token = localStorage.getItem('token');

    const query = `
        query {
          categories(order_by: {created_at: asc}){
            id
            name
            description
            icon
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

          let cats = data.data;

          if((typeof cats === 'undefined')) {
            setIsLoading(false);
            if(data.errors[0].message === "Could not verify JWT: JWTExpired") {
              cookieCutter.set('signed-in', false)
              localStorage.removeItem('token');
              router.replace('/signin')
          }
          } else {
            setCategories(data.data.categories);
            setIsLoading(false);
          }
        });
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
    <DeleteModal onClick={deleteCategory} isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete link">
        <p>Are you sure you want to delete this category ?</p>
      </DeleteModal>
    <div className='grid lg:grid-cols-4 md:grid-cols-3 gap-10 mx-10 mt-10'>
      {categories.length == 0 ? <div> Loading </div> : categories.map((category) => (
        <div className='border-2 rounded-md px-8 py-8 bg-surface'>
        <div className='w-full flex justify-end'>
          <BiEdit onClick={() => {
            setSelectedCategory(category);
            setIsEditOpen(true)}} size={21} className='text-primaryColor cursor-pointer'/>
          <AiOutlineDelete onClick={() => {
            setSelectedCategory(category);
            setIsDeleteOpen(true)}} size={21} className='text-dangerColor cursor-pointer ml-2'/>
          </div>
          <img src={category.icon} className='w-[40px] h-[40px] mb-2' />
        <p className='text-[24px]'>{category.name}</p>
        <p className='text-[16px]'>{category.description}</p>
      </div>
      ))}
    </div>
    {selectedCategory && <EditCategoryModal category={selectedCategory} editCategory={(editedCategory) => {
      console.log("TTTTTTTTTTTTTTTTTTTTTTTT"); 
      console.log(editedCategory);
      let newCategories = categories;
      newCategories.find(function(category) {
        if (category.id == editedCategory.id) {
          category.name = editedCategory.name;
          category.description = editedCategory.description;
          category.icon = editedCategory.icon;
        }
      })
      setCategories(newCategories);
        }} isOpen={isEditOpen} onTap={() => setIsEditOpen(!isEditOpen)}/>}
    <div className='fixed bottom-16 right-16'>
      <div onClick={() => setIsOpen(true)} className='p-4 rounded-full cursor-pointer bg-primaryColor text-onPrimary hover:bg-secondaryColor'>
        <AddIcon />
      </div>
      </div>
      <CategoryModal addCategory={(category) => setCategories([...categories, category])} isOpen={isOpen} onTap={() => setIsOpen(!isOpen)}/>
    </>
  )
}

export default CategoriesComponent