const express = require('express');
const app = require('./config/app');
const db = require('./config/db');

db.sync().then(() => console.log('DB Connected'));
app.listen(3000, () => console.log('Server running on port 3000'));
