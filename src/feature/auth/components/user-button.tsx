"use client"
import React from 'react'

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useCurrentUser } from '../hooks/use-current-user';
import { Loader,LogOut, Settings, User } from 'lucide-react';
import { useAuthActions } from '@convex-dev/auth/react';
const UserButton = () => {
    const {signOut} = useAuthActions();
    const { data, isLoading } = useCurrentUser();

    if(isLoading) {
        return <Loader className='animate-spin size-4 text-muted-foreground' />
    }

    if(!data){
        return null
    }

    const {name, image} = data;
    const avatarFallback = name!.charAt(0).toLocaleUpperCase()
  return (
    <DropdownMenu>

        <DropdownMenuTrigger className='outline-none relative'>
            <Avatar className='size-10 hover:opacity-75 transition'>
                <AvatarImage src={image} alt={name} />
                <AvatarFallback className=' bg-muted text-black'>
                    {avatarFallback}
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
 
        <DropdownMenuContent align='center' side='bottom' className='w-60'>
            <DropdownMenuItem>
                <span className='flex items-center gap-2'>
                    <User className='size-4' /> Profile
                </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <span className='flex items-center gap-2'>
                    <Settings className='size-4' /> Settings
                </span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
                <span className='flex items-center gap-2'>
                    <LogOut className='size-4' /> Sign out</span>
            </DropdownMenuItem>
        </DropdownMenuContent>

    </DropdownMenu>
  )
}

export default UserButton