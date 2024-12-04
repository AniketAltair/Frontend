import { 
  Settings, 
  HelpCircle, 
  UserRoundPen, 
  Users,  
  BarChart, 
  Mail,
  Bell, 
  Crown, 
  UserRoundSearch,
  Dumbbell,
  HeartHandshake,
  Ham,
  Warehouse,
  Info,
  QrCode,
  CookingPot,
  BicepsFlexed,
  Calendar1,
  ChartNoAxesCombined,
  Bot } from "lucide-react";

export const VisitorMenus = [
  {
    name: "About App",
    subMenu: [
      {
        name: "About App",
        desc: "Know more about the App.",
        icon: UserRoundPen,
        componentPath: "/aboutapp"
      },
    ],
    gridCols: 1,
  },
  {
    name: "Contact Support",
    subMenu: [
      {
        name: "Contact Support",
        desc: "Need some help?",
        icon: HelpCircle,
        componentPath: "/contactsupport"
      },
    ],
    gridCols: 1,
  }
];

export const AdminMenus = [
  {
    name: "Profile",
    subMenu: [
      {
        name: "About Me",
        desc: "My personal info",
        icon: UserRoundPen,
        componentPath: "/profile"
      },
    ],
    gridCols: 1,
  },
  {
    name: "Dashboard",
    subMenu: [
      {
        name: "Dashboard",
        desc: "My personal stats",
        icon: BarChart,
        componentPath: "/admindashboard"
      }
    ],
    gridCols: 1,
  },
  {
    name: "User panel",
    subMenu: [
      {
        name: "User Panel",
        desc: "Control Users",
        icon: Users,
        componentPath: "/userpanel"
      }
    ],
    gridCols: 1,
  },
  {
    name: "Gym panel",
    subMenu: [
      {
        name: "Inspector Panel",
        desc: "Control Inspectors",
        icon: UserRoundSearch,
        componentPath: "/inspectorpanel"
      },
      {
        name: "Gym Panel",
        desc: "Control Gyms",
        icon: Dumbbell,
        componentPath: "/gympanel"
      },
      {
        name: "Trainer Panel",
        desc: "Control Trainers",
        icon: HeartHandshake,
        componentPath: "/trainerpanel"
      }
    ],
    gridCols: 1,
  },
  {
    name: "Inventory",
    subMenu: [
      {
        name: "Food Inventory",
        desc: "Control Food Items",
        icon: Ham,
        componentPath: "/foodinventory"
      },
      {
        name: "Gym Inventory",
        desc: "Control Gym Equipments",
        icon: Warehouse,
        componentPath: "/gyminventory"
      }
    ],
    gridCols: 1,
  },
  {
    name: "Notifications",
    subMenu: [
      {
        name: "Notifications",
        desc: "Send Notifications to users",
        icon: Bell,
        componentPath: "/notifications"
      }
    ],
    gridCols: 1,
  },
  {
    name: "Plans",
    subMenu: [
      {
        name: "Plans",
        desc: "View Subscription Plans",
        icon: Crown,
        componentPath: "/plans"
      }
    ],
    gridCols: 1,
  },
  {
    name: "More...",
    subMenu: [
      {
        name: "Messages",
        desc: "View your messages",
        icon: Mail,
        componentPath: "/messages"
      },
      {
        name: "Contact Support",
        desc: "Ask any query you have",
        icon: HelpCircle,
        componentPath: "/contactsupport"
      },
      {
        name: "About App",
        desc: "What exactly is this Application?",
        icon: Info,
        componentPath: "/aboutapp"
      },
      {
        name: "Settings",
        desc: "Set personal preferences",
        icon: Settings,
        componentPath: "/settings"
      }
    ],
    gridCols: 2,
  }
];

export const InspectorMenus = [
  {
    name: "Profile",
    subMenu: [
      {
        name: "About Me",
        desc: "My personal info",
        icon: UserRoundPen,
        componentPath: "/profile"
      },
    ],
    gridCols: 1,
  },
  {
    name: "Gyms",
    subMenu: [
      {
        name: "Gym Approvals",
        desc: "Inspect gyms and provide approval",
        icon: Dumbbell,
        componentPath: "/inspectgyms"
      }
    ],
    gridCols: 1,
  },
  {
    name: "More...",
    subMenu: [
      {
        name: "Messages",
        desc: "View your messages",
        icon: Mail,
        componentPath: "/messages"
      },
      {
        name: "Contact Support",
        desc: "Ask any query you have",
        icon: HelpCircle,
        componentPath: "/contactsupport"
      },
      {
        name: "About App",
        desc: "What exactly is this Application?",
        icon: Info,
        componentPath: "/aboutapp"
      },
      {
        name: "Settings",
        desc: "Set personal preferences",
        icon: Settings,
        componentPath: "/settings"
      }
    ],
    gridCols: 2,
  }
];

