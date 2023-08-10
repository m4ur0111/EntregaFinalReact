import React, { useEffect, useState } from 'react';
import { auth } from '../../services/db'; 
import './style.css';
import ProfileOrders from '../historialOrdenes/ordenes';

const Profile = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserId(user.uid);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="profile-container">
            <h1 className="profile-heading">Mi Perfil</h1>
            <div className="profile-content">
                {userId ? <ProfileOrders customerId={userId} /> : <p>Cargando...</p>}
            </div>
        </div>
    );
};

export default Profile;
