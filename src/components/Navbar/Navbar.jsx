import React from "react";
import GlobalButton from "../GlobalButton/GlobalButton";
export function StartNavbar() {
  return (
    <div className="position-fixed top-0 left-0 w-full z-50 bg-[#FAF7FF] shadow-sm">
      <div className="flex justify-between items-center px-4 lg:px-16 py-4">
        {/* logo */}
        <div className="text-primary ">
          <p className="text-[28px] leading-[40px] font-extrabold pe-4 sm:pe-0">ثانوي</p>
        </div>

        {/* Auth Btns */}

       <div className="flex gap-4">
       <GlobalButton type="primary" to={"/login"}>تسجيل الدخول</GlobalButton>
       <GlobalButton type="white" to={"register"}>إنشاء حسابك المجانى</GlobalButton>
       </div>
      </div>
    </div>
  );
}





