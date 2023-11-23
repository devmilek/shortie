import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex items-center justify-center h-full w-full">
      <div className="max-w-sm w-full flex flex-col items-center">
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
