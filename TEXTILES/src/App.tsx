import { Products } from './sections/Products';
import { Hero } from './sections/Hero';
import { QuoteForm } from './sections/QuoteForm';
import { Features } from './sections/Features';
import { Footer } from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Products />
      <QuoteForm />
      <Features />
      <Footer />
    </div>
  );
}

export default App;
