"use client"

import { useState } from "react"
import { Play, ChevronDown, ChevronUp } from "lucide-react"
import bookGreen from "../../assets/icons/bookGreen.svg"

export default function ArabicAccordion() {
  const [openIndex, setOpenIndex] = useState(0)

  // معلومات الأبواب
  const units = [
    { id: 1, title: "العناصر الانتقالية" },
    { id: 2, title: "العناصر الانتقالية" },
    { id: 3, title: "العناصر الانتقالية" },
  ]

  // تبديل فتح الباب الأول فقط
  const toggleAccordion = (index) => {
    if (index === 0) {
      setOpenIndex(openIndex === 0 ? -1 : 0)
    }
  }

  return (
    <div className="flex flex-col space-y-2 w-full font-cairo" dir="rtl">
      {/* قسم العنوان */}
      <div className="flex justify-end flex-row-reverse items-center gap-2 p-2 rounded-lg">
        <div className="flex flex-row-reverse justify-center items-center">
          <div className="flex justify-center items-center rounded-full ms-2">
            <p className="font-bold text-sm size-6 bg-black text-white flex justify-center items-center rounded-full">
              5
            </p>
          </div>
          <span className="font-bold text-lg">بنك الاسئلة</span>
        </div>
        <button className="bg-white p-1 rounded-lg">
          <img src={bookGreen || "/placeholder.svg"} alt="greenBook" className="w-5 h-5" />
        </button>
      </div>

      {/* الباب الأول - مفتوح */}
      <div className="rounded-lg overflow-hidden bg-white shadow-sm">
        <div
          className="flex flex-col sm:flex-row-reverse justify-between items-center p-2 bg-white cursor-pointer"
          onClick={() => toggleAccordion(0)}
        >
          <div className="btnn w-full sm:w-auto mb-2 sm:mb-0 flex items-center">
            <button
              className="w-full sm:w-auto bg-white gap-1 text-primary font-bold border-[2px] border-primary rounded-lg py-1 flex justify-center items-center pe-2"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-xs px-2 py-1">حل علي الباب</span>
              <Play size={16} />
            </button>
            {/* سهم التبديل */}
            <div className="mr-2 text-primary">
              {openIndex === 0 ? <ChevronUp size={20} /> : <ChevronDown size={16} />}
            </div>
          </div>
          <div className="flex items-center gap-1 flex-row-reverse w-full sm:w-auto justify-center sm:justify-start">
            {/* أيقونات حالة الدروس */}
            <div className="flex space-x-1 gap-1 sm:flex sm:flex-row-reverse">
              <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              </div>
              <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              </div>
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
              <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
                <span className="text-xs">!</span>
              </div>
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            </div>
            <div className="flex flex-row-reverse items-center mr-0 sm:mr-2">
              <span className="font-bold text-xs ml-1">الباب الاول :</span>
              <span className="font-bold text-xs">العناصر الانتقالية</span>
              <div className="mr-1">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            openIndex === 0 ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-2">
            <div className="mb-2">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 bg-[#E9FDC4] p-4 rounded">
                <span className="font-bold mb-1 sm:mb-0 text-green-700">
                  <span className="text-black font-normal me-1">الدرس الاول :</span> العناصر الانتقالية
                </span>
                <div className="flex w-full sm:w-2/3 justify-content-start items-center gap-1">
                  <div className="w-full sm:w-72 bg-gray-200 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{ width: "84%" }}></div>
                  </div>
                  <span className="text-sm font">84%</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 bg-[#E9FDC4] p-4 rounded">
                <span className="font-bold mb-1 sm:mb-0 text-green-700">
                  <span className="text-black font-normal me-1">الدرس الثاني :</span> العناصر الانتقالية
                </span>
                <div className="flex w-full sm:w-2/3 justify-content-start items-center gap-1">
                  <div className="w-full sm:w-72 bg-gray-200 rounded-full h-3">
                    <div className="bg-red-500 h-3 rounded-full" style={{ width: "24%" }}></div>
                  </div>
                  <span className="text-sm font">24%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* الأبواب المقفلة */}
      {units.map((unit, index) => (
        <div key={unit.id} className="rounded-lg overflow-hidden bg-gray-400 shadow-sm">
          <div className="flex flex-col sm:flex-row-reverse justify-between items-center p-2 bg-gray-200">
            <div className="filter blur-[2px]">
              <div className="btnn w-full sm:w-auto mb-2 sm:mb-0 flex items-center">
                <button className="w-full sm:w-auto bg-white gap-1 text-primary border border-primary rounded-lg py-1 flex justify-center items-center pe-2 opacity-70">
                  <span className="text-xs px-2 py-1">حل علي الباب</span>
                  <Play size={16} />
                </button>
                <div className="mr-2 text-primary">
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center w-full sm:w-auto">
              <div className="bg-white px-4 py-4 rounded-lg flex items-center mx-1 mb-8 sm:mb-8 w-full sm:w-auto justify-center border border-gray-200 z-10 relative">
                <div className="mr-1 bg-purple-100 rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-purple-600"
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
                <span className="text-sm font-medium">حل بدون حدود... اشترك لفتح المحتوى</span>
              </div>

              <div className="flex items-center gap-1 flex-row-reverse w-full sm:w-auto justify-center sm:justify-center mt-[-20px]">
                {/* أيقونات حالة الدروس (مبهرة) */}
                <div className="flex space-x-1 filter blur-[2px] sm:flex-row-reverse gap-1 sm:flex">
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
                    <span className="text-xs">!</span>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row-reverse items-center mr-0 sm:mr-2">
              <span className="font-bold text-xs ml-1">الباب {index + 2} :</span>
              <span className="font-bold text-xs">العناصر الانتقالية</span>
              <div className="mr-1">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
