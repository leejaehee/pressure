/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Pressure.view.main.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'Pressure.view.main.MainController',
        'Pressure.view.main.MainModel',
        'Pressure.view.rightProps.RightProps',
        'Pressure.view.graph.Graph'
    ],

    xtype: 'app-main',

    controller: 'main',

    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'fit'
    },

    bodyPadding: 10,

    items: [
        {
            title: 'PRESSURE TEST GRAPH - PROGRAM',
            xtype: 'panel',
            split: true,
            layout: {
                type: 'border'
            },
            items: [
                {
                    region: 'center',
                    xtype: 'graph',
                    border: 1
                },
                {
                    region: 'east',
                    xtype: 'rightProps',
                    border: 1
                }
            ]
        }
    ]
});
