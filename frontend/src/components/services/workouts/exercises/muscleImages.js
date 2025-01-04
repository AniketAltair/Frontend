import React from "react";

// Import all muscle images
import UpperChest from "../../../../assets/muscles/chest/UpperChest.png";
import MidChest from "../../../../assets/muscles/chest/MidChest.png";
import LowerChest from "../../../../assets/muscles/chest/LowerChest.png";

import Erectors from "../../../../assets/muscles/back/Erectors.png";
import Lats from "../../../../assets/muscles/back/Lats.png";
import LowerBack from "../../../../assets/muscles/back/LowerBack.png";
import LowerLats from "../../../../assets/muscles/back/LowerLats.png";
import MidBack from "../../../../assets/muscles/back/MidBack.png";
import Rhomboids from "../../../../assets/muscles/back/Rhomboids.png";
import Traps from "../../../../assets/muscles/back/Traps.png";
import UpperBack from "../../../../assets/muscles/back/UpperBack.png";
import UpperLats from "../../../../assets/muscles/back/UpperLats.png";

import UpperAbs from "../../../../assets/muscles/abs/UpperAbs.png";
import LowerAbs from "../../../../assets/muscles/abs/LowerAbs.png";
import Obliques from "../../../../assets/muscles/abs/Obliques.png";

import BicepLongHead from "../../../../assets/muscles/biceps/BicepLongHead.png";
import BicepShortHead from "../../../../assets/muscles/biceps/BicepShortHead.png";
import Brachii from "../../../../assets/muscles/biceps/Brachii.png";

import UpperForearms from "../../../../assets/muscles/forearms/UpperForearms.png";
import LowerForearms from "../../../../assets/muscles/forearms/LowerForearms.png";

import FrontDelt from "../../../../assets/muscles/shoulder/FrontDelt.png";
import SideDelt from "../../../../assets/muscles/shoulder/SideDelt.png";
import RearDelt from "../../../../assets/muscles/shoulder/RearDelt.png";

import TricepLongHead from "../../../../assets/muscles/triceps/TricepLongHead.png";
import TricepLateralHead from "../../../../assets/muscles/triceps/TricepLateralHead.png";
import TricepMedialHead from "../../../../assets/muscles/triceps/TricepMedialHead.png";

import Adductors from "../../../../assets/muscles/legs/Adductors.png";
import Calves from "../../../../assets/muscles/legs/Calves.png";
import Glutes from "../../../../assets/muscles/legs/Glutes.png";
import Hamstrings from "../../../../assets/muscles/legs/Hamstrings.png";
import InnerQuads from "../../../../assets/muscles/legs/InnerQuads.png";
import OuterQuads from "../../../../assets/muscles/legs/OuterQuads.png";
import RectusFemoris from "../../../../assets/muscles/legs/RectusFemoris.png";
import Shin from "../../../../assets/muscles/legs/Shin.png";

const MuscleImages = ({ muscleGroupMap, activeMuscleIndex }) => {
  const muscleNames = [
    { name: "UpperChest", imageComponent: UpperChest },
    { name: "MidChest", imageComponent: MidChest },
    { name: "LowerChest", imageComponent: LowerChest },
    { name: "UpperBack", imageComponent: UpperBack },
    { name: "MidBack", imageComponent: MidBack },
    { name: "LowerBack", imageComponent: LowerBack },
    { name: "Lats", imageComponent: Lats },
    { name: "UpperLats", imageComponent: UpperLats },
    { name: "LowerLats", imageComponent: LowerLats },
    { name: "Rhomboids", imageComponent: Rhomboids },
    { name: "Traps", imageComponent: Traps },
    { name: "Erectors", imageComponent: Erectors },
    { name: "UpperAbs", imageComponent: UpperAbs },
    { name: "LowerAbs", imageComponent: LowerAbs },
    { name: "Obliques", imageComponent: Obliques },
    { name: "BicepLongHead", imageComponent: BicepLongHead },
    { name: "BicepShortHead", imageComponent: BicepShortHead },
    { name: "Brachii", imageComponent: Brachii},
    { name: "UpperForearms", imageComponent: UpperForearms },
    { name: "LowerForearms", imageComponent: LowerForearms },
    { name: "FrontDelt", imageComponent: FrontDelt },
    { name: "SideDelt", imageComponent: SideDelt },
    { name: "RearDelt", imageComponent: RearDelt },
    { name: "TricepLongHead", imageComponent: TricepLongHead },
    { name: "TricepLateralHead", imageComponent: TricepLateralHead },
    { name: "TricepMedialHead", imageComponent: TricepMedialHead },
    { name: "Adductors", imageComponent: Adductors },
    { name: "Calves", imageComponent: Calves },
    { name: "Glutes", imageComponent: Glutes },
    { name: "Hamstrings", imageComponent: Hamstrings },
    { name: "InnerQuads", imageComponent: InnerQuads },
    { name: "OuterQuads", imageComponent: OuterQuads },
    { name: "RectusFemoris", imageComponent: RectusFemoris },
    { name: "Shin", imageComponent: Shin },
  ];

  // Generate image components dynamically
  const muscleImageComponents = muscleNames.reduce((acc, muscle) => {
    acc[muscle.name] = (
      <div className="flex flex-col items-center" key={muscle.name}>
        <img
          src={muscle.imageComponent}
          alt={muscle.name}
          className="rounded-md w-60 h-60 object-cover"
        />
        <div className="mt-2">{muscle.name.replace(/([A-Z])/g, " $1").trim()}</div>
      </div>
    );
    return acc;
  }, {});

  return (
    <div className="ml-14 flex overflow-x-auto gap-1 relative flex-nowrap w-full">
      {Array.from(muscleGroupMap).map(([group, muscles]) => {
        if (muscles.length === 0) return null;
        const activeMuscle = muscles[activeMuscleIndex[group]];

        return (
          <div key={group} className="flex-shrink-0 w-60 w-70 text-black ">
            {muscleImageComponents[activeMuscle] ? (
              muscleImageComponents[activeMuscle]
            ) : (
              <div className="w-full h-full bg-gray-200 flex justify-center items-center">
                Image not available
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MuscleImages;
