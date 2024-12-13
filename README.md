# STACK

## FRONTEND

<div style="display: flex; justify-content: flex-start; flex-wrap: wrap; gap: 10px;">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/React_Router-CA4246?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Axios-5A29E3?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Zustand-B0BEC5?style=for-the-badge&logoColor=black" alt="Zustand" />
  <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="React Query" />
  <img src="https://img.shields.io/badge/ESLint-4B9CD3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
  <img src="https://img.shields.io/badge/Prettier-F7B93C?style=for-the-badge&logo=prettier&logoColor=black" alt="Prettier" />
  <img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white" alt="Discord" />
  <img src="https://img.shields.io/badge/Zep-2C2F33?style=for-the-badge&logoColor=white" alt="Zep" />
</div>
## 네이밍 컨벤션

1. **변수 네이밍**
   - 카멜 케이스를 사용하여 변수 이름을 작성합니다.
   - 예) `userProfile`, `itemList`, `orderHistory`

2. **커밋 메시지 작성**
   - 커밋 메시지 규칙에 따라 작성합니다. 이슈 번호와 타입, 내용을 명확하게 기재합니다.
   - 예) `#4 chore/README 파일 수정` 또는 `#5 chore/코드 주석 추가`

3. **브랜치 이름**
   - 브랜치 이름은 작업 내용을 요약하여 타입/작업 내용 요약 형식으로 작성합니다.
   - 예) `chore/updateReadme` 또는 `chore/refactorCode`

4. **PR 제목 및 내용**
   - PR 제목에는 작업 날짜를 포함하고, 내용에는 해당 날짜에 완료한 작업 목록을 나열합니다.
   - 예)
     ```
     제목: 2024-11-14
     내용:
     #4 - README 파일 수정
     #5 - 코드 주석 추가
     ```

5. **타입 사용**
   - 각 타입에 따라 적절한 명칭을 사용하여 작업의 성격을 명확히 합니다.
   - 예) `feat`, `fix`, `perf`, `chore` 등을 적절히 사용합니다.
     - `Feat`: 새로운 기능 추가
     - `Fix`: 버그 및 에러 수정
     - `Refactor`: 리팩토링
     - `Design`: CSS 및 UI 디자인 변경
     - `Test`: 테스트 코드 추가 및 수정
     - `Chore`: 기타
     - `Init`: 프로젝트 생성




## ESLint 및 Prettier 설정

### ESLint 설정

이 프로젝트에서는 ESLint를 사용하여 코드 품질을 관리합니다. 아래는 ESLint 설정 파일의 내용입니다.

1. **ESLint 설치**

   ESLint와 관련 패키지를 설치하세요.

   ```bash
   npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-config-prettier
   ```

2. **eslintrc.js 파일**

   프로젝트 루트에 `eslintrc.js` 파일을 생성하고 아래 내용을 추가합니다.

   ```javascript
   import js from '@eslint/js';
   import globals from 'globals';
   import reactHooks from 'eslint-plugin-react-hooks';
   import reactRefresh from 'eslint-plugin-react-refresh';
   import tseslint from '@typescript-eslint/eslint-plugin';

   export default {
     env: {
       browser: true,
       es2021: true,
     },
     extends: [
       'eslint:recommended',
       'plugin:react/recommended',
       'plugin:@typescript-eslint/recommended',
       'plugin:react-hooks/recommended',
       'prettier',
     ],
     parser: '@typescript-eslint/parser',
     parserOptions: {
       ecmaFeatures: {
         jsx: true,
       },
       ecmaVersion: 'latest',
       sourceType: 'module',
     },
     plugins: ['react', '@typescript-eslint', 'react-hooks', 'react-refresh'],
     rules: {
       'react-refresh/only-export-components': [
         'warn',
         { allowConstantExport: true },
       ],
       'react-hooks/exhaustive-deps': 'warn',
       'react/react-in-jsx-scope': 'off',
       'no-unused-vars': 'off',
       '@typescript-eslint/no-unused-vars': [
         'error',
         {
           vars: 'all',
           args: 'after-used',
           ignoreRestSiblings: true,
           argsIgnorePattern: '^_',
           varsIgnorePattern: '^_',
         },
       ],
     },
     settings: {
       react: {
         version: 'detect',
       },
       'import/resolver': {
         typescript: {},
       },
     },
     ignorePatterns: ['dist'],
   };
   ```

### Prettier 설정

Prettier를 사용하여 코드 포맷팅을 관리합니다. 아래와 같이 `.prettierrc` 파일을 생성합니다.

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 4,
  "trailingComma": "es5"
}
