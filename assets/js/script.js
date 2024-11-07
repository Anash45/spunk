$(document).ready(function () {

    $('.video-thumbnail').each(function () {
        const $thumbnail = $(this);
        const $video = $thumbnail.find('.player');

        // Initialize a new Plyr instance for this specific video
        const player = new Plyr($video[0], { fullscreen: { enabled: true } });

        $thumbnail.on('click', function () {
            // Hide the thumbnail image and play icon, show the video player
            $thumbnail.find('.play-icon').hide();
            $thumbnail.find('img').hide();
            $video.show();

            // Enter full screen and play video
            player.fullscreen.enter();
            player.play();
        });

        // Event listener for when the video ends
        player.on('ended', function () {
            // Reset to initial state after video ends
            player.pause();
            $thumbnail.find('.play-icon').show();
            $thumbnail.find('img').show();
            $video.hide();
        });

        // Optional: also reset when exiting full screen
        player.on('exitfullscreen', function () {
            if (player.ended) {
                player.pause();
                $thumbnail.find('.play-icon').show();
                $thumbnail.find('img').show();
                $video.hide();
            }
        });
    });


    // Initialize WaveSurfer
    const wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: '#ff8a34',
        progressColor: 'purple',
        height: 100, // Adjust height as needed
        barWidth: 2,
    });

    // Load the audio file
    wavesurfer.load('./assets/audio/spunk_score_final.wav'); // Replace with the path to your audio file

    // Play/Pause functionality
    document.getElementById('play-button').addEventListener('click', () => {
        wavesurfer.playPause();
    });

    // Optional: Add events for when the audio ends to reset
    wavesurfer.on('finish', () => {
        wavesurfer.seekTo(0); // Reset to the start
    });
})