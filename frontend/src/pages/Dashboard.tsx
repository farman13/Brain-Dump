import { useEffect, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { ContentModal } from '../components/ui/ContentModal'
import { SideBar } from '../components/ui/SideBar'
import { useContent } from '../hooks/useContent'

function Dashboard() {

    const [modalOpen, setmodalOpen] = useState(false);
    const { contents, refresh } = useContent();

    useEffect(() => {
        refresh();
    }, [modalOpen])

    return (
        <div>
            <SideBar />
            <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2'>
                <ContentModal open={modalOpen} onClose={() => setmodalOpen(false)} />

                <div className='flex justify-end gap-4'>
                    <Button startIcon={<ShareIcon />} variant='secondary' size='sm' text='Share brain' onClick={() => { }} />
                    <Button startIcon={<PlusIcon />} variant='primary' size='sm' text='Add Content' onClick={() => { setmodalOpen(true) }} />
                </div>

                <div className='flex gap-4 flex-wrap'>
                    {contents.map(({ title, type, link, _id }) => <Card type={type} link={link} title={title} contentId={_id} refresh={refresh} />
                    )}

                </div>
            </div>
        </div>
    )
}

export default Dashboard;
