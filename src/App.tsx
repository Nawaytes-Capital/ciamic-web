import React from 'react';
import './App.scss';
import Footer from './components/footer';
import Header from './components/header';
import Section1 from './components/section-1';
import Section2 from './components/section-2';
import Section3 from './components/section-3';
import Section4 from './components/section-4';
import SectionHero from './components/section-hero';

function App() {
  return (
    <>
      <Header />
      <div className="app">
        <SectionHero />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
      </div>
      <Footer />
    </>
  );
}

export default App;
