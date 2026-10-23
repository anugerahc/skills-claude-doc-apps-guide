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

// ---- ORDER CHECK: sub-steps must follow the page top->bottom, left->right (= DOM order of the matched element) ----
const only=process.argv[2]; let inv=0, total=0; const out=[];
for(const walk of Object.keys(FormIClauseGuideTour.steps)){
 if(only && only.split(',').indexOf(walk)===-1) continue;
 const $w=$('.icl-g-walk[data-walk="'+walk+'"]');
 for(const idx of Object.keys(FormIClauseGuideTour.steps[walk])){
  const $s=$w.find('.icl-g-wstep').eq(+idx).clone(); $s.find('.icl-g-try').remove(); FormIClauseGuidePages.build($s,walk,+idx);
  let prev=null, prevK=-1;
  FormIClauseGuideTour.steps[walk][idx].forEach((st,k)=>{ total++; if(st.act){ return; }  // act:true = closing 'now do this' step: may repeat an earlier control
   let $m=$s.find('.icl-g-core').find(st.sel); if(!$m.length)$m=$s.find(st.sel); const el=$m.first()[0]; if(!el){out.push(`${walk}[${idx}].${k} NOTFOUND ${st.sel}`);return;}
   if(prev){ const pos=prev.compareDocumentPosition(el); // el before prev?
     if(pos & 2 && !(pos & 8)){ inv++; out.push(`${walk}[${idx}].${k} "${st.en.title}" comes BEFORE .${prevK} "${FormIClauseGuideTour.steps[walk][idx][prevK].en.title}" in the page`); } }
   prev=el; prevK=k; }); }}
console.log('substeps',total,'order inversions',inv); console.log(out.join(String.fromCharCode(10)));
