'use strict';
const KEY='kitchen-plan-v1';
const iso=d=>new Date(d).toLocaleDateString('sv-SE');
const parse=s=>new Date(s+'T12:00:00');
const add=(s,n)=>iso(new Date(parse(s).setDate(parse(s).getDate()+n)));
const diff=(a,b)=>Math.round((parse(a)-parse(b))/86400000);
const today=()=>iso(new Date());
const fmt=(s,opts={day:'numeric',month:'long'})=>parse(s).toLocaleDateString('ru-RU',opts);
const PLAN_DAYS=365;
const makeSessions=start=>Array.from({length:Math.ceil(PLAN_DAYS/7)*2},(_,i)=>({id:'s'+i,date:add(start,Math.floor(i/2)*7+(i%2)*3-1),index:i,done:false})).filter(s=>diff(s.date,start)<PLAN_DAYS);
const NOV19_DATE='2026-11-19';
const NOV19_LASAGNA='Ленивая лазанья с говядиной';
const NOV19_BEEF='Бефстроганов в сливочно-грибном соусе, гречка';
MEAL_IMAGES[NOV19_BEEF]=MEAL_IMAGES['Бефстроганов, гречка'];
NUTRITION.foods.nov19BeefStrips={...NUTRITION.foods.beef,name:'Говядина полосками для бефстроганова'};
NUTRITION.foods.nov19Cream={name:'Сливки 20%',kcal:206,protein:2.5,fat:20,carbs:4,basis:'из упаковки',note:'Оценка. Сверить этикетку.'};
const nov19BeefItems=Object.entries({nov19BeefStrips:140,buckwheat:50,nov19Cream:45,mushroom:50,onion:25,oil:3}).map(([food,grams])=>({food,grams}));
NUTRITION.meals[NOV19_BEEF]={batch:true,items:nov19BeefItems,totals:Object.fromEntries(
 ['kcal','protein','fat','carbs'].map(k=>[k,nov19BeefItems.reduce((sum,{food,grams})=>sum+NUTRITION.foods[food][k]*grams/100,0)])
)};
const NOV19_SNACK='Скир, банан и хлеб с отрубями';
MEAL_IMAGES[NOV19_SNACK]=MEAL_IMAGES['Скир + банан + хлебец'];
const nov19SnackItems=NUTRITION.meals['Скир + банан + хлебец'].items.map(item=>
 NUTRITION.foods[item.food].name==='Хлебцы'?{food:Object.keys(NUTRITION.foods).find(k=>NUTRITION.foods[k].name==='Хлеб с отрубями'),grams:20}:item
);
NUTRITION.meals[NOV19_SNACK]={batch:false,items:nov19SnackItems,totals:Object.fromEntries(
 ['kcal','protein','fat','carbs'].map(k=>[k,nov19SnackItems.reduce((sum,{food,grams})=>sum+NUTRITION.foods[food][k]*grams/100,0)])
)};
const NOV19_STEPS=[
 ['Подготовка','Разогрейте духовку до 190 °C, верх-низ. Отмерьте всё из списка. Нарежьте 270 г лука и разделите: 120 г для лазаньи и 150 г для грибного соуса. Поставьте 300 г сухой гречки в мультиварке по инструкции прибора. Проверьте после окончания программы: крупа мягкая, свободной воды нет.'],
 ['Томатная начинка · Pragma №1','Разложите 930 г фарша и 120 г лука тонким слоем с 12 г масла. Запекайте при 190 °C, через 12–15 минут разбейте комочки и перемешайте. Проверяйте и перемешивайте каждые 5 минут. Для фарша ориентир 71 °C; без щупа цвет и время не подтверждают безопасную готовность. Когда фарш готов, добавьте 660 г томатов и специи и верните в духовку на 10–15 минут до загустения. Переложите начинку в миску.'],
 ['Молочный соус и слои · Pragma №1','В жаропрочной посуде венчиком смешайте 510 г холодного молока с 30 г муки. Прогревайте в духовке при 190 °C, перемешивая примерно каждые 5 минут, пока соус не загустеет. В Pragma положите немного томатной начинки, затем чередуйте листы, начинку и молочный соус. Всего 270 г листов. Для готовки без плиты используйте листы, которые по инструкции можно запекать сухими. Полностью покройте верх соусом и посыпьте 90 г моцареллы.'],
 ['Запечь лазанью · Pragma №1','Пеките при 190 °C до мягкости листов. Начните проверять через 35 минут: нож должен легко проходить через листы в центре. Если они жёсткие, проверяйте снова через 5–10 минут. Без щупа нельзя подтвердить 74 °C в центре.'],
 ['Бефстроганов и соус · Pragma №3 и №2','Поставьте мясо одновременно с начинкой для лазаньи, если формы помещаются с зазорами. В №3 положите 840 г говядины полосками, 18 г масла, соль, перец и 200 мл горячей воды. При 190 °C первую проверку сделайте через 20 минут: перемешайте и при подсыхании долейте немного горячей воды. Повторяйте каждые 15–20 минут. Ориентир 50–75 минут, иногда дольше. С 50-й минуты проверяйте вилкой: полоска должна легко разделяться. Мягкость показывает текстуру, безопасную температуру без щупа не подтвердить. Для соуса в Pragma №2 разложите 150 г лука и 300 г шампиньонов. При 190 °C проверьте через 15 минут, перемешайте и проверяйте каждые 5–10 минут, пока лук не размягчится и лишняя вода не выпарится. Влейте 270 г сливок 20%, проверьте через 5–10 минут: соус должен слегка покрывать ложку. Смешайте с готовыми полосками и подайте с гречкой.'],
 ['Разложить по контейнерам','Разделите каждое блюдо на шесть порций. Гречку, мясо и соус распределите поровну. Уберите в холодильник в неглубоких контейнерах в течение двух часов.']
];
const isNov19=s=>s.plan==='nov19';
function applyNov19(v){
 if(v.nov19Revision)return;
 const session=v.sessions.find(s=>s.date===NOV19_DATE)||v.sessions.find(s=>s.index===6&&s.date==='2026-11-17'&&!s.done);
 if(session){session.date=NOV19_DATE;session.plan='nov19';session.done=false;v.checks={...v.checks,[session.id]:{}};}
 v.nov19Revision=1;
}
function nov19Batch(date){
 const session=state.sessions.find(isNov19);
 return session&&diff(date,session.date)>=0&&diff(date,session.date)<3?session:null;
}
function batchForMeal(meal,date){
 const special=nov19Batch(date);
 if(special&&sessionMeals(special).includes(meal.name))return special;
 const week=Math.floor(diff(date,state.start)/7);
 return state.sessions.find(s=>!isNov19(s)&&Math.floor(s.index/2)===week&&sessionMeals(s).includes(meal.name));
}
function migrate(v){
 if(!v||!Array.isArray(v.sessions)||![8,makeSessions(v.start).length].includes(v.sessions.length))throw Error();
 let expanded={...v,sessions:makeSessions(v.start).map((s,i)=>v.sessions[i]||(v.scheduleRevision===2?s:{...s,date:add(s.date,1)}))};
 if(v.scheduleRevision!==2){
  const delta=diff('2026-10-28',v.start);
  expanded.start='2026-10-28';
  expanded.sessions=expanded.sessions.map(s=>({...s,date:s.done?s.date:add(s.date,delta-1)}));
  const shiftedShopping={};for(const [key,value] of Object.entries(v.shopping||{}))shiftedShopping[weekKey(add(key,delta))]=value;
  expanded.shopping=shiftedShopping;expanded.scheduleRevision=2;
 }
 if(!expanded.ovenRevision){expanded.beforeOven={done:expanded.sessions[0].done,checks:expanded.checks?.s0};expanded.sessions[0]={...expanded.sessions[0],done:false};expanded.checks={...expanded.checks,s0:{}};expanded.ovenRevision=1;}
 if(!expanded.nextOvenRevision){expanded.beforeNextOven={done:expanded.sessions[1].done,checks:expanded.checks?.s1};if(!expanded.sessions[1].done)expanded.checks={...expanded.checks,s1:{}};expanded.nextOvenRevision=1;}
 applyNov19(expanded);
 return expanded;
}
let defaults={start:'2026-10-28',sessions:makeSessions('2026-10-28'),checks:{},shopping:{},stock:{},scheduleRevision:2,ovenRevision:1,nextOvenRevision:1};
let state;try{state=migrate(JSON.parse(localStorage.getItem(KEY)))}catch{state=structuredClone(defaults)}
applyNov19(state);
let view='today',selected=today(),month=selected.slice(0,7),sessionId=null,storageError=false;
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch{storageError=true} }
save();
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function preparedBreakfastDay(date){return date>='2026-11-01'&&date<='2026-11-03'}
function menuAt(date){
 const nov=novemberDay(date);if(nov>=0)return NOVEMBER_PLAN.week[nov];
 let n=diff(date,state.start),meals=n>=0&&n<3?OVEN_MENU[n]:n>=0&&n<PLAN_DAYS?MENU[Math.floor(n/7)%4][n%7]:null;
 if(n===6)meals=[meals[0],MENU[0][3][1],meals[2],MENU[0][3][3]];
 const special=nov19Batch(date);
 if(meals&&special){
  const swap=diff(date,special.date)%2===1;
  return meals.map((m,i)=>{
   if(i===0)return {...m,name:'Сырники + готовые стрипсы; йогурт'};
   if(i===2)return swap?{...m,name:NOV19_SNACK}:m;
   return {...m,name:(i===1)!==swap?NOV19_LASAGNA:NOV19_BEEF};
  });
 }
 return meals&&preparedBreakfastDay(date)?[{...MENU[0][3][0]},...meals.slice(1)]:meals;
}
function sessionMeals(s){if(isNov19(s))return [NOV19_LASAGNA,NOV19_BEEF];if(novemberSession(s))return novemberMeals(s);if(s.index===0)return [OVEN_MENU[0][1].name,OVEN_MENU[0][3].name];let w=Math.floor(s.index/2)%4,offset=s.index%2?3:0;return [MENU[w][offset][1].name,MENU[w][offset][3].name]}
function sessionsAt(date){return state.sessions.filter(s=>s.date===date)}
function shoppingDay(date){const target=add(date,2);return !!menuAt(target)&&diff(target,state.start)%7===0}
function weekKey(date){let d=parse(date).getDay();return add(date,-((d+6)%7))}
function completedShopping(date){return state.shopping[weekKey(date)]}
function nextSession(){return state.sessions.filter(s=>!s.done).sort((a,b)=>a.date.localeCompare(b.date))[0]}
function navigate(v){view=v;render();window.scrollTo(0,0)}
function badge(s){return `<span class="pill ${s.done?'green':'red'}">${s.done?'Приготовлено':'Готовим'+(s.date===today()?' сегодня':'')}</span>`}
function openSession(id){sessionId=id;navigate('cook')}
function toolbar(){return `<header><div class="brand"><span class="brand-mark" aria-hidden="true">✳</span><div>На кухне<small>ВКУСНО. ПРОСТО. ВМЕСТЕ.</small></div></div><nav>${[['today','Сегодня'],['calendar','Календарь'],['shopping','Закупки'],['nutrition','КБЖУ'],['guide','Инструкция']].map(([v,t])=>`<button class="${view===v?'active':''}" onclick="${v==='today'?"selected=today();":''}navigate('${v}')">${t}</button>`).join('')}</nav></header>`}
function banner(){let s=nextSession();if(!s)return '';let days=diff(s.date,today());let color=days<=0?'red':days<=3?'yellow':'';return `<div class="banner ${color}"><div><strong>${days<0?'Готовка просрочена':days===0?'Сегодня готовим':days<=3?'Готовка через '+days+' дн.':'Следующая готовка'} · ${fmt(s.date)}</strong><div>${esc(sessionMeals(s).join(' и '))}</div></div><button onclick="openSession('${s.id}')">Открыть →</button></div>`}
function mealStatus(meal,date){
  const day=diff(date,state.start),week=Math.floor(day/7);
  const batch=batchForMeal(meal,date);
  if(!batch)return '<span class="pill">Собрать / разогреть по меню</span>';
  if(batch.done&&batch.date<=date)return '<span class="pill green">Готовка отмечена · разогреть порцию</span>';
  return `<span class="pill">${batch.date>date?'Готовка позже меню — нужна замена':'Готовность пока не отмечена'}</span>`;
}
function dayPage(){let meals=menuAt(selected),ss=sessionsAt(selected);return `<div class="row day-heading"><div><div class="eyebrow">${selected===today()?'Сегодня':fmt(selected,{weekday:'long'})} · на двоих</div><h1>${fmt(selected)}</h1>${menuAt(selected)?`<p class="muted">Неделя ${Math.floor(diff(selected,state.start)/7)%4+1} из 4 · цикл ${Math.floor(diff(selected,state.start)/28)+1}</p>`:""}</div><div class="date-control"><span class="date-caption">Ваш день в меню</span><input class="dateinput" type="date" value="${selected}" aria-label="Показать меню на дату" onchange="selected=this.value||today();render()"></div></div>${ss.some(s=>!s.done)?'<div class="notice red"><strong>День готовки.</strong> Задача приготовления показана отдельно справа или ниже меню. Само меню — план питания, а не подтверждение наличия готовой еды.</div>':''}${shoppingDay(selected)&&!completedShopping(selected)?'<div class="notice yellow"><strong>Пора заказать продукты на следующий семидневный блок.</strong> Сначала проверьте остатки. <button onclick="navigate(\'shopping\')">К списку</button></div>':''}<div class="layout day-layout"><section>${meals?nutritionDay(selected):""}<h2>Что едим за весь день</h2>${novemberDay(selected)>=0?novemberInfo():''}${meals&&preparedBreakfastDay(selected)?'<div class="notice yellow"><strong>Завтраки 1–3 ноября обновлены.</strong> Курица и яйца из одной заготовки на двоих на три дня. Утром только разогреть и добавить хлеб, творожный сыр и овощи. <button onclick="openMeal(0)">Как собрать завтрак →</button></div>':''}${diff(selected,state.start)===3?'<div class="notice yellow"><strong>Суббота — тоже без плиты.</strong> Минтай и котлеты запекаем в пятницу, рис и гречку готовим в мультиварке. Яйцо на завтрак — в духовке. <button onclick="openSession(\'s1\')">Готовка к субботе →</button></div>':''}${diff(selected,state.start)>=-1&&diff(selected,state.start)<3?`<div class="notice yellow"><strong>Первые три дня — без плиты.</strong> Два основных блюда и основа завтрака запекаются в духовке. <button class="primary" onclick="openSession('s0')">Начать готовку без плиты →</button></div>`:""}<p class="muted">Все 4 приёма пищи: завтрак, обед, полдник и ужин. Гарниры и соусы входят в названия блюд.</p>${meals?`<div class="menu daily-menu">${meals.map(m=>`<div class="meal">${mealImage(m.name)}<span class="eyebrow">${m.label}</span><strong>${esc(displayMealName(m.name))}</strong><span class="muted">Порции одинаковые для обоих взрослых</span>${nutritionMeal(m.name)}${servingGuide(m.name)}${mealStatus(m,selected)}<button onclick="openMeal(${meals.indexOf(m)})">Как приготовить / подать</button></div>`).join('')}</div>`:'<div class="panel">Меню начинается с указанной ниже даты. Первая готовка — накануне, чтобы на следующий день уже были готовые блюда. План охватывает 365 дней с '+fmt(state.start)+'. <button onclick="selected=state.start;render()">К началу плана</button></div>'}<p class="muted">Расчёт около 1800 ккал на каждого включает все 4 приёма пищи, масло и соусы. Это оценка по выбранным продуктам; этикетки ваших упаковок могут отличаться. Вода и несладкий чай — без добавок.</p></section><aside><h2>${ss.length?'Готовим в этот день':'График готовки'}</h2>${(ss.length?ss:[nextSession()].filter(Boolean)).map(s=>`<div class="panel ${!s.done&&s.date===selected?'red':''}">${badge(s)}<h3>${esc(sessionMeals(s).join(' + '))}</h3><p>${fmt(s.date)} · едим с ${fmt(add(state.start,Math.floor(s.index/2)*7+s.index%2*3))} по ${fmt(add(state.start,Math.floor(s.index/2)*7+s.index%2*3+2))}</p><div class="stack"><button class="primary" onclick="openSession('${s.id}')">Пошаговая готовка →</button><button onclick="moveDialog('${s.id}')">Перенести</button>${!s.done?`<button onclick="confirmPrepared('${s.id}')">Уже приготовлено</button>`:''}</div></div>`).join('')}<div class="panel"><span class="eyebrow">Меньше хлопот</span><p>Овощи нарезаем одной партией. Духовку разогреваем один раз. Соусы и гарниры готовим, пока запекается основное.</p></div></aside></div>`}
function openMeal(index){
 const meal=menuAt(selected)[index],week=Math.floor(diff(selected,state.start)/7);
 const batch=batchForMeal(meal,selected);
 if(batch){openSession(batch.id);return;}
 if(novemberOpenMeal(meal,selected))return;
 if(diff(selected,state.start)<3&&meal.label==='Завтрак'){openSession('s0');return;}
 if(preparedBreakfastDay(selected)&&meal.label==='Завтрак'){showPreparedBreakfast(meal);return;}
 if(diff(selected,state.start)===3&&meal.label==='Завтрак'){showSaturdayBreakfast(meal);return;}
 const n=meal.name.toLowerCase();let steps=[];
 if(n.includes('овсянка'))steps=['Отмерьте хлопья и молоко из таблицы. Нагрейте молоко, всыпьте хлопья и варите по упаковке, помешивая. Воду можно добавить без изменения КБЖУ.','Готовое мясо подайте отдельно или разогрейте по упаковке. Вымойте и нарежьте фрукт. Сахар и дополнительное масло в расчёт не включены.'];
 else if(n.includes('пельмени'))steps=['Взвесьте пельмени замороженными. Сварите по инструкции упаковки. Взвесьте всю готовую порцию на двоих и разделите поровну.','Нарежьте овощи, смешайте йогурт с укропом. Подавайте без дополнительного масла и сметаны.'];
 else if(n.includes('фахитас'))steps=['Нарежьте лук и перец. Обжарьте на отмеренном масле 7–10 минут, добавьте готовую курицу, специи и немного воды. Прогрейте по упаковке курицы.','Прогрейте отмеренные тортильи на сухой сковороде по 30 секунд, наполните смесью, подайте с йогуртом.'];
 else if(n.includes('рис и овощи'))steps=['Отмерьте рис сухим и сварите по упаковке. Овощи готовьте на отмеренном масле с небольшим количеством воды под крышкой 8–12 минут.','Стрипсы взвесьте до разогрева и разогрейте по упаковке. Расчёт относится к готовым стрипсам, не к сырому филе. Разделите каждый компонент на две равные части.'];
 else if(meal.label==='Полдник')steps=['Взвесьте каждый продукт по столбцу «Каждому». Фрукты взвешиваются без кожуры, если она несъедобна, и без сердцевины.','Булочку можно прогреть без масла. Йогурт, творог и напитки — без дополнительных подсластителей.'];
 else if(n.includes('запеканка')||n.includes('сырники'))steps=['Взвесьте продукт из упаковки до разогрева. Разогрейте по инструкции производителя без дополнительного масла; если продукт требует жарки с маслом, его нужно отдельно учесть.','Мясную добавку приготовьте/разогрейте отдельно согласно её упаковке. Готовые продукты и сырые котлеты требуют разных режимов; котлеты из птицы — до 74 °C внутри.','Подайте ягоды, фрукты, овощи или йогурт в количествах из таблицы. Марка запеканки не выбрана, поэтому значения оценочные.'];
 else steps=['Отмерьте продукты по таблице. Если есть яйцо — сварите по одному на человека (около 50 г без скорлупы), 9–10 минут после закипания.','Готовое мясо разогрейте по упаковке. Если используются сырые котлеты индейки, приготовьте до 74 °C внутри; их масса в таблице относится к продукту до приготовления.','Хлеб подсушите без масла; лаваш наполните и прогрейте на сухой сковороде 2–3 минуты. Добавьте указанные сыр, овощи, фрукты и йогурт.'];
 document.querySelector('#modal')?.remove();document.body.insertAdjacentHTML('beforeend',`<dialog id="modal"><h2>${esc(displayMealName(meal.name))}</h2>${portionDetails(meal.name)}${servingGuide(meal.name)}<ol>${steps.map(s=>`<li style="margin-bottom:16px">${esc(s)}</li>`).join('')}</ol><button onclick="document.querySelector('#modal').close()">Закрыть</button></dialog>`);document.querySelector('#modal').showModal();
}
function calendarPage(){let first=month+'-01',offset=(parse(first).getDay()+6)%7,count=new Date(parse(first).getFullYear(),parse(first).getMonth()+1,0).getDate();return `<div class="row"><div><div class="eyebrow">Весь план перед глазами</div><h1>${fmt(first,{month:'long',year:'numeric'})}</h1></div><div class="stack"><button aria-label="Предыдущий месяц" onclick="changeMonth(-1)">←</button><button onclick="month=today().slice(0,7);render()">Этот месяц</button><button aria-label="Следующий месяц" onclick="changeMonth(1)">→</button></div></div><div class="stack"><span class="pill red">Готовка</span><span class="pill yellow">Закупки за 2 дня до недели</span><span class="pill green">Выполнено</span></div><div class="calendar">${['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(x=>`<div class="weekday">${x}</div>`).join('')}${'<div></div>'.repeat(offset)}${Array.from({length:count},(_,i)=>{let d=add(first,i),ss=sessionsAt(d);return `<button class="day ${d===selected?'selected':''} ${d===today()?'today':''}" onclick="selected='${d}';navigate('today')" aria-label="${fmt(d)}${ss.length?', готовка':''}${shoppingDay(d)?', закупки':''}"><strong>${i+1}</strong>${ss.map(badge).join('')}${shoppingDay(d)?`<span class="pill ${completedShopping(d)?'green':'yellow'}">${completedShopping(d)?'Заказано':'Закупки'}</span>`:''}${!menuAt(d)?'<span class="muted" style="font-size:11px">Вне плана</span>':''}</button>`}).join('')}</div><p class="muted">Нажмите на день, чтобы открыть меню и рецепты. Подчёркнутое число — сегодня.</p>`}
function changeMonth(n){let d=parse(month+'-01');d.setMonth(d.getMonth()+n);month=iso(d).slice(0,7);render()}
const firstIngredients=['Куриное филе — 1,2 кг','Картофельные дольки — 1 кг','Говяжий фарш — 1,2 кг','Томаты Mutti — 800 г','Лук — 200 г','Пенне — 500 г сухих','Оливковое масло — до 30 г на все блюда','Паприка, сухой чеснок, соль — по вкусу'];
const secondIngredients=['Минтай — 1,3 кг','Котлеты индейки — 1,35 кг','Томаты Mutti — 800 г','Рис — 360 г сухого','Гречка — 360 г сухой','Кабачок — 1 кг','Лук — 200 г','Масло — до 20 г на все блюда; специи'];
function stepsFor(s){if(isNov19(s))return NOV19_STEPS;if(novemberSession(s))return NOVEMBER_STEPS[s.index];if(s.index===0)return OVEN_STEPS;if(s.index===1)return NEXT_OVEN_STEPS;if(s.index%8===0)return [
['Подготовить всё сразу · 0–5 мин','Разогрейте духовку до 190 °C с конвекцией. Достаньте форму, противень, глубокую сковороду и кастрюлю. Вскипятите воду для пасты. Отмерьте ингредиенты из списка на две партии по 6 порций.'],
['Общая нарезка · 5–12 мин','Отделите 30 г масла для курицы с картофелем и 30 г для болоньезе. Сначала нарежьте весь лук. Разложите картофель на противне одним слоем, добавьте часть масла и паприку. Затем на отдельной доске обработайте курицу, смешайте со специями и оставшейся частью масла, отложенного для курицы с картофелем. Вымойте руки, нож и доску.'],
['Запустить духовку и соус · 12–20 мин','Поставьте курицу в форме ниже картофеля, оставьте между уровнями место для воздуха. На отложенном для болоньезе масле размягчите лук и обжарьте фарш, разбивая комочки. Не оставляйте сковороду без внимания.'],
['Гарнир, пока всё готовится · 20–30 мин','Добавьте к фаршу томаты и чеснок, тушите до готовности. Пасту сварите по времени на упаковке, слейте воду. Проверьте картофель; если это полуфабрикат, его инструкция имеет приоритет.'],
['Проверка готовности · ещё 10–25 мин ожидания','Проверьте курицу термометром: в самой толстой части не менее 74 °C; говяжий фарш — 71 °C. Картофель должен стать мягким. Готовые компоненты доставайте отдельно, не ждите одинакового времени для всех.'],
['Разложить и охладить','Курицу с картофелем и болоньезе с пастой разделите каждое блюдо на 6 порций. Используйте неглубокие контейнеры, уберите в холодильник в течение 2 часов. Порции для третьего дня после быстрого охлаждения заморозьте, подпишите блюдо и дату.']];
if(s.index%8===1)return [
['Подготовить продукты и посуду','Разморозьте рыбу заранее в холодильнике. Включите духовку на температуру, разрешённую инструкцией котлет; для рыбы подходит 180–190 °C. Если режимы несовместимы, котлеты готовьте на сковороде по упаковке. Подготовьте две кастрюли.'],
['Одна нарезка для всех блюд','Нарежьте лук и кабачок сразу на всю партию. Смешайте томаты с луком и специями. Рыбу положите в глубокую форму и залейте соусом. После сырой рыбы вымойте руки и инструменты.'],
['Запустить основные блюда параллельно','Котлеты разложите отдельно от рыбы. Готовьте по упаковке, проверяя готовность внутри. Рыбу поставьте в духовку; ориентировочно 20–30 минут после размораживания, но решает температура внутри. Кабачок можно запечь рядом, если остаётся место.'],
['Сварить оба гарнира','Пока работают духовка и сковорода, сварите рис и гречку в разных кастрюлях по инструкции упаковок. Поставьте отдельные таймеры, чтобы не переварить.'],
['Проверить готовность','Рыба — 63 °C внутри, котлеты из индейки — 74 °C. Доставайте каждое блюдо, когда оно готово. Нельзя ориентироваться только на цвет корочки.'],
['Разделить на порции','Каждое основное блюдо с гарниром разделите на 6 порций. Быстро охладите в неглубоких контейнерах. Рис уберите в холод особенно быстро, желательно в течение часа. Порции на третий день заморозьте после охлаждения.']];
return RECIPES[s.index%8-2].steps;}
function ingredientsFor(s){return ingredientLines(sessionMeals(s),6);}

