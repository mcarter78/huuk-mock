const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults({ noCors: true });
const _ = require('lodash');
const { customerCarriers } = require('./carriers.js');

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
        "active": true,
        "pools": [],
        "sims": []
    }
    response.status(200).jsonp({ results: newCustomerCarrier });
});

server.put('/api/customer_carriers/:id', (request, response) => {
    const customerCarriers = require('./carriers.js').customerCarriers;
    const ccToEdit = _.find(customerCarriers, { id: request.params.id });
    _.forEach(request.body, (v, k) => {
        ccToEdit[k] = v;
    });
    response.status(200).jsonp({ results: ccToEdit });
});

server.delete('/api/customer_carriers/:id', (request, response) => {
    const customerCarriers = require('./carriers.js').customerCarriers;
    const ccToDelete = _.find(customerCarriers, { id: request.params.id });
    response.status(200).jsonp({ results: ccToDelete });
});

server.get('/api/devices', (request, response) => {
    const devices = require('./devices_sims').devices;
    const sims = require('./devices_sims.js').carrierSIMs;
    let data = [];
    _.forEach(devices, device => {
        data.push({
            key: device.url_id,
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
    const data = _.find(devices, { url_id: request.params.id });
    response.status(200).jsonp({ results: data });
});

server.put('/api/devices/:id', (request, response) => {
    const devices = require('./devices_sims').devices;
    const updatedDevice = {..._.find(devices, { url_id: request.params.id })};
    _.forEach(request.body.device, (v, k) => {
        updatedDevice[k] = v;
    });
    response.status(200).jsonp({ results: updatedDevice });
});

server.get('/api/sims', (request, response) => {
    const sims = require('./devices_sims.js').carrierSIMs;
    response.status(200).jsonp({ results: sims });
});

server.put('/api/sims/:id', (request, response) => {
    const sims = require('./devices_sims.js').carrierSIMs;
    const updatedSim = {..._.find(sims, { url_id: request.params.id })};
    _.forEach(request.body, (v, k) => { 
        updatedSim[k] = v;
    });
    response.status(200).jsonp({ results: updatedSim });
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
        "shared": false,
        "sims": []
    }
    response.status(200).jsonp({ results: newPool });
});

server.get('/api/pools/:id', (request, response) => {
    const pools = require('./pools.js').pools;
    const data = _.find(pools, { url_id: request.params.id });
    data['sims'] = [];
    _.forEach(sims, sim => {
        if (parseInt(pool.id) === parseInt(sim.pool_url_id)) {
            data['sims'].push(sim);
        }
    });
    response.status(200).jsonp({ results: data });
});

server.put('/api/pools/:id', (request, response) => {
    const pools = require('./pools.js').pools;
    const updatedPool = _.find(pools, { url_id: request.params.id });
    const sims = require('./devices_sims.js').carrierSIMs;
    _.forEach(request.body, (v, k) => {
        updatedPool[k] = v;
    });
    updatedPool['sims'] = [];
    _.forEach(sims, sim => {
        if (parseInt(updatedPool.url_id) === parseInt(sim.pool_url_id)) {
            updatedPool['sims'].push(sim);
        }
    });
    response.status(200).jsonp({ results: updatedPool });
});

server.delete('/api/pools/:id', (request, response) => {
    const pools = require('./pools.js').pools;
    const poolToDelete = _.find(pools, { id: request.params.id });
    response.status(200).jsonp({ results: poolToDelete });
});

server.get('/api/policies', (request, response) => {
    const policies = require('./policies.js').policies;
    const rules = require('./policies.js').rules;
    const notifiers = require('./policies.js').notifiers;
    const data = _.map(policies, policy => {
        policy['rules'] = [];
        policy['notifiers'] = [];
        _.forEach(policy.content.rules, ruleId => {
            policy['rules'].push(_.find(rules, { url_id: ruleId }));
        });
        _.forEach(policy.content.notifiers, notifierId => {
            policy['notifiers'].push(_.find(notifiers, { url_id: notifierId }));
        });
        return policy;
    });
    response.status(200).jsonp({ results: data });
});

server.post('/api/policies', (request, response) => {
    console.log(request.body);
    const rules = require('./policies.js').rules;
    const notifiers = require('./policies.js').notifiers;
    const newPolicy = {
        "id": "99",
        "createdAt": new Date(),
        "rules": [_.find(rules, { url_id: request.body.rule_id })],
        "notifiers": _.map(request.body.notifiers, notifier => _.find(notifiers, { url_id: notifier })),
        "content": {
            rules: [request.body.rule_id],
            notifiers: request.body.notifiers
        },
        "name": request.body.name,
        "url_id": "99",
    };

    response.status(200).jsonp({ results: newPolicy });
});

server.put('/api/policies/:id', (request, response) => {
    const policies = require('./policies.js').policies;
    const rules = require('./policies.js').rules;
    const notifiers = require('./policies.js').notifiers;
    const updatedPolicy = _.find(policies, { url_id: request.params.id });
    updatedPolicy['rules'] = [];
    updatedPolicy['notifiers'] = [];
    _.forEach(updatedPolicy.content.rules, ruleId => {
        updatedPolicy['rules'].push(_.find(rules, { url_id: ruleId }));
    });
    _.forEach(updatedPolicy.content.notifiers, notifierId => {
        updatedPolicy['notifiers'].push(_.find(notifiers, { url_id: notifierId }));
    });
    console.log(request.body)
    _.forEach(request.body, (v, k) => {
        if (k === 'rules') {
            updatedPolicy['rules'] = v;
            updatedPolicy.content.rules = _.map(v, rule => {
                return rule.url_id;
            });
        } else if (k === 'notifiers') {
            updatedPolicy['notifiers'] = _.map(v, notifier => _.find(notifiers, { url_id: notifier}));
            updatedPolicy.content.notifiers = v;
        } else {
            updatedPolicy[k] = v;
        }
    });
    response.status(200).jsonp({ results: updatedPolicy });
});

server.delete('/api/policies/:id', (request, response) => {
    const policies = require('./policies.js').policies;
    const policyToDelete = _.find(policies, { url_id: request.params.id });
    response.status(200).jsonp({ results: policyToDelete });
});

server.get('/api/rules', (request, response) => {
    const rules = require('./policies.js').rules;

    response.status(200).jsonp({ results: rules });
});

server.post('/api/rules', (request, response) => {
    const newRule = {
        "id": "99",
        "createdAt": new Date(),
        "content": request.body.content,
        "name": request.body.name,
        "url_id": "99",
    }
    response.status(200).jsonp({ results: newRule });
});

server.put('/api/rules/:id', (request, response) => {
    const rules = require('./policies.js').rules;
    const updatedRule = _.find(rules, { url_id: request.params.id });
    _.forEach(request.body, (v, k) => {
        updatedRule[k] = v;
    });
    response.status(200).jsonp({ results: updatedRule });
});

server.delete('/api/rules/:id', (request, response) => {
    const rules = require('./policies.js').rules;
    const ruleToDelete = _.find(rules, { url_id: request.params.id });
    response.status(200).jsonp({ results: ruleToDelete });
});

server.get('/api/notifiers', (request, response) => {
    const notifiers = require('./policies.js').notifiers;

    response.status(200).jsonp({ results: notifiers });
});

server.post('/api/notifiers', (request, response) => {
    const newNotifier = {
        "id": "99",
        "createdAt": new Date(),
        "settings": request.body.settings,
        "name": request.body.name,
        "url_id": "99",
    }
    response.status(200).jsonp({ results: newNotifier });
});

server.put('/api/notifiers/:id', (request, response) => {
    const notifiers = require('./policies.js').notifiers;
    const updatedNotifier = _.find(notifiers, { url_id: request.params.id });
    updatedNotifier.name = request.body.name;
    console.log(request.body)
    _.forEach(request.body.settings, (v, k) => {
        console.log(k, v)
        if (k !== 'notifier_type') {
            _.forEach(request.body.settings[k], (value, key) => {
                updatedNotifier.settings[k][key] = value;
            });
        }
    });
    response.status(200).jsonp({ results: updatedNotifier });
});

server.delete('/api/notifiers/:id', (request, response) => {
    const notifiers = require('./policies.js').notifiers;
    const notifierToDelete = _.find(notifiers, { url_id: request.params.id });
    response.status(200).jsonp({ results: notifierToDelete });
});