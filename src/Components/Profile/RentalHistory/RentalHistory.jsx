import React, { useState, useEffect } from "react";
import { useAuth } from "../../../AuthContext";
import { getRentalHistory } from "../../../Firebase/firebbaseFunctions"; // Import the new function
import "./RentalHistory.css";
import Loading from "../../Loading/Loading";

const RentalHistory = () => {
  const [rentalHistory, setRentalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchRentalHistory = async () => {
      setLoading(true); // Set loading to true before fetching
      const rentalHistoryData = await getRentalHistory(currentUser.uid);
      setRentalHistory(rentalHistoryData);
      setLoading(false); // Set loading to false after fetching
    };

    fetchRentalHistory();
  }, [currentUser.uid]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="RentalHistoryContainer">
      {rentalHistory.length > 0 ? (
        rentalHistory.map((rental, index) => (
          <div className="RentalHistoryCard" key={index}>
            <img
              className="RentalHistoryCardImageContainer"
              src={rental.equipmentImage}
              alt="Equipment Image"
            />
            <div className="RentalHistoryCardTextContainer">
              <span>
                <b>Equipment Name:</b> {rental.equipmentName}
              </span>
              <span>
                <b>Pick Up Date:</b> {rental.pickUpDate}
              </span>
              <span>
                <b>Drop Off Date:</b> {rental.dropOffDate}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="RentalHistoryContainerTitle">
          No rental history found for this user.
        </div>
      )}
    </div>
  );
};

export default RentalHistory;
