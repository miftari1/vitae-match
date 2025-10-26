import { useState } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.post('/users/login', {email,password});
    localStorage.setItem('token', res.data.access_token);
    navigate('/analyze');
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">VitaeMatch Login</h1>
      <input type="email" placeholder="Email" className="border p-2 mb-2" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="border p-2 mb-2" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;