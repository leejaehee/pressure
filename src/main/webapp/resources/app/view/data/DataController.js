/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Pressure.view.data.DataController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox'
    ],

    alias: 'controller.data',

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },

    onCreateSheetMetaClick: function (btn, e, eOpts) {
        var popup = Ext.create('Ext.Window', {
            title: 'Create Sheet',
            layout: 'fit',
            modal: true,
            padding: '5',
            items: {
                xtype: 'form',
                bodyPadding: 5,
                width: 340,

                fieldDefaults: {
                    labelWidth: 110,
                    anchor: '100%'
                },

                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'PSV NO',
                        name: 'PSV_NO',
                        minValue: 1,
                        maxValue: 125
                    }
                ],

                bbar: [
                    {
                        xtype: 'button',
                        scale: 'medium',
                        text: 'CREATE',
                        handler: function (btn, e, eOpts) {
                            Ext.Msg.confirm(
                                'Confirm',
                                'Are you sure?',
                                function () {
                                    Ext.Ajax.request({
                                        url: '/sheet/create',
                                        method: 'GET',
                                        params: {
                                            PSV_NO: btn.up('form').down('textfield').getValue()
                                        },
                                        success: function (response) {
                                            Ext.toast({
                                                html: 'Create success.',
                                                closable: false,
                                                align: 't',
                                                slideInDuration: 400,
                                                minWidth: 400
                                            });
                                            Ext.ComponentQuery.query('data #PSV_NO')[0].getStore().reload();
                                            Ext.ComponentQuery.query('rightProps #PSV_NO')[0].getStore().reload();
                                        },
                                        failure: function () {
                                            Ext.toast({
                                                html: 'Create fail.',
                                                closable: false,
                                                align: 't',
                                                slideInDuration: 400,
                                                minWidth: 400
                                            });
                                        }
                                    });

                                    popup.close();
                                },
                                this
                            );
                        }
                    },
                    {
                        xtype: 'button',
                        scale: 'medium',
                        text: 'CANCEL',
                        handler: function () {
                            popup.close();
                        }
                    }
                ]
            }
        }).center().show();
    },

    onSaveSheetMetaClick: function (btn, e, eOpts) {
        COMMON = Ext.ComponentQuery.query('data')[0].getForm().getValues();

        Ext.Ajax.request({
            url: '/sheet/save',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8;'
            },
            params: Ext.encode(COMMON),
            success: function () {
                Ext.toast({
                    html: 'Save success.',
                    closable: false,
                    align: 't',
                    slideInDuration: 200,
                    minWidth: 400
                });
            },
            failure: function () {
                Ext.toast({
                    html: 'Save fail.',
                    closable: false,
                    align: 't',
                    slideInDuration: 200,
                    minWidth: 400
                });
            }
        });
    },

    onDeleteSheetMetaClick: function (btn, e, eOpts) {
        Ext.Ajax.request({
            url: '/sheet/delete',
            method: 'GET',
            params: {
                PSV_NO: Ext.ComponentQuery.query('data #PSV_NO')[0].getValue()
            },
            success: function () {
                Ext.ComponentQuery.query('data')[0].getForm().reset();
                Ext.ComponentQuery.query('rightProps')[0].getForm().reset();
                Ext.ComponentQuery.query('data #PSV_NO')[0].getStore().reload();
                Ext.ComponentQuery.query('rightProps #PSV_NO')[0].getStore().reload();
                COMMON = {};
                Ext.toast({
                    html: 'Delete success.',
                    closable: false,
                    align: 't',
                    slideInDuration: 200,
                    minWidth: 400
                });
            },
            failure: function () {
                Ext.toast({
                    html: 'Delete fail.',
                    closable: false,
                    align: 't',
                    slideInDuration: 200,
                    minWidth: 400
                });
            }
        });
    }
});
