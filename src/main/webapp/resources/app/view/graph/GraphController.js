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

    onOpenClick: function () {
        var popup = Ext.create('Ext.Window', {
            title: 'Load graph',
            layout: 'fit',
            width: 400,
            bodyPadding: 10,
            frame: true,
            renderTo: Ext.getBody(),
            items: [{
                xtype: 'filefield',
                itemId: 'loadFilefield',
                name: 'loadFile',
                fieldLabel: 'File',
                labelWidth: 50,
                msgTarget: 'side',
                allowBlank: false,
                anchor: '100%',
                buttonText: 'Select File'
            }],

            buttons: [
                {
                    text: 'Load',
                    handler: function () {
                        var file = Ext.ComponentQuery.query('#loadFilefield')[0].fileInputEl.dom.files[0];
                        var reader = new FileReader();
                        reader.onload = function () {
                            GRAPH_DATA = reader.result;

                            zingchart.render({
                                id: 'pressureUnit',
                                width: window.innerWidth - 317 || document.body.clientWidth - 317,
                                height: window.innerHeight - 45 || document.body.clientHeight - 45,
                                data: GRAPH_DATA
                            });
                        };
                        reader.onerror = function (evt) {
                            var errcode = evt.target.error.code;
                            if (errcode == 1) {
                                alert("File을 찾지 못하였습니다");
                            } else if (errcode == 2) {
                                alert("안전하지 못하거나 File에 변경이 있습니다");
                            } else if (errcode == 3) {
                                alert("읽기가 중지되었습니다");
                            } else if (errcode == 4) {
                                alert("접근권한 문제로 파일을 읽지 못하였습니다");
                            } else if (errcode == 5) {
                                alert("URL 길이 제한문제");
                            }
                        };
                        reader.readAsText(file, 'UTF-8');
                        popup.close();
                    }
                },
                {
                    text: 'Close',
                    handler: function () {
                        popup.close();
                    }
                }
            ]
        }).center().show();
    },
    onSaveClick: function () {
        var popup = Ext.create('Ext.Window', {
            title: 'Save graph',
            layout: 'fit',
            width: 400,
            bodyPadding: 10,
            frame: true,
            renderTo: Ext.getBody(),
            items: [{
                xtype: 'textfield',
                itemId: 'saveTextfield',
                name: 'saveFile',
                fieldLabel: 'Filename',
                labelWidth: 100,
                msgTarget: 'side',
                allowBlank: false,
                anchor: '100%',
                buttonText: 'Select File'
            }],

            buttons: [
                {
                    text: 'Save',
                    handler: function () {
                        var pom = document.createElement('a');
                        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + JSON.stringify(GRAPH_DATA));
                        pom.setAttribute('download', Ext.ComponentQuery.query('#saveTextfield')[0].value);

                        pom.style.display = 'none';
                        document.body.appendChild(pom);

                        pom.click();

                        document.body.removeChild(pom);
                    }
                },
                {
                    text: 'Close',
                    handler: function () {
                        popup.close();
                    }
                }
            ]
        }).center().show();
    },
    onClearClick: function () {

    },
    onStartClick: function (button, state) {
        if (state) {
            if (!Ext.ComponentQuery.query('#PSV_NO')[0].getValue()) {
                Ext.toast({
                    html: 'Please select a PSVNO.',
                    closable: false,
                    align: 't',
                    slideInDuration: 200,
                    minWidth: 400
                });
                button.toggle();
                return false;
            }
            if (!CONF.portConf || !CONF.baudrateConf || !CONF.scanTimeConf) {
                Ext.toast({
                    html: 'Please set configuration.',
                    closable: false,
                    align: 't',
                    slideInDuration: 200,
                    minWidth: 400
                });
                button.toggle();
                return false;
            }

            var setHistoryId = 'setHistory_' + new Date().getTime() + '_' + Math.floor((Math.random() * 100) + 1);
            var step = Ext.ComponentQuery.query('#currentStepHidden')[0].value + 1;
            var historyId = 'history_' + new Date().getTime() + '_' + Math.floor((Math.random() * 100) + 1);
            var PSV_NO = Ext.ComponentQuery.query('#PSV_NO')[0].getValue();
            var testId = 'test_' + new Date().getTime() + '_' + Math.floor((Math.random() * 100) + 1);

            var params = COMMON;

            params.setHistoryId = setHistoryId;
            params.step = step;
            params.historyId = historyId;
            params.portConf = CONF.portConf;
            params.baudrateConf = CONF.baudrateConf;
            params.setPressureConf = CONF.setPressureConf;
            params.scanTimeConf = CONF.scanTimeConf;
            params.pressureUnitConf = CONF.pressureUnitConf;
            params.testId = testId;

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
    ,
    onConfClick: function (btn, e, eOpts) {
        Ext.create('Ext.Window', {
            title: 'Configuration',
            layout: 'fit',
            modal: true,
            padding: '5',
            items: {
                xtype: 'conf'
            }
        }).center().show();
    }
    ,
    onDataInputClick: function (btn, e, eOpts) {
        Ext.create('Ext.Window', {
            title: 'Data',
            layout: 'fit',
            modal: true,
            padding: '5',
            items: {
                xtype: 'data'
            }
        }).center().show();
    }
    ,
    graphAfterrender: function () {
        GRAPH_DATA = {
            "graphset": [
                {
                    "background-color": "white",
                    "type": "line",
                    "legend": {
                        "layout": "float",
                        "width": "30%",
                        "position": "60% 100%",
                        "margin-top": 47,
                        "margin-bottom": 45,
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
    graphResize: function (panel, width, height, oldWidth, oldHeight, eOpts) {
        zingchart.render({
            id: 'pressureUnit',
            width: width,
            height: height,
            data: GRAPH_DATA
        });
    },
    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
})
;
