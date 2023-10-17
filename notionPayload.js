/**
 * Notion Payload 関数
 */

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
