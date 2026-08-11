/*
  ============================================================
  참석의사 전달용 Google Apps Script
  ============================================================

  1. Google Drive에서 Google Sheets를 하나 만듭니다.
  2. 첫 번째 시트 이름은 RSVP로 둡니다.
  3. 확장 프로그램 → Apps Script
  4. 아래 코드를 붙여넣습니다.
  5. 배포 → 새 배포 → 웹 앱
     - 실행 사용자: 나
     - 액세스: 모든 사용자
  6. 생성된 웹 앱 URL을 script.js의 WEDDING.RSVP_ENDPOINT에 넣습니다.

  ※ 실제 사용 전 테스트 제출을 1~2번 해보세요.
*/

const SHEET_NAME = "RSVP";

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const data = JSON.parse(e.postData.contents);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "접수시간",
        "성함",
        "연락처",
        "참석여부",
        "참석인원",
        "전달사항",
        "신랑",
        "신부",
        "예식일"
      ]);
    }

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.phone || "",
      data.attendance || "",
      data.guestCount || "",
      data.message || "",
      data.groom || "",
      data.bride || "",
      data.weddingDate || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: String(error)
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
