import { BookingManager } from '../../src/managers/BookingManager';
import {
  GET_AVAILABLE_PROPERTIES,
  GET_ALL_PROPERTIES,
  CHECK_BOOKED_PROPERTY,
  BOOK_PROPERTY
} from '../../src/managers/queries';

const mockData = Symbol('data');
describe('BookingManager', () => {
  let mockDB: any = null;
  beforeEach(() => {
    const successCB = jest.fn((...args) =>
      args[args.length - 1](null, mockData)
    );
    mockDB = {
      all: successCB,
      get: successCB,
      run: successCB
    };
  });
  it("Get's all properties", async () => {
    const manager = new BookingManager(mockDB);
    const start = new Date();
    const end = new Date();
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
      mockDB.get.mockImplementation((...args: any) =>
        args[args.length - 1](null, null)
      );
      const canBeBooked = await manager.checkIfPropertyCanBeBooked(
        propertyId,
        start,
        end
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
      const propertyId = 'mockID';
      const canBeBooked = await manager.checkIfPropertyCanBeBooked(
        propertyId,
        start,
        end
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
  });
  describe('Booking', () => {
    it('succeds on a unbooked property', async () => {
      const manager = new BookingManager(mockDB);
      manager.checkIfPropertyCanBeBooked = jest.fn(() => Promise.resolve(true));
      const start = new Date();
      const end = new Date();
      const propertyId = 'mockID';
      const userId = 'userId';
      const booked = await manager.book(start, end, userId, propertyId);
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
      const booked = await manager.book(start, end, userId, propertyId);
      expect(booked).toEqual(false);
      expect(mockDB.run).not.toBeCalled();
    });
  });
  it.todo("Can't book a booked property");
  it.todo('Can cancel a booking');
  it.todo("Can't book if the capacity is below the booking ");
});
