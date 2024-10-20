import Footer from "@/components/footer";

export const metadata = {
  title: "NBUSTUDIO - Projekte Datenschutzrichtlinie",
  description: "Dies ist die Datenschutzrichtlinie.",
  keywords: ["Datenschutz", "Richtlinie"],
};
export default function Datenschutz() {
  return (
    <div className="w-full relative flex flex-col mt-20 min-h-screen justify-center items-center z-30">
      <div className="w-[400px] md:w-[500px] lg:w-[800px] xl:w-[1000px] p-4 uppercase">
        <h1 className="font-bold text-3xl">Datenschutzerklärung</h1>

        <h1 className="font-bold text-2xl mt-4">Allgemein</h1>
        <p className="mt-2 text-xl">
          {`Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSG, VDSG). In dieser Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website.`}
        </p>
        <h2 className="font-bold text-2xl mt-4">Cookies</h2>
        <p className="mt-2 text-xl">{`Unsere Website verwendet nur notwendige Cookies, die für das Funktionieren der Website unerlässlich sind. Diese Cookies werden automatisch beim Betreten der Website gesetzt und erfordern keine gesonderte Zustimmung.`}</p>

        <h2 className="font-bold text-2xl mt-4">Speicherung von Daten</h2>
        <p className="mt-2 text-xl">{`Unsere Website speichert keine Benutzerdaten. Die einzigen Daten, die wir verarbeiten, sind jene, die Sie uns über unser Kontaktformular zur Verfügung stellen.`}</p>

        <h2 className="font-bold text-2xl mt-4">Kontaktformular</h2>
        <p className="mt-2 text-xl">{`Wenn Sie per Formular auf der Website oder per E-Mail Kontakt mit uns aufnehmen, werden Ihre angegebenen Daten (Name und E-Mail-Adresse) zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter und löschen sie, sobald Ihr Anliegen vollständig geklärt ist.`}</p>

        <h2 className="font-bold text-2xl mt-4">Ihre Rechte</h2>
        <p className="mt-2 text-xl">{`Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, können Sie sich bei der Aufsichtsbehörde beschweren.`}</p>

        <h2 className="font-bold text-2xl mt-4">Kontakt</h2>
        <p className="text-xl font-bold">
          Sie erreichen uns unter folgenden Kontaktdaten:
        </p>
        <p className="text-xl font-bold">Nico Buffelli</p>
        <p className="text-xl font-bold">NBU Studio</p>
        <p className="text-xl font-bold">Rankstrasse 3, 8280 Kreuzlingen</p>
        <p className="text-xl font-bold">info@nbustudio.ch</p>
        <p className="text-xl font-bold">+41786381909</p>
      </div>
      <Footer />
    </div>
  );
}
