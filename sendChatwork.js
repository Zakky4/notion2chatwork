/**
 * Chatwork関数
 */

// Chatworkにメッセージを送信
function sendChatwork(room, item, created, remind_flg) {
  // トークンを取得
  const cw_token = chatworkToken();

  // ルームID
  let room_id = "";
  if (room === "はい") {
    // 【code4biz】サポート用
    room_id = "338413933";
  } else {
    // 【code4biz】営業用
    room_id = "338413911";
  }

  // チャットのタイトル生成
  let chat_title = "";
  if (remind_flg === 1) {
    chat_title = "未対応から２日以上経過しています";
  } else {
    chat_title = "問い合わせがありました";
  }
  // メッセージ生成
  let message = `${chat_title}
  ${item[0]}
  ${item[1]}
  ${item[2]}
  ${item[3]}
  ${item[4]}
  ${item[5]}
  ${item[6]}
  受付日： ${created}`;

  // メッセージを送信
  const client = ChatWorkClient.factory({ token: cw_token });
  client.sendMessage({
    room_id: room_id,
    body: message,
  });
}
