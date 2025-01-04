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
import TransactionHistoryComponent from "./components/admin/transactionHistory";
import TransactionHistoryComponentPremium from "./components/services/premium/transactionHistory";
import PaymentComponent from "./components/services/premium/paymentComponent";
import { TranslationProvider } from './components/common/translationContext/translationContext';
import { GoogleOAuthProvider } from "@react-oauth/google";
import {Provider} from "react-redux";
import {LoadScript} from "@react-google-maps/api"

import Role from "./components/auth/role";
import store from "./components/common/redux/store";
import RecommendationSolution from "./components/services/recommendations/recommendationSolution";
import GymDetails from "./components/services/findGyms/gym/gymDetails";
import Trainers from "./components/services/findGyms/trainer/trainers";
import TrainerDetails from "./components/services/findGyms/trainer/trainerDetails";

export default function App() {

  const CLIENT_ID = "807754317749-0dipdsikvecv8v44j0sp6mdh5gje1cie.apps.googleusercontent.com";

  return (
    <>
    <Provider store={store}>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <TranslationProvider>
    <LoadScript googleMapsApiKey="AIzaSyB3VRFgELNm7pRLDijBBR-iQp7SiFSqMT0">

    <Navbar/>
    <Assistant/>
    
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
      <Route path="/plans/transactionhistory" element={<TransactionHistoryComponent/>}/>
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
      <Route path="/recommendations/recommendationsolution" element={<RecommendationSolution/>}/>


      <Route path="/findgyms" element={<FindGyms/>}/>
      <Route path="/findgyms/gymdetails" element={<GymDetails/>}/>
      <Route path="/findgyms/trainers" element={<Trainers/>}/>
      <Route path="/findgyms/trainerdetails" element={<TrainerDetails/>}/>


      <Route path="/premium" element={<Premium/>}/>
      <Route path="/premium/transactionhistory" element={<TransactionHistoryComponentPremium/>}/>
      <Route path="/premium/buynow" element={<PaymentComponent/>}/>
      
    </Routes>

    </LoadScript>
    </TranslationProvider>
    </GoogleOAuthProvider>
    </Provider>
    </>
  );
}