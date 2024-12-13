# STACK

## FRONTEND

<div style="display: flex; justify-content: flex-start; flex-wrap: wrap; gap: 10px;">
  <div style="background-color: #5C6BC0; color: blue; padding: 10px 15px; border-radius: 5px;">TypeScript</div>
  <div style="background-color: #000; color: white; padding: 10px 15px; border-radius: 5px;">React</div>
  <div style="background-color: #4B9CD3; color: white; padding: 10px 15px; border-radius: 5px;">Vite</div>
  <div style="background-color: #CA4246; color: white; padding: 10px 15px; border-radius: 5px;">React Router</div>
  <div style="background-color: #5C6BC0; color: white; padding: 10px 15px; border-radius: 5px;">Axios</div>
  <div style="background-color: #38B2AC; color: pink; padding: 10px 15px; border-radius: 5px;">Tailwind CSS</div>
  <div style="background-color: #B0BEC5; color: black; padding: 10px 15px; border-radius: 5px;">Zustand</div>
  <div style="background-color: #B0BEC5; color: black; padding: 10px 15px; border-radius: 5px;">React Query</div>
  <div style="background-color: #B0BEC5; color: black; padding: 10px 15px; border-radius: 5px;">ESLint</div>
  <div style="background-color: #B0BEC5; color: black; padding: 10px 15px; border-radius: 5px;">Prettier</div>
  <div style="background-color: #B0BEC5; color: purple; padding: 10px 15px; border-radius: 5px;">Discord</div>
  <div style="background-color: #B0BEC5; color: purple; padding: 10px 15px; border-radius: 5px;">Zep</div>
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
