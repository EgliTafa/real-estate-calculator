// Merr vlerën nga input-i ose 0 nëse nuk ekziston
function getVal(id) {
  const el = document.getElementById(id);
  return el ? parseFloat(el.value) || 0 : 0;
}

// Rikthe 0 nëse vlera nuk është përqindje valide
function perc(val) {
  return isNaN(val) || !isFinite(val) ? 0 : val;
}

function toggleInfo(button) {
  const info = button.parentElement.nextElementSibling;
  if (info && info.classList.contains("info")) {
    info.style.display = info.style.display === "block" ? "none" : "block";
  }
}

function calculate() {
  // INVESTIMI
  const vlera_prones = getVal("vlera_prones");
  const shpenzime_cmim = getVal("shpenzime_cmim");

  // KREDIA
  const vlera_kredise = getVal("vlera_kredise");
  const afati_kredise = getVal("afati_kredise");
  const interesi_vjetor = getVal("interesi_vjetor");
  const shpenzime_kredi = getVal("shpenzime_vjetore_kredi");
  const afati_muaj = afati_kredise * 12;

  let kesti_mujor = 0;
  let totali_interesit = 0;
  if (vlera_kredise > 0 && interesi_vjetor > 0 && afati_muaj > 0) {
    const r = interesi_vjetor / 100 / 12;
    kesti_mujor =
      (vlera_kredise * r * Math.pow(1 + r, afati_muaj)) /
      (Math.pow(1 + r, afati_muaj) - 1);
    totali_interesit = kesti_mujor * afati_muaj - vlera_kredise;
  }

  const pagesa_totale_prone = vlera_prones + shpenzime_cmim;
  const pagesa_totale_kredi = kesti_mujor * afati_muaj;
  const kosto_totale_investimi =
    pagesa_totale_prone + pagesa_totale_kredi + shpenzime_kredi;

  // QIRAJA
  const qira_mujore = getVal("qira_mujore_bruto");
  const muaj_qiraje = getVal("periudha_qerase");
  const tatimi_qiraje = qira_mujore * 0.15;
  const qiraja_neto = qira_mujore - tatimi_qiraje;
  const shpenzime_prone = getVal("shpenzime_vjetore_prone");
  const shpenzime_te_tjera_qira = getVal("shpenzime_vjetore_qira");
  const fitimi_total_qiraje =
    (qiraja_neto - shpenzime_te_tjera_qira - shpenzime_prone) * muaj_qiraje;

  // SHITJA
  const vlera_shitjes = getVal("vlera_shitjes");
  const shpenzime_shitje = getVal("shpenzime_shitje");
  const vlera_fituar = vlera_shitjes - vlera_kredise - vlera_prones;
  const tatimi_shitje = vlera_fituar * 0.15;
  const fitimi_shitjes_neto = vlera_fituar - tatimi_shitje - shpenzime_shitje;

  // PERFORMANCA & ROI
  const performanca_qerase_bruto = perc(
    ((qira_mujore * muaj_qiraje) / (vlera_prones + vlera_kredise)) * 100
  );
  const performanca_qerase_neto = perc(
    (fitimi_total_qiraje / (vlera_prones + vlera_kredise)) * 100
  );
  const roi_bruto = perc(
    ((fitimi_total_qiraje + vlera_fituar - kosto_totale_investimi) /
      kosto_totale_investimi) *
      100
  );
  const roi_neto = perc(
    ((fitimi_total_qiraje + fitimi_shitjes_neto - kosto_totale_investimi) /
      kosto_totale_investimi) *
      100
  );
  const performanca_vjetore_bruto = perc(
    ((fitimi_total_qiraje + vlera_fituar) / kosto_totale_investimi) * 100
  );
  const performanca_vjetore_neto = perc(
    ((fitimi_total_qiraje + fitimi_shitjes_neto) / kosto_totale_investimi) * 100
  );

  // SHFAQ REZULTATET
  document.getElementById("results").style.display = "block";
  document.getElementById("results").innerHTML = `
    <b>Kësti mujor:</b> €${kesti_mujor.toFixed(2)}<br>
    <b>Totali i interesit:</b> €${totali_interesit.toFixed(2)}<br>
    <b>Pagesa totale për pronë:</b> €${pagesa_totale_prone.toFixed(2)}<br>
    <b>Pagesa totale për kredi:</b> €${pagesa_totale_kredi.toFixed(2)}<br>
    <b>Kosto totale investimi:</b> €${kosto_totale_investimi.toFixed(2)}<br>
    <b>Fitimi nga qiraja:</b> €${fitimi_total_qiraje.toFixed(2)}<br>
    <b>Fitimi nga shitja (neto):</b> €${fitimi_shitjes_neto.toFixed(2)}<br>
    <b>ROI bruto:</b> ${roi_bruto.toFixed(2)}%<br>
    <b>ROI neto:</b> ${roi_neto.toFixed(2)}%<br>
    <b>Performanca qerase bruto:</b> ${performanca_qerase_bruto.toFixed(2)}%<br>
    <b>Performanca qerase neto:</b> ${performanca_qerase_neto.toFixed(2)}%<br>
    <b>Performanca vjetore bruto:</b> ${performanca_vjetore_bruto.toFixed(
      2
    )}%<br>
    <b>Performanca vjetore neto:</b> ${performanca_vjetore_neto.toFixed(2)}%<br>
  `;
}

// Ruaj në URL dhe hap link
function saveUrl() {
  const ids = [
    "vlera_prones",
    "shpenzime_cmim",
    "viti_blerjes",
    "vlera_kredise",
    "afati_kredise",
    "interesi_vjetor",
    "shpenzime_vjetore_kredi",
    "qira_mujore_bruto",
    "periudha_qerase",
    "shpenzime_vjetore_qira",
    "shpenzime_vjetore_prone",
    "vlera_shitjes",
    "viti_shitjes",
    "shpenzime_shitje",
  ];
  const query = ids
    .map(
      (id) => `${id}=${encodeURIComponent(document.getElementById(id).value)}`
    )
    .join("&");
  const url = `${window.location.pathname}?${query}`;
  navigator.clipboard
    .writeText(window.location.origin + url)
    .then(() => alert("Linku u kopjua!"));
}

// Ngarko vlerat nga URL
window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  params.forEach((v, k) => {
    const el = document.getElementById(k);
    if (el) el.value = v;
  });
};
