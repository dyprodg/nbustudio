// app/projekte/page.tsx

import ProjektSection from "@/components/project-section";

export default async function Projekte() {
    return (
        <div className="flex flex-col items-center mt-12 md:mt-20 h-screen">
            <h1 className="text-6xl">Projekte</h1>
            <div>
                <p className="text-2xl text-center m-2">Hier findest du alle Projekte, die ich bisher umgesetzt habe.</p>
            </div>
            <ProjektSection />
        </div>
    );
}
