import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth-slice'; 

const Onboarding: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center text-base justify-center">
      <h1 className="text-4xl font-bold text-base">Onboarding Page</h1>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default Onboarding;