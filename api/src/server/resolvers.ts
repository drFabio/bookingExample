import * as types from '../types';

export const resolvers = {
  Query: {
    availableProperties: async (
      parent: any,
      args: types.AvailablePropertiesParameters,
      context: types.Context
    ) => {
      return context.bookingManager.getAvailableProperties(
        args.start,
        args.end,
        args.minCapacity,
        args.location
      );
    },
    properties: async (parent: any, args: any, context: types.Context) => {
      return context.bookingManager.getAllProperties();
    },
    userBookings: async (parent: any, args: any, context: types.Context) => {
      return context.bookingManager.getUserBookings(args.user);
    }
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
          booking,
          id: booking.id
        };
      } catch (err) {
        return {
          success: false
        };
      }
    }
  }
};
