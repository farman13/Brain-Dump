import { Link } from "react-router-dom"
import { LogoIcon } from "../../icons/LogoIcon"
import { TwitterIcon } from "../../icons/TwitterIcon"
import { YoutubeIcon } from "../../icons/YoutubeIcon"
import { SidebarItem } from "./SidebarItem"

export const SideBar = () => {
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
        <div className="flex text-2xl pt-6 items-center">
            <Link to="/dashboard">
                <div className="pr-2 text-purple-400">
                    <LogoIcon />
                </div>
            </Link>
            BrainDump
        </div>
        <div className="pt-6 pl-4">
            <Link to="/tweets" >
                <SidebarItem text="Twitter" icon={<TwitterIcon />} />
            </Link>
            <Link to="/youtubeContent">
                <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
            </Link>
        </div>
    </div>
}