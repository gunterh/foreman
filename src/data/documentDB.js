import Frequency from '../constants/enums';

export default {
    categories: [
        {
            id:'1',
            name:'2016',
            items:[
            ],
            categories:[
                {
                    id:'1',
                    name:'Q3',
                    items:[
                        {
                            type:'Plan', 
                            name: 'My first plan',     
                            startDate: new Date(),
                            offSet: 12,
                            frequency: Frequency.Daily,
                            valueSeriesId: '1',
                            scopeIds:['1','2','3'],
                            importCallback: null,
                            values:[
                                {
                                    id:'11',
                                    name: 'Lab 1',
                                    tags: [],
                                },
                                {
                                    id:'12',
                                    name: 'Lab 2',
                                    tags: [],
                                },
                                {
                                    id:'13',
                                    name: 'Lab 1',
                                    tags: [],
                                },
                                {
                                    id:'14',
                                    name: 'Lab 2',
                                    tags: [],
                                }
                            ],
                            columns: ['Jan', 'Feb', 'Mar'],
                            planData: [
                                {
                                    scopeId: '1',
                                    valueId: '11',
                                    colIndex: 0,
                                    planValue: null
                                }
                            ]
                        }
                    ],
                    categories:[
                        
                    ]
                }
            ]
        },
        {
            id: '2',
            name: '2017',
            categories: []
        }
    ]
};
