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
            proxy: {
                type: 'ajax',
                url: '/sheet/list',
                reader: {
                    type: 'json',
                    rootProperty: 'list'
                }
            }
        }
    }
    //TODO - add data, formulas and/or methods to support your view
});