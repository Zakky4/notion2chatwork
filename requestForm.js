/**
 * 問い合わせをNotionに登録しChatworkに通知
 */

// フォームのデータを送信
function requestForm(e) {
  const values = e.values;
  // Logger.log(values);
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

// データを追加用payloadの生成
function createPayload(values) {
  return {
    parent: {
      database_id: databaseID(),
    },
    properties: {
      法人名: {
        title: [
          {
            type: "text",
            text: {
              content: values[1],
            },
          },
        ],
      },
      担当者名: {
        rich_text: [
          {
            type: "text",
            text: {
              content: values[2],
            },
          },
        ],
      },
      メールアドレス: {
        type: "email",
        email: values[3],
      },
      電話番号: {
        type: "phone_number",
        phone_number: values[4],
      },
      顧客タイプ: {
        type: "select",
        select: {
          name: values[5],
        },
      },
      対応状況: {
        type: "select",
        select: {
          name: "未対応",
        },
      },
      問い合わせ内容: {
        rich_text: [
          {
            type: "text",
            text: {
              content: values[6],
            },
          },
        ],
      },
    },
  };
}
