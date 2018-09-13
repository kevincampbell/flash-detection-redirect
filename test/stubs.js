function EventDispatcher() {
    var eventListeners = {};

    function indexOf(needle, haystack) {
        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i] === needle) {
                return i;
            }
        }

        return -1;
    }

    this.addEventListener = function (type, listener) {
        eventListeners[type] = eventListeners[type] || [];
        if (indexOf(listener, eventListeners[type]) < 0) {
            eventListeners[type].push(listener);
        }
    };

    this.removeEventListener = function (type, listener) {
        var listeners = (eventListeners[type]) ? eventListeners[type].slice(0) : [];

        if (listener) {
            if (listeners) {
                var index = -1;

                for (var i = 0; listeners[i]; i++) {
                    if (listeners[i] === listener) {
                        index = i;
                        break;
                    }
                }

                if (index > -1) {
                    listeners.splice(index, 1);
                    eventListeners[type] = listeners;
                }
            }
        }
    };

    this.dispatchEvent = function (event) {
        var listeners = (eventListeners[event.type]) ? eventListeners[event.type].slice(0) : [];
        for (var i = 0; listeners[i]; i++) {
            listeners[i](event);
        }
    };

    // TODO: hasEventListener, willTrigger?
}

var dispatcher = new EventDispatcher();
window.$pdk = {
    vars:{},
    controller:{
        addEventListener:dispatcher.addEventListener,
        removeEventListener:dispatcher.removeEventListener,
        dispatchEvent:dispatcher.dispatchEvent,
        plugInLoaded:function(){}
    }
};

window.ADB = {
    va:{
        Heartbeat:function(){
            this.configure = function(){};
        },
        HeartbeatConfig:function(){},
        HeartbeatDelegate:function(){},
        plugins:{
            aa:{
                AdobeAnalyticsPlugin:function(){
                    this.configure = function(){};
                    this.setVideoMetadata = function(){};
                    this.setAdMetadata = function(){};
                },
                AdobeAnalyticsPluginConfig:function(){},
                AdobeAnalyticsPluginDelegate:function(){}
            },
            ah:{
                AdobeHeartbeatPlugin:function(){
                    this.configure = function(){};
                },
                AdobeHeartbeatPluginConfig:function(){},
                AdobeHeartbeatPluginDelegate:function(){}
            },
            nielsen:{
                NielsenPlugin:function(){
                    this.configure = function(){};
                },
                NielsenPluginConfig:function(){},
                NielsenPluginDelegate:function(){}
            },
            videoplayer:{
                VideoInfo:function(){},
                QoSInfo:function(){},
                AdBreakInfo:function(){},
                AdInfo:function(){},
                ChapterInfo:function(){},
                VideoPlayerPlugin:function(){
                    this.configure = function(){};
                    this.trackVideoLoad = function(){};
                    this.trackSessionStart = function(){};
                    this.trackAdStart = function(){};
                    this.trackPlay = function(){};
                    this.trackPause = function(){};
                },
                VideoPlayerPluginConfig:function(){},
                VideoPlayerPluginDelegate:function(){}
            }
        }
    }
};