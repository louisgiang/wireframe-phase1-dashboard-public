(() => {
  // Fixed illustrative September data, matching the existing demo charts.
  // Interpolation here creates the demo fixture only. Production must use
  // reported daily values and explicit nulls; it must not infer missing data.
  const daily = anchors => Array.from({length: 30}, (_, index) => {
    const day = index + 1;
    if (day > anchors.at(-1)[0]) return null;
    const right = anchors.findIndex(point => point[0] >= day);
    if (right === 0) return anchors[0][1];
    const [d0, v0] = anchors[right - 1], [d1, v1] = anchors[right];
    return +(v0 + (v1 - v0) * (day - d0) / (d1 - d0)).toFixed(3);
  });
  const fixtures = [
    {max: 40,
      current: daily([[1,1.2],[4,2.9],[7,7.3],[10,11.7],[13,14.6],[16,17],[19,19.3],[22,21.6],[27,23.4]]),
      previous: daily([[1,1.3],[4,3.1],[7,8.2],[10,14.1],[13,15.9],[16,18],[19,22.6],[22,25.7],[27,28.9],[31,31.2]])},
    {max: 3,
      current: daily([[1,1.58],[4,1.64],[7,1.7],[10,1.81],[13,1.87],[16,2.05],[19,2.22],[22,2.25],[27,2.34]]),
      previous: daily([[1,1.79],[4,1.85],[7,1.96],[10,2.09],[13,2.21],[16,2.33],[19,2.39],[22,2.46],[27,2.51],[30,2.63]])}
  ];
  const format = new Intl.NumberFormat('vi-VN', {maximumFractionDigits: 2});
  document.querySelectorAll('.overview-time-chart').forEach((chart, chartIndex) => {
    const data = fixtures[chartIndex];
    const plot = chart.querySelector('.plot');
    const lines = plot.querySelectorAll('polyline');
    [data.previous, data.current].forEach((values, i) => {
      lines[i].setAttribute('points', values.flatMap((value, day) => value === null ? [] : [`${day / 29 * 300},${150 - value / data.max * 150}`]).join(' '));
    });
    plot.tabIndex = 0;
    plot.setAttribute('role', 'group');
    const tipId = `overview-tooltip-${chartIndex}`;
    plot.setAttribute('aria-describedby', tipId);
    const tip = document.createElement('div');
    tip.className = 'chart-tooltip'; tip.id = tipId; tip.setAttribute('role', 'tooltip'); tip.hidden = true;
    tip.innerHTML = '<b class="tooltip-day"></b><div class="tooltip-row"><i class="tooltip-swatch current"></i><span class="tooltip-current-date"></span><strong class="tooltip-current-value"></strong></div><div class="tooltip-row"><i class="tooltip-swatch previous"></i><span class="tooltip-previous-date"></span><strong class="tooltip-previous-value"></strong></div>';
    chart.append(tip);
    const guide = document.createElement('div'); guide.className = 'chart-crosshair'; guide.hidden = true; guide.setAttribute('aria-hidden', 'true'); plot.append(guide);
    const dots = ['current', 'previous'].map(kind => {
      const dot = document.createElement('i'); dot.className = `chart-hover-dot ${kind}`; dot.hidden = true; dot.setAttribute('aria-hidden', 'true'); plot.append(dot); return dot;
    });
    let index = 26;
    function hide() { tip.hidden = true; guide.hidden = true; dots.forEach(dot => { dot.hidden = true; }); }
    function show(dayIndex) {
      index = Math.max(0, Math.min(29, dayIndex));
      const day = String(index + 1).padStart(2, '0');
      tip.querySelector('.tooltip-day').textContent = `Ngày ${day}/09/2026`;
      tip.querySelector('.tooltip-current-date').textContent = `Kỳ hiện tại · ${day}/09/2026`;
      tip.querySelector('.tooltip-previous-date').textContent = `Kỳ trước · ${day}/08/2026`;
      [data.current, data.previous].forEach((values, i) => {
        const value = values[index];
        tip.querySelector(i === 0 ? '.tooltip-current-value' : '.tooltip-previous-value').textContent = value === null ? 'Chưa có dữ liệu' : `${format.format(value)} tỷ đồng`;
        dots[i].hidden = value === null;
        dots[i].style.left = `${index / 29 * 100}%`;
        if (value !== null) dots[i].style.top = `${100 - value / data.max * 100}%`;
      });
      guide.hidden = false; guide.style.left = `${index / 29 * 100}%`;
      tip.hidden = false;
      const p = plot.getBoundingClientRect(), c = chart.getBoundingClientRect();
      const x = p.left - c.left + index / 29 * p.width;
      const left = x + tip.offsetWidth + 20 <= c.width ? x + 12 : x - tip.offsetWidth - 12;
      tip.style.left = `${Math.max(8, Math.min(left, c.width - tip.offsetWidth - 8))}px`;
      tip.style.top = `${p.top - c.top + 8}px`;
    }
    function pointer(event) {
      const rect = plot.getBoundingClientRect();
      show(Math.round((event.clientX - rect.left) / rect.width * 29));
    }
    plot.addEventListener('pointermove', pointer);
    plot.addEventListener('pointerdown', pointer);
    plot.addEventListener('pointerleave', event => { if (event.pointerType !== 'touch') hide(); });
    plot.addEventListener('focus', () => show(index));
    plot.addEventListener('blur', hide);
    plot.addEventListener('keydown', event => {
      if (event.key === 'Escape') { hide(); return; }
      const next = {ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: 29}[event.key];
      if (next === undefined) return;
      event.preventDefault(); show(next);
    });
    document.addEventListener('pointerdown', event => { if (!plot.contains(event.target)) hide(); });
    window.addEventListener('resize', hide);
  });
})();
