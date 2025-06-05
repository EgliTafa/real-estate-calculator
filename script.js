// Merr vlerën nga input-i ose 0 nëse nuk ekziston
function getVal(id) {
  const el = document.getElementById(id);
  return el ? parseFloat(el.value) || 0 : 0;
}

// Rikthe 0 nëse vlera nuk është përqindje valide
function perc(val) {
  return isNaN(val) || !isFinite(val) ? 0 : val;
}

// Initialize Bootstrap tooltips
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Bootstrap tooltips
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
      trigger: 'click'
    });
  });

  // Get the calculate button and results column
  const calculateButton = document.getElementById('llogaritBtn');
  const resultsColumn = document.getElementById('resultsColumn');

  // Hide results column initially
  resultsColumn.style.display = 'none';

  // Add click event listener to calculate button
  calculateButton.addEventListener('click', function() {
    calculateResults();
    resultsColumn.style.display = 'block';
  });

  function calculateResults() {
    // Get input values (using the new IDs)
    const vlera_blerjes = parseFloat(document.getElementById('vlera_blerjes').value) || 0;
    const shpenzime_investim = parseFloat(document.getElementById('shpenzime_investim').value) || 0;
    // const viti_blerjes = document.getElementById('viti_blerjes').value; // Not used in current calculations

    const vlera_kredise = parseFloat(document.getElementById('vlera_kredise').value) || 0;
    const afati_vite = parseFloat(document.getElementById('afati_vite').value) || 0;
    const interesi = parseFloat(document.getElementById('interesi').value) || 0;
    const shpenzime_kredi = parseFloat(document.getElementById('shpenzime_kredi').value) || 0;
    const afati_muaj = afati_vite * 12;

    const qeraja_bruto = parseFloat(document.getElementById('qeraja_bruto').value) || 0;
    const periudha_qerase = parseFloat(document.getElementById('periudha_qerase').value) || 0;
    const shpenzime_qera = parseFloat(document.getElementById('shpenzime_qera').value) || 0;

    const vlera_shitjes = parseFloat(document.getElementById('vlera_shitjes').value) || 0;
    // const viti_shitjes = document.getElementById('viti_shitjes').value; // Not used in current calculations
    const shpenzime_shitje = parseFloat(document.getElementById('shpenzime_shitje').value) || 0;
    // Assuming vlera_fituar and tatim_fitimi inputs are removed based on image and instructions
    // We will calculate them instead.

    // Calculations based on image formulas

    // Kredia Calculations
    let kesti_mujor = 0;
    let pagesa_totale_kredi = 0;
    let interesi_total = 0;
    if (vlera_kredise > 0 && interesi > 0 && afati_muaj > 0) {
      const r = (interesi / 100) / 12;
      const n = afati_muaj;
      kesti_mujor = (vlera_kredise * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      pagesa_totale_kredi = kesti_mujor * afati_muaj;
      interesi_total = pagesa_totale_kredi - vlera_kredise;
    }

    // Investimi Calculations
    const kosto_totale_investimi = vlera_blerjes + shpenzime_investim + vlera_kredise + shpenzime_kredi + interesi_total;

    // Fitime nga Qeraja Calculations
    const tatim_qeraje = qeraja_bruto * 0.15;
    const qeraja_neto = qeraja_bruto - tatim_qeraje;
    const fitimi_total_qeraje = (qeraja_neto - shpenzime_qera) * periudha_qerase;

    // Fitime nga Shitja Calculations
    const vlera_fituar_shitje = vlera_shitjes - (vlera_blerjes + vlera_kredise); // Assuming Vlera e kredise is part of initial investment/cost
    const tatim_fitimi_shitje = vlera_fituar_shitje * 0.15;
    const fitimi_shitjes_neto = vlera_fituar_shitje - tatim_fitimi_shitje - shpenzime_shitje;

    // Performanca Calculations (based on both images)
    // Image 1 Performanca Section:
    const performanca_qerase_bruto = vlera_blerjes ? ((qeraja_bruto * periudha_qerase) / (vlera_blerjes + vlera_kredise)) * 100 : 0; // Using periudha_qerase (muaj) as implied
    const performanca_qerase_neto = (vlera_blerjes + vlera_kredise) ? (fitimi_total_qeraje / (vlera_blerjes + vlera_kredise)) * 100 : 0;

    // Image 2 Performanca Section (Formulas):
    const fitimi_shitja_bruto = vlera_fituar_shitje; // Based on formula: Vlera e fituar
    const fitimi_shitja_neto = fitimi_shitjes_neto; // Based on formula: Fitimi shitjes neto

    const performanca_shitjes = (vlera_blerjes + vlera_kredise) ? ((vlera_fituar_shitje) / (vlera_blerjes + vlera_kredise)) * 100 : 0; // Assuming this is Vlera e fituar / Vlera e investimit (Vlera e blerjes + Vlera e kredise) * 100

    const fitimi_total_bruto = fitimi_total_qeraje + fitimi_shitja_bruto;
    const fitimi_total_neto = fitimi_total_qeraje + fitimi_shitja_neto;

    // ROI Calculations (based on both images)
    // Image 1 Performanca Section:
    const roi_bruto = kosto_totale_investimi ? ((fitimi_total_qeraje + vlera_fituar_shitje - kosto_totale_investimi) / kosto_totale_investimi) * 100 : 0;
    const roi_neto = kosto_totale_investimi ? ((fitimi_total_qeraje + fitimi_shitjes_neto - kosto_totale_investimi) / kosto_totale_investimi) * 100 : 0;

    // Image 2 Performanca Section (Formulas for Performanca Vjetore):
    // Note: The formulas for Performanca Vjetore Bruto and Neto in Image 2 seem to be labeled as ROI_vjetor. I will implement them as shown.
    const performanca_vjetore_bruto = (vlera_blerjes + vlera_kredise) ? (Math.pow((vlera_shitjes / (vlera_blerjes + vlera_kredise)), 1/5) - 1) * 100 : 0; // Assuming a 5-year period based on previous discussion, and using Vlera e shitjes / Vlera e blerjes + Vlera e kredise
    const performanca_vjetore_neto = (vlera_blerjes + vlera_kredise) ? (Math.pow((vlera_shitjes / (vlera_blerjes + vlera_kredise)), 1/5) - 1) * 100 : 0; // Assuming same formula as bruto based on image layout

    // Image 2 Performanca Section (Formula for Performanca Totale): Missing explicit formula, but likely related to total profit vs total investment.
    // Based on previous iteration, let's use: (Fitimi total neto / Kosto totale investimi) * 100
    const performanca_totale = kosto_totale_investimi ? (fitimi_total_neto / kosto_totale_investimi) * 100 : 0;


    // Update result fields
    document.getElementById('kosto_totale_investimi').value = kosto_totale_investimi.toFixed(2) + ' €';

    document.getElementById('kesti_mujor').value = kesti_mujor.toFixed(2) + ' €';
    document.getElementById('pagesa_totale').value = pagesa_totale_kredi.toFixed(2) + ' €'; // Using pagesa_totale_kredi as per calculation
    document.getElementById('interesi_total').value = interesi_total.toFixed(2) + ' €';

    document.getElementById('tatim_qeraje').value = tatim_qeraje.toFixed(2) + ' €';
    document.getElementById('qeraja_neto').value = qeraja_neto.toFixed(2) + ' €';
    document.getElementById('fitimi_total_qeraje').value = fitimi_total_qeraje.toFixed(2) + ' €';

    document.getElementById('vlera_fituar_shitje').value = vlera_fituar_shitje.toFixed(2) + ' €';
    document.getElementById('tatim_fitimi_shitje').value = tatim_fitimi_shitje.toFixed(2) + ' €';
    document.getElementById('fitimi_shitjes_neto').value = fitimi_shitjes_neto.toFixed(2) + ' €';

    document.getElementById('performanca_qerase_bruto').value = performanca_qerase_bruto.toFixed(2) + ' %';
    document.getElementById('performanca_qerase_neto').value = performanca_qerase_neto.toFixed(2) + ' %';
    document.getElementById('fitimi_shitja_bruto').value = fitimi_shitja_bruto.toFixed(2) + ' €'; // Displaying as Euro based on label in image
    document.getElementById('fitimi_shitja_neto').value = fitimi_shitja_neto.toFixed(2) + ' €'; // Displaying as Euro based on label in image
    document.getElementById('performanca_shitjes').value = performanca_shitjes.toFixed(2) + ' %';
    document.getElementById('fitimi_total_bruto').value = fitimi_total_bruto.toFixed(2) + ' €'; // Displaying as Euro based on label in image
    document.getElementById('fitimi_total_neto').value = fitimi_total_neto.toFixed(2) + ' €'; // Displaying as Euro based on label in image
    document.getElementById('roi_bruto').value = roi_bruto.toFixed(2) + ' %';
    document.getElementById('roi_neto').value = roi_neto.toFixed(2) + ' %';
    document.getElementById('performanca_vjetore_bruto').value = performanca_vjetore_bruto.toFixed(2) + ' %';
    document.getElementById('performanca_vjetore_neto').value = performanca_vjetore_neto.toFixed(2) + ' %';
    document.getElementById('performanca_totale').value = performanca_totale.toFixed(2) + ' %';
  }
});

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
    <b>Performanca vjetore bruto:</b> ${performanca_vjetore_bruto.toFixed(2)}%<br>
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
