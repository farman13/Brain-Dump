import { LogoIcon } from "../../icons/LogoIcon"
import { TwitterIcon } from "../../icons/TwitterIcon"
import { YoutubeIcon } from "../../icons/YoutubeIcon"
import { SidebarItem } from "./SidebarItem"

export const SideBar = () => {
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
        <div className="flex text-2xl pt-6 items-center">
            <div className="pr-2 text-purple-400">
                <LogoIcon />
            </div>
            Second Brain
        </div>
        <div className="pt-6 pl-4">
            <SidebarItem text="Twitter" icon={<TwitterIcon />} />
            <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
        </div>
    </div>
}