(() => {
  const filter = document.getElementById('debt-status');
  if (!filter) return;
  const tables = ['customer', 'loan'].map(kind => {
    const table = document.getElementById(`debt-${kind}-table`);
    const rows = [...table.tBodies[0].rows];
    const empty = table.tBodies[0].insertRow();
    const cell = empty.insertCell();
    cell.colSpan = table.tHead.rows[0].cells.length;
    cell.style.textAlign = 'center';
    return {rows, empty, cell, count: document.getElementById(`debt-${kind}-count`)};
  });
  function render() {
    tables.forEach(({rows, empty, cell, count}) => {
      let visible = 0;
      rows.forEach(row => {
        row.hidden = row.dataset.debtStatus !== filter.value;
        if (!row.hidden) visible++;
      });
      empty.hidden = visible > 0;
      cell.textContent = filter.value === 'overdue'
        ? 'Không có dữ liệu quá hạn.' : 'Không có dữ liệu trong hạn.';
      count.textContent = `${visible} bản ghi`;
    });
  }
  filter.addEventListener('change', render);
  render();
})();
