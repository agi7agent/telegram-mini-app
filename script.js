function doPost(e) {
    const data = JSON.parse(e.postData.contents);
    const name = data.name;
    const phone = data.phone;

    // Записываем данные в таблицу
    const sheet = SpreadsheetApp.getActive().getSheetByName("Бронирования");
    sheet.appendRow([name, phone, new Date()]);

    return ContentService.createTextOutput("OK")
        .setMimeType(ContentService.MimeType.TEXT);
}
