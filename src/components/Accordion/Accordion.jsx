"use client"

import { useState } from "react"
import { Play, ChevronDown, ChevronUp } from "lucide-react"
import book from "../../assets/icons/book-1svg.svg"

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState(0)

  const units = [
    { id: 1, title: "العناصر الانتقالية" },
    { id: 2, title: "العناصر الانتقالية" },
    { id: 3, title: "العناصر الانتقالية" },
  ]

  const toggleAccordion = (index) => {
    // Only allow toggling the first item (index 0)
    if (index === 0) {
      setOpenIndex(openIndex === 0 ? -1 : 0)
    }
  }

  return (
    <div className="flex flex-col space-y-2 w-full">
      {/* Header section */}
      <div className="flex justify-end flex-row-reverse items-center gap-2 p-2 rounded-lg">
        <div className="flex flex-row-reverse justify-center items-center">
          <div className="flex justify-center items-center rounded-full ms-2">
            <p className="font-bold text-sm size-6 bg-black text-white flex justify-center items-center rounded-full">
              5
            </p>
          </div>
          <span className="font-bold text-lg">بنك الاسئلة</span>
        </div>
        <button className="bg-green-100 text-green-600 p-1 rounded-lg">
          <img src={book || "/placeholder.svg"} alt="book" className="w-4 h-4" />
        </button>
      </div>

      {/* First accordion item - Enabled */}
      <div className="rounded-lg overflow-hidden ">
        <div
          className="flex flex-col sm:flex-row-reverse justify-between items-center p-2 bg-white cursor-pointer"
          onClick={() => toggleAccordion(0)}
        >
          <div className="btnn w-full sm:w-auto mb-2 sm:mb-0 flex items-center">
            <button
              className="w-full sm:w-auto bg-white gap-1 text-primary border border-primary rounded-lg py-1 flex justify-center items-center pe-2"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-xs px-2 py-1">حل علي الباب</span>
              <Play size={14} />
            </button>
            {/* Toggle arrow added here */}
            <div className="mr-2 text-primary">
              {openIndex === 0 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </div>
          <div className="flex items-center gap-1 flex-row-reverse w-full sm:w-auto justify-center sm:justify-start">
            <div className="flex space-x-1 hidden sm:flex">
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <div className="flex flex-row-reverse items-center mr-0 sm:mr-2">
              <span className="font-bold text-xs ml-1"> الباب الاول : </span>
              <span className="font-bold text-xs">العناصر الانتقالية</span>
              <div className="mr-1">
                <img src={book || "/placeholder.svg"} alt="book" className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {openIndex === 0 && (
          <div className="bg-green-50 p-2">
            <div className="mb-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                <span className="font-bold text-xs mb-1 sm:mb-0">الدرس الاول: العناصر الانتقالية</span>
                <div className="flex w-full sm:w-1/2 items-center gap-1">
                  <div className="w-full sm:w-32 bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: "84%" }}></div>
                  </div>
                  <span className="text-xs">84%</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <span className="font-bold text-xs mb-1 sm:mb-0">الدرس الثاني: العناصر الانتقالية</span>
                <div className="flex w-full sm:w-1/2 items-center gap-1">
                  <div className="w-full sm:w-32 bg-gray-200 rounded-full h-1.5">
                    <div className="bg-red-500 h-1.5 rounded-full" style={{ width: "24%" }}></div>
                  </div>
                  <span className="text-xs">24%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Locked accordion items */}
      {units.map((unit, index) => (
        <div key={index + 1} className="rounded-lg overflow-hidden">
          <div className="flex flex-col sm:flex-row-reverse justify-between items-center p-2 bg-white">
            <div className="filter blur-sm">
              <div className="btnn w-full sm:w-auto mb-2 sm:mb-0 flex items-center">
                <button
                  className="w-full sm:w-auto bg-white gap-1 text-primary border border-primary rounded-lg py-1 flex justify-center items-center pe-2 opacity-70"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-xs px-2 py-1">حل علي الباب</span>
                  <Play size={14} />
                </button>
                {/* Blurred toggle arrow for locked items */}
                <div className="mr-2 text-primary">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            <div className="bg-white px-2 py-3 rounded-lg flex items-center mx-1 my-2 sm:my-0 w-full sm:w-auto justify-center border border-gray-200">
              <div className="mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-purple-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-xs">حل بدون حدود... اشترك لفتح المحتوى</span>
            </div>

            <div className="flex items-center gap-1 flex-row-reverse w-full sm:w-auto justify-center sm:justify-start">
              <div className="flex space-x-1 filter blur-sm hidden sm:flex">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className="flex flex-row-reverse items-center mr-0 sm:mr-2">
                <span className="font-bold text-xs ml-1"> الباب {index + 2} : </span>
                <span className="font-bold text-xs">العناصر الانتقالية</span>
                <div className="mr-1">
                  <img src={book || "/placeholder.svg"} alt="book" className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}