function nov19Diagrams(){
 const lanes=[
  ['Лазанья · Pragma №1',NOV19_STEPS.slice(1,4)],
  ['Говядина · Pragma №2 и №3',[
   ['Мультиварка','Поставьте 300 г сухой гречки параллельно.'],
   NOV19_STEPS[4],
   ['Подача','Говядина полосками из формы №3 + грибной соус из формы №2. Гречку положите рядом.']
  ]]
 ];
 return `<section aria-label="Схемы готовки"><h2>Что и куда кладём</h2><p>Шаг 0. Разогрейте духовку до 190 °C, подготовьте Pragma и отмерьте продукты. Если три формы не помещаются с зазорами, запекайте в две загрузки. Фольгу не используйте.</p><div class="nov19-diagrams">${lanes.map(([title,steps])=>`<article class="panel"><h3>${title}</h3><ol>${steps.map(([label,detail])=>`<li><strong>${label}</strong><p>${detail}</p></li>`).join('')}</ol></article>`).join('')}</div></section>`;
}
function cookPage(){let s=state.sessions.find(x=>x.id===sessionId);if(!s)return '';if(novemberSession(s))return novemberCookPage(s);if(s.index===0)return ovenCookPage(s);if(s.index===1)return nextOvenCookPage(s);let steps=stepsFor(s),checks=state.checks[s.id]||{},all=steps.every((_,i)=>checks[i]);return `<button class="back" onclick="navigate('today')">← К меню</button><div class="eyebrow">Готовим вместе · ${fmt(s.date)}</div><h1>Одна сессия — два блюда</h1><p style="font-size:22px">${esc(sessionMeals(s).join(' + '))}</p><div class="stack">${badge(s)}<span class="pill">${isNov19(s)?'≈45–60 мин активно + ожидание':s.index%8<2?'≈30–40 мин активно + ожидание':RECIPES[s.index%8-2].time}</span><button onclick="moveDialog('${s.id}')">Перенести дату</button></div><div class="notice yellow">Обновлённые количества рассчитаны на две партии по 6 порций, примерно по 550 ккал в порции. Отмеряйте по таблицам ниже: они уже учитывают масло и соусы. Старые, уже приготовленные партии могли иметь другой состав — эти КБЖУ к ним автоматически не относятся.</div>${isNov19(s)?nov19Diagrams():''}<div class="recipe-portions">${sessionMeals(s).map(n=>`<details class="panel"><summary>Порции и состав: ${esc(n)}</summary>${portionDetails(n,true)}</details>`).join("")}</div><div class="layout"><section>${steps.map(([title,text],i)=>`<label class="step ${checks[i]?'done':''}"><input type="checkbox" ${checks[i]?'checked':''} onchange="checkStep('${s.id}',${i},this.checked)" aria-label="Шаг ${i+1}: ${esc(title)}"><div><span class="eyebrow">Шаг ${i+1} / ${steps.length}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></div></label>`).join('')}<button class="primary" style="margin-top:24px" ${all?'':'disabled'} onclick="finishSession('${s.id}')">${s.done?'Готовка отмечена':'Всё готово — отметить сессию'}</button></section><aside><div class="panel"><h2>${isNov19(s)?'Что проверить и докупить':'На всю партию'}</h2>${isNov19(s)?'<p>В первую очередь проверьте говядину полосками, фарш, листы лазаньи, шампиньоны, сливки и сыр. Из списка вычтите пригодные остатки.</p>':''}${ingredientsFor(s).map(i=>`<div class="ingredient">${esc(i)}</div>`).join('')}<p class="muted">По 6 порций каждого блюда на двоих на 3 дня. Завтраки, полдники и воскресенье готовятся отдельно; в эту партию не входят.</p></div><div class="panel"><h3>Отдельные таймеры</h3><p class="muted">Используйте отдельные таймеры iPad для каждой формы и гарнира: браузер может уснуть в фоне.</p><p>Готовые блюда и сырые продукты держите отдельно. Отсчитывайте время отдельно с момента, когда поставили каждую форму в разогретую духовку.</p></div></aside></div>`}
function checkStep(id,i,value){state.checks[id]??={};state.checks[id][i]=value;if(!value)state.sessions.find(s=>s.id===id).done=false;save();render()}
function confirmPrepared(id){if(confirm('Отметить все блюда этой партии как уже приготовленные?'))finishSession(id)}
function finishSession(id){state.sessions.find(s=>s.id===id).done=true;save();render();toast('Готовка отмечена')}
function moveDialog(id){let s=state.sessions.find(x=>x.id===id);document.querySelector('#modal')?.remove();document.body.insertAdjacentHTML('beforeend',`<dialog id="modal"><h2>Перенести готовку</h2><p>${esc(sessionMeals(s).join(' + '))}</p><input id="newdate" class="dateinput" type="date" value="${s.date}" aria-label="Новая дата готовки"><label class="checkline"><input type="radio" name="scope" value="one" checked>Только эту готовку. Меню и остальные даты не меняются.</label><label class="checkline"><input type="radio" name="scope" value="future">Эту и последующие готовки на столько же дней. Меню и закупки не меняются.</label><p class="muted">Перенос не продлевает срок хранения. Проверьте, чем заменить блюда до готовки. Чтобы сдвинуть весь календарь вместе с меню, измените начало плана в инструкции.</p><div id="moveError" role="alert"></div><div class="stack"><button class="primary" onclick="applyMove('${id}')">Сохранить</button><button onclick="document.querySelector('#modal').close()">Отмена</button></div></dialog>`);document.querySelector('#modal').showModal()}
function moveSessions(sessions,id,newDate,scope){let current=sessions.find(s=>s.id===id),delta=diff(newDate,current.date);return sessions.map(s=>({...s,date:s.id===id||(scope==='future'&&s.index>=current.index&&!s.done)?add(s.date,delta):s.date}))}
function applyMove(id){let date=document.querySelector('#newdate').value;if(!date)return;let scope=document.querySelector('input[name=scope]:checked').value;let next=moveSessions(state.sessions,id,date,scope);let dates=next.map(s=>s.date);if(new Set(dates).size!==dates.length){document.querySelector('#moveError').textContent='На эту дату уже назначена другая готовка. Выберите другой день.';return}state.sessions=next;save();document.querySelector('#modal').close();render();toast('Дата готовки изменена')}
function shoppingPage(){
 const week=weekKey(selected),target=shoppingDay(selected)?add(selected,2):diff(selected,state.start)<0?state.start:selected,wi=Math.floor(diff(target,state.start)/7),names=[];
 const batches=state.sessions.filter(s=>Math.floor(s.index/2)===wi);
 const quantities={};
 function addMeal(name,mult){for(const x of NUTRITION.meals[name].items)quantities[x.food]=(quantities[x.food]||0)+x.grams*mult;}
 for(let i=0;i<7;i++){const day=menuAt(add(state.start,wi*7+i));if(day)day.forEach(m=>addMeal(m.name,2));}
 return `<div class="eyebrow">С учётом новых порций</div><h1>Закупки на двоих</h1><div class="notice yellow">В день закупки здесь следующий семидневный блок, в остальные дни — выбранный. Список включает завтраки, полдники, воскресенье и полные партии готовки. Вычтите фактические остатки и округлите покупки до упаковок.</div>${wi===1?novemberInfo()+novemberStockPanel():''}<h2>Неделя с ${fmt(add(state.start,wi*7))} · цикл меню ${wi%4+1}</h2><button onclick="state.shopping['${week}']=!state.shopping['${week}'];save();render()">${state.shopping[week]?'Заказ отмечен ✓':'Отметить: продукты заказаны'}</button><p>Это потребность по обновлённым рецептам, а не подтверждение наличия продуктов или оформленный заказ.</p><div class="panel">${Object.entries(quantities).map(([k,g])=>`<div class="ingredient">${esc(NUTRITION.foods[k].name)} — <strong>${number(g)} г</strong><small class="muted"> · ${esc(NUTRITION.foods[k].basis)}</small></div>`).join('')||'На эту дату меню нет.'}</div>${wi===0?servingWeekPanel()+ovenLeftovers():''}<details class="panel"><summary>История заказа METRO · проверить остатки</summary><p class="muted">Заказ от 26 октября — не текущие остатки. Галочка означает только «что-то осталось», количество вычтите самостоятельно.</p>${PURCHASES.map((p,i)=>`<label class="checkline"><input type="checkbox" ${state.stock[i]?'checked':''} onchange="state.stock[${i}]=this.checked;save()"><span>${esc(p.name)}<small class="muted" style="display:block">Было заказано: ${esc(p.quantity)}</small></span></label>`).join('')}</details>`;
}
function guidePage(){return `<div class="eyebrow">Как пользоваться</div><h1>Спокойная кухня</h1><div class="layout"><section><h2>Ваш порядок действий</h2><ol class="muted"><li>Откройте «Сегодня»: меню рассчитано на двух взрослых.</li><li>Красным выделяется только задача готовки, а не блюда в меню. Готовность еды подтверждается вашей отметкой. Нажмите «Пошаговая готовка» для общего маршрута двух блюд.</li><li>За три дня до готовки появляется жёлтая подсказка. Просроченная готовка остаётся красной до выполнения или переноса.</li><li>В рецепте сначала общая подготовка и нарезка, потом запуск духовки, затем работа со сковородой и гарнирами. Шаги сохраняются после закрытия приложения.</li><li>За два дня до начала каждой недели меню откройте закупки и проверьте остатки. Теперь недели начинаются по средам, закупки — по понедельникам, готовка — по вторникам и пятницам.</li></ol><h2>Сдвиг всего плана</h2><p>Меняет даты меню и всех сессий на одинаковое число дней. Закупки тоже сдвигаются: они всегда за два дня до начала недели меню.</p><label>Первый день плана <input class="dateinput" type="date" value="${state.start}" onchange="shiftPlan(this.value)"></label><h2>На iPad</h2><p class="muted">Откройте опубликованную ссылку в Safari. Через меню «Поделиться» можно добавить её на экран «Домой», если этот пункт доступен. Авторизация и интернет могут понадобиться. Переносы и отметки хранятся в этом браузере, между устройствами не синхронизируются.</p><button onclick="exportState()">Скачать резервную копию отметок</button><label class="checkline">Восстановить копию <input type="file" accept="application/json" onchange="importState(this.files[0])"></label></section><aside><div class="panel"><h2>Что уже учтено</h2><p>Два взрослых, 4 приёма пищи, мясная составляющая завтрака, разнообразные соусы. Без брокколи, булгура, креветок, рыбных котлет и омлета с грибами.</p><p>Меню взято из сохранённых четырёх календарей. Минтай и котлеты индейки подставлены по заказу METRO. Блюдо с фасолью заменено на индейку с овощами.</p></div><div class="panel"><h2>Что нужно уточнить</h2><p>Этикетки полуфабрикатов, фактическую доставку и остатки. КБЖУ уже рассчитаны, но остаются оценочными там, где нет точного продукта. Хлеб оставлен как в календаре и заказе; его допустимость ещё требует уточнения.</p><p>Для всех четырёх недель есть домашние сессии с граммовками. Цикл повторяется 365 дней от начала плана; последняя неделя неполная. Тушение, уборка и ежедневная сборка завтраков требуют дополнительного времени.</p></div></aside></div>`}
function shiftPlan(date){if(!date)return;let delta=diff(date,state.start);state.start=date;state.sessions=state.sessions.map(s=>({...s,date:add(s.date,delta)}));selected=date;month=date.slice(0,7);save();render();toast('Меню и готовки сдвинуты вместе')}
function exportState(){let a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));a.download='kitchen-plan.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
async function importState(file){if(!file)return;try{let v=JSON.parse(await file.text());if(!/^\d{4}-\d{2}-\d{2}$/.test(v.start)||!Array.isArray(v.sessions)||![8,makeSessions(v.start).length].includes(v.sessions.length)||!v.sessions.every((s,i)=>s.id==='s'+i&&s.index===i&&/^\d{4}-\d{2}-\d{2}$/.test(s.date)&&!isNaN(parse(s.date)))||!v.checks||!v.stock||!v.shopping)throw Error();state=migrate(v);save();render();toast('Копия восстановлена')}catch{toast('Не удалось прочитать резервную копию')}}
function toast(text){let el=document.createElement('div');el.className='toast';el.setAttribute('role','status');el.textContent=text;document.body.append(el);setTimeout(()=>el.remove(),3000)}
function render(){document.querySelector('#app').innerHTML=`<main class="shell">${toolbar()}${storageError?'<div class="notice red">Браузер не разрешил сохранение. Скачайте резервную копию в инструкции.</div>':''}${view==='calendar'?calendarPage():view==='cook'?cookPage():view==='shopping'?shoppingPage():view==='guide'?guidePage():view==='nutrition'?nutritionPage():dayPage()}${view==='today'?banner():''}<footer>Личный план · 365 дней · цикл 4 недели · данные календарей от 25 октября 2026<br>Приложение не оформляет заказы и не отправляет фоновые уведомления.</footer></main>`}
render();let dayStamp=today();setInterval(()=>{if(today()!==dayStamp){dayStamp=today();if(view==='today')selected=today();render()}},30000);
