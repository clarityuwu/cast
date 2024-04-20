const context = cast.framework.CastReceiverContext.getInstance();
const playerManager = context.getPlayerManager();

// Set up the playback configuration
const playbackConfig = new cast.framework.PlaybackConfig();
playbackConfig.manifestRequestHandler = requestInfo => {
    requestInfo.headers['Referer'] = 'https://vidmoly.to';
};
playbackConfig.segmentRequestHandler = requestInfo => {
    requestInfo.headers['Referer'] = 'https://vidmoly.to';
};

context.start({ playbackConfig });