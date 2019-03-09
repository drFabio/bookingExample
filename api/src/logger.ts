import { createLogger, format, transports } from 'winston';

export function getLogger() {
  return createLogger({
    level: 'info',
    format: format.combine(format.colorize(), format.simple()),
    transports: [new transports.Console()]
  });
}
