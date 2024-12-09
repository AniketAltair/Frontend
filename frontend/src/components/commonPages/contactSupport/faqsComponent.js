import {ChevronDown, ChevronUp, ArrowBigRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {faqsData} from "./faqQuestionAnswersComponent";
import { useTranslationContext } from '../../common/translationContext/translationContext';

const FaqsComponent = ({isUserLoggedIn,userRole}) => {

    const { t } = useTranslationContext();

    const [faqs, setFaqs] = useState(faqsData);

      const toggleFaq = (index) => {
        const updatedFaqs = faqs.map((faq, i) =>
          i === index ? { ...faq, open: !faq.open } : faq
        );
        setFaqs(updatedFaqs);
      };

      useEffect(() => {
        if (isUserLoggedIn) {
          let filteredFaqs = faqsData; 
          if (userRole === 2) {
            filteredFaqs = faqsData.filter((faq) => faq.tag === 4);
          } else if (userRole === 3) {
            filteredFaqs = faqsData.filter((faq) => [1, 5, 6].includes(faq.tag));
          } else if (userRole === 4) {
            filteredFaqs = faqsData.filter((faq) => [2, 5, 6].includes(faq.tag));
          } else if (userRole === 5) {
            filteredFaqs = faqsData.filter((faq) => ![1, 2, 4].includes(faq.tag));
          }
          setFaqs(filteredFaqs); 
        }else{
          setFaqs(faqsData);
        }
      }, [isUserLoggedIn]);
      

  return (
    <>
    <h2 className="text-2xl font-bold text-black mt-8 mb-4">{t('faqs')}</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index}>
            {/* Question Card */}
            <div
              className="bg-white shadow-md shadow-black border-2 border-red-500 p-4 rounded-lg flex justify-between items-center cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <h3 className="text-lg font-medium text-black">{faq.question}</h3>
              <span className="text-black">
                {faq.open ? <ChevronUp /> : <ChevronDown />}
              </span>
            </div>

            {/* Answer Card */}
            {faq.open && (
              <div className="mt-2 bg-white shadow-md shadow-black border-2 border-green-500 p-4 rounded-lg">
                <div className="flex justify-center mb-4">
                  <img src={faq.image} alt="FAQ related visual" className="w-48 h-auto rounded-md" />
                </div>
                <div className="text-black">
                  {faq.answer.map((point, idx) => (
                    <div key={idx} className="flex items-center mb-2">
                      <ArrowBigRight className="w-5 h-5 mr-2 flex-shrink-0 text-black fill-red-500 mr-5"/>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      </>
  )
}



export default FaqsComponent;