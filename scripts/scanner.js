document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("scanButton").addEventListener("click", openScanner);
});

let videoStream = null;

async function openScanner() {
    const scannerContainer = document.getElementById("scanner-container");
    scannerContainer.classList.remove("hidden"); // Show scanner
    const videoElement = document.getElementById("scanner");

    try {
        const { BrowserMultiFormatReader } = await import("https://unpkg.com/@zxing/library@0.19.2/esm/index.js");
        const codeReader = new BrowserMultiFormatReader();
        
        videoStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" } // Use back camera
        });

        videoElement.srcObject = videoStream;
        videoElement.setAttribute("playsinline", true); // Fix iOS issue
        videoElement.play();

        codeReader.decodeFromVideoDevice(undefined, videoElement, (result, err) => {
            if (result) {
                console.log("Scanned barcode:", result.text);
                document.getElementById("searchBox").value = result.text;
                filterResults(); // Trigger search
                closeScanner();
            }
        });
    } catch (error) {
        console.error("Camera error:", error);
        alert("Failed to access camera: " + error.message);
        closeScanner();
    }
}

function closeScanner() {
    const scannerContainer = document.getElementById("scanner-container");
    scannerContainer.classList.add("hidden"); // Hide scanner

    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop()); // Stop camera
        videoStream = null;
    }
}
