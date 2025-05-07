"use client"

import { useQuery } from "@tanstack/react-query"
import { useRef, useState } from "react"
import book from "../../assets/icons/book.svg"
import { getSubjects } from "../../API/subjects"

export default function SubjectsSlider() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,
  })

  const sliderRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const placeholderSubjects = "not Founded"

  const subjects = data && data.length > 0 ? data : placeholderSubjects

  const handleMouseDown = (e) => {
    if (!sliderRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 2
    sliderRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e) => {
    if (!sliderRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }

  const handleTouchMove = (e) => {
    if (!isDragging || !sliderRef.current) return
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 2
    sliderRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="w-full flex flex-col rtl">
      <div className="flex justify-start gap-4 items-center mb-4">
        <img src={book} alt="book" />
        <h2 className="text-[24px] leading-[32px] font-bold">المواد الدراسية</h2>
      </div>

      <div
        ref={sliderRef}
        className={`flex overflow-x-hidden gap-4 pb-4 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          scrollBehavior: isDragging ? "auto" : "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="w-[calc(33.333%_-_16px)] flex-shrink-0 rounded-xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col"
            style={{ 
              userSelect: "none",
              minWidth: "300px"
            }}
          >
            <div className="flex flex-row-reverse justify-end items-center gap-4 mb-4">
              <div className="text-right">
                <h3 className="font-bold text-lg">{subject.name}</h3>
                <div className="mt-1 text-sm text-gray-500">تقدمك</div>
              </div>
              <img className="size-24 p-2 rounded-lg" src={subject.image || "📚"} alt={subject.name} />
            </div>

            <div className="flex items-center w-full mb-4">
              <div className="flex-grow bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    Math.round(subject.progress * 100) < 50
                      ? "bg-red-500"
                      : Math.round(subject.progress * 100) < 75
                        ? "bg-yellow-400"
                        : "bg-green-500"
                  }`}
                  style={{ width: `${Math.round(subject.progress * 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mr-2">{Math.round(subject.progress * 100)}%</div>
            </div>

            <div className="flex gap-2 mt-auto">
              <button
                className="flex-1 bg-primary gap-2 text-white rounded-lg py-2 flex justify-center items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-sm lg:text-[16px]">بنك الأسئلة</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </button>
              <button
                className="flex-1 border gap-2 border-gray-300 rounded-lg py-2 flex justify-center items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-sm lg:text-[16px]">امتحان شامل</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M7 8h10" />
                  <path d="M7 12h10" />
                  <path d="M7 16h10" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}