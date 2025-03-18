let allItems = []; // Store full data for search but do not display initially
let isDataLoaded = false; // Track if data has been loaded

async function fetchData(sheetID) {
    if (isDataLoaded) return; // Prevent multiple data loads
    isDataLoaded = true;

    const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json`;

    try {
        console.log("Fetching price list data...");
        const response = await fetch(sheetURL);
        const text = await response.text();
        const json = JSON.parse(text.substring(47, text.length - 2));

        allItems = json.table.rows.map(row => ({
            itemCode: row.c[1]?.v || "",
            itemName: row.c[2]?.v || "",
            retailPrice: formatPrice(row.c[3]?.v),
            netPrice: formatPrice(row.c[5]?.v)
        }));

        console.log(`Data fetched successfully. Total items: ${allItems.length}. Waiting for search input.`);
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("data-container").innerHTML = "<p>Failed to load data.</p>";
    }
}

function formatPrice(price) {
    return price ? Number(price).toLocaleString("en-US", { maximumFractionDigits: 0 }) : "-";
}
