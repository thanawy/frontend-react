import React from "react";
import { StartNavbar } from "../../components/Navbar/Navbar";
import landingHero from "../../assets/images/landingHero.svg";
import landingHeroTAB from "../../assets/images/landingHeroTAB.svg";
import landingHeroMOB from "../../assets/images/landingHeroMOB.svg";
import arrowLeft from "../../assets/images/arrowLeft.svg";
import stop from "../../assets/images/stop.svg";
import GlobalButton from "../../components/GlobalButton/GlobalButton";
import i1 from "../../assets/icons/whyIcon1.svg";
import i2 from "../../assets/icons/whyIcon2.svg";
import i3 from "../../assets/icons/whyIcon3.svg";
import LandingTable from "../../components/LandingTable/LandingTable";
import LandingTestimonial from "../../components/LandingTestimonial/LandingTestimonial";

export default function StartLanding() {
  return (
    <div className="overflow-x-hidden">
      <StartNavbar />
      <main>
        {/* start Hero-Section */}
        <div className="Hero-Section flex flex-col-reverse md:flex-row justify-between items-center md:items-start  pb-28 md:pb-[100px] bg-white pt-8 md:pt-16 min-h-[75vh] md:h-dvh px-4 sm:px-8 md:px-16 mt-[1px] gap-8 md:gap-0">
          <div className="w-full md:w-1/2 order-2 md:order-1 text-center md:text-right">
            <p className="text-2xl md:text-[32px] font-bold leading-[150%]">
              اول بنك اسئلة ذكى
            </p>
            <p className="text-2xl md:text-[32px] font-bold leading-[150%] text-primary mb-2 md:mb-4">
              للثانوية العامة
            </p>
            <p className="text-lg md:text-[24px] font-[500] leading-[150%] mb-6 md:mb-[35px] text-secondary">
              منصة تعليمية مدعومة بالذكاء الاصطناعي لتحليل أدائك وتحسين مستواك
              الدراسي بطريقة مبتكرة وفعالة
            </p>

            <div className="flex justify-center md:justify-start pt-10 sm:pt-0">
              <GlobalButton type="primary">
                ابدأ رحلة التفوق الان
                <img src={arrowLeft} alt="arrowLeft" className="w-6 sm:w-8" />
              </GlobalButton>
            </div>
          </div>

          <div className="w-full md:w-[45%] order-1 md:order-2">
            <img
              src={landingHero}
              alt="hero-img"
              className="w-full h-auto max-h-[300px]  md:max-h-[400px] "
            />










          </div>
        </div>
        {/* end Hero-Section */}

        {/*start After Hero */}
        <div className="px-4 sm:px-0 lg:block hidden">
          <img src={stop} alt="slogan-image" className="w-full" />
        </div>
        <div className="px-4 sm:px-0 sm:block hidden lg:hidden">
          <img src={landingHeroTAB} alt="slogan-image" className="w-full" />
        </div>
        <div className="px-4 sm:px-0 block sm:hidden ">
          <img src={landingHeroMOB} alt="slogan-image" className="w-full" />
        </div>
        {/* end After Hero */}

        {/* start why you choose us  */}
        <div className="flex justify-center items-center flex-col px-4 sm:px-8 md:px-16 py-12">
          <h1 className="text-2xl sm:text-3xl md:text-[40px] font-bold mb-8 md:mb-12 text-center">
            لية ممكن تختار
            <span className="text-primary font-extrabold"> ثانوي</span> ؟
          </h1>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4 mb-16 md:mb-28 w-full">
            <div className="card flex flex-col gap-4 md:gap-4 justify-center items-start ps-3 bg-white rounded-2xl shadow-sm w-full md:w-[32%] p-6 md:h-[250px]">
              <img src={i3} alt="icon3" />
              <h2 className="font-bold text-xl md:text-[22px] leading-[150%]">
                نظام تحفيزي
              </h2>
              <p className="text-secondary text-lg md:text-[20px] w-full md:w-[300px]">
                تحليل شامل لنقاط الضعف باستخدام الذكاء الاصطناعي
              </p>
            </div>
            <div className="card flex flex-col gap-4 md:gap-4 justify-center items-start ps-3 bg-white rounded-2xl shadow-sm w-full md:w-[32%] p-6 md:h-[250px]">
              <img src={i2} alt="icon2" />
              <h2 className="font-bold text-xl md:text-[22px] leading-[150%]">
                خطة تعلم شخصية{" "}
              </h2>
              <p className="text-secondary text-lg md:text-[20px] w-full md:w-[300px]">
                أسئلة وتمارين مصممة خصيصاً لتحسين مستواك
              </p>
            </div>
            <div className="card flex flex-col gap-4 md:gap-4 justify-center items-start ps-3 bg-white rounded-2xl shadow-sm w-full md:w-[32%] p-6 md:h-[250px]">
              <img src={i1} alt="icon1" />
              <h2 className="font-bold text-xl md:text-[22px] leading-[150%]">
                نظام تحفيزي
              </h2>
              <p className="text-secondary text-lg md:text-[20px] w-full md:w-[300px]">
                مكافآت ومسابقات لجعل التعلم أكثر متعة
              </p>
            </div>
          </div>
        </div>
        {/* end why you choose us  */}

        {/*start what makes us special  */}
        <div
          className="flex justify-center items-center flex-col px-4 sm:px-8 md:px-16 pb-16"
          dir="rtl"
        >
          <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold mb-8 md:mb-12 text-center">
            ما الذي يجعل
            <span className="text-primary font-extrabold"> ثانوي</span> مميزا؟
          </h2>

          <div className="w-full overflow-x-auto">
            <LandingTable />
          </div>
        </div>
        {/* end what makes us special  */}

        {/* start what our students say */}
        <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold mb-8 md:mb-12 text-center">
          ما يقوله طلاب{" "}
          <span className="text-primary font-extrabold"> ثانوي</span> ؟
        </h2>

        <LandingTestimonial />
        {/*end  what our students say */}

        {/* start  start your journey */}
        <div className="px-0 py-10 bg-[#712BF8] text-center w-full px-4">
          <h3 className="text-white text-[30px] sm:text-[40px] font-extrabold mb-6 leading-[150%]">
            ابدأ رحلتك نحو التفوق الآن
          </h3>

          <p className="text-[20px] sm:text-[24px] lg:w-[800px] m-auto  text-white font-[500] leading-[150%]">
            جرب منصتنا مجانًا واكتشف كيف يمكن للذكاء الاصطناعي أن يساعدك في
            تحسين مستواك الدراسي.
          </p>

          <div className="flex justify-center items-center gap-4 mt-8">
            <GlobalButton type="whiteMoreSpace">
              <p className="text-[18px] font-[500] text-primary">ابدأ تجربتك الان</p>
            </GlobalButton>

            <GlobalButton type="primaryTransparent">
          <p className="text-[18px] font-[500] ">
          تواصل معنا
          </p>
              <img src={arrowLeft} alt="left-arrow" className="w-8"  />
            </GlobalButton>
          </div>
        </div>

        {/* end your journey */}
      </main>
    </div>
  );
}
