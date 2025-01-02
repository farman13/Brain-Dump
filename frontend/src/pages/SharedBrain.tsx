import { useEffect, useState } from 'react'
import { Card } from '../components/ui/Card'
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import axios from 'axios';
import { LogoIcon } from '../icons/LogoIcon';

function SharedBrain() {

    const [Data, setData] = useState(null);
    const { shareLink } = useParams();
    console.log(shareLink);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/brain/${shareLink}`,)
            .then((response) => { setData(response.data) })
            .catch((err) => console.log("Something went wrong", err));
    }, [shareLink])

    if (!Data) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div className="flex text-2xl items-center bg-white border-r w-72 fixed left-0 top-0 p-6">
                <div className="pr-2 text-purple-400">
                    <LogoIcon />
                </div>
                {//@ts-ignore
                    `${Data.username}'s Brain`}
            </div>
            <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2'>
                <div className='flex gap-4 flex-wrap'>
                    { //@ts-ignore
                        Data.content.map(({ title, type, link, _id }) => <Card type={type} link={link} title={title} contentId={_id} />
                        )}
                </div>
            </div>
        </div>
    )
}

export default SharedBrain;
