import React, { useState, useEffect } from "react";
import { useAuth } from "../../../AuthContext";
import {
  getUserEquipment,
  relistEquipment,
} from "../../../Firebase/firebbaseFunctions"; // Import the new function
import "./EquipmentInventory.css";
import Loading from "../../Loading/Loading";
import { StyledButton } from "../../../App";

const EquipmentInventory = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchEquipment = async () => {
      setLoading(true); // Start loading
      const equipmentData = await getUserEquipment(currentUser.uid);
      setEquipmentList(equipmentData);
      setLoading(false); // Stop loading
    };

    fetchEquipment();
  }, [currentUser.uid]);

  const handleRelist = async (equipmentId) => {
    try {
      // Disable the button by updating the state
      setEquipmentList((prevList) =>
        prevList.map((item) =>
          item.EquipmentId === equipmentId
            ? { ...item, relisting: true } // Add relisting state
            : item
        )
      );

      await relistEquipment(equipmentId);
      // Fetch the updated equipment list
      const updatedEquipmentData = await getUserEquipment(currentUser.uid);
      setEquipmentList(updatedEquipmentData);
    } catch (error) {
      console.error("Failed to relist equipment:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  function parseDate(dateString) {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}`); // Convert to YYYY-MM-DD format
  }

  return (
    <div className="EquipmentInventoryContainer">
      {equipmentList.length > 0 ? (
        equipmentList.map((equipment, index) => (
          <div className="EquipmentInventoryCard" key={index}>
            <img
              className="EquipmentInventoryCardImageContainer"
              src={equipment.Image}
              alt="Equipment Image"
            />
            <div className="EquipmentInventoryCardTextContainer">
              <span>
                <b>Equipment Name:</b>
                <br />
                {equipment.Name}
              </span>
              <span>
                <b>Description:</b>
                <br />
                {equipment.Description}
              </span>
              <span>
                <b>Location:</b> {equipment.Location}
              </span>
              <span>
                <b>Price:</b> ${equipment.Price}
              </span>
              <span>
                <b>Status:</b> {equipment.Status}
              </span>
              {equipment.Status === "Not Available" &&
                equipment.dropOffDate && (
                  <span>
                    <b>Drop-off Date:</b> {equipment.dropOffDate}
                  </span>
                )}
              {equipment.Status === "Not Available" &&
                equipment.dropOffDate &&
                parseDate(equipment.dropOffDate) < new Date() && (
                  <StyledButton
                    variant="contained"
                    disableElevation
                    disableFocusRipple
                    disableRipple
                    onClick={() => handleRelist(equipment.EquipmentId)}
                    disabled={equipment.relisting || loading} // Disable if relisting or loading
                  >
                    {equipment.relisting ? "Relisting..." : "Relist Equipment"}
                  </StyledButton>
                )}
            </div>
          </div>
        ))
      ) : (
        <div className="EquipmentInventoryContainerTitle">
          No equipment owned by this user.
        </div>
      )}
    </div>
  );
};

export default EquipmentInventory;
