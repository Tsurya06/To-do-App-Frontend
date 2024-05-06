// src/Signup.tsx
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase-config/firebase';
import { message } from 'antd';

const Signup: React.FC = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [isLoading,setIsLoading]= useState(false);


 const handleSignup = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      // Send verification email
      const awaited= await userCredential.user?.sendEmailVerification();
      message.success('Verification email sent. Please check your inbox.');
    } catch (error:any) {
        message.error(error.message);    
    }
 };

 return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
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
        <button type="submit">Signup</button>
      </form>
    </div>
 );
};

export default Signup;
