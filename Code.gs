// Configura: crea una hoja llamada "Respuestas" con cabeceras: timestamp, usuario, actividad, respuestas_json, meta
function doPost(e){
  try{
    const ss = SpreadsheetApp.openById('REEMPLAZA_CON_TU_SHEET_ID');
    const sh = ss.getSheetByName('Respuestas');
    const data = JSON.parse(e.postData.contents || '{}');
    sh.appendRow([
      new Date(),
      data.usuario || 'anonimo',
      data.actividad || '',
      JSON.stringify(data.respuestas || []),
      JSON.stringify(data.meta || {})
    ]);
    return ContentService.createTextOutput(JSON.stringify({ok:true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err){
    return ContentService.createTextOutput(JSON.stringify({ok:false, error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
