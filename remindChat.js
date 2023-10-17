/**
 * 未対応の状態で２日経過したらChatworkにリマインド通知
 */

function remindChat() {
  const objects = queryPage();
  const results = objects.results;
  const values = [];
  results.forEach((result, index) => {
    let property = result.properties;
    // Logger.log(property);
    let value = [
      property["法人名"].title[0].plain_text,
      property["担当者名"].rich_text[0].plain_text,
      property["メールアドレス"].email,
      property["電話番号"].phone_number,
      property["顧客タイプ"].select.name,
      property["対応状況"].select.name,
      property["問い合わせ内容"].rich_text[0].plain_text,
      property["問い合わせ日時"].created_time,
    ];
    values.push(value);
  });
  // Logger.log(values);

  values.forEach((item, index) => {
    // 登録日を取得
    const created = Utilities.formatDate(
      new Date(item[7]),
      "JST",
      "yyyy-MM-dd"
    );
    // 未対応状態で２日以上経過していたらメッセージ送信
    if (created <= remindDate(2) && item[5] == "未対応") {
      // Chatworkにメッセージを送信
      const cw_token = chatworkToken();

      // ルームID
      let room_id = "";
      if (item[4] === "はい") {
        // 【code4biz】サポート用
        room_id = "338413933";
      } else {
        // 【code4biz】営業用
        room_id = "338413911";
      }

      // メッセージ生成
      let message = `未対応から２日以上経過しています
  ${item[0]}
  ${item[1]}
  ${item[2]}
  ${item[3]}
  ${item[4]}
  ${item[5]}
  ${item[6]}
  受付日： ${created}`;

      const client = ChatWorkClient.factory({ token: cw_token });
      client.sendMessage({
        room_id: room_id,
        body: message,
      });
    }
  });
}
