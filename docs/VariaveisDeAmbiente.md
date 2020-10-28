# Criando as Variáveis Globais

## Passo 1: Arquivo .env

Na raíz do projeto, crie um arquivo denominado ".env". Este arquivo contém as variáveis de ambiente necessárias para o projeto, podendo ser acessadas via código por "process.env.[NOME DA VARIÁVEL]".

## Passo 2: Consiga seu token para o MapBox

Crie uma conta no site <a href="https://www.mapbox.com/">MapBox</a> e copie seu Access Token. O Access Token pode ser encontrado na <a href="https://account.mapbox.com/">página inicial de sua conta</a>.

## Passo 3: Consiga sua API Key do Firebase

Crie uma conta no <a href="https://firebase.google.com/">Firebase</a> e inicie um novo projeto no <a href="https://console.firebase.google.com/">console</a>. Já no seu projeto, selecione "Adicionar App" e "Web App". Copie os dados do seu aplicativo para o arquivo <a href="https://github.com/JonathanLemes/gerenciador-comercio-reactjs/tree/main/src/services/firebaseConfig.ts">/src/services/firebaseConfig.ts</a>.
>**Nota:** Não acrescente o *apiKey*, pois o mesmo deve estar apenas na variável de ambiente, confome o passo 4.

## Passo 4: Adicione as variáveis de ambiente

No arquivo *.env* criado no *Passo 1*, acrescente as variáveis dos passos 2 e 3, com os nomes *REACT_APP_MAPBOX_TOKEN* e *REACT_APP_FIREBASE_API_KEY*, conforme em:
```
REACT_APP_MAPBOX_TOKEN=[CHAVE ADQUIRIDA NO PASSO 2]
REACT_APP_FIREBASE_API_KEY=[CHAVE ADQUIRIDA NO PASSO 3]
```

>**Nota:** As variáveis são adicionadas no ambiente por questões de segurança, portanto, o arquivo *.env* não é commitado ao Git conforme no <a href="https://github.com/JonathanLemes/gerenciador-comercio-reactjs/blob/main/.gitignore">.gitignore</a>. Caso deseje hospedar seu projeto, você pode adicionar as mesmas como variáveis de ambiente do servidor com os mesmos nomes.