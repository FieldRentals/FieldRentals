import React, { useEffect, useState } from "react";
import { getEquipmentData } from "../../../Firebase/firebbaseFunctions";
import "./OurCollection.css"; // Make sure to import the CSS file
import { StyledButton } from "../../../App";

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

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    // fetchData(); // Ensure fetchData is defined properly for re-use
  };

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={handleRetry}>Retry</button>
      </div>
    );

  return (
    <div className="OurCollectionContainer">
      <div className="OurCollectionTitle">Our Collection</div>
      <div className="OurCollectionSubContainer">
        {equipments.map((equipment) => (
          <div className="OurCollectionCardContainer" key={equipment.id}>
            <div className="OurCollectionCardImageContainer">
              <img
                className="OurCollectionCardImage"
                src={equipment.Image}
                alt={equipment.Name}
              />
            </div>
            <div className="OurCollectionCardTextContainer">
              <div className="OurCollectionCardTextEquipmentName">
                {equipment.Name}
              </div>
              <div>{equipment.Description}</div>
              <div>
                <b>Location: </b>
                {equipment.Location}
              </div>
              <div>
                <b>Price: </b>${equipment.Price} per day
              </div>
              <StyledButton
                variant="contained"
                disableElevation
                disableFocusRipple
                disableRipple
              >
                Book Now
              </StyledButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
