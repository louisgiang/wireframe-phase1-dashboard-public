(() => {
  // Demo hierarchy only. Production must supply the signed-in broker and
  // authorized descendants from the server; no ancestor is a selectable scope.
  const broker = {id: 'MG1268', name: 'Trần Phương Anh', children: [
    {id: 'MG1271', name: 'Nguyễn Văn Bình'},
    {id: 'MG1284', name: 'Lê Thu Hà'},
    {id: 'MG1290', name: 'Đỗ Minh Quân'}
  ]};
  const people = [broker, ...broker.children];
  const pad = value => String(value).padStart(2, '0');
  const monthValue = date => `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
  const monthLabel = value => `Tháng ${Number(value.slice(5))}/${value.slice(0, 4)}`;
  const today = new Date();
  const months = Array.from({length: 24}, (_, offset) => monthValue(new Date(today.getFullYear(), today.getMonth() - offset, 1)));
  const state = {
    month: monthValue(today), scope: broker.id
  };
  const scopeLabel = () => state.scope === 'all' ? 'Tất cả' : (() => {
    const person = people.find(person => person.id === state.scope);
    return `${person.id} - ${person.name}`;
  })();
  const bars = [...document.querySelectorAll('.report-filters')];
  bars.forEach((bar, index) => {
    const option = person => `<label class="scope-option"><input type="radio" name="scope-${index}" value="${person.id}"><span>${person.id} - ${person.name}</span></label>`;
    bar.innerHTML = `<div class="report-period"><label class="report-filter-label" for="report-month-${index}">Kỳ báo cáo</label>
      <select id="report-month-${index}" class="report-month" data-report-month>${months.map(month => `<option value="${month}">${monthLabel(month)}</option>`).join('')}</select></div>
      <div class="report-scope"><span id="scope-label-${index}" class="report-filter-label">Phạm vi dữ liệu</span>
        <details class="scope-dropdown"><summary aria-labelledby="scope-label-${index} scope-value-${index}"><span id="scope-value-${index}" class="scope-value"></span><span aria-hidden="true">▾</span></summary>
          <div class="scope-menu" role="group" aria-label="Chọn phạm vi dữ liệu">
            <label class="scope-option"><input type="radio" name="scope-${index}" value="all"><span>Tất cả</span></label>
            <ul class="scope-tree"><li>${option(broker)}<ul>${broker.children.map(person => `<li>${option(person)}</li>`).join('')}</ul></li></ul>
          </div>
        </details>
      </div>`;
  });
  function sync() {
    bars.forEach(bar => {
      bar.querySelector('[data-report-month]').value = state.month;
      bar.querySelector('.scope-value').textContent = scopeLabel();
      bar.querySelectorAll('input[type="radio"]').forEach(input => { input.checked = input.value === state.scope; });
    });
    document.querySelectorAll('.report-period-chip').forEach(chip => {
      chip.textContent = `Kỳ báo cáo: ${monthLabel(state.month)}`;
    });
    document.querySelectorAll('.report-scope-chip').forEach(chip => { chip.textContent = `Phạm vi dữ liệu: ${scopeLabel()}`; });
  }
  bars.forEach(bar => {
    bar.querySelector('[data-report-month]').addEventListener('change', event => {
      if (!months.includes(event.target.value)) return;
      state.month = event.target.value;
      sync();
    });
    const dropdown = bar.querySelector('.scope-dropdown');
    dropdown.addEventListener('toggle', () => {
      if (dropdown.open) bars.forEach(other => {
        if (other !== bar) other.querySelector('.scope-dropdown').open = false;
      });
    });
    bar.querySelectorAll('input[type="radio"]').forEach(input => {
      input.addEventListener('change', () => {
        if (input.value !== 'all' && !people.some(person => person.id === input.value)) return;
        state.scope = input.value;
        sync();
        dropdown.open = false;
        dropdown.querySelector('summary').focus();
      });
    });
  });
  document.addEventListener('click', event => {
    bars.forEach(bar => {
      const dropdown = bar.querySelector('.scope-dropdown');
      if (!dropdown.contains(event.target)) dropdown.open = false;
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    bars.forEach(bar => {
      const dropdown = bar.querySelector('.scope-dropdown');
      if (dropdown.open) { dropdown.open = false; dropdown.querySelector('summary').focus(); }
    });
  });
  sync();
})();
