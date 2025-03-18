document.getElementById("scanButton").addEventListener("click", openScanner);

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
                facingMode: { ideal: "environment" }, // Use back camera
                width: { ideal: 640 },
                height: { ideal: 480 }
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

    Quagga.onProcessed(function (result) {
        if (result) {
            console.log("Processing frame...");
        }
    });

    Quagga.onDetected(function (result) {
        const scannedCode = result.codeResult.code;
        console.log("Scanned barcode:", scannedCode);
        document.getElementById("searchBox").value = scannedCode;
        filterResults(); // Trigger search
        closeScanner(); // Close camera after scan
    });
}
