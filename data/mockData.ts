import { ParkingSpot, User } from '../types/types';

export const mockParkingSpots: ParkingSpot[] = [
  {
    id: '1',
    name: 'Downtown Parking Complex',
    address: '123 Main Street, Downtown',
    price: 5.99,
    available: 45,
    totalSpots: 100,
    rating: 4.5,
    reviews: [
      {
        id: '1',
        userId: '1',
        userName: 'John Doe',
        rating: 4,
        comment: 'Great location, easy to find spots',
        date: '2025-04-12',
        userAvatar: 'https://api.a0.dev/assets/image?text=profile_avatar_1&seed=123'
      }
    ],
    image: 'https://api.a0.dev/assets/image?text=modern_parking_structure_downtown&aspect=16:9',
    latitude: 37.7749,
    longitude: -122.4194,
    amenities: ['24/7 Access', 'Security Camera', 'EV Charging']
  },
  {
    id: '2',
    name: 'Central Station Parking',
    address: '456 Transport Ave',
    price: 4.99,
    available: 25,
    totalSpots: 75,
    rating: 4.2,
    reviews: [
      {
        id: '2',
        userId: '2',
        userName: 'Jane Smith',
        rating: 5,
        comment: 'Very convenient and well-lit',
        date: '2025-04-11',
        userAvatar: 'https://api.a0.dev/assets/image?text=profile_avatar_2&seed=456'
      }
    ],
    image: 'https://api.a0.dev/assets/image?text=modern_parking_station_night&aspect=16:9',
    latitude: 37.7833,
    longitude: -122.4167,
    amenities: ['Covered Parking', 'Valet Service', 'Car Wash']
  }
];

export const currentUser: User = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://api.a0.dev/assets/image?text=profile_avatar_3&seed=789',
  favorites: ['1'],
  bookings: [
    {
      id: '1',
      parkingSpotId: '1',
      userId: '1',
      startTime: '2025-04-13T10:00:00',
      endTime: '2025-04-13T18:00:00',
      status: 'confirmed',
      totalAmount: 47.92
    }
  ]
};