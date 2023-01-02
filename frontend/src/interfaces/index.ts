export interface IListing {
  id: number;
  city: string;
  country: string;
  night_rate: number;
  photos: {
    id: number;
    photo: IPhoto;
  }[];
}

export interface IPhoto {
  id: number;
  photo_uri: string;
}

export interface IAmenities {
  id: number;
  allows_pets: boolean;
  allows_smoking: boolean;
  allows_events: boolean;
  has_washing_machine: boolean;
  has_tv: boolean;
  has_wifi: boolean;
  has_workspace: boolean;
  has_kitchen: boolean;
  has_free_parking: boolean;
  has_security_cam: boolean;
  has_air_conditioning: boolean;
  has_smoke_alarm: boolean;
}

export interface IRoom {
  id: number;
  name: string;
  room_info: {
    king: number;
    queen: number;
    double: number;
    single: number;}
}

export interface IUser {
  id: number;
  first_name: string;
  last_name?: string;
  email_address?: string;
  phone_number?: string;
  profile_photo: string | null;
  created_at?: string
  native_language?: string
  secondary_language?: string
  bio?: string
  is_super_host?: boolean
  has_verified_email?: boolean
}

export interface IListingDetail extends IListing {
  name: string;
  description: string;
  created_at: string;
  listing_type: string;
  num_bathrooms: number;
  min_nights_stay: number;
  max_num_guests: number;
  time_check_in: string;
  time_check_out: string;
  owner: IUser;
  rooms: IRoom[];
  amenities: IAmenities;
}

export interface IReview {
  id: number
  created_at: string
  comment: string
  reply: string
  reviewer: IUser
}