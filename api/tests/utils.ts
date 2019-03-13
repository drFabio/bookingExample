import * as types from '../src/types';
export const mockData = Symbol('data');
export const mockStartDate = '2019-01-01';
export const mockEndDate = '2020-01-01';

const propertyDefaults = {
  id: 'mock_id',
  name: 'mock_property_name',
  city: 'mock_city',
  capacity: 1
};
export function getProperty(p?: Partial<types.Property>): types.Property {
  return {
    ...propertyDefaults,
    ...p
  };
}
const bookingDbDefaults = {
  id: 'mock_id',
  start: mockStartDate,
  end: mockEndDate,
  canceled: false,
  city: 'mock_city',
  capacity: 1,
  email: 'mock_email',
  user_id: 'mock_user_id',
  user_name: 'mock_user_name',
  property_id: 'mock_property_id',
  property_name: 'mock_property_name'
};

export function getBookingDb(b?: Partial<types.BookingDB>): types.BookingDB {
  return {
    ...bookingDbDefaults,
    ...b
  };
}
