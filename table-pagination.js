(() => {
  const pageSize = 15;
  const configs = [
    ['sales-staff-table', 'Bảng doanh số theo môi giới'],
    ['debt-manager-table', 'Quy mô dư nợ theo người quản lý'],
    ['debt-customer-table', 'Chi tiết dư nợ', 'debt-status', 'debtStatus'],
    ['existing-customer-table', 'Danh sách KH hiện hữu', 'customer-status', 'status'],
    ['new-customer-table', 'Chi tiết TK mở mới', 'new-customer-status', 'status']
  ];
  configs.forEach(([id, title, filterId, statusKey]) => {
    const table = document.getElementById(id);
    if (!table) return;
    const rows = [...table.tBodies[0].rows];
    const filter = filterId ? document.getElementById(filterId) : null;
    let page = 1;
    table.dataset.pageSize = pageSize;
    const empty = table.tBodies[0].insertRow();
    const emptyCell = empty.insertCell();
    emptyCell.colSpan = table.tHead.rows[0].cells.length;
    emptyCell.style.textAlign = 'center';
    const nav = document.createElement('nav');
    nav.className = 'sales-pagination';
    nav.setAttribute('aria-label', `Phân trang ${title}`);
    const summary = document.createElement('span');
    summary.setAttribute('aria-live', 'polite');
    summary.setAttribute('aria-atomic', 'true');
    const controls = document.createElement('div');
    controls.className = 'sales-page-controls';
    const size = document.createElement('span');
    size.textContent = `${pageSize} bản ghi/trang`;
    const previous = document.createElement('button');
    const next = document.createElement('button');
    previous.type = next.type = 'button';
    previous.textContent = '‹ Trước';
    next.textContent = 'Sau ›';
    previous.setAttribute('aria-controls', id);
    next.setAttribute('aria-controls', id);
    const current = document.createElement('span');
    controls.append(size, previous, current, next);
    nav.append(summary, controls);
    table.closest('.tbl').after(nav);
    function render() {
      const matches = rows.filter(row => !filter || row.dataset[statusKey] === filter.value);
      const pages = Math.max(1, Math.ceil(matches.length / pageSize));
      page = Math.max(1, Math.min(page, pages));
      const start = (page - 1) * pageSize;
      const end = Math.min(start + pageSize, matches.length);
      rows.forEach(row => { row.hidden = true; });
      matches.slice(start, end).forEach(row => { row.hidden = false; });
      empty.hidden = matches.length > 0;
      emptyCell.textContent = filterId === 'debt-status'
        ? (filter.value === 'overdue' ? 'Không có dữ liệu quá hạn.' : 'Không có dữ liệu trong hạn.')
        : 'Không có dữ liệu phù hợp.';
      summary.textContent = matches.length ? `${start + 1}–${end} / ${matches.length} bản ghi` : '0 bản ghi';
      current.textContent = `Trang ${page} / ${pages}`;
      previous.disabled = page === 1;
      next.disabled = page === pages;
    }
    filter?.addEventListener('change', () => { page = 1; render(); });
    previous.addEventListener('click', () => { if (!previous.disabled) { page--; render(); } });
    next.addEventListener('click', () => { if (!next.disabled) { page++; render(); } });
    render();
  });
})();
