function comRfid({ wsUri, cmd, row }, callback) {

    var wsUri = wsUri;
    var cmd = cmd;
    var row = row ? row : '';
    var rfids = new Array();
    var time_num = 0;
    var t1;
    if (typeof (window.websocket) != "undefined") {
        if (row) {
            window.websocket.send(JSON.stringify({ cmd, row }));
        } else {
            window.websocket.send(JSON.stringify({ cmd }))
        }
    } else {
        window.websocket = new WebSocket(wsUri);
        window.websocket.onopen = function (evt) {
            console.log('连接成功');
            if (row) {
                window.websocket.send(JSON.stringify({ cmd, row }));
            } else {
                window.websocket.send(JSON.stringify({ cmd }))
            }
        };
        window.websocket.onclose = function (evt) {
            console.log('连接失败');
        };
        window.websocket.onmessage = function (evt) {
            clearTimeout(t1);  
            var c = evt.data;
            var res = JSON.parse(c);
            if (res.row) {
                if (rfids[res.row.EPC] == null) {
                    rfids[res.row.EPC] = c;
                }
            }
            t1 = setTimeout(callback_rfid, 1200);

        };
        window.websocket.onerror = function (evt) {
            var c = evt.data;
            callback(c);
        };
    }
    function callback_rfid() {
        for (var key in rfids) {
            callback(rfids[key]);
        }

    }
}
export { comRfid };

