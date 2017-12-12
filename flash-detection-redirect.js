// v0.0.4
$pdk.env.Detect.getInstance().addToConfigSet("flashblacklist", "None|None");

$pdk.controller.addEventListener("OnPlayerLoaded", function (e) {

        var isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|webos|playbook|silk/i.test(navigator.userAgent);
        var redirectUrl = document.getElementById("player") ? document.getElementById("player").getAttribute("tp:needFlashUrl") : false;
        function hasFlash() {
            var flash = false;

            try {
                var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                if (fo) {
                    flash = true;
                }
            } catch (e) {
                if (navigator.mimeTypes && navigator.mimeTypes['application/x-shockwave-flash'] != undefined && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
                    flash = true;
                }
            }

            return flash;
        }

        if (isMobile || !redirectUrl)
            return;

        var isVersion57Plus = parseFloat($pdk.version.major + '.' + $pdk.version.minor) >= 5.7;
        var isMSERuntime = document.getElementById("player").getAttribute("tp:PreferredRuntimes") != "universal,flash,html5";

        if (isVersion57Plus && isMSERuntime) {

            // execute hls.js logic

            // If the browser is Internet Explorer 9 or 10,  then redirect to the URL as defined above.  Internet Explorer 9 can be identified if the user agent contains "Trident/5.0".  Internet Explorer 10 can be identified if the user agent contains "Trident/6.0".
            // If the browser is Internet Explorer 11 and the Operating System is Windows 8 or earlier,   then redirect to the URL as defined above.  Internet Explorer 11 can be identified if the user agent contains "Trident/7.0".  Windows 8 and earlier can be identified if the user agent contains "Windows NT" followed by a version number < 6.3.  I.E. "Windows NT 6.1".

            var isIE9or10 = window.navigator.userAgent.indexOf("Trident/5.0") > 0 || window.navigator.userAgent.indexOf("Trident/6.0") > 0;

            if (isIE9or10 && redirectUrl && !hasFlash()) {
                window.location.href = redirectUrl;
            } else {

                var isIE11andWindows = window.navigator.userAgent.indexOf("Trident/7.0") > 0 && window.navigator.userAgent.indexOf("Windows NT") > 0;

                if (isIE11andWindows) {
                    var ua = window.navigator.userAgent;
                    var windowsVersion = Number(ua.substring(ua.indexOf("Windows NT") + 11, ua.indexOf("Windows NT") + 14));
                    var minVersion = 6.3;

                    if (!isNaN(windowsVersion) && windowsVersion < minVersion && !hasFlash()) {
                        window.location.href = redirectUrl;
                    }
                }
            }

        } else {

            // execute Mangui Logic

            // 1. If the browser is on desktop, is NOT one of Safari or Edge, and the content is a full episode,  then redirect to the URL as defined above.
            // 2. If the content is short form and the browser is IE 10 or IE 11 and Flash is disabled, then redirect to the URL as defined above.
            // Note: that there is no case where mobile should be redirected to the "Get Flash" page and the mobile detection logic described above (regarding attempted playback of full episodes on mobile) shall still apply.

            $pdk.controller.addEventListener("OnReleaseStart", function (e) {

                var isSafari = navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0;
                var isEdge = navigator.userAgent.search("Edge/") >= 0;
                var isFullepisode = false;
                var isIE10or11 = false;

                for (i = 0; i < e.data.baseClips.length; i++) {
                    if (e.data.baseClips[i]['contentCustomData']) {

                        // if any content custom data is fullEpisode then we redirect.
                        if (e.data.baseClips[i]['contentCustomData']['fullEpisode'] == 'true') {
                            isFullepisode = true;

                            // 1. If the browser is on desktop,
                            //       is NOT one of Safari or Edge,
                            //       and the content is a full episode,
                            //       and flash is disabled
                            //
                            // then redirect to the URL as defined above.

                            if (!hasFlash() && redirectUrl && !isMobile && (!isSafari || !isEdge) && isFullepisode)
                                window.location.href = redirectUrl;
                        }
                    }
                }

                // 2. If the content is short form
                //       and the browser is IE 10 or IE 11
                //       and Flash is disabled,
                // then redirect to the URL as defined above.

                // (if were here we must be shortform.)

                if (window.navigator.userAgent.indexOf("Trident/7.0") > 0 || window.navigator.userAgent.indexOf("Trident/6.0") > 0)
                    isIE10or11 = true;

                if (!hasFlash() && redirectUrl && isIE10or11)
                    window.location.href = redirectUrl;

            });

        }

    }
);