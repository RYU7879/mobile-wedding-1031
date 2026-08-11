# 류성길 & 형가희 모바일 청첩장

GitHub Pages에서 바로 실행할 수 있는 모바일 우선 청첩장입니다.

## 파일 구조

```text
mobile-wedding-1031/
├─ index.html
├─ style.css
├─ script.js
├─ rsvp.gs
├─ main-photo.jpg
└─ images/
   └─ 사진 파일들
```

## 1. 가장 먼저 수정할 파일

**`script.js` 맨 위의 `WEDDING` 객체만 수정하면 됩니다.**

수정할 항목:

- `groom.name` : 신랑 이름
- `groom.parents` : 신랑 부모님 성함
- `groom.accountName` : 신랑 계좌
- `bride.name` : 신부 이름
- `bride.parents` : 신부 부모님 성함
- `bride.accountName` : 신부 계좌
- `date` : 날짜/시간
- `venue.name` : 예식장 이름
- `venue.address` : 주소
- `venue.parking` : 주차 안내
- `invitation` : 초대 문구
- `photos` : 사진 파일명
- `maps` : 지도 링크
- `RSVP_ENDPOINT` : 참석의사 전달용 Google Apps Script URL

## 2. 사진 넣기

현재 첫 화면은 기존 `main-photo.jpg`를 사용합니다.

추가 사진은 `images` 폴더에 넣고:

```js
photos: [
  "main-photo.jpg",
  "images/photo-01.jpg",
  "images/photo-02.jpg",
  "images/photo-03.jpg"
]
```

처럼 파일명을 맞춰주면 됩니다.

사진 파일이 아직 없으면 해당 사진 칸은 자동으로 숨겨집니다.

## 3. 참석의사 전달하기

화면의 참석의사 전달 폼은 기본적으로 **테스트 모드**입니다.

실제 하객의 응답을 받으려면:

1. Google Sheets 생성
2. `rsvp.gs` 내용을 Apps Script에 붙여넣기
3. 웹 앱으로 배포
4. 생성된 URL을 `script.js`의 `RSVP_ENDPOINT`에 입력
5. 실제 휴대폰에서 테스트 제출

응답은 Google Sheets에 쌓입니다.

## 4. GitHub Pages

Repository의 Settings → Pages에서:

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/ (root)`

로 설정합니다.

배포 후 생성되는 GitHub Pages 주소로 모바일 청첩장을 열면 됩니다.

## 5. 주의

계좌번호, 전화번호 등 민감한 정보는 공개 GitHub 저장소에 들어갑니다.
GitHub 저장소를 Public으로 유지할 경우 검색엔진/인터넷에 노출될 수 있으므로,
실제 배포 전에 이 부분을 고려하세요.

특히 계좌번호를 공개 저장소에 넣는 것이 싫다면
별도 서버/비공개 저장소/외부 폼을 사용하는 방법을 권장합니다.
