
(()=>{'use strict';
const $=id=>document.getElementById(id), all=JSON.parse($('resource-data').textContent).programs;
const query=$('resource-query'),track=$('resource-track'),type=$('resource-type'),area=$('resource-area'),cards=$('resource-cards');
const esc=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const RULES=[{"key":"printing","label":"Printing, copying or faxing","cues":["print","printing","printer","photocopy","photocopies","copy documents","make copies","fax","faxing"],"targets":["lfpl-printing-faxing"]},{"key":"computer_skills","label":"Learning computer skills","cues":["learn to use a computer","learn how to use a computer","computer classes","computer class","digital literacy","computer basics","computer skills","learn computers","teach me to use a computer"],"targets":["goodwill-south","lfpl-learningexpress","lfpl-brainfuse-adult"]},{"key":"computer_access","label":"Computer or internet access","cues":["computer","laptop","wifi","wi fi","internet","internet access","use a computer","no computer","computer access"],"targets":["lfpl-computers-wifi","lfpl-computer-center"]},{"key":"resume","label":"Résumé and interview support","cues":["resume","resumes","cv","cover letter","interview help","interview preparation","write a resume"],"targets":["lfpl-job-seekers","kcc-general","kentuckianaworks","goodwill-south","goodwill-west","goodwill-downtown","ky-ovr","kentucky-career-center","usa-cares-transition"]},{"key":"job","label":"Finding employment or career guidance","cues":["find a job","find work","looking for work","looking for a job","job search","career coaching","job openings","unemployed","employment help"],"targets":["kcc-general","kentuckianaworks","goodwill-west","goodwill-south","goodwill-downtown","lfpl-job-seekers","kentucky-career-center"]},{"key":"housing","label":"Housing assistance or referrals (eligibility varies)","cues":["housing","homeless","shelter","eviction","need a place to stay","somewhere to sleep","nowhere to sleep","rent help","help with rent"],"targets":["goodwill-west","goodwill-downtown","va-ssvf","va-gpd","gpd-svdp-louisville","gpd-wayside-louisville","gpd-healing-louisville"]},{"key":"transport","label":"Transportation support or referrals","cues":["transportation","need a ride","bus fare","get to work","commute help"],"targets":["goodwill-west","goodwill-downtown"]},{"key":"learning","label":"Classes and skill development","cues":["learn a new skill","training","skills training","online class","online classes","career classes","courses","certification","study online"],"targets":["lfpl-linkedin-learning","lfpl-learningexpress","lfpl-brainfuse-adult","goodwill-south","o2o","va-vet-tec-2"]},{"key":"business","label":"Small-business research","cues":["start a business","small business","business plan","entrepreneur","entrepreneurship","business research"],"targets":["lfpl-small-business-reference"]},{"key":"reference","label":"Help finding information or research","cues":["ask a librarian","librarian","research question","find reliable information","find information","reference help"],"targets":["lfpl-ask-librarian"]},{"key":"exam","label":"Tests and exam preparation","cues":["ged","test prep","practice exam","exam prep","proctor","proctoring","take a test"],"targets":["lfpl-learningexpress","lfpl-exam-proctoring","lfpl-brainfuse-adult"]},{"key":"language","label":"English and language learning","cues":["learn english","english class","english classes","language learning","citizenship study","practice english"],"targets":["lfpl-language-services","lfpl-brainfuse-adult"]},{"key":"grant_research","label":"Grant and foundation research","cues":["find grants","research grants","foundation grants","grant research","funding research"],"targets":["lfpl-candid-grant-research"]},{"key":"library_card","label":"Accessing library services","cues":["library card","get a library card","join the library"],"targets":["lfpl-library-card"]}];

/* v2.1: only show curated need categories with source-backed catalog matches
   inside the current pathway, category and geography filters. Counts are
   catalog records, NEVER provider openings or personal eligibility. */
const EXAMPLES=[{"key":"printing","label":"Print documents","query":"I need to print my application"},{"key":"computer_access","label":"Use a computer or Wi-Fi","query":"I need a computer"},{"key":"resume","label":"Get résumé help","query":"Help with my résumé"},{"key":"housing","label":"Explore housing programs and referrals","query":"I need housing assistance"},{"key":"learning","label":"Learn a new skill","query":"I want to learn a new skill"},{"key":"business","label":"Research starting a business","query":"I want to start a small business"},{"key":"job","label":"Find job-search support","query":"I need help finding a job"},{"key":"computer_skills","label":"Learn computer skills","query":"I want to learn computer skills"},{"key":"exam","label":"Prepare for an exam","query":"I need test prep"},{"key":"language","label":"Explore English learning","query":"I want to learn English"},{"key":"reference","label":"Get help finding information","query":"I want to ask a librarian"},{"key":"library_card","label":"Get a library card","query":"I need to get a library card"},{"key":"grant_research","label":"Research grants","query":"I want to research grants"},{"key":"transport","label":"Explore transportation referrals","query":"I need transportation"}];
let expanded=false;
const examplesBox=$('need-examples');
function validForExample(p){
 if(p.origin && p.origin!=='real_world_source')return false;
 if(p.qualification_state==='DISCOVERED'||p.qualification_state==='HOLD')return false;
 if(['HOLD','SUPERSEDED','RETRACTED'].includes(p.publication_state))return false;
 if(p.effective_through && Date.now()>new Date(p.effective_through+'T23:59:59').getTime())return false;
 if(!/^https:\/\//.test(p.program_url||p.sources?.[0]?.url||''))return false;
 return (track.value==='all'||p.track===track.value)
   &&(type.value==='all'||p.category===type.value)
   &&(area.value==='all'||p.areas?.includes(area.value));
}
function supportedExamples(){
 const filtered=all.filter(validForExample);
 return EXAMPLES.map(option=>{
  const rule=RULES.find(r=>r.key===option.key);
  if(!rule)return null;
  const targets=new Set(rule.targets);
  const count=filtered.filter(p=>targets.has(p.id)).length;
  if(!count)return null;
  let label=option.label;
  if(option.key==='housing'){
   label=track.value==='general'?'Explore housing referrals':
    track.value==='veterans'?'Explore veteran housing pathways':
    'Explore housing programs and referrals';
  }
  return {...option,label,count};
 }).filter(Boolean);
}
function renderExampleButtons(){
 const list=supportedExamples(),shown=expanded?list:list.slice(0,6);
 if(!list.length){
  examplesBox.innerHTML='<span class="examples-label">Explore a need:</span><span class="empty-needs">No suggestions match these filters. You can still search in your own words.</span>';
  return;
 }
 let content='<span class="examples-label">Explore a need ('+list.length+' topics):</span>';
 content+=shown.map(o=>{
   const pressed=normalize(query.value)===normalize(o.query)?'true':'false';
   return '<button type="button" data-need-query="'+esc(o.query)+'" aria-pressed="'+pressed+'" aria-label="'+esc(o.label+'; '+o.count+' documented resource records; availability unconfirmed')+'">'
    +esc(o.label)+' <span class="need-count" aria-hidden="true">'+o.count+'</span></button>';
 }).join('');
 if(list.length>6)content+='<button type="button" class="more-needs" data-more-needs="1" aria-expanded="'+String(expanded)+'">'+(expanded?'Show fewer topics':'Show '+(list.length-6)+' more topics')+'</button>';
 examplesBox.innerHTML=content;
}

const stopwords=new Set(["a","an","and","are","as","at","be","been","by","can","could","did","do","does","dont","for","from","get","got","have","how","i","id","im","in","is","it","its","me","my","need","of","on","or","our","please","so","some","someone","the","their","there","these","this","to","us","want","where","which","who","will","with","would","you","your","help","looking","find","make"]);
function normalize(s){return String(s??"").normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[’']/g,"").replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim()}

function hasPhrase(hay,needle){return (" "+hay+" ").includes(" "+needle+" ")}

function detectNeeds(q){return RULES.filter(rule=>rule.cues.some(cue=>hasPhrase(q,normalize(cue))))}

function scoreResource(record,q,needs){
 if(!q)return {score:0,reason:""};
 const fields=[record.title,record.provider,record.summary,record.geography,record.category,record.eligibility_to_check,record.important_to_know,record.first_step];
 const hay=normalize(fields.join(" ")),title=normalize(record.title),provider=normalize(record.provider);
 const mapped=needs.filter(rule=>rule.targets.includes(record.id));
 const literal=q.length>=2&&hasPhrase(hay,q);
 if(mapped.length)return {score:120+(literal?20:0)+(mapped.length-1)*5,reason:"Possible connection: "+mapped.map(rule=>rule.label).join("; ")};
 if(literal)return {score:80+(hasPhrase(title,q)?20:0)+(hasPhrase(provider,q)?15:0),reason:"The provider or published resource description includes your search words"};
 if(needs.length)return null;
 const tokens=[...new Set(q.split(" ").filter(token=>token.length>=3&&!stopwords.has(token)))];
 if(!tokens.length)return null;
 const hits=tokens.filter(token=>hasPhrase(hay,token));
 if(tokens.length===1&&hits.length===1)return {score:40+(hasPhrase(title,hits[0])?15:0),reason:"A keyword appears in the provider or resource description"};
 if(tokens.length>=2&&hits.length>=2&&hits.length/tokens.length>=0.67)return {score:30+hits.length*4,reason:"Related search words occur in this resource description"};
 return null;
}
[...new Set(all.map(x=>x.category))].sort().forEach(c=>{const option=document.createElement('option');option.value=c;option.textContent=c;type.append(option);});
function render(){
renderExampleButtons();
const q=normalize(query.value), t=track.value, c=type.value, a=area.value;
const needs=detectNeeds(q),reasons=new Map();
const shown=all.filter(x=>{
 if((t!=='all'&&x.track!==t)||(c!=='all'&&x.category!==c)||(a!=='all'&&!x.areas.includes(a)))return false;
 if(!q)return true;
 const match=scoreResource(x,q,needs);
 if(!match)return false;
 reasons.set(x.id,match);
 return true;
});
shown.sort((x,y)=>q?(reasons.get(y.id).score-reasons.get(x.id).score || x.title.localeCompare(y.title)):(x.display_priority||9)-(y.display_priority||9)||x.title.localeCompare(y.title));
cards.innerHTML=shown.map(x=>{const sources=x.sources.map(s=>`<a class="source" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.label)} ↗</a>`).join(' · ');return `<article class="resource-card"><div class="resource-meta"><span>${x.record_type==='library_service'?'LFPL library service':(x.record_type==='provider_awardee'?'VA FY2027 GPD awardee':(x.track==='veterans'?'Veteran pathway':'Community pathway'))}</span><span>${esc(x.category)}</span></div><h3>${esc(x.title)}</h3><p class="provider">${esc(x.provider)} · ${esc(x.geography)}</p><p class="summary">${esc(x.summary)}</p>${q&&reasons.has(x.id)?'<p class="match-why"><strong>Why this appeared:</strong> '+esc(reasons.get(x.id).reason)+'.</p>':''}<p class="resource-external"><a class="source" href="${esc(x.program_url || x.sources[0].url)}" target="_blank" rel="noopener noreferrer" aria-label="Visit official ${x.record_type==='library_service'?'library service':(x.record_type==='provider_awardee'?'provider':'program')} website for ${esc(x.title)} (opens in a new tab)">${x.record_type==='library_service'?'Visit library service page ↗':(x.record_type==='provider_awardee'?'Visit provider website ↗':'Visit official program site ↗')}</a></p><div class="tags"><span class="tag">${esc(x.cost_code==='no_cost'?'Described as no-cost':x.cost_code==='paid'?'Published tuition / paid':x.cost_code==='benefit'?'Individual benefits rules':'Verify cost')}</span><span class="tag">REAL-WORLD SOURCE · REVIEWED</span><span class="tag">${esc(x.effective_through && new Date() > new Date(x.effective_through+"T23:59:59") ? "TIME-LIMITED CHANGE ENDED · RECHECK" : (x.availability_label || "AVAILABILITY UNCONFIRMED"))}</span></div><details><summary>Eligibility, costs & next step</summary><p><strong>Check:</strong> ${esc(x.eligibility_to_check)}</p><p><strong>Cost:</strong> ${esc(x.cost_note)}</p><p><strong>Be aware:</strong> ${esc(x.important_to_know)}</p><p><strong>Suggested starting point:</strong> ${esc(x.first_step)}</p>${x.award?'<p><strong>VA FY2027 GPD award:</strong> '+esc(x.award.funded_veteran_beds)+' funded veteran beds (NOT vacancies). Award ID: '+esc(x.award.fain)+'.</p>':''}<p><strong>Evidence:</strong> ${sources}</p><p class="fine">Source reviewed ${esc(x.verification.official_source_reviewed_on)}. Provider and individual eligibility not confirmed.</p></details></article>`;}).join('');
$('resource-count').textContent=`${shown.length} of ${all.length} source-reviewed resource records shown`;$('resource-empty').hidden=shown.length!==0;
$('resource-search-feedback').textContent=!q
 ?'Showing all source-backed records. Describe a need or try one of the examples.'
 :shown.length===0
 ?'No matching resources found in this directory. Try another description, select All pathways, or clear the filters.'
 :needs.length
 ?'Possible connections for: '+needs.map(n=>n.label).join(', ')+'. These are not confirmed available services or personal recommendations.'
 :'Results match words from provider-published descriptions. Check eligibility and current availability with the provider.';
}
examplesBox.addEventListener('click',e=>{
 const toggle=e.target.closest('[data-more-needs]');
 if(toggle&&examplesBox.contains(toggle)){expanded=!expanded;renderExampleButtons();return;}
 const button=e.target.closest('[data-need-query]');
 if(!button||!examplesBox.contains(button))return;
 query.value=button.getAttribute('data-need-query');
 render();
 $('resource-count').scrollIntoView({behavior:'auto',block:'nearest'});
});
query.addEventListener('input',render);[track,type,area].forEach(el=>el.addEventListener('change',()=>{expanded=false;render();}));$('resource-reset').addEventListener('click',()=>{query.value='';track.value='all';type.value='all';area.value='all';render();});
let u=new URLSearchParams(location.search);if(u.has('track')&&['all','veterans','general'].includes(u.get('track')))track.value=u.get('track');if(u.has('q'))query.value=u.get('q').slice(0,200);render();
})();

