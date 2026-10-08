import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';

function App() {
  return (
    <BrowserRouter>
      <div className="dark min-h-dvh flex flex-col bg-bg-primary">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
                  <p className="text-7xl font-black text-brand/20 mb-4 select-none">404</p>
                  <h1 className="text-2xl font-bold text-text-primary mb-2">Page not found</h1>
                  <p className="text-text-secondary mb-8">This page doesn't exist.</p>
                  <a href="/" className="btn-primary">Go home</a>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
