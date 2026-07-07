# Site — Movelaria Projeto A

Site institucional estático (HTML/CSS/JS puro, sem build), pronto para publicar
no **GitHub Pages**.

## Estrutura

```
├── index.html          → todo o conteúdo do site
├── css/styles.css       → estilos
├── js/main.js            → menu mobile, filtros da galeria, lightbox, formulário
└── images/               → fotos dos projetos (19 fotos, já otimizadas para web)
```

## Como publicar no GitHub Pages (passo a passo)

1. Crie um repositório novo no GitHub (ex.: `movelaria-projeto-a`).
2. Envie todos os arquivos desta pasta para a raiz do repositório
   (pode arrastar e soltar pela interface do GitHub, em "Add file → Upload files",
   ou usar `git`):
   ```bash
   git init
   git add .
   git commit -m "Site Movelaria Projeto A"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/movelaria-projeto-a.git
   git push -u origin main
   ```
3. No repositório, vá em **Settings → Pages**.
4. Em "Build and deployment", selecione **Source: Deploy from a branch**.
5. Em "Branch", selecione `main` e a pasta `/root`, depois clique em **Save**.
6. Após 1–2 minutos, o GitHub mostrará o link do site, algo como:
   `https://SEU-USUARIO.github.io/movelaria-projeto-a/`

## O que já está pronto

- Textos, endereço, telefone e e-mail da empresa.
- Botão de WhatsApp usando o telefone (11) 4453-9853 — se a empresa tiver um
  número de celular/WhatsApp diferente do fixo, é só trocar em `index.html`
  (busque por `wa.me/551144539853`) e em `js/main.js` não há necessidade de alterar nada.
- Galeria com as 19 fotos enviadas, organizadas por ambiente (Cozinhas, Salas &
  TV, Home Office, Banheiros & Lavabos), com filtro e ampliação (lightbox).
- Mapa com a localização (Rua Cabrália, 430, Vila Helena, Santo André — SP).
- Links para Facebook e Instagram da empresa.

## O que vale revisar/ajustar depois

- **Formulário de contato**: como o GitHub Pages não tem backend, o formulário
  hoje abre o e-mail do visitante já preenchido para `movelariaprojetoa@hotmail.com`.
  Se preferir receber os pedidos diretamente numa caixa de entrada (sem depender
  do app de e-mail do visitante), dá para conectar um serviço gratuito como o
  [Formspree](https://formspree.io/) — troque a tag `<form>` em `index.html`
  para apontar para o endpoint do Formspree.
- **Domínio próprio**: dá para usar um domínio como `movelariaprojetoa.com.br`
  apontando para o GitHub Pages (em Settings → Pages → Custom domain).
- **Fotos**: sempre que tiver fotos novas de projetos entregues, é só adicionar
  em `images/` e um novo bloco em `#galeryGrid` no `index.html`, seguindo o
  padrão dos blocos já existentes.
- **CNPJ**: não foi incluído no rodapé por não ter sido informado — se quiser
  exibir, adicione no `footer-grid` do `index.html`.
