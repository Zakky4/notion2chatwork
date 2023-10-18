/**
 * 問い合わせをNotionに登録しChatworkに通知
 */

// フォームのデータを送信
function requestForm(e) {
  // const values = e.values;
  // データをスプレッドシートから取得
  const values = getLine();

  // 登録日を変換
  const created = Utilities.formatDate(
    new Date(values[0]),
    "JST",
    "yyyy-MM-dd HH:mm"
  );

  // データをNotionに登録
  createPage(createPayload(values));

  // Chatwork用配列生成
  const chat = [
    values[1],
    values[2],
    values[3],
    values[4],
    values[5],
    "未対応",
    values[6],
  ];

  // Chatworkにメッセージを送信
  const remind_flg = 0;
  sendChatwork(chat[4], chat, created, remind_flg);
}

// 現在のアクティブシートを得る
function getSheet() {
  return SpreadsheetApp.getActiveSheet();
}

// スプレッドシートの最終行の（フォームの送信）データを取得
function getLine() {
  const sheet = getSheet();
  const line = sheet.getLastRow();
  return sheet.getRange("A" + line + ":G" + line).getValues()[0];
}
