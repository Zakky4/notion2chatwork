/**
 * 経過日を算出
 */
function remindDate(passage_day) {
  const today = new Date();
  // 経過日を計算
  const cal_date = today.setDate(today.getDate() - passage_day);
  const remindDay = Utilities.formatDate(
    new Date(cal_date),
    "JST",
    "yyyy-MM-dd"
  );
  return remindDay;
}
