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
                    autoSelect: true,
                    displayField: 'PSV_NO',
                    valueField: 'PSV_NO',
                    editable: false,
                    name: 'PSV_NO',
                    itemId: 'PSV_NO',
                    listeners: {
                        scope: this,
                        'select': function (combo, record, eOpts) {
                            Ext.Ajax.request({
                                url: '/sheet/get.json',
                                method: 'GET',
                                params: {
                                    PSV_NO: record.data.PSV_NO
                                },
                                success: function (response) {
                                    var res = Ext.decode(response.responseText);
                                    Ext.ComponentQuery.query('data')[0].getForm().reset();
                                    Ext.ComponentQuery.query('data')[0].getForm().setValues(res.map);
                                    Ext.ComponentQuery.query('rightProps')[0].getForm().reset();
                                    Ext.ComponentQuery.query('rightProps')[0].getForm().setValues(res.map);
                                    COMMON = res.map;
                                    if(COMMON.TEST_DATE){
                                        Ext.ComponentQuery.query('rightProps #TEST_DATE')[0].setValue(new Date(COMMON.TEST_DATE));
                                        Ext.ComponentQuery.query('data #TEST_DATE')[0].setValue(new Date(COMMON.TEST_DATE));
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
                            itemId: 'CUSTOMER',
                            name: 'CUSTOMER'
                        },
                        {
                            fieldLabel: 'Location',
                            itemId: 'LOCATION',
                            name: 'LOCATION'
                        },
                        {
                            fieldLabel: 'Fluid',
                            itemId: 'FLUID',
                            name: 'FLUID'
                        },
                        {
                            fieldLabel: 'Maker',
                            itemId: 'MAKER',
                            name: 'MAKER'
                        },
                        {
                            fieldLabel: 'Type',
                            itemId: 'TEST_TYPE',
                            name: 'TEST_TYPE'
                        },
                        {
                            fieldLabel: 'Serial NO',
                            itemId: 'SERIAL_NO',
                            name: 'SERIAL_NO'
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
                            itemId: 'INLET_SIZE',
                            name: 'INLET_SIZE',
                            hideTrigger: true,
                            allowBlank: false,
                            minValue: 0,
                            value: 0,
                            allowDecimals: false
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Size Out',
                            itemId: 'OUTLET_SIZE',
                            name: 'OUTLET_SIZE',
                            hideTrigger: true,
                            allowBlank: false,
                            minValue: 0,
                            value: 0,
                            allowDecimals: false
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Set Pressure',
                            itemId: 'SET_PRESS',
                            name: 'SET_PRESS'
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Back Pressure',
                            itemId: 'BACK_PRESS',
                            name: 'BACK_PRESS'
                        },
                        {
                            fieldLabel: 'Pressure Type',
                            itemId: 'VELVE_TYPE',
                            name: 'VELVE_TYPE'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Test Date',
                            itemId: 'TEST_DATE',
                            format: 'Y-m-d',
                            name: 'TEST_DATE'
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
                            itemId: 'ADJUST_SCREW',
                            name: 'ADJUST_SCREW',
                            hideTrigger: true,
                            allowBlank: false,
                            minValue: 0,
                            value: 0
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Uppering',
                            itemId: 'UPPERING',
                            name: 'UPPERING',
                            hideTrigger: true,
                            allowBlank: false,
                            minValue: 0,
                            value: 0,
                            allowDecimals: false
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Lowering',
                            itemId: 'LOWERING',
                            name: 'LOWERING',
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
                            itemId: 'WORKER',
                            name: 'WORKER'
                        },
                        {
                            fieldLabel: 'Inspector',
                            itemId: 'INSPECTOR',
                            name: 'INSPECTOR'
                        },
                        {
                            fieldLabel: 'Manager',
                            itemId: 'MANAGER',
                            name: 'MANAGER'
                        }
                    ]
                }
            ]
        },
    ],
    bbarCfg:{
        buttonAlign:'center'
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
            handler: 'onSaveSheetMetaClick'
        },
        {
            itemId: 'deleteSheetMeta',
            xtype: 'button',
            scale: 'medium',
            text: 'DELETE',
            handler: 'onDeleteSheetMetaClick'
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
