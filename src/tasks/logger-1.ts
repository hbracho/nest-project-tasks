import { Logger } from '@nestjs/common';
import Winston, { format, transports, createLogger } from 'winston';

export class LoggerWinston extends Logger {
  logger: Winston.Logger;

  constructor() {
    super();
    const transport = new transports.Console();
    this.logger = createLogger({
      format: format.json(),
      transports: [transport],
    });
  }
  now(): number {
    const now = new Date();
    return now.getTime();
  }

  log(message: any, ctx: string): void {
    console.log('harold bracho')
    console.log(ctx)
    if (typeof message === 'string') {
      message = { attributes: { message } };
    }
    const msg = message.message || ctx;
    this.logger.info(msg, {
      ...message,
      timestamp: this.now(),
    });
  }

  error(message: any, trace?: string, ctx?: string): void {
    if (typeof message === 'string') {
      message = { attributes: { message } };
    }
    const msg = message.message || ctx;
    this.logger.error(msg, {
      ...message,
      trace,
      timestamp: this.now(),
    });
  }

  writeLog(level: string, body: any): void {
    this.logger.log(level, body);
  }
}
