import { 
    Card, 
    CardHeader, 
    CardDescription, 
    CardContent, 
    CardTitle
 } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import React from 'react'
import { FcGoogle }  from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { SignInFlow } from '@/types';
import { useState } from 'react';
import { TriangleAlert } from 'lucide-react';
import { useAuthActions } from "@convex-dev/auth/react";

interface Props {
    setState: (state: SignInFlow) => void
}
const SignInCard:React.FC<Props> = ({setState}) => {
    const { signIn } = useAuthActions();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | undefined>('');

    const handleProvider = (value: "github" | "google") => {
        setPending(true)
        signIn(value)
        .finally(() => setPending(false))
    }

    const onCredentialSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setError("Passwords do not match")
            return
        }
        setPending(true)
        signIn("password", { name, email, password, flow: "signUp" })
        .catch(() =>{
            setError("Something went wrong")
        })
        .finally(() => setPending(false))
    }


  return (
    <Card className='w-full h-full p-8'>
        <CardHeader className='px-0 pt-0'>
            <CardTitle>
                Sign up to Continue
            </CardTitle>
            <CardDescription>
                Use Your email or another service to continue
            </CardDescription>
        </CardHeader>
        {!!error && <div className='bg-destructive/15 p-3 t rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
            <TriangleAlert className='size-4' />
            <p> {error}</p>
        </div>}
        <CardContent className='space-y-5 px-0 pb-0'>
            <form onSubmit={onCredentialSubmit} className='space-y-2.5'>
                <Input
                    type="text"
                    placeholder="Full name"
                    disabled={pending}
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                    required
                />
                <Input
                    type="email"
                    placeholder="Email"
                    disabled={pending}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                    required
                />

                <Input 
                    type="password" 
                    placeholder="Password"
                    disabled={pending}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    required
                />
                <Input 
                    type="password" 
                    placeholder="Confirm Password"
                    disabled={pending}
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value)
                    }}
                    required
                />
                <Button type='submit' className='w-full' size={'lg'} disabled={pending}>Continue</Button>
            </form>
            <Separator />
            <div className='flex flex-col space-y-2.5'>
                <Button
                    onClick={() => void handleProvider("google")}
                    variant={'outline'}
                    size={'lg'}
                    className='w-full relative'
                    disabled={pending}
                >
                  <FcGoogle className='size-5 absolute left-2.5 top-3' />  Continue with Google
                </Button>
                <Button
                    onClick={() => void handleProvider("github")}
                    variant={'outline'}
                    size={'lg'}
                    className='w-full relative'
                    disabled={pending}
                >
                  <FaGithub className='size-5 absolute left-2.5 top-3' />  Continue with Github
                </Button>
            </div>
            <p className='text-xs text-muted-foreground'>
              Already have an account? <span onClick={() => setState("signIn")} className='text-sky-700 hover:underline cursor-pointer'>Sign In</span>
            </p>
        </CardContent>
    </Card>
  )
}

export default SignInCard