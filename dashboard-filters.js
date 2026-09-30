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
  const isoDate = date => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const displayDate = value => value.split('-').reverse().join('/');
  const today = new Date();
  const state = {
    from: isoDate(new Date(today.getFullYear(), today.getMonth(), 1)),
    to: isoDate(today), scope: broker.id
  };
  const scopeLabel = () => state.scope === 'all' ? 'Tất cả' : (() => {
    const person = people.find(person => person.id === state.scope);
    return `${person.id} - ${person.name}`;
  })();
  const bars = [...document.querySelectorAll('.report-filters')];
  const dateField = (index, key, label) => `<label class="report-date-label" for="report-${index}-${key}">${label}</label>
    <div class="report-date-control">
      <input id="report-${index}-${key}" class="report-date-text" data-date="${key}" type="text" inputmode="numeric" maxlength="10" placeholder="dd/mm/yyyy" autocomplete="off" aria-describedby="report-error-${index}">
      <input class="report-date-picker" data-picker="${key}" type="date" aria-label="Chọn ${label.toLowerCase()} trên lịch" tabindex="0">
    </div>`;
  bars.forEach((bar, index) => {
    const option = person => `<label class="scope-option"><input type="radio" name="scope-${index}" value="${person.id}"><span>${person.id} - ${person.name}</span></label>`;
    bar.innerHTML = `<fieldset class="report-period"><legend>Kỳ báo cáo</legend><div class="report-dates">
      ${dateField(index, 'from', 'Từ ngày')}${dateField(index, 'to', 'Đến ngày')}
      </div><div class="report-error" id="report-error-${index}" role="alert" hidden></div></fieldset>
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
      bar.querySelectorAll('[data-date]').forEach(input => {
        input.value = displayDate(state[input.dataset.date]);
        input.removeAttribute('aria-invalid');
      });
      bar.querySelectorAll('[data-picker]').forEach(input => { input.value = state[input.dataset.picker]; });
      bar.querySelector('.report-error').hidden = true;
      bar.querySelector('.scope-value').textContent = scopeLabel();
      bar.querySelectorAll('input[type="radio"]').forEach(input => { input.checked = input.value === state.scope; });
    });
    document.querySelectorAll('.report-period-chip').forEach(chip => {
      chip.textContent = `Kỳ báo cáo: ${displayDate(state.from)} – ${displayDate(state.to)}`;
    });
    document.querySelectorAll('.report-scope-chip').forEach(chip => { chip.textContent = `Phạm vi dữ liệu: ${scopeLabel()}`; });
  }
  function parseDate(value) {
    const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value.trim());
    if (!match) return null;
    const [, day, month, year] = match.map(Number);
    if (year < 1000) return null;
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? isoDate(date) : null;
  }
  function setDate(bar, input, key, value) {
    const error = bar.querySelector('.report-error');
    const from = key === 'from' ? value : state.from;
    const to = key === 'to' ? value : state.to;
    if (!value || from > to) {
      error.textContent = !value ? 'Nhập ngày hợp lệ theo định dạng dd/mm/yyyy.' : 'Từ ngày phải nhỏ hơn hoặc bằng Đến ngày.';
      error.hidden = false;
      input.setAttribute('aria-invalid', 'true');
      return;
    }
    state[key] = value;
    sync();
  }
  bars.forEach(bar => {
    bar.querySelectorAll('[data-date]').forEach(input => {
      const commit = () => setDate(bar, input, input.dataset.date, parseDate(input.value));
      input.addEventListener('change', commit);
      input.addEventListener('blur', commit);
      input.addEventListener('input', () => {
        if (input.value.length === 10) commit();
      });
      input.addEventListener('keydown', event => {
        if (event.key === 'Enter') { event.preventDefault(); input.blur(); }
      });
    });
    bar.querySelectorAll('[data-picker]').forEach(input => {
      input.addEventListener('change', () => setDate(bar, input, input.dataset.picker, input.value));
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
