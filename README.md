# Gerenciador de clientes em React JS
![JavaScript](https://github.com/MikeCodesDotNET/ColoredBadges/blob/master/svg/dev/languages/js.svg)
![NodeJS](https://github.com/MikeCodesDotNET/ColoredBadges/blob/master/svg/dev/frameworks/nodejs.svg)
![ReactJS](https://github.com/MikeCodesDotNET/ColoredBadges/blob/master/svg/dev/frameworks/react.svg)

## Descrição

Gerenciador para comércios utilizando React JS e Firebase (Cloud Firestore), inicialmente desenvolvido para a <a href="https://www.instagram.com/ale_esquina.do.frango.guara/">Esquina do Frango</a>, de Guaratinguetá - SP. O projeto foi criado com base no app Happy, da <a href="https://nextlevelweek.com/">Next Level Week</a> #3, da <a href="https://rocketseat.com.br/">Rocketseat</a>.

<div style="text-align:center">
[![Landing](https://github.com/JonathanLemes/gerenciador-comercio-reactjs/blob/main/docs/images/Poster.png)](https://thumbs.gfycat.com/SatisfiedRemorsefulLhasaapso-mobile.mp4)
</div>

---

## Primeiros Passos

1. Instale em sua máquina <a href="https://nodejs.org/en/download/">Node JS</a> e o gerenciador de pacotes <a href="https://classic.yarnpkg.com/pt-BR/docs/install/#windows-stable">Yarn</a>.
2. A partir da página raiz do projeto, execute o comando: 
```bash
yarn install
```
3. <a href="https://github.com/JonathanLemes/gerenciador-comercio-reactjs/tree/main/docs/VariaveisDeAmbiente.md">Crie as variáveis de ambiente necessárias</a>.
4. <a href="https://github.com/JonathanLemes/gerenciador-comercio-reactjs/tree/main/docs/FirebaseCloudFirestore.md">Crie seu banco de dados Firebase Cloud Firestore</a>.
5. <a href="https://github.com/JonathanLemes/gerenciador-comercio-reactjs/tree/main/docs/UsersFirebase.md">Autorize novos usuários</a>.

---

## Uso do app

Após a execução dos <a href="https://github.com/JonathanLemes/gerenciador-comercio-reactjs#primeiros-passos">Primeros Passos</a>, novos clientes podem ser adicionados através do botão "Adicionar cliente", no canto inferior direito da <a href="https://github.com/JonathanLemes/gerenciador-comercio-reactjs/blob/main/src/pages/MapScreen.tsx">página do mapa</a>. Uma vez que todos os clientes estejam adicionados, novos pedidos são cadastrados com a adição do número do cliente ao mapa, com uma visualização das próximas entregas na mesma e histórico no botão "Pedidos anteriores".
Todos os pedidos são acompanhados de notas .PDF criados pelo arquivo <a href="https://github.com/JonathanLemes/gerenciador-comercio-reactjs/blob/main/src/components/CreatePDF.tsx">CreatePDF.tsx</a>.
>**Nota:** A função *getDocument()* do <a href="https://github.com/JonathanLemes/gerenciador-comercio-reactjs/blob/main/src/components/CreatePDF.tsx">CreatePDF.tsx</a> recebe como parâmetro um *array* de Pedido, portanto, caso deseje criar mais de uma comanda por requisição, é possível adaptar a mesma função de acordo com a quantidade.

---

## Direitos e notas do criador

Como um código aberto, sinta-se livre para adaptá-lo para quaisquer comércios, além de estudá-lo e melhorá-lo para um maior conhecimento do mercado de Web Apps. Lembre-se de apoiar comércios menores e toda a comunidade de desenvolvimento. Para maiores dúvidas, estou disponível na aba de <a href="https://github.com/JonathanLemes/gerenciador-comercio-reactjs/issues">Issues</a> do projeto.

---

### Criado por: Jonathan Fillipe Lemes