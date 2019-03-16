import { Database } from 'sqlite3';
import {
  GET_AVAILABLE_PROPERTIES,
  GET_ALL_PROPERTIES,
  CHECK_BOOKED_PROPERTY,
  BOOK_PROPERTY,
  GET_SINGLE_PROPERTY,
  CANCEL_BOOKING,
  GET_ALL_BOOKINGS,
  GET_USER_BOOKINGS,
  GET_SINGLE_BOOKING
} from './queries';
import * as types from '../types';
import { generateFakeLatLng } from '../utils/generateFakeLatLng';

export class BookingManager {
  private _db: Database;
  constructor(db: Database) {
    this._db = db;
  }
  static convertBooking(booking: types.BookingDB): types.Booking {
    const {
      city,
      capacity,
      email,
      user_id,
      property_id,
      user_name,
      property_name,
      ...other
    } = booking;
    return {
      ...other,
      user: {
        email,
        name: user_name,
        id: user_id
      },
      property: {
        id: property_id,
        name: property_name,
        capacity,
        city
      }
    };
  }
  getAllProperties(region?: any): Promise<types.Property[]> {
    return new Promise((resolve, reject) => {
      this._db.all(GET_ALL_PROPERTIES, (err: Error, data: types.Property[]) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
        return;
      });
    });
  }
  getAvailableProperties(
    start: string,
    end: string,
    minCapacity: number,
    location: types.Location
  ): Promise<types.Property[]> {
    return new Promise((resolve, reject) => {
      this._db.all(
        GET_AVAILABLE_PROPERTIES,
        { '@start': start, '@end': end, '@minCapacity': minCapacity },
        (err: Error, data: [any]) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(
            data.map(({ distance, ...other }) => {
              const propertyLocation = generateFakeLatLng(location, distance);
              return { ...other, location: propertyLocation };
            })
          );
          return;
        }
      );
    });
  }
  getProperty(id: String): Promise<types.Property> {
    return new Promise((resolve, reject) => {
      this._db.get(
        GET_SINGLE_PROPERTY,
        { '@id': id },
        (err: Error, data: types.Property) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
          return;
        }
      );
    });
  }
  async checkIfPropertyCanBeBooked(
    propertyId: String,
    start: types.DateStr,
    end: types.DateStr,
    people: Number
  ): Promise<boolean> {
    const propertyData = await this.getProperty(propertyId);
    if (propertyData.capacity < people) {
      return false;
    }
    return new Promise((resolve, reject) => {
      this._db.get(
        CHECK_BOOKED_PROPERTY,
        { '@start': start, '@end': end, '@id': propertyId },
        (err: Error, data: [any]) => {
          if (err) {
            reject(err);
            return;
          }
          if (data) {
            resolve(false);
            return;
          }
          resolve(true);
          return;
        }
      );
    });
  }
  async book(
    start: types.DateStr,
    end: types.DateStr,
    userId: string,
    propertyId: string,
    people: Number
  ): Promise<string> {
    const canBeBooked = await this.checkIfPropertyCanBeBooked(
      propertyId,
      start,
      end,
      people
    );
    if (!canBeBooked) {
      throw new Error("Can't be booked");
    }
    return new Promise((resolve, reject) => {
      this._db.run(
        BOOK_PROPERTY,
        {
          '@user': userId,
          '@property': propertyId,
          '@start': start,
          '@end': end
        },
        function(err: Error) {
          if (err) {
            reject(err);
            return;
          }
          resolve(`${this.lastID}`);
        }
      );
    });
  }
  async cancelBooking(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._db.run(
        CANCEL_BOOKING,
        {
          '@id': id
        },
        (err: Error, data: any) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(true);
        }
      );
    });
  }
  async getAllBookings(
    convert: boolean = true
  ): Promise<types.Booking[] | types.BookingDB[]> {
    return new Promise((resolve, reject) => {
      this._db.all(GET_ALL_BOOKINGS, (err: Error, data: types.BookingDB[]) => {
        if (err) {
          reject(err);
          return;
        }
        let resp: types.Booking[] | types.BookingDB[] = data;
        if (convert) {
          resp = data.map(BookingManager.convertBooking);
        }
        resolve(resp);
        return;
      });
    });
  }
  async getUserBookings(
    user: string,
    convert: boolean = true
  ): Promise<types.Booking[] | types.BookingDB[]> {
    return new Promise((resolve, reject) => {
      this._db.all(
        GET_USER_BOOKINGS,
        { '@user': user },
        (err: Error, data: types.BookingDB[]) => {
          if (err) {
            reject(err);
            return;
          }
          let resp: types.Booking[] | types.BookingDB[] = data;
          if (convert) {
            resp = data.map(BookingManager.convertBooking);
          }
          resolve(resp);
          return;
        }
      );
    });
  }
  async getBooking(id: string): Promise<types.Booking> {
    return new Promise((resolve, reject) => {
      this._db.get(
        GET_SINGLE_BOOKING,
        { '@id': id },
        (err: Error, data: types.BookingDB) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(BookingManager.convertBooking(data));
          return;
        }
      );
    });
  }
}
