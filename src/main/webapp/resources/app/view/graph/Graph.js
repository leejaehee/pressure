/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
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
            xtype: 'label',
            itemId: 'pressureUnit',
            id: 'pressureUnit',
            readOnly: true,
            flex: 1
        },
        {
            xtype: 'label',
            itemId: 'currentStepHidden',
            id: 'currentStepHidden',
            value: 0,
            hidden: true
        }
    ],

    bbar: [
        {
            itemId: 'open',
            xtype: 'button',
            scale: 'medium',
            text: 'OPEN',
            handler: 'onOpenClick'
        },
        {
            itemId: 'save',
            xtype: 'button',
            scale: 'medium',
            text: 'SAVE',
            handler: 'onSaveClick'
        },
        '->',
        {
            itemId: 'clearButton',
            xtype: 'button',
            scale: 'medium',
            style: {
                //background: 'yellow'
            },
            text: 'CLEAR',
            handler: 'onClearClick'
        },
        {
            itemId: 'startButton',
            xtype: 'button',
            scale: 'medium',
            enableToggle: true,
            style: {
                //background: 'yellow'
            },
            text: 'START',
            toggleHandler: 'onStartClick'
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
    ],
    listeners: {
        afterrender: 'graphAfterrender',
        resize: 'graphResize'
    }
});
