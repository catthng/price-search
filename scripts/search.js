function filterResults() {
    const query = document.getElementById("searchBox").value.toLowerCase();
    const container = document.getElementById("data-container");

    if (query.length === 0) {
        container.innerHTML = ""; // Hide results if search box is empty
        return;
    }

    const filteredItems = allItems.filter(item => 
        item.itemName.toLowerCase().includes(query) || 
        item.itemCode.toLowerCase().includes(query)
    ).slice(0, 20); // Limit results to 20 items

    displayItems(filteredItems);
}

function displayItems(items) {
    const container = document.getElementById("data-container");
    container.innerHTML = ""; // Clear previous results

    if (items.length === 0) {
        container.innerHTML = "<p>No matching items found.</p>";
        return;
    }

    items.forEach(item => {
        const itemHTML = `
            <div class="item-card">
                <div class="item-name">${item.itemName}</div>
                <div class="row"><span>Item Code: ${item.itemCode}</span></div>
                <div class="row price">
                    <span class="retail-price">Retail: ${item.retailPrice}</span>
                    <span class="net-price">Discounted: ${item.netPrice}</span>
                </div>
            </div>
        `;
        container.innerHTML += itemHTML;
    });
}
