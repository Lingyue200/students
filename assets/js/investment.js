let reviews = store.get('investment-reviews', []);
document.querySelector('#review-date').value = new Date().toISOString().slice(0,10);
function escapeHtml(text='') { const div=document.createElement('div'); div.textContent=text; return div.innerHTML; }
function renderReviews() {
  const list=document.querySelector('#review-list');
  if (!reviews.length) { list.innerHTML='<div class="empty-list">还没有记录。第一条复盘，往往比第一笔收益更重要。</div>'; return; }
  list.innerHTML=reviews.map(r=>`<article class="review-card"><header><div><h3>${escapeHtml(r.name)}</h3><span class="review-meta">${r.date} · ¥${Number(r.amount||0).toFixed(2)}</span></div><span class="action-pill">${r.action}</span></header><details><summary>查看复盘详情</summary><dl><dt>决策依据</dt><dd>${escapeHtml(r.reason)}</dd><dt>结果与反思</dt><dd>${escapeHtml(r.reflection)}</dd><dt>下次改进</dt><dd>${escapeHtml(r.improvement)||'未填写'}</dd></dl><div class="review-actions"><button class="text-button" data-delete="${r.id}" type="button">删除记录</button></div></details></article>`).join('');
}
document.querySelector('#review-form').addEventListener('submit', event=>{event.preventDefault();reviews.unshift({id:Date.now(),name:document.querySelector('#asset-name').value.trim(),date:document.querySelector('#review-date').value,action:document.querySelector('#action').value,amount:document.querySelector('#amount').value,reason:document.querySelector('#reason').value.trim(),reflection:document.querySelector('#reflection').value.trim(),improvement:document.querySelector('#improvement').value.trim()});store.set('investment-reviews',reviews);event.currentTarget.reset();document.querySelector('#review-date').value=new Date().toISOString().slice(0,10);renderReviews();});
document.querySelector('#review-list').addEventListener('click',event=>{const id=Number(event.target.dataset.delete);if(!id||!confirm('确定删除这条记录吗？'))return;reviews=reviews.filter(r=>r.id!==id);store.set('investment-reviews',reviews);renderReviews();});
document.querySelector('#export-reviews').addEventListener('click',()=>{const blob=new Blob([JSON.stringify(reviews,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='投资复盘记录.json';a.click();URL.revokeObjectURL(url);});
renderReviews();
