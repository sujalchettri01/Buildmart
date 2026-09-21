import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import PopularProducts from "../components/PopularProducts";
import Brands from "../components/Brands";
import BulkQuote from "../components/BulkQuote";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Navbar />

      <main>
        <Hero />

        <Categories />

        <PopularProducts />

        <Brands />

        <BulkQuote />

        <WhyChooseUs />
      </main>

      <Footer />
    </>
  );
}