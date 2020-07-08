/* eslint-disable */ 
export const DB ={
   "token":{
      "accessToken":"fake-token-12345789-abcdefgh",
      "user":{
         "firstname":"Admin",
         "lastname":"",
         "email":"admin@test.com",
         "password":"password"
      }
   },
   "customers":[
      {
         "membership":false,
         "mobile":"555-555-555",
         "rewards":21,
         "id":2,
         "firstname":"Marc",
         "lastname":"Dupont",
         "email":"abc@test.com",
         "avatar":"/assets/img/avatar3.png"
      },
      {
         "membership":false,
         "mobile":"555-555-555",
         "rewards":89,
         "id":4,
         "firstname":"Jean",
         "lastname":"Durand",
         "email":"test@test.com",
         "avatar":"/assets/img/avatar4.png"
      },
      {
         "membership":false,
         "mobile":"555-555-555",
         "rewards":38,
         "id":5,
         "firstname":"Franck",
         "lastname":"Pavard",
         "email":"test@test.com",
         "avatar":"/assets/img/avatar2.png"
      },
      {
         "membership":false,
         "mobile":"555-555-555",
         "rewards":23,
         "id":6,
         "firstname":"Aurélien",
         "lastname":"Dumas",
         "email":"test@test.com",
         "avatar":"/assets/img/avatar1.png"
      },
      {
         "membership":true,
         "mobile":"555-555-555",
         "rewards":23,
         "id":8,
         "firstname":"Nicolas",
         "lastname":"Verney",
         "email":"test@test.com",
         "avatar":"/assets/img/avatar5.png"
      },
      {
         "membership":true,
         "mobile":"555-555-555",
         "rewards":26,
         "id":9,
         "firstname":"Michel",
         "lastname":"Fournier",
         "email":"test@test.com",
         "avatar":"/assets/img/avatar1.png"
      },
      {
         "membership":false,
         "mobile":"555-555-555",
         "rewards":22,
         "id":10,
         "firstname":"Nathalie",
         "lastname":"Giroud",
         "email":"test@test.com",
         "avatar":"/assets/img/avatar2.png"
      },
      {
         "membership":true,
         "mobile":"555-555-555",
         "rewards":38,
         "id":11,
         "firstname":"Henri",
         "lastname":"Duc",
         "email":"test@test.com",
         "avatar":"/assets/img/avatar5.png"
      },
      {
         "membership":false,
         "mobile":"555-555-555",
         "rewards":27,
         "id":12,
         "firstname":"Yann",
         "lastname":"Larrel",
         "email":"test@test.com",
         "avatar":"/assets/img/avatar1.png"
      },
      {
         "membership":true,
         "firstname":"Aymeric",
         "lastname":"Pignard",
         "mobile":"555-555-555",
         "rewards":88,
         "email":"john.doe@test.com",
         "id":13
      },
      {
         "avatar":null,
         "firstname":"Gregory",
         "lastname":"Doucet",
         "mobile":"555-555-555",
         "rewards":22,
         "email":"sdfsdfsdfs",
         "membership":false,
         "id":14
      }
   ],
   "orders":[
      {
         "id":2,
         "reference":"offre-2-2-1-2",
         "customerId":2,
         "products":[
            {
               "id":1,
               "name":"Local 1",
               "categoryId":1,
               "numInStock":0,
               "unitPrice":18
            },
            {
               "id":2,
               "name":"Local 2",
               "categoryId":1,
               "numInStock":0,
               "unitPrice":19
            }
         ],
         "amount":9.99,
         "orderDate":"2017-01-01",
         "shippedDate":"2017-01-01",
         "shipAddress":{
            "address":"Gran Vía, 0123",
            "city":"Madrid",
            "zipcode":"10298",
            "country":"Spain"
         }
      },
      {
         "id":3,
         "reference":"offre-4-3-1-2",
         "customerId":4,
         "products":[
            {
               "id":1,
               "name":"Local 1",
               "categoryId":1,
               "numInStock":0,
               "unitPrice":18
            },
            {
               "id":2,
               "name":"Local 2",
               "categoryId":1,
               "numInStock":0,
               "unitPrice":19
            }
         ],
         "amount":5.99,
         "orderDate":"2017-01-01",
         "shippedDate":"2017-01-01",
         "shipAddress":{
            "address":"Gran Vía, 0123",
            "city":"Madrid",
            "zipcode":"10298",
            "country":"Spain"
         }
      },
      {
         "id":4,
         "reference":"offre-4-4-1-2",
         "customerId":4,
         "products":[
            {
               "id":3,
               "name":"Local 3",
               "categoryId":2,
               "numInStock":0,
               "unitPrice":10
            },
            {
               "id":4,
               "name":"Local 4",
               "categoryId":2,
               "numInStock":0,
               "unitPrice":22
            }
         ],
         "amount":499.99,
         "orderDate":"2017-01-01",
         "shippedDate":"2017-01-01",
         "shipAddress":{
            "address":"Gran Vía, 0123",
            "city":"Madrid",
            "zipcode":"10298",
            "country":"Spain"
         }
      },
      {
         "id":5,
         "reference":"offre-5-5-1-2",
         "customerId":5,
         "products":[
            {
               "id":5,
               "name":"Local 5",
               "categoryId":2,
               "numInStock":0,
               "unitPrice":21.5
            }
         ],
         "amount":399.99,
         "orderDate":"2017-01-01",
         "shippedDate":"2017-01-01",
         "shipAddress":{
            "address":"Gran Vía, 0123",
            "city":"Madrid",
            "zipcode":"10298",
            "country":"Spain"
         }
      },
      {
         "id":6,
         "reference":"offre-6-6-1-2",
         "customerId":6,
         "products":[
            {
               "id":5,
               "name":"Local 5",
               "categoryId":2,
               "numInStock":0,
               "unitPrice":21.5
            }
         ],
         "amount":329.99,
         "orderDate":"2017-01-01",
         "shippedDate":"2017-01-01",
         "shipAddress":{
            "address":"Gran Vía, 0123",
            "city":"Madrid",
            "zipcode":"10298",
            "country":"Spain"
         }
      },
      {
         "id":8,
         "reference":"offre-8-8-1-2",
         "customerId":8,
         "products":[
            {
               "id":5,
               "name":"Local 5",
               "categoryId":2,
               "numInStock":0,
               "unitPrice":21.5
            }
         ],
         "amount":89.99,
         "orderDate":"2017-01-12",
         "shippedDate":"2017-01-10",
         "shipAddress":{
            "address":"Gran Vía, 0123",
            "city":"Madrid",
            "zipcode":"10298",
            "country":"Spain"
         }
      },
      {
         "id":9,
         "reference":"offre-9-9-1-2",
         "customerId":9,
         "products":[
            {
               "id":5,
               "name":"Local 5",
               "categoryId":2,
               "numInStock":0,
               "unitPrice":21.5
            }
         ],
         "amount":59.99,
         "orderDate":"2017-01-01",
         "shippedDate":"2017-01-01",
         "shipAddress":{
            "address":"Gran Vía, 0123",
            "city":"Madrid",
            "zipcode":"10298",
            "country":"Spain"
         }
      },
      {
         "id":10,
         "reference":"offre-10-10-1-2",
         "customerId":10,
         "products":[
            {
               "id":5,
               "name":"Local 5",
               "categoryId":2,
               "numInStock":0,
               "unitPrice":21.5
            }
         ],
         "amount":49.99,
         "orderDate":"2017-01-01",
         "shippedDate":"2017-01-01",
         "shipAddress":{
            "address":"Gran Vía, 0123",
            "city":"Madrid",
            "zipcode":"10298",
            "country":"Spain"
         }
      },
      {
         "id":12,
         "reference":"offre-2-12-1-2",
         "customerId":2,
         "products":[
            {
               "id":5,
               "name":"Local 5",
               "categoryId":2,
               "numInStock":0,
               "unitPrice":21.5
            }
         ],
         "amount":49.99,
         "orderDate":"2017-01-01",
         "shippedDate":"2017-01-01",
         "shipAddress":{
            "address":"Gran Vía, 0123",
            "city":"Madrid",
            "zipcode":"10298",
            "country":"Spain"
         }
      },
      {
         "id":14,
         "reference":"offre-2-14-1-2",
         "customerId":4,
         "products":[
            {
               "id":5,
               "name":"Local 5",
               "categoryId":2,
               "numInStock":0,
               "unitPrice":21.5
            }
         ],
         "amount":19.99,
         "orderDate":"2017-01-09",
         "shippedDate":"2017-01-01",
         "shipAddress":{
            "address":"Gran Vía, 0123",
            "city":"Madrid",
            "zipcode":"10298",
            "country":"Spain"
         }
      },
      {
         "id":15,
         "reference":"offre-11-15-1-2",
         "customerId":11,
         "products":[
            {
               "id":5,
               "name":"Local 5",
               "categoryId":2,
               "numInStock":0,
               "unitPrice":21.5
            },
            {
               "id":19,
               "name":"Local 6",
               "categoryId":3,
               "numInStock":0,
               "unitPrice":9.2,
               "category":{
                  "id":3,
                  "name":"Confections",
                  "description":"Desserts, candies, and sweet breads",
                  "picture":null
               },
               "text":"Local 6",
               "value":19
            }
         ],
         "amount":222,
         "orderDate":"2017-01-19",
         "shippedDate":"2017-01-16",
         "shipAddress":{
            "address":"Gran Vía, 0123",
            "city":"Madrid",
            "zipcode":"10298",
            "country":"Spain"
         },
         "quantity":12,
         "price":33
      },
      {
         "products":[
            {
               "id":4,
               "name":"Local 4",
               "categoryId":2,
               "numInStock":2,
               "unitPrice":22,
               "category":{
                  "id":2,
                  "name":"Condiments",
                  "description":"Sweet and savory sauces, relishes, spreads, and seasonings",
                  "picture":null
               },
               "text":"Local 4",
               "value":4
            },
            {
               "id":6,
               "name":"Local 7",
               "categoryId":2,
               "numInStock":0,
               "unitPrice":25,
               "category":{
                  "id":2,
                  "name":"Condiments",
                  "description":"Sweet and savory sauces, relishes, spreads, and seasonings",
                  "picture":null
               },
               "text":"Local 7",
               "value":6
            }
         ],
         "customerId":4,
         "orderDate":"2017-08-08",
         "shippedDate":null,
         "shipAddress":{
            "address":"sss",
            "city":"sss",
            "zipcode":"sss",
            "country":"sss"
         },
         "reference":"ss-2-22-22",
         "amount":2323,
         "id":16
      }
   ],
   "products":[
      {
         "id":1,
         "name":"Local 1",
         "categoryId":1,
         "numInStock":23,
         "unitPrice":18
      },
      {
         "id":2,
         "name":"Local 2",
         "categoryId":1,
         "numInStock":10,
         "unitPrice":19
      },
      {
         "id":3,
         "name":"Local 3",
         "categoryId":2,
         "numInStock":0,
         "unitPrice":10
      },
      {
         "id":4,
         "name":"Local 4",
         "categoryId":2,
         "numInStock":2,
         "unitPrice":22
      },
      {
         "id":5,
         "name":"Local 5",
         "categoryId":2,
         "numInStock":333,
         "unitPrice":21.5
      },
      {
         "id":6,
         "name":"Local 7",
         "categoryId":2,
         "numInStock":0,
         "unitPrice":25
      },
      {
         "id":7,
         "name":"Local 8",
         "categoryId":3,
         "numInStock":0,
         "unitPrice":30
      },
      {
         "id":8,
         "name":"Local 9",
         "categoryId":2,
         "numInStock":0,
         "unitPrice":40
      },
      {
         "id":9,
         "name":"Local 10",
         "categoryId":2,
         "numInStock":0,
         "unitPrice":97
      },
      {
         "id":10,
         "name":"Local 11",
         "categoryId":3,
         "numInStock":0,
         "unitPrice":31
      },
      {
         "id":11,
         "name":"Local 12",
         "categoryId":2,
         "numInStock":0,
         "unitPrice":21
      },
      {
         "id":12,
         "name":"Local 13",
         "categoryId":2,
         "numInStock":0,
         "unitPrice":38
      },
      {
         "id":13,
         "name":"Local 14",
         "categoryId":3,
         "numInStock":0,
         "unitPrice":6
      },
      {
         "id":14,
         "name":"Local 15",
         "categoryId":3,
         "numInStock":0,
         "unitPrice":23.5
      },
      {
         "id":15,
         "name":"Local 16",
         "categoryId":2,
         "numInStock":33,
         "unitPrice":15.5
      },
      {
         "id":16,
         "name":"Local 17",
         "categoryId":3,
         "numInStock":0,
         "unitPrice":17.5
      },
      {
         "id":17,
         "name":"Local 18",
         "categoryId":2,
         "numInStock":0,
         "unitPrice":39
      },
      {
         "id":18,
         "name":"Local 19",
         "categoryId":3,
         "numInStock":0,
         "unitPrice":62.5
      },
      {
         "id":19,
         "name":"Local 6",
         "categoryId":3,
         "numInStock":0,
         "unitPrice":9.2
      },
      {
         "id":20,
         "name":"Local 20",
         "categoryId":3,
         "numInStock":23,
         "unitPrice":81
      },
      {
         "id":21,
         "name":"Local 21",
         "categoryId":3,
         "numInStock":0,
         "unitPrice":18
      },
      {
         "id":22,
         "name":"Local 22",
         "categoryId":1,
         "numInStock":0,
         "unitPrice":21
      },
      {
         "id":23,
         "name":"Local 23",
         "categoryId":1,
         "numInStock":0,
         "unitPrice":9.5
      },
      {
         "id":24,
         "name":"Local 24",
         "categoryId":2,
         "numInStock":0,
         "unitPrice":4.5
      },
      {
         "categoryId":3,
         "name":"Local 25",
         "unitPrice":222,
         "numInStock":23,
         "id":26
      },
      {
         "id":27,
         "name":"Local 26",
         "categoryId":3,
         "numInStock":"22",
         "unitPrice":"234"
      }
   ],
   "categories":[
      {
         "id":1,
         "name":"Local d'activité",
         "description":"Local d'activité",
         "picture":null
      },
      {
         "id":2,
         "name":"Local vacant",
         "description":"Local vacant",
         "picture":null
      },
      {
         "id":3,
         "name":"Terrain",
         "description":"Terrain",
         "picture":null
      }
   ]
};