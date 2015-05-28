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
                'pressureValueNo',
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
        },
        samplePressureGridStore: {
            autoLoad: false,
            fields: [
                'pressureValueNo',
                'accumaltedTime',
                'pressureValue'
            ],
            data: [
                {
                    "pressureValueNo": "1",
                    "accumaltedTime": "1.00",
                    "pressureValue": "10.00"
                },
                {
                    "pressureValueNo": "2",
                    "accumaltedTime": "2.01",
                    "pressureValue": "10.00"
                }

            ]
        }
    }

    //TODO - add data, formulas and/or methods to support your view
});