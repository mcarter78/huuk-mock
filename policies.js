const policies = [
    {
        "content": {
            "notifiers": [],
            "rules": [
                "kXwlNKZ6gzKYpzq4"
            ]
        },
        "url_id": "6wdE4lL9bGKvx03y",
        "name": "Trust Policy Violations",
    },
    {
        "content": {
        "notifiers": [
            "qB8z2ND8VLY5ERgJ",
            "gNBVWpnv4eKeo1JM"
        ],
        "rules": [
            "kwMqa0n1j9L2pxvO"
        ]
        },
        "url_id": "kwMqa0n1j9L2pxvO",
        "name": "Alert on Spy Cameras",
    },
    {
        "content": {
        "notifiers": [
            "EvY2p6nGv8DJQ3bG",
            "gNBVWpnv4eKeo1JM"
        ],
        "rules": [
            "4yVpWLxxpqL5BaNq"
        ]
        },
        "url_id": "Z4yVpWLx2qD5BaNq",
        "name": "New Camera Alert",
    },
    {
        "content": {
        "notifiers": [
            "qB8z2ND8VLY5ERgJ",
            "gNBVWpnv4eKeo1JM"
        ],
        "rules": [
            "QplqXoKNaGL7y26M"
        ]
        },
        "url_id": "gBGmVED25EKkqQwy",
        "name": "Castle Events",
    },
    {
        "content": {
        "notifiers": [
            "qB8z2ND8VLY5ERgJ",
            "gNBVWpnv4eKeo1JM"
        ],
        "rules": [
            "mjp6B7nzdRKg4XAW"
        ]
        },
        "url_id": "QplqXoKNozD7y26M",
        "name": "Disallowed IoT Devices",
    }
];

