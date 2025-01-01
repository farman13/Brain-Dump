import { useRef } from "react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

    const navigate = useNavigate();
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();

    async function signup() {

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        await axios.post(`${BACKEND_URL}/signup`, {
            username,
            password
        })

        alert("You are signed up!")
        navigate('/signin');
    }
    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <Input placeholder="username" reference={usernameRef} />
            <Input placeholder="password" reference={passwordRef} />
            <div className="flex justify-center pt-4">
                <Button variant="primary" text="Signup" size="sm" fullwidth={true} loading={false} onClick={signup} />
            </div>
        </div>

    </div>
}