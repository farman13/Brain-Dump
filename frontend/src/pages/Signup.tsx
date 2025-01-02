import { useRef } from "react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
        navigate('/signin');
    }
    return <div className="h-screen w-screen bg-purple-50 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-96 max-w-lg min-h-96 p-12">
            <div className="text-center pb-6">
                <h1 className="text-4xl font-bold ">Welcome to <span className="text-purple-800">BrainDump</span></h1>
                <p className="text-gray-700 text-lg mt-2">
                    Sign up and never lose track of your ideas again!
                </p>
            </div>
            <div className="font-normal">
                Username
                <Input placeholder="e.g. xyz12" reference={usernameRef} />
                Password
                <Input placeholder="A12@.." reference={passwordRef} />
            </div>
            <div className="flex justify-center pt-6">
                <Button variant="primary" text="Signup" size="sm" fullwidth={true} loading={false} onClick={signup} />
            </div>
            <div className="pt-4 text-lg">
                Existing user ?
                <Link to='/signin'>
                    <span className="pl-2 text-blue-700 hover:underline ">
                        Signin
                    </span>
                </Link>
            </div>
        </div>

    </div>
}