const rules = [
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "condition": "OR",
              "rules": [
                {
                  "field": "encryption",
                  "id": "encryption",
                  "input": "checkbox",
                  "operator": "in",
                  "type": "string",
                  "value": [
                    "WEP",
                    "WEP40",
                    "WEP104",
                    "None"
                  ]
                },
                {
                  "field": "authentication",
                  "id": "authentication",
                  "input": "checkbox",
                  "operator": "in",
                  "type": "string",
                  "value": [
                    "OPEN"
                  ]
                }
              ]
            },
            {
              "condition": "AND",
              "rules": [
                {
                  "field": "trust_level",
                  "id": "trust_level",
                  "input": "text",
                  "operator": "in",
                  "type": "string",
                  "value": "1,10,20"
                }
              ]
            }
          ],
          "valid": true
        },
        "sql_string": "( encryption IN('WEP', 'WEP40', 'WEP104', 'None') OR authentication IN('OPEN') )  AND ( trust_level IN('1,10,20') ) ",
        "table": "accesspoints"
      },
      "url_id": "kogVbOn46K0EeN21",
      "name": "AP With Weak Encryption Last 24hr"
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "OR",
          "rules": [
            {
              "field": "acknowledged",
              "id": "acknowledged",
              "input": "radio",
              "operator": "equal",
              "type": "integer",
              "value": "1"
            },
            {
              "field": "acknowledged",
              "id": "acknowledged",
              "input": "radio",
              "operator": "equal",
              "type": "integer",
              "value": "0"
            }
          ],
          "valid": true
        },
        "sql_string": "acknowledged = '1' OR acknowledged = '0'",
        "table": "events"
      },
      "url_id": "EvY2p6nG3nJQ3bG8",
      "name": "Events Last 24hr"
    },
    {
      "content": {
        "event_identifiers": [
          "CAMERA DETECTED",
          "SPY CAMERA DETECTED",
          "DASH CAMERA DETECTED",
          "CONSUMER CAMERA DETECTED"
        ],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "identifier",
              "id": "identifier",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "CAMERA DETECTED,SPY CAMERA DETECTED,DASH CAMERA DETECTED,CONSUMER CAMERA DETECTED"
            }
          ],
          "valid": true
        },
        "sql_string": "identifier IN('CAMERA DETECTED,SPY CAMERA DETECTED,DASH CAMERA DETECTED,CONSUMER CAMERA DETECTED')",
        "table": "events"
      },
      "url_id": "jp6B7nz8aRKg4XAW",
      "name": "New Camera Detected"
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "threat_level",
              "id": "threat_level",
              "input": "number",
              "operator": "greater_or_equal",
              "type": "integer",
              "value": 20
            }
          ],
          "valid": true
        },
        "sql_string": "threat_level &gt;= 20",
        "table": "celltowers"
      },
      "url_id": "BeYN2K31ZenoQ0k6",
      "name": "Celltowers w/ Risk"
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "tags.name",
              "id": "tags.name",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "Drone"
            }
          ],
          "valid": true
        },
        "sql_string": "tags.name IN('Drone')",
        "table": "accesspoints"
      },
      "url_id": "rBeYN2K3AnoQ0k68",
      "name": "Aircraft / Drones"
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "tags.name",
              "id": "tags.name",
              "input": "text",
              "operator": "not_in",
              "type": "string",
              "value": "UAV"
            }
          ],
          "valid": true
        },
        "sql_string": "tags.name NOT IN('UAV')",
        "table": "accesspoints"
      },
      "url_id": "R7E3e2DdA5naVpjd",
      "name": "Interesting IoT Devices"
    },
    {
      "content": {
        "event_identifiers": [
          "CHANCHANGE"
        ],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "source",
              "id": "source",
              "input": "checkbox",
              "operator": "in",
              "type": "string",
              "value": [
                "WIDS"
              ]
            },
            {
              "field": "identifier",
              "id": "identifier",
              "input": "text",
              "operator": "not_in",
              "type": "string",
              "value": "CHANCHANGE"
            }
          ],
          "valid": true
        },
        "sql_string": "source IN('WIDS') AND identifier NOT IN('CHANCHANGE')",
        "table": "events"
      },
      "url_id": "vY2p6nGeV8KJQ3bG",
      "name": "IDS Events"
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "tags.name",
              "id": "tags.name",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "Camera"
            }
          ],
          "valid": true
        },
        "sql_string": "tags.name IN('Camera')",
        "table": "accesspoints"
      },
      "url_id": "NBVWpnve0eDeo1JM",
      "name": "Cameras"
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "tags.name",
              "id": "tags.name",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "IOT Gateway"
            }
          ],
          "valid": true
        },
        "sql_string": "tags.name IN('IOT Gateway')",
        "table": "accesspoints"
      },
      "url_id": "BeYN2K3dqeDoQ0k6",
      "name": "Zigbee Hubs"
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "OR",
          "rules": [
            {
              "field": "trust_level",
              "id": "trust_level",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "100"
            },
            {
              "field": "trust_level",
              "id": "trust_level",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "71"
            }
          ],
          "valid": true
        },
        "sql_string": "trust_level IN('100') OR trust_level IN('71')",
        "table": "accesspoints"
      },
      "url_id": "QE2NgDrqdeKaerVZ",
      "name": "Rogue and High Threat Devices"
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "wps_capable",
              "id": "wps_capable",
              "input": "radio",
              "operator": "equal",
              "type": "integer",
              "value": 1
            }
          ],
          "valid": true
        },
        "sql_string": "wps_capable = 1",
        "table": "accesspoints"
      },
      "url_id": "BGqX3KB2VXKpwNjY",
      "name": "WPS Enabled Devices"
    },
    {
      "content": {
        "event_identifiers": [
          "TRUST POLICY VIOLATION"
        ],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "identifier",
              "id": "identifier",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "TRUST POLICY VIOLATION"
            },
            {
              "field": "severity",
              "id": "severity",
              "input": "number",
              "operator": "greater_or_equal",
              "type": "integer",
              "value": 7
            }
          ],
          "valid": true
        },
        "sql_string": "identifier IN('TRUST POLICY VIOLATION') AND severity &gt;= 7",
        "table": "events"
      },
      "url_id": "XPpOmLWjVjnBGb9o",
      "name": "Trust Policy Violations"
    },
    {
      "content": {
        "event_identifiers": [
          "MISSED PERFORMANCE METRIC"
        ],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "identifier",
              "id": "identifier",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "MISSED PERFORMANCE METRIC"
            }
          ],
          "valid": true
        },
        "sql_string": "identifier IN('MISSED PERFORMANCE METRIC')",
        "table": "events"
      },
      "url_id": "M60deD05bAnpPjba",
      "name": "Missed Performance Metric"
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "tags.name",
              "id": "tags.name",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "Printer"
            }
          ],
          "valid": true
        },
        "sql_string": "tags.name IN('Printer')",
        "table": "accesspoints"
      },
      "url_id": "Jv0zVKQNaYDbB5EZ",
      "name": "WiFi Printers"
    },
    {
      "content": {
        "event_identifiers": [
          "WIRELESS STORAGE DEVICE DETECTED"
        ],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "identifier",
              "id": "identifier",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "WIRELESS STORAGE DEVICE DETECTED"
            }
          ],
          "valid": true
        },
        "sql_string": "identifier IN('WIRELESS STORAGE DEVICE DETECTED')",
        "table": "events"
      },
      "url_id": "mxzA1RL7MoDr0alP",
      "name": "Thumb Drives"
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "severity",
              "id": "severity",
              "input": "number",
              "operator": "greater_or_equal",
              "type": "integer",
              "value": 7
            },
            {
              "field": "source",
              "id": "source",
              "input": "checkbox",
              "operator": "in",
              "type": "string",
              "value": [
                "WIDS"
              ]
            }
          ],
          "valid": true
        },
        "sql_string": "severity &gt;= 7 AND source IN('WIDS')",
        "table": "events"
      },
      "url_id": "ogVbOn4RQVK0EeN2",
      "name": "Critical IDS Events"
    },
    {
      "content": {
        "event_identifiers": [
          "SPY CAMERA DETECTED"
        ],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "identifier",
              "id": "identifier",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "SPY CAMERA DETECTED"
            }
          ],
          "valid": true
        },
        "sql_string": "identifier IN('SPY CAMERA DETECTED')",
        "table": "events"
      },
      "url_id": "kwMqa0n1j9L2pxvO",
      "name": "Spy Camera Detected"
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "bssid",
              "id": "bssid",
              "input": "text",
              "operator": "begins_with",
              "type": "string",
              "value": "f0:ab"
            }
          ],
          "valid": true
        },
        "sql_string": "bssid LIKE('f0:ab%')",
        "table": "accesspoints"
      },
      "url_id": "QboPwynl8mnq6mAz",
      "name": "Disallowed APs"
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "OR",
          "rules": [
            {
              "field": "encryption",
              "id": "encryption",
              "input": "checkbox",
              "operator": "in",
              "type": "string",
              "value": [
                "WEP"
              ]
            }
          ],
          "valid": true
        },
        "sql_string": "encryption IN('WEP')",
        "table": "accesspoints"
      },
      "url_id": "Nb41kKw5pqnzZogP",
      "name": "WEP APs"
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "source",
              "id": "source",
              "input": "checkbox",
              "operator": "in",
              "type": "string",
              "value": [
                "WIDS"
              ]
            },
            {
              "field": "severity",
              "id": "severity",
              "input": "number",
              "operator": "greater_or_equal",
              "type": "integer",
              "value": 8
            },
            {
              "field": "accesspoint.trust_level",
              "id": "accesspoint.trust_level",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "1,10"
            }
          ],
          "valid": true
        },
        "sql_string": "source IN('WIDS') AND severity &gt;= 8 AND accesspoint.trust_level IN('1,10')",
        "table": "events"
      },
      "url_id": "B8z2ND8bObLY5ERg",
      "name": "Critical IDS Events"
    },
    {
      "content": {
        "rules": {
          "condition": "OR",
          "rules": [
            {
              "field": "acknowledged",
              "id": "acknowledged",
              "input": "radio",
              "operator": "equal",
              "type": "integer",
              "value": "1"
            },
            {
              "field": "acknowledged",
              "id": "acknowledged",
              "input": "radio",
              "operator": "equal",
              "type": "integer",
              "value": "0"
            }
          ],
          "valid": true
        },
        "sql_string": "acknowledged = 1 OR acknowledged = 0",
        "table": "events"
      },
      "url_id": "172YOnPNrPK0Q6XP",
      "name": "Events Last 24hr"
    },
    {
      "content": {
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "identifier",
              "id": "identifier",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "ROKU DETECTED,AMAZON ECHO DETECTED,DIRECTV DEVICE DETECTED,GOOGLE HOME DETECTED,AMAZON FIRETV DETECTED,MEDICAL DEVICE DETECTED,THERMOSTAT DETECTED,LG SMART DEVICE DETECTED,SMART GARAGE HUB DETECTED,WIRELESS STORAGE DEVICE DETECTED,CAMERA DETECTED,DRONE DETECTED,WIFI PINEAPPLE DETECTED,SPY CAMERA DETECTED,CONSUMER CAMERA DETECTED,DASH CAMERA DETECTED,VEHICLE DETECTED,INDUSTRIAL IOT ROUTER DETECTED,WIFI TELEVISION DETECTED"
            },
            {
              "field": "acknowledged",
              "id": "acknowledged",
              "input": "radio",
              "operator": "equal",
              "type": "integer",
              "value": 0
            }
          ],
          "valid": true
        },
        "sql_string": "identifier IN('ROKU DETECTED,AMAZON ECHO DETECTED,DIRECTV DEVICE DETECTED,GOOGLE HOME DETECTED,AMAZON FIRETV DETECTED,MEDICAL DEVICE DETECTED,THERMOSTAT DETECTED,LG SMART DEVICE DETECTED,SMART GARAGE HUB DETECTED,WIRELESS STORAGE DEVICE DETECTED,CAMERA DETECTED,DRONE DETECTED,WIFI PINEAPPLE DETECTED,SPY CAMERA DETECTED,CONSUMER CAMERA DETECTED,DASH CAMERA DETECTED,VEHICLE DETECTED,INDUSTRIAL IOT ROUTER DETECTED,WIFI TELEVISION DETECTED') AND acknowledged = 0",
        "table": "events"
      },
      "url_id": "QE2NgDrwoJnaerVZ",
      "name": "New IoT Devices"
    },
    {
      "content": {
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "essid",
              "id": "essid",
              "input": "text",
              "operator": "equal",
              "type": "string",
              "value": "Setup"
            }
          ],
          "valid": true
        },
        "sql_string": "essid = 'Setup'",
        "table": "accesspoints"
      },
      "url_id": "m9PBZDapOaK7Rxwl",
      "name": "Devices in Setup Mode"
    },
    {
      "content": {
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "identifier",
              "id": "identifier",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "TRUST POLICY VIOLATION"
            }
          ],
          "valid": true
        },
        "sql_string": "identifier IN('TRUST POLICY VIOLATION')",
        "table": "events"
      },
      "url_id": "VyNMbnq7x9KGkJdR",
      "name": "Client Connected to Wrong Network"
    },
    {
      "content": {
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "identifier",
              "id": "identifier",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "DRONE DETECTED"
            }
          ],
          "valid": true
        },
        "sql_string": "identifier IN('DRONE DETECTED')",
        "table": "events"
      },
      "url_id": "kXwlNKZk7lDYpzq4",
      "name": "Drone Detected"
    },
    {
      "content": {
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "encryption",
              "id": "encryption",
              "input": "checkbox",
              "operator": "in",
              "type": "string",
              "value": [
                "WEP",
                "WEP40",
                "WEP104",
                "None"
              ]
            },
            {
              "field": "authentication",
              "id": "authentication",
              "input": "checkbox",
              "operator": "in",
              "type": "string",
              "value": [
                "OPEN"
              ]
            },
            {
              "condition": "AND",
              "rules": [
                {
                  "field": "trust_level",
                  "id": "trust_level",
                  "input": "text",
                  "operator": "in",
                  "type": "string",
                  "value": "1,10"
                }
              ]
            }
          ],
          "valid": true
        },
        "sql_string": "encryption IN('WEP', 'WEP40', 'WEP104', 'None') AND authentication IN('OPEN') AND ( trust_level IN('1,10') ) ",
        "table": "accesspoints"
      },
      "url_id": "ex4dankAVkKGANw8",
      "name": "Trusted AP with Weak Encryption"
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "risk_level",
              "id": "risk_level",
              "input": "number",
              "operator": "greater",
              "type": "integer",
              "value": 5000
            }
          ],
          "valid": true
        },
        "sql_string": "risk_level &gt; 5000",
        "table": "clients"
      },
      "url_id": "NBVWpnvwVeLeo1JM",
      "name": "High Risk Clients"
    },
    {
      "content": {
        "event_identifiers": [
          "KRACK"
        ],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "identifier",
              "id": "identifier",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "KRACK"
            },
            {
              "field": "sensor.tags",
              "id": "sensor.tags",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "SF-EBAY"
            }
          ],
          "valid": true
        },
        "sql_string": "identifier%20IN('KRACK')%20AND%20sensor.tags%20IN('SF-EBAY')",
        "table": "events"
      },
      "url_id": "jpEVxKyZO5DrQRY2",
      "name": "KRACK in SF-EBAY"
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "accesspoint.essid",
              "id": "accesspoint.essid",
              "input": "text",
              "operator": "equal",
              "type": "string",
              "value": "Choose Another Castle"
            }
          ],
          "valid": true
        },
        "sql_string": "accesspoint.essid%20%3D%20'Choose%20Another%20Castle'",
        "table": "events"
      },
      "url_id": "vY2p6nGrA8DJQ3bG",
      "name": "Castle Events"
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 15,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "label",
              "id": "label",
              "input": "checkbox",
              "operator": "in",
              "type": "string",
              "value": [
                "Rogue"
              ]
            }
          ],
          "valid": true
        },
        "sql_string": "label IN('Rogue')",
        "table": "accesspoints"
      },
      "url_id": "arqzGoDEZ9nOemXZ",
      "name": "Rogue Access Points"
    },
    {
      "content": {
        "event_identifiers": [
          "WIFI PRINTER DETECTED"
        ],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "identifier",
              "id": "identifier",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "WIFI PRINTER DETECTED"
            }
          ],
          "valid": true
        },
        "sql_string": "identifier IN('WIFI PRINTER DETECTED')",
        "table": "events"
      },
      "url_id": "eBj6GNL53lDm35k8",
      "name": "WiFi Printers"
    },
    {
      "content": {
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "accesspoint.essid",
              "id": "accesspoint.essid",
              "input": "text",
              "operator": "equal",
              "type": "string",
              "value": "Choose Another Castle"
            },
            {
              "field": "identifier",
              "id": "identifier",
              "input": "text",
              "operator": "not_in",
              "type": "string",
              "value": "CHANCHANGE"
            }
          ],
          "valid": true
        },
        "sql_string": "accesspoint.essid = 'Choose Another Castle' AND identifier NOT IN('CHANCHANGE')",
        "table": "events"
      },
      "url_id": "QplqXoKNaGL7y26M",
      "name": "Choose Another Castle"
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "severity",
              "id": "severity",
              "input": "number",
              "operator": "greater_or_equal",
              "type": "integer",
              "value": "8"
            }
          ],
          "valid": true
        },
        "sql_string": "severity &gt;= 8",
        "table": "events"
      },
      "url_id": "O269yoDgwDvx8VW3",
      "name": "High Severity Events"
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "tags.name",
              "id": "tags.name",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "Medical Monitor"
            }
          ],
          "valid": true
        },
        "sql_string": "tags.name IN('Medical Monitor')",
        "table": "accesspoints"
      },
      "url_id": "jwd4mnAY5lnkvRpE",
      "name": "Medical Devices"
    },
    {
      "content": {
        "event_identifiers": [
          "WIRELESS STORAGE DEVICE DETECTED"
        ],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "identifier",
              "id": "identifier",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "WIRELESS STORAGE DEVICE DETECTED"
            }
          ],
          "valid": true
        },
        "sql_string": "identifier IN('WIRELESS STORAGE DEVICE DETECTED')",
        "table": "events"
      },
      "url_id": "gkXwlNKZyzLYpzq4",
      "name": "Wireless SD Cards "
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "source",
              "id": "source",
              "input": "checkbox",
              "operator": "in",
              "type": "string",
              "value": [
                "ANALYTICS"
              ]
            },
            {
              "field": "severity",
              "id": "severity",
              "input": "number",
              "operator": "equal",
              "type": "integer",
              "value": 10
            }
          ],
          "valid": true
        },
        "sql_string": "source IN('ANALYTICS') AND severity = 10",
        "table": "events"
      },
      "url_id": "ex4dankArNKGANw8",
      "name": "Severity Test"
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "essid",
              "id": "essid",
              "input": "text",
              "operator": "contains",
              "type": "string",
              "value": "TEST"
            }
          ],
          "valid": true
        },
        "sql_string": "essid LIKE('%TEST%')",
        "table": "accesspoints"
      },
      "url_id": "269yoDgQNGLvx8VW",
      "name": "Test LIKE"
    },
    {
      "content": {
        "event_identifiers": [
          "CLIENT TO ROGUE AP"
        ],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "identifier",
              "id": "identifier",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "CLIENT TO ROGUE AP"
            }
          ],
          "valid": true
        },
        "sql_string": "identifier IN('CLIENT TO ROGUE AP')",
        "table": "events"
      },
      "url_id": "mxzA1RL7mDr0alPV",
      "name": "Client to Rogue AP Last 24hr"
    },
    {
      "content": {
        "event_identifiers": [
          "AMAZON ECHO DETECTED",
          "DIRECTV DEVICE DETECTED"
        ],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "identifier",
              "id": "identifier",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "AMAZON ECHO DETECTED,DIRECTV DEVICE DETECTED"
            }
          ],
          "valid": true
        },
        "sql_string": "identifier IN('AMAZON ECHO DETECTED,DIRECTV DEVICE DETECTED')",
        "table": "events"
      },
      "url_id": "mjp6B7nzdRKg4XAW",
      "name": "Disallowed IoT Devices"
    },
    {
      "content": {
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "identifier",
              "id": "identifier",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "WIFI PINEAPPLE DETECTED"
            }
          ],
          "valid": true
        },
        "sql_string": "identifier IN('WIFI PINEAPPLE DETECTED')",
        "table": "events"
      },
      "url_id": "BeYN2K3d2eDoQ0k6",
      "name": "WiFi Pineapple "
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "condition": "AND",
              "rules": [
                {
                  "field": "accesspoint.trust_level",
                  "id": "accesspoint.trust_level",
                  "input": "text",
                  "operator": "in",
                  "type": "string",
                  "value": "1"
                },
                {
                  "field": "identifier",
                  "id": "identifier",
                  "input": "text",
                  "operator": "not_in",
                  "type": "string",
                  "value": "CHANCHANGE"
                }
              ]
            }
          ],
          "valid": true
        },
        "sql_string": "( accesspoint.trust_level IN('1') AND identifier NOT IN('CHANCHANGE') ) ",
        "table": "events"
      },
      "url_id": "o8XvG2K6wEDqAkw0",
      "name": "All events on Trusted APs"
    },
    {
      "content": {
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "identifier",
              "id": "identifier",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "SPY CAMERA DETECTED,DASH CAMERA DETECTED"
            }
          ],
          "valid": true
        },
        "sql_string": "identifier IN('SPY CAMERA DETECTED,DASH CAMERA DETECTED')",
        "table": "events"
      },
      "url_id": "4yVpWLxxpqL5BaNq",
      "name": "Dash and Spy Cameras"
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "tags.name",
              "id": "tags.name",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "Storage"
            }
          ],
          "valid": true
        },
        "sql_string": "tags.name IN('Storage')",
        "table": "accesspoints"
      },
      "url_id": "NGjEaDRwa9nb0dJ5",
      "name": "Storage Devices "
    },
    {
      "content": {
        "event_identifiers": [
          "TRUST POLICY VIOLATION"
        ],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "identifier",
              "id": "identifier",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "TRUST POLICY VIOLATION"
            }
          ],
          "valid": true
        },
        "sql_string": "identifier IN('TRUST POLICY VIOLATION')",
        "table": "events"
      },
      "url_id": "kXwlNKZ6gzKYpzq4",
      "name": "Trust Policy Violations"
    },
    {
      "content": {
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "identifier",
              "id": "identifier",
              "input": "text",
              "operator": "in",
              "type": "string",
              "value": "SPY CAMERA DETECTED,DASH CAMERA DETECTED"
            }
          ],
          "valid": true
        },
        "sql_string": "identifier IN('SPY CAMERA DETECTED,DASH CAMERA DETECTED')",
        "table": "events"
      },
      "url_id": "x7XbYLod0mKOJ20N",
      "name": "Dash and Spy Cameras"
    },
    {
      "content": {
        "event_identifiers": [],
        "last": 1440,
        "rules": {
          "condition": "AND",
          "rules": [
            {
              "field": "threat_level",
              "id": "threat_level",
              "input": "number",
              "operator": "greater_or_equal",
              "type": "integer",
              "value": 20
            }
          ],
          "valid": true
        },
        "sql_string": "threat_level &gt;= 20",
        "table": "celltowers"
      },
      "url_id": "gNBVWpnv4eKeo1JM",
      "name": "Medium Risk Cell Towers"
    }
];

