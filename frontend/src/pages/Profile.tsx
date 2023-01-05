import { useContext, useState } from "react";
import moment from "moment";
import { Modal } from "react-bootstrap";
import { useAppSelector } from "../redux/store";
import { AuthContext } from "../context/AuthContext";
import { DEFAULT_AVI } from "../utils/constants";
import ProfileTitleDetail from "../components/ProfileTitleDetail";
import EditProfileModal from "../components/EditProfileModal";
import {
  fetchProfile,
  selectProfile,
  selectProfileError,
  selectProfileStatus,
} from "../redux/profileSlice";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/store";

export const Profile = () => {
  const { id, role } = useContext(AuthContext);

  const dispatch = useAppDispatch();
  const profileDetails = useAppSelector(selectProfile);
  const status = useAppSelector(selectProfileStatus);
  const error = useAppSelector(selectProfileError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProfile(Number(id)));
    }
  }, [id]);

  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);

  if (status === "loading") return <div className="container"> Loading...</div>;
  if (error != null) return <div className="alert alert-danger">{error}</div>;
  if (profileDetails == null)
    return <div className="container">Profile was not found</div>;
  return (
    <div className="container">
      <div style={{ margin: "3em 0" }}>
        <h2>Account</h2>
        <div style={{ width: "200px", height: "200px", marginBottom: "1em" }}>
          <img
            src={profileDetails.profile_photo ?? DEFAULT_AVI}
            alt="avatar"
            className="img-fluid img-thumbnail"
          />
        </div>
        <div className="my-2">
          {profileDetails.first_name + " " + profileDetails.last_name}
          {"  "}
          {profileDetails.has_verified_email ? (
            <span className="badge bg-success">Verified email</span>
          ) : (
            <span className="badge bg-warning">Unverified email</span>
          )}
          {"  "}
          {role === "host" ? (
            <>
              {profileDetails.is_super_host ? (
                <div className="badge bg-success">Superhost</div>
              ) : (
                <div className="badge bg-warning">Not superhost</div>
              )}
            </>
          ) : null}
          {profileDetails.bio && (
            <div className="mt-2">{profileDetails.bio}</div>
          )}
        </div>
        <p style={{ fontSize: "0.9em", color: "#717171" }}>
          Member since {moment(profileDetails.created_at).format("MMMM YYYY")}{" "}
        </p>
        <button className="btn btn-sm btn-primary" onClick={toggleModal}>
          Edit profile
        </button>
        <hr />
        {profileDetails.email_address && (
          <ProfileTitleDetail
            title="Email"
            detail={profileDetails.email_address}
            detailCapitalized={false}
          />
        )}

        {profileDetails.native_language && (
          <ProfileTitleDetail
            title="Native language"
            detail={profileDetails.native_language}
          />
        )}

        {profileDetails.phone_number && (
          <ProfileTitleDetail
            title="Phone Number"
            detail={profileDetails.phone_number}
          />
        )}
      </div>

      <Modal
        show={show}
        onHide={toggleModal}
        backdrop="static"
        keyboard={false}
      >
        <EditProfileModal closeModal={toggleModal} />
      </Modal>
    </div>
  );
};
