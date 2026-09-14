import React from 'react'
import { requireAuth, currentUser } from '../modules/authentication/actions'
import ChatSidebar from '../modules/chat/components/Chat-sidebar'

const Layout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    await requireAuth();
    const user = await currentUser();

    return (
        <div className='flex h-screen overflow-hidden bg-background'>
            <ChatSidebar user={user} />
            <main className='flex-1 overflow-hidden flex flex-col'>
                {children}
            </main>
        </div>
    )
}
export default Layout;