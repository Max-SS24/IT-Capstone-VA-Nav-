import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, ArrowRight, Bookmark, Check, ExternalLink, HeartHandshake, MapPin, Menu, MessageCircle, Phone, Search, ShieldCheck, Users, Video, X } from 'lucide-react';
import './styles.css';

const concerns = [
  ['Anxiety & stress','Support for worry, stress, or feeling overwhelmed'],
  ['PTSD & trauma','Trauma-informed care and recovery resources'],
  ['Depression','Professional and peer-based support options'],
  ['Sleep challenges','Support for sleep connected to mental wellbeing'],
  ['Grief & loss','Resources for loss, transition, and bereavement'],
  ['Substance use','Recovery services and support communities'],
  ['Transition support','Help adjusting to civilian life'],
  ["I'm not sure","We'll help narrow down what may fit"]
];

const resources = [
  {id:1,group:'Therapy options',name:'Community Counseling Collaborative',type:'Licensed counseling clinic',distance:'4.2 mi',format:'In person & telehealth',tags:['Anxiety support','Trauma-informed'],demo:true},
  {id:2,group:'Support groups',name:'Veterans Peer Connection',type:'Veteran peer support group',distance:'6.1 mi',format:'Weekly, in person',tags:['Veteran focused','Peer-led'],demo:true},
  {id:3,group:'VA resources',name:'VA Mental Health Services',type:'Official national resource',distance:'Online',format:'Care navigation',tags:['Official VA resource','Care locator'],url:'https://www.mentalhealth.va.gov/'}
];

function CrisisBar(){
  return <aside className="crisis"><span><strong>Need immediate help?</strong> Contact the Veterans Crisis Line.</span><div><a href="tel:988"><Phone/> Call 988, then press 1</a><a href="sms:838255"><MessageCircle/> Text 838255</a></div></aside>
}

function Header({page,setPage}){
  const [open,setOpen]=useState(false);
  const go=p=>{setPage(p);setOpen(false);window.scrollTo(0,0)};
  return <><header><button className="brand" onClick={()=>go('home')}><i><HeartHandshake/></i><span>Forward Together<small>Veteran Support Navigator</small></span></button><button className="menu" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><nav className={open?'open':''}>{['home','find','resources','about'].map(p=><button key={p} className={page===p?'active':''} onClick={()=>go(p)}>{p==='find'?'Find support':p[0].toUpperCase()+p.slice(1)}</button>)}<button className="navCta" onClick={()=>go('find')}>Start search <ArrowRight/></button></nav></header><CrisisBar/></>
}

function Home({setPage}){
  return <main><section className="hero"><div className="eyebrow"><ShieldCheck/> Private by design · No account required</div><h1>Finding the right support shouldn’t feel like another mission.</h1><p>Tell us what matters to you. We’ll help you explore therapy, veteran support groups, and trusted VA resources near you.</p><div className="actions"><button className="primary" onClick={()=>setPage('find')}>Find support near me <ArrowRight/></button><a className="secondary" href="#how">See how it works</a></div><div className="trust"><span><Check/> No diagnosis</span><span><Check/> Minimal information</span><span><Check/> You choose what fits</span></div></section><section className="statement"><p className="kicker">BUILT AROUND YOUR NEXT STEP</p><h2>Real options, organized around you.</h2><p>Not a therapist. Not a replacement for care. A clearer route to the people and services that can help.</p></section><section className="features"><article><i><Search/></i><h3>Therapy options</h3><p>Explore local and virtual care that matches the concerns and format you select.</p></article><article><i><Users/></i><h3>Veteran community</h3><p>Find peer-led groups and veteran-focused support where shared experience matters.</p></article><article><i><MapPin/></i><h3>Resources nearby</h3><p>Choose a ZIP code and travel range—never an exact home address.</p></article></section><section id="how" className="how"><div><p className="kicker">HOW IT WORKS</p><h2>A simple search. A more confident next step.</h2></div><ol><li><b>01</b><span><strong>Tell us what you need</strong><small>Choose a concern, support style, and location.</small></span></li><li><b>02</b><span><strong>We organize the options</strong><small>Your preferences become clear search criteria.</small></span></li><li><b>03</b><span><strong>You decide what comes next</strong><small>Compare nearby resources and contact them directly.</small></span></li></ol></section></main>
}

