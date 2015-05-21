/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Pressure.view.graph.Graph', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.graph',

    requires: [
        'Pressure.view.graph.GraphController',
        'Pressure.view.graph.GraphModel',
        'Pressure.view.data.Data',
        'Pressure.view.conf.Conf'
    ],

    controller: 'graph',

    viewModel: {
        type: 'graph'
    },

    layout: {
        type: 'fit'
    },

    items: [
        {
            region: 'center',
            xtype: 'textfield',
            itemId: 'pressureUnit',
            readOnly: true,
            value: 'Pressure (Mpa)'
        }
    ],

    bbar: [
        {
            itemId: 'open',
            xtype: 'button',
            scale: 'medium',
            text: 'OPEN',
            handler: 'onOpenButton'
        },
        {
            itemId: 'save',
            xtype: 'button',
            scale: 'medium',
            text: 'SAVE'
        },
        {
            itemId: 'firstTest',
            xtype: 'button',
            scale: 'medium',
            text: 'FIRST TEST'
        },
        {
            itemId: 'secondTest',
            xtype: 'button',
            scale: 'medium',
            text: 'SECOND TEST'
        },
        {
            itemId: 'sheetPrint',
            xtype: 'button',
            scale: 'medium',
            text: 'SHEET PRINT'
        },
        '->',
        {
            itemId: 'startButton',
            xtype: 'button',
            scale: 'medium',
            enableToggle: true,
            style: {
                //background: 'yellow'
            },
            text: 'START',
            toggleHandler: function (button, state) {
                if (state) {
                    // ajax start call
                    // history, test, thread start

                } else {
                    // ajax stop call
                    // thread stop

                }
            }
        },
        '->',
        {
            itemId: 'dataInput',
            xtype: 'button',
            scale: 'medium',
            text: 'DATA SETTING',
            handler: 'onDataInputClick'
        },
        {
            itemId: 'testSetting',
            xtype: 'button',
            scale: 'medium',
            text: 'TEST SETTING',
            handler: 'onConfClick'
        }
    ]
});
