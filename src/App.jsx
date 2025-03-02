import { useEffect, useRef, useState } from 'react'
import dayjs from "dayjs";
import './styles/App.css'
import PlanetCanvas from './components/PlanetCanvas'
import HUD from './components/HUD'
import { dateToHourOfYear } from './lib/utils';
import Footer from './components/Footer';

function App() {

  const [autoMode, setAutoMode] = useState(true);
  const autoModeRef = useRef(autoMode);
  const [hourOfYear, setHourOfYear] = useState(dateToHourOfYear(dayjs()));

  useEffect(() => {
    autoModeRef.current = autoMode;
  }, [autoMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoModeRef.current) setHourOfYear(dateToHourOfYear(dayjs()));
    }, 60000); // 60000ms = 1 minute

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <HUD autoMode={autoMode} setAutoMode={setAutoMode} hourOfYear={hourOfYear} setHourOfYear={setHourOfYear} />
      <PlanetCanvas autoMode={autoMode} hourOfYear={hourOfYear} />
      <Footer />
    </>
  )
}

export default App
