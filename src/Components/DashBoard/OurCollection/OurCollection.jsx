import React, { useEffect, useState } from 'react'
import { getEquipmentData } from '../../../Firebase/firebbaseFunctions'


export default function OurCollection() {
    const [equipments, setEquipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEquipmentData();
                setEquipments(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <div className='OurCollectionT'>Our Collection</div>
            <ul>
                {equipments.map((equipment, index) => (
                    <li key={index}>
                        <img src={equipment.Image} alt="eimg" />
                        <h2>{equipment.Name}</h2>
                        <p>{equipment.Description}</p>
                        <p>{equipment.Location}</p>
                        <p>{equipment.Price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};


