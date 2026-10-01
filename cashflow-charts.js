(() => {
  // Daily demo amounts in billion VND. Net is daily, not cumulative.
  const deposits={2:1,6:1.4,10:0.5,14:2,18:1.5,22:0.9,25:0.8,27:9.5};
  const withdrawals={2:0.2,6:0.3,10:0.9,14:0.25,18:0.1,22:0.15,25:0.31,26:1.62,27:0.2};
  const format=new Intl.NumberFormat('vi-VN',{maximumFractionDigits:2});
  document.querySelectorAll('[data-cashflow-chart]').forEach((chart,index)=>{
    const plot=chart.querySelector('.plot');
    const tip=document.createElement('div');tip.className='chart-tooltip';tip.id=`cashflow-tooltip-${index}`;tip.setAttribute('role','tooltip');tip.hidden=true;chart.append(tip);
    plot.setAttribute('aria-describedby',tip.id);
    let day=27;
    function hide(){tip.hidden=true;}
    function show(value){
      day=Math.max(1,Math.min(27,value));
      const deposit=deposits[day]||0,withdraw=withdrawals[day]||0,net=+(deposit-withdraw).toFixed(2);
      tip.innerHTML=`<b class="tooltip-day">Ngày ${String(day).padStart(2,'0')}/09/2026</b><div>Nộp: <strong>${format.format(deposit)} tỷ đồng</strong></div><div>Rút: <strong>${format.format(withdraw)} tỷ đồng</strong></div><div>Nộp/Rút ròng: <strong>${net>0?'+':''}${format.format(net)} tỷ đồng</strong></div>`;
      tip.hidden=false;
      const p=plot.getBoundingClientRect(),c=chart.getBoundingClientRect();
      tip.style.left=`${Math.max(8,Math.min(p.left-c.left+(day-0.5)/27*p.width+12,c.width-tip.offsetWidth-8))}px`;
      tip.style.top=`${p.top-c.top+8}px`;
    }
    function pointer(event){const r=plot.getBoundingClientRect();show(Math.floor((event.clientX-r.left)/r.width*27)+1);}
    plot.addEventListener('pointermove',pointer);plot.addEventListener('pointerdown',pointer);
    plot.addEventListener('pointerleave',event=>{if(event.pointerType!=='touch')hide();});
    plot.addEventListener('focus',()=>show(day));plot.addEventListener('blur',hide);
    plot.addEventListener('keydown',event=>{
      if(event.key==='Escape'){hide();return;}
      const next={ArrowLeft:day-1,ArrowRight:day+1,Home:1,End:27}[event.key];
      if(next===undefined)return;event.preventDefault();show(next);
    });
    document.addEventListener('pointerdown',event=>{if(!plot.contains(event.target))hide();});
    chart.querySelector('.cashflow-scroll').addEventListener('scroll',hide);
    window.addEventListener('resize',hide);
  });
})();
