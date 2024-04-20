const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

// Set up the playback configuration
const playbackConfig = new cast.framework.PlaybackConfig();
playbackConfig.manifestRequestHandler = requestInfo => {
    const url = new URL(requestInfo.url);
    requestInfo.headers['Referer'] = 'https://vidmoly.to';
    requestInfo.headers['Host'] = url.host;
};
playbackConfig.segmentRequestHandler = requestInfo => {
    const url = new URL(requestInfo.url);
    requestInfo.headers['Referer'] = 'https://vidmoly.to';
    requestInfo.headers['Host'] = url.host;
};

// Use hls.js for HLS streams
playerManager.setMessageInterceptor(
    cast.framework.messages.MessageType.LOAD,
    loadRequestData => {
        if (loadRequestData.media && loadRequestData.media.contentId) {
            const hls = new Hls();
            hls.loadSource(loadRequestData.media.contentId);
            hls.attachMedia(playerManager.getMediaElement());
        }
        return loadRequestData;
    }
);

context.start({ playbackConfig });