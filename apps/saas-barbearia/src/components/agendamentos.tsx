"use client";
import {useState} from "react";
import {Button,Field} from "@open-saas/ui";

type Client={id:string;nome:string};
type Appointment={id:string;clienteNome:string;servico:string;dataHora:string;valorCentavos:number;status:string};
const money=(cents:number)=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(cents/100);
function localInputValue(date:Date){const local=new Date(date.getTime()-date.getTimezoneOffset()*60000);return local.toISOString().slice(0,16)}

export function Agendamentos({clients,initial}:{clients:Client[];initial:Appointment[]}){
  const [items,setItems]=useState(initial);
  const [clienteId,setClienteId]=useState("");
  const [servico,setServico]=useState("");
  const [dataHora,setDataHora]=useState("");
  const [valor,setValor]=useState("");
  const [erro,setErro]=useState("");
  const [busy,setBusy]=useState(false);
  const [notice,setNotice]=useState("");
  async function submit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();setErro("");setNotice("");
    const parsed=Number(valor.replace(",","."));
    if(!Number.isFinite(parsed)||parsed<0||!/^(?:\d{1,8})(?:[.,]\d{1,2})?$/.test(valor)){setErro("Informe um valor igual ou maior que zero, com até duas casas decimais.");return}
    setBusy(true);
    try{
      const response=await fetch("/api/agendamentos",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({clienteId,servico,dataHora:new Date(dataHora).toISOString(),valorCentavos:Math.round(parsed*100)})});
      const body=await response.json();
      if(!response.ok)throw new Error(body.error||"Não foi possível criar o agendamento.");
      setItems(current=>[...current,body].sort((a,b)=>Date.parse(a.dataHora)-Date.parse(b.dataHora)));
      setServico("");setDataHora("");setValor("");setNotice("Agendamento criado.");
    }catch(error){setErro(error instanceof Error?error.message:"Não foi possível criar o agendamento.")}finally{setBusy(false)}
  }
  const minDate=localInputValue(new Date(Date.now()+60_000));
  return <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
    <section aria-labelledby="upcoming-title" className="rounded-2xl border border-stone-200 bg-white p-5">
      <h2 id="upcoming-title" className="text-lg font-bold">Próximos horários <span className="font-normal text-stone-500">({items.length})</span></h2>
      {items.length===0?<div className="mt-4 rounded-xl bg-stone-50 p-4"><p className="font-medium">Nenhum próximo agendamento.</p><p className="mt-1 text-sm text-stone-600">Cadastre um horário no formulário ao lado.</p></div>:<ul className="mt-3 divide-y divide-stone-200">{items.map(item=><li key={item.id} className="py-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
        <div className="min-w-0"><p className="font-semibold">{item.clienteNome} <span className="font-normal text-stone-600">· {item.servico}</span></p><p className="mt-1 text-sm text-stone-600">{new Intl.DateTimeFormat("pt-BR",{dateStyle:"medium",timeStyle:"short"}).format(new Date(item.dataHora))} · {money(item.valorCentavos)}</p></div>
        <span className="mt-2 inline-flex min-h-8 items-center rounded-full bg-emerald-50 px-3 text-sm font-medium text-emerald-900 sm:mt-0">{item.status}</span>
      </li>)}</ul>}
      {items.length===30&&<p className="mt-3 text-sm text-stone-500">Mostrando os 30 próximos horários.</p>}
    </section>
    <form onSubmit={submit} className="grid content-start gap-4 rounded-2xl border border-stone-200 bg-white p-5">
      <h2 className="text-lg font-bold">Novo agendamento</h2>
      {clients.length===0?<div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-950"><p>Cadastre um cliente antes de criar um horário.</p><a className="mt-2 inline-block min-h-11 font-semibold underline" href="/clientes">Ir para clientes</a></div>:<>
        <label className="grid gap-1.5 text-sm font-medium text-stone-700">Cliente <select required value={clienteId} onChange={e=>setClienteId(e.target.value)} className="min-h-11 rounded-xl border border-stone-300 bg-white px-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"><option value="">Selecione um cliente</option>{clients.map(client=><option key={client.id} value={client.id}>{client.nome}</option>)}</select></label>
        <Field label="Serviço" required minLength={2} maxLength={100} value={servico} onChange={e=>setServico(e.target.value)}/>
        <Field label="Data e hora" type="datetime-local" required min={minDate} value={dataHora} onChange={e=>setDataHora(e.target.value)}/>
        <Field label="Valor (R$)" type="text" inputMode="decimal" placeholder="Ex.: 45,00" required value={valor} onChange={e=>setValor(e.target.value)}/>
        {erro&&<p role="alert" className="text-sm text-red-800">{erro}</p>}
        {notice&&<p role="status" className="text-sm text-emerald-900">{notice}</p>}
        <Button disabled={busy}>{busy?"Salvando…":"Criar agendamento"}</Button>
      </>}
      {clients.length===0&&notice&&<p role="status" className="text-sm text-emerald-900">{notice}</p>}
      <p className="text-xs leading-5 text-stone-500">Horários são registrados nesta conta. Alterar, cancelar e confirmar pagamento ainda não estão disponíveis.</p>
    </form>
  </div>;
}
