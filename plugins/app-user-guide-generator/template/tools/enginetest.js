// Self-test of guide-tour.template.js in jsdom: global step numbering across screens, core-first lookup, act steps skipped by verifyOrder, no role button.
// Run: npm i jsdom@24.1.3 (Node 22.11) then `node template/tools/enginetest.js`
const fs=require('fs'),{JSDOM}=require('jsdom');
const dom=new JSDOM(`<body><div id="bar"></div>
<section id="s1"><div class="ctx"><button class="b">Context button</button></div><div data-core><button class="b">Core button</button><button class="c">Other</button></div></section>
<section id="s2"><div data-core><button class="d">D1</button><button class="e">E1</button></div></section></body>`,{runScripts:'outside-only',pretendToBeVisual:true,url:'http://localhost/'});
const w=dom.window; w.Element.prototype.scrollIntoView=function(){}; w.localStorage.clear();
w.eval(fs.readFileSync(require('path').join(__dirname,'..','guide-tour.template.js'),'utf8'));
const mk=(sel,t)=>({selector:sel,en:{title:t,text:t+' text.'},id:{title:t,text:t+' teks.'}});
const screens=[
 {screenKey:'s1',chapter:'Chapter A',scope:'#s1',steps:[mk('.b','core-first'),mk('.c','second'),Object.assign(mk('.b','act closer'),{act:true})]},
 {screenKey:'s2',chapter:'Chapter B',scope:'#s2',steps:[mk('.d','third'),mk('.e','fourth')]}];
const seen=[]; const tip=()=>w.document.querySelector('.gt-tip');
const target=()=>{const t=w.document.querySelector('.gw-target');return t?t.textContent:null;};
function snap(){return {prog:tip().querySelector('.gt-tip__progress').textContent,target:target()};}
w.GuideTour.runSequence(screens,{tourId:'t',lang:'en',container:'#bar',onScreenChange:(i,s)=>seen.push(i+':'+s.screenKey)});
const log=[]; const click=()=>tip().querySelector('[data-act="next"]').click();
log.push(snap()); click(); log.push(snap()); click(); log.push(snap()); click();   // end of s1 -> bar
const bar=w.document.querySelector('#bar [data-act="next"]'); log.push({barShown:!!bar});
bar.click(); log.push(snap()); click(); log.push(snap()); click();               // end of s2 -> complete card
log.push({complete:/Tour complete/.test(w.document.querySelector('#bar').textContent), roleBtn:!!w.document.querySelector('#bar [data-act="role"]'), screensSeen:seen});
console.log(JSON.stringify(log,null,1));
const rep=w.GuideTour.verifySelectors(screens), ord=w.GuideTour.verifyOrder(screens);
console.log('verifySelectors all found:',Object.values(rep).every(a=>a.every(x=>x.found)),'| verifyOrder act skipped:',JSON.stringify(ord.s1));
