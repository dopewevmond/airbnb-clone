import { IRoom } from "../interfaces";

type Props = {
  rooms: IRoom[];
};

export const Rooms = ({ rooms }: Props) => (
  <div className="row">
    {rooms.map((room, idx) => (
      <div key={room.name + idx} className="col-6 col-md-3">
        <div className="border rounded px-2 py-1">
          <p className="p-0 m-0">{room.name}</p>
          <ul className="pl-1">
            {Object.entries(room.room_info)
              .filter((roomKey) => roomKey[1] > 0)
              .map((roomKey, idx) => (
                <li key={room.name + roomKey[0] + idx}>
                  {roomKey[1]} {roomKey[0]} {roomKey[1] === 1 ? "bed" : "beds"}
                </li>
              ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
);
