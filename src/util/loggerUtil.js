import winston from 'winston';

winston.configure({
  transports: [
    new winston.transports.File({ filename: './logs/rss.log', colorize: true, json: false }),
    new winston.transports.Console()
  ]
});

export function info(message) {
  winston.log('info', message);
}

export function error(message) {
  winston.log('error', message);
}
