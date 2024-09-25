import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop.jsx";

import Preloader from "./components/Preloader.jsx";
import DeliveryDetails from "./pages/DeliveryDetails.jsx";
import { HelmetProvider } from "react-helmet-async";
import CreateAccount from "./pages/CreateAccount.jsx";

import Signin from "./pages/Signin.jsx";
import OfficeLogin from "./pages/OfficeLogin.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import OfficerRegistration from "./pages/OfficerRegistration.jsx";
import BookParcel from "./pages/BookParcel.jsx";
import UpdateStatus from "./pages/UpdateStatus.jsx";
import ViewParcels from "./pages/ViewParcels.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";
import Ofd from "./pages/Ofd.jsx";
import ComplaintForm from "./pages/ComplaintForm.jsx";
import TrackParcel from "./pages/TrackParcel.jsx";
import Feedback from "./pages/Feedback.jsx";
import ComplaintList from "./pages/ComplaintList.jsx";
import ModifyOrder from "./pages/ModifyOrder.jsx";
import Home from "./pages/Home.jsx";
import SafeRoute from "./components/SafeRoute.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import Navigation from "./pages/Navigation.jsx";
import SaveLocation from "./pages/SaveLocation.jsx";
import Services from "./pages/Services.jsx";
import AgentRegister from "./pages/AgentRegister.jsx";
import AgentDashboardPage from "./pages/AgentDashboard.jsx";
import AgentHome from "./pages/AgentHome.jsx";
import ParcelScanForDelivery from "./pages/AgentDashboard.jsx";
import AgentLogin from "./pages/AgentLogin.jsx";
import AgentProtectedRoute from "./components/AgentProtectedRoute.jsx";
import NoPage from "./pages/NoPage.jsx";
import StartDelivering from "./pages/StartDelivering.jsx";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the duration based on your needs

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="*" element={<NoPage />} />

          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/" element={<Home />} />
          <Route path="/officerlogin" element={<OfficeLogin />} />
          <Route path="/officeregister" element={<OfficerRegistration />} />
          <Route path="/trackparcel" element={<TrackParcel />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/getlocation" element={<SaveLocation />} />
          <Route path="/services" element={<Services />} />
          <Route path="/agentlogin" element={<AgentLogin />} />

          <Route element={<SafeRoute />}>
            <Route path="/bookservice" element={<DeliveryDetails />} />
            <Route path="/complaintform" element={<ComplaintForm />} />
            <Route path="/yourorders" element={<OrderDetails />} />
            <Route path="/success" element={<SuccessPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/officedashboard" element={<EmployeeDashboard />} />
            <Route path="/book-parcel" element={<BookParcel />} />
            {/* <Route path="/success" element={<SuccessPage />} /> */}
            <Route path="/update-status" element={<UpdateStatus />} />
            <Route path="/view-parcels" element={<ViewParcels />} />
            <Route path="/ofd" element={<Ofd />} />
            <Route path="/view-complaints" element={<ComplaintList />} />
            <Route path="/modifyorder" element={<ModifyOrder />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/agentregister" element={<AgentRegister />} />
          </Route>
          <Route element={<AgentProtectedRoute />}>
            <Route path="/agentdashboard" element={<AgentHome />} />
            <Route path="/startdelivering" element={<StartDelivering />} />

            <Route
              path="/parcelscanfordelivery"
              element={<ParcelScanForDelivery />}
            />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
