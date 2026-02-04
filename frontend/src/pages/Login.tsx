import {useContext, useState} from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../auth/useAuth";

const Login = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

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
        login(res.data.access_token, res.data.user);
        navigate('/analyze');
      } catch (err: any) {
          console.error(err.response?.data || err.message);
          alert('Login failed. Please check your credentials.');
      }
  }

  return (
    <div className="flex h-screen justify-center items-center">
        <div className="flex flex-col items-stretch p-2 max-w-fit gap-4">
          <h1 className="text-3xl font-bold mb-4">VitaeMatch Login</h1>
          <input type="text" placeholder="Username" className="border p-2  mx-0 mb-2 rounded-2xl" value={username} onChange={e=>setUsername(e.target.value)} />
          <input type="password" placeholder="Password" className="border p-2 mb-2 rounded-2xl" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="bg-blue-500 text-white px-4 py-2 justify-stretch rounded-2xl" onClick={handleLogin}>Login</button>
          <a href="http://localhost:3000/register" className="text-blue-500">Don't have an account? Register here.</a>
        </div>
    </div>
  );
};

export default Login;