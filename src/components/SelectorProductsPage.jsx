import React from "react";
import FadeInSection from "../Animations/FadeInSection.jsx"; // استيراد مكون التأثير التدريجي
import { useTranslation } from "react-i18next";

const SelectorsPageProducts = ({ options, onSelect, label }) => {
  const { t } = useTranslation();

  return (
    <FadeInSection delay={0.1}>
      <div className="flex flex-col items-center mb-6">
        <label className="text-lg font-medium text-gray-700 mb-3">{t(label)}</label>
        <div className="flex flex-wrap gap-4 justify-center">
          {options.map((option, index) => (
            <label key={index} className="flex items-center rtl:space-x-reverse space-x-2 gap-x-2 cursor-pointer">
            <input
              type="checkbox"
              value={option}
              onChange={(e) => onSelect(e.target.value)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700 text-base">{t(`product_filters.${option.toLowerCase()}`)}</span>
          </label>
          
          ))}
        </div>
      </div>
    </FadeInSection>
  );
};

export default SelectorsPageProducts
