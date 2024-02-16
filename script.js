$(document).ready(function() {
    // Replace with your actual YouTube channel ID and API key
    const channelId = "UCyWUq9_T5idQJvkg4G-DIYg";
    const apiKey = "AIzaSyA9mfTcysIKWiU48uB3Rcx_tu7-VeX4WjY";

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=3&order=date&type=video&key=${apiKey}`;

    $.getJSON(url, function(data) {
        const items = data.items;

        if (items && items.length > 0) {
            $(".videos").empty(); // Clear placeholder content

            for (let i = 0; i < items.length; i++) {
                const video = items[i];
                const videoId = video.id.videoId;
                const thumbnailUrl = video.snippet.thumbnails.medium.url;
                const title = video.snippet.title;
                const channelTitle = video.snippet.channelTitle;

                const videoElement = $(`<div class="video">
                    <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                        <img src="${thumbnailUrl}" alt="${title}">
                    </a>
                    <div class="title">${title}</div>
                    <div class="channel">by ${channelTitle}</div>
                </div>`);

                $(".videos").append(videoElement);
            }
        } else {
            console.error("No videos found");
            // Handle no videos case (e.g., display a message)
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error fetching YouTube data:", errorThrown);
        // Handle API error (e.g., display an error message)
    });
});