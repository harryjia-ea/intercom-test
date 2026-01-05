(function(){
    ZoomMtg.setZoomJSLib('https://source.zoom.us/5.0.0/lib', '/av');
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();

    var qs = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=', 2);
            if (p.length == 1)
                b[p[0]] = "";
            else
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substring(1).split('&'));

    ZoomMtg.init({
        //debug: true,
        leaveUrl:qs['leaveUrl'],
        isSupportAV: true,
        disablePreview: true,
        success: (success) => {

            ZoomMtg.join({
                //debug: true,
                signature: qs['signature'],
                meetingNumber: parseInt(qs['streamId']),
                userName: qs['userName'],
                // sdkKey removed - deprecated in SDK 5.0.0, now extracted from JWT signature
                userEmail: qs['userEmail'],
                passWord: qs['password'],
                success: (success) => {
                    console.log(success)
                },
                error: (error) => {
                    console.log(error)
                }
            });
        },
        error: (error) => {
            console.log(error)
        }
    });
})();
