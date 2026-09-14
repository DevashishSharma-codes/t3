import { requireGuest } from '@/app/modules/authentication/actions';
import React from 'react'

const AuthLayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    await requireGuest();
    return (
        <div>
            {children}
        </div>
    )
}

export default AuthLayout;