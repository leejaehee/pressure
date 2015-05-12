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
                    bind:{
                        store: '{psvNoComboStore}'
                    },
                    displayField: 'psvNo',
                    valueField: 'psvNo',
                    editable: false,
                    name: 'psvNo'
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
                    defaultType: 'textfield',
                    items: [
                        {
                            fieldLabel: 'Customer',
                            name: 'customer'
                        },
                        {
                            fieldLabel: 'Location',
                            name: 'lacation'
                        },
                        {
                            fieldLabel: 'Fluid',
                            name: 'fluid'
                        },
                        {
                            fieldLabel: 'Maker',
                            name: 'maker'
                        },
                        {
                            fieldLabel: 'Type',
                            name: 'type'
                        },
                        {
                            fieldLabel: 'Serial NO',
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
                            fieldLabel: 'Size In',
                            name: 'sizeIn'
                        },
                        {
                            fieldLabel: 'Size Out',
                            name: 'sizeOut'
                        },
                        {
                            fieldLabel: 'Set Pressure',
                            name: 'setPressure'
                        },
                        {
                            fieldLabel: 'Back Pressure',
                            name: 'backPressure'
                        },
                        {
                            fieldLabel: 'Pressure Type',
                            name: 'pressureType'
                        },
                        {
                            fieldLabel: 'Test Date',
                            name: 'testDate'
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
                            fieldLabel: 'Adjust Screw',
                            name: 'adjustScrew'
                        },
                        {
                            fieldLabel: 'Uppering',
                            name: 'uppering'
                        },
                        {
                            fieldLabel: 'Lowering',
                            name: 'lowering'
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
                            name: 'worker'
                        },
                        {
                            fieldLabel: 'Inspector',
                            name: 'inspector'
                        },
                        {
                            fieldLabel: 'Manager',
                            name: 'manager'
                        }
                    ]
                }
            ]
        }
    ],
    bbar: [
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
            text: 'SAVE'
        },
        {
            itemId: 'deleteSheetMeta',
            xtype: 'button',
            scale: 'medium',
            text: 'DELETE'
        },
        {
            xtype: 'button',
            scale: 'medium',
            text: 'CLOSE',
            handler: function(btn){
                btn.up('window').close();
            }
        }
    ]
});
