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
            bbarCfg: {
                buttonAlign: 'center'
            },
            bbar: [
                '->',
                {
                    xtype: 'button',
                    scale: 'medium',
                    text: 'Load',
                    handler: function (btn) {
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

                            var gridStore = Ext.ComponentQuery.query('#pressureGrid')[0].getStore();
                            gridStore.removeAll();

                            Ext.ComponentQuery.query('#poppingPressure')[0].setValue('0');
                            Ext.ComponentQuery.query('#browDownpressure')[0].setValue('0');
                            Ext.ComponentQuery.query('#leakTestPressure')[0].setValue('0');
                            Ext.ComponentQuery.query('#torrentPressure')[0].setValue('0');
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

                        Ext.toast({
                            html: 'Success.',
                            closable: false,
                            align: 't',
                            slideInDuration: 200,
                            minWidth: 400
                        });

                        this.up('window').close();
                    }
                },
                {
                    xtype: 'button',
                    scale: 'medium',
                    text: 'CLOSE',
                    handler: function (btn) {
                        this.up('window').close();
                    }
                },
                '->'
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
            bbarCfg: {
                buttonAlign: 'center'
            },
            bbar: [
                '->',
                {
                    xtype: 'button',
                    scale: 'medium',
                    text: 'Save',
                    handler: function (btn) {
                        var pom = document.createElement('a');
                        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + JSON.stringify(GRAPH_DATA));
                        pom.setAttribute('download', Ext.ComponentQuery.query('#saveTextfield')[0].value);

                        pom.style.display = 'none';
                        document.body.appendChild(pom);

                        pom.click();

                        document.body.removeChild(pom);

                        Ext.toast({
                            html: 'Now saving.',
                            closable: false,
                            align: 't',
                            slideInDuration: 200,
                            minWidth: 400
                        });

                        this.up('window').close();
                    }
                },
                {
                    xtype: 'button',
                    scale: 'medium',
                    text: 'CLOSE',
                    handler: function (btn) {
                        this.up('window').close();
                    }
                },
                '->'
            ]
        }).center().show();
    },
    onClearClick: function () {
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
                        "valueBox": {
                            "type": "all",
                            "placement": "top"
                        },
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

        zingchart.render({
            id: 'pressureUnit',
            width: window.innerWidth - 317 || document.body.clientWidth - 317,
            height: window.innerHeight - 45 || document.body.clientHeight - 45,
            data: GRAPH_DATA
        });

        var gridStore = Ext.ComponentQuery.query('#pressureGrid')[0].getStore();
        gridStore.removeAll();

        Ext.ComponentQuery.query('#currentStepHidden')[0].value = 0;
        Ext.ComponentQuery.query('#poppingPressure')[0].setValue('0');
        Ext.ComponentQuery.query('#browDownpressure')[0].setValue('0');
        Ext.ComponentQuery.query('#leakTestPressure')[0].setValue('0');
        Ext.ComponentQuery.query('#torrentPressure')[0].setValue('0');
        Ext.ComponentQuery.query('#settingPressure')[0].setValue('');
        Ext.ComponentQuery.query('#testResult')[0].setValue('');
        Ext.ComponentQuery.query('#testResult')[0].setFieldStyle('background-color: white; color: white; font: normal 20px tahoma, arial, helvetica, sans-serif;');
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

            if (!Ext.ComponentQuery.query('#SET_PRESS')[0].getValue()) {
                Ext.toast({
                    html: 'Please set Setting Pressure.',
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

            ID.historyId = historyId;

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
                    Ext.ComponentQuery.query('#settingPressure')[0].setValue(Ext.ComponentQuery.query('#SET_PRESS')[0].getValue());
                    Ext.ComponentQuery.query('#currentStepHidden')[0].value = Ext.ComponentQuery.query('#currentStepHidden')[0].value + 1;
                    var gridStore = Ext.ComponentQuery.query('#pressureGrid')[0].getStore();
                    gridStore.removeAll();
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
                    var websocket = new WebSocket("ws://localhost:8080/websocket/desktop-client");
                    websocket.close();

                    var step = Ext.ComponentQuery.query('#currentStepHidden')[0].value;
                    var seriesArr = GRAPH_DATA.graphset[0].series[step - 1].values;

                    var prePos = 0;
                    var preVal = -10000;
                    var popVal = 0;
                    var browVal = 0;
                    var leakVal = 0;

                    for (var i = 1; i < seriesArr.length; i++) {
                        if (preVal > seriesArr[i]) {
                            popVal = preVal;
                            prePos = i - 1;
                            break;
                        }
                        preVal = seriesArr[i];
                    }

                    for (var i = prePos; i < seriesArr.length; i++) {
                        if (preVal < seriesArr[i]) {
                            browVal = preVal;
                            prePos = i - 1;
                            break;
                        }
                        preVal = seriesArr[i];
                    }

                    for (var i = prePos; i < seriesArr.length; i++) {
                        if (preVal < seriesArr[i]) {
                            leakVal = seriesArr[i];
                        }
                        preVal = seriesArr[i];
                    }

                    Ext.ComponentQuery.query('#poppingPressure')[0].setValue(popVal);
                    Ext.ComponentQuery.query('#browDownpressure')[0].setValue(browVal);
                    Ext.ComponentQuery.query('#leakTestPressure')[0].setValue(leakVal);
                    Ext.ComponentQuery.query('#torrentPressure')[0].setValue(leakVal - browVal);

                    var isSuccess;

                    if (Ext.ComponentQuery.query('#settingPressure')[0].getValue() == leakVal) {
                        var textField = Ext.ComponentQuery.query('#testResult')[0];
                        textField.setValue('SUCCESS');
                        textField.setFieldStyle('background-color: green; color: white; font: normal 20px tahoma, arial, helvetica, sans-serif;')
                        isSuccess = 'SUCCESS';
                    } else {
                        var textField = Ext.ComponentQuery.query('#testResult')[0];
                        textField.setValue('FAIL');
                        textField.setFieldStyle('background-color: red; color: yellow; font: normal 20px tahoma, arial, helvetica, sans-serif;');
                        isSuccess = 'FAIL';
                    }

                    var params = {};
                    params.historyId = ID.historyId;
                    params.poppingPressure = popVal ;
                    params.browDownpressure = browVal ;
                    params.leakTestPressure = leakVal ;
                    params.torrentPressure = (leakVal - browVal)  ;
                    params.isSuccess = isSuccess;

                    Ext.Ajax.request({
                        url: '/graph/save/result',
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json; charset=utf-8;'
                        },
                        params: Ext.encode(params),
                        success: function () {
                        },
                        failure: function () {
                        }
                    });
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
    },
    graphAfterrender: function () {
        var websocket = new WebSocket("ws://localhost:8080/websocket/desktop-client");

        websocket.onmessage = function (evnt) {
            if (evnt.data != '') {
                var gridStore = Ext.ComponentQuery.query('#pressureGrid')[0].getStore();

                var splitData = evnt.data.split(',');
                var time = splitData[0];
                var value = splitData[1];

                gridStore.add({
                    accumaltedTime: time,
                    pressureValue: value
                });

                var step = Ext.ComponentQuery.query('#currentStepHidden')[0].value;
                zingchart.exec("pressureUnit", "appendseriesvalues", {
                    plotindex: step - 1,
                    values: [eval(value)]
                });

                GRAPH_DATA = zingchart.exec('pressureUnit', 'getdata');
            }
        };

        websocket.onerror = function (evnt) {
            alert('ERROR: ' + evnt.data);
        };

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
                        "valueBox": {
                            "type": "all",
                            "placement": "top"
                        },
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
