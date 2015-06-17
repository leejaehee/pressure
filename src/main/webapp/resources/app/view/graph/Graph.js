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
            handler: 'onOpenButton'
        },
        {
            itemId: 'save',
            xtype: 'button',
            scale: 'medium',
            text: 'SAVE'
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
                    var step = Ext.ComponentQuery.query('#currentStepHidden')[0].value + 1;
                    var historyId = 'history_' + new Date().getTime() + '_' + Math.floor((Math.random() * 100) + 1);
                    var PSV_NO = Ext.ComponentQuery.query('#PSV_NO')[0].getValue();
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

                            Ext.ComponentQuery.query('#currentStepHidden')[0].value = Ext.ComponentQuery.query('#currentStepHidden')[0].value + 1

                            var gridStore = Ext.ComponentQuery.query('#pressureGrid')[0].getStore();
                            gridStore.removeAll();

                            websocket.onmessage = function (evnt) {
                                if (evnt.data != '') {
                                    var splitData = evnt.data.split(',');
                                    var time = splitData[0];
                                    var value = splitData[1];

                                    if (step == 1) {
                                        zingchart.exec("pressureUnit", "appendseriesvalues", {
                                            "values": [
                                                [eval(value)]
                                            ]
                                        });

                                        gridStore.add({
                                            accumaltedTime: time,
                                            pressureValue: value
                                        });
                                    } else {
                                        zingchart.exec("pressureUnit", "appendseriesvalues", {
                                            "values": [
                                                [],
                                                [eval(value)]
                                            ]
                                        });

                                        zingchart.exec("pressureUnit", "removenode", {
                                            plotindex: 0,
                                            data: {
                                                plotindex: 0,
                                                nodeindex: 0
                                            }
                                        });

                                        gridStore.add({
                                            accumaltedTime: time,
                                            pressureValue: value
                                        });
                                        gridStore.remove(gridStore.last());
                                    }

                                    GRAPH_DATA = zingchart.exec('pressureUnit', 'getdata');
                                }
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
    ],
    listeners: {
        afterrender: function () {
            GRAPH_DATA = {
                "graphset": [
                    {
                        "background-color": "white",
                        "type": "line",
                        "legend": {
                            "layout": "float",
                            "width": "30%",
                            "position": "60% 100",
                            "margin-top": 47,
                            "border-width": "0",
                            "shadow": false,
                            "marker": {
                                "cursor": "hand",
                                "border-width": "0"
                            },
                            "background-color": "white",
                            "item": {
                                "cursor": "hand"
                            },
                            "toggle-action": "remove"
                        },
                        "scaleY": {
                            "line-color": "#333",
                            //"values":"0:0.001:0.0001"
                            //"values":"0.001"
                            "auto-fit": true
                        },
                        "tooltip": {
                            "text": "%t pressure : %v , time : %k s)"
                        },
                        "plot": {
                            "line-width": 3,
                            "marker": {
                                "size": 2
                            },
                            "selection-mode": "multiple",
                            "background-mode": "graph",
                            "selected-state": {
                                "line-width": 4
                            },
                            "background-state": {
                                "line-color": "#eee",
                                "marker": {
                                    "background-color": "none"
                                }
                            }
                        },
                        "plotarea": {
                            "width": "100%",
                            "height": "95%"
                        },
                        "series": [
                            {
                                "values": [0.0000],
                                "text": "First Test",
                                "line-color": "#a6cee3",
                                "marker": {
                                    "background-color": "#a6cee3",
                                    "border-color": "#a6cee3"
                                }
                            },
                            {
                                "values": [0.0000],
                                "text": "Second Test",
                                "line-color": "#1f78b4",
                                "marker": {
                                    "background-color": "#1f78b4",
                                    "border-color": "#1f78b4"
                                }
                            }
                        ]
                    }
                ]
            };
        },
        resize: function (panel, width, height, oldWidth, oldHeight, eOpts) {
            zingchart.render({
                id: 'pressureUnit',
                width: width,
                height: height,
                data: GRAPH_DATA
            });
        }
    }
});
