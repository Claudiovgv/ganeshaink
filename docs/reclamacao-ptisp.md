# Reclamação para a PTiSP

Assunto: Ligação de saída bloqueada (Git Version Control) + reclamação sobre limitações do alojamento de revenda

Exmos. Senhores,

Sou cliente de um alojamento de revenda (Revenda Linux Starter V2 — conta 4085.pt / conta cPanel "ganesha", domínio ganeshaink.pt) e venho reportar um problema técnico concreto, aproveitando também para deixar uma reclamação sobre as limitações que este plano me tem vindo a impor.

## Problema técnico

A ferramenta "Git™ Version Control" do cPanel, que uso para publicar atualizações do meu site (ganeshaink.pt) a partir de um repositório no GitHub, está a falhar consistentemente com o erro:

"The system could not contact the remote repository."

Isto acontece tanto na ação "Update from Remote" como ao tentar instalar módulos Node.js (npm install), sempre que a operação precisa de contactar serviços externos. Confirmei que:

- O GitHub está online e acessível (testado diretamente, resposta HTTP 200).
- O repositório e o URL remoto configurado no cPanel (https://github.com/Claudiovgv/ganeshaink.git) estão corretos.
- O branch configurado (main) está correto.
- Tentei mais de 10 vezes, em momentos diferentes, com o mesmo resultado.

Isto usa ligação HTTPS (porta 443) de saída do servidor cpp77.webserver.pt para o github.com — não tem relação com o acesso SSH (porta 22/22022) mencionado no vosso último email sobre segurança, mas é possível que faça parte da mesma vaga de alterações à firewall/política de segurança que referem nesse email.

**Pergunta direta:** a nova política de segurança implementada nos servidores partilhados bloqueou ou limitou ligações de saída HTTPS do servidor para serviços externos como o GitHub? Se sim, preciso que seja libertada a ligação de saída para github.com (porta 443) a partir da conta "ganesha", ou que me indiquem outra forma suportada de publicar código no meu próprio alojamento.

## Reclamação

Independentemente da resolução técnica acima, quero deixar registada a minha insatisfação com o nível de autonomia que este plano de revenda me permite:

- Não tenho acesso SSH incluído — é um serviço adicional pago (26,65€ + IVA por conta cPanel), que ainda exige abertura de ticket, configuração de chaves e autorização prévia de IP.
- Sem SSH, dependo inteiramente de ferramentas do cPanel (como o Git Version Control) para publicar as minhas próprias aplicações — e é precisamente essa ferramenta que está agora a falhar, sem alternativa viável da minha parte.
- Isto deixa-me sem qualquer via própria para publicar ou atualizar o meu projeto, apesar de pagar por um serviço de alojamento que devia permitir exatamente isso.

Pergunto diretamente: pelo valor que pago mensalmente/anualmente por este alojamento de revenda, o que é que o plano efetivamente me permite fazer de forma autónoma, sem depender de aprovações, tickets adicionais ou serviços pagos à parte? Se a resposta for "muito pouco sem custos adicionais", gostaria de perceber que opções tenho — seja um upgrade de plano que inclua o necessário para gerir e publicar os meus próprios projetos, seja outra solução.

Agradeço uma resposta técnica ao problema da ligação de saída o mais rápido possível, dado que me impede de publicar atualizações já prontas no meu site, e uma resposta clara à questão sobre o que está efetivamente incluído no meu plano atual.

Com os melhores cumprimentos,
Cláudio Vieira
