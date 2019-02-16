const csvParser = require('json2csv').Parser;
const fs = require('fs');

const checkDataDir = (writeLog) => {
  if(fs.existsSync('./data/')){
    return writeLog;
  }else{
    fs.mkdirSync('data')
    return writeLog;
  }
}

const makeCSVFile = data => {
  checkDataDir(fs.writeFile(`./data/${data[0].time}.csv`, dataToCsv(data), error => {
    logError(error);
  }));
}

const dataToCsv = data => {
  const fields = ['title', 'price', 'imageURL', 'url', 'time'];
  const opts = {fields};

  try {
    const parser = new csvParser(opts);
    const csv = parser.parse(data);
    return csv;
  } catch (error) {
    logError(error);
  }
}

const logError = (errorData) => {
  errorData = new Date() + '\n\t\t' + errorData;
  if(fs.existsSync('./data/scraper-error.log')){
    fs.readFile('./data/scraper-error.log', (error, data) => {
      fs.writeFile('./data/scraper-error.log', data + "\n\n\n" + errorData, error => {
        console.error(error);
      });
    });
  }else{
    fs.writeFile('./data/scraper-error.log', errorData, error => {
      console.error(error);
    });
  };
}

// console.log(data);
module.exports.dataF = checkDataDir;
module.exports.writeError = checkDataDir(logError);
module.exports.writeLog = checkDataDir(makeCSVFile);
