import React from "react";
import st1 from "../../assets/images/st1.svg";
import st2 from "../../assets/images/st2.svg";
import st3 from "../../assets/images/st3.png";

const LandingTestimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "أحمد محمد",
      rating: 5,
      text: '"ساعدني ثانوية في تحسين مستواي بشكل كبير. النظام الذكي ساعدني في فهم نقاط ضعفي وكيفية تحسينها ." ',
      avatar: st1,
    },
    {
      id: 2,
      name: "سارة أحمد",
      rating: 5,
      text: '"التقارير التفصيلية والتحليل الذكي ساعدني في تنظيم وقتي وتركيز جهودي في المواد التي أحتاجها ."',
      avatar: st2,
    },
    {
      id: 3,
      name: "محمد علي",
      rating: 5,
      text: '"بنك الأسئلة الضخم والشرح المفصل ساعدني في فهم المواد بشكل أفضل. أنصح به بشدة  ! "',
      avatar: st3,
    },
  ];

  return (
    <div className="w-full px-4 py-8 md:py-16  lg:mb-24" dir="rtl">
      <div className="max-w-7xl mx-auto">
      

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-start transition-transform hover:shadow-md hover:-translate-y-1"
            >
              <div className="flex justify-start items-center gap-4 w-full ">
                {" "}
                <div className="w-16 h-16 mb-4 rounded-full overflow-hidden border-2 border-yellow-400 ">
                  <img
                    src={testimonial.avatar}
                    alt={`صورة ${testimonial.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>

          <div className="flex-col">
          <h3 className="font-bold text-lg mb-2">{testimonial.name}</h3>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
          </div>
              </div>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingTestimonial;
