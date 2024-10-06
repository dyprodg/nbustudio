'use client';
import { useState } from "react";
import { sendMail } from "@/app/actions";
import CheckMark from "@/components/ui/checkmark";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Kontakt() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sendSuccess, setSendSuccess] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setLoading(true);
        const response = await sendMail(name, email, message);
        console.log(response);
        setLoading(false);
        if (response.message === "Email send successfully") {
            setName("");
            setEmail("");
            setMessage("");
            setAgreed(false);
            setSendSuccess(true);
            setTimeout(() => {
                router.push("/");
            }, 2000);
        } else {
            setError("Senden Fehlgeschlagen. Versuche es später erneut oder schicke eine Nachricht auf WhatsApp unter +41 (0) 78 6381909");
        }
    };

    const isDisabled = !name || !email || !message || !agreed || loading;

    return (
        <div 
        id="kontakt"
        className="w-full h-screen flex flex-col justify-center items-center text-white relative z-30"
        >
            <h1 className="text-3xl text-center text-black dark:text-custom-orange m-4">Nehmen Sie jetzt mit mir Kontakt auf!</h1>
            {sendSuccess ? (
                <CheckMark message={`Nachricht gesendet`} />
            ) : (
                <div className="flex flex-col border-2 border-black dark:border-custom-orange shadow-blue w-[370px] md:w-[600px] rounded-3xl p-4">
                    {loading ? (
                        <div>
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <>
                            <input
                                className="flex p-2 m-4 outline-white rounded-full bg-black dark:bg-custom-orange active:border-neutral-500 text-white dark:text-black placeholder:text-gray-400 dark:placeholder:text-gray-900 text-xl"
                                placeholder="Name"
                                value={name}
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <input
                                className="flex p-2 m-4 outline-white rounded-full bg-black dark:bg-custom-orange active:border-neutral-500 text-white dark:text-black placeholder:text-gray-400 dark:placeholder:text-gray-900 text-xl"
                                placeholder="Email"
                                value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <textarea
                                className="flex p-2 m-4 outline-white rounded-3xl resize-none bg-black dark:bg-custom-orange active:border-neutral-500 text-white dark:text-black placeholder:text-gray-400 dark:placeholder:text-gray-900 text-xl"
                                placeholder="Deine Nachricht"
                                rows={10}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                            <div className="flex items-center p-2">
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={() => setAgreed(!agreed)}
                                    required
                                    className=""
                                />
                                <span className="ml-2 text-black dark:text-custom-orange">
                                    Ich akzeptiere die <a href="/agb" target="_blank" className="text-black dark:text-custom-orange underline">AGB</a> und die <a href="/datenschutz" target="_blank" className="text-black dark:text-custom-orange underline">Datenschutzerklärung</a>.
                                </span>
                            </div>
                            <div className="flex justify-center items-center w-full h-16 relative z-30">
                                <button
                                    onClick={handleSubmit}
                                    disabled={isDisabled}
                                    className="text-xl hover:scale-105 bg-black dark:bg-custom-orange text-white dark:text-black rounded-full p-2 w-1/2"
                                >
                                    {loading ? <div>Lädt...</div> : <div>Senden</div>}
                                </button>
                            </div>
                            {error && (
                                <div className="mt-4 text-xl text-red-500 bg-black p-4 rounded-lg ">
                                    {error}
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
