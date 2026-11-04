import {getServerSession} from "next-auth";
import {authOptions} from "@open-saas/auth";
import {prisma} from "@open-saas/db";
import {redirect} from "next/navigation";
import {Agendamentos} from "../../components/agendamentos";

export default async function Page(){
  const session=await getServerSession(authOptions);
  if(!session?.user?.id)redirect("/login");
  const now=new Date();
  const [clients,appointments]=await Promise.all([
    prisma.cliente.findMany({where:{userId:session.user.id},orderBy:{nome:"asc"},select:{id:true,nome:true}}),
    prisma.agendamento.findMany({where:{userId:session.user.id,dataHora:{gte:now}},orderBy:{dataHora:"asc"},take:30}),
  ]);
  return <section>
    <h1 className="text-3xl font-bold">Agendamentos</h1>
    <p className="mt-2 text-stone-600">Organize os próximos horários. Só clientes da sua conta podem ser agendados.</p>
    <Agendamentos clients={clients} initial={appointments.map(a=>({id:a.id,clienteNome:a.clienteNome,servico:a.servico,dataHora:a.dataHora.toISOString(),valorCentavos:a.valorCentavos,status:a.status}))}/>
  </section>;
}
