import { auth } from '../utils/auth'
import { redirect } from 'next/navigation'

async function Redirect() {
    const session = await auth()
    if (session) {
        redirect('/')
    }
}

export default Redirect