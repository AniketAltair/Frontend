import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsAssistantVisible } from "../../common/redux/slice/assistantSlice"

export default function MobMenu({ Menus }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(null);
  const dispatch = useDispatch();
  const {isAssistantVisible} = useSelector((state)=>(state.assistant));

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setClicked(null);
  };

  const subMenuDrawer = {
    enter: {
      height: "auto",
      overflow: "hidden",
    },
    exit: {
      height: 0,
      overflow: "hidden",
    },
  };

  const animationZoom = (text) => {
    return (
      <motion.span
        animate={{
          scale: [1, 1.1, 1], // Scale effect for expanding and contracting text
        }}
        transition={{
          duration: 1, // Duration of the scaling
          repeat: Infinity, // Infinite repeat
          ease: "easeInOut", // Smooth scaling
        }}
        className="text-black"
      >
        {text}
      </motion.span>
    );
  };

  const handleNavigation = (event, componentPath, name) => {
    console.log("name : "+name);
    if(name==="AI Assistant"){
      dispatch(setIsAssistantVisible({"isAssistantVisible":!isAssistantVisible}));
      setIsOpen(false);
      setClicked(null); 
      return;
    }
    event.preventDefault();
    navigate(componentPath);
    setIsOpen(false); 
    setClicked(null);
  };

  return (
    <div>
      <button className="lg:hidden z-[999] relative" onClick={toggleDrawer}>
        {isOpen ? <X /> : <Menu />}
      </button>

      <motion.div
        className="font-cursive fixed left-0 right-0 top-16 overflow-y-auto h-full backdrop-blur-lg bg-black bg-opacity-50 text-white p-6 pb-20 z-[999]"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
      >
        <ul>
          {Menus.map(({ name, subMenu }, i) => {
            const isClicked = clicked === i;
            const hasSubMenu = subMenu?.length;

            return (
              <li key={name} className="relative mb-4 z-[999]">
                <span
                  className={`flex-center-between p-4 rounded-md cursor-pointer relative bg-white text-black border-2 border-red-600 shadow-xl`}
                  onClick={() => setClicked(isClicked ? null : i)}
                >
                  {animationZoom(name)}
                  {hasSubMenu && (
                    <ChevronDown
                      className={`ml-auto transition-transform ${
                        isClicked && "rotate-180"
                      }`}
                    />
                  )}
                </span>

                {hasSubMenu && (
                  <motion.ul
                    initial="exit"
                    animate={isClicked ? "enter" : "exit"}
                    variants={subMenuDrawer}
                    className="ml-0 pl-0"
                  >
                    {subMenu.map(({ name, icon: Icon, componentPath }) => (
                      <li
                        key={name}
                        className={`p-2 flex-center gap-x-2 cursor-pointer rounded-md bg-white text-black border-2 border-red-600 mt-1 z-[999]`}
                        onClick={(event) => handleNavigation(event, componentPath, name)}
                      >
                        <Icon size={17} className={`text-red-500`} />
                        {name}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}
