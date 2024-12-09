import { Apple } from 'lucide-react';
import React from 'react'
import { useTranslationContext } from '../../common/translationContext/translationContext';

const WhoAreWeComponent = () => {

  const { t } = useTranslationContext();

  const points = [
    "A team of passionate developers.",
    "Dedicated to creating innovative solutions.",
    "Focused on making technology accessible to everyone."
  ];


  return (
        <div className="p-6 bg-white shadow-lg border-2 border-red-500 rounded-lg">
          <h3 className="text-lg font-bold text-black mb-2"><u>{t('whoAreWe')}</u></h3>
          <ul className="list-disc list-inside text-gray-700">
            {points.map((point,index)=>(
              <li key={index} className="flex items-center gap-2 mb-1 lg:text-sm sm:text-xs">
                <Apple className="w-5 h-5 mr-4 text-red-500 fill-red-500 flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
  )
}

export default WhoAreWeComponent