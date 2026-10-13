(() => {
  // Demo hierarchy only. Production must supply the signed-in broker's
  // authorized tree from the server and enforce the same scope server-side.
  // Cấp cha TP001 có 2 nhánh con ngang hàng: MG1268 (người đăng nhập, kèm 3
  // cấp dưới) và RE002 (kèm 1 cấp dưới).
  const hierarchy = {id: 'TP001', name: 'Phạm Quốc Hùng', children: [
    {id: 'MG1268', name: 'Trần Phương Anh', children: [
      {id: 'MG1271', name: 'Nguyễn Văn Bình'},
      {id: 'MG1284', name: 'Lê Thu Hà'},
      {id: 'MG1290', name: 'Đỗ Minh Quân'}
    ]},
    {id: 'RE002', name: 'Nguyễn Thị Phong', children: [
      {id: 'RE005', name: 'Hoàng Văn Nam'}
    ]}
  ]};
  const broker = hierarchy.children[0];
  const flatten = person => [person, ...(person.children || []).flatMap(flatten)];
  const people = flatten(hierarchy);
  const monthLabel = value => `Tháng ${Number(value.slice(5))}/${value.slice(0, 4)}`;
  const months = ['2026-10', '2026-09'];
  const state = {
    month: months[0], scope: broker.id
  };
  const scopeLabel = () => state.scope === 'all' ? 'Tất cả' : (() => {
    const person = people.find(person => person.id === state.scope);
    return `${person.id} - ${person.name}`;
  })();
  // Cây chọn phạm vi theo kiểu TreeSelect (Ant Design): "Tất cả" là nút lá,
  // cấp cha và nhánh của người đăng nhập mở sẵn, nhánh ngang hàng thu gọn.
  const toNode = person => ({
    key: person.id,
    title: `${person.id} - ${person.name}`,
    children: person.children ? person.children.map(toNode) : undefined
  });
  const nodes = [{key: 'all', title: 'Tất cả'}, toNode(hierarchy)];
  const defaultExpanded = [hierarchy.id, broker.id];
  const chevron = '<svg viewBox="0 0 1024 1024" width="10" height="10" aria-hidden="true" focusable="false"><path fill="currentColor" d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"/></svg>';
  const caret = '<svg viewBox="0 0 1024 1024" width="10" height="10" aria-hidden="true" focusable="false"><path fill="currentColor" d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"/></svg>';
  function renderNodes(list, index, level) {
    return list.map(node => {
      const parent = Array.isArray(node.children) && node.children.length > 0;
      return `<li role="none"><div class="tree-node" role="treeitem" id="scope-${index}-${node.key}" data-key="${node.key}" aria-level="${level}" aria-selected="false"${parent ? ' aria-expanded="false"' : ''} tabindex="-1">
        <span class="tree-switcher${parent ? '' : ' leaf'}"${parent ? ' data-toggle' : ''} aria-hidden="true">${parent ? caret : ''}</span><span class="tree-title">${node.title}</span></div>
        ${parent ? `<ul role="group" class="tree-children">${renderNodes(node.children, index, level + 1)}</ul>` : ''}</li>`;
    }).join('');
  }
  const bars = [...document.querySelectorAll('.report-filters')];
  bars.forEach((bar, index) => {
    bar.innerHTML = `<div class="report-period"><label class="report-filter-label" for="report-month-${index}">Kỳ báo cáo</label>
      <select id="report-month-${index}" class="report-month" data-report-month>${months.map(month => `<option value="${month}">${monthLabel(month)}</option>`).join('')}</select></div>
      <div class="report-scope"><span id="scope-label-${index}" class="report-filter-label">Phạm vi dữ liệu</span>
        <div class="tree-select">
          <button type="button" class="tree-select-selector" role="combobox" aria-haspopup="tree" aria-expanded="false" aria-controls="scope-tree-${index}" aria-labelledby="scope-label-${index} scope-value-${index}">
            <span id="scope-value-${index}" class="tree-select-value"></span><span class="tree-select-arrow">${chevron}</span>
          </button>
          <div class="tree-select-dropdown" hidden>
            <ul class="tree" id="scope-tree-${index}" role="tree" aria-labelledby="scope-label-${index}">${renderNodes(nodes, index, 1)}</ul>
          </div>
        </div>
      </div>`;
    bar.querySelectorAll('.tree-node[aria-expanded]').forEach(node => {
      node.setAttribute('aria-expanded', String(defaultExpanded.includes(node.dataset.key)));
    });
  });
  function sync() {
    bars.forEach(bar => {
      bar.querySelector('[data-report-month]').value = state.month;
      bar.querySelector('.tree-select-value').textContent = scopeLabel();
      bar.querySelectorAll('.tree-node').forEach(node => {
        node.setAttribute('aria-selected', String(node.dataset.key === state.scope));
      });
    });
    document.querySelectorAll('.report-period-chip').forEach(chip => {
      chip.textContent = `Kỳ báo cáo: ${monthLabel(state.month)}`;
    });
    document.querySelectorAll('.report-scope-chip').forEach(chip => { chip.textContent = `Phạm vi dữ liệu: ${scopeLabel()}`; });
  }
  const visibleNodes = tree => [...tree.querySelectorAll('.tree-node')].filter(node => node.offsetParent !== null);
  function focusNode(tree, node) {
    tree.querySelectorAll('.tree-node').forEach(item => { item.tabIndex = item === node ? 0 : -1; });
    node.focus();
  }
  function setOpen(bar, open) {
    const selector = bar.querySelector('.tree-select-selector');
    const dropdown = bar.querySelector('.tree-select-dropdown');
    if (open) bars.forEach(other => { if (other !== bar) setOpen(other, false); });
    dropdown.hidden = !open;
    selector.setAttribute('aria-expanded', String(open));
    bar.querySelector('.tree-select').classList.toggle('open', open);
    if (open) {
      const tree = bar.querySelector('.tree');
      const selected = tree.querySelector('.tree-node[aria-selected="true"]');
      focusNode(tree, selected && selected.offsetParent !== null ? selected : tree.querySelector('.tree-node'));
    }
  }
  function choose(bar, key) {
    if (key !== 'all' && !people.some(person => person.id === key)) return;
    state.scope = key;
    sync();
    setOpen(bar, false);
    bar.querySelector('.tree-select-selector').focus();
  }
  function toggle(node, expanded) {
    if (!node.hasAttribute('aria-expanded')) return;
    node.setAttribute('aria-expanded', String(expanded ?? node.getAttribute('aria-expanded') !== 'true'));
  }
  bars.forEach(bar => {
    bar.querySelector('[data-report-month]').addEventListener('change', event => {
      if (!months.includes(event.target.value)) return;
      state.month = event.target.value;
      sync();
    });
    const selector = bar.querySelector('.tree-select-selector');
    const tree = bar.querySelector('.tree');
    selector.addEventListener('click', () => setOpen(bar, bar.querySelector('.tree-select-dropdown').hidden));
    selector.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(bar, true); }
    });
    tree.addEventListener('click', event => {
      const node = event.target.closest('.tree-node');
      if (!node) return;
      if (event.target.closest('[data-toggle]')) { toggle(node); focusNode(tree, node); return; }
      choose(bar, node.dataset.key);
    });
    tree.addEventListener('keydown', event => {
      const node = event.target.closest('.tree-node');
      if (!node) return;
      const list = visibleNodes(tree);
      const at = list.indexOf(node);
      const parent = node.closest('.tree-children')?.closest('li')?.querySelector('.tree-node');
      switch (event.key) {
        case 'ArrowDown': if (list[at + 1]) focusNode(tree, list[at + 1]); break;
        case 'ArrowUp': if (list[at - 1]) focusNode(tree, list[at - 1]); break;
        case 'Home': focusNode(tree, list[0]); break;
        case 'End': focusNode(tree, list[list.length - 1]); break;
        case 'ArrowRight':
          if (node.getAttribute('aria-expanded') === 'false') toggle(node, true);
          else if (node.getAttribute('aria-expanded') === 'true' && list[at + 1]) focusNode(tree, list[at + 1]);
          break;
        case 'ArrowLeft':
          if (node.getAttribute('aria-expanded') === 'true') toggle(node, false);
          else if (parent) focusNode(tree, parent);
          break;
        case 'Enter': case ' ': choose(bar, node.dataset.key); break;
        case 'Tab': setOpen(bar, false); return;
        default: return;
      }
      event.preventDefault();
    });
  });
  document.addEventListener('click', event => {
    bars.forEach(bar => {
      if (!bar.querySelector('.tree-select').contains(event.target)) setOpen(bar, false);
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    bars.forEach(bar => {
      if (!bar.querySelector('.tree-select-dropdown').hidden) { setOpen(bar, false); bar.querySelector('.tree-select-selector').focus(); }
    });
  });
  sync();
})();