const notifiers = [
    {
      "url_id": "EvY2p6nGv8DJQ3bG",
      "name": "Email Test",
      "settings": {
        "email": {
          "email_list": [
            "support@802secure.com"
          ]
        },
        "event": {
          "identifier": "",
          "message": "\t\t\t\t\t\t\t\t\t\t\t\t\t\t",
          "severity": "1",
          "summary": ""
        },
        "notifier_type": "email",
        "opsgenie": {
          "api_key": ""
        },
        "pagerduty": {
          "integration_key": ""
        },
        "slack": {
          "channel": "",
          "mention": "",
          "webhookURL": ""
        },
        "sms": {
          "from_mobile_number": "",
          "to_mobile_numbers": [],
          "twilio_account_sid": "",
          "twilio_auth_token": ""
        },
        "syslog": {
          "host": "",
          "json": false,
          "port": "",
          "protocol": "UDP"
        },
        "webhook": {
          "url": ""
        }
      }
    },
    {
      "url_id": "gNBVWpnv4eKeo1JM",
      "name": "Alerts Sensors Slack",
      "settings": {
        "email": {
          "email_list": []
        },
        "event": {
          "identifier": "",
          "message": "",
          "severity": "1",
          "summary": ""
        },
        "notifier_type": "slack",
        "opsgenie": {
          "api_key": ""
        },
        "pagerduty": {
          "integration_key": ""
        },
        "slack": {
          "channel": "",
          "mention": "",
          "webhookURL": "https://hooks.slack.com/services/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"
        },
        "sms": {
          "from_mobile_number": "",
          "to_mobile_numbers": [],
          "twilio_account_sid": "",
          "twilio_auth_token": ""
        },
        "syslog": {
          "host": "",
          "json": false,
          "port": "",
          "protocol": "UDP"
        },
        "webhook": {
          "url": ""
        }
      }
    },
    {
      "url_id": "qB8z2ND8VLY5ERgJ",
      "name": "802 Support Team",
      "settings": {
        "email": {
          "email_list": [
            "support@802secure.com"
          ]
        },
        "event": {
          "identifier": "",
          "message": "                                                ",
          "severity": "1",
          "summary": ""
        },
        "notifier_type": "email",
        "opsgenie": {
          "api_key": ""
        },
        "pagerduty": {
          "integration_key": ""
        },
        "slack": {
          "channel": "",
          "mention": "",
          "webhookURL": ""
        },
        "sms": {
          "from_mobile_number": "",
          "to_mobile_numbers": [],
          "twilio_account_sid": "",
          "twilio_auth_token": ""
        },
        "syslog": {
          "host": "",
          "json": false,
          "port": "",
          "protocol": "UDP"
        },
        "webhook": {
          "url": ""
        }
      }
    }
];

module.exports = {
    policies,
    rules,
    notifiers
};