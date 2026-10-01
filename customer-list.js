(() => {
  [['existing-customer-table','customer'],['new-customer-table','new-customer']].forEach(([tableId,prefix])=>{
  const table=document.getElementById(tableId);
  if(!table)return;
  const rows=[...table.tBodies[0].rows], filter=document.getElementById(`${prefix}-status`);
  const previous=document.getElementById(`${prefix}-page-prev`), next=document.getElementById(`${prefix}-page-next`);
  const summary=document.getElementById(`${prefix}-page-summary`), current=document.getElementById(`${prefix}-page-current`);
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
  });
})();
