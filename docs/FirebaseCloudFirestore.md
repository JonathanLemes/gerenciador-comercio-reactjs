# Criando o Banco de Dados no Firebase Cloud Firestore

## Passo 1: Iniciando um Cloud Firestore

Dado que as <a href="https://github.com/JonathanLemes/gerenciador-comercio-reactjs/tree/main/docs/VariaveisDeAmbiente.md">variáveis de ambiente foram criadas</a> e o projeto iniciado no <a href="https://console.firebase.google.com/">console</a>, crie um banco na aba *Cloud Firestore*.

## Passo 2: Criando os Produtos

O projeto do <a href="https://github.com/JonathanLemes/gerenciador-comercio-reactjs">gerenciador para comércios</a> ainda não possui uma área para cadastro de produtos, portanto, os produtos devem ser acrescentados diretamente no Banco de Dados.
Para acrescentá-los, selecione *Iniciar Coleção*, em seu Cloud Firestore, e nomeie-a como "Produtos". Em seguida, adicione cada produto como um documento (em *Adicionar documento*), com um campo *price* (number). O nome do documento será o nome do produto, e o campo *price* seu preço, como um número real.
Sinta-se livre para acrescentar quantos produtos desejar.

>**Desafio:** Como desafio para seu sistema, deixo uma tela de <a href="https://github.com/JonathanLemes/gerenciador-comercio-reactjs/tree/main/docs/FirebaseCloudFirestore.md#passo-2-criando-os-produtos">Criação de Produtos</a>. A tela pode seguir o mesmo padrão da página <a href="https://github.com/JonathanLemes/gerenciador-comercio-reactjs/blob/main/src/pages/AddClient.tsx">AddClient.tsx</a>.