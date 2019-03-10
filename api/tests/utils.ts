import * as types from '../src/types';

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
  start: new Date(),
  end: new Date(),
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
