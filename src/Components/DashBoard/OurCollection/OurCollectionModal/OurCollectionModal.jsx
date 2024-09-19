// Modal.js
import React, { useState, useEffect } from "react";
import "./OurCollectionModal.css"; // Add your CSS for styling
import { StyledButton } from "../../../../App";
import { Alert, Snackbar } from "@mui/material";

const ErrorPopup = ({ open, onClose, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      action={
        <button onClick={onClose} style={{ color: "white" }}>
          Close
        </button>
      }
    >
      <Alert onClose={onClose} severity="error">
        {message}
      </Alert>
    </Snackbar>
  );
};

const OurCollectionModal = ({ isOpen, onClose, equipment }) => {
  const [pickupDate, setPickupDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(1); // Default to 1 day
  const [dropOffDate, setDropOffDate] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (pickupDate && numberOfDays > 0) {
      const pickDate = new Date(pickupDate);
      const dropDate = new Date(pickDate);
      dropDate.setDate(pickDate.getDate() + numberOfDays);
      //   setDropOffDate(formatDate(dropDate)); // Use the formatDate function
    } else {
      setDropOffDate("");
    }
  }, [pickupDate, numberOfDays]);

  function handleNumberOfDaysInput(value) {
    setNumberOfDays(value);
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + parseInt(value));
    const day = String(futureDate.getDate());
    const month = String(futureDate.getMonth() + 1);
    const year = futureDate.getFullYear();
    const formattedFutureDate = `${day}/${month}/${year}`;
    setDropOffDate(formattedFutureDate);
  }

  function handleCheckout() {
    if (equipment.Price * numberOfDays === 0) {
      setErrorMessage("Please set number days greater than 0");
      setErrorOpen(true);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="OurCollectionModalOverlay">
      <div className="OurCollectionModalBackground" onClick={onClose} />
      <div className="OurCollectionModalContent">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        {equipment && (
          <div className="OurCollectionModalContainer">
            <div className="OurCollectionModalImageContainer">
              <img src={equipment.Image} alt={equipment.Name} />
            </div>
            <div className="OurCollectionModalContentContainer">
              <div className="OurCollectionModalTitle">{equipment.Name}</div>
              <div className="OurCollectionModalDescriptionContainer">
                {equipment.Description}
              </div>
              <div className="OurCollectionModalLocationContainer">
                <b>Location: </b>
                {equipment.Location}
              </div>
              <div className="OurCollectionModalPriceContainer">
                <b>Price: </b>${equipment.Price} per day
              </div>
              <div className="OurCollectionModalPickUpDateContainer">
                <b>Pick-up Date: </b>
                <input
                  type="date"
                  id="pickup-date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>
              <div className="OurCollectionModalNumberOfDaysContainer">
                <b>Number of Days: </b>
                <input
                  type="number"
                  id="number-of-days"
                  value={numberOfDays}
                  min="1" // Minimum value of 1 day
                  onChange={(e) => handleNumberOfDaysInput(e.target.value)}
                />
              </div>
              <div className="OurCollectionModalDropOffDateContainer">
                <b>Drop-off Date: </b>
                {dropOffDate || "Please pick up date and number of days"}
              </div>
              <div className="OurCollectionModalTotal">
                <b>Total: </b>
                <span>${equipment.Price * numberOfDays}</span>
              </div>
              <div className="OurCollectionModalButtonContainer">
                <StyledButton
                  variant="contained"
                  disableElevation
                  disableFocusRipple
                  disableRipple
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </StyledButton>
              </div>
            </div>
          </div>
        )}

        <ErrorPopup
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          message={errorMessage}
        />
      </div>
    </div>
  );
};

export default OurCollectionModal;
