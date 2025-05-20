import Link from "next/link";
import React from "react";
import ShinyText from "../ShinyText";

const CTA = () => {
  return (
    <div className="flex items-center space-x-4">
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
  );
};

export default CTA;
