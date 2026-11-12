import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { MediaView } from './components/MediaView';
import { GeneroView } from './components/GeneroView';
import { DirectorView } from './components/DirectorView';
import { ProductoraView } from './components/ProductoraView';
import { TipoView } from './components/TipoView';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MediaView />} />
        <Route path="/generos" element={<GeneroView />} />
        <Route path="/directores" element={<DirectorView />} />
        <Route path="/productoras" element={<ProductoraView />} />
        <Route path="/tipos" element={<TipoView />} />
      </Routes>
    </Router>
  );
}

export default App;