let allItems = []; // Store full data for search

async function fetchData(sheetID) {
    const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json`;

    try {
        const response = await fetch(sheetURL);
        const text = await response.text();
        const json = JSON.parse(text.substring(47, text.length - 2));

        allItems = json.table.rows.map(row => ({
            barcode: row.c[0]?.v || "",
            itemCode: row.c[1]?.v || "",
            itemName: row.c[2]?.v || "",
            retailPrice: formatPrice(row.c[3]?.v),
            netPrice: formatPrice(row.c[5]?.v)
        }));

        displayItems(allItems);
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("data-container").innerHTML = "Failed to load data.";
    }
}

function formatPrice(price) {
    return price ? Number(price).toLocaleString("en-US", { maximumFractionDigits: 0 }) : "-";
}

function displayItems(items) {
    const container = document.getElementById("data-container");
    container.innerHTML = "";

    if (items.length === 0) {
        container.innerHTML = "<p>No matching items found.</p>";
        return;
    }

    items.forEach(item => {
        const itemHTML = `
            <div class="item-card">
                <div class="item-name">${item.itemName}</div>
                <div class="row"><span>${item.itemCode}</span><span>${item.barcode}</span></div>
                <div class="row price"><span>Retail: ${item.retailPrice}</span><span>Net: ${item.netPrice}</span></div>
            </div>
        `;
        container.innerHTML += itemHTML;
    });
}
