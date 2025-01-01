import { ShareIcon } from "../../icons/ShareIcon"

interface cardProps {
    title: string,
    link: string
    type: "twitter" | "youtube",
}

export const Card = ({ title, link, type }: cardProps) => {
    return (
        <div>
            {/*card container */}
            <div className="p-4 bg-white rounded-md border-gray-300 max-w-72 border min-h-48 min-w-72">
                {/*Header */}
                <div className="flex justify-between">
                    {/*left section */}
                    <div className="flex items-center text-md">
                        <div className="text-gray-500 pr-2">
                            <ShareIcon />
                        </div>
                        {title}
                    </div>
                    {/*right section */}
                    <div className="flex items-center">
                        <div className="pr-2 text-gray-500">
                            <a href={link}><ShareIcon /></a>
                        </div>
                        <div className="text-gray-500">
                            <ShareIcon />
                        </div>
                    </div>
                </div>

                {/* Content section */}
                <div className="pt-4">
                    {/* Render YouTube embed if type is "youtube" */}
                    {type === "youtube" && (
                        <iframe
                            className="w-full"
                            src={link
                                .replace("watch", "embed")
                                .replace("?v=", "/")}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}

                    {/* Render Twitter embed if type is "twitter" */}
                    {type === "twitter" && (
                        <blockquote className="twitter-tweet">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    )}
                </div>
            </div>
        </div>
    )
}