document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("scanButton").addEventListener("click", openScanner);
});

function openScanner() {
    const scannerContainer = document.getElementById("scanner-container");
    scannerContainer.classList.remove("hidden"); // Show scanner
    startScanner();
}

function closeScanner() {
    const scannerContainer = document.getElementById("scanner-container");
    scannerContainer.classList.add("hidden"); // Hide scanner
    Quagga.stop();
}

function startScanner() {
    Quagga.init({
        inputStream: {
            type: "LiveStream",
            constraints: {
                facingMode: { exact: "environment" }, // Force back camera
                width: { ideal: 640 },  // Adjust for better performance
                height: { ideal: 480 }
            },
            area: { // Reduce scan area for better performance
                top: "20%",
                right: "10%",
                left: "10%",
                bottom: "20%"
            },
            target: document.querySelector("#scanner")
        },
        decoder: {
            readers: ["ean_reader", "code_128_reader"] // Supports multiple barcode types
        }
    }, function (err) {
        if (err) {
            console.error("QuaggaJS initialization error:", err);
            alert("Error initializing camera. Please check browser permissions.");
            closeScanner();
            return;
        }
        Quagga.start();
    });

    Quagga.onDetected(function (result) {
        const scannedCode = result.codeResult.code;
        console.log("Scanned barcode:", scannedCode);

        // Auto-fill the search box with scanned barcode
        document.getElementById("searchBox").value = scannedCode;
        filterResults(); // Trigger search
        closeScanner(); // Close camera after scan
    });
}
