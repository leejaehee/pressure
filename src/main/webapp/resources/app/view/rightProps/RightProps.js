/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Pressure.view.rightProps.RightProps', {
    extend: 'Ext.form.Panel',
    alias: 'widget.rightProps',
    requires: [
        'Pressure.view.rightProps.RightPropsController',
        'Pressure.view.rightProps.RightPropsModel'
    ],

    controller: 'rightProps',

    viewModel: {
        type: 'rightProps'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults: {
        labelAlign: 'right',
        anchor: '100%',
        width: 317,
        margins: '10 10 10 10'
    },
    defaultType: 'textfield',
    items: [
        {
            xtype: 'form',
            layout: {
                type: 'hbox'
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
                    title: 'Company details',
                    layout: 'anchor',
                    defaultType: 'textfield',
                    width: 297,
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
                            itemId: 'PSV_NO',
                            name: 'PSV_NO',
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
                                            Ext.ComponentQuery.query('rightProps')[0].getForm().reset();
                                            Ext.ComponentQuery.query('rightProps')[0].getForm().setValues(res.map);
                                            COMMON = res.map;
                                            if (COMMON.TEST_DATE) {
                                                Ext.ComponentQuery.query('rightProps #TEST_DATE')[0].setValue(new Date(COMMON.TEST_DATE));
                                            }
                                        },
                                        failure: function () {
                                        }
                                    });
                                }
                            }
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Pressure',
                            itemId: 'SET_PRESS',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            name: 'SET_PRESS'
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
                type: 'hbox'
            },
            defaults: {
                labelAlign: 'right',
                anchor: '100%',
                margins: '10 10 10 10'
            },
            items: [
                {
                    columnWidth: 0.35,
                    margin: '0 0 0 10',
                    xtype: 'fieldset',
                    width: 297,
                    title: 'Pressure Values',
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Popping',
                                    labelStyle: 'font: normal 18px tahoma, arial, helvetica, sans-serif; text-align: right; vertical-align: middle;',
                                    fieldStyle: 'background-color: #333; color: green; font: normal 30px tahoma, arial, helvetica, sans-serif; text-align: right;',
                                    editable: false,
                                    name: 'poppingPressure',
                                    itemId: 'poppingPressure',
                                    width: 235,
                                    decimalPrecision: 4,
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    value: '0.0000'
                                },
                                {
                                    xtype: 'label',
                                    style: {
                                        font: 'normal 15px tahoma, arial, helvetica, sans-serif'
                                    },
                                    itemId: 'poppingPressureLabel',
                                    text: 'MPa'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Brow down',
                                    labelStyle: 'font: normal 18px tahoma, arial, helvetica, sans-serif; text-align: right; vertical-align: middle;',
                                    fieldStyle: 'background-color: #333; color: red; font: normal 30px tahoma, arial, helvetica, sans-serif; text-align: right;',
                                    editable: false,
                                    name: 'browDownpressure',
                                    itemId: 'browDownpressure',
                                    width: 235,
                                    decimalPrecision: 4,
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    value: '0.00'
                                },
                                {
                                    xtype: 'label',
                                    style: {
                                        font: 'normal 15px tahoma, arial, helvetica, sans-serif'
                                    },
                                    itemId: 'browDownpressureLabel',
                                    text: 'MPa'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Leak test',
                                    labelStyle: 'font: normal 18px tahoma, arial, helvetica, sans-serif; text-align: right; vertical-align: middle;',
                                    fieldStyle: 'background-color: #333; color: yellow; font: normal 30px tahoma, arial, helvetica, sans-serif; text-align: right;',
                                    editable: false,
                                    name: 'leakTestPressure',
                                    itemId: 'leakTestPressure',
                                    width: 235,
                                    decimalPrecision: 4,
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    value: '0.00'
                                },
                                {
                                    xtype: 'label',
                                    style: {
                                        font: 'normal 15px tahoma, arial, helvetica, sans-serif'
                                    },
                                    itemId: 'leakTestPressureLabel',
                                    text: 'MPa'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Torrent',
                                    labelStyle: 'font: normal 18px tahoma, arial, helvetica, sans-serif; text-align: right; vertical-align: middle;',
                                    fieldStyle: 'background-color: #333; color: blue; font: normal 30px tahoma, arial, helvetica, sans-serif; text-align: right;',
                                    editable: false,
                                    name: 'torrentPressure',
                                    itemId: 'torrentPressure',
                                    width: 235,
                                    decimalPrecision: 4,
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    value: '0.00'
                                },
                                {
                                    xtype: 'label',
                                    style: {
                                        font: 'normal 15px tahoma, arial, helvetica, sans-serif'
                                    },
                                    itemId: 'torrentPressureLabel',
                                    text: 'MPa'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            layout: {
                type: 'hbox'
            },
            defaults: {
                labelAlign: 'right',
                anchor: '100%',
                margins: '10 10 10 10'
            },
            items: [
                {
                    columnWidth: 0.35,
                    margin: '0 0 0 10',
                    xtype: 'fieldset',
                    width: 297,
                    title: 'Test Configurations',
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    fieldLabel: 'Set pressure',
                                    labelStyle: 'font: normal 15px tahoma, arial, helvetica, sans-serif; text-align: right; vertical-align: middle;',
                                    fieldStyle: 'background-color: #333; color: blue; font: normal 20px tahoma, arial, helvetica, sans-serif; text-align: right;',
                                    name: 'settingPressure',
                                    itemId: 'settingPressure',
                                    width: 235,
                                    decimalPrecision: 4,
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    value: '0.001'
                                },
                                {
                                    xtype: 'label',
                                    style: {
                                        font: 'normal 15px tahoma, arial, helvetica, sans-serif'
                                    },
                                    itemId: 'settingPressureLabel',
                                    text: 'MPa'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    itemId: 'scanTimeRigthProps',
                                    xtype: 'numberfield',
                                    fieldLabel: 'Scan time',
                                    labelStyle: 'font: normal 15px tahoma, arial, helvetica, sans-serif; text-align: right; vertical-align: middle;',
                                    fieldStyle: 'background-color: #333; color: yellow; font: normal 20px tahoma, arial, helvetica, sans-serif; text-align: right;',
                                    name: 'scanTime',
                                    width: 235,
                                    allowBlack: false,
                                    hideTrigger: true,
                                    keyNavEnabled: false,
                                    mouseWheelEnabled: false,
                                    value: '1000'
                                },
                                {
                                    xtype: 'label',
                                    style: {
                                        font: 'normal 15px tahoma, arial, helvetica, sans-serif'
                                    },
                                    text: 'ms'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            layout: {
                type: 'hbox'
            },
            defaults: {
                labelAlign: 'right',
                anchor: '100%',
                margins: '10 10 10 10'
            },
            items: [
                {
                    columnWidth: 0.35,
                    margin: '0 0 0 10',
                    xtype: 'fieldset',
                    width: 297,
                    title: 'Test Result',
                    items: [
                        {
                            itemId: 'testResult',
                            xtype: 'textfield',
                            width: 297,
                            fieldStyle: 'background-color: white; color: white; font: normal 20px tahoma, arial, helvetica, sans-serif;',
                            editable: false,
                            name: 'testResult',
                            value: '',
                            listners: {
                                blur: function (textField, event, eOpts) {
                                    if (textField.getValue() == '') {
                                        textField.setFieldStyle('background-color: green; color: white; font: normal 20px tahoma, arial, helvetica, sans-serif;')
                                        textField.setValue('SUCCESS');
                                    } else if (textField.getValue() == 'SUCCESS') {
                                        textField.setFieldStyle('background-color: red; color: yellow; font: normal 20px tahoma, arial, helvetica, sans-serif;')
                                        textField.setValue('FAIL');
                                    } else if (textField.getValue() == 'FAIL') {
                                        textField.setFieldStyle('background-color: green; color: white; font: normal 20px tahoma, arial, helvetica, sans-serif;')
                                        textField.setValue('SUCCESS');
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'form',
            layout: {
                type: 'hbox'
            },
            defaults: {
                labelAlign: 'right',
                anchor: '100%',
                margins: '10 10 10 10'
            },
            items: [
                {
                    columnWidth: 0.35,
                    margin: '0 0 0 10',
                    xtype: 'fieldset',
                    width: 297,
                    title: 'Pressure Values',
                    items: [
                        {
                            xtype: 'grid',
                            itemId: 'pressureGrid',
                            bind: {
                                store: '{pressureGridStore}'
                            },
                            height: 380,
                            scrollable: 'y',
                            columns: [
                                {
                                    xtype: 'rownumberer'
                                },
                                {
                                    text: 'Accumalted Time', dataIndex: 'accumaltedTime', width: 110, align: 'center',
                                    renderer: function (data) {
                                        if (this.getStore().getCount() == 1) {
                                            return 0;
                                        } else {
                                            return ((data - this.getStore().getAt(0).get('accumaltedTime')) / 1000).toFixed(2);
                                        }
                                    }
                                },
                                {text: 'value', dataIndex: 'pressureValue', width: 110, align: 'center'}
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
