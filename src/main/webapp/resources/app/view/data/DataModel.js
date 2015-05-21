/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Pressure.view.data.DataModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.data',

    data: {
        name: 'Pressure'
    },

    stores: {
        psvNoComboStore: {
            fields: [
                'psvNo'
            ],
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: '/sheet/list.json',
                reader: {
                    type: 'json',
                    rootProperty: 'list',
                    totalProperty: 'total',
                    idProperty: 'id'
                }
            }
        },
        samplePsvNoComboStore: {
            fields: [
                'psvNo'
            ],
            data: [
                {
                    psvNo: 'PSV-6101'
                },
                {
                    psvNo: 'SV-6912'
                },
                {
                    psvNo: 'SV-6333'
                },
                {
                    psvNo: 'SV-6500'
                }
            ]
        }
    }
    //TODO - add data, formulas and/or methods to support your view
});