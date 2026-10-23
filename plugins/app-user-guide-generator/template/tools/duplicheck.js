// REFERENCE GATE (jsdom) from a working project (i-Clause). ADJUST the CONFIG below to the target project: GUIDE_ROOT, the guide body/fragments/page-builder/step files, and the walk/step plan. Needs: npm i jsdom@24.1.3 jquery (jsdom 24 for Node 22.11).
// every page piece must appear once per screen: stepper, stage cards, doc header, stage toolbar buttons, panels
const fs=require('fs'),{JSDOM}=require('jsdom');
const V=process.env.GUIDE_ROOT||'./';   // CONFIG: project root that holds the guide files
const strip=s=>s.replace(/@\*[\s\S]*?\*@/g,'').replace(/^@\{[^\n]*\}\s*$/mg,'').replace(/@@/g,'@').replace(/<partial[^>]*>/g,'');
const body=strip(fs.readFileSync(V+'Views/Tiger/IClause/_UserGuideBody.cshtml','utf8')), frags=strip(fs.readFileSync(V+'Views/Tiger/IClause/_UserGuideFrags.cshtml','utf8'));
const dom=new JSDOM('<!doctype html><body><div id="iclGuideModal">'+body+'</div>'+frags+'</body>',{runScripts:'outside-only'});
const w=dom.window;const $=require('jquery')(w);global.window=w;global.NodeFilter=w.NodeFilter;global.$=$;global.document=w.document;
$('#iclGuideMain [data-use]').each(function(){const $x=$('#iclGuideFrags [data-frag="'+this.dataset.use+'"]').first();if($x.length)$(this).empty().append($x.clone());});
new Function('FormIClauseGuidePages',fs.readFileSync(V+'wwwroot/js/Tiger/IClause/IClauseGuidePages.js','utf8')+';global.FormIClauseGuidePages=FormIClauseGuidePages;').call(null);
$('.icl-g-walk[data-walk="inline"] [data-use], .icl-g-walk[data-walk="fg"] [data-use]').each(function(){const sk=FormIClauseGuidePages.stageKeyOf($(this).closest('.icl-g-walk').attr('data-walk'));FormIClauseGuidePages.stageCards($(this),sk);FormIClauseGuidePages.sampleize($(this));});
const PLAN={setup:6,process:8,inline:8,validation:7,psd:6,spv:5};const out=[];let screens=0;
const count=($p,sel,f)=>f?$p.find(sel).filter(f).length:$p.find(sel).length;
for(const [walk,n] of Object.entries(PLAN)) for(let i=0;i<n;i++){
  const $s=$('.icl-g-walk[data-walk="'+walk+'"] .icl-g-wstep').eq(i).clone();$s.find('.icl-g-try').remove();
  if(!FormIClauseGuidePages.build($s,walk,i))continue;screens++;const $p=$s.find('.icl-g-page');
  const checks={ 'stepper':count($p,'nav.icl-stepper'), 'stage cards':count($p,'.icl-stage-row'), 'doc header':count($p,'.icl-doc-title'),
    'Submit Stage btn':count($p,'button',function(){return /^\s*Submit Stage\s*$/.test($(this).text());}),
    'stage Save btn':count($p,'.btn-primary',function(){return /^\s*Save\s*$/.test($(this).text());}),
    'psd panel':count($p,'.icl-rv-issue').valueOf()>0?0:0 };
  for(const [k,v] of Object.entries(checks)) if(v>1) out.push(`${walk}[${i}] ${k} x${v}`);
  // generic: identical piece ids twice (same top-level frag cloned twice)
  const tops=$p.children().map(function(){return ($(this).find('[data-frag]').first().attr('data-frag')||'')}).get().filter(Boolean);
  const dup=tops.filter((t,k)=>tops.indexOf(t)!==k); if(dup.length) out.push(`${walk}[${i}] repeated piece ${dup.join(',')}`);
}
console.log('screens',screens,'duplicates',out.length);console.log(out.join('\n'));
