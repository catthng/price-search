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
                width: 400,
                height: 300,
                facingMode: "environment" // Use back camera
            },
            target: document.querySelector("#scanner")
        },
        decoder: {
            readers: ["ean_reader", "code_128_reader"] // Supports multiple barcode types
        }
    }, function(err) {
        if (err) {
            console.error("QuaggaJS error:", err);
            return;
        }
        Quagga.start();
    });

    Quagga.onDetected(function(result) {
        const scannedCode = result.codeResult.code;
        console.log("Scanned barcode:", scannedCode);

        // Auto-fill the search box with scanned barcode
        document.getElementById("searchBox").value = scannedCode;
        filterResults(); // Trigger search
        closeScanner(); // Close camera after scan
    });
}
