const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults({ noCors: true });
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
                    if (parseInt(pool.id) === parseInt(sim.pool_url_id)) {
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

server.post('/api/customer_carriers', (request, response) => {
    const newCustomerCarrier = {
        "id": "99",
        "carrier_id": request.body.carrier_id,
        "createdAt": new Date(),
        "name": request.body.name,
        "url_id": "99",
        "settings": request.body.settings,
        "last_api_success": "2020-02-05T19:52:22.912Z",
        "last_api_failure": "2020-06-03T13:55:06.661Z",
        "active": true
    }
    response.status(200).jsonp({ results: newCustomerCarrier });
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

server.get('/api/devices/:id', (request, response) => {
    const devices = require('./devices_sims').devices;
    console.log(request);
    const data = _.find(devices, { url_id: request.params });
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
            if (parseInt(pool.id) === parseInt(sim.pool_url_id)) {
                pool['sims'].push(sim);
            }
        });
    });
    response.status(200).jsonp({ results: pools });
});

server.post('/api/pools', (request, response) => {
    const customerCarriers = require('./carriers.js').customerCarriers;
    const newPool = {
        "id": "99",
        "carrier_id": request.body.carrier_id,
        "createdAt": new Date(),
        "name": request.body.name,
        "included_data_usage": request.body.included_data_usage,
        "url_id": "99",
        "per_subscriber_charge": request.body.per_subscriber_charge,
        "account_charge": 85483,
        "usage_limit": 73578,
        "end_cycle_date": request.body.end_cycle_date,
        "carrier_name": _.find(customerCarriers, { id: request.body.carrier_id }).name,
        "shared": false
    }
    response.status(200).jsonp({ results: newPool });
});

server.get('/api/pools/:id', (request, response) => {
    const pools = require('./pools.js').pools;
    const data = _.find(pools, { url_id: request.params });
    data['sims'] = [];
    _.forEach(sims, sim => {
        if (parseInt(pool.id) === parseInt(sim.pool_url_id)) {
            data['sims'].push(sim);
        }
    });
    response.status(200).jsonp({ results: data });
});