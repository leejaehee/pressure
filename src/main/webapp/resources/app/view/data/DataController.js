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
                        itemId: 'createPsvNo',
                        xtype: 'textfield',
                        fieldLabel: 'PSV NO',
                        name: 'psvNo',
                        minValue: 1,
                        maxValue: 125
                    }
                ],

                bbar: [
                    {
                        xtype: 'button',
                        scale: 'medium',
                        text: 'CREATE',
                        handler: function () {
                            Ext.Msg.confirm(
                                'Confirm',
                                'Are you sure?',
                                function () {
                                    Ext.Ajax.request({
                                        url : '/sheet/create',
                                        method : 'GET',
                                        params : {
                                            PSVNo : Ext.ComponentQuery.query('#createPsvNo')[0].getValue()
                                        },
                                        success : function(response) {
                                            Ext.toast({
                                                html: 'Create success.',
                                                closable: false,
                                                align: 't',
                                                slideInDuration: 400,
                                                minWidth: 400
                                            });
                                            Ext.ComponentQuery.query('#psvNo')[0].getStore().reload();
                                        },
                                        failure : function(){
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
    }
});
