
(function () {
  'use strict';
  // Public, read-only companion to the v0.3 browser-local checkpoint instrument.
  // Google Sheets is the live navigation/state source; verified version links in snapshot are a dated archive.
  var SHEET_ID='14LChbwEP7Ugd2tUbSqKuGFInVPECnb78Jb6wTnyzh5M', GID='1043935481';
  var SHEET_URL='https://docs.google.com/spreadsheets/d/'+SHEET_ID+'/edit?gid='+GID+'#gid='+GID;
  var root=document.getElementById('rtsSheetGallery'); if(!root)return;
  var el=function(id){return document.getElementById(id);};
  var snapshot=[],cases=[],selected=null,source='loading',lastChecked='',inFlight=false;
  var status=el('sgStatus'),track=el('sgTrack'),detail=el('sgDetail'),position=el('sgPosition');
  var filters={search:'',type:'all'};
  var headers=['Opportunity','Qualified','Aligned','Resume presented','Resume verified','Ready to submit','Receipt verified','Outcome observed'];

  function str(x){return x==null?'':String(x).trim();}
  function safeUrl(value){
    try{var url=new URL(str(value));return url.protocol==='https:'?url.href:null;}catch(e){return null;}
  }
  function key(x){return [x.company||'',x.requisition||x.role||''].join('|');}
  function output(name,value,klass){
    var e=document.createElement(name);if(value!=null)e.textContent=str(value);if(klass)e.className=klass;return e;
  }
  function link(label,href,hint){
    var a=output('a',label);a.href=safeUrl(href)||'#';a.target='_blank';a.rel='noopener noreferrer';
    if(hint)a.append(output('em',hint));return a;
  }
  function safeCell(cell){if(!cell)return'';return str(cell.f!=null?cell.f:cell.v);}
  function normalizeTable(payload){
    if(!payload||payload.status!=='ok'||!payload.table||!Array.isArray(payload.table.rows))throw Error('The sheet returned no usable table.');
    var out=payload.table.rows.map(function(r,i){
      var a=Array.from({length:26},function(_,j){return safeCell((r.c||[])[j]);});
      return {
        row:i+5,qualified:a[0],company:a[1],role:a[2],requisition:a[3],location:a[4],
        sourceDescription:a[5],lifecycle:a[6],package:a[7],alignment:a[8],resumeState:a[9],
        authorization:a[10],application:a[11],submissionDate:a[12],interview:a[13],
        outcome:a[14],risk:a[17],sourceUrl:a[20],folderUrl:a[18],
        alignmentUrl:a[21],resumeUrl:a[22],applicationUrl:a[23],receiptUrl:a[24]
      };
    }).filter(function(x){return x.company&&x.role&&x.company.toLowerCase()!=='company';});
    if(!out.length)throw Error('The public tracker returned no opportunity rows.');
    return out.map(function(x){
      var old=snapshot.find(function(y){return key(y)===key(x);});
      x.archives=old?old.archives||[]:[];
      x.warning=old?old.warning||'':'';
      return x;
    });
  }
  function submissionVerified(x){
    // A recruiter message, final-named resume, or inferred date does NOT establish a verified receipt.
    return !!safeUrl(x.receiptUrl)&&/submission.verified|receipt verified/i.test(str(x.application));
  }
  function usableResume(x){
    // Refuse to endorse the GEHA-named file as the Advantage Tech role's resume.
    if(x.company==='Advantage Tech'&&x.role==='Sr. AI Context Engineer')return false;
    return !!safeUrl(x.resumeUrl)||(x.archives||[]).some(function(v){return v.type==='PDF'||v.type==='Word';});
  }
  function stages(x){
    var qual=/qualified to work|in preparation|ready to submit|submitted/i.test(x.lifecycle);
    var align=/checkpoint 3.{0,70}accepted|historical alignment completed/i.test(x.alignment);
    var acceptAlign=/checkpoint 3.{0,70}accepted/i.test(x.alignment);
    var presented=/checkpoint 4.{0,90}accepted/i.test(x.resumeState);
    var verified=/checkpoint 5.{0,50}accepted/i.test(x.resumeState);
    var ready=/^authorized|^ready to submit|\bready_to_submit\b/i.test(x.authorization);
    var submitted=submissionVerified(x);
    var outcome=x.outcome&&!/^(open|unknown|not verified|not measured)/i.test(x.outcome);
    return [
      'recorded',qual?'recorded':'open',acceptAlign?'accepted':align?'historical':'open',
      presented?'accepted':usableResume(x)?'historical':'open',
      verified?'accepted':'open',ready?'accepted':'open',
      submitted?'accepted':'open',outcome?'recorded':'open'
    ];
  }
  function stateName(x){return submissionVerified(x)?'Receipt verified':/not authorized/i.test(x.authorization)?'Readiness not authorized':/blocked/i.test(x.package)?'Artifact blocked':x.lifecycle||'Status not recorded';}
  function filtered(){
    return cases.filter(function(x){
      if(filters.type==='resume'&&!usableResume(x))return false;
      if(filters.type==='verified'&&!submissionVerified(x))return false;
      var q=filters.search.trim().toLowerCase();
      return !q||[x.company,x.role,x.requisition,x.location,x.lifecycle].join(' ').toLowerCase().indexOf(q)>=0;
    });
  }
  function render(){
    var visible=filtered(),count=cases.filter(submissionVerified).length;
    el('sgTotals').textContent=cases.length+' opportunity records · '+cases.filter(usableResume).length+' with grounded resume links · '+count+' verified submissions';
    var candidate=visible.find(function(x){return key(x)===selected;});
    if(!candidate){candidate=visible[0]||null;selected=candidate?key(candidate):null;}
    position.textContent=candidate?(visible.indexOf(candidate)+1)+' of '+visible.length:'No matches';
    el('sgPrev').disabled=!candidate||visible.indexOf(candidate)===0;
    el('sgNext').disabled=!candidate||visible.indexOf(candidate)===visible.length-1;
    track.replaceChildren();
    visible.forEach(function(x){
      var button=output('button',null,'sg-tile');button.type='button';
      button.setAttribute('aria-pressed',String(key(x)===selected));
      button.append(output('span',x.company,'sg-company'));
      button.append(output('strong',x.role));
      button.append(output('span',x.requisition||x.location||'No requisition recorded','small muted'));
      button.append(output('span',stateName(x),'sg-foot'));
      button.addEventListener('click',function(){select(x);});
      track.append(button);
    });
    detail.replaceChildren();
    if(candidate)renderDetail(candidate);
    else detail.append(output('p','No opportunities match this filter. The tracker currently has no receipt-verified submissions.','sg-placeholder'));
  }
  function select(x){
    selected=key(x);render();
    var active=track.querySelector('[aria-pressed="true"]');
    if(active){var left=active.offsetLeft-track.offsetLeft-(track.clientWidth-active.clientWidth)/2;track.scrollTo({left:Math.max(0,left),behavior:'smooth'});}
  }
  function renderDetail(x){
    var head=output('div',null,'sg-detail-head'),info=output('div');
    info.append(output('span',x.company.toUpperCase()+(x.requisition?' · '+x.requisition:''),'sg-company'));
    info.append(output('h3',x.role));
    info.append(output('p',[x.location,x.lifecycle,x.package?'Package: '+x.package:''].filter(Boolean).join(' · '),'sg-overview'));
    head.append(info,output('span',stateName(x),'sg-state'+(!submissionVerified(x)?' warn':'')));
    detail.append(head);
    var timeline=output('div',null,'sg-checkpoints');timeline.setAttribute('aria-label','Eight RTS stage signals, evidence-based; historical stages are not the same as accepted checkpoints.');
    var vals=stages(x);
    headers.forEach(function(title,i){
      var st=vals[i],tile=output('div',null,'sg-stage '+(st==='accepted'||st==='recorded'?'done':st==='historical'?'estimated':''));
      tile.title=title+' — '+(st==='historical'?'Historical evidence only':st==='recorded'?'Source recorded':st==='accepted'?'Accepted or verified':'Not established by sheet');
      tile.append(output('b',String(i+1)));
      tile.append(output('span',title));
      tile.append(output('small',st==='historical'?'History':st==='accepted'?'Accepted':st==='recorded'?'Recorded':'Not verified'));
      timeline.append(tile);
    });
    detail.append(timeline);
    var grid=output('div',null,'sg-grid'),one=output('div',null,'sg-column'),two=output('div',null,'sg-column');
    one.append(output('h4','Opportunity evidence & current source'));
    var links=output('div',null,'sg-links');
    if(safeUrl(x.folderUrl))links.append(link('Open canonical opportunity folder',x.folderUrl,'Full up-to-date file inventory'));
    if(safeUrl(x.sourceUrl))links.append(link('Original source / job description',x.sourceUrl));
    if(safeUrl(x.alignmentUrl))links.append(link('Candidate alignment',x.alignmentUrl));
    if(safeUrl(x.resumeUrl)&&!(x.company==='Advantage Tech'&&x.role==='Sr. AI Context Engineer'))
      links.append(link('Resume linked in live tracker',x.resumeUrl,'May point to an earlier version; see preserved versions'));
    if(safeUrl(x.receiptUrl))links.append(link('Recorded receipt reference (requires verification)',x.receiptUrl));
    if(!links.children.length)one.append(output('p','No durable source link recorded for this opportunity.','sg-placeholder'));else one.append(links);
    two.append(output('h4','Preserved resume progression & QA'));
    var versions=output('div',null,'sg-links');
    (x.archives||[]).forEach(function(a){
      if(safeUrl(a.url))versions.append(link(a.label,a.url,a.type+' · '+a.status));
    });
    if(!versions.children.length)two.append(output('p','No same-opportunity resume files verified for this published archive.','sg-placeholder'));else two.append(versions);
    grid.append(one,two);detail.append(grid);
    if(x.warning)detail.append(output('p',x.warning,'sg-warning'));
    var small=output('div',null,'sg-smallprint');
    small.append(output('span','Tracker row '+x.row+' · Authorization: '+(x.authorization||'NOT VERIFIED')+' · Placement: '+(x.application||'NOT VERIFIED')));
    small.append(link('Inspect RTS inventory',SHEET_URL));
    detail.append(small);
  }
  function changeStatus(label,kind){
    status.textContent=label;status.className='sg-status'+(kind?' '+kind:'');
  }
  function acceptLive(payload){
    try{
      var live=normalizeTable(payload);cases=live;source='live';lastChecked=new Date().toLocaleString();
      changeStatus('LIVE GOOGLE SHEET · checked '+lastChecked,'live');render();
    }catch(e){
      changeStatus('SNAPSHOT ONLY · live read unavailable','failed');
      el('sgNotice').textContent='The public sheet could not be read in this browser. Showing a dated snapshot instead; open the source tracker for the current record.';
      if(!cases.length){cases=snapshot;render();}
    }
  }
  function refresh(){
    if(inFlight)return;inFlight=true;
    if(source!=='live')changeStatus('Checking Google Sheet…','');
    var callback='__proamRtsSheetResponse',script=document.createElement('script'),settled=false;
    var timer=setTimeout(function(){finish(false);},12000);
    function finish(ok,payload){
      if(settled)return;settled=true;clearTimeout(timer);inFlight=false;script.remove();
      try{delete window[callback];}catch(e){window[callback]=undefined;}
      if(ok){acceptLive(payload);el('sgNotice').textContent='Live opportunity state is read directly from the shared Google Sheet. File-version links are a published, verified archive snapshot.';}
      else{changeStatus('SNAPSHOT · live read unavailable','failed');el('sgNotice').textContent='Showing published snapshot; the Google Sheet did not respond. Check source tracker for current information.';}
    }
    window[callback]=function(data){finish(true,data);};
    script.onerror=function(){finish(false);};
    var tqx='out:json;responseHandler:'+callback;
    script.src='https://docs.google.com/spreadsheets/d/'+SHEET_ID+'/gviz/tq?gid='+GID+
      '&range=A4:Z500&headers=1&tqx='+encodeURIComponent(tqx)+'&_='+Date.now();
    document.head.append(script);
  }
  el('sgSearch').addEventListener('input',function(e){filters.search=e.target.value;render();});
  el('sgFilter').addEventListener('change',function(e){filters.type=e.target.value;render();});
  el('sgRefresh').addEventListener('click',refresh);
  function step(dir){var list=filtered(),i=list.findIndex(function(x){return key(x)===selected;});if(list[i+dir])select(list[i+dir]);}
  el('sgPrev').addEventListener('click',function(){step(-1);});
  el('sgNext').addEventListener('click',function(){step(1);});
  track.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();step(1);}else if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}});
  fetch('./sheet-gallery-snapshot.json',{cache:'no-store'}).then(function(r){if(!r.ok)throw Error('Snapshot fetch failed');return r.json();}).then(function(data){
    snapshot=Array.isArray(data.records)?data.records:[];cases=snapshot.slice();source='snapshot';
    changeStatus('SNAPSHOT · '+(data.capturedDate||'date unknown'),'');
    render();refresh();
  }).catch(function(){
    changeStatus('Tracker records unavailable','failed');
    el('sgNotice').textContent='Unable to load the published snapshot. Live Sheet retrieval will still be attempted.';
    refresh();
  });
})();
