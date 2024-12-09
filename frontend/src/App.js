import { Route, Routes } from "react-router-dom";
import "./i18n/i18n"; 

import Navbar from "./components/navbar/navbar";
import AboutApp from "./components/commonPages/aboutApp/aboutApp";
import ContactSupport from "./components/commonPages/contactSupport/contactSupport";
import Settings from "./components/commonPages/settings/settings";
import Messages from "./components/commonPages/messages/messages";
import SignIn from "./components/auth/signin";
import SignUp from "./components/auth/signup";
import ForgotPassword from "./components/auth/forgotpassword";
import GymPanel from "./components/admin/gymPanel/gymPanel";
import InspectorPanel from "./components/admin/gymPanel/inspectorPanel";
import TrainerPanel from "./components/admin/gymPanel/trainerPanel";
import FoodInventory from "./components/admin/inventory/foodInventory";
import GymInventory from "./components/admin/inventory/gymInventory";
import AdminDashboard from "./components/admin/adminDashboard";
import Notifications from "./components/admin/notifications";
import Plans from "./components/admin/plans";
import UserPanel from "./components/admin/userPanel";
import InspectGyms from "./components/inspector/inspectGyms";
import Equipments from "./components/gym/equipments";
import GymDashBoard from "./components/gym/gymDashboard";
import MyCode from "./components/gym/myCode";
import Trainers from "./components/gym/trainers";
import AllGyms from "./components/trainer/allGyms";
import TrainerDashBoard from "./components/trainer/trainerDashboard";
import CustomerDashBoard from "./components/customer/customerDashboard";
import Diet from "./components/services/diet/diet";
import Workouts from "./components/services/workouts/workouts";
import Planner from "./components/services/planner/planner";
import Recommendations from "./components/services/recommendations/recommendations";
import FindGyms from "./components/services/findGyms/findgyms";
import Assistant from "./components/services/assistant/assistant";
import Premium from "./components/services/premium/premium";
import Profile from "./components/commonPages/profile/profile";
import { TranslationProvider } from './components/common/translationContext/translationContext';
import { GoogleOAuthProvider } from "@react-oauth/google";
import Role from "./components/auth/role";

export default function App() {

  const CLIENT_ID = "807754317749-0dipdsikvecv8v44j0sp6mdh5gje1cie.apps.googleusercontent.com";

  return (
    <>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <TranslationProvider>
    <Navbar/>
    <Routes>
      
      {/* Default Path */}
      <Route path="/" element={<AboutApp/>}/>

      {/* Auth Paths */}
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/forgotpassword" element={<ForgotPassword/>}/>
      <Route path="/signup/role" element={<Role/>}/>

      {/* Common pages path*/}
      <Route path="/aboutapp" element={<AboutApp/>}/>
      <Route path="/contactsupport" element={<ContactSupport/>}/>
      <Route path="/settings" element={<Settings/>}/>
      <Route path="/messages" element={<Messages/>}/>
      <Route path="/profile" element={<Profile/>}/>

      {/* Admin Paths */}
      <Route path="/gympanel" element={<GymPanel/>}/>
      <Route path="/inspectorpanel" element={<InspectorPanel/>}/>
      <Route path="/trainerpanel" element={<TrainerPanel/>}/>
      <Route path="/foodinventory" element={<FoodInventory/>}/>
      <Route path="/gyminventory" element={<GymInventory/>}/>
      <Route path="/admindashboard" element={<AdminDashboard/>}/>
      <Route path="/notifications" element={<Notifications/>}/>
      <Route path="/plans" element={<Plans/>}/>
      <Route path="/userpanel" element={<UserPanel/>}/>

      {/* Inpector Paths */}
      <Route path="/inspectgyms" element={<InspectGyms/>}/>

      {/* Gym Paths */}
      <Route path="/equipments" element={<Equipments/>}/>
      <Route path="/gymdashboard" element={<GymDashBoard/>}/>
      <Route path="/mycode" element={<MyCode/>}/>
      <Route path="/trainers" element={<Trainers/>}/>

      {/* Trainer Paths */}
      <Route path="/allgyms" element={<AllGyms/>}/>
      <Route path="/trainerdashboard" element={<TrainerDashBoard/>}/>

      {/* Customer Paths */}
      <Route path="/customerdashboard" element={<CustomerDashBoard/>}/>

      {/* Services Paths */}
      <Route path="/diet" element={<Diet/>}/>
      <Route path="/workouts" element={<Workouts/>}/>
      <Route path="/planner" element={<Planner/>}/>
      <Route path="/recommendations" element={<Recommendations/>}/>
      <Route path="/findgyms" element={<FindGyms/>}/>
      <Route path="/assistant" element={<Assistant/>}/>
      <Route path="/premium" element={<Premium/>}/>
      
    </Routes>
    </TranslationProvider>
    </GoogleOAuthProvider>
    </>
  );
}