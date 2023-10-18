/**
 * 未対応の状態で２日経過したらChatworkにリマインド通知
 */

function remindChat() {
  // Notion からデータを取得
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
      sendChatwork(item[4], item, created);
    }
  });
}
