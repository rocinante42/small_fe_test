import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { logout } from '../features/auth-slice';
import { useGetUserProfileQuery, useLazyGetStoreInfoQuery } from '../features/api-slice';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { accessToken } = useSelector((state: RootState) => state.auth);
    const [isVerifying, setIsVerifying] = useState(true);

    const { data: userInfo, error: userError } = useGetUserProfileQuery(accessToken, {
        skip: !accessToken,
    });

    const [getStoreInfo] = useLazyGetStoreInfoQuery();

    useEffect(() => {
        const verifyAndRoute = async () => {
            if (!accessToken) {
                setIsVerifying(false);
                navigate('/login', { state: { from: location }, replace: true });
                return;
            }

            if (userError) {
                console.error('Error fetching user info:', userError);
                dispatch(logout());
                setIsVerifying(false);
                navigate('/login', { state: { from: location }, replace: true });
                return;
            }
            
            if (userInfo) {
                console.log(userInfo.view.type, 'userInfo.view.type');
                if (userInfo.view.type !== 'ADMIN') {
                    try {
                        const storeInfo = await getStoreInfo(userInfo.accesses[0]?.store_id).unwrap();
                        if (storeInfo.store.onboarding_procedure.onboarding_status !== 'DONE') {
                            navigate('/onboarding', { replace: true });
                        } else {
                            navigate('/dashboard', { replace: true });
                        }
                    } catch (error) {
                        console.error('Error fetching store info:', error);
                        navigate('/dashboard', { replace: true });
                    }

                    setIsVerifying(false);
                } else {
                    setIsVerifying(false);
                    navigate('/admin', { replace: true });
                }
            }
        };

        verifyAndRoute();
    }, [accessToken, userInfo]);
    if (isVerifying) {
        return <div>Verifying authentication...</div>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;