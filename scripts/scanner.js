document.getElementById("scanButton").addEventListener("click", openCamera);

async function openCamera() {
    const videoElement = document.getElementById("scanner");
    const scannerContainer = document.getElementById("scanner-container");

    scannerContainer.classList.remove("hidden"); // Show scanner

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" } // Force back camera
        });
        videoElement.srcObject = stream;
    } catch (error) {
        console.error("Camera error:", error);
        alert("Failed to access camera: " + error.message);
    }
}

function closeCamera() {
    const videoElement = document.getElementById("scanner");
    const scannerContainer = document.getElementById("scanner-container");

    scannerContainer.classList.add("hidden"); // Hide scanner

    if (videoElement.srcObject) {
        let tracks = videoElement.srcObject.getTracks();
        tracks.forEach(track => track.stop()); // Stop camera stream
        videoElement.srcObject = null;
    }
}

document.getElementById("scanButton").addEventListener("click", openCamera);
document.querySelector("#scanner-container button").addEventListener("click", closeCamera);
