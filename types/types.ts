export interface ParkingZone {
  id: string;
  name: string;
  code: string;
  color: string;
  pricePerHour: number;
  latitude: number;
  longitude: number;
}

export interface Vehicle {
  id: string;
  licensePlate: string;
  nickname: string;
}

export interface LoginForm {
  email: string;
  password: string;
}
