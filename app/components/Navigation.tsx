import Link from "next/link";
import { navItems } from "../config/navItems";
import NavItem from "./NavItem";

const Navigation = () => {
  return (
    <nav className="flex w-full min-h-10 justify-between px-32 py-12">
      <h1 className="text-3xl">Logo</h1>
      <div className="flex gap-16">
        {navItems.map(({ label, href }, index) => (
          <Link className="flex items-center" key={index} href={href}>
            <NavItem>{label}</NavItem>
          </Link>
        ))}
      </div>
    </nav>
  );
};
export default Navigation;
