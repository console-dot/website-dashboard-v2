import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import { LandingPage } from "./components/Landing/LandingPage";
import { selectIsLoggedIn } from "./redux";
import LandingPageEdit from "./components/Landing/LandingPageEdit";
import { OffshoringPage } from "./components/Offshoring/OffshoringPage";
import OffshoringPageEdit from "./components/Offshoring/OffshoringPageEdit";
import { CustomServicePage } from "./components/CustomService/CustomServicePage";
import CustomServicePageEdit from "./components/CustomService/CustomServicePageEdit";
import { ProductResearchPage } from "./components/ProductResearch/ProductResearchPage";
import ProductResearchPageEdit from "./components/ProductResearch/ProductResearchPageEdit";
import { WebDevelopmentPage } from "./components/WebDevelopment/WebDevelopmentPage";
import WebDevelopmentPageEdit from "./components/WebDevelopment/WebDevelopmentPageEdit";
import { FaqPage } from "./components/Faq/FaqPage";
import { MobileAppPage } from "./components/MobileAppDev/MobileAppPage";
import MobileAppPageEdit from "./components/MobileAppDev/MobileAppPageEdit";
import { BlockChainPage } from "./components/BlockChain/BlockChainPage";
import BlockChainPageEdit from "./components/BlockChain/BlockChainPageEdit";
import { AiPage } from "./components/AI/AiPage";
import AiPageEdit from "./components/AI/AiPageEdit";
import { ArVrPage } from "./components/ArVr/ArVrPage";
import ArVrPageEdit from "./components/ArVr/ArVrPageEdit";
import { UiUxPage } from "./components/UiUx/UiUxPage";
import UiUxPageEdit from "./components/UiUx/UiUxPageEdit";
import { OpenPositionsPage } from "./components/OpenPositions/OpenPositionsPage";
import { CaseStudiesPage } from "./components/CaseStudies/CaseStudiesPage";
import CaseStudiesPageEdit from "./components/CaseStudies/CaseStudiesPageEdit";
import CaseStudiesPageAdd from "./components/CaseStudies/CaseStudiesPageAdd";
import { ContactPage } from "./components";
import ScrollToTop from "./pages/ScrollToTop";
import { ToastContainer, toast } from "react-toastify";
import { BlogsPage } from "./components/Blogs/BlogsPage";
import BlogsPageAdd from "./components/Blogs/BlogsPageAdd";
import BlogsPageEdit from "./components/Blogs/BlogsPageEdit";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const checkLogin = useSelector(selectIsLoggedIn);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("@dashboard-token") === null) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }, [loggedIn]);
  return (
    <BrowserRouter>
      <ScrollToTop />
      {loggedIn ? (
        <div style={{ backgroundColor: "white", padding: "0" }}>
          <Navbar>
            <Routes>
              {/* <Route path="/" element={<Dashboard />} /> */}
              <Route
                path="/landingPage"
                element={
                  <LandingPage setIsValid={setIsValid} isValid={isValid} />
                }
              />
              <Route
                path="/LandingPage/edit/:id"
                element={<LandingPageEdit />}
              />
              <Route
                path="/offShoring"
                element={
                  <OffshoringPage setIsValid={setIsValid} isValid={isValid} />
                }
              />
              <Route
                path="/OffshoringPage/edit/:id"
                element={<OffshoringPageEdit />}
              />
              <Route
                path="/customSoftware"
                element={
                  <CustomServicePage
                    setIsValid={setIsValid}
                    isValid={isValid}
                  />
                }
              />
              <Route
                path="/CustomSoftwarePageEdit/edit/:id"
                element={<CustomServicePageEdit />}
              />
              <Route
                path="/productResearch"
                element={
                  <ProductResearchPage
                    setIsValid={setIsValid}
                    isValid={isValid}
                  />
                }
              />
              <Route
                path="/ProductResearchPageEdit/edit/:id"
                element={<ProductResearchPageEdit />}
              />
              <Route
                path="/webDevelopment"
                element={
                  <WebDevelopmentPage
                    setIsValid={setIsValid}
                    isValid={isValid}
                  />
                }
              />
              <Route
                path="/WebDevelopmentPageEdit/edit/:id"
                element={<WebDevelopmentPageEdit />}
              />
              <Route
                path="/mobileApp"
                element={
                  <MobileAppPage setIsValid={setIsValid} isValid={isValid} />
                }
              />
              <Route
                path="/MobileAppPageEdit/edit/:id"
                element={<MobileAppPageEdit />}
              />
              <Route
                path="/blockchain"
                element={
                  <BlockChainPage setIsValid={setIsValid} isValid={isValid} />
                }
              />
              <Route
                path="/BlockChainPageEdit/edit/:id"
                element={<BlockChainPageEdit />}
              />
              <Route
                path="/ai"
                element={<AiPage setIsValid={setIsValid} isValid={isValid} />}
              />
              <Route path="/AiPageEdit/edit/:id" element={<AiPageEdit />} />
              <Route
                path="/arvr"
                element={<ArVrPage setIsValid={setIsValid} isValid={isValid} />}
              />
              <Route path="/ArVrPageEdit/edit/:id" element={<ArVrPageEdit />} />
              <Route
                path="/uiux"
                element={<UiUxPage setIsValid={setIsValid} isValid={isValid} />}
              />
              <Route path="/UiUxPageEdit/edit/:id" element={<UiUxPageEdit />} />
              <Route
                path="/faq"
                element={<FaqPage setIsValid={setIsValid} isValid={isValid} />}
              />
              <Route
                path="/casestudies"
                element={
                  <CaseStudiesPage setIsValid={setIsValid} isValid={isValid} />
                }
              />
              <Route
                path="/case-studies-new"
                element={<CaseStudiesPageAdd />}
              />
              <Route
                path="/casestudiesEdit/edit/:id"
                element={<CaseStudiesPageEdit />}
              />
              <Route
                key="blogs"
                path="/blogs"
                element={
                  <BlogsPage setIsValid={setIsValid} isValid={isValid} />
                }
              />
              <Route
                key="blogs-new"
                path="/blogs-new"
                element={<BlogsPageAdd />}
              />
              <Route
                key="blogsEdit-edit-id"
                path="/blogsEdit/edit/:id"
                element={<BlogsPageEdit />}
              />
              <Route
                path="/openpositions"
                element={
                  <OpenPositionsPage
                    setIsValid={setIsValid}
                    isValid={isValid}
                  />
                }
              />
              <Route
                path="/contact"
                element={
                  <ContactPage setIsValid={setIsValid} isValid={isValid} />
                }
              />
              <Route
                path="/logout"
                element={<Logout setLoggedIn={setLoggedIn} />}
              />
            </Routes>
            <ToastContainer />
          </Navbar>
        </div>
      ) : (
        <div style={{ background: "#f8f9fc", height: "100vh" }}>
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  setIsValid={setIsValid}
                  setLoggedIn={setLoggedIn}
                  loggedIn={loggedIn}
                />
              }
            />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
