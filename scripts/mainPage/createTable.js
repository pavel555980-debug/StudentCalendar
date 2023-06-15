export function createTable(table) {
    for (let i = 0; i < 5; i++) {
        let row = document.createElement("div");
        row.className = "row";
        for (let j = 0; j < 7; j++) {
            let cell = document.createElement("div");
            cell.className = `cell day${i == 0 ? " firstRow" : ""}${j == 0 ? " firstCell" : ""}`;
            cell.dataset.serialNumber = i*7 + j + 1;
            row.appendChild(cell);
            let cellContainer = document.createElement("div");
            cellContainer.className = "cellContainer";
            cell.appendChild(cellContainer);
        }
        table.appendChild(row);
    }
}