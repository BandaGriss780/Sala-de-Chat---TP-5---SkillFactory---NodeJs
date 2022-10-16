const dayjs = require('dayjs');
const es = require("dayjs/locale/es");
dayjs.locale(es);

function formatMessage(username, text) {
  return {
    username,
    text,
    time: dayjs().format("DD/MM/YYYY hh:mm:ss:a")
  };
}

module.exports = formatMessage;