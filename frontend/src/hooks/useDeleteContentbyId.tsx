import axios from "axios";
import { BACKEND_URL } from "../config";

export const useDeleteContentbyId = () => {

    async function deleteContent(contentId: any) {
        console.log("delete")
        await axios.delete(`${BACKEND_URL}/content/${contentId}`, {
            //@ts-ignore
            headers: {
                "Authorization": localStorage.getItem("token") || ""
            }
        });
        console.log("delete1")
    }

    return { deleteContent }
}