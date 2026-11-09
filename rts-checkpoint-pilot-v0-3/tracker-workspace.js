(function(){
'use strict';
/* Live tracker mirror of RTS v0.3.0. This is intentionally READ ONLY.
   Browser-local checkpoint pilot remains unchanged and independent. */
var $=function(id){return document.getElementById(id);};
var panel=$('rtsTrackerMirror');if(!panel)return;
var selected=null,source='loading',checked='',mode='tracker',records=[];
var stages=[
  ['OPPORTUNITY_PRESENTED','Opportunity / JD presented'],
  ['QUALIFIED_TO_WORK','Qualified to work'],
  ['ALIGNMENT_REVIEWED','Alignment reviewed'],
  ['RESUME_PRESENTED','Resume presented'],
  ['RESUME_VERIFIED','Resume verified'],
  ['READY_TO_SUBMIT','Ready to submit'],
  ['SUBMISSION_VERIFIED','Submission verified'],
  ['OUTCOME_OBSERVED','Outcome observed']
];
function str(x){return x==null?'':String(x).trim();}
function token(s){return str(s).toLowerCase().replace(/[^a-z0-9]+/g,' ');}
function ownerReported(x){return /user.reported.submitted/i.test(str(x.application));}
function fromSource(x){return Boolean(x&&x.company&&x.role);}
function receiptVerified(x){return Boolean(x.receiptUrl)&&/submission.verified|receipt verified/i.test(x.application);}
function put(id,text){var e=$(id);if(e)e.textContent=str(text);}
function statusClass(kind){return kind==='accepted'?'tm-accepted':kind==='recorded'?'tm-recorded':kind==='history'?'tm-history':kind==='reported'?'tm-reported':kind==='hold'?'tm-hold':'tm-unknown';}
function make(tag,text,cls){var e=document.createElement(tag);if(text!=null)e.textContent=str(text);if(cls)e.className=cls;return e;}
function safe(href){try{var u=new URL(str(href),location.href);return u.protocol==='https:'?u.href:null;}catch(e){return null;}}
function link(label,url,extra){
 var a=make('a',label);a.href=safe(url)||'#';a.target='_blank';a.rel='noopener noreferrer';
 if(extra)a.append(make('small',extra));return a;
}
function evidenceStages(r){
 var huma=r.requisition==='R-425570',blocked=/blocked/i.test(r.package)||/unresolved/i.test(r.company);
 var out=stages.map(function(p){return {key:p[0],name:p[1],kind:'unknown',note:'No checkpoint acceptance documented'};});
 function mark(i,k,n){out[i].kind=k;out[i].note=n;}
 if(!blocked && (r.sourceUrl||r.qualified))mark(0,huma?'accepted':'recorded',huma?'Checkpoint 1 acceptance reported in original pilot thread':'Opportunity source or historical qualification recorded');
 if(!blocked && /qualified|in preparation|ready|submitted/i.test(r.lifecycle))mark(1,huma?'accepted':'recorded',huma?'Checkpoint 2 accepted at 11:03 AM EST (user-reported)':'Tracker records qualified work; acceptance time not established');
 if(/checkpoint 3.{0,90}accepted/i.test(r.alignment))mark(2,'accepted','Human alignment review accepted; exact time unresolved');
 else if(/historical alignment completed/i.test(r.alignment))mark(2,'history','Historical alignment mentioned; checkpoint acceptance not independently established');
 if(/checkpoint 4.{0,150}accepted/i.test(r.resumeState))mark(3,'accepted','Draft review accepted at 11:46 AM EST; first presentation time NOT_MEASURED');
 else if(r.resumeUrl||r.archives&&r.archives.length)mark(3,'recorded','Derived resume file preserved; acceptance not established');
 if(/checkpoint 5.{0,75}accepted/i.test(r.resumeState))mark(4,'accepted','Human resume content verification accepted; 12:23 PM inferred from context');
 if(huma&&/not authorized/i.test(r.authorization))mark(5,'hold','Checkpoint 6 on HOLD; v3 PDF font QA failed and prior ATS application check remains unresolved');
 else if(/^authorized|^ready to submit|\bready_to_submit\b/i.test(r.authorization))mark(5,'accepted','Readiness authorization recorded in tracker');
 if(receiptVerified(r))mark(6,'accepted','External receipt verified and linked');
 else if(ownerReported(r))mark(6,'reported','Candidate reports submitted; exact receipt/date/channel not independently verified');
 if(r.outcome&&!/open|unknown|not verified/i.test(r.outcome))mark(7,'recorded','An outcome is recorded in tracker; inspect source for provenance');
 if(blocked)mark(1,'hold','Recruiter/client identity unresolved; export and placement remain blocked');
 return out;
}
function stateLabel(kind){return {accepted:'Accepted',recorded:'Recorded',history:'Historical',reported:'Owner report',hold:'HOLD',unknown:'Not verified'}[kind]||'Not verified';}
function sourceName(){return source==='live'?'LIVE GOOGLE SHEET':source==='snapshot'?'DATED SNAPSHOT':'TRACKER LOADING';}
function render(){
 if(mode!=='tracker'||!fromSource(selected))return;
 var r=selected,history=evidenceStages(r),count=history.filter(function(x){return ['accepted','recorded','history'].includes(x.kind);}).length;
 put('tmTitle',r.company+' — '+r.role+(r.requisition?' · '+r.requisition:''));
 put('tmSource',sourceName()+(checked?' · checked '+checked:''));
 put('tmProgress',count+' / 8');put('tmProgressHint','Stage evidence, not necessarily eight accepted decisions');
 var huma=r.requisition==='R-425570';
 put('tmTrust',huma?'4 / 4':'—');put('tmTrustHint',huma?'YES in four documented checkpoint feedback responses':'Not measured in tracker');
 put('tmContinuity',huma?'4 / 4':'—');put('tmContinuityHint',huma?'YES in four documented checkpoint feedback responses':'Not measured in tracker');
 put('tmImpact','—');put('tmImpactHint','No verified active effort or time savings');
 put('tmCurrent',huma?'CP6 · HOLD':/blocked/i.test(r.package)?'HOLD · Identity':'Read tracker');
 put('tmCurrentDetail',huma?'PDF typography and Workday prior-submission evidence pending':'No actual checkpoint interval measurement grounded');
 ['tmCycle','tmSubmissionElapsed','tmReviewElapsed'].forEach(function(id){put(id,'Not measured');});
 put('tmNotes','Google Sheet is the navigation/state source. Historical and user-reported events do not automatically establish verified checkpoint acceptance or elapsed-time measurements.');
 var list=$('tmStages');list.replaceChildren();
 history.forEach(function(s,i){
  var li=make('li',null,'tm-step '+statusClass(s.kind));
  li.append(make('span',String(i+1),'tm-number'));
  var b=make('div');b.append(make('strong',s.name),make('span',stateLabel(s.kind),'tm-marker'));
  b.append(make('p',s.note));li.append(b);list.append(li);
 });
 var desc=$('tmReview');desc.replaceChildren();
 var heading=make('h3',huma?'Checkpoint 6 — readiness reconciliation':'Current tracker disposition');desc.append(heading);
 desc.append(make('p',huma?'Verified v3 DOCX is preserved; the exported PDF has a recorded font substitution. The four-year AI production experience risk and Workday prior-application check remain open.':'The tracker contains a historical opportunity package. This read-only view cannot infer missing checkpoint approvals, application receipts, or outcomes.','small muted'));
 var info=make('dl',null,'tm-facts');
 [[ 'Lifecycle',r.lifecycle||'Not recorded' ],
 [ 'Authorization',r.authorization||'Not verified' ],
 [ 'Application',r.application||'Not verified' ],
 [ 'Receipt',receiptVerified(r)?'Verified receipt linked':'NOT VERIFIED' ],
 [ 'Outcome',r.outcome||'Not observed' ]].forEach(function(pair){
  info.append(make('dt',pair[0]),make('dd',pair[1]));
 });desc.append(info);
 if(ownerReported(r)){
  desc.append(make('p','Candidate statement: submitted. This is NOT a verified application receipt; exact submission date and channel remain unestablished.','tm-warning'));
 }
 if(huma){desc.append(make('p','There is an unresolved difference between the earlier Checkpoint 6 HOLD and the owner’s later submission report. Do not infer authorization or submission timing from either record.','tm-warning'));}
 if(/blocked/i.test(r.package)){desc.append(make('p','BLOCKED — employer/client identity unresolved. No resume submission established.','tm-warning'));}
 var actions=make('div',null,'tm-actions');
 if(safe(r.folderUrl))actions.append(link('Canonical opportunity folder',r.folderUrl));
 if(safe(r.resumeUrl)&&!(r.company==='Advantage Tech'&&r.role==='Sr. AI Context Engineer'))actions.append(link('Tracker-linked resume',r.resumeUrl));
 var c=r.requisition||r.role,caseUrl='./proof-of-work.html?case='+encodeURIComponent(c);
 actions.append(link('Proof-of-work companion ↗',caseUrl));
 desc.append(actions);
 var select=$('tmRecordSelect');var choice=r.requisition||r.company+' — '+r.role;
 select.replaceChildren();
 records.forEach(function(x){var o=make('option',x.company+' — '+x.role+(x.requisition?' · '+x.requisition:''));o.value=x.requisition||x.company+'|'+x.role;select.append(o);});
 select.value=r.requisition||r.company+'|'+r.role;
}
function setMode(next){
 mode=next==='pilot'?'pilot':'tracker';
 $('rtsLocalCaseControls').hidden=mode!=='pilot';
 $('rtsLocalSummary').hidden=mode!=='pilot';
 $('rtsLocalTiming').hidden=mode!=='pilot';
 $('rtsLocalCheckpointPanels').hidden=mode!=='pilot';
 $('rtsLocalHistory').hidden=mode!=='pilot';
 panel.hidden=mode!=='tracker';
 $('rtsTrackerChooser').hidden=mode!=='tracker';
 $('rtsModeTracker').setAttribute('aria-pressed',String(mode==='tracker'));
 $('rtsModePilot').setAttribute('aria-pressed',String(mode==='pilot'));
 put('rtsWorkspacePrivacy',mode==='tracker'?'Read-only · Google Sheet':'Private to this browser');
 put('casehead',mode==='tracker'?'Selected opportunity · live tracker':'Local checkpoint measurement pilot');
 if(mode==='tracker')render();
}
$('rtsModeTracker').addEventListener('click',function(){setMode('tracker');});
$('rtsModePilot').addEventListener('click',function(){setMode('pilot');});
$('tmRecordSelect').addEventListener('change',function(e){
 var gallery=window.__RTS_GALLERY_READ_ONLY__;if(gallery)gallery.select(e.target.value);
});
window.addEventListener('rts:sheet-opportunity-selected',function(e){
 if(!e.detail||!e.detail.record)return;
 selected=e.detail.record;source=e.detail.source;checked=e.detail.checkedAt||'';
 var gallery=window.__RTS_GALLERY_READ_ONLY__;
 if(gallery)records=gallery.all();
 render();
});
setMode('tracker');
var gallery=window.__RTS_GALLERY_READ_ONLY__;
if(gallery){selected=gallery.getCurrent();source=gallery.getSource();records=gallery.all();render();}
})();