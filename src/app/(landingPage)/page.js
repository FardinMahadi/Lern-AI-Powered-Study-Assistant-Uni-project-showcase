import Feature1 from "./components/Feature1";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";

const page = () => {
  return (
    <>
      <Header />
      <Hero />
      <h1 className="text-6xl text-center mt-20">Features</h1>
      <Feature1 />
      <Footer />
    </>
  );
};

export default page;
