import { Apple } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslationContext } from '../../common/translationContext/translationContext';

  const AcheivementsComponent = () => {

    const { t } = useTranslationContext();

    const [partnergymsLink, setPartnergymsLink] = useState([]);

    const getAllPartnerGyms = () => {
      // Simulating backend call to get registered gyms on portal.
      const gymPartnerlinks = [
        "https://via.placeholder.com/150?text=Image1",
        "https://via.placeholder.com/150?text=Image2",
        "https://via.placeholder.com/150?text=Image3",
        "https://via.placeholder.com/150?text=Image4",
        "https://via.placeholder.com/150?text=Image5",
        "https://via.placeholder.com/150?text=Image6",
        "https://via.placeholder.com/150?text=Image7",
        "https://via.placeholder.com/150?text=Image8",
        "https://via.placeholder.com/150?text=Image9",
        "https://via.placeholder.com/150?text=Image10"
      ];
      setPartnergymsLink(gymPartnerlinks);
    };

    const points = [
      "Featured in Top 10 Tech Startups 2024.",
      "Served 10,000+ satisfied users."
    ];

    const CustomerImagesComponent = () => {
      return (
        <div
          className="overflow-x-auto flex gap-4 py-4"
          style={{
            scrollbarWidth: "none",  // Firefox
            msOverflowStyle: "none", // IE and Edge
          }}
        >
          {partnergymsLink.map((link, index) => (
            <img
              key={index}
              src={link}
              alt={`Achievement ${index}`}
              className="w-24 h-24 rounded-full object-cover"
            />
          ))}
        </div>

      );
    };
    
    

    useEffect(() => {
      getAllPartnerGyms();
    }, []);

    return (
      <div className="p-6 bg-white shadow-lg border-2 border-red-500 rounded-lg">
        <h3 className="text-lg font-bold text-black mb-2"><u>{t('ourAcheivements')}</u></h3>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          {
            points.map((point, index) => (
              <li key={index} className="flex items-center gap-2 mb-1 lg:text-sm sm:text-xs">
                <Apple className="w-5 h-5 mr-4 text-red-500 fill-red-500 flex-shrink-0" />
                {point}
              </li>
            ))
          }
        </ul>
        {/* Horizontal Scrollable Images */}
        <CustomerImagesComponent />
      </div>
    );
  }

  export default AcheivementsComponent;
