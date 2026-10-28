import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class FeesService { constructor(private prisma:PrismaService){}
 async calculate(input:{courseOfferingId:string;termNumber:number;studentType?:'new'|'continuing';includePractical?:boolean}){
  const offering=await this.prisma.courseOffering.findUnique({where:{id:input.courseOfferingId},include:{feeOverrides:{include:{feeComponent:true}}}}); if(!offering) throw new Error('Course offering not found');
  const isNew=(input.studentType??'new')==='new' && input.termNumber===1; const isFinal=input.termNumber===offering.numberOfTerms;
  const comps=await this.prisma.feeComponent.findMany({where:{isMandatory:true}}); const lines:any[]=[];
  const add=(name:string,amount:any,frequency:string)=>{const n=Number(amount||0); if(n>0) lines.push({name,amount:n,frequency});};
  add('Tuition Fee',offering.tuitionFeePerTerm,'PER_TERM'); if(input.includePractical!==false)add('Practical Fee',offering.practicalFeePerTerm,'PER_TERM');
  for(const c of comps){ if(c.frequency==='PER_TERM') add(c.name,c.amount,c.frequency); if(isNew && c.frequency==='ON_ADMISSION') add(c.name,c.amount,c.frequency); if(isFinal && (c.frequency==='FINAL_TERM'||c.frequency==='ON_ATTACHMENT')) add(c.name,c.amount,c.frequency); }
  for(const o of offering.feeOverrides) add(o.feeComponent.name,o.amount??o.feeComponent.amount,o.frequency??o.feeComponent.frequency);
  const totalPayable=lines.reduce((s,l)=>s+l.amount,0); return {courseOfferingId:offering.id,termNumber:input.termNumber,lineItems:lines,totalPayable}; }
}
