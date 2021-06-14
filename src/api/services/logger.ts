import {
  createLogger, format, Logger, transports,
} from 'winston';
import { container } from 'tsyringe';

const { combine, timestamp, printf } = format;

export default async () => {
  const logFormat = printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`);
  /**
     * Creates a logger with the lowest level of logging set to debug and will print the logger to both the console and to a rolling file
     */
  const logger: Logger = createLogger({
    level: 'debug',
    transports: [
      new transports.Console({
        format: combine(
          format.colorize(),
          timestamp(),
          logFormat,
        ),
      }),
      new transports.File(
        {
          filename: 'logs/healthy-living.log',
          maxsize: 10000000,
          maxFiles: 10,
          format: combine(
            timestamp(),
            logFormat,
          ),
        },
      ),
    ],
  });

  container.register<Logger>('logger', { useValue: logger });
};
