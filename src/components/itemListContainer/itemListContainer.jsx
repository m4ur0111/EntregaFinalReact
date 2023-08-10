import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/db';
import ItemList from '../itemList/itemList';

const ItemListContainer = () => {
    const { tipo } = useParams();
    const [items, setItems] = useState([]);
    let detallesPath;

    if (tipo === 'vuelos') {
        detallesPath = '/detallesVuelos';
    } else if (tipo === 'alojamientos') {
        detallesPath = '/detallesAlojamientos';
    } else {
        detallesPath = ''; 
    }

    useEffect(() => {
        const obtenerItems = async () => {
            let collectionRef;

            if (tipo === 'vuelos') {
                collectionRef = query(collection(db, 'items'), where('tipo', '==', 'Vuelo'));
            } else if (tipo === 'alojamientos') {
                collectionRef = query(collection(db, 'items'), where('tipo', '==', 'Hotel'));
            } else {
                collectionRef = collection(db, 'items');
            }

            try {
                const querySnapshot = await getDocs(collectionRef);
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setItems(data);

            } catch (error) {
                console.log(error);
            }
        };

        obtenerItems();
    }, [tipo]);

    return <ItemList items={items} detallesPath={detallesPath} />;
};

export default ItemListContainer;
