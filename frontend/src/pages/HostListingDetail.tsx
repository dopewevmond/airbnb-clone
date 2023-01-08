import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AddAmenitiesForm } from "../components/AddAmenitiesForm";
import { AddRoomForm } from "../components/AddRoomForm";
import { FullPageLoader } from "../components/FullPageLoader";
import { ListingDetailForm } from "../components/ListingDetailForm";
import ProfileTitleDetail from "../components/ProfileTitleDetail";
import { Rooms } from "../components/Rooms";
import { UploadImgForm } from "../components/UploadImgForm";
import {
  useHostListingDetails,
  useHostListingFormModals,
} from "../hooks/useListing";

const HostListingDetail = () => {
  const { id } = useParams();
  const { listing, status, error, initialFormValues } = useHostListingDetails();
  const {
    show,
    modalContent,
    setShow,
    showModal,
    handleListingAvailability,
    handleEditSubmit,
    handleAddRoom,
    handleFileSubmit,
    handleAddAmenities,
  } = useHostListingFormModals(Number(id));

  if (status === "loading") return <FullPageLoader />;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (listing == null)
    return <div className="alert alert-danger">Listing was not found</div>;

  return (
    <div className="container">
      <h2 className="fs-2 mt-2 mb-4">{listing.name}</h2>

      {listing.is_accepting_bookings ? (
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => handleListingAvailability(false)}
        >
          Deactivate listing
        </button>
      ) : (
        <button
          className="btn btn-sm btn-success"
          onClick={() => handleListingAvailability(true)}
        >
          Publish listing
        </button>
      )}
      <button
        className="ms-2 btn btn-sm btn-danger"
        onClick={() => {
          showModal("editListing");
        }}
      >
        Edit listing
      </button>
      {!listing.amenities && (
        <button
          className="ms-2 btn btn-warning btn-sm"
          onClick={() => {
            showModal("addAmenities");
          }}
        >
          Add amenities
        </button>
      )}
      <button
        className="ms-2 btn btn-primary btn-sm"
        onClick={() => {
          showModal("addRoom");
        }}
      >
        Add room
      </button>
      <button
        className="ms-2 btn btn-info btn-sm"
        onClick={() => showModal("addPhoto")}
      >
        Add photo
      </button>

      {listing.photos && listing.photos.length > 0 && (
        <>
          <div>
            <span className="fs-4 lh-lg" style={{ fontWeight: "500" }}>
              Photos
            </span>
          </div>
          <div className="d-flex" style={{ gap: "1em" }}>
            {listing.photos.map((photo) => (
              <div
                style={{ flexBasis: "100px" }}
                key={"photos of " + listing.name + photo.id}
              >
                <img
                  className="img-fluid img-thumbnail"
                  src={photo.photo.photo_uri}
                  alt={listing.name}
                />
              </div>
            ))}
          </div>
        </>
      )}
      {listing.rooms && listing.rooms.length > 0 && (
        <>
          <div>
            <span className="fs-4 lh-lg" style={{ fontWeight: "500" }}>
              Rooms
            </span>
          </div>
          <Rooms rooms={listing.rooms} />
        </>
      )}
      <ProfileTitleDetail title="Description" detail={listing.description} />
      <ProfileTitleDetail title="Address" detail={listing.address} />
      <ProfileTitleDetail title="Street" detail={listing.street} />
      <ProfileTitleDetail title="City" detail={listing.city} />
      <ProfileTitleDetail title="Country" detail={listing.country} />
      <ProfileTitleDetail title="Region" detail={listing.region} />
      <ProfileTitleDetail
        title="Type of listing"
        detail={listing.listing_type}
      />
      <ProfileTitleDetail
        title="Is listing fully private"
        detail={listing.fully_private_listing ? "Yes" : "No"}
      />
      <ProfileTitleDetail
        title="Minimum nights of stay"
        detail={String(listing.min_nights_stay)}
      />
      <ProfileTitleDetail
        title="Number of bathrooms"
        detail={String(listing.num_bathrooms)}
      />
      <ProfileTitleDetail
        title="Maximum number of guests"
        detail={String(listing.max_num_guests)}
      />
      <ProfileTitleDetail
        title="Rate per night"
        detail={String(listing.night_rate)}
      />

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        backdrop
        keyboard={true}
      >
        {modalContent != null ? (
          <>
            {modalContent === "editListing" ? (
              <>
                <Modal.Header closeButton>
                  <Modal.Title>Edit listing</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ListingDetailForm
                    initialValues={initialFormValues}
                    handleSubmit={handleEditSubmit}
                    submitButtonValue="Save changes"
                  />
                </Modal.Body>
              </>
            ) : null}

            {modalContent === "addPhoto" ? (
              <>
                <Modal.Header closeButton>
                  <Modal.Title>Upload image to listing</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <UploadImgForm handleSubmit={handleFileSubmit} />
                </Modal.Body>
              </>
            ) : null}

            {modalContent === "addRoom" ? (
              <>
                <Modal.Header closeButton>
                  <Modal.Title>Add a room to the listing</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <AddRoomForm handleSubmit={handleAddRoom} />
                </Modal.Body>
              </>
            ) : null}

            {modalContent === "addAmenities" ? (
              <>
                <Modal.Header closeButton>
                  <Modal.Title>Add amenities to the listing</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <AddAmenitiesForm handleSubmit={handleAddAmenities} />
                </Modal.Body>
              </>
            ) : null}
          </>
        ) : null}
      </Modal>
    </div>
  );
};

export default HostListingDetail;
