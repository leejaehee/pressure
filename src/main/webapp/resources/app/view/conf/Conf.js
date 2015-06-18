/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Pressure.view.conf.Conf', {
    extend: 'Ext.form.Panel',
    alias: 'widget.conf',
    requires: [
        'Pressure.view.conf.ConfController',
        'Pressure.view.conf.ConfModel'
    ],

    controller: 'conf',

    viewModel: {
        type: 'conf'
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
            xtype: 'form',
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
                    title: 'RS232',
                    layout: 'anchor',
                    itemId: 'jobInfoForm',
                    defaultType: 'textfield',
                    items: [
                        {
                            xtype: 'combo',
                            fieldLabel: 'Port',
                            bind: {
                                store: '{portComboStore}'
                            },
                            displayField: 'portConf',
                            valueField: 'portConf',
                            editable: false,
                            name: 'portConf',
                            itemId: 'portConf',
                            listeners: {
                                afterrender: function (combo, eOpts) {
                                    this.value="COM3";
                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Baud rate',
                            bind: {
                                store: '{baudrateComboStore}'
                            },
                            displayField: 'baudrateConf',
                            valueField: 'baudrateConf',
                            editable: false,
                            name: 'baudrateConf',
                            itemId: 'baudrateConf',
                            listeners: {
                                afterrender: function (combo, eOpts) {
                                    this.value="19200";
                                }
                            }
                        }
                    ]
                },
                {
                    columnWidth: 0.35,
                    margin: '0 0 0 10',
                    xtype: 'fieldset',
                    title: 'Test',
                    layout: 'anchor',
                    defaultType: 'textfield',
                    items: [
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            margin: '0 0 5 0',
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'setPressureConf',
                                    fieldLabel: 'Set pressure',
                                    name: 'setPressureConf'
                                },
                                {
                                    xtype: 'label',
                                    itemId: 'setPressureConfLabel',
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
                            margin: '0 0 5 0',
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'scanTimeConf',
                                    fieldLabel: 'Scan time',
                                    name: 'scanTimeConf',
                                    allowBlank: false,
                                    value: 1000
                                },
                                {
                                    xtype: 'label',
                                    text: 'ms'
                                }
                            ]
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Pressure Unit',
                            bind: {
                                store: '{unitComboStore}'
                            },
                            allowBlank: false,
                            displayField: 'pressureUnitConf',
                            valueField: 'pressureUnitConf',
                            editable: false,
                            name: 'pressureUnitConf',
                            itemId: 'pressureUnitConf',
                            listeners: {
                                afterrender: function (combo, eOpts) {
                                    this.value="MPa";
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ],
    bbarCfg: {
        buttonAlign: 'center'
    },
    bbar: [
        '->',
        {
            itemId: 'settingConf',
            xtype: 'button',
            scale: 'medium',
            text: 'SETTING',
            handler: function (btn) {
                Ext.ComponentQuery.query('#scanTimeRigthProps')[0].setValue(Ext.ComponentQuery.query('#scanTimeConf')[0].getValue());

                var unit = Ext.ComponentQuery.query('#pressureUnitConf')[0].getValue(); // FIXME 그래프 단위 변경 필요

                Ext.ComponentQuery.query('#poppingPressureLabel')[0].setText(unit);
                Ext.ComponentQuery.query('#browDownpressureLabel')[0].setText(unit);
                Ext.ComponentQuery.query('#leakTestPressureLabel')[0].setText(unit);
                Ext.ComponentQuery.query('#torrentPressureLabel')[0].setText(unit);
                Ext.ComponentQuery.query('#settingPressureLabel')[0].setText(unit);
                Ext.ComponentQuery.query('#setPressureConfLabel')[0].setText(unit);

                Ext.ComponentQuery.query('#settingPressure')[0].setValue(Ext.ComponentQuery.query('#setPressureConf')[0].getValue());
            }
        },
        {
            xtype: 'button',
            scale: 'medium',
            text: 'CLOSE',
            handler: function (btn) {
                btn.up('window').hide();
            }
        },
        '->'
    ]
});
