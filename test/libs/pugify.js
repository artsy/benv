var tmpl = function() { require('./template.pug').apply(this, arguments) };
module.exports = function() {
  return tmpl({ title: 'A foo walks into a bar.' });
}