const winston= require('winston');

const { combine, timestamp, label, prettyPrint, printf } = winston.format;

const attributes = {'key_1': 'value_1', 'key_2': 'value_2'}


// const logFormat = winston.format.combine(
//   label({ label: 'right meow!', other: 'asasdasd' }),  
//     timestamp(),
//     winston.format.json(),
//     prettyPrint()
// );

const myFormat = printf(({ level, message, label, timestamp, attributes }) => {
  return `{ timestamp: '${timestamp}', label: [${label}], level: ${level}, message: ${message} }`;
});


const Logger = winston.createLogger({
  level: 'debug',
  format: myFormat,///logFormat,//winston.format.json(),
  defaultMeta: { service: 'user-service', other_service: 'other services' },
  
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.Console(),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== 'production') {
//   Logger.add(new winston.transports.Console({
//     format: winston.format.json(),
//   }));
// }
export default Logger;