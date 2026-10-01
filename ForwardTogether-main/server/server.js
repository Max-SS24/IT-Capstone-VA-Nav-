import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app=express();
app.use(helmet());
app.use(cors({origin:process.env.FRONTEND_ORIGIN||'http://localhost:5173'}));
app.use(express.json({limit:'20kb'}));
app.use('/api',rateLimit({windowMs:60000,limit:30,standardHeaders:true}));
app.get('/api/health',(_req,res)=>res.json({status:'ok'}));

app.post('/api/coach/analyze',async(req,res)=>{
 const {concern,supportPreference,deliveryMethod,location,radius,additionalInformation=''}=req.body||{};
 if(!concern||!location||!/^\d{5}$/.test(location)||![5,10,25,50].includes(Number(radius)))return res.status(400).json({error:'Valid concern, ZIP code, and radius are required.'});
 if(!process.env.XAI_API_KEY)return res.status(503).json({error:'AI service is not configured.'});
 const prompt=`Convert this resource-navigation request to JSON only. Never diagnose. Input: ${JSON.stringify({concern,supportPreference,deliveryMethod,location,radius,additionalInformation})}. Return primaryConcern, recommendedSearchCategories, therapySearch, supportGroupSearch, urgency.`;
 try{
  const response=await fetch('https://api.x.ai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.XAI_API_KEY}`},body:JSON.stringify({model:'grok-4-latest',messages:[{role:'system',content:'You classify mental-health resource navigation requests. Do not diagnose or invent providers. Return JSON only.'},{role:'user',content:prompt}],temperature:0,response_format:{type:'json_object'}})});
  if(!response.ok)return res.status(502).json({error:'AI service could not complete the request.'});
  const payload=await response.json();
  const result=JSON.parse(payload.choices?.[0]?.message?.content||'{}');
  if(!result.primaryConcern||!Array.isArray(result.recommendedSearchCategories))throw new Error('Invalid AI response');
  res.json({interpretation:result});
 }catch(error){console.error('Analysis failed:',error.message);res.status(500).json({error:'The request could not be analyzed right now.'})}
});
app.listen(process.env.PORT||5000,()=>console.log(`API listening on port ${process.env.PORT||5000}`));
