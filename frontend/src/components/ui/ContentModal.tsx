import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon"
import { Button } from "./Button"
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../../config";

interface ContentmodalProps {
    open: boolean,
    onClose: () => void
}

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export const ContentModal = ({ open, onClose }: ContentmodalProps) => {

    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);

    const [type, setType] = useState(ContentType.Youtube);

    async function addContent() {

        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/content`, {
            title,
            type,
            link
        }, {
            headers: {
                "Authorization": localStorage.getItem("token") || ""
            }
        });

        onClose();

    }

    return (
        <div>
            {open && (
                <div>
                    <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
                    {/* Modal container */}
                    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
                        <div className="flex flex-col justify-center">
                            <span className="bg-white opacity-100 p-4 rounded fixed">
                                {/* close button*/}
                                <div className="flex justify-end">
                                    <div onClick={onClose} className="cursor-pointer">
                                        <CrossIcon />
                                    </div>
                                </div>
                                {/* Input fields for title and link */}
                                <div>
                                    <Input placeholder={"Title"} reference={titleRef} />
                                    <Input placeholder={"Link"} reference={linkRef} />
                                </div>
                                <h1>Type</h1>
                                <div className="flex gap-1 justify-center pb-2">
                                    <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"}
                                        size="sm" onClick={() => setType(ContentType.Youtube)} />
                                    <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"}
                                        size="sm" onClick={() => setType(ContentType.Twitter)} />
                                </div>
                                <div className="flex justify-center">
                                    <Button variant="primary" text="Submit" size="sm" fullwidth={true} onClick={addContent} />
                                </div>
                            </span>
                        </div>
                    </div>
                </div>)}
        </div>
    )
};
