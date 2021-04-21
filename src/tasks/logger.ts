import { Logger } from '@nestjs/common';
import Winston, { format, transports, createLogger } from 'winston';

export class LoggerWinston extends Logger {
  logger: Winston.Logger;

  constructor() {
    super();
    const transport = new transports.Console();
    this.logger = createLogger({
      level: 'debug',
      format: format.combine(format.json(), ),
      transports: [transport],
    });
  }
  now(): number {
    const now = new Date();
    return now.getTime();
  }
  
  log(message: any, ctx: string): void {
    
    if (typeof message === 'string') {
      this.logger.info({message, loggerName: ctx,timeMillis: this.now()});
    } else{
      this.logger.info({...message, loggerName: ctx,timeMillis: this.now()});
    } 
  }

  debug(message: any, context?: string){
    if (typeof message === 'string') {
      this.logger.debug({message, loggerName: context,timeMillis: this.now()});
    } else{
      this.logger.debug({...message, loggerName: context,timestamp: this.now()});
    } 
  }

  error(message: any, trace?: string, ctx?: string): void {
    
    if (typeof message === 'string') {
      
      this.logger.error({
        message,
        loggerName: ctx,
        trace,
        timeMillis: this.now(),
      });

    } else {
      this.logger.error({
        ... message,
        loggerName: ctx,        
        timeMillis: this.now(),
      });
    }    
    
  }
  

  writeLog(level: string, body: any): void {
    this.logger.log(level, body);
  }
}
