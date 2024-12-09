import React from 'react';
import { FaLinkedin, FaExternalLinkAlt, FaInstagram, FaFacebook, FaGithub } from "react-icons/fa";
import {Apple} from "lucide-react"; // Example of a check circle icon
import { aboutAppImageLinks } from '../../Links/images/imageLinks';
import { useTranslationContext } from '../../common/translationContext/translationContext';

const AboutTheFounderComponent = () => {

  const { t } = useTranslationContext();

  const points = [
    "John Doe has over a decade of experience.",
    "Passionate about software development and innovation.",
    "Led the company to new heights with a vision for growth."
  ];

  const icons = [
    { icon: FaExternalLinkAlt, title: "Portfolio", href: aboutAppImageLinks.portfolioLink },
    { icon: FaLinkedin, title: "LinkedIn", href: aboutAppImageLinks.portfolioLink },
    { icon: FaGithub, title: "GitHub", href: aboutAppImageLinks.portfolioLink },
    { icon: FaInstagram, title: "Instagram", href: aboutAppImageLinks.portfolioLink },
    { icon: FaFacebook, title: "Facebook", href: aboutAppImageLinks.portfolioLink }
  ];

  const IconComponent = () => {
    return (
      icons.map(({ icon: Icon, title, href }) => (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-gray-900 text-xl"
          title={title}
          key={title}
        >
          <Icon />
        </a>
      ))
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg border-2 border-red-500 rounded-lg md:col-span-2">
      <h3 className="text-lg font-bold text-black mb-4"><u>{t('aboutTheFounder')}</u></h3>
      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Image Section */}
        <img
          src={aboutAppImageLinks.profilePicLink}
          alt="Founder"
          className="w-20 h-20 lg:mb-9 rounded-full border-2 border-black shadow-md"
        />
        {/* Info Section */}
        <div>
          <ul className="list-none list-inside text-gray-700 mb-4">
            {
              points.map((point, index) => (
                <li key={index} className="flex items-center gap-2 mb-1 lg:text-sm sm:text-xs">
                  <Apple className="w-5 h-5 mr-4 text-red-500 fill-red-500 flex-shrink-0" />
                  {point}
                </li>
              ))
            }
          </ul>
          {/* Icons for Links */}
          <div className="flex gap-4 sm: ml-10">
            <IconComponent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutTheFounderComponent;
