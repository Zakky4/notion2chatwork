// フォームのデータを送信
function requestForm(e) {
    const values = e.values;
    // Logger.log(values);
    // データをNotionに登録
    createPage(createPayload(values));
  
    // Chatworkにメッセージを送信
    const cw_token = chatworkToken();
  
    // ルームID
    let room_id = '';
    if (values[5] === 'はい') {
      // 【code4biz】サポート用
      room_id = '338413933';
    } else {
      // 【code4biz】営業用
      room_id = '338413911';
    }
  
    // メッセージ生成
    const message =
      `${values[1]}\n
  ${values[2]}\n
  ${values[3]}\n
  ${values[4]}\n
  ${values[5]}\n
  ${values[6]}\n`;
  
    const client = ChatWorkClient.factory({ token: cw_token });
    client.sendMessage({
      room_id: room_id,
      body: message
    });
  
  }
  
  // 未対応が２日経過したらリマインド
  function remindChat() {
    const objects = queryPage();
    const results = objects.results;
    const values = [];
    results.forEach((result, index) => {
      let property = result.properties;
      // Logger.log(property);
      let value = [
        property['法人名'].title[0].plain_text,
        property['担当者名'].rich_text[0].plain_text,
        property['メールアドレス'].email,
        property['電話番号'].phone_number,
        property['顧客タイプ'].select.name,
        property['対応状況'].select.name,
        property['問い合わせ内容'].rich_text[0].plain_text,
        property['問い合わせ日時'].created_time
      ];
      values.push(value);
    });
    // Logger.log(values);
  
    // 2日経過を算出
    const today = new Date();
    // Logger.log(today);
    const cal_date = today.setDate(today.getDate() - 2);
    // Logger.log(cal_date);
    const remindDay = Utilities.formatDate(new Date(cal_date), "JST", "yyyy-MM-dd");
    // Logger.log(remindDay);
  
    values.forEach((item, index) => {
      // 登録日を取得
      const created = Utilities.formatDate(new Date(item[7]), "JST", "yyyy-MM-dd");
      // 未対応状態で２日以上経過していたらメッセージ送信
      if (created <= remindDay && item[5] == '未対応') {
        Logger.log(item[6]);
        // Logger.log(created);
  
        // Chatworkにメッセージを送信
        const cw_token = chatworkToken();
  
        // ルームID
        let room_id = '';
        if (item[4] === 'はい') {
          // 【code4biz】サポート用
          room_id = '338413933';
        } else {
          // 【code4biz】営業用
          room_id = '338413911';
        }
  
        // メッセージ生成
        let message =
          `未対応から２日以上経過しています
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
          body: message
        });
  
      }
  
    })
  
  }
  
  // データを追加用payloadの生成
  function createPayload(values) {
    return {
      "parent": {
        "database_id": databaseID(),
      },
      "properties": {
        "法人名": {
          "title": [
            {
              "type": "text",
              "text": {
                "content": values[1]
              }
            }
          ]
        },
        "担当者名": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": values[2]
              }
            }
          ]
        },
        "メールアドレス": {
          "type": "email",
          "email": values[3]
        },
        "電話番号": {
          "type": "phone_number",
          "phone_number": values[4]
        },
        "顧客タイプ": {
          "type": "select",
          "select": {
            "name": values[5],
          }
        },
        "対応状況": {
          "type": "select",
          "select": {
            "name": "未対応",
          }
        },
        "問い合わせ内容": {
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": values[6]
              }
            }
          ]
        },
      }
    }
  }
  