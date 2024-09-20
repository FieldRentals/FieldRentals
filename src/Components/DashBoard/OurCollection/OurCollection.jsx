import React, { useEffect, useState } from "react";
import { getEquipmentData } from "../../../Firebase/firebbaseFunctions";
import "./OurCollection.css";
import { StyledButton } from "../../../App";
import OurCollectionModal from "./OurCollectionModal/OurCollectionModal";
import Loading from "../../Loading/Loading";

export default function OurCollection() {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

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
    // fetchData();
  };

  const handleBookClick = (equipment) => {
    setSelectedEquipment(equipment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEquipment(null);
  };

  const totalPages = Math.ceil(equipments.length / itemsPerPage);
  const currentItems = equipments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading) return <Loading />;
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
        {currentItems.map((equipment, i) => (
          <div className="OurCollectionCardContainer" key={i}>
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
                onClick={() => handleBookClick(equipment)}
              >
                Book Now
              </StyledButton>
            </div>
          </div>
        ))}
      </div>
      <div className="OurCollectionContainerPaginationContainer">
        <StyledButton
          variant="contained"
          disableElevation
          disableFocusRipple
          disableRipple
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </StyledButton>

        <span>{` Page ${currentPage} of ${totalPages} `}</span>
        <StyledButton
          variant="contained"
          disableElevation
          disableFocusRipple
          disableRipple
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </StyledButton>
      </div>
      <OurCollectionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        equipment={selectedEquipment}
      />
    </div>
  );
}
