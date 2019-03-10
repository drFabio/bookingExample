import { Database } from 'sqlite3';
import {
  GET_AVAILABLE_PROPERTIES,
  GET_ALL_PROPERTIES,
  CHECK_BOOKED_PROPERTY,
  BOOK_PROPERTY
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
  checkIfPropertyCanBeBooked(propertyId: String, start: Date, end: Date) {
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
  async book(start: Date, end: Date, userId: string, propertyId: string) {
    const canBeBooked = await this.checkIfPropertyCanBeBooked(
      propertyId,
      start,
      end
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
  async getProperties(region: any) {}
}
