import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-tr from-violet-600 via-indigo-700 to-blue-700">
      {children}
    </div>
  );
};

export default AuthLayout;
