import * as types from '../types';

export const resolvers = {
  Query: {
    properties: async (parent: any, args: any, context: types.Context) => {
      return await context.bookingManager.getAllProperties();
    },
    bookings: () => []
  }
};
