/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Pressure.view.graph.GraphController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox'
    ],

    alias: 'controller.graph',

    onOpenButton: function () {
        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to do that?', this.showResult, this);
    },
    onConfClick: function (btn, e, eOpts) {
        var popup = Ext.create('Ext.Window', {
            title: 'Configuration',
            layout: 'fit',
            modal: true,
            padding: '5',
            items: {
                xtype: 'conf'
            }
        }).center().show();
    },
    onDataInputClick: function (btn, e, eOpts) {
        var popup = Ext.create('Ext.Window', {
            title: 'Data',
            layout: 'fit',
            modal: true,
            padding: '5',
            items: {
                xtype: 'data'
            }
        }).center().show();
    },
    onStartClick: function (btn, e, eOpts) {
        var popup = Ext.create('Ext.Window', {
            title: 'Data',
            layout: 'fit',
            modal: true,
            padding: '5',
            items: {
                xtype: 'data'
            }
        }).center().show();
    },
    onStopClick: function (btn, e, eOpts) {
        var popup = Ext.create('Ext.Window', {
            title: 'Data',
            layout: 'fit',
            modal: true,
            padding: '5',
            items: {
                xtype: 'data'
            }
        }).center().show();
    },

    showResult: function (btn, text) {
        this.showToast(Ext.String.format('You clicked the {0} button', btn));
    },
    showToast: function (s, title) {
        Ext.toast({
            html: s,
            closable: false,
            align: 't',
            slideInDuration: 400,
            minWidth: 400
        });
    },
    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});
