## Bibliotecas Utilizadas
dotenv -> carrega variáveis de ambientes armazenadas no .env, permitindo proteger dados
express -> utilizado para cirar o servidor HTTP e gerenciar as rotas
mongoose -> modela e gerencia a comunicação com o MongoDB
express-session -> gerencia sessões de usuário através de cookies, permitindo guardar dados temporários
connect-mongo -> Salva as sessões dentro do MongoDB
connect-flash -> biblioteca para criar as mensagens de feedback, são autodestrutivos(somem após a leitura)
helmet -> camada de segurança que configura diversos headers HTTP
csurf -> cria tokens CSRF(Cross-Site Request Forgery) para formulários, garante que nenhum site externo vai enviar requisições forçadas para o back
path -> biblioteca nativa para montar caminhos de forma segura, independente do SO

## Arquivos
server.js -> ponto central da aplicação, as conexões externas são iniciadas
routes.js -> centraliza todas rotas da aplicação, aqui são definidos os caminhos(URLs), e qual controller será responsável por executar cada ação
models.js -> representam os dados e a comunicação com o banco de dados
controller.js -> recebem a requisição e decidem o que fazer
