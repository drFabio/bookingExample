import * as types from '../types';

const mockBookingA: types.Booking = {
  id: '  idA',
  property_id: '  property_idA',
  property_name: '  property_nameA',
  city: '  cityA'
};
const mockBookingB: types.Booking = {
  id: '  idB',
  property_id: '  property_idB',
  property_name: '  property_nameB',
  city: '  cityB'
};
export const resolvers = {
  Query: {
    bookings: () => [mockBookingA, mockBookingB]
  }
};
