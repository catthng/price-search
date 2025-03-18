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
    );

    displayItems(filteredItems.slice(0, 20)); // Limit to 20 results
}

function displayItems(items) {
    const container = document.getElementById("data-container");
    container.innerHTML = ""; // Clear previous results

    if (items.length === 0) {
        container.innerHTML = "<p>No matching items found.</p>";
        return;
    }

    const fragment = document.createDocumentFragment(); // Faster DOM updates

    items.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item-card");
        itemDiv.innerHTML = `
            <div class="item-name">${item.itemName}</div>
            <div class="row"><span>Item Code: ${item.itemCode}</span></div>
            <div class="row price">
                <span class="retail-price">Retail: ${item.retailPrice}</span>
                <span class="net-price">Discounted: ${item.netPrice}</span>
            </div>
        `;
        fragment.appendChild(itemDiv);
    });

    container.appendChild(fragment);
}
