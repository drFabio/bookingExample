import { BookingManager } from '../../src/managers/BookingManager';
import {
  GET_AVAILABLE_PROPERTIES,
  GET_ALL_PROPERTIES,
  CHECK_BOOKED_PROPERTY,
  BOOK_PROPERTY
} from '../../src/managers/queries';
import { getProperty, getBookingDb } from '../utils';

const mockData = Symbol('data');
describe('BookingManager', () => {
  let mockDB: any = null;
  beforeEach(() => {
    const getSuccessCb = () =>
      jest.fn((...args) => args[args.length - 1](null, mockData));
    mockDB = {
      all: getSuccessCb(),
      get: getSuccessCb(),
      run: getSuccessCb()
    };
  });
  it("Get's all properties", async () => {
    const manager = new BookingManager(mockDB);
    await manager.getAllProperties();
    const callArgs = mockDB.all.mock.calls[0];
    expect(callArgs[0]).toEqual(GET_ALL_PROPERTIES);
  });
  it("Get's the available properties withing a date range", async () => {
    const manager = new BookingManager(mockDB);
    const start = new Date();
    const end = new Date();
    await manager.getAvailableProperties(start, end);
    const callArgs = mockDB.all.mock.calls[0];
    expect(callArgs[0]).toEqual(GET_AVAILABLE_PROPERTIES);
    expect(callArgs[1]).toEqual({
      '@start': start,
      '@end': end
    });
  });
  describe("Check's if a property is booked on a given period", () => {
    it('Returning true if unbooked', async () => {
      const manager = new BookingManager(mockDB);
      const start = new Date();
      const end = new Date();
      const propertyId = 'mockID';
      const people = 1;
      mockDB.get.mockImplementation((...args: any) =>
        args[args.length - 1](null, null)
      );
      manager.getProperty = jest.fn(() =>
        Promise.resolve(getProperty({ capacity: people }))
      );
      const canBeBooked = await manager.checkIfPropertyCanBeBooked(
        propertyId,
        start,
        end,
        people
      );
      expect(canBeBooked).toEqual(true);
      const callArgs = mockDB.get.mock.calls[0];
      expect(callArgs[0]).toEqual(CHECK_BOOKED_PROPERTY);
      expect(callArgs[1]).toEqual({
        '@start': start,
        '@end': end,
        '@id': propertyId
      });
    });
    it('Returning false if booked', async () => {
      const manager = new BookingManager(mockDB);
      const start = new Date();
      const end = new Date();
      const people = 1;

      const propertyId = 'mockID';
      manager.getProperty = jest.fn(() =>
        Promise.resolve(getProperty({ capacity: people }))
      );
      const canBeBooked = await manager.checkIfPropertyCanBeBooked(
        propertyId,
        start,
        end,
        people
      );
      expect(canBeBooked).toEqual(false);
      const callArgs = mockDB.get.mock.calls[0];
      expect(callArgs[0]).toEqual(CHECK_BOOKED_PROPERTY);
      expect(callArgs[1]).toEqual({
        '@start': start,
        '@end': end,
        '@id': propertyId
      });
    });
    it('Return false if capacity is below the wanted capacity', async () => {
      const manager = new BookingManager(mockDB);
      const start = new Date();
      const end = new Date();
      const people = 2;

      const propertyId = 'mockID';
      manager.getProperty = jest.fn(() =>
        Promise.resolve(getProperty({ capacity: 1 }))
      );
      const canBeBooked = await manager.checkIfPropertyCanBeBooked(
        propertyId,
        start,
        end,
        people
      );
      expect(canBeBooked).toEqual(false);
      expect(mockDB.get).not.toBeCalled();
    });
  });
  describe('Booking', () => {
    it('succeds on a unbooked property', async () => {
      const manager = new BookingManager(mockDB);
      manager.checkIfPropertyCanBeBooked = jest.fn(() => Promise.resolve(true));
      const start = new Date();
      const end = new Date();
      const propertyId = 'mockID';
      const userId = 'userId';
      const people = 1;

      const booked = await manager.book(start, end, userId, propertyId, people);
      expect(booked).toEqual(mockData);
      const callArgs = mockDB.run.mock.calls[0];
      expect(callArgs[0]).toEqual(BOOK_PROPERTY);
      expect(callArgs[1]).toEqual({
        '@user': userId,
        '@property': propertyId,
        '@start': start,
        '@end': end
      });
    });
    it('fails on a booked property', async () => {
      const manager = new BookingManager(mockDB);
      manager.checkIfPropertyCanBeBooked = jest.fn(() =>
        Promise.resolve(false)
      );
      const start = new Date();
      const end = new Date();
      const propertyId = 'mockID';
      const userId = 'userId';
      const people = 1;

      const booked = await manager.book(start, end, userId, propertyId, people);
      expect(booked).toEqual(false);
      expect(mockDB.run).not.toBeCalled();
    });
  });
  it('Can cancel a booking', async () => {
    const manager = new BookingManager(mockDB);
    const id = 'mockId';
    const succeeded = await manager.cancelBooking(id);
    expect(succeeded).toEqual(true);
  });
  it(' is listed', async () => {
    const manager = new BookingManager(mockDB);
    const responses = [
      getBookingDb({ id: 'mock_1' }),
      getBookingDb({ id: 'mockid_2' })
    ];
    mockDB.all.mockImplementation((...args: any) =>
      args[args.length - 1](null, responses)
    );
    const bookings = await manager.getAllBookings();
    expect(bookings).toEqual(responses.map(BookingManager.convertBooking));
  });
  it(' is listed for user', async () => {
    const manager = new BookingManager(mockDB);
    const mockUserId = 'mockUserId';
    const responses = [
      getBookingDb({ id: 'mock_1', user_id: mockUserId }),
      getBookingDb({ id: 'mockid_2', user_id: mockUserId })
    ];
    mockDB.all.mockImplementation((...args: any) =>
      args[args.length - 1](null, responses)
    );
    const bookings = await manager.getUserBookings(mockUserId);
    expect(bookings).toEqual(responses.map(BookingManager.convertBooking));
  });
});
