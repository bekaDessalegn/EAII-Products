import Link from "next/link";
import { useRouter } from 'next/router'
import { useRef, useState } from "react";
import { AiOutlineDown } from 'react-icons/ai'

const NavItem = ({ category, href, active }) => {
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const {id} = router.query;

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShowDropdown(false), 300);
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleDropdownMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShowDropdown(false), 300);
  };

  return (
    <>
    <Link href={href}>
      <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex flex-row items-center text-secondaryColor">
      <p
        className={`nav__item ${
          id == category.id ? "active" : ""
        }`}
      >
        {category.name}
      </p>
      <AiOutlineDown className={`ml-1 mt-1 h-4 w-4 ${id == category.id ? "text-primaryColor" : "text-secondaryColor"}`}/>
      </div>
    </Link>
    <div
          ref={dropdownRef}
          className={`${
            showDropdown ? '' : 'hidden'
          } absolute z-50 mt-2 w-48 rounded-md shadow-lg bg-white`}
          onMouseEnter={handleDropdownMouseEnter}
          onMouseLeave={handleDropdownMouseLeave}
        >
        {category.categories_product.map((product, index) => (
          <div key={index}>
          <Link href={`${href}#${product.title.split(" ").join("")}`}>
          <div className="block px-4 py-2 text-sm text-secondaryColor hover:text-primaryColor">
            {product.title}
          </div>
        </Link>
        </div>
        ))}
      </div>
    </>
  );
};

export default NavItem;