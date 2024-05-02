import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import OpenPositionsPageEdit from "./components/OpenPositions/OpenPositionsPageEdit";
function App() {
  const loggedIn = useSelector(selectIsLoggedIn);
  return (
    <BrowserRouter>
      {loggedIn ? (
        <div style={{ backgroundColor: "white", padding: "0" }}>
          <Navbar>
            <Routes>
              {/* <Route path="/" element={<Dashboard />} /> */}
              <Route path="/landingPage" element={<LandingPage />} />
              <Route path="/LandingPage/edit/:id" element={<LandingPageEdit/>} />
              <Route path="/offShoring" element={<OffshoringPage/>} />
              <Route path="/OffshoringPage/edit/:id" element={<OffshoringPageEdit/>} />
              <Route path="/customSoftware" element={<CustomServicePage/>}/>
              <Route path="/CustomSoftwarePageEdit/edit/:id" element={<CustomServicePageEdit/>}/>
              <Route path="/productResearch" element={<ProductResearchPage/>}/>
              <Route path="/ProductResearchPageEdit/edit/:id" element={<ProductResearchPageEdit/>}/>
              <Route path="/webDevelopment" element={<WebDevelopmentPage/>}/>
              <Route path="/WebDevelopmentPageEdit/edit/:id" element={<WebDevelopmentPageEdit/>}/>
              <Route path="/faq" element={<FaqPage/>}/>
            
              <Route path="/mobileApp" element={<MobileAppPage/>}/>
              <Route path="/MobileAppPageEdit/edit/:id" element={<MobileAppPageEdit/>}/>
              <Route path="/blockchain" element={<BlockChainPage/>}/>
              <Route path="/BlockChainPageEdit/edit/:id" element={<BlockChainPageEdit/>}/>
              <Route path="/ai" element={<AiPage/>}/>
              <Route path="/AiPageEdit/edit/:id" element={<AiPageEdit/>}/>
              <Route path="/arvr" element={<ArVrPage/>}/>
              <Route path="/ArVrPageEdit/edit/:id" element={<ArVrPageEdit/>}/>
              <Route path="/uiux" element={<UiUxPage/>}/>
              <Route path="/UiUxPageEdit/edit/:id" element={<UiUxPageEdit/>}/>
              {/* <Route path="/casestudies" element={<UiUxPage/>}/>
              <Route path="/casestudiesEdit/edit/:id" element={<UiUxPageEdit/>}/>
              <Route path="/jobcategories" element={<UiUxPage/>}/>
              <Route path="/jobcategoriesEdit/edit/:id" element={<UiUxPageEdit/>}/> */}
              <Route path="/openpositions" element={<OpenPositionsPage/>}/>
              <Route path="/OpenPositionsPageEdit/edit/:id" element={<OpenPositionsPageEdit/>}/>
              <Route
                path="/logout"
                element={<Logout />}
              />
            </Routes>
          </Navbar>
        </div>
      ) : (
        <div style={{ background: "#f8f9fc", height: "100vh" }}>
          <Routes>
            <Route path="/" element={<Login loggedIn={loggedIn} />} />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
