const carriers = [
    {
        "id": "1",
        "created_at": "2020-10-01T13:18:46.962Z",
        "name": "program",
        "api_available": false,
        "default_endpoint": "http://vivienne.info",
        "states": [
            'ACTIVATION_READY', 'REPLACED', 'ACTIVATED', 'DEACTIVATED', 'INVENTORY', 'PURGED', 'RETIRED', 'TEST_READY'
        ]
    },
    {
        "id": "2",
        "created_at": "2020-10-01T19:33:11.727Z",
        "name": "monitor",
        "api_available": true,
        "default_endpoint": "https://eunice.net",
        "states": [
            'ACTIVATION_READY', 'REPLACED', 'ACTIVATED', 'DEACTIVATED', 'INVENTORY', 'PURGED', 'RETIRED', 'TEST_READY'  
        ]
    },
    {
        "id": "3",
        "created_at": "2020-10-01T06:03:20.900Z",
        "name": "firewall",
        "api_available": false,
        "default_endpoint": "http://lucy.info",
        "states": [
            'ACTIVATION_READY', 'REPLACED', 'ACTIVATED', 'DEACTIVATED', 'INVENTORY', 'PURGED', 'RETIRED', 'TEST_READY' 
        ]
    },
    {
        "id": "4",
        "created_at": "2020-10-01T10:34:13.171Z",
        "name": "microchip",
        "api_available": false,
        "default_endpoint": "https://landen.net",
        "states": [
            'ACTIVATION_READY', 'REPLACED', 'ACTIVATED', 'DEACTIVATED', 'INVENTORY', 'PURGED', 'RETIRED', 'TEST_READY'  
        ]
    },
    {
        "id": "5",
        "created_at": "2020-10-01T14:45:38.542Z",
        "name": "feed",
        "api_available": true,
        "default_endpoint": "http://eleazar.biz",
        "states": [
            'ACTIVATION_READY', 'REPLACED', 'ACTIVATED', 'DEACTIVATED', 'INVENTORY', 'PURGED', 'RETIRED', 'TEST_READY' 
        ]
    }
];

const customerCarriers = [
    {
        "id": "1",
        "carrier_id": "1",
        "createdAt": "2020-10-01T11:03:37.460Z",
        "name": "application",
        "url_id": "c8d45518-ed3c-4ac0-a3c2-7f059cef32dd",
        "settings": {},
        "last_api_success": "2020-06-26T17:44:56.952Z",
        "last_api_failure": "2020-01-19T01:26:27.228Z",
        "active": true
    },
    {
        "id": "2",
        "carrier_id": "2",
        "createdAt": "2020-10-01T10:52:17.353Z",
        "name": "transmitter",
        "url_id": "0cc0d24c-c69d-45b8-8fa7-66363f619ca6",
        "settings": {},
        "last_api_success": "2020-06-03T18:53:13.156Z",
        "last_api_failure": "2020-05-20T06:12:37.412Z",
        "active": false
    },
    {
        "id": "3",
        "carrier_id": "3",
        "createdAt": "2020-10-01T11:32:14.408Z",
        "name": "bandwidth",
        "url_id": "2666297f-773c-4118-943a-30404fc1f8cf",
        "settings": {},
        "last_api_success": "2020-06-19T10:06:57.473Z",
        "last_api_failure": "2020-07-26T12:24:06.329Z",
        "active": true
    },
    {
        "id": "4",
        "carrier_id": "4",
        "createdAt": "2020-10-01T16:30:07.097Z",
        "name": "sensor",
        "url_id": "9913c05a-958e-4e12-99e5-5f8bdf9a31ba",
        "settings": {},
        "last_api_success": "2020-02-23T23:04:19.211Z",
        "last_api_failure": "2019-10-15T06:22:05.388Z",
        "active": true
    },
    {
        "id": "5",
        "carrier_id": "5",
        "createdAt": "2020-10-01T21:30:30.812Z",
        "name": "matrix",
        "url_id": "c80d4fe2-fa6e-44d8-95fc-83ee27451789",
        "settings": {},
        "last_api_success": "2020-04-06T03:33:52.914Z",
        "last_api_failure": "2020-03-28T14:48:47.784Z",
        "active": true
    },
    {
        "id": "6",
        "carrier_id": "1",
        "createdAt": "2020-10-01T07:23:28.976Z",
        "name": "pixel",
        "url_id": "8f4a43e4-d363-4c71-8590-c13cb79fa487",
        "settings": {},
        "last_api_success": "2020-06-17T08:07:35.194Z",
        "last_api_failure": "2020-01-07T11:47:31.893Z",
        "active": false
    },
    {
        "id": "7",
        "carrier_id": "2",
        "createdAt": "2020-10-02T00:24:18.597Z",
        "name": "program",
        "url_id": "e1c77467-e571-4482-ac4e-710b92bd6caa",
        "settings": {},
        "last_api_success": "2020-04-06T20:03:57.468Z",
        "last_api_failure": "2019-11-14T04:48:13.914Z",
        "active": false
    },
    {
        "id": "8",
        "carrier_id": "3",
        "createdAt": "2020-10-01T14:24:19.032Z",
        "name": "sensor",
        "url_id": "f73c8613-b472-49d7-8380-4068c09eab93",
        "settings": {},
        "last_api_success": "2020-02-05T19:52:22.912Z",
        "last_api_failure": "2020-06-03T13:55:06.661Z",
        "active": false
    }
]

module.exports = {
    carriers,
    customerCarriers
}