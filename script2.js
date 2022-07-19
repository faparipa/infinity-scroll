const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 5;
const apiKey = "j4Sa6I5leCou-Zvdafyh9zimBGpx-hJeUohXO99-13A";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
let imageLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
};

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //console.log(photo);
        //create template
        let photoTemplate = `
                    <a href="${photo.links.html}" target="_blank">
                     <img class ="img"
                             src="${photo.urls.regular}"
                              alt="${photo.alt_description}"
                      /></a>
                      `;
        imageContainer.innerHTML += photoTemplate;

        imageLoaded();
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        alert(error);
    }
}
// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
    if (
        window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 1000 &&
        ready
    ) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();
