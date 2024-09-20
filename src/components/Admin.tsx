import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth-slice';

const Admin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-base">Admin Page</h1>

      <button
        onClick={handleLogout}
        className="btn bg-primary !text-base  text-base font-bold py-2 px-4 rounded"
      >
        Logout!
      </button>
    </div>
  );
};

export default Admin;