(() => {
  const filter = document.getElementById('debt-status');
  const table = document.getElementById('debt-customer-table');
  if (!filter || !table) return;
  const rows = [...table.tBodies[0].rows];
  const empty = table.tBodies[0].insertRow();
  const cell = empty.insertCell();
  cell.colSpan = table.tHead.rows[0].cells.length;
  cell.style.textAlign = 'center';
  const count = document.getElementById('debt-customer-count');
  function render() {
    let visible = 0;
    rows.forEach(row => {
      row.hidden = row.dataset.debtStatus !== filter.value;
      if (!row.hidden) visible++;
    });
    empty.hidden = visible > 0;
    cell.textContent = filter.value === 'overdue'
      ? 'Không có dữ liệu quá hạn.' : 'Không có dữ liệu trong hạn.';
    count.textContent = `${visible} bản ghi`;
  }
  filter.addEventListener('change', render);
  render();
})();
