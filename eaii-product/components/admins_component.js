import React, { useEffect, useState } from 'react'
import DeleteModal from './delete_modal'
import EditAdminModal from './edit_admin_modal'
import { BiEdit } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import AddIcon from '@mui/icons-material/Add';
import AdminModal from './admin_modal';
import { useRouter } from 'next/router'
import cookieCutter from 'cookie-cutter'

const AdminsComponent = () => {

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState();
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  function deleteAdmin() {

    const token = localStorage.getItem('token');

    const query = `
            mutation{
              delete_admin_by_pk(id: "${selectedAdmin.id}"){
                id
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

          if((typeof admin === 'undefined')) {
            if(data.errors[0].message === "Could not verify JWT: JWTExpired") {
              cookieCutter.set('signed-in', false)
              localStorage.removeItem('token');
              router.replace('/signin')
          }
          } else {
            setAdmins(admins.filter((admin) => admin.id !== selectedAdmin.id))
            setIsDeleteOpen(false);
          }
        });
  }

  const fetchData = () => {

    setIsLoading(true);

    const token = localStorage.getItem('token');

    const query = `
            query {
              admin{
                id
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

          let prods = data.data;

          if((typeof prods === 'undefined')) {
            console.log(data)
            setIsLoading(false);
            if(data.errors[0].message === "Could not verify JWT: JWTExpired") {
              cookieCutter.set('signed-in', false)
              localStorage.removeItem('token');
              router.replace('/signin')
          }
          } else {
            setAdmins(data.data.admin);
            setIsLoading(false);
          }
        });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <DeleteModal onClick={() => {
      deleteAdmin();
    }} isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete link">
        <p>Are you sure you want to delete this admin ?</p>
      </DeleteModal>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 gap-10 mx-10 mt-10'>
      {admins.map((admin) => (
        <div key={admin.id} className='border-2 rounded-md px-8 py-8 bg-surface'>
        <div className='w-full flex justify-end'>
          <BiEdit onClick={() => {
            setSelectedAdmin(admin);
            setIsEditOpen(true)}} size={21} className='text-primaryColor cursor-pointer'/>
          <AiOutlineDelete onClick={() => {
            setSelectedAdmin(admin);
            setIsDeleteOpen(true)}} size={21} className='text-dangerColor cursor-pointer ml-2'/>
          </div>
        <p className='text-[24px]'>{admin.username}</p>
        <p className='text-[16px]'>{admin.email}</p>
      </div>
      ))}
    </div>
    {selectedAdmin && <EditAdminModal admin={selectedAdmin} editAdmin={(editedAdmin) => { 
      console.log(editedAdmin);
      let newAdmins = admins;
      newAdmins.find(function(admin) {
        if (admin.id == editedAdmin.id) {
          admin.username = editedAdmin.username;
          admin.email = editedAdmin.email;
        }
      })
      setAdmins(newAdmins);
        }} isOpen={isEditOpen} onTap={() => setIsEditOpen(!isEditOpen)}/>}
    <div className='fixed bottom-16 right-16'>
      <div onClick={() => setIsOpen(true)} className='p-4 rounded-full cursor-pointer bg-primaryColor text-onPrimary hover:bg-secondaryColor'>
        <AddIcon />
      </div>
      </div>
     <AdminModal addAdmin={(admin) => setAdmins([...admins, admin])} isOpen={isOpen} onTap={() => setIsOpen(!isOpen)}/>
    </>
  )
}

export default AdminsComponent