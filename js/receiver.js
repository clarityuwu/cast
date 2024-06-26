const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

// Set up the playback configuration
const playbackConfig = new cast.framework.PlaybackConfig();
playbackConfig.manifestRequestHandler = requestInfo => {
    if (requestInfo.url.includes('vidmoly')) {
        requestInfo.headers['Referer'] = 'https://vidmoly.to';
    }
};
playbackConfig.segmentRequestHandler = requestInfo => {
    if (requestInfo.url.includes('vidmoly')) {
        requestInfo.headers['Referer'] = 'https://vidmoly.to';
    }
};

// Use hls.js for HLS streams
playerManager.setMessageInterceptor(
    cast.framework.messages.MessageType.LOAD,
    loadRequestData => {
        if (loadRequestData.media && loadRequestData.media.contentId && loadRequestData.media.contentId.includes('vidmoly')) {
            const hls = new Hls();
            const videoElement = document.getElementsByTagName('video')[0];
            hls.loadSource(loadRequestData.media.contentId);
            hls.attachMedia(videoElement);
            playerManager.stop();
        }
        return loadRequestData;
    }
);

context.start({ playbackConfig });
