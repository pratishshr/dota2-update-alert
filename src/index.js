/**
 * @author Pratish Shrestha <pratishshrestha@lftechnology.com>
 */
import  { parseString } from 'xml2js';

import * as httpUtil from './util/httpUtil';
import * as mailUtil from './util/mailUtil';
import * as loggerUtil from './util/loggerUtil';

const config = require('./../config.json');
import generateTemplate from './generateTemplate';

const FEED_URL = 'http://store.steampowered.com/feeds/news.xml';

// Keep track of the last update IDs to avoid sending the same notification
let lastUpdateIds = [];

function init() {
  loggerUtil.info('Fetching RSS Feed');

  httpUtil.get(FEED_URL).then((response) => {
    return parseRSSFeed(response.data);
  }).then((requiredItems) => {
    loggerUtil.info('Parsing RSS Feed');
    return getNewItems(requiredItems);
  }).then((newItems) => {
    if (newItems.length) {
      loggerUtil.info('Sending mail');
      sendMail(newItems);
    } else {
      loggerUtil.info('No new updates found.')
    }
  }).catch((error) => {
    loggerUtil.error(error);
  });
}

function parseRSSFeed(feed) {
  return new Promise((resolve, reject) => {
    parseString(feed, (err, result) => {
      if (err) {
        reject();
      }
      let requiredItems = result['rdf:RDF'].item.filter((item) => {
        return item.title[0].includes('Dota 2 Update');
      });

      resolve(requiredItems);
    });
  });
}

function getNewItems(requiredItems) {
  let items = [];
  requiredItems.forEach((item) => {
    if (!lastUpdateIds.includes(item.link[0])) {
      lastUpdateIds.push(item.link[0]);
      items.push(item);
    }
  });
  return items;
}

function sendMail(items) {
  items.forEach((item) => {
    let options = {
      host: 'localhost',
      port: 25,
      tls: {
        rejectUnauthorized: false
      },
      from: '"dota2LF" <dota2LF@lftechnology.com>',
      to: 'dota2@lftechnology.com',
      subject: 'Dota 2 Update',
      htmlContent: generateTemplate(item)
    };

    return mailUtil.sendMail(options).then((responseInfo) => {
      loggerUtil.info(responseInfo)
    })
  });
}

init();
setInterval(() => {
  init();
}, 5 * 60 * 1000);


