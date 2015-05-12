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
                            bind:{
                                store: '{psvNoComboStore}'
                            },
                            displayField: 'psvNo',
                            valueField: 'psvNo',
                            editable: false,
                            name: 'psvNo'
                        },
                        {
                            fieldLabel: 'Pressure',
                            name: 'pressure'
                        },
                        {
                            fieldLabel: 'Type',
                            name: 'type'
                        },
                        {
                            fieldLabel: 'Serial NO',
                            name: 'type'
                        },
                        {
                            xtype: 'datefield',
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
                            xtype: 'textfield',
                            fieldLabel: 'Popping',
                            fieldStyle: 'background-color: #333; color: green; font: normal 30px tahoma, arial, helvetica, sans-serif;',
                            editable: false,
                            name: 'poppingPressure',
                            value: '000'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Brow Down',
                            fieldStyle: 'background-color: #333; color: red; font: normal 30px tahoma, arial, helvetica, sans-serif;',
                            editable: false,
                            name: 'browDownpressure',
                            value: '000'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Leak Test',
                            fieldStyle: 'background-color: #333; color: yellow; font: normal 30px tahoma, arial, helvetica, sans-serif;',
                            editable: false,
                            name: 'leakTestPressure',
                            value: '000'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Torrent',
                            fieldStyle: 'background-color: #333; color: blue; font: normal 30px tahoma, arial, helvetica, sans-serif;',
                            editable: false,
                            name: 'torrentPressure',
                            value: '000'
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
                            xtype: 'textfield',
                            fieldLabel: 'Setting Pressure',
                            fieldStyle: 'background-color: #333; color: blue; font: normal 20px tahoma, arial, helvetica, sans-serif;',
                            name: 'settingPressure',
                            value: '10.00'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Scan Time',
                            fieldStyle: 'background-color: #333; color: yellow; font: normal 20px tahoma, arial, helvetica, sans-serif;',
                            name: 'scanTime',
                            value: '1000'
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
