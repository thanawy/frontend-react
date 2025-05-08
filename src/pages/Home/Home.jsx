import React from "react";
import SubjectsSlider from "../../components/SubjectsSlider/SubjectsSlider";
import Testimonials from "../../components/Testimonials/Testiomonials";
import Accordion from "../../components/Accordion/Accordion";


export default function Home() {
  return (
    <div className="flex w-full  ">
      <div className="flex-1 min-w-0 w-[70%]">
        <SubjectsSlider />
  <Accordion/>
      </div>
      <div className="w-1/4 hidden xl:block   ">
        <Testimonials />
      </div>
    </div>
  );
}