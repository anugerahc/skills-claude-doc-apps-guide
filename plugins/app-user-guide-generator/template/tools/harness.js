// REFERENCE GATE (jsdom) from a working project (i-Clause). ADJUST the CONFIG below to the target project: GUIDE_ROOT, the guide body/fragments/page-builder/step files, and the walk/step plan. Needs: npm i jsdom@24.1.3 jquery (jsdom 24 for Node 22.11).
const fs=require('fs'),{JSDOM}=require('jsdom');
const V=process.env.GUIDE_ROOT||'./';   // CONFIG: project root that holds the guide files
const strip=s=>s.replace(/@\*[\s\S]*?\*@/g,'').replace(/^@\{[^\n]*\}\s*$/mg,'').replace(/@@/g,'@').replace(/<partial[^>]*>/g,'');
const body=strip(fs.readFileSync(V+'Views/Tiger/IClause/_UserGuideBody.cshtml','utf8'));
const frags=strip(fs.readFileSync(V+'Views/Tiger/IClause/_UserGuideFrags.cshtml','utf8'));
const dom=new JSDOM('<!doctype html><body><div id="iclGuideModal">'+body+'</div>'+frags+'</body>',{runScripts:'outside-only'});
const w=dom.window; const $=require('jquery')(w); global.window=w;global.NodeFilter=w.NodeFilter;global.$=$;global.document=w.document;
$.expr.pseudos.visible=el=>!$(el).closest('[hidden]').length;
const R=[];
// replicate _useFrags with '+' support
$('#iclGuideMain [data-use]').each(function(){const $x=$('#iclGuideFrags [data-frag="'+this.dataset.use+'"]').first();if($x.length)$(this).empty().append($x.clone());else R.push('NOFRAG '+this.dataset.use);});
global.FormIClauseGuideTour={steps:{}};
new Function('FormIClauseGuidePages',fs.readFileSync(V+'wwwroot/js/Tiger/IClause/IClauseGuidePages.js','utf8')+';global.FormIClauseGuidePages=FormIClauseGuidePages;').call(null);
$('.icl-g-walk[data-walk="inline"] [data-use], .icl-g-walk[data-walk="fg"] [data-use]').each(function(){const sk=FormIClauseGuidePages.stageKeyOf($(this).closest('.icl-g-walk').attr('data-walk'));FormIClauseGuidePages.stageCards($(this),sk);FormIClauseGuidePages.sampleize($(this));});
const files=['setup','stages','review'];for(const f of files)new Function('FormIClauseGuideTour',fs.readFileSync(V+'wwwroot/js/Tiger/IClause/IClauseGuideTour.'+f+'.js','utf8'))(FormIClauseGuideTour);
let tot=0,bad=0,hid=0;const summary=[];
for(const walk of Object.keys(FormIClauseGuideTour.steps)){
 const $w=$('.icl-g-walk[data-walk="'+walk+'"]');
 for(const idx of Object.keys(FormIClauseGuideTour.steps[walk])){
  const $s=$w.find('.icl-g-wstep').eq(+idx).clone(); $s.find('.icl-g-try').remove();
  const ok=FormIClauseGuidePages.build($s,walk,+idx);
  const parts=$s.find('.icl-g-page').children('.icl-g-pg, .icl-g-ws').map(function(){const c=$(this);return (c.hasClass('icl-g-core')?'*':'')+(c.find('[data-frag],nav.icl-stepper,.card').first().attr('data-frag')||c.children().first().attr('class')||'?').toString().split(' ')[0];}).get();
  summary.push(`${walk}[${idx}] ${ok?'':'(no page) '}${parts.join(' > ')}`);
  FormIClauseGuideTour.steps[walk][idx].forEach((st,k)=>{tot++;
   let $m=$s.find('.icl-g-core').find(st.sel); if(!$m.length)$m=$s.find(st.sel);
   if(!$m.length){bad++;R.push(`${walk}[${idx}].${k} NOTFOUND ${st.sel} (${st.en.title})`);}
   else if($m.first().closest('.icl-g-res').length)hid++;});
 }}
console.log('substeps',tot,'notfound',bad,'in-result',hid);console.log(R.join('\n'));console.log(summary.join('\n'));
