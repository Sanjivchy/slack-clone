"use client"
import React, { useState } from 'react';
import SignInCard from './SignInCard';
import SignUpCard from './SignUpCard';

const AuthScreen = () => {
    const [state, setState] = useState("signIn");

  return (
    <div className='w-full h-full flex items-center justify-center bg-[#5c3B58]'>
        <div className='md:h-auto md:w-[420px]'>
            {
                state === "signIn" ? <SignInCard  setState={setState} /> : <SignUpCard setState={setState} />
            }
        </div>
    </div>
  )
}

export default AuthScreen;