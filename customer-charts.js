(() => {
  // Illustrative daily data for September 2026; not a production calculation.
  const daily = (anchors, integer = false) => Array.from({length:30}, (_, i) => {
    const day=i+1;
    if(day>anchors.at(-1)[0]) return null;
    const right=anchors.findIndex(([d])=>d>=day);
    if(right===0) return anchors[0][1];
    const [d0,v0]=anchors[right-1], [d1,v1]=anchors[right];
    const value=v0+(v1-v0)*(day-d0)/(d1-d0);
    return integer ? Math.round(value) : +value.toFixed(2);
  });
  const accounts=daily([[1,3],[5,12],[10,22],[15,31],[20,39],[27,48]],true);
  const fixtures={
    active:{min:0,max:10,unit:'%',current:accounts.map(v=>v===null?null:v/692*100)},
    nav:{min:-10,max:10,unit:' tỷ đồng',current:daily([[1,0],[5,-1.2],[10,-3.5],[15,-5],[20,-6.4],[27,-7.7]]),previous:daily([[1,0],[5,1.1],[10,2.3],[15,3.5],[20,4.2],[27,5.6],[30,6.4]])}
  };
  const format=new Intl.NumberFormat('vi-VN',{maximumFractionDigits:2});
  document.querySelectorAll('[data-customer-chart]').forEach((chart, chartIndex)=>{
    const kind=chart.dataset.customerChart, data=fixtures[kind], plot=chart.querySelector('.plot');
    const y=value=>100-(value-data.min)/(data.max-data.min)*100;
    ['previous','current'].forEach(series=>{
      if(!data[series]) return;
      plot.querySelector(`polyline.${series}`).setAttribute('points',data[series].flatMap((v,i)=>v===null?[]:[`${i/29*300},${y(v)*1.5}`]).join(' '));
    });
    const tip=document.createElement('div'); tip.className='chart-tooltip'; tip.id=`customer-tooltip-${chartIndex}`;tip.setAttribute('role','tooltip');tip.hidden=true;chart.append(tip);
    plot.setAttribute('aria-describedby',tip.id);
    const guide=document.createElement('div');guide.className='chart-crosshair';guide.hidden=true;guide.setAttribute('aria-hidden','true');plot.append(guide);
    let index=26;
    function hide(){tip.hidden=true;guide.hidden=true;}
    function show(next){
      index=Math.max(0,Math.min(29,next));const day=String(index+1).padStart(2,'0');
      const value=series=>data[series][index]===null?'Chưa có dữ liệu':`${format.format(data[series][index])}${data.unit}`;
      tip.innerHTML=`<b class="tooltip-day">Ngày ${day}/09/2026</b><div>Kỳ hiện tại: <strong>${value('current')}</strong></div>`;
      if(kind==='active' && accounts[index]!==null) tip.innerHTML+=`<div>${accounts[index]} / 692 tài khoản</div>`;
      if(data.previous) tip.innerHTML+=`<div>Kỳ trước · ${day}/08/2026: <strong>${value('previous')}</strong></div>`;
      tip.hidden=false;guide.hidden=false;guide.style.left=`${index/29*100}%`;
      const p=plot.getBoundingClientRect(), c=chart.getBoundingClientRect(), x=p.left-c.left+index/29*p.width;
      tip.style.left=`${Math.max(8,Math.min(x+12,c.width-tip.offsetWidth-8))}px`;tip.style.top=`${p.top-c.top+8}px`;
    }
    function pointer(event){const r=plot.getBoundingClientRect();show(Math.round((event.clientX-r.left)/r.width*29));}
    plot.addEventListener('pointermove',pointer);plot.addEventListener('pointerdown',pointer);
    plot.addEventListener('pointerleave',event=>{if(event.pointerType!=='touch')hide();});
    plot.addEventListener('focus',()=>show(index));plot.addEventListener('blur',hide);
    plot.addEventListener('keydown',event=>{
      if(event.key==='Escape'){hide();return;}
      const next={ArrowLeft:index-1,ArrowRight:index+1,Home:0,End:29}[event.key];
      if(next===undefined)return;event.preventDefault();show(next);
    });
    document.addEventListener('pointerdown',event=>{if(!plot.contains(event.target))hide();});window.addEventListener('resize',hide);
  });
})();
