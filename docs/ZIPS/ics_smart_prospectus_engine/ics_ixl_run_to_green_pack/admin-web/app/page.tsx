export default function Page(){
 const tiles=['Users & ICS IDs','Roles & Permissions','System Access','Navigation Tiles','Digital Transcript','Competency Passport','Graduate Handoff','Audit Logs'];
 return <main style={{fontFamily:'Arial',padding:32,background:'#07111f',minHeight:'100vh',color:'white'}}><h1>ICS Identity & Experience Layer Admin</h1><p>Manage unified identity, profile, access and graduate pathways across the ICS ecosystem.</p><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16}}>{tiles.map(t=><section key={t} style={{border:'1px solid #1f3b66',borderRadius:16,padding:20,background:'#0d1b2f'}}><h3>{t}</h3><p>Configure and review {t.toLowerCase()}.</p></section>)}</div></main>
}
