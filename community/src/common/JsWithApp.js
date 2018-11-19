let AppCallback = {
    back_getQxToken: function (res) {
        localStorage.setItem('token', res);
        console.log('token:' + res);
    },
    back_getQxAppInfo: function (res) {
        // let os = {
        //     'OSName': 'Android',
        //     'OSVersion': '5.1.1',
        //     'AppVersion': '2.4.2',
        //     'DeviceType': 'HUAWEI-SCL-AL00'
        // };
        console.log('appinfo:' + res);
        let appInfo = '';
        if (res) {
            appInfo = res;
            localStorage.setItem('appInfo', appInfo);
        } else {
            localStorage.removeItem('appInfo');
        }
    }
};

// window.QxBridgeGetContent = function () {
//     console.log('QxBridgeGetContent')
// }

export default AppCallback;
