const scraper = require('./scraper');
const save = require('./save');

let url = "http://shirts4mike.com/shirts.php";

const data = scraper.install(url, save.writeLog, save.writeError);
