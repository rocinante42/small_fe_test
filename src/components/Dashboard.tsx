import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth-slice'; // 

const Dashboard: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      dispatch(logout());
      navigate('/login');
    };
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold text-base">Dashboard</h1>

      <button
        onClick={handleLogout}
        className="over:bg-red-600  text-base font-bold py-2 px-4 rounded"
      >
        Logout!
      </button>
    </div>
  );
};

export default Dashboard;