import CallToAction from "@/components/landing/cta";
import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import Stats from "@/components/landing/stats";
import Trust from "@/components/landing/trust";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function Home() {
  return (
   <>
   <Navbar/>
   <Hero/>
   <Stats/>
   <Features/>
   <HowItWorks/>
   <Trust/>
   <CallToAction/>
   {/* <Footer/> */}
   </>
  );
}
