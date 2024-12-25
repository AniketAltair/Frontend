import DesktopMenu from "./screens/DesktopMenu";
import MobMenu from "./screens/MobMenu";
import { 
  VisitorMenus,
  AdminMenus,
  InspectorMenus,
  GymMenus,
  TrainerMenus,
  CustomerMenus } from "./utils/navbarMenuItems";
import Logo from "../../assets/navbar/Logo.png"
import { useEffect, useState } from "react";
import NotificationBell from "../common/items/notificationBell";
import AuthButton from "../common/buttons/authButton";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  const { t } = useTranslation();
  const [menu, setMenu] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null); // Track active menu for touch events
  const [hasNotification, setHasNotification] = useState(false);
  const [isUserLoggedIn,setIsUserLoggedIn] = useState(false);
  const [notificationsMessages,setNotificationsMessages] = useState([]);
  const [notificationSeen, setNotificationSeen] = useState(false);


  // User roles:
  // Admin - 1
  // Inpector - 2
  // Gym - 3
  // Trainer - 4
  // Customer - 5

  const getUserLoggedInStatus = () => {
    // write logic to get user logged in status
    return true;
  }

  const getUserRole = () => {
    // write logic to get user role
    return 5;
  }

  const getNotifications = () => {
    // write logic to see if there are any in app notifications
    return false;
  }

  const setMenuType = (loggedInStatus, role) => {
    if (loggedInStatus == false) {
      setMenu(VisitorMenus);
    } else {
      if (role == 1) {
        setMenu(AdminMenus);
      } else if (role == 2) {
        setMenu(InspectorMenus);
      } else if (role == 3) {
        setMenu(GymMenus);
      } else if (role == 4) {
        setMenu(TrainerMenus);
      } else if (role == 5) {
        setMenu(CustomerMenus);
      }
    }
  }

  const handleTouchStart = (menuName) => {
    if (activeMenu === menuName) {
      setActiveMenu(null); // Close the menu if it's already open
    } else {
      setActiveMenu(menuName); // Open the new menu
    }
  };

  setTimeout(()=>{
    setHasNotification(true);
    // when implementing websocket
    // this entire thing inside settimout shift it to function which will have websocket receiver
    // the websocket will send new messages, we take them and set it to setNotificationsMessages. (only set titles of messages)
    // when new message comes, again make setHasNotification. 
    // when messages read, meaning bell icon pressed,all messages here are erased.
    // also when user logs in the application,  make sure to fetch the user messages which are unread.
    const newNotificationMessages = ["Hello there 1","Hello there 2","Hello there 3","Hello there 4","Hello there 5"];
    setNotificationsMessages(newNotificationMessages);
    // when user logs, in set the new notifications
  },1000)

  useEffect(() => {
    const loggedInStatus = getUserLoggedInStatus();
    setIsUserLoggedIn(loggedInStatus);
    const role = getUserRole();
    const notifications = getNotifications();
    setHasNotification(notifications);

    if (loggedInStatus != null && role != null) {
      setMenuType(loggedInStatus, role);
    } else {
      setMenuType(false, 0);
    }
  }, [])


  return (
    <div className="mb-16">
      <header className="h-16 text-[15px] fixed inset-0 flex-center bg-red-800 mb-16 z-[999]">
        <nav className="px-3.5 flex items-center justify-between w-full max-w-8xl mx-auto z-[999]">
          <div className="flex items-center gap-x-3 z-[999]">
            <div className="relative w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
              <img src={Logo} alt="Logo" className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold">{t('macroMinder')}</h3>
          </div>

          <ul className="gap-x-1 lg:flex-center hidden">
            {menu && menu.map((menu) => (
              <DesktopMenu 
                menu={menu} 
                key={menu.name} 
                onTouchStart={handleTouchStart} // Pass touch logic to DesktopMenu
                activeMenu={activeMenu} // Pass activeMenu to control state
              />
            ))}
          </ul>

          <div className="flex items-center gap-x-3 z-[999]">
            {isUserLoggedIn && 
              <NotificationBell 
                hasNotification={hasNotification}
                notificationSeen={notificationSeen}
                setNotificationSeen={setNotificationSeen}
              />
            }
            
            {isUserLoggedIn && 
              <AuthButton text={t('logOut')}/>
            }
            {!isUserLoggedIn && 
              <AuthButton text={t('signIn')}/>
            }
            <div className="lg:hidden z-[999]">
              {menu && <MobMenu Menus={menu} />}
            </div>
          </div>
        </nav>
      </header>
      
      {!notificationSeen && notificationsMessages.length > 0 && (
        <div className="font-cursive absolute top-16 right-0 w-1/2 sm:w-1/4 bg-white shadow-md z-[100] rounded-md">
          {notificationsMessages.slice(0, 3).map((item, index) => (
            <div 
              key={index} 
              className="border-2 border-red-500 p-2 m-1 text-black rounded-md"
              onClick={()=>{
                navigate("/messages");
                setNotificationSeen(true);
                }}
              >{item}</div>
          ))}
          
          {notificationsMessages.length > 3 && (
            <div 
              className="ml-3 text-sky-400 cursor-pointer text-[12px]"
              onClick={()=>{
                navigate("/messages");
                setNotificationSeen(true);
                }}>
              More...
            </div>
          )}
        </div>
      )}



    </div>
  );
}

export default Navbar;
