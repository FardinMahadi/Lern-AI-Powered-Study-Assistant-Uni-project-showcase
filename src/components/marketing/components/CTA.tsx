import Link from "next/link";
import React from "react";
import ShinyText from "@/components/marketing/ShinyText";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { TiThMenu } from "react-icons/ti";

const CTA = () => {
  return (
    <div>
      {/* Mobile screen */}
      <div className="md:hidden">
        <Menu>
          <MenuButton className="text-[#b5b5b5a4] text-xl">
            <TiThMenu />
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="w-52 origin-top-right rounded-xl border border-[#b5b5b5a4] bg-surface-light p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0 z-100 flex flex-col text-center gap-2 font-bold"
          >
            <MenuItem>
              <Link
                href="/features"
                className="text-gray-300 hover:text-muted-dark transition-colors duration-200"
              >
                Features
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href="/pricing"
                className="text-gray-300 hover:text-muted-dark transition-colors duration-200"
              >
                Pricing
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href="/about"
                className="text-gray-300 hover:text-muted-dark transition-colors duration-200"
              >
                About
              </Link>
            </MenuItem>
            <div className="my-1 h-px bg-[#b5b5b5a4]" />
            <MenuItem>
              <Link
                href="/login"
                className="text-[#b5b5b5a4] hover:text-[rgb(181,181,181)] transition"
              >
                Login
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href="/signup"
                className="border border-[#b5b5b5a4] rounded-full px-3 py-0.5 bg-background-light hover:bg-[#2a2a2a]"
              >
                <ShinyText text="Sign Up" disabled={false} speed={3} />
              </Link>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>

      {/* Big screen */}
      <div className="hidden md:flex items-center space-x-4">
        <Link
          href="/login"
          className="text-[#b5b5b5a4] hover:text-[rgb(181,181,181)] transition"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="border border-[#b5b5b5a4] rounded-full px-3 py-0.5 bg-background-light hover:bg-[#2a2a2a]"
        >
          <ShinyText text="Sign Up" disabled={false} speed={3} />
        </Link>
      </div>
    </div>
  );
};

export default CTA;