function FindSupport({setPage,setSearch}){
  const [step,setStep]=useState(1);
  const [data,setData]=useState({concern:'',support:['Therapy','Support group'],format:'Either',location:'',radius:'25',note:''});
  const [error,setError]=useState('');
  const next=()=>{if(step===1&&!data.concern)return setError('Choose one option to continue.');if(step===3&&!/^\d{5}$/.test(data.location))return setError('Enter a valid 5-digit ZIP code.');setError('');if(step<4)setStep(step+1);else{setSearch(data);setPage('results');window.scrollTo(0,0)}};
  return <main className="wizard"><div className="wizardTop"><button onClick={()=>step>1?setStep(step-1):setPage('home')}><ArrowLeft/> Back</button><span>Step {step} of 4</span></div><div className="progress"><i style={{width:step*25+'%'}}/></div><section className="panel">
  {step===1&&<><p className="kicker">LET'S START WITH YOU</p><h1>What would you like support with?</h1><p className="intro">Choose the option that feels closest. This isn't a diagnosis.</p><div className="choices">{concerns.map(([title,desc])=><button className={data.concern===title?'selected':''} onClick={()=>setData({...data,concern:title})} key={title}><span><strong>{title}</strong><small>{desc}</small></span>{data.concern===title&&<Check/>}</button>)}</div></>}
  {step===2&&<><p className="kicker">YOUR PREFERENCES</p><h1>What kind of support feels right?</h1><p className="intro">Select one or both. You can compare options later.</p><div className="largeChoices">{[['Therapy',MessageCircle],['Support group',Users]].map(([name,Icon])=><button className={data.support.includes(name)?'selected':''} onClick={()=>setData({...data,support:data.support.includes(name)?data.support.filter(x=>x!==name):[...data.support,name]})} key={name}><Icon/><strong>{name}</strong>{data.support.includes(name)&&<Check/>}</button>)}</div><h3>How would you prefer to connect?</h3><div className="segments">{['In person','Virtual','Either'].map(x=><button className={data.format===x?'selected':''} onClick={()=>setData({...data,format:x})} key={x}>{x}</button>)}</div></>}
  {step===3&&<><p className="kicker">SEARCH AREA</p><h1>Where should we look?</h1><p className="intro">A ZIP code is enough. We never need your exact address.</p><label>ZIP code<div className="input"><MapPin/><input value={data.location} onChange={e=>setData({...data,location:e.target.value.replace(/\D/g,'').slice(0,5)})} placeholder="e.g., 30060"/></div></label><h3>How far are you willing to travel?</h3><div className="segments four">{['5','10','25','50'].map(x=><button className={data.radius===x?'selected':''} onClick={()=>setData({...data,radius:x})} key={x}>{x} miles</button>)}</div></>}
  {step===4&&<><p className="kicker">FINAL DETAILS</p><h1>Anything else that matters to you?</h1><p className="intro">Optional. Add preferences that could make a resource more relevant.</p><label>Additional preferences<textarea value={data.note} onChange={e=>setData({...data,note:e.target.value.slice(0,500)})} placeholder="For example: I'd prefer someone experienced with veterans."/></label><div className="privacy"><ShieldCheck/><span><strong>Your privacy matters</strong><small>Don't enter Social Security numbers, medical record numbers, or other highly sensitive information.</small></span></div></>}
  {error&&<p className="error">{error}</p>}<div className="wizardActions"><button className="secondary" onClick={()=>step>1?setStep(step-1):setPage('home')}>Back</button><button className="primary" onClick={next}>{step===4?'Find my resources':'Continue'} <ArrowRight/></button></div></section></main>
}

function Results({data,setPage}){
  const [saved,setSaved]=useState([]);
  return <main className="results"><section className="resultsHead"><button onClick={()=>setPage('find')}><ArrowLeft/> Edit search</button><p className="kicker">YOUR RESOURCE GUIDE</p><h1>Support options near {data.location||'you'}</h1><p>Based on {data.concern||'your selected needs'}, {data.format.toLowerCase()} options, within {data.radius} miles.</p></section><div className="resultsLayout"><aside><h3>Your search</h3><dl><dt>Support for</dt><dd>{data.concern}</dd><dt>Looking for</dt><dd>{data.support.join(' + ')}</dd><dt>Format</dt><dd>{data.format}</dd><dt>Distance</dt><dd>Within {data.radius} miles</dd></dl><button className="secondary" onClick={()=>setPage('find')}>Change preferences</button></aside><section><div className="notice"><ShieldCheck/><p><strong>Review before you choose</strong><br/>Contact each resource to confirm credentials, availability, cost, eligibility, and insurance coverage.</p></div>{['Therapy options','Support groups','VA resources'].map(group=><div className="group" key={group}><h2>{group}</h2>{resources.filter(r=>r.group===group).map(r=><article className="resourceCard" key={r.id}><div className="cardTop"><span>{r.type}</span><button onClick={()=>setSaved(saved.includes(r.id)?saved.filter(x=>x!==r.id):[...saved,r.id])}><Bookmark fill={saved.includes(r.id)?'currentColor':'none'}/></button></div><h3>{r.name}</h3><div className="meta"><span><MapPin/> {r.distance}</span><span><Video/> {r.format}</span></div><div className="tags">{r.tags.map(t=><span key={t}><Check/> {t}</span>)}</div>{r.demo&&<p className="demo">Demo listing—replace with verified provider API data before launch.</p>}<div className="cardActions">{r.url?<a className="primary" href={r.url} target="_blank">Visit website <ExternalLink/></a>:<button className="primary">View details</button>}</div></article>)}</div>)}</section></div></main>
}

function Resources(){
  const links=[['VA Mental Health','Explore VA mental health services and care information.','https://www.mentalhealth.va.gov/'],['Vet Centers','Community-based counseling for eligible veterans and families.','https://www.vetcenter.va.gov/'],['Veterans Crisis Line','Confidential crisis support available 24/7.','https://www.veteranscrisisline.net/']];
  return <main className="content"><p className="kicker">TRUSTED STARTING POINTS</p><h1>National veteran mental health resources</h1><p className="lead">Official resources you can use while local search integrations are being connected.</p><div className="links">{links.map(([name,desc,url])=><a href={url} target="_blank" key={name}><ShieldCheck/><span><strong>{name}</strong><small>{desc}</small></span><ExternalLink/></a>)}</div></main>
}

function About(){
 return <main className="content"><p className="kicker">ABOUT THE PROJECT</p><h1>A navigator—not a clinician.</h1><p className="lead">Forward Together reduces the friction between deciding to seek help and finding a relevant resource.</p><div className="about"><article><h2>What it does</h2><p>Organizes preferences into search criteria and presents therapy, peer support, and official VA options.</p></article><article><h2>What it doesn't do</h2><p>It does not diagnose, provide clinical treatment, determine emergencies, or guarantee provider fit.</p></article><article><h2>How AI fits</h2><p>Grok can interpret natural-language preferences. Provider facts must come from trusted sources.</p></article><article><h2>Privacy approach</h2><p>No account, exact address, Social Security number, or medical record is required.</p></article></div></main>
}

function Footer(){return <footer><div className="brand"><i><HeartHandshake/></i><span>Forward Together<small>Veteran Support Navigator</small></span></div><p>This independent student project is not affiliated with or endorsed by the U.S. Department of Veterans Affairs. It does not provide medical advice.</p><span>© 2026</span></footer>}

function App(){
 const [page,setPage]=useState('home');
 const [search,setSearch]=useState({support:['Therapy','Support group'],format:'Either',radius:'25',location:'',concern:''});
 return <><Header page={page} setPage={setPage}/>{page==='home'&&<Home setPage={setPage}/>} {page==='find'&&<FindSupport setPage={setPage} setSearch={setSearch}/>} {page==='results'&&<Results data={search} setPage={setPage}/>} {page==='resources'&&<Resources/>} {page==='about'&&<About/>}<Footer/></>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
