import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
async function main() {
  const roles = ['Super Admin','Principal','Registrar','Admissions Officer','Finance Officer','Exam Officer','Lecturer','Student','Graduate','Parent / Sponsor','Guest'];
  for (const name of roles) await prisma.role.upsert({ where:{ name }, update:{}, create:{ name }});
  const tiles = [
    ['course_catalog','Course Catalogue','SMART_PROSPECTUS','/courses','book',1],
    ['fees','My Fees','ICS_LIVE','/fees','wallet',2],
    ['classes_ics_live','My Classes','ICS_LIVE','/classes','video',3],
    ['ai_classroom','AI Classroom','SMART_LECTURER','/ai-classroom','bot',4],
    ['library','AI E-Library','AI_ELIBRARY','/library','library',5],
    ['exams','Exams & Results','ICS_LIVE','/exams','award',6],
    ['transcript','Digital Transcript','ICS_LIVE','/transcript','file',7],
    ['jobs','YohPal Jobs','YOHPAL_JOBS','/jobs','briefcase',8],
    ['hustle','YohPal Hustle','YOHPAL_HUSTLE','/hustle','rocket',9]
  ];
  for (const [code,title,system,routePath,icon,displayOrder] of tiles as any[]) {
    await prisma.navigationTile.upsert({ where:{ code }, update:{ title, system, routePath, icon, displayOrder }, create:{ code,title,system,routePath,icon,displayOrder }});
  }
  const adminHash = await bcrypt.hash('Admin@12345', 10);
  const admin = await prisma.user.upsert({ where:{ email:'admin@ics.ac.ke' }, update:{}, create:{ icsId:'ICS-ADMIN-000001', email:'admin@ics.ac.ke', phone:'0700000000', passwordHash:adminHash, status:'ACTIVE', profile:{ create:{ fullName:'ICS Super Admin', modeOfStudy:'HYBRID' }}}});
  const superRole = await prisma.role.findUniqueOrThrow({ where:{ name:'Super Admin' }});
  await prisma.userRole.upsert({ where:{ userId_roleId:{ userId:admin.id, roleId:superRole.id }}, update:{}, create:{ userId:admin.id, roleId:superRole.id }});
  for (const system of ['WEBSITE','SMART_PROSPECTUS','ICS_LIVE','SMART_LECTURER','AI_ELIBRARY','YOHPAL_BRAIN','YOHPAL_JOBS','YOHPAL_HUSTLE'] as any[]) {
    await prisma.systemAccess.upsert({ where:{ userId_system:{ userId:admin.id, system }}, update:{ enabled:true }, create:{ userId:admin.id, system, enabled:true }});
  }
}
main().finally(()=>prisma.$disconnect());
