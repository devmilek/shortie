import Cta from "@/app/(landing)/_components/cta";
import Features from "@/app/(landing)/_components/features";
import Footer from "@/app/(landing)/_components/footer";
import Hero from "@/app/(landing)/_components/hero";
import Navbar from "@/app/(landing)/_components/navbar";
import Pricing from "@/app/(landing)/_components/pricing";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Cta />
      <Footer />
    </>
  );
}
