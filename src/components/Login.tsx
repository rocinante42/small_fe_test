import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useLazyGetStoreInfoQuery } from '../features/api-slice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth-slice';
import { isValidEmail } from '../lib/helpers';

const Login: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();
    const [getStoreInfo] = useLazyGetStoreInfoQuery();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await login({ email, password }).unwrap();
            dispatch(setCredentials({
                accessToken: result.tokens.accessToken,
                clientToken: result.tokens.clientToken,
                user: result.user,
                view: result.view,
            }));
            handleRedirect(result.view, result.accesses[0]?.store_id);
        } catch (err: any) {
            setError(err.data?.message || 'An error occurred');
        }
    };

    const handleRedirect = async (view: any, storeId: number) => {
        console.log(view, 'view');
        if (view.type === 'ADMIN') {
            navigate('/admin');
        }
        else if (view.type === 'CLIENT') {
            try {
                const storeInfo = await getStoreInfo(storeId).unwrap();
                console.log(storeInfo);
                if (storeInfo.store.onboarding_procedure.onboarding_status !== 'DONE') {
                    navigate('/onboarding');
                } else {
                    navigate('/dashboard');
                }
            } catch (error) {
                console.error('Error fetching store info:', error);
                navigate('/dashboard');
            }
        }
    };

   
    const isFormValid = isValidEmail(email) && password.length > 0;

    return (
        <div className="flex dark:bg-red-300 items-center">

            <div className="absolute flex flex-col top-1/2 left-1/2 w-full p-4 md:min-w-1/2 md:w-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <img src="/logo_light.svg" alt="Opensend" className="block dark:hidden mb-8" />
                <img src="/logo_dark.svg" alt="Opensend" className="hidden dark:block mb-8" />
                <div className="font-inter space-y-8 w-full bg-base-100 relative md:p-6 rounded-lg">
                    <h2 className="text-3xl font-darker-grotesque text-base-content font-semibold text-center mb-4">Welcome back!</h2>
                    <p className="text-center text-gray-500 mb-6">
                        Log in to continue with Opensend
                    </p>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">

                            <div className="mb-4">
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input type="email" id="email" placeholder="Email address"
                                    className="input input-bordered bg-base  opacity-100 w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-6 relative">
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input type={showPassword ? "text" : "password"} id="password" placeholder="Password"
                                    className=" input input-bordered bg-base w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {!showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}

                        <div className="flex flex-col space-between space-y-2">
                            <button type="submit" disabled={!isFormValid || isLoading} className="btn bg-primary text-white border-none w-full">
                                Log In
                            </button>
                            <button className="btn bg-base text-base font-inter border border-gray dark:border-white w-full">Forgot your password?</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;

