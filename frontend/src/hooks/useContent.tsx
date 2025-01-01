import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export const useContent = () => {
    const [contents, setContents] = useState([]);

    function refresh() {
        axios.get(`${BACKEND_URL}/content`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                setContents(response.data.userContent);
            })
            .catch((error) => {
                console.error("Error fetching content:", error);
            })
    }

    useEffect(() => {
        refresh();
    }, [])

    return { contents, refresh };
}