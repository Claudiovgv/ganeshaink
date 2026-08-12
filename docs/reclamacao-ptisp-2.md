Obrigado pela investigação anterior. Venho juntar mais dois pontos a este pedido.

## 1. Pedido imediato: correr o pull manualmente

Como já ficou demonstrado que a conectividade e o repositório estão corretos (o vosso próprio teste com `git ls-remote origin` funcionou), agradecia que corressem diretamente o seguinte, para eu poder continuar o meu trabalho:

```
cd /home/ganesha/ganeshaink && git fetch origin main && git reset --hard origin/main
```

O working tree está limpo, sem alterações locais por commitar, por isso esta operação é segura.

## 2. O "Update from Remote" devia simplesmente funcionar

Preciso de deixar claro que isto não é uma solução — é um paliativo. O "Update from Remote" é uma funcionalidade standard do cPanel, apresentada como self-service, precisamente para eu não depender de ninguém para publicar atualizações no meu próprio site. Não faz sentido nenhum eu ter de abrir um ticket e esperar por um técnico sempre que preciso de atualizar o projeto — isso não é um alojamento funcional, é um alojamento que preciso de pedir autorização para usar.

Peço uma explicação técnica concreta de por que motivo esta funcionalidade do cPanel falha consistentemente nesta conta, e uma correção definitiva — não só o pull manual de hoje.

## 3. Outro problema relacionado: Node.js Selector

As 3 aplicações Node.js (backend, backoffice, frontend) da conta cPanel "ganesha" também ficaram com o registo interno de domínio corrompido, provavelmente pela mesma alteração ao domínio principal da conta. O site funciona (contornei manualmente via `.htaccess`), mas a interface "Setup Node.js App" não deixa gerir as aplicações — ao tentar "Restart", "Run NPM Install" ou editar, aparece:

"No such domain: api.ganeshaink.pt.ganeshaink.pt"
(e equivalente para admin.ganeshaink.pt.ganeshaink.pt e ganeshaink.pt.ganeshaink.pt)

Peço que corrijam este registo interno (algo como /var/cpanel/userdata/ganesha/cache) para as 3 aplicações, associando-as aos domínios corretos: backend → api.ganeshaink.pt, backoffice → admin.ganeshaink.pt, frontend → ganeshaink.pt.

## 4. Insatisfação geral com o plano de alojamento

Aproveito para deixar registada uma insatisfação mais ampla. Pago atualmente perto de 400€/ano por este alojamento de revenda e, na prática, não estou a conseguir usá-lo para o que precisava: publicar e manter um site próprio de forma autónoma. Entre a falta de SSH incluído, esta funcionalidade de Git avariada, e a necessidade de recorrer a suporte para tarefas básicas de gestão do meu próprio alojamento, sinto que o serviço não está a corresponder ao valor pago.

Gostava de perceber que alternativas têm dentro da vossa oferta, para um valor mensal semelhante ao que já pago, que sirvam melhor o meu caso: um alojamento de revenda com cPanel, preparado para alojar sites deste tipo (Node.js + MySQL) para clientes meus — inicialmente cerca de 10 contas/clientes, com possibilidade de crescer até 20 no futuro. Interessa-me sobretudo que inclua as ferramentas de deploy/gestão a funcionar de forma fiável sem custos ou aprovações adicionais para cada coisa.

Aguardo o vosso retorno, tanto à parte técnica urgente (pontos 1 e 3) como à questão sobre alternativas de plano (ponto 4).
