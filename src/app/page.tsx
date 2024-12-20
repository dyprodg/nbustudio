"use client";
import LandingHeader from "@/components/desktop/header";
import Projekte from "./projekte/projekte";
import { useState, useEffect } from "react";
import BookingButton from "@/components/booking-button";

export default function Home() {
  const [projectsLoaded, setProjectsLoaded] = useState(false);

  // Verwenden eines Hooks, um den Zustand der geladenen Projekte zu überwachen
  useEffect(() => {
    // Callback-Funktion zum Überprüfen, ob die Projekte geladen sind
    const checkProjectsLoaded = () => {
      const projects = document.getElementById("projekte");
      if (projects && projects.innerHTML !== "") {
        setProjectsLoaded(true);
      }
    };

    // MutationObserver zum Überwachen von Änderungen im DOM-Element der Projekte
    const observer = new MutationObserver(checkProjectsLoaded);
    const projects = document.getElementById("projekte");
    if (projects) {
      observer.observe(projects, { childList: true, subtree: true });
    }

    return () => {
      if (projects) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div id="home">
        <LandingHeader />
        <BookingButton />
      </div>
      <div id="projekte">
        <Projekte />
      </div>
    </div>
  );
}
