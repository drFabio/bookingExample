import { Database } from 'sqlite3';
import {
  GET_AVAILABLE_PROPERTIES,
  GET_ALL_PROPERTIES,
  CHECK_BOOKED_PROPERTY,
  BOOK_PROPERTY,
  GET_SINGLE_PROPERTY,
  CANCEL_BOOKING
} from './queries';

export class BookingManager {
  private _db: Database;
  constructor(db: Database) {
    this._db = db;
  }
  getAllProperties(region?: any) {
    return new Promise((resolve, reject) => {
      this._db.all(GET_ALL_PROPERTIES, (err: Error, data: [any]) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
        return;
      });
    });
  }
  getAvailableProperties(start: Date, end: Date, region?: any) {
    return new Promise((resolve, reject) => {
      this._db.all(
        GET_AVAILABLE_PROPERTIES,
        { '@start': start, '@end': end },
        (err: Error, data: [any]) => {
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
  getProperty(id: String): Promise<Error | any> {
    return new Promise((resolve, reject) => {
      this._db.get(
        GET_SINGLE_PROPERTY,
        { '@id': id },
        (err: Error, data: [any]) => {
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
    start: Date,
    end: Date,
    people: Number
  ) {
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
    start: Date,
    end: Date,
    userId: string,
    propertyId: string,
    people: Number
  ) {
    const canBeBooked = await this.checkIfPropertyCanBeBooked(
      propertyId,
      start,
      end,
      people
    );
    if (!canBeBooked) {
      return false;
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
        (err: Error, data: any) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(data);
        }
      );
    });
  }
  async cancelBooking(id: string): Promise<boolean | Error> {
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
}
