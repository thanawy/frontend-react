import React from "react";
import SubjectsSlider from "../../components/SubjectsSlider/SubjectsSlider";
import Testimonials from "../../components/Testimonials/Testiomonials";
import Accordion from "../../components/Accordion/Accordion";

export default function Home() {
  return (
    <div className="flex w-full gap-4 px-4">
      <div className="flex-1 min-w-0 w-[70%]">
        <SubjectsSlider />
        <Accordion />
      </div>
      <div className="w-[30%] hidden xl:block">
        <Testimonials />
      </div>
    </div>
  );
}
