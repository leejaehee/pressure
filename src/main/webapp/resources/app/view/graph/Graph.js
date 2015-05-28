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
                    if (!Ext.ComponentQuery.query('#PSV_NO')[0].getValue()) {
                        Ext.toast({
                            html: 'Please select a PSVNO.',
                            closable: false,
                            align: 't',
                            slideInDuration: 200,
                            minWidth: 400
                        });
                        return false;
                    }
                    // TODO UI에서 setHistoryId 가져와야 한다.
                    var setHistoryId = 'setHistory_' + new Date().getTime() + '_' + Math.floor((Math.random() * 100) + 1);
                    // TODO UI에서 step 가져와야 한다.
                    var step = 1;
                    // historyId는 항상 생성한다.
                    var historyId = 'history_' + new Date().getTime() + '_' + Math.floor((Math.random() * 100) + 1);
                    var PSV_NO = Ext.ComponentQuery.query('#PSV_NO')[0].getValue();
                    // testId는 항상 생성한다.
                    var testId = 'test_' + new Date().getTime() + '_' + Math.floor((Math.random() * 100) + 1);

                    var params = {
                        setHistoryId: setHistoryId,
                        step: step,
                        historyId: historyId,
                        customerField: '1',
                        typeField: '2',
                        PSV_NO: PSV_NO,
                        fluidField: '3',
                        serialNoField: '4',
                        locationField: '5',
                        makerField: '6',
                        pressureTypeField: '7',
                        sizeInField: '8',
                        sizeOutField: '9',
                        testDateField: '10',
                        setPressureField: '11',
                        backPressureField: '12',
                        coldPressureField: '13',
                        resultSetPressureField: '14',
                        resultColdPressureField: '15',
                        resultBackPressureField: '152',
                        resultPopPressureField: '16',
                        resultLeakPressureField: '17',
                        resultOKPressureField: '18',
                        adjustScrewField: '19',
                        upperingField: '20',
                        loweringField: '21',
                        workerField: '22',
                        inspectorField: '23',
                        managerField: '24',
                        portConf: '25',
                        baudrateConf: '26',
                        setPressureConf: '27',
                        scanTimeConf: '28',
                        pressureUnitConf: '29',
                        testId: testId
                    }

                    Ext.Ajax.request({
                        url: '/graph/start',
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json; charset=utf-8;'
                        },
                        params: Ext.encode(params),
                        success: function () {
                            var websocket = new WebSocket("ws://localhost:8080/websocket/desktop-client");
                            websocket.onmessage = function (evnt) {
                                // TODO grid and graph update
                                Ext.ComponentQuery.query('#pressureUnit')[0].setValue(Ext.ComponentQuery.query('#pressureUnit')[0].getValue() + ' : ' + evnt.data);
                            };
                            websocket.onerror = function (evnt) {
                                alert('ERROR: ' + evnt.data);
                            };
                        },
                        failure: function () {
                        }
                    });

                } else {
                    Ext.Ajax.request({
                        url: '/graph/stop',
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json; charset=utf-8;'
                        },
                        success: function () {
                        },
                        failure: function () {
                        }
                    });

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
