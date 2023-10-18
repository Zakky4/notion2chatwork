/**
 * 問い合わせをNotionに登録しChatworkに通知
 */

// フォームのデータを送信
function requestForm(e) {
  const values = e.values;

  // 登録日を取得
  const created = Utilities.formatDate(
    new Date(values[0]),
    "JST",
    "yyyy-MM-dd HH:mm"
  );

  // データをNotionに登録
  createPage(createPayload(values));

  // Chatworkにメッセージを送信
  sendChatwork(values[5], values, created);
}
