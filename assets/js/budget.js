const budgetForm = document.querySelector('#budget-form');
const fields = ['income', 'food', 'housing', 'transport', 'study-cost', 'fun', 'other'];

function calculateBudget() {
  const values = Object.fromEntries(fields.map(id => [id, Math.max(0, Number(document.querySelector(`#${id}`).value) || 0)]));
  const spent = fields.slice(1).reduce((sum, id) => sum + values[id], 0);
  const balance = values.income - spent;
  const allocation = values.income ? spent / values.income * 100 : 0;
  const savingRate = values.income ? balance / values.income * 100 : 0;
  document.querySelector('#balance').textContent = `${balance < 0 ? '-' : ''}¥${Math.abs(balance).toFixed(0)}`;
  document.querySelector('#daily').textContent = `¥${(values.income / 30).toFixed(2)}`;
  document.querySelector('#saving-rate').textContent = `${savingRate.toFixed(1)}%`;
  document.querySelector('#allocated-text').textContent = `${allocation.toFixed(0)}%`;
  const bar = document.querySelector('#allocated-bar');
  bar.style.width = `${Math.min(allocation, 100)}%`;
  bar.style.background = allocation > 100 ? '#b43a45' : '';
  const tip = document.querySelector('#budget-tip');
  tip.classList.toggle('danger', balance < 0);
  tip.textContent = balance < 0 ? `当前预算超出 ¥${Math.abs(balance).toFixed(0)}，建议优先调整娱乐或其他支出。` : savingRate >= 10 ? '预算状态健康，可以留一点弹性应对临时开销。' : '结余空间较小，建议预留至少 10% 作为储蓄或应急资金。';
  return values;
}

const savedBudget = store.get('student-budget', null);
if (savedBudget) fields.forEach(id => { if (savedBudget[id] !== undefined) document.querySelector(`#${id}`).value = savedBudget[id]; });
budgetForm.addEventListener('submit', event => { event.preventDefault(); calculateBudget(); });
document.querySelector('#save-budget').addEventListener('click', () => {
  store.set('student-budget', calculateBudget());
  const button = document.querySelector('#save-budget'); button.textContent = '已保存 ✓'; setTimeout(() => button.textContent = '保存本次预算', 1400);
});
calculateBudget();
