import TopBanner from './components/TopBanner';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductSlider from './components/ProductSlider';
import SecondaryHero from './components/SecondaryHero';
import EditorialGrid from './components/EditorialGrid';
import ImageGallery from './components/ImageGallery';
import ValuesSection from './components/ValuesSection';
import LogoBanner from './components/LogoBanner';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <TopBanner />
      <main className="relative px-4 md:px-6">
        <div className="relative rounded-xl overflow-hidden">
          <Header />
          <Hero />
        </div>
        <ProductSlider />
        <div className="relative rounded-xl overflow-hidden">
          <SecondaryHero />
        </div>
        <EditorialGrid />
        <ImageGallery />
        <ValuesSection />
        <LogoBanner />
      </main>
      <Footer />
    </div>
  );
}

export default App;
