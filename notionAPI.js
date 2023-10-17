/**
 * Notion共通関数
 */

// Create Page API を呼び出す
function createPage(payload) {
    return sendNotion("pages", payload, "POST")
  }
  
  // Query Page API を呼び出す
  function queryPage() {
    const endpoint = `databases/${databaseID()}/query`;
    const payload = null;
    return sendNotion(endpoint, payload, "POST");
  }
  
// Notion に payload を send する
function sendNotion(url_sub, payload, method) {
const options = {
    "method": method,
    "headers": {
    "Content-type": "application/json",
    "Authorization": "Bearer " + notionAPIKey(),
    "Notion-Version": notionVersion(),
    },
    "payload": payload ? JSON.stringify(payload) : null
};
// デバッグ時にはコメントを外す
// Logger.log(options)
Utilities.sleep(400)
const url = "https://api.notion.com/v1/" + url_sub
// Logger.log(url);
// Logger.log(JSON.parse(UrlFetchApp.fetch(url, options)))
return JSON.parse(UrlFetchApp.fetch(url, options))
}
  