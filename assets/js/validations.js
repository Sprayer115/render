function validateArticle() {
    if(document.forms["article"]["name"].value == ""){
        alert("Name muss ausgefüllt sein");
        return false;
    }
    if(document.forms["article"]["description"].value == ""){
        alert("Beschreibung muss ausgefüllt sein");
        return false;
    }
    if(document.forms["article"]["price"].value == 0){
        alert("Preis muss ausgefüllt sein");
        return false;
    }
    let filter = document.forms["article"]["filter"].value;
    if(filter != "" && !filter.endsWith(";")){
        alert("Filter muss mit einem ';' enden");
        return false;
    }
}

function validateSize() {
    if(document.forms["size"]["name"].value == ""){
      alert("Name muss ausgefüllt sein");
      return false;
    }
    if(document.forms["size"]["article"].value > 0){
      alert("Artikel Bezug muss gesetzt sein, im Zweifel Seite neu aufrufen");
      return false;
    }
    if(document.forms["size"]["variant"].value > 0){
        alert("Varianten Bezug muss gesetzt sein, im Zweifel Seite neu aufrufen");
        return false;
      }
    if(document.forms["size"]["stock"].value < 0){
      alert("Bestand muss größer als 0 sein");
      return false;
    }
    let filter = document.forms["size"]["filter"].value;
    if(filter != "" && !filter.endsWith(";")){
      alert("Filter muss mit einem ';' enden");
      return false;
    }
  }

  function validateVariant() {
    if(document.forms["variant"]["name"].value == ""){
      alert("Name muss ausgefüllt sein");
      return false;
    }
    if(document.forms["variant"]["article"].value < 0){
      alert("Artikel Bezug muss gesetzt sein, im Zweifel Seite neu aufrufen");
      return false;
    }
    let filter = document.forms["variant"]["filter"].value;
    if(filter != "" && !filter.endsWith(";")){
      alert("Filter muss mit einem ';' enden");
      return false;
    }
  }

  function validateAdress() {
    if(document.forms["address"]["firstname"].value == ""){
      alert("Vorname muss ausgefüllt sein");
      return false;
    }
    if(document.forms["address"]["lastname"].value == ""){
      alert("Nachname muss ausgefüllt sein");
      return false;
    }
    if(document.forms["address"]["street"].value == ""){
      alert("Nachname muss ausgefüllt sein");
      return false;
    }
    if(document.forms["address"]["street_no"].value == "" && !document.forms["address"]["street_no"].value.startsWith("-")){
      alert("Nachname muss ausgefüllt sein");
      return false;
    }
    if(document.forms["address"]["city"].value == ""){
      alert("Nachname muss ausgefüllt sein");
      return false;
    }

    let zip = document.forms["address"]["zip"].value;
    if(zip != "" && !zip.endsWith(";")){
      alert("Filter muss mit einem ';' enden");
      return false;
    }
    if (!/^\d+$/.test(zip)) {
      alert("PLZ enthält ungültige Zeichen");
      return false;
    }
  }