import React, { useEffect } from "react";
import { motion } from "framer-motion";
import VideoplayerComponent from "./videoplayerComponent";
import WhoAreWeComponent from "./whoAreWeComponent";
import WhoAreYouComponent from "./whoAreYouComponent";
import ObjectivesComponent from "./objectivesComponent";
import AcheivementsComponent from "./acheivementsComponent";
import AboutTheFounderComponent from "./aboutTheFounderComponent";

const AboutApp = () => {

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[]);
  
  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 50 }}
      className="p-6 font-cursive"
    >
      {/* Video Player Section */}
      <VideoplayerComponent/>
      {/* Card Section Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Who are we? */}
        <WhoAreWeComponent/>
        {/* Who are you? */}
        <WhoAreYouComponent/>
        {/* What are we trying to achieve? */}
        <ObjectivesComponent/>
        {/* Our Achievements */}
        <AcheivementsComponent/>
        {/* About the Founder */}
        <AboutTheFounderComponent/>
      </div>
    </motion.div>
  );
};

export default AboutApp;
