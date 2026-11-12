
// ===================================
// APOLOGY WEBSITE - JAVASCRIPT
// ===================================


// 1. Select HTML elements

const openBtn = document.getElementById("openBtn");
const nextBtn = document.getElementById("nextBtn");
const trustBtn = document.getElementById("trustBtn");
const finalBtn = document.getElementById("finalBtn");

const typedMessage = document.getElementById("typedMessage");

const photoUpload = document.getElementById("photoUpload");
const photoGrid = document.getElementById("photoGrid");

const musicBtn = document.getElementById("musicBtn");


// 2. Apology letter

const apologyMessage = `I know I hurt you, and I am truly sorry.

I have been thinking about everything that happened.
I wish I could go back and change the moments
when my actions caused you pain.

I never wanted to become the reason
for your sadness.

I know saying sorry cannot erase what happened.
I know I have to take responsibility
for the way I made you feel.

I miss your smile.
I miss our conversations.
I miss the beautiful person I was lucky to have
in my life.

I am not asking you to forget everything.
I am only asking for the chance to show you
that I can learn from my mistakes
and become better.

From the bottom of my heart,
I am truly sorry. ❤️`;


// 3. Change scenes

function showScene(sceneId) {

    const scenes = document.querySelectorAll(".scene");

    scenes.forEach(scene => {
        scene.classList.remove("active");
    });

    const selectedScene = document.getElementById(sceneId);

    if (selectedScene) {
        selectedScene.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// 4. Typing animation

let typingIndex = 0;

function typeApology() {

    if (typingIndex < apologyMessage.length) {

        typedMessage.textContent +=
            apologyMessage.charAt(typingIndex);

        typingIndex++;

        const character =
            apologyMessage.charAt(typingIndex - 1);

        const delay =
            character === "\n" ? 180 : 35;

        setTimeout(typeApology, delay);

    } else {

        nextBtn.classList.remove("hidden");

    }
}


// 5. Opening button

openBtn.addEventListener("click", () => {

    showScene("apology");

    typedMessage.textContent = "";
    typingIndex = 0;

    nextBtn.classList.add("hidden");

    typeApology();

    startFloatingHearts();

});


// 6. Apology to trust scene

nextBtn.addEventListener("click", () => {

    showScene("trust");

});


// 7. Trust to memories scene

trustBtn.addEventListener("click", () => {

    showScene("memories");

});


// 8. Memories to ending scene

finalBtn.addEventListener("click", () => {

    showScene("ending");

});


// 9. Photo upload feature

photoUpload.addEventListener("change", function(event) {

    const files = Array.from(event.target.files);

    if (photoGrid.querySelector(".empty-message")) {
        photoGrid.innerHTML = "";
    }

    files.forEach(file => {

        if (!file.type.startsWith("image/")) {
            return;
        }

        const reader = new FileReader();

        reader.onload = function(e) {

            const image = document.createElement("img");

            image.src = e.target.result;
            image.alt = "A special memory";

            photoGrid.appendChild(image);

        };

        reader.readAsDataURL(file);

    });

    // Allows selecting the same photos again
    photoUpload.value = "";

});


// 10. Floating heart particles

let particlesStarted = false;

function startFloatingHearts() {

    if (particlesStarted) return;

    particlesStarted = true;

    const particleContainer =
        document.getElementById("particles");

    setInterval(() => {

        const heart = document.createElement("span");

        heart.classList.add("particle");
        heart.innerHTML = "♥";

        heart.style.left = Math.random() * 100 + "%";

        heart.style.fontSize =
            (12 + Math.random() * 18) + "px";

        heart.style.animationDuration =
            (5 + Math.random() * 5) + "s";

        particleContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 10000);

    }, 650);

}


// ===================================
// 11. YOUTUBE MUSIC PLAYER
// ===================================

let player = null;
let musicReady = false;
let musicPlaying = false;

// Your selected YouTube video ID
const YOUTUBE_VIDEO_ID = "fGmythNcj2E";


// YouTube automatically calls this function
// when its player API has loaded.

function onYouTubeIframeAPIReady() {

    player = new YT.Player("youtubePlayer", {

        width: "220",
        height: "124",

        videoId: YOUTUBE_VIDEO_ID,

        playerVars: {
            autoplay: 0,
            controls: 1,
            loop: 1,
            playlist: YOUTUBE_VIDEO_ID,
            playsinline: 1
        },

        events: {

            onReady: function() {

                musicReady = true;

                musicBtn.textContent = "♫ Play Music";

                console.log("YouTube player is ready!");

            },

            onStateChange: function(event) {

                if (event.data === YT.PlayerState.PLAYING) {

                    musicPlaying = true;
                    musicBtn.textContent = "♫ Pause Music";

                }

                else if (
                    event.data === YT.PlayerState.PAUSED ||
                    event.data === YT.PlayerState.ENDED
                ) {

                    musicPlaying = false;
                    musicBtn.textContent = "♫ Play Music";

                }

            },

            onError: function(event) {

                musicBtn.textContent = "Music unavailable";

                console.log(
                    "YouTube player error:",
                    event.data
                );

            }

        }

    });

}


// Music Play/Pause button

musicBtn.addEventListener("click", function() {

    if (!musicReady || !player) {

        musicBtn.textContent = "Please wait...";

        return;

    }

    if (musicPlaying) {

        player.pauseVideo();

    } else {

        player.playVideo();

    }

});