export const GymMenus = [
  {
    name: "Profile",
    subMenu: [
      {
        name: "About Me",
        desc: "My personal info",
        icon: UserRoundPen,
        componentPath: "/profile"
      },
    ],
    gridCols: 1,
  },
  {
    name: "DashBoard",
    subMenu: [
      {
        name: "Check Gym Stats",
        desc: "My personal stats",
        icon: BarChart,
        componentPath: "/gymdashboard"
      }
    ],
    gridCols: 1,
  },
  {
    name: "My Assets",
    subMenu: [
      {
        name: "Trainers",
        desc: "View All trainers in my gym",
        icon: HeartHandshake,
        componentPath: "/trainers"
      },
      {
        name: "Equipments",
        desc: "View All equipments in my gym",
        icon: Dumbbell,
        componentPath: "/equipments"
      }
    ],
    gridCols: 1,
  },
  {
    name: "My Code",
    subMenu: [
      {
        name: "My Code",
        desc: "Show Code for Verification",
        icon: QrCode,
        componentPath: "/mycode"
      }
    ],
    gridCols: 1,
  },
  {
    name: "More...",
    subMenu: [
      {
        name: "Messages",
        desc: "View your messages",
        icon: Mail,
        componentPath: "/messages"
      },
      {
        name: "Contact Support",
        desc: "Ask any query you have",
        icon: HelpCircle,
        componentPath: "/contactsupport"
      },
      {
        name: "About App",
        desc: "What exactly is this Application?",
        icon: Info,
        componentPath: "/aboutapp"
      },
      {
        name: "Settings",
        desc: "Set personal preferences",
        icon: Settings,
        componentPath: "/settings"
      }
    ],
    gridCols: 2,
  }
];

export const TrainerMenus = [
  {
    name: "Profile",
    subMenu: [
      {
        name: "About Me",
        desc: "My personal info",
        icon: UserRoundPen,
        componentPath: "/profile"
      },
    ],
    gridCols: 1,
  },
  {
    name: "DashBoard",
    subMenu: [
      {
        name: "Check My Stats",
        desc: "My personal stats",
        icon: BarChart,
        componentPath: "/trainerdashboard"
      }
    ],
    gridCols: 1,
  },
  {
    name: "Gyms",
    subMenu: [
      {
        name: "All gyms",
        desc: "Search gyms you belong to",
        icon: Dumbbell,
        componentPath: "/allgyms"
      }
    ],
    gridCols: 1,
  },
  {
    name: "More...",
    subMenu: [
      {
        name: "Messages",
        desc: "View your messages",
        icon: Mail,
        componentPath: "/messages"
      },
      {
        name: "Contact Support",
        desc: "Ask any query you have",
        icon: HelpCircle,
        componentPath: "/contactsupport"
      },
      {
        name: "About App",
        desc: "What exactly is this Application?",
        icon: Info,
        componentPath: "/aboutapp"
      },
      {
        name: "Settings",
        desc: "Set personal preferences",
        icon: Settings,
        componentPath: "/settings"
      }
    ],
    gridCols: 2,
  }
];

export const CustomerMenus = [
  {
    name: "Profile",
    subMenu: [
      {
        name: "About Me",
        desc: "My personal info",
        icon: UserRoundPen,
        componentPath: "/profile"
      },
    ],
    gridCols: 1,
  },
  {
    name: "DashBoard",
    subMenu: [
      {
        name: "Check My Stats",
        desc: "My personal stats",
        icon: BarChart,
        componentPath: "/customerdashboard"
      }
    ],
    gridCols: 1,
  },
  {
    name: "Services",
    subMenu: [
      {
        name: "Diet",
        desc: "Diet and bundle customizations",
        icon: CookingPot,
        componentPath: "/diet"
      },
      {
        name: "Workouts",
        desc: "Workout and bundle customizations",
        icon: BicepsFlexed,
        componentPath: "/workouts"
      },
      {
        name: "Planner",
        desc: "Set a customized plan for diet and workouts",
        icon: Calendar1,
        componentPath: "/planner"
      },
      {
        name: "Recommendations",
        desc: "Need some tips regarding your diet and workouts?",
        icon: ChartNoAxesCombined,
        componentPath: "/recommendations"
      },
      {
        name: "Find Gyms",
        desc: "Search nearby gym partners",
        icon: Dumbbell,
        componentPath: "/findgyms"
      }
    ],
    gridCols: 2,
  },
  {
    name: "Assistant",
    subMenu: [
      {
        name: "AI Assistant",
        desc: "Want any help?",
        icon: Bot,
        componentPath: "/assistant"
      }
    ],
    gridCols: 1,
  },
  {
    name: "Premium",
    subMenu: [
      {
        name: "Premium Plans",
        desc: "Checkout subscription plans for premium features",
        icon: Crown,
        componentPath: "/premium"
      }
    ],
    gridCols: 1,
  },
  {
    name: "More...",
    subMenu: [
      {
        name: "Messages",
        desc: "View your messages",
        icon: Mail,
        componentPath: "/messages"
      },
      {
        name: "Contact Support",
        desc: "Ask any query you have",
        icon: HelpCircle,
        componentPath: "/contactsupport"
      },
      {
        name: "About App",
        desc: "What exactly is this Application?",
        icon: Info,
        componentPath: "/aboutapp"
      },
      {
        name: "Settings",
        desc: "Set personal preferences",
        icon: Settings,
        componentPath: "/settings"
      }
    ],
    gridCols: 2,
  }
];
