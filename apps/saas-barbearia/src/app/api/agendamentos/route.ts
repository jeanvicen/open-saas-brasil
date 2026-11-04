import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@open-saas/auth";
import {prisma} from "@open-saas/db";
import {z} from "zod";

const schema=z.object({
  clienteId:z.string().min(1),
  servico:z.string().trim().min(2).max(100),
  dataHora:z.string().datetime({offset:true}),
  valorCentavos:z.number().int().min(0).max(100000000),
});

export async function POST(request:Request){
  const session=await getServerSession(authOptions);
  const userId=session?.user?.id;
  if(!userId)return NextResponse.json({error:"Não autenticado"},{status:401});

  let raw:unknown;
  try{raw=await request.json()}catch{return NextResponse.json({error:"Envie dados válidos."},{status:400})}
  const parsed=schema.safeParse(raw);
  if(!parsed.success)return NextResponse.json({error:"Informe cliente, serviço, data e hora válidos e um valor não negativo."},{status:400});
  const dataHora=new Date(parsed.data.dataHora);
  if(dataHora.getTime()<=Date.now())return NextResponse.json({error:"Escolha um horário futuro."},{status:400});

  const cliente=await prisma.cliente.findFirst({where:{id:parsed.data.clienteId,userId},select:{id:true,nome:true}});
  if(!cliente)return NextResponse.json({error:"Cliente não encontrado nesta conta."},{status:404});

  const appointment=await prisma.agendamento.create({data:{
    userId,clienteId:cliente.id,clienteNome:cliente.nome,servico:parsed.data.servico,
    dataHora,valorCentavos:parsed.data.valorCentavos,
  }});
  return NextResponse.json({
    id:appointment.id,clienteNome:appointment.clienteNome,servico:appointment.servico,
    dataHora:appointment.dataHora.toISOString(),valorCentavos:appointment.valorCentavos,status:appointment.status,
  },{status:201});
}
