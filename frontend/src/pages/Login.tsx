import { useState } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
      try {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        const headers = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
        const res = await axios.post('/token', params, headers);
        localStorage.setItem('token', res.data.access_token);
        navigate('/analyze');
      } catch (err: any) {
          console.error(err.response?.data || err.message);
          alert('Login failed. Please check your credentials.');
      }
  }

  return (
    <div>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold mb-4">VitaeMatch Login</h1>
          <input type="text" placeholder="Username" className="border p-2 mb-2" value={username} onChange={e=>setUsername(e.target.value)} />
          <input type="password" placeholder="Password" className="border p-2 mb-2" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="bg-blue-500 text-white px-4 py-2" onClick={handleLogin}>Login</button>
        </div>
    </div>
  );
};

export default Login;