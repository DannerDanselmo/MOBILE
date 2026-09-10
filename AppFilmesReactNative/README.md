# App Lista de Filmes — React Native + Expo

Projeto desenvolvido para a atividade de Engenharia de Software — Disciplina de Soluções Mobile.

## O que o aplicativo faz

- Consome a API OMDb.
- Mostra uma lista de filmes.
- Permite pesquisar filmes.
- Usa React Navigation para navegar entre a tela de lista e a tela de detalhes.
- Usa React Native Paper para os componentes e a estilização.
- Mostra pôster, ano, nota, duração, sinopse, gênero, diretor e atores.

## 1. Criar o projeto Expo

No terminal:

```bash
npx create-expo-app@latest ListaFilmes
cd ListaFilmes
```

Depois substitua o `App.js` e crie as pastas `screens` e `services` usando os arquivos deste pacote.

## 2. Instalar as dependências

```bash
npm install @react-navigation/native @react-navigation/native-stack react-native-paper
npx expo install react-native-screens react-native-safe-area-context
```

Esses comandos seguem a instalação recomendada para Expo/React Navigation e React Native Paper.

## 3. Executar

```bash
npx expo start
```

Depois escaneie o QR Code com o Expo Go ou pressione `a` para abrir no Android.

## 4. GitHub

Depois de testar:

```bash
git init
git add .
git commit -m "Projeto lista de filmes com React Native"
git branch -M main
git remote add origin SEU_LINK_DO_GITHUB
git push -u origin main
```

## Observação sobre a API

A chave utilizada é a mesma fornecida no enunciado da atividade. Como ela fica dentro de um aplicativo mobile, ela não deve ser tratada como um segredo de produção. Para um projeto real, o ideal seria utilizar um backend/proxy e proteger a chave.

## Requisitos do enunciado atendidos

[ x ] API externa OMDb  
[ x ] Lista de filmes  
[ x ] React Navigation  
[ x ] React Native Paper  
[ x ] Navegação entre telas  
[ x ] Pesquisa de filmes  
[ x ] Tela de detalhes
