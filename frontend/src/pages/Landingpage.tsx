import { Link, useNavigate } from "react-router";
import brainlyPreview from "../../src/assets/brainlyPreview.png"
import { Button } from "../components/ui/Button";
import { Footer } from "../components/ui/Footer";
import { LogoIcon } from "../icons/LogoIcon";
import { SigninIcon } from "../icons/SigninIcon";
import { LoginIcon } from "../icons/LoginIcon";
import { useEffect, useState } from "react";
import { LogoutIcon } from "../icons/LogoutIcon";


const Landingpage = () => {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    const isLoggedIn = () => {
        const token = localStorage.getItem('token');
        if (token) setLoggedIn(true);
    }

    useEffect(() => {
        isLoggedIn();
    }, [])

    return (
        <>
            <div className="flex justify-between">
                <div className="flex text-2xl pt-6 ml-10 items-center">
                    <Link to="/">
                        <div className="pr-2 text-purple-400">
                            <LogoIcon />
                        </div>
                    </Link>
                    BrainDump
                </div>
                <div className="mt-6 mr-4">
                    <Button startIcon={loggedIn ? <LogoutIcon /> : <LoginIcon />} variant="primary" text={loggedIn ? "Logout" : "Signin"} size="sm" fullwidth={true} loading={false} onClick={loggedIn ? () => { localStorage.removeItem("token"); setLoggedIn(false) } : () => navigate("/signin")} />
                </div>
            </div>
            <div className="min-h-[90vh] bg-slate-50 flex flex-col items-center gap-3 md:gap-6">
                <h1 className="text-2xl md:text-5xl font-extrabold text-slate-800 text-center mt-16 max-w-[90vw] md:max-w-[65vw] lg:max-w-[55vw]">
                    Your Digital Vault for Important Links and Notes
                </h1>
                <p className="text-sm  md:text-lg  text-slate-500 text-center  max-w-[75vw] md:max-w-[55vw] lg:max-w-[45vw]">
                    Store and organize important content like videos, tweets, documents, and
                    notes. Access them anytime, and easily share with friends via link
                </p>
                <div className="flex gap-4">
                    <Button startIcon={<SigninIcon />} variant="primary" text={loggedIn ? "Dashboard" : "Get Started"} size="sm" fullwidth={true} loading={false} onClick={loggedIn ? () => navigate("/dashboard") : () => navigate("/signin")} />
                </div>
                <img
                    src={brainlyPreview}
                    className="w-[80vw] max-w-[95vw] rounded-lg border shadow-slate-200 shadow-xl mb-10 grayscale  transition-all duration-500 hover:grayscale-0"
                />
            </div>
            <Footer />
        </>
    );
};

export default Landingpage;