import Link from "next/link";
import { useRouter } from 'next/router'

const NavItem = ({ text, href, active }) => {
  const router = useRouter()

  return (
    <Link href={href}>
      <p
        className={`nav__item ${
          router.pathname === href ? "active" : ""
        }`}
      >
        {text}
      </p>
    </Link>
  );
};

export default NavItem;