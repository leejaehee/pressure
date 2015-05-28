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
            },
            listeners:{
                load: function(){
                    Ext.ComponentQuery.query('data')[0].getForm().setValues(COMMON);
                }
            }
        }
    }
    //TODO - add data, formulas and/or methods to support your view
});