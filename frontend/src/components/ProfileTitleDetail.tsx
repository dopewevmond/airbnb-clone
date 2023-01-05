type Props = {
  title: string;
  detail: string;
  detailCapitalized?: boolean;
};

const ProfileTitleDetail = ({
  title,
  detail,
  detailCapitalized = true,
}: Props) => (
  <div className="row mb-3">
    <div className="col-12">
      <span className="fs-4 lh-lg" style={{ fontWeight: '500' }}>
        {title}
      </span>
    </div>
    <div className="col-12">
      <span
        style={{
          color: "#717171",
          textTransform: detailCapitalized ? "capitalize" : "none",
        }}
      >
        {detail}
      </span>
    </div>
  </div>
);

export default ProfileTitleDetail;
