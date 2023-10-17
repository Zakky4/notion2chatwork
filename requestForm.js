/**
 * 問い合わせをNotionに登録しChatworkに通知
 */

// フォームのデータを送信
function requestForm(e) {
  const values = e.values;
  // データをNotionに登録
  createPage(createPayload(values));

  // Chatworkにメッセージを送信
  const cw_token = chatworkToken();

  // ルームID
  let room_id = "";
  if (values[5] === "はい") {
    // 【code4biz】サポート用
    room_id = "338413933";
  } else {
    // 【code4biz】営業用
    room_id = "338413911";
  }

  // メッセージ生成
  const message = `${values[1]}\n
${values[2]}\n
${values[3]}\n
${values[4]}\n
${values[5]}\n
${values[6]}\n`;

  const client = ChatWorkClient.factory({ token: cw_token });
  client.sendMessage({
    room_id: room_id,
    body: message,
  });
}
