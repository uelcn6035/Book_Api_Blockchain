import { Navbar, NavbarBrand } from "@nextui-org/react";
import { MdApi } from "react-icons/md";

const NavBar = () => {
  return (
    <Navbar className="bg-gradient-to-r from-blue-400 to-purple-500 h-16 flex justify-between items-center">
      <NavbarBrand>
        <MdApi className="w-8 h-8 text-white" />
        <p className="font-bold text-white">Library API</p>
      </NavbarBrand>
      <p className="text-lg font-extrabold text-white tracking-wide animate-pulse" style={{ marginRight: '20px' }}>
        Channel to Knowledge
      </p>
    </Navbar>
  );
};

export default NavBar;
