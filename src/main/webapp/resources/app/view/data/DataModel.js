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
                'PSV_NO'
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
        }
    }
    //TODO - add data, formulas and/or methods to support your view
});