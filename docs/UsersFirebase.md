# Autorizando novos usuários

## Passo 1: Configurando método de login

Dado que as <a href="https://github.com/JonathanLemes/gerenciador-comercio-reactjs/tree/main/docs/VariaveisDeAmbiente.md">variáveis de ambiente foram criadas</a> e o projeto iniciado no <a href="https://console.firebase.google.com/">console</a>, acrescente um método de autenticação "E-mail/senha" na aba *Authentication*.

## Passo 2: Adicionando usuários

O projeto do <a href="https://github.com/JonathanLemes/gerenciador-comercio-reactjs">gerenciador para comércios</a> ainda não possui uma área para cadastro de usuários, portanto, novos usuários devem ser acrescentados diretamente no Banco de Dados.
Para acrescentá-los, selecione *Adicionar usuário* na aba *Authentication* e acrescente o E-mail e Senha de seu usuário.

>**Desafio:** Como desafio para seu sistema, deixo uma tela de <a href="https://github.com/JonathanLemes/gerenciador-comercio-reactjs/tree/main/docs/UsersFirebase.md#passo-2-adicionando-usuários">Criação de Usuários</a>. A tela pode seguir o mesmo padrão da página <a href="https://github.com/JonathanLemes/gerenciador-comercio-reactjs/blob/main/src/pages/AddClient.tsx">AddClient.tsx</a>.