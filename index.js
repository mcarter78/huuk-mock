const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const _ = require('lodash');

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.listen(8900, () => {
 console.log('JSON Server is running')
});

server.get('/api/carriers', (request, response) => {
    const carriers = require('./carriers.js').carriers;
    response.status(200).jsonp({ results: carriers });
});

server.get('/api/customer_carriers', (request, response) => {
    const customerCarriers = require('./carriers.js').customerCarriers;
    const pools = require('./pools.js').pools;
    const sims = require('./devices_sims.js').carrierSIMs;
    _.forEach(customerCarriers, customerCarrier => {
        customerCarrier['pools'] = [];
        _.forEach(pools, pool => {
            if (parseInt(customerCarrier.id) === parseInt(pool.carrier_id)) {
                customerCarrier['pools'].push(pool);
                pool['sims'] = [];
                _.forEach(sims, sim => {
                    if (parseInt(pool.id) === parseInt(sim.pool_id)) {
                        pool['sims'].push(sim);
                    }
                });
            }
        });
        customerCarrier['sims'] = [];
        _.forEach(sims, sim => {
            if (parseInt(customerCarrier.id) === parseInt(sim.carrier_id)) {
                customerCarrier['sims'].push(sim);
            }
        });
    });
    response.status(200).jsonp({ results: customerCarriers });
});

server.get('/api/devices', (request, response) => {
    const devices = require('./devices_sims').devices;
    const sims = require('./devices_sims.js').carrierSIMs;
    let data = [];
    _.forEach(devices, device => {
        data.push({
            device,
            sim: _.find(sims, { id: device.id }),
            utilization: {}
        });
    });
    response.status(200).jsonp({ results: data });
});

server.get('/api/sims', (request, response) => {
    const sims = require('./devices_sims.js').carrierSIMs;
    response.status(200).jsonp({ results: sims });
});

server.get('/api/pools', (request, response) => {
    const pools = require('./pools.js').pools;
    const sims = require('./devices_sims.js').carrierSIMs;
    _.forEach(pools, pool => {
        pool['sims'] = [];
        _.forEach(sims, sim => {
            if (parseInt(pool.id) === parseInt(sim.pool_id)) {
                pool['sims'].push(sim);
            }
        });
    });
    response.status(200).jsonp({ results: pools });
});