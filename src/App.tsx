import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { About, Services } from "./pages/AboutServices";
import { Approach, Work } from "./pages/WorkApproach";
import { Careers, Contact } from "./pages/CareersContact";
import Studio from "./pages/Studio";
import WorkDetail, { Insights, NotFound } from "./pages/WorkDetail";
import { Portfolio } from "./pages/Portfolio";

export default function App() {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/services" element={<Services />} />
    <Route path="/work" element={<Work />} />
    <Route path="/work/:slug" element={<WorkDetail />} />
    <Route path="/portfolio" element={<Portfolio />} />
    <Route path="/approach" element={<Approach />} />
    <Route path="/careers" element={<Careers />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/insights" element={<Insights />} />
    <Route path="/studio" element={<Studio />} />
    <Route path="*" element={<NotFound />} />
  </Routes>;
}
