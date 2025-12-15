import Layout from "./Layout.jsx";

import Home from "./Home";

import WellnessIntake from "./WellnessIntake";

import ServiceDetail from "./ServiceDetail";

import HomeEssentials from "./HomeEssentials";

import LeadershipWisdom from "./LeadershipWisdom";

import BackOffice from "./BackOffice";

import WellnessIntakeResult from "./WellnessIntakeResult";

import SpecializedIntake from "./SpecializedIntake";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    WellnessIntake: WellnessIntake,
    
    ServiceDetail: ServiceDetail,
    
    HomeEssentials: HomeEssentials,
    
    LeadershipWisdom: LeadershipWisdom,
    
    BackOffice: BackOffice,
    
    WellnessIntakeResult: WellnessIntakeResult,
    
    SpecializedIntake: SpecializedIntake,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Home />} />
                
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/WellnessIntake" element={<WellnessIntake />} />
                
                <Route path="/ServiceDetail" element={<ServiceDetail />} />
                
                <Route path="/HomeEssentials" element={<HomeEssentials />} />
                
                <Route path="/LeadershipWisdom" element={<LeadershipWisdom />} />
                
                <Route path="/BackOffice" element={<BackOffice />} />
                
                <Route path="/WellnessIntakeResult" element={<WellnessIntakeResult />} />
                
                <Route path="/SpecializedIntake" element={<SpecializedIntake />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}