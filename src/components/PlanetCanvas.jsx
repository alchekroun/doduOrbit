import { useRef, useEffect, useState } from "react";

import { Planet, PlanetOrbitType } from '../lib/Planet'
import { getAngle, getAngle2, getPointOnCircle, getPointOnEllispe } from "../lib/utils";

const NUM_STARS = 150; // Nombre d'étoiles

const PlanetCanvas = ({ hourOfYear }) => {
  const canvasRef = useRef();
  const ctxRef = useRef();
  const [planets, setPlanets] = useState([]);
  const [stars, setStars] = useState([]);

  // Génération des étoiles une seule fois
  useEffect(() => {
    const generateStars = (width, height, numStars) => {
      return Array.from({ length: numStars }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2,
        opacity: Math.random() * 0.7 + 0.3, // Opacité entre 0.3 et 1
      }));
    };

    const canvas = canvasRef.current;
    setStars(generateStars(canvas.width, canvas.height, NUM_STARS));
  }, []);

  const loadImage = (src) => {
    const img = new Image();
    img.src = src;
    return img;
  };

  const SUNNY_O_IMG = loadImage("SUNNY_O.png");
  const MERCURY_D_IMG = loadImage("MERCURY_D.png");
  const VENUS_D_IMG = loadImage("VENUS_D.png");
  const MARS_U_IMG = loadImage("MARS_U.png");


  // Dessiner le fond étoilé
  const drawStars = (ctx) => {
    stars.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();
    });
  };

  const drawPlanet = (ctx, planet, center, hour) => {

    let position;
    if (planet.orbitType === PlanetOrbitType.CIRCLE) {
      position = planet.getPosition(planet.orbitRadiusA, getAngle2(hour, planet.alignShift), center.x, center.y);
    } else {
      position = planet.getPosition(planet.orbitRadiusA, planet.orbitRadiusB, getAngle2(hour, planet.alignShift), center.x, center.y);
    }

    planet.incrTrail(position);

    ctx.beginPath();
    ctx.strokeStyle = "rgba(186, 186, 186, 0.5)";
    ctx.lineWidth = 2;
    planet.trail.forEach((point, i) => {
      if (i === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();

    ctx.drawImage(planet.img, position.x - planet.size, position.y - planet.size, planet.size * 2, planet.size * 2);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctxRef.current = canvas.getContext("2d");
  }, []);

  useEffect(() => {
    const tmpPlanets = [
      new Planet("sunny_o", 75, getAngle, getPointOnCircle, SUNNY_O_IMG, PlanetOrbitType.CIRCLE, 0),
      new Planet("mercury_d", 60, getAngle, getPointOnCircle, MERCURY_D_IMG, PlanetOrbitType.CIRCLE, 150, 0, 2, Math.PI),
      new Planet("venus_d", 55, getAngle, getPointOnEllispe, VENUS_D_IMG, PlanetOrbitType.ELLIPTIC, 150, 300, 2),
      new Planet("mars_u", 60, getAngle, getPointOnEllispe, MARS_U_IMG, PlanetOrbitType.ELLIPTIC, 250, 150),
    ];
    setPlanets(tmpPlanets);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const center = { x: canvas.width / 2, y: canvas.height / 2 };

    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawStars(ctx);

    planets.forEach((p) => drawPlanet(ctx, p, center, hourOfYear));
  }, [hourOfYear, planets, stars]);

  return (
    <>
      <canvas ref={canvasRef} style={{ background: "black" }} />
    </>
  )
};

export default PlanetCanvas;