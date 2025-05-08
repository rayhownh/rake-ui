function _hideTableElement(elm) {
    elm.style.display = "none";
}

function _showTableElement(elm) {
    elm.style.display = "";
}

function _filterTable(value) {
    var tableRows = document.querySelectorAll('[data-table-filterable]');

    for (var i = 0; i < tableRows.length; i++) {
        var row = tableRows[i];

        if (value == "") {
            _showTableElement(row)
        } else {
            if (row.dataset.tableFilterable.includes(value)) {
                _showTableElement(row)
            } else {
                _hideTableElement(row)
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var _tableFilterInput = document.querySelector('[data-table-filter]');
    
    if (_tableFilterInput) {
        var _hasFilteredTableInput = false;
        _tableFilterInput.addEventListener('input', function handleInput(input) {
            _hasFilteredTableInput = true;
            _filterTable(input.target.value)
        });

        // Handling cases where the browser autofills on a back button navigation due to the bfc
        window.addEventListener('pageshow', function() {
            if (!_hasFilteredTableInput && _tableFilterInput) {
                _filterTable(_tableFilterInput.value)
            }
        });
    }
});
