import { useState } from "react"
import { CrossIcon } from "../../icons/CrossIcon"
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { Button } from "./Button";

interface ContentmodalProps {
    open: boolean,
    onClose: () => void
}


export const ShareModal = ({ open, onClose }: ContentmodalProps) => {

    const [Sharelink, setSharelink] = useState('');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(Sharelink)
        setCopied(true);
    }

    const handleShare = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/brain/share`, {
                share: true
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            setSharelink(`${window.location.origin}/brain/${response.data.hash}`);
        } catch (e) {
            console.log("Error sharing brain", e);
        }
    }

    handleShare();


    return (
        <div>
            {open && (
                <div>
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
                    {/* Modal Container */}
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                            {/* Close Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={onClose}
                                    className="text-gray-500 hover:text-gray-700 transition duration-200">
                                    <CrossIcon />
                                </button>
                            </div>
                            {Sharelink && (
                                <div className="mt-1 text-center">
                                    <p className="text-gray-800 text-lg font-semibold mb-3">Share this link:</p>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={Sharelink}
                                            readOnly
                                            className="flex-1 border border-gray-300 rounded px-4 py-2 text-gray-700 focus:outline-none focus:ring-purple-500"
                                        />
                                        <Button
                                            text={copied ? "Copied" : "Copy"}
                                            size="sm"
                                            variant="secondary"
                                            onClick={handleCopy}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}