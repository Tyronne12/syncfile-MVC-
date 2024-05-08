// fileUtils.js

const path = require('path');

const getMimeType = (fileName) => {
  const ext = path.extname(fileName).toLowerCase();
  switch (ext) {
    case '.pdf':
      return 'pdf';
    case '.doc':
    case '.docx':
      return 'word';
    case '.ppt':
      return 'powerpoint';
    case '.xls':
    case '.xlsx':
      return 'spreadsheet';
    case '.txt':
      return 'text';
    case '.png':
    case '.jpg':
    case '.jpeg':
    case '.gif':
      return 'image'; 
    default:
      return 'other'; 
  }
};

module.exports = { getMimeType };
