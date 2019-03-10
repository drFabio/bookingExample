import { createLogger, format, transports, Logger } from 'winston';

export function getLogger(): Logger {
  return createLogger({
    level: 'info',
    format: format.combine(format.colorize(), format.simple()),
    transports: [new transports.Console()]
  });
}
