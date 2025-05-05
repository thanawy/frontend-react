import React, { useState } from 'react'
import GlobalNavbar from '../../components/GlobalNavbar/GlobalNavbar'
import SideBar from '../../components/SideBar/SideBar'

export default function Applayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex w-full">
         <SideBar isOpen={isOpen} setIsOpen={setIsOpen}/>
      <div className={`flex flex-col flex-1`}>
        <GlobalNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="flex-1 overflow-y-auto p-4 overflow-x-hidden">
          {children}
        </main>
      </div>
   
    </div>
  )
}