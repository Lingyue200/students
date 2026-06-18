const today = new Date();
const endDefault = new Date(today); endDefault.setDate(today.getDate() + 55);
const dateString = date => date.toISOString().slice(0,10);
document.querySelector('#start-date').value = dateString(today);
document.querySelector('#end-date').value = dateString(endDefault);

document.querySelector('#plan-form').addEventListener('submit', event => {
  event.preventDefault();
  const start = new Date(`${document.querySelector('#start-date').value}T00:00:00`);
  const end = new Date(`${document.querySelector('#end-date').value}T00:00:00`);
  if (end <= start) { alert('结束日期需要晚于开始日期。'); return; }
  const goal = document.querySelector('#goal').value.trim();
  const days = Number(document.querySelector('#days-week').value);
  const hours = Number(document.querySelector('#hours-day').value);
  const level = document.querySelector('#level').value;
  const totalDays = Math.ceil((end - start) / 86400000) + 1;
  const weeks = Math.max(1, Math.ceil(totalDays / 7));
  const sessions = weeks * days;
  const totalHours = sessions * hours;
  const phases = [
    ['打好基础', '前 25%', `梳理 ${goal} 所需的基础知识，完成入门资料；每次学习后用 5 分钟写下要点。`],
    ['集中练习', '中间 45%', '围绕核心内容做练习或小任务，每周挑一个薄弱点重点突破。'],
    ['成果输出', '接下来 20%', '做一个能展示的作品、报告或完整练习，用输出检验理解。'],
    ['复盘巩固', '最后 10%', '整理错题与笔记，复盘完成度，并写出下一阶段的三个行动。']
  ];
  document.querySelector('#plan-result').innerHTML = `<h2>你的暑假学习计划</h2><div class="plan-summary"><span>${level} · 约 ${weeks} 周</span><strong>${sessions} 次学习 · 共约 ${totalHours} 小时</strong><small>建议每周留 1 次机动时间，不必为了补进度熬夜。</small></div>${phases.map((p,i)=>`<div class="phase"><div class="phase-number">${i+1}</div><div><h3>${p[0]} <small>${p[1]}</small></h3><p>${p[2]}</p></div></div>`).join('')}<button class="button secondary full" type="button" id="save-plan">保存计划</button>`;
  const plan = {goal,start:dateString(start),end:dateString(end),days,hours,level,weeks,sessions,totalHours};
  document.querySelector('#save-plan').addEventListener('click', event => { store.set('study-plan', plan); event.currentTarget.textContent='已保存 ✓'; });
});
const savedPlan = store.get('study-plan', null);
if (savedPlan) { document.querySelector('#goal').value=savedPlan.goal; document.querySelector('#start-date').value=savedPlan.start; document.querySelector('#end-date').value=savedPlan.end; document.querySelector('#days-week').value=savedPlan.days; document.querySelector('#hours-day').value=savedPlan.hours; document.querySelector('#level').value=savedPlan.level; }
