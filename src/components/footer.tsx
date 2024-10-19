import Link from "next/link";

export default function Footer() {
    return (
        <div className="flex justify-evenly w-full mb-4 text-black dark:text-custom-orange mt-12">
            <Link href={'/impressum'}>Impressum</Link>
            <Link href={'/agb'}>AGB</Link>
            <Link href={'/datenschutz'}>Datenschutz</Link>
        </div>
    )
}