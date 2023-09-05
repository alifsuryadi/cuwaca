const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


const x = document.getElementById("allowLocation");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

const y = document.getElementById("latitude");
const z = document.getElementById("longitude");

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    y.setAttribute("value", latitude);
    z.setAttribute("value", longitude);
}