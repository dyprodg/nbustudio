import Link from "next/link";

export default function Footer() {
    return (
        <div className="flex justify-evenly w-full mb-4">
            <Link href={'/impressum'}>Impressum</Link>
            <Link href={'/agb'}>AGB</Link>
            <Link href={'/datenschutz'}>Datenschutz</Link>
        </div>
    )
}