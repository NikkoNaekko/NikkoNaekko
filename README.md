# 본 원격저장소 사용법

## node.js 설치를 하시고 vscode에서 작업하는 것을 추천한다.

> - Cntr + Shift + ` : 터미널 열기
> - npm i : package.json에 들어있는 node_moduels 설치
> - npm run start : 실행 명령어 ("script" 참조)

**프로젝트 실행 후 http://loaclhost:3000/** 링크를 [ctrl + Click]하거나 직접 브라우저에 url을 입력하면 출력 화면이 보입니다.

# 에러 사항

- 2021.09.08 Na [ DetailPage에 들어가면 스크롤이 자동으로 밑으로 가는 문제 ] 2021.09.10 Na [ DetailPage에 들어가면 스크롤이 자동으로 밑으로 가는 문제 해결 ]
- 2021.09.16 Ryu [ CartPage에 아이템이 중복되어 추가되는 문제 ] | 2021.09.17 Ryu [ CartPage 아이템 중복추가허용 문제 해결 ]
- 2021.09.24 Na [ DetailPage에서 likeButton이 제대로 동작하지 않은 문제 & MainPage에서 axios.get 함수가 여러 번 호출되 성능을 떨어뜨리는 문제 ]
- 2021.09.24 Na [ DetailPage에서 likeButton이 제대로 동작하지 않은 문제 해결 & MainPage에서 axios.get 함수가 여러 번 호출되 성능을 떨어뜨리는 문제 해결]
- 2021.09.24 Ryu [ TopBar 로고를 클릭해도 mainPage로 돌아가지 않는 문제 & 2021.09.24 Ryu TopBar 로고를 클릭해도 mainPage로 돌아가지 않는 문제 해결 ]
- 2021.09.28 Ryu [ RecommentResult에서 취향을 선택하지 않아도 버튼이 활성화되는 문제 & RecommentResult에서 취향을 선택하지 않아도 버튼이 활성화되는 문제 해결 ]

# 수정 사항

- 2021.09.01 Na [ 리액트 초기 설정 완료 ]
- 2021.09.02 Na [ Loading 페이지 및 메뉴바 구현완료 ]
- 2021.09.02 Ryu [ Login / Join 페이지 및 버튼 구현 완료 ]
- 2021.09.06 Ryu [ Recommend / RecommentResult 페이지 뷰 구현 완료 ]
- 2021.09.06 Na [ MainPage 구현 ]
- 2021.09.06 Na [ MainPage 요즘 뜨는 상품 / 신상품 섹션 구현 ]
- 2021.09.07 Na [ MainPage 즐겨찾기 섹션 구현 ]
- 2021.09.10 Na [ MainPage DetailPage 구현 ]
- 2021.09.10 Ryu [ Recommend / RecommendResult 페이지 구현 ]
- 2021.09.13 Na [ DetailPage ItemDescription & 좋아요 버튼 애니메이션 구현 ]
- 2021.09.16 Ryu [ Cart 페이지 구현 ]
- 2021.09.17 Ryu [ 검색바 애니메이션 구현 ]
- 2021.09.23 Na [ 옷 정보를 data.json에 저장 ] 특이사항 - port번호를 3000 -> 8080으로 수정( 이유 : json-server가 포트 3000번을 이용하기 때문 )
- 2021.09.23 Na [ dummy api 를 사용해 detail page와 MainPage의 newProduct 섹션 구현 완료 ]
- 2021.09.24 Na [ 검색 기능 구현 ]
- 2021.09.24 Ryu [ dummy api 를 사용해 JoinPage의 signUp 기능 구현 완료 ]
- 2021.09.24 Na [ 웹 성능 최적화 및 Detail Page문제 해결 ]
- 2021.09.27 Na [ dummy api 를 사용해 MainPage PopularProduct 섹션 구현 완료 ]
- 2021.09.27 Na [ 웹 성능 최적화 (외부 api 반복 수신 제거) ]
- 2021.09.29 Ryu [ RecommentResult 페이지 이미지 출력개수 증가 ]
- 2021.09.30 Na [ detailPage UI 변경 (스크롤 추가)]
- 2021.09.30 Na [ redux items.searchItems 추가 ]
- 2021.10.01 Na [ cartPage 구현 완료 및 cart redux 개선 ]
- 2021.10.01 Ryu [ dummy api와 user module의 likedItems값 동일화 기능 구현 완료 ]
- 2021.10.02 Na [ dummy api 를 사용해 cartPage 구현 완료 ]
- 2021.10.04 Na [ Prettier 적용 ]
- 2021.10.04 Na [ jsx 파일을 js파일로 변경 ]
