export default {
    id: 1,
    startDate: new Date(),
    frequency: 'Monthly',
    numberOfIterations: 12,
    scopes: [
        {
            id: '006',
            name: 'PM Forecast'
        },
        {
            id: '005',
            name: 'Pipeline'
        },
        {
            id: '004',
            name: 'Upside'
        },
        {
            id: '003',
            name: 'Upside Bridge'
        },
        {
            id: '002',
            name: 'Commit'
        },
        {
            id: '001',
            name: 'Won'
        }
    ],
    items: [
        {
            id: '101',
            name: 'Client A'
        },
        {
            id: '102',
            name: 'Client B'
        },
        {
            id: '103',
            name: 'Client C'
        },
        {
            id: '104',
            name: 'Client D'
        },
        {
            id: '105',
            name: 'Client E'
        }
    ],
    iterations: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [
        {
            scope: '002',
            item: '102',
            iteration: 8,
            value: 10000
        },
        {
            scope: '001',
            item: '101',
            iteration: 0,
            value: 2000
        },
        {
            scope: '001',
            item: '101',
            iteration: 1,
            value: 3000
        },
        {
            scope: '001',
            item: '101',
            iteration: 2,
            value: 1500
        },
        {
            scope: '001',
            item: '101',
            iteration: 3,
            value: 2000
        },
        {
            scope: '001',
            item: '101',
            iteration: 4,
            value: 3000
        },
        {
            scope: '001',
            item: '101',
            iteration: 5,
            value: 20000
        },
        {
            scope: '001',
            item: '101',
            iteration: 7,
            value: 4500
        },
        {
            scope: '003',
            item: '103',
            iteration: 8,
            value: 6000
        },
        {
            scope: '003',
            item: '104',
            iteration: 8,
            value: 3500
        },
        {
            scope: '003',
            item: '105',
            iteration: 8,
            value: 1500
        },
        {
            scope: '004',
            item: '101',
            iteration: 7,
            value: 4500
        },
        {
            scope: '004',
            item: '103',
            iteration: 8,
            value: 6000
        },
        {
            scope: '004',
            item: '104',
            iteration: 8,
            value: 3500
        },
        {
            scope: '004',
            item: '105',
            iteration: 8,
            value: 1500
        }
    ]
};
