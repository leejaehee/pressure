/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Pressure.view.rightProps.RightPropsModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.rightProps',

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
        },
        pressureGridStore: {
            autoLoad: false,
            fields: [
                'accumaltedTime',
                {
                    name: 'pressureValue',
                    convert: function (value) {
                        return value;
                    }
                }
            ],
            proxy: {
                type: 'ajax',
                url: '', // FIXME server URL
                extraParams: {
                    testHistoryId: ''// Test History ID
                },
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