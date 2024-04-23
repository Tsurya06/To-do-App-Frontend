// src/Login.tsx
import React, { useState } from 'react';
import { auth } from '../../firebase-config/firebase';
import { message } from 'antd';

export default function Login() {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');

 const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCred = await auth.signInWithEmailAndPassword(email, password);
      if (userCred.user?.emailVerified) {
        message.success('Login Success!!');
      } else {
        message.error('Email is not verified');
      }
    } catch (error:any) {
      message.error(error.message);
    }
 };

 return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
 );
};

