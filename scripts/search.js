function filterResults() {
    const query = document.getElementById("searchBox").value.toLowerCase();
    const filteredItems = allItems.filter(item => 
        item.itemName.toLowerCase().includes(query) || 
        item.itemCode.toLowerCase().includes(query) || 
        item.barcode.includes(query)
    );
    displayItems(filteredItems);
}
