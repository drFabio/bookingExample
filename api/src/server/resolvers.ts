import * as types from '../types';

export const resolvers = {
  Query: {
    availableProperties: async (
      parent: any,
      args: types.RangeParameters,
      context: types.Context
    ) => {
      return await context.bookingManager.getAvailableProperties(
        args.start,
        args.end
      );
    },
    properties: async (parent: any, args: any, context: types.Context) => {
      return await context.bookingManager.getAllProperties();
    },
    bookings: () => []
  },
  Mutation: {
    book: async (
      root: any,
      args: types.BookingRequest,
      context: types.Context
    ) => {
      try {
        const bookingId = await context.bookingManager.book(
          args.start,
          args.end,
          args.user,
          args.property,
          args.people
        );
        const booking = await context.bookingManager.getBooking(bookingId);
        return {
          success: true,
          booking
        };
      } catch (err) {
        return {
          success: false
        };
      }
    }
  }
};
