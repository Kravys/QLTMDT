const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('TEST');
});

// phan import
const router = require('../routes/auth.routes');
const productRoutes = require('../routes/product.routes');
app.use('/api', productRoutes);
const userRoutes = require('../routes/user.routes');
app.use('/api1', userRoutes);
const orderRoutes = require('../routes/order.routes');
app.use('/api2', orderRoutes);
const statisticsRoutes = require('../routes/statistics.routes');
app.use('/api3/statistics', statisticsRoutes);
app.use('/auth', router);
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
});

app.use((req, res, next)=>{
    res.status(error.status || 500).json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;