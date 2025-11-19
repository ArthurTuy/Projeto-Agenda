require('dotenv').config({ path: './.env'}); // Variáveis de ambiente, utiliza o .env para guardar as senhas e etc

const express = require('express') // Framework de backend que simplifica a criação de aplicativos web e APIS
const app = express();

const mongoose = require('mongoose');  // Modela a nossa base de dados, garante que os dados são realmente os que queremos salvar, por isso criamos um schema(como deve ser o dado)
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log('Conectou no BD')
        app.emit('Pronto') // Emite um sinal quando a conexão está feita
    })
    .catch(e => console.log(e));
    
const session = require('express-session'); // Salva o cookie do cliente, para guardar informações

const MongoStore = require('connect-mongo'); // Sessoes são salvar dentro da base de dados

const flash = require('connect-flash'); // Mensagens autodestrutivas, após ler já dropadas

const routes = require('./routes.js') // As rotas da nossa aplicação /home   /contato

const path = require('path') // Caminhos

const helmet = require('helmet') // Segurança
const csrf = require('csurf')  // Tokens para o formulário, para sites externos nao conseguirem postar coisas

const { meuMiddleware, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware.js') // Middleware, funções executas na rota

app.use(helmet());

app.use(express.urlencoded({extended: true}));  // Permite postar formulário
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public'))); // Permite arquivos estáticos

const sessionOptions = session({  // Configurações de sessão
    secret: 'abcdefg',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})

app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views')); // Arquivos que renderizamos na tela
app.set('view-engine', 'ejs');

app.use(csrf());

app.use(meuMiddleware);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

app.on('Pronto', () => {  // Começa a ouvir requisições e executa o servidor somente depois do alert 
    app.listen(3000, () => {
    console.log('Acessar http://localhost:3000')
    console.log('Servidor executando na porta 3000')
});
})