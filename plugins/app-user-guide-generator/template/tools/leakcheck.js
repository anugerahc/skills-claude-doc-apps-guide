// REFERENCE GATE (jsdom) from a working project (i-Clause). ADJUST the CONFIG below to the target project: GUIDE_ROOT, the guide body/fragments/page-builder/step files, and the walk/step plan. Needs: npm i jsdom@24.1.3 jquery (jsdom 24 for Node 22.11).
// INLINE/FG screens must not show Process-only data (machine / batch / BO / line / dryer)
const fs=require('fs'),{JSDOM}=require('jsdom');const V=process.env.GUIDE_ROOT||'./';   // CONFIG: project root that holds the guide files
const strip=s=>s.replace(/@\*[\s\S]*?\*@/g,'').replace(/^@\{[^\n]*\}\s*$/mg,'').replace(/@@/g,'@').replace(/<partial[^>]*>/g,'');
const body=strip(fs.readFileSync(V+'Views/Tiger/IClause/_UserGuideBody.cshtml','utf8')),frags=strip(fs.readFileSync(V+'Views/Tiger/IClause/_UserGuideFrags.cshtml','utf8'));
const dom=new JSDOM('<!doctype html><body><div id="iclGuideModal">'+body+'</div>'+frags+'</body>',{runScripts:'outside-only'});const w=dom.window;const $=require('jquery')(w);global.window=w;global.NodeFilter=w.NodeFilter;global.$=$;global.document=w.document;
$('#iclGuideMain [data-use]').each(function(){const $x=$('#iclGuideFrags [data-frag="'+this.dataset.use+'"]').first();if($x.length)$(this).empty().append($x.clone());});
new Function('FormIClauseGuidePages',fs.readFileSync(V+'wwwroot/js/Tiger/IClause/IClauseGuidePages.js','utf8')+';global.FormIClauseGuidePages=FormIClauseGuidePages;').call(null);
$('.icl-g-walk[data-walk="inline"] [data-use], .icl-g-walk[data-walk="fg"] [data-use]').each(function(){const sk=FormIClauseGuidePages.stageKeyOf($(this).closest('.icl-g-walk').attr('data-walk'));FormIClauseGuidePages.stageCards($(this),sk);FormIClauseGuidePages.sampleize($(this));});
const BAD=/Dryer|Machine|\bBatch\b|\bBO\b|LINE A|Water Activity|Moisture|Bulk Density|Particle Size/;const out=[];
for(const walk of ['inline','fg']) for(let i=0;i<8;i++){const $s=$('.icl-g-walk[data-walk="'+walk+'"] .icl-g-wstep').eq(i).clone();$s.find('.icl-g-try').remove();FormIClauseGuidePages.build($s,walk,i);
  const $p=$s.find('.icl-g-page');const act=$p.find('.icl-stage-card.active').attr('data-stage');
  if(act && act!==walk.toUpperCase()) out.push(`${walk}[${i}] active stage card = ${act}`);
  const t=$p.text(); const m=t.match(BAD); if(m) out.push(`${walk}[${i}] page still shows "${m[0]}": …${t.slice(Math.max(0,m.index-50),m.index+40).replace(/s+/g," ")}…`); }
console.log('inline/fg leaks:',out.length);console.log(out.join('\n'));
