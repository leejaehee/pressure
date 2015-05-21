/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Pressure.view.data.Data', {
    extend: 'Ext.form.Panel',
    alias: 'widget.data',
    requires: [
        'Pressure.view.data.DataController',
        'Pressure.view.data.DataModel'
    ],

    controller: 'data',

    viewModel: {
        type: 'data'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults: {
        labelAlign: 'right',
        anchor: '100%',
        margins: '10 10 10 10'
    },
    defaultType: 'textfield',
    items: [
        {
            columnWidth: 0.35,
            margin: '0 0 0 10',
            xtype: 'fieldset',
            title: 'PSV NO',
            layout: 'anchor',
            defaultType: 'textfield',
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'PSV NO',
                    bind: {
                        store: '{psvNoComboStore}'
                    },
                    displayField: 'psvNo',
                    valueField: 'psvNo',
                    editable: false,
                    name: 'psvNo',
                    itemId: 'psvNo',
                    listeners: {
                        scope: this,
                        'select': function (combo, record, eOpts) {
                            Ext.Ajax.request({
                                url: '/sheet/get.json',
                                method: 'GET',
                                params: {
                                    PSVNo: record.data.psvNo
                                },
                                success: function (response) {
                                    var res = Ext.decode(response.responseText);

                                    Ext.ComponentQuery.query('#customerField')[0].setValue('');
                                    Ext.ComponentQuery.query('#locationField')[0].setValue('');
                                    Ext.ComponentQuery.query('#fluidField')[0].setValue('');
                                    Ext.ComponentQuery.query('#makerField')[0].setValue('');
                                    Ext.ComponentQuery.query('#typeField')[0].setValue('');
                                    Ext.ComponentQuery.query('#serialNoField')[0].setValue('');
                                    Ext.ComponentQuery.query('#sizeInField')[0].setValue('');
                                    Ext.ComponentQuery.query('#sizeOutField')[0].setValue('');
                                    Ext.ComponentQuery.query('#setPressureField')[0].setValue('');
                                    Ext.ComponentQuery.query('#backPressureField')[0].setValue('');
                                    Ext.ComponentQuery.query('#pressureTypeField')[0].setValue('');
                                    Ext.ComponentQuery.query('#testDateField')[0].setValue('');
                                    Ext.ComponentQuery.query('#adjustScrewField')[0].setValue('');
                                    Ext.ComponentQuery.query('#upperingField')[0].setValue('');
                                    Ext.ComponentQuery.query('#loweringField')[0].setValue('');
                                    Ext.ComponentQuery.query('#workerField')[0].setValue('');
                                    Ext.ComponentQuery.query('#inspectorField')[0].setValue('');
                                    Ext.ComponentQuery.query('#managerField')[0].setValue('');

                                    if (res.map.CUSTOMER) {
                                        Ext.ComponentQuery.query('#customerField')[0].setValue(res.map.CUSTOMER);
                                    }

                                    if (res.map.LOCATION) {
                                        Ext.ComponentQuery.query('#locationField')[0].setValue(res.map.LOCATION);
                                    }

                                    if (res.map.FLUID) {
                                        Ext.ComponentQuery.query('#fluidField')[0].setValue(res.map.FLUID);
                                    }

                                    if (res.map.MAKER) {
                                        Ext.ComponentQuery.query('#makerField')[0].setValue(res.map.MAKER);
                                    }

                                    if (res.map.TEST_TYPE) {
                                        Ext.ComponentQuery.query('#typeField')[0].setValue(res.map.TEST_TYPE);
                                    }

                                    if (res.map.SERIAL_NO) {
                                        Ext.ComponentQuery.query('#serialNoField')[0].setValue(res.map.SERIAL_NO);
                                    }

                                    if (res.map.INLET_SIZE) {
                                        Ext.ComponentQuery.query('#sizeInField')[0].setValue(res.map.INLET_SIZE);
                                    }

                                    if (res.map.OUTLET_SIZE) {
                                        Ext.ComponentQuery.query('#sizeOutField')[0].setValue(res.map.OUTLET_SIZE);
                                    }

                                    if (res.map.SET_PRESS) {
                                        Ext.ComponentQuery.query('#setPressureField')[0].setValue(res.map.SET_PRESS);
                                    }

                                    if (res.map.BACK_PRESS) {
                                        Ext.ComponentQuery.query('#backPressureField')[0].setValue(res.map.BACK_PRESS);
                                    }

                                    if (res.map.VELVE_TYPE) {
                                        Ext.ComponentQuery.query('#pressureTypeField')[0].setValue(res.map.VELVE_TYPE);
                                    }

                                    if (res.map.TEST_DATE) {
                                        Ext.ComponentQuery.query('#testDateField')[0].setValue(res.map.TEST_DATE);
                                    }

                                    if (res.map.ADJUST_SCREW) {
                                        Ext.ComponentQuery.query('#adjustScrewField')[0].setValue(res.map.ADJUST_SCREW);
                                    }

                                    if (res.map.UPPERING) {
                                        Ext.ComponentQuery.query('#upperingField')[0].setValue(res.map.UPPERING);
                                    }

                                    if (res.map.LOWERING) {
                                        Ext.ComponentQuery.query('#loweringField')[0].setValue(res.map.LOWERING);
                                    }

                                    if (res.map.WORKER) {
                                        Ext.ComponentQuery.query('#workerField')[0].setValue(res.map.WORKER);
                                    }

                                    if (res.map.INSPECTOR) {
                                        Ext.ComponentQuery.query('#inspectorField')[0].setValue(res.map.INSPECTOR);
                                    }

                                    if (res.map.MANAGER) {
                                        Ext.ComponentQuery.query('#managerField')[0].setValue(res.map.MANAGER);
                                    }
                                },
                                failure: function () {
                                }
                            });
                        }
                    }
                }
            ]
        },
        {
            xtype: 'form',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                labelAlign: 'right',
                anchor: '100%',
                margins: '10 10 10 10'
            },
            defaultType: 'textfield',

            items: [
                {
                    columnWidth: 0.35,
                    margin: '0 0 0 10',
                    xtype: 'fieldset',
                    title: 'Job Information',
                    layout: 'anchor',
                    itemId: 'jobInfoForm',
                    defaultType: 'textfield',
                    items: [
                        {
                            fieldLabel: 'Customer',
                            itemId: 'customerField',
                            name: 'customer'
                        },
                        {
                            fieldLabel: 'Location',
                            itemId: 'locationField',
                            name: 'lacation'
                        },
                        {
                            fieldLabel: 'Fluid',
                            itemId: 'fluidField',
                            name: 'fluid'
                        },
                        {
                            fieldLabel: 'Maker',
                            itemId: 'makerField',
                            name: 'maker'
                        },
                        {
                            fieldLabel: 'Type',
                            itemId: 'typeField',
                            name: 'type'
                        },
                        {
                            fieldLabel: 'Serial NO',
                            itemId: 'serialNoField',
                            name: 'serialNo'
                        }
                    ]
                },
                {
                    columnWidth: 0.35,
                    margin: '0 0 0 10',
                    xtype: 'fieldset',
                    title: 'Size',
                    layout: 'anchor',
                    defaultType: 'textfield',
                    items: [
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Size In',
                            itemId: 'sizeInField',
                            name: 'sizeIn',
                            hideTrigger: true,
                            allowBlank: false,
                            minValue: 0,
                            value: 0,
                            allowDecimals: false
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Size Out',
                            itemId: 'sizeOutField',
                            name: 'sizeOut',
                            hideTrigger: true,
                            allowBlank: false,
                            minValue: 0,
                            value: 0,
                            allowDecimals: false
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Set Pressure',
                            itemId: 'setPressureField',
                            name: 'setPressure'
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Back Pressure',
                            itemId: 'backPressureField',
                            name: 'backPressure'
                        },
                        {
                            fieldLabel: 'Pressure Type',
                            itemId: 'pressureTypeField',
                            name: 'pressureType'
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'testDateField',
                            fieldLabel: 'Test Date',
                            name: 'testDate',
                            renderer: function (value) {
                                return App.Util.Date.format(new Date(), 'yyyy-MM-dd HH:mm:ss');
//                                return App.Util.Date.format(new Date(value), 'yyyy-MM-dd HH:mm:ss');
                            }

                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            defaults: {
                labelAlign: 'right',
                anchor: '100%',
                margins: '10 10 10 10'
            },
            defaultType: 'textfield',
            items: [
                {
                    columnWidth: 0.35,
                    margin: '0 0 0 10',
                    xtype: 'fieldset',
                    title: 'Test results',
                    layout: 'anchor',
                    defaultType: 'textfield',
                    items: [
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Adjust Screw',
                            itemId: 'adjustScrewField',
                            name: 'adjustScrew',
                            hideTrigger: true,
                            allowBlank: false,
                            minValue: 0,
                            value: 0
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Uppering',
                            itemId: 'upperingField',
                            name: 'uppering',
                            hideTrigger: true,
                            allowBlank: false,
                            minValue: 0,
                            value: 0,
                            allowDecimals: false
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Lowering',
                            itemId: 'loweringField',
                            name: 'lowering',
                            hideTrigger: true,
                            allowBlank: false,
                            minValue: 0,
                            value: 0,
                            allowDecimals: false
                        }
                    ]
                },
                {
                    columnWidth: 0.35,
                    margin: '0 0 0 10',
                    xtype: 'fieldset',
                    title: 'Tested by',
                    layout: 'anchor',
                    defaultType: 'textfield',
                    items: [
                        {
                            fieldLabel: 'Worker',
                            itemId: 'workerField',
                            name: 'worker'
                        },
                        {
                            fieldLabel: 'Inspector',
                            itemId: 'inspectorField',
                            name: 'inspector'
                        },
                        {
                            fieldLabel: 'Manager',
                            itemId: 'managerField',
                            name: 'manager'
                        }
                    ]
                }
            ]
        }
    ],
    bbarCfg:{
        buttonAlign:'center'  //for center align
        // buttonAlign:'left' //for left align
        // buttonAlign:'right' //for right align
    },
    bbar: [
        '->',
        {
            itemId: 'newSheetMeta',
            xtype: 'button',
            scale: 'medium',
            text: 'NEW',
            handler: 'onCreateSheetMetaClick'
        },
        {
            itemId: 'saveSheetMeta',
            xtype: 'button',
            scale: 'medium',
            text: 'SAVE',
            handler: function (btn) {
                var params = {
                    psvNo: Ext.ComponentQuery.query('#psvNo')[0].getValue(),
                    customerField: Ext.ComponentQuery.query('#customerField')[0].getValue(),
                    locationField: Ext.ComponentQuery.query('#locationField')[0].getValue(),
                    fluidField: Ext.ComponentQuery.query('#fluidField')[0].getValue(),
                    makerField: Ext.ComponentQuery.query('#makerField')[0].getValue(),
                    typeField: Ext.ComponentQuery.query('#typeField')[0].getValue(),
                    serialNoField: Ext.ComponentQuery.query('#serialNoField')[0].getValue(),
                    sizeInField: Ext.ComponentQuery.query('#sizeInField')[0].getValue(),
                    sizeOutField: Ext.ComponentQuery.query('#sizeOutField')[0].getValue(),
                    setPressureField: Ext.ComponentQuery.query('#setPressureField')[0].getValue(),
                    backPressureField: Ext.ComponentQuery.query('#backPressureField')[0].getValue(),
                    pressureTypeField: Ext.ComponentQuery.query('#pressureTypeField')[0].getValue(),
                    testDateField: Ext.ComponentQuery.query('#testDateField')[0].getValue(),
                    adjustScrewField: Ext.ComponentQuery.query('#adjustScrewField')[0].getValue(),
                    upperingField: Ext.ComponentQuery.query('#upperingField')[0].getValue(),
                    loweringField: Ext.ComponentQuery.query('#loweringField')[0].getValue(),
                    workerField: Ext.ComponentQuery.query('#workerField')[0].getValue(),
                    inspectorField: Ext.ComponentQuery.query('#inspectorField')[0].getValue(),
                    managerField: Ext.ComponentQuery.query('#managerField')[0].getValue()
                }

                Ext.Ajax.request({
                    url: '/sheet/save',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=utf-8;'
                    },
                    params: Ext.encode(params),
                    success: function () {
                    },
                    failure: function () {
                    }
                });
            }
        },
        {
            itemId: 'deleteSheetMeta',
            xtype: 'button',
            scale: 'medium',
            text: 'DELETE',
            handler: function (btn) {
                Ext.Ajax.request({
                    url: '/sheet/delete',
                    method: 'GET',
                    params: {
                        PSVNo: Ext.ComponentQuery.query('#psvNo')[0].getValue()
                    },
                    success: function () {
                        Ext.ComponentQuery.query('#psvNo')[0].setValue('');
                        Ext.ComponentQuery.query('#customerField')[0].setValue('');
                        Ext.ComponentQuery.query('#locationField')[0].setValue('');
                        Ext.ComponentQuery.query('#fluidField')[0].setValue('');
                        Ext.ComponentQuery.query('#makerField')[0].setValue('');
                        Ext.ComponentQuery.query('#typeField')[0].setValue('');
                        Ext.ComponentQuery.query('#serialNoField')[0].setValue('');
                        Ext.ComponentQuery.query('#sizeInField')[0].setValue('');
                        Ext.ComponentQuery.query('#sizeOutField')[0].setValue('');
                        Ext.ComponentQuery.query('#setPressureField')[0].setValue('');
                        Ext.ComponentQuery.query('#backPressureField')[0].setValue('');
                        Ext.ComponentQuery.query('#pressureTypeField')[0].setValue('');
                        Ext.ComponentQuery.query('#testDateField')[0].setValue('');
                        Ext.ComponentQuery.query('#adjustScrewField')[0].setValue('');
                        Ext.ComponentQuery.query('#upperingField')[0].setValue('');
                        Ext.ComponentQuery.query('#loweringField')[0].setValue('');
                        Ext.ComponentQuery.query('#workerField')[0].setValue('');
                        Ext.ComponentQuery.query('#inspectorField')[0].setValue('');
                        Ext.ComponentQuery.query('#managerField')[0].setValue('');
                        Ext.ComponentQuery.query('#psvNo')[0].getStore().reload();
                    },
                    failure: function () {
                    }
                });
            }
        },
        {
            xtype: 'button',
            scale: 'medium',
            text: 'CLOSE',
            handler: function (btn) {
                btn.up('window').close();
            }
        },
        '->'
    ]
});
