/**
 * 各サービスのAPIトークン
 */

// スクリプトプロパティを取得
function scriptPropertyFor(key) {
    return PropertiesService.getScriptProperties().getProperty(key);
}

// NOTION_API_KEYを取得
function notionAPIKey() {
    return scriptPropertyFor("NOTION_API_KEY")
}

// NOTION_VERSIONを取得
function notionVersion() {
    return scriptPropertyFor("NOTION_VERSION")
}

// DATBASE_IDを取得
function databaseID() {
    return scriptPropertyFor("DATBASE_ID")
}

// CHATWORK_TOKENを取得
function chatworkToken() {
    return scriptPropertyFor("CHATWORK_TOKEN")
}