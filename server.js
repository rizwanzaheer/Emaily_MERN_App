const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => {
  res.send({ hi: 'there'});
});
app.listen(PORT, (err) => {
  if(err) return console.log(err);
  return console.log(`App Listening at http://localhost:${PORT}`);
});
