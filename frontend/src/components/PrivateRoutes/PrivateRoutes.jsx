import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

export default function PrivateRoutes() {

    const auth = useAuth();
    const navigate = useNavigate();
 
    useEffect(() => {
        auth.verifyUser()
    }, [auth.verify])
    
    if (auth.verify) {
        return children;
      } else {
        Navigate('/login')
      }
}
