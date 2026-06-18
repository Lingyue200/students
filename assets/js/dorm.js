const defaultItems = [
  ['床上用品','床单被套'],['床上用品','枕头'],['床上用品','夏凉被/厚被'],['床上用品','床垫'],
  ['洗护用品','牙刷牙膏'],['洗护用品','毛巾浴巾'],['洗护用品','洗发水沐浴露'],['洗护用品','脸盆'],
  ['学习用品','笔记本和笔'],['学习用品','台灯'],['学习用品','插线板'],['学习用品','电脑及充电器'],
  ['生活用品','衣架'],['生活用品','水杯'],['生活用品','雨伞'],['生活用品','常用药品'],
  ['证件资料','录取通知书'],['证件资料','身份证'],['证件资料','证件照'],['证件资料','银行卡']
].map(([category,name], i) => ({id:i+1, category, name, done:false}));
let items = store.get('dorm-items', defaultItems);

function renderList() {
  const container = document.querySelector('#checklist');
  const categories = [...new Set(items.map(item => item.category))];
  container.innerHTML = categories.map(category => `<section class="check-category"><h2>${category}</h2>${items.filter(item => item.category === category).map(item => `<label class="check-item ${item.done ? 'done' : ''}"><input type="checkbox" data-id="${item.id}" ${item.done ? 'checked' : ''}><span>${escapeHtml(item.name)}</span><button class="delete-item" type="button" data-delete="${item.id}" aria-label="删除">×</button></label>`).join('')}</section>`).join('');
  const done = items.filter(item => item.done).length;
  document.querySelector('#check-count').textContent = `${done} / ${items.length}`;
  document.querySelector('#check-progress').style.width = `${items.length ? done / items.length * 100 : 0}%`;
  store.set('dorm-items', items);
}
function escapeHtml(text) { const div = document.createElement('div'); div.textContent = text; return div.innerHTML; }
document.querySelector('#checklist').addEventListener('change', event => { const id = Number(event.target.dataset.id); if (!id) return; items = items.map(item => item.id === id ? {...item, done:event.target.checked} : item); renderList(); });
document.querySelector('#checklist').addEventListener('click', event => { const id = Number(event.target.dataset.delete); if (!id) return; items = items.filter(item => item.id !== id); renderList(); });
document.querySelector('#add-item-form').addEventListener('submit', event => { event.preventDefault(); const input = document.querySelector('#new-item'); items.push({id:Date.now(), category:document.querySelector('#new-category').value, name:input.value.trim(), done:false}); input.value=''; renderList(); });
document.querySelector('#reset-list').addEventListener('click', () => { if (confirm('确定恢复默认清单吗？自定义内容会被删除。')) { items = structuredClone(defaultItems); renderList(); } });
renderList();
