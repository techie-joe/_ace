// htaccess.js to gulp as .htaccess
const root = '/ace/';
const errDocs = [];
['404', '500', '503'].forEach(function (code) {
  errDocs.push(`ErrorDocument ${code} ${root}${code}.html`);
});

module.exports = {
  errDocs: errDocs
}