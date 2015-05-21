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
                            displayField: 'psvNo',
                            valueField: 'psvNo',
                            editable: false,
                            name: 'psvNo',
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

                                            Ext.ComponentQuery.query('#pressure')[0].setValue('');
                                            Ext.ComponentQuery.query('#type')[0].setValue('');
                                            Ext.ComponentQuery.query('#serialNo')[0].setValue('');
                                            Ext.ComponentQuery.query('#testDate')[0].setValue('');

                                            if (res.map.SET_PRESS) {
                                                Ext.ComponentQuery.query('#pressure')[0].setValue(res.map.SET_PRESS);
                                            }

                                            if (res.map.TEST_TYPE) {
                                                Ext.ComponentQuery.query('#type')[0].setValue(res.map.TEST_TYPE);
                                            }

                                            if (res.map.SERIAL_NO) {
                                                Ext.ComponentQuery.query('#serialNo')[0].setValue(res.map.SERIAL_NO);
                                            }

                                            if (res.map.TEST_DATE) {
                                                Ext.ComponentQuery.query('#testDate')[0].setValue(res.map.TEST_DATE);
                                            }
                                        },
                                        failure: function () {
                                        }
                                    });
                                }
                            }
                        },
                        {
                            fieldLabel: 'Pressure',
                            itemId: 'pressure',
                            name: 'pressure'
                        },
                        {
                            fieldLabel: 'Type',
                            itemId: 'type',
                            name: 'type'
                        },
                        {
                            fieldLabel: 'Serial NO',
                            itemId: 'serialNo',
                            name: 'serialNo'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Test Date',
                            itemId: 'testDate',
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
                                    xtype: 'textfield',
                                    fieldLabel: 'Popping',
                                    labelStyle: 'font: normal 18px tahoma, arial, helvetica, sans-serif; text-align: right; vertical-align: middle;',
                                    fieldStyle: 'background-color: #333; color: green; font: normal 30px tahoma, arial, helvetica, sans-serif; text-align: right;',
                                    editable: false,
                                    name: 'poppingPressure',
                                    itemId: 'poppingPressure',
                                    width: 235,
                                    value: '0.00'
                                },
                                {
                                    xtype: 'label',
                                    style: {
                                        font: 'normal 15px tahoma, arial, helvetica, sans-serif'
                                    },
                                    itemId: 'poppingPressureLabel',
                                    text: 'Mpa'
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
                                    xtype: 'textfield',
                                    fieldLabel: 'Brow down',
                                    labelStyle: 'font: normal 18px tahoma, arial, helvetica, sans-serif; text-align: right; vertical-align: middle;',
                                    fieldStyle: 'background-color: #333; color: red; font: normal 30px tahoma, arial, helvetica, sans-serif; text-align: right;',
                                    editable: false,
                                    name: 'browDownpressure',
                                    itemId: 'browDownpressure',
                                    width: 235,
                                    value: '0.00'
                                },
                                {
                                    xtype: 'label',
                                    style: {
                                        font: 'normal 15px tahoma, arial, helvetica, sans-serif'
                                    },
                                    itemId: 'browDownpressureLabel',
                                    text: 'Mpa'
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
                                    xtype: 'textfield',
                                    fieldLabel: 'Leak test',
                                    labelStyle: 'font: normal 18px tahoma, arial, helvetica, sans-serif; text-align: right; vertical-align: middle;',
                                    fieldStyle: 'background-color: #333; color: yellow; font: normal 30px tahoma, arial, helvetica, sans-serif; text-align: right;',
                                    editable: false,
                                    name: 'leakTestPressure',
                                    itemId: 'leakTestPressure',
                                    width: 235,
                                    value: '0.00'
                                },
                                {
                                    xtype: 'label',
                                    style: {
                                        font: 'normal 15px tahoma, arial, helvetica, sans-serif'
                                    },
                                    itemId: 'leakTestPressureLabel',
                                    text: 'Mpa'
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
                                    xtype: 'textfield',
                                    fieldLabel: 'Torrent',
                                    labelStyle: 'font: normal 18px tahoma, arial, helvetica, sans-serif; text-align: right; vertical-align: middle;',
                                    fieldStyle: 'background-color: #333; color: blue; font: normal 30px tahoma, arial, helvetica, sans-serif; text-align: right;',
                                    editable: false,
                                    name: 'torrentPressure',
                                    itemId: 'torrentPressure',
                                    width: 235,
                                    value: '0.00'
                                },
                                {
                                    xtype: 'label',
                                    style: {
                                        font: 'normal 15px tahoma, arial, helvetica, sans-serif'
                                    },
                                    itemId: 'torrentPressureLabel',
                                    text: 'Mpa'
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
                                    xtype: 'textfield',
                                    fieldLabel: 'Set pressure',
                                    labelStyle: 'font: normal 15px tahoma, arial, helvetica, sans-serif; text-align: right; vertical-align: middle;',
                                    fieldStyle: 'background-color: #333; color: blue; font: normal 20px tahoma, arial, helvetica, sans-serif; text-align: right;',
                                    name: 'settingPressure',
                                    itemId: 'settingPressure',
                                    width: 235,
                                    value: '10.00'
                                },
                                {
                                    xtype: 'label',
                                    style: {
                                        font: 'normal 15px tahoma, arial, helvetica, sans-serif'
                                    },
                                    itemId: 'settingPressureLabel',
                                    text: 'Mpa'
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
                                    xtype: 'textfield',
                                    fieldLabel: 'Scan time',
                                    labelStyle: 'font: normal 15px tahoma, arial, helvetica, sans-serif; text-align: right; vertical-align: middle;',
                                    fieldStyle: 'background-color: #333; color: yellow; font: normal 20px tahoma, arial, helvetica, sans-serif; text-align: right;',
                                    name: 'scanTime',
                                    itemId: 'scanTimeRigthProps',
                                    width: 235,
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
                            xtype: 'textfield',
                            width: 297,
                            fieldStyle: 'background-color: green; color: white; font: normal 20px tahoma, arial, helvetica, sans-serif;',
                            editable: false,
                            name: 'testResult',
                            value: 'SUCCESS',
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
                            bind: {
//                                store: '{pressureGridStore}'// FIXME after added store then replace this
                                store: '{samplePressureGridStore}'
                            },
                            columns: [
                                {text: 'No', dataIndex: 'pressureValueNo', width: 77, align: 'center'},
                                {text: 'Accumalted Time', dataIndex: 'accumaltedTime', width: 110, align: 'center'},
                                {text: 'value', dataIndex: 'pressureValue', width: 110, align: 'center'}
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
