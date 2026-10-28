import { PrismaClient, FeeFrequency } from '@prisma/client';
const prisma=new PrismaClient();
async function main(){
 const schools=['School of ICT','School of Business','School of Hospitality','School of Medical, Nursing & Health Sciences','School of Engineering'];
 for(const name of schools) await prisma.school.upsert({where:{slug:name.toLowerCase().replaceAll(' ','-').replaceAll('&','and')},update:{},create:{name,slug:name.toLowerCase().replaceAll(' ','-').replaceAll('&','and')}});
 for(const code of ['KNEC','CDACC','KASNEB','HRMPEB','ICM','ICSTC','IATA','NASCOP']) await prisma.examBody.upsert({where:{code},update:{},create:{code,name:code}});
 const fees=[['Registration Fee',1000,'ON_ADMISSION'],['Student ID Card Fee',500,'ON_ADMISSION'],['Library Fee',3000,'ON_ADMISSION'],['CAT Fee',1500,'PER_TERM'],['Activity Fee',1000,'PER_TERM'],['Maintenance & Development Fee',5000,'ON_ADMISSION'],['Graduation Fee',6000,'FINAL_TERM'],['Attachment Fee',2800,'ON_ATTACHMENT'],['Business Plan Fee',1000,'FINAL_TERM'],['Project Fee',1000,'FINAL_TERM']];
 for(const [name,amount,frequency] of fees) await prisma.feeComponent.upsert({where:{id:name as string},update:{},create:{id:name as string,name:name as string,amount:Number(amount),frequency:frequency as FeeFrequency,appliesTo:'ALL'}} as any);
 const knec=await prisma.examBody.findUniqueOrThrow({where:{code:'KNEC'}}); const cdacc=await prisma.examBody.findUniqueOrThrow({where:{code:'CDACC'}});
 for(const r of [{examBodyId:knec.id,level:'Diploma',minimumGrade:'C-'},{examBodyId:knec.id,level:'Certificate',minimumGrade:'D'},{examBodyId:knec.id,level:'Artisan',minimumGrade:'D-'},{examBodyId:cdacc.id,level:'Diploma',minimumGrade:'C-'},{examBodyId:cdacc.id,level:'Certificate',minimumGrade:'D'},{examBodyId:cdacc.id,level:'Artisan',minimumGrade:'D-'}]) await prisma.admissionRule.create({data:r});
 const ictSchool=await prisma.school.findFirstOrThrow({where:{name:'School of ICT'}}); const hospSchool=await prisma.school.findFirstOrThrow({where:{name:'School of Hospitality'}});
 const ict=await prisma.course.create({data:{schoolId:ictSchool.id,name:'Information Communication Technology',slug:'information-communication-technology',careerSummary:'ICT support, networking, systems administration and software pathways',employmentScore:85}});
 await prisma.courseOffering.create({data:{courseId:ict.id,examBodyId:knec.id,level:'Certificate',durationMonths:12,numberOfTerms:4,tuitionFeePerTerm:14000,practicalFeePerTerm:2500,minimumGrade:'D'}});
 await prisma.courseOffering.create({data:{courseId:ict.id,examBodyId:knec.id,level:'Diploma',durationMonths:24,numberOfTerms:8,tuitionFeePerTerm:14000,practicalFeePerTerm:2500,minimumGrade:'C-'}});
 const food=await prisma.course.create({data:{schoolId:hospSchool.id,name:'Food and Beverage Service',slug:'food-and-beverage-service',careerSummary:'Hotel service, culinary operations, catering and restaurant careers',employmentScore:88}});
 await prisma.courseOffering.create({data:{courseId:food.id,examBodyId:knec.id,level:'Artisan',durationMonths:9,numberOfTerms:3,tuitionFeePerTerm:17000,practicalFeePerTerm:4000,minimumGrade:'D-'}});
 await prisma.courseOffering.create({data:{courseId:food.id,examBodyId:knec.id,level:'Diploma',durationMonths:24,numberOfTerms:8,tuitionFeePerTerm:17000,practicalFeePerTerm:4000,minimumGrade:'C-'}});
}
main().finally(()=>prisma.$disconnect());
