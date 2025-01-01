import axios from "axios";
import { BACKEND_URL } from "../config";

export const useDeleteContentbyId = () => {

    async function deleteContent(contentId: any) {
        await axios.delete(`${BACKEND_URL}/content`, {
            //@ts-ignore
            contentId, // Include contentId in the request body
            headers: {
                "Authorization": localStorage.getItem("token") || ""
            }
        });
    }

    return { deleteContent }
}