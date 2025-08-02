"use client";

import { useEffect } from "react";

const AuthLayout = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen pt-16">
      {children}
    </div>
  );
};

export default AuthLayout;
