import { IAmenities } from "../interfaces";
import { AmenityCard } from "./AmenityCard";
import {
  AC,
  Events,
  FreeParking,
  Kitchen,
  Pets,
  SecurityCam,
  SmokeAlarm,
  Smoking,
  TV,
  WashingMachine,
  WiFi,
  Workspace,
} from "./AmenityIcons";

export const Amenities = (amenitySet: IAmenities) => (
  <>
    {amenitySet.has_security_cam ? (
      <div className="col-12 col-md-6" style={{ paddingBottom: '15px' }}>
        <AmenityCard
          icon={<SecurityCam />}
          text="Has security cam on premises"
        />
      </div>
    ) : null}

    {amenitySet.allows_pets ? (
      <div className="col-12 col-md-6" style={{ paddingBottom: '15px' }}>
        <AmenityCard icon={<Pets />} text="Pets are allowed" />
      </div>
    ) : null}

    {amenitySet.allows_smoking ? (
      <div className="col-12 col-md-6" style={{ paddingBottom: '15px' }}>
        <AmenityCard icon={<Smoking />} text="Allows smoking on premises" />
      </div>
    ) : null}

    {amenitySet.allows_events ? (
      <div className="col-12 col-md-6" style={{ paddingBottom: '15px' }}>
        <AmenityCard icon={<Events />} text="You can host events here" />
      </div>
    ) : null}

    {amenitySet.has_washing_machine ? (
      <div className="col-12 col-md-6" style={{ paddingBottom: '15px' }}>
        <AmenityCard
          icon={<WashingMachine />}
          text="Washing machine available"
        />
      </div>
    ) : null}

    {amenitySet.has_tv ? (
      <div className="col-12 col-md-6" style={{ paddingBottom: '15px' }}>
        <AmenityCard icon={<TV />} text="HDTV with cable and satellite TV" />
      </div>
    ) : null}

    {amenitySet.has_wifi ? (
      <div className="col-12 col-md-6" style={{ paddingBottom: '15px' }}>
        <AmenityCard icon={<WiFi />} text="Fast Wi-Fi available" />
      </div>
    ) : null}

    {amenitySet.has_workspace ? (
      <div className="col-12 col-md-6" style={{ paddingBottom: '15px' }}>
        <AmenityCard icon={<Workspace />} text="Dedicated workspace" />
      </div>
    ) : null}

    {amenitySet.has_kitchen ? (
      <div className="col-12 col-md-6" style={{ paddingBottom: '15px' }}>
        <AmenityCard icon={<Kitchen />} text="Kitchen with utensils" />
      </div>
    ) : null}

    {amenitySet.has_free_parking ? (
      <div className="col-12 col-md-6" style={{ paddingBottom: '15px' }}>
        <AmenityCard icon={<FreeParking />} text="Free parking on premises" />
      </div>
    ) : null}

    {amenitySet.has_security_cam ? (
      <div className="col-12 col-md-6" style={{ paddingBottom: '15px' }}>
        <AmenityCard
          icon={<SecurityCam />}
          text="Security cameras available to monitor activity"
        />
      </div>
    ) : null}

    {amenitySet.has_air_conditioning ? (
      <div className="col-12 col-md-6" style={{ paddingBottom: '15px' }}>
        <AmenityCard icon={<AC />} text="Air conditioning" />
      </div>
    ) : null}

    {amenitySet.has_smoke_alarm ? (
      <div className="col-12 col-md-6" style={{ paddingBottom: '15px' }}>
        <AmenityCard icon={<SmokeAlarm />} text="Has smoke alarm" />
      </div>
    ) : null}
  </>
);
