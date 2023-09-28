export default function checkUserStatus(docs) {
  const documentos = ["Identificacion", "Comprobante de domicilio", "Estado de Cuenta"];
  let missing = [];
  let status = 200;
  for (let i = 0; i < docs.length; i++) {
    if (docs[i] === false) {
      missing.push(documentos[i]);
      status = 409;
    }
  }
  return { status, docs: missing };
}
