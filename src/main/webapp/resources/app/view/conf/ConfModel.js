/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Pressure.view.conf.ConfModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.conf',

    data: {
        name: 'Pressure'
    },

    stores: {
        portComboStore: {
            fields: [
                'portConf'
            ],
            data: [
                {
                    portConf: 'COM1'
                },
                {
                    portConf: 'COM2'
                },
                {
                    portConf: 'COM3'
                },
                {
                    portConf: 'COM4'
                },
                {
                    portConf: 'COM5'
                },
                {
                    portConf: 'COM6'
                },
                {
                    portConf: 'COM7'
                },
                {
                    portConf: 'COM8'
                },
                {
                    portConf: 'COM9'
                },
                {
                    portConf: 'COM10'
                },
                {
                    portConf: 'COM11'
                },
                {
                    portConf: 'COM12'
                },
                {
                    portConf: 'COM13'
                },
                {
                    portConf: 'COM14'
                },
                {
                    portConf: 'COM15'
                },
                {
                    portConf: 'COM16'
                },
                {
                    portConf: 'COM17'
                },
                {
                    portConf: 'COM18'
                },
                {
                    portConf: 'COM19'
                }
            ]
        },
        baudrateComboStore: {
            fields: [
                'baudrateConf'
            ],
            data: [
                {
                    baudrateConf: '110'
                },
                {
                    baudrateConf: '300'
                },
                {
                    baudrateConf: '600'
                },
                {
                    baudrateConf: '1200'
                },
                {
                    baudrateConf: '2400'
                },
                {
                    baudrateConf: '4800'
                },
                {
                    baudrateConf: '9600'
                },
                {
                    baudrateConf: '14400'
                },
                {
                    baudrateConf: '19200'
                },
                {
                    baudrateConf: '38400'
                },
                {
                    baudrateConf: '57600'
                },
                {
                    baudrateConf: '115200'
                },
                {
                    baudrateConf: '128000'
                },
                {
                    baudrateConf: '256000'
                }
            ]
        },
        unitComboStore: {
            fields: [
                'pressureUnitConf'
            ],
            data: [
                {
                    pressureUnitConf: 'kgf/cm'
                },
                {
                    pressureUnitConf: 'bar'
                },
                {
                    pressureUnitConf: 'MPa'
                },
                {
                    pressureUnitConf: 'atm'
                },
                {
                    pressureUnitConf: 'mH₂O'
                },
                {
                    pressureUnitConf: 'mHg'
                },
                {
                    pressureUnitConf: 'lbf/in²'
                }
            ]
        }
    }
});