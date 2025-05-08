import React, { useState } from 'react'
import GlobalNavbar from '../../components/GlobalNavbar/GlobalNavbar'
import SideBar from '../../components/SideBar/SideBar'
import { Outlet, useLocation } from 'react-router-dom'

export default function Applayout() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentTitle, setCurrentTitle] = useState("المواد الدراسية");
  const location = useLocation();

  // Get the current route path to pass to children
  const currentPath = location.pathname;

  return (
    <div className="flex w-full overflow-x-hidden">
        <SideBar 
          isOpen={isOpen} 
          setIsOpen={setIsOpen} 
          setCurrentTitle={setCurrentTitle}
          currentPath={currentPath}
        />
      <div className={`flex flex-col flex-1 min-w-0`}>
        <GlobalNavbar 
          isOpen={isOpen} 
          setIsOpen={setIsOpen} 
          currentTitle={currentTitle}
          currentPath={currentPath}
        /> 
        <main className="flex-1 overflow-y-auto p-4 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}