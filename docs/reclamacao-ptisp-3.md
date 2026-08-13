Já com acesso SSH, investiguei diretamente a causa do erro "Update from Remote", chamando a mesma API interna do cPanel que o botão da interface usa (UAPI). O resultado é conclusivo — não é um problema aplicacional nosso, é uma falha na própria instalação do cPanel neste servidor.

Ao correr `uapi Git update_repository` ou mesmo `uapi Git list_repositories` (uma simples listagem, que não altera nada), ambas falham com o mesmo erro:

```
Failed to load module "Git": The system failed to load the module "Cpanel::API::Git"
because of an error: Can't locate Cpanel/API/Git.pm in @INC
(you may need to install the Cpanel::API::Git module)
```

Ou seja: o ficheiro do módulo Perl `Cpanel::API::Git`, que implementa toda a funcionalidade de Git Version Control do cPanel (incluindo "Update from Remote" e "Deploy"), está em falta na instalação do cPanel neste servidor. Isto explica por que qualquer ação de Git falha sempre, consistentemente, independentemente do repositório, remote ou branch usados — porque o módulo que processa o pedido nem sequer consegue carregar.

Peço que reportem isto à vossa equipa de sistemas/infraestrutura como uma falha na instalação do cPanel (módulo em falta), para que reinstalem ou reparem o pacote `Cpanel::API::Git` no servidor cpp77.webserver.pt. Isto não é algo que possamos corrigir do nosso lado — nem recriando o repositório, nem de nenhuma outra forma pela nossa conta, porque a falha está no próprio módulo que o cPanel usa para processar qualquer pedido de Git, antes mesmo de chegar ao nosso repositório.
