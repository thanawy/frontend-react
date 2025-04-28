import React from 'react';

import rightSign from "../../assets/images/rightSign.svg";
import wrongSign from "../../assets/images/wrongSign.svg";
const LandingTable = () => {
  const features = [
    { id: 1, name: "تحليل ذكي للأداء" },
    { id: 2, name: "خطة تعلم شخصية" },
    { id: 3, name: "محتوى تفاعلي" },
    { id: 4, name: "نظام تحفيزي" }
  ];

  return (
    <div className="w-full  mx-auto lg:mb-24" >
      <div className="overflow-hidden  rounded-lg">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="font-[600] text-[24px] ">
              <th className="py-4 ">المميزات</th>
              <th className="py-4 px-5  primaryTransparent text-center">ثانوي</th>
              <th className="py-4  text-center">الطرق التقليدية للحل</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr key={feature.id} className="border-t border-[#E5E7EB]">
                <td className="py-4 px-4">{feature.name}</td>
                <td className="py-4 px-4 primaryTransparent text-center">
                  <div className="flex justify-center">
                    <div className="h-6 w-6 rounded-full  flex items-center justify-center">
                        <img src={rightSign} alt="rightSign" className="w-8 h-8" />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex justify-center">
                    <div className="h-6 w-6 rounded-full  flex items-center justify-center">
                   <img src={wrongSign} alt="wrongSign" />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LandingTable;