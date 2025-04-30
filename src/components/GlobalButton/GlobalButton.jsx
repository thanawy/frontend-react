import React from "react";
import { Link } from "react-router-dom";


 function GlobalButton({ children, disabled, to, type, onClick, }) {
  const base = `font-cairo rounded-[8px]  `;

  const styles = {
    primary: base + " sm:px-10 px-4 py-2 text-white bg-primary  text-[12px] sm:text-[16px] flex items-center gap-2 justify-center",
    primaryTransparent: base + " sm:px-8 sm:py-3 text-white text-[12px]  sm:text-[14px] flex items-center gap-2 justify-center",
    white: base + "sm:px-8 px-2 py-3 text-primary bg-white  text-[12px] sm:text-[14px] border border-primary  flex justify-center items-center ",
    whiteMoreSpace: base + "sm:px-8 px-6 py-3 text-primary bg-white  text-[12px] sm:text-[14px] border border-primary "

  };



  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );



    
  if (onClick){
    return (
      <button className={styles[type]} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );
  }
   

  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default GlobalButton;