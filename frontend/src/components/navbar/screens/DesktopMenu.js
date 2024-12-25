import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setIsAssistantVisible } from "../../common/redux/slice/assistantSlice"

export default function DesktopMenu({ menu, onTouchStart, activeMenu }) {

  const [isHover, toggleHover] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isAssistantVisible} = useSelector((state)=>(state.assistant));

  const toggleHoverMenu = () => {
    toggleHover(!isHover);
  };

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.5,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  const hasSubMenu = menu?.subMenu?.length;

  // Check if the current menu is active (for touch events)
  const isActive = activeMenu === menu.name;

  const handleNavigation = (event,componentPath,name) => {
    console.log("name : "+name);
    if(name==="AI Assistant"){
      dispatch(setIsAssistantVisible({"isAssistantVisible":!isAssistantVisible}));
      return;
    }
    event.preventDefault();
    console.log("path :"+componentPath);
    navigate(componentPath);
  }

  return (
    <motion.li
      className="group/link"
      onMouseEnter={() => toggleHoverMenu()}
      onMouseLeave={() => toggleHoverMenu()}
      onTouchStart={() => onTouchStart(menu.name)} // Handle touch events
      key={menu.name}
    >
      <span className="font-cursive flex-center gap-1 hover:bg-white/5 cursor-pointer px-3 py-1 rounded-xl">
        {menu.name}
        {hasSubMenu && (
          <ChevronDown className="mt-[0.6px] group-hover/link:rotate-180 text-gray-300 duration-200" />
        )}
      </span>
      {hasSubMenu && (
        <motion.div
          className="sub-menu bg-white"
          initial="exit"
          animate={isHover || (activeMenu===menu.name) ? "enter" : "exit"} // Toggle based on hover or active menu
          variants={subMenuAnimate}
        >
          <div
            className={`grid gap-7 ${
              menu.gridCols === 3
                ? "grid-cols-3"
                : menu.gridCols === 2
                ? "grid-cols-2"
                : "grid-cols-1"
            }`}
          >
            {menu.subMenu.map((submenu, i) => (
              <div
                className="relative cursor-pointer transform transition-transform duration-300 hover:scale-130" 
                key={i}
                onClick={(event)=>handleNavigation(event,submenu.componentPath,submenu.name)}
              >
                <div className="flex-center gap-x-4 group/menubox">
                  <div className="bg-white/5 w-fit p-2 rounded-md group-hover/menubox:bg-white text-red-500 duration-300">
                    {submenu.icon && <submenu.icon className="text-red-500" />}
                  </div>
                  <div>
                    <h6 className="font-cursive text-black">
                      {submenu.name}
                    </h6>
                    <p className="font-cursive text-xs text-gray-500">{submenu.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.li>
  );
}
