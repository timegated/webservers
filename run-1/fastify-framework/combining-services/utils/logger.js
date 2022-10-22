const fs = require('fs');


class Logger {
  requestLog (fileType, msg) {
    fs.writeFileSync(fileType, msg);
  }
}

module.exports = Logger;