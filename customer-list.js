(() => {
  const table=document.getElementById('existing-customer-table');
  if(!table)return;
  const rows=[...table.tBodies[0].rows], filter=document.getElementById('customer-status');
  const previous=document.getElementById('customer-page-prev'), next=document.getElementById('customer-page-next');
  const summary=document.getElementById('customer-page-summary'), current=document.getElementById('customer-page-current');
  const pageSize=20;let page=1;
  function render(){
    const matches=rows.filter(row=>row.dataset.status===filter.value);
    const pages=Math.max(1,Math.ceil(matches.length/pageSize));
    page=Math.max(1,Math.min(page,pages));
    const start=(page-1)*pageSize, end=Math.min(start+pageSize,matches.length);
    rows.forEach(row=>{row.hidden=true;});
    matches.slice(start,end).forEach(row=>{row.hidden=false;});
    summary.textContent=matches.length?`${start+1}–${end} / ${matches.length} bản ghi`:'0 bản ghi';
    current.textContent=`Trang ${page} / ${pages}`;
    previous.disabled=page===1;next.disabled=page===pages;
  }
  filter.addEventListener('change',()=>{page=1;render();});
  previous.addEventListener('click',()=>{if(!previous.disabled){page--;render();}});
  next.addEventListener('click',()=>{if(!next.disabled){page++;render();}});
  render();
})();
