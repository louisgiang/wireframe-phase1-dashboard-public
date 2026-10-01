(() => {
  // Illustrative amounts in million VND, matching daily and period cashflow totals.
  const managers={MG1268:'Trần Phương Anh',MG1271:'Nguyễn Văn Bình',MG1284:'Lê Thu Hà',MG1290:'Đỗ Minh Quân',RE002:'Nguyễn Thị Phong',RE005:'Hoàng Văn Nam'};
  // Account, customer, manager, period net, net on 27 September.
  const customers=[
    ['069C000001','Triệu Hạnh Hiền','MG1268',7920,5000],
    ['069C000017','Phạm Thị Vân','MG1271',4500,4500],
    ['069C000453','Nguyễn Minh Sang','MG1284',1150,0],
    ['069C000600','Nguyễn Thanh Tùng','RE002',1000,0],
    ['069C000601','Trần Ngọc Lan','MG1268',800,0],
    ['069C000602','Phạm Quốc Huy','MG1271',650,0],
    ['069C000603','Lê Minh Đức','MG1284',550,0],
    ['069C000604','Đỗ Thị Hương','MG1284',450,0],
    ['069C000605','Hoàng Anh Tuấn','RE002',350,0],
    ['069C000606','Vũ Ngọc Mai','RE002',230,0],
    ['069C000452','Lương Quốc Bảo','MG1290',-1620,0],
    ['069C000731','Phạm Đức Hiền','RE005',-1050,-60],
    ['069C000732','Phan Văn Sơn','MG1268',-880,-40],
    ['069C000733','Ngô Thị Hạnh','MG1271',-120,0],
    ['069C000734','Trần Thu Ngân','MG1284',-100,0],
    ['069C000735','Lê Quốc Dũng','RE002',-80,-20],
    ['069C000736','Phạm Minh Châu','MG1290',-60,-80],
    ['069C000737','Vũ Thị Hồng','RE005',-50,0],
    ['069C000738','Hoàng Thanh Bình','MG1290',-40,0],
    ['069C000739','Đặng Ngọc Yến','RE005',-30,0]
  ];
  const format=new Intl.NumberFormat('vi-VN',{maximumFractionDigits:2});
  const amount=value=>`${value>0?'+':'−'}${format.format(Math.abs(value)>=1000?Math.abs(value)/1000:Math.abs(value))} ${Math.abs(value)>=1000?'tỷ':'tr'}`;
  const buttons=[...document.querySelectorAll('[data-cash-ranking-period]')];
  function renderList(id,rows,positive,limit=Infinity){
    const selected=rows.filter(row=>positive?row.value>0:row.value<0).sort((a,b)=>Math.abs(b.value)-Math.abs(a.value)||a.label.localeCompare(b.label,'vi')).slice(0,limit);
    const list=document.getElementById(id);list.replaceChildren();
    selected.forEach((row,index)=>{
      const item=document.createElement('li');
      const rank=document.createElement('span');rank.className='cash-ranking-position';rank.textContent=index+1;
      const name=document.createElement('span');name.className='cash-ranking-name';name.textContent=row.label;
      const bar=document.createElement('span');bar.className='cash-ranking-bar';bar.setAttribute('aria-hidden','true');
      const fill=document.createElement('i');fill.style.width=`${Math.abs(row.value)/Math.abs(selected[0].value)*100}%`;bar.append(fill);
      const value=document.createElement('strong');value.className='cash-ranking-amount';value.textContent=amount(row.value);
      item.append(rank,name,bar,value);list.append(item);
    });
  }
  function render(period){
    buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.cashRankingPeriod===period)));
    const index=period==='day'?4:3;
    const rows=customers.map(row=>({label:`${row[0]} - ${row[1]}`,value:row[index]}));
    const totals=Object.fromEntries(Object.keys(managers).map(id=>[id,0]));
    customers.forEach(row=>{totals[row[2]]+=row[index];});
    const staff=Object.entries(totals).map(([id,value])=>({label:`${id} - ${managers[id]}`,value}));
    renderList('cash-ranking-customers-in',rows,true,10);renderList('cash-ranking-customers-out',rows,false,10);
    renderList('cash-ranking-managers-in',staff,true);renderList('cash-ranking-managers-out',staff,false);
  }
  buttons.forEach(button=>button.addEventListener('click',()=>render(button.dataset.cashRankingPeriod)));
  render('day');
})();
