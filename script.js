const QUESTIONS = [
  {
    id: 'penggunaan',
    text: 'Bagaimana utamanya Anda akan menggunakan mobil ini?',
    sub: 'Ini menentukan seberapa penting efisiensi harian vs jarak jauh.',
    opts: [
      { icon: '🏙️', label: 'Komuter harian dalam kota', desc: 'Kantor, sekolah, mall - tidak keluar Jabodetabek', val: 'city' },
      { icon: '🛣️', label: 'Campuran: kota + luar kota', desc: 'Sesekali ke Bandung, Bogor, Karawang, dll', val: 'mixed' },
      { icon: '🚀', label: 'Sering perjalanan jauh', desc: 'Lebih dari 2x sebulan keluar Jabodetabek', val: 'touring' },
    ]
  },
  {
    id: 'garasi',
    text: 'Apakah Anda punya garasi atau tempat parkir pribadi?',
    sub: 'Menentukan apakah charging di rumah memungkinkan.',
    opts: [
      { icon: '🏠', label: 'Ya, punya garasi / carport', desc: 'Bisa pasang wallbox atau colokan rumah', val: 'yes' },
      { icon: '🏢', label: 'Parkir di kantor / gedung', desc: 'Ada SPKLU di gedung atau kantor saya', val: 'office' },
      { icon: '❌', label: 'Tidak, parkir di pinggir jalan', desc: 'Tidak ada akses charging pribadi', val: 'no' },
    ]
  },
  {
    id: 'jarak',
    text: 'Berapa jarak pergi-pulang komuter harian Anda?',
    sub: 'Perkiraan total jarak pulang-pergi per hari.',
    opts: [
      { icon: '📍', label: 'Di bawah 30 km', desc: 'Misalnya: Depok-Kuningan pp', val: 'short' },
      { icon: '📏', label: '30-60 km', desc: 'Misalnya: Bekasi-Sudirman pp', val: 'medium' },
      { icon: '🗺️', label: 'Lebih dari 60 km', desc: 'Misalnya: Bogor-Jakarta Pusat pp', val: 'long' },
    ]
  },
  {
    id: 'kemacetan',
    text: 'Seberapa parah kemacetan rute harian Anda?',
    sub: 'Kemacetan parah membuat bensin jauh lebih boros, tapi EV lebih efisien.',
    opts: [
      { icon: '🟢', label: 'Ringan - lancar sebagian besar waktu', desc: 'Jalan tol, jam normal, atau WFH dominan', val: 'low' },
      { icon: '🟡', label: 'Sedang - macet di jam sibuk', desc: 'Macet pagi dan sore, tapi masih bergerak', val: 'mid' },
      { icon: '🔴', label: 'Parah - sering stuck total', desc: 'Arteri macet, terkena ganjil-genap, dll', val: 'high' },
    ]
  },
  {
    id: 'budget',
    text: 'Berapa budget pembelian Anda?',
    sub: 'Mengacu kisaran OTR Indonesia (Jabodetabek) dan kondisi insentif berjalan.',
    opts: [
      { icon: '💰', label: 'Di bawah Rp 350 juta', desc: 'Prioritas biaya awal rendah', val: 'low' },
      { icon: '💵', label: 'Rp 350 - 550 juta', desc: 'Range menengah, banyak pilihan HEV & bensin', val: 'mid' },
      { icon: '💎', label: 'Di atas Rp 550 juta', desc: 'EV premium & HEV top tersedia', val: 'high' },
    ]
  },
  {
    id: 'prioritas',
    text: 'Apa prioritas utama Anda dalam memilih mobil?',
    sub: 'Satu faktor yang paling menentukan keputusan Anda.',
    opts: [
      { icon: '📉', label: 'Hemat biaya jangka panjang', desc: 'BBM / listrik, servis, perawatan rutin', val: 'opex' },
      { icon: '💸', label: 'Harga beli serendah mungkin', desc: 'DP dan cicilan yang terjangkau', val: 'capex' },
      { icon: '🌿', label: 'Ramah lingkungan & teknologi', desc: 'Emisi rendah, fitur modern, konektivitas', val: 'green' },
      { icon: '🔄', label: 'Fleksibilitas & kemudahan', desc: 'Bebas isi di mana saja, tidak bergantung infrastruktur', val: 'flex' },
    ]
  },
  {
    id: 'bbm',
    text: 'Berapa harga BBM non-subsidi di SPBU dekat Anda sekarang?',
    sub: 'Harga Pertamax / BBM sejenis - akibat tekanan Selat Hormuz.',
    opts: [
      { icon: '⛽', label: 'Sekitar Rp 13.000-15.000', desc: 'Masih relatif stabil di wilayah saya', val: 14000 },
      { icon: '⛽', label: 'Sekitar Rp 15.000-17.500', desc: 'Sudah mulai terasa naik', val: 16500 },
      { icon: '⛽', label: 'Di atas Rp 17.500', desc: 'Sangat terasa dampak kenaikannya', val: 19000 },
    ]
  },
];

const CARS_DATA = {
  ev: {
    name: 'Mobil Listrik (EV)',
    fullname: 'Battery Electric Vehicle',
    col: 'ev-card',
    models: ['BYD Dolphin', 'BYD M6', 'Wuling Air ev', 'Wuling BinguoEV', 'Chery Omoda E5 EV'],
    desc: 'Dengan kondisi Anda, mobil listrik bisa sangat efisien untuk komuter Jabodetabek. Namun, manfaat maksimalnya paling terasa bila Anda punya akses charging rutin (rumah/kantor).',
    pros: [
      'Biaya energi terendah: ~Rp 500-800 per km vs Rp 2.000-3.500 (bensin)',
      'Bebas ganjil-genap di Jakarta (sesuai regulasi berlaku)',
      'Regenerative braking - makin efisien di kemacetan',
      'Nol emisi lokal, pajak & PPN lebih rendah (subsidi pemerintah)',
      'Servis minimal: tidak ada oli, busi, atau filter mesin',
    ],
    cons: [
      'Harga OTR awal umumnya masih lebih tinggi dari bensin setara di Indonesia',
      'Perjalanan jauh perlu perencanaan SPKLU terlebih dahulu',
      'Waktu pengisian lebih lama dari isi bensin (kecuali fast charger)',
    ],
  },
  hev: {
    name: 'Mobil Hybrid (HEV)',
    fullname: 'Hybrid Electric Vehicle (non plug-in)',
    col: 'hev-card',
    models: ['Toyota Kijang Innova Zenix HEV', 'Toyota Yaris Cross HEV', 'Toyota Corolla Cross HEV', 'Suzuki Ertiga Hybrid', 'Nissan Kicks e-POWER'],
    desc: 'HEV di Indonesia mayoritas non plug-in, jadi tidak perlu charging eksternal. Ini cocok untuk pengguna Jabodetabek yang ingin irit BBM tanpa repot infrastruktur charging.',
    pros: [
      'Konsumsi BBM umumnya 25-45% lebih hemat dari bensin biasa',
      'Tidak perlu charging - isi BBM seperti biasa di mana saja',
      'Efisien di kemacetan (mesin mati otomatis, listrik ambil alih)',
      'Nilai jual kembali terbaik di pasar Indonesia saat ini',
      'Cocok untuk perjalanan campuran kota dan luar kota',
    ],
    cons: [
      'Masih bergantung BBM - rentan fluktuasi harga Selat Hormuz',
      'Harga OTR lebih tinggi dari bensin biasa',
      'Biaya servis baterai hybrid bisa signifikan jangka panjang',
    ],
  },
  ice: {
    name: 'Mobil Bensin',
    fullname: 'Internal Combustion Engine',
    col: 'ice-card',
    models: ['Honda CR-V 1.5 Turbo', 'Toyota Fortuner', 'Mitsubishi Xpander', 'Honda Civic RS', 'Suzuki XL7'],
    desc: 'Untuk kebutuhan dan kondisi Anda, mobil bensin menawarkan fleksibilitas dan kemudahan terbaik. Investasi awal paling rendah dengan infrastruktur pengisian yang sudah sangat merata.',
    pros: [
      'Harga OTR paling terjangkau untuk spesifikasi setara',
      'Isi BBM di mana saja - tidak ada ketergantungan infrastruktur khusus',
      'Pilihan model paling beragam di semua segmen',
      'Ekosistem bengkel & suku cadang paling luas di Indonesia',
      'Cocok untuk perjalanan jauh tanpa perencanaan ekstra',
    ],
    cons: [
      'Biaya BBM paling tinggi - sangat rentan krisis Selat Hormuz',
      'Boros 30-50% lebih tinggi di kemacetan Jabodetabek',
      'Emisi tertinggi - terkena aturan ganjil-genap penuh',
      'Biaya operasional jangka panjang tertinggi',
    ],
  },
};

const AHP_CRITS = [
  { name: 'Efisiensi energi & emisi', bobot: 0.22, col: '#2D6A4F' },
  { name: 'Biaya operasional harian', bobot: 0.24, col: '#D4580A' },
  { name: 'Ketahanan krisis BBM', bobot: 0.10, col: '#8B6914' },
  { name: 'Infrastruktur & kenyamanan', bobot: 0.24, col: '#534AB7' },
  { name: 'Harga beli & kredit', bobot: 0.12, col: '#903257' },
  { name: 'Nilai jual & servis', bobot: 0.08, col: '#5F5E5A' },
];

let answers = {};
let currentQ = 0;

function startQuiz() {
  document.getElementById('hero-section').style.display = 'none';
  document.getElementById('quiz-section').classList.add('active');
  renderQ(0);
}

function renderQ(idx) {
  const q = QUESTIONS[idx];
  const pct = (idx / QUESTIONS.length) * 100;
  document.getElementById('prog-fill').style.width = pct + '%';
  document.getElementById('prog-label').textContent = idx + ' / ' + QUESTIONS.length;

  const container = document.getElementById('q-container');
  container.innerHTML = `
    <div class="q-card">
      <div class="q-num">Pertanyaan ${idx + 1} dari ${QUESTIONS.length}</div>
      <div class="q-text">${q.text}</div>
      <div class="q-sub">${q.sub}</div>
      <div class="options" id="opts"></div>
      <div class="q-nav">
        <button class="btn-back" onclick="goBack()" ${idx === 0 ? 'style="visibility:hidden"' : ''}>← Kembali</button>
        <button class="btn-next" id="btn-next" onclick="goNext()">
          ${idx === QUESTIONS.length - 1 ? 'Lihat hasil →' : 'Lanjut →'}
        </button>
      </div>
    </div>`;

  const opts = document.getElementById('opts');
  q.opts.forEach((o, i) => {
    const btn = document.createElement('button');
    btn.className = 'opt' + (answers[q.id] === o.val ? ' selected' : '');
    btn.innerHTML = `<div class="opt-icon">${o.icon}</div><div><div class="opt-label">${o.label}</div><div class="opt-desc">${o.desc}</div></div>`;
    btn.onclick = () => selectOpt(q.id, o.val, i);
    opts.appendChild(btn);
  });

  if (answers[q.id] !== undefined) {
    document.getElementById('btn-next').classList.add('ready');
  }
  currentQ = idx;
}

function selectOpt(qid, val, idx) {
  answers[qid] = val;
  document.querySelectorAll('.opt').forEach((b, i) => {
    b.classList.toggle('selected', i === idx);
  });
  document.getElementById('btn-next').classList.add('ready');
}

function goBack() {
  if (currentQ > 0) renderQ(currentQ - 1);
}

function goNext() {
  if (answers[QUESTIONS[currentQ].id] === undefined) return;
  if (currentQ < QUESTIONS.length - 1) {
    renderQ(currentQ + 1);
  } else {
    showResult();
  }
}

function ahpWeights(M) {
  const n = M.length;
  const colSums = M[0].map((_, j) => M.reduce((s, r) => s + r[j], 0));
  const norm = M.map(row => row.map((v, j) => v / colSums[j]));
  const w = norm.map(row => row.reduce((s, v) => s + v, 0) / n);
  const Mw = M.map(row => row.reduce((s, a, j) => s + a * w[j], 0));
  const lmax = Mw.reduce((s, v, i) => s + v / w[i], 0) / n;
  const CI = (lmax - n) / (n - 1);
  const RI = [0, 0, 0.58, 0.90, 1.12, 1.24, 1.32][n] || 1.24;
  const CR = CI / RI;
  return { w, lmax, CI, CR };
}

function toSaaty(ratio) {
  const r = Math.max(1 / 9, Math.min(9, ratio));
  return r;
}

function buildAlt(scores) {
  const n = scores.length;
  const eps = 1e-9;
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => {
      if (i === j) return 1;
      return toSaaty((scores[i] + eps) / (scores[j] + eps));
    })
  );
}

function computeAHP(a) {
  const bbm = a.bbm;
  const kmPP = { short: 25, medium: 45, long: 80 }[a.jarak];
  const macFactor = { low: 0, mid: 1, high: 2 }[a.kemacetan];
  const hari = 22;
  const kmBulan = kmPP * hari;
  const kmLBensin = [10, 7, 5.5][macFactor];
  const kmLHEV = [18, 14, 12][macFactor];
  const chargeMode = a.garasi;
  const hasCharging = (chargeMode === 'yes' || chargeMode === 'office') ? 1 : 0;
  const tarifEV = chargeMode === 'yes' ? 1699 : chargeMode === 'office' ? 2200 : 3000;
  const extraChargeCost = chargeMode === 'yes' ? 1.0 : chargeMode === 'office' ? 1.12 : 1.35;
  const tripChargeStress = { city: 1.0, mixed: 1.08, touring: 1.20 }[a.penggunaan];
  const biayaEV = (kmBulan / 6.5) * tarifEV * extraChargeCost * tripChargeStress;
  const biayaHEV = (kmBulan / kmLHEV) * bbm;
  const biayaICE = (kmBulan / kmLBensin) * bbm;

   const luar = { city: 0, mixed: 3, touring: 8 }[a.penggunaan];
  const luarPenalty = Math.min(luar / 8, 1.0);

  const macBonus = [0, 0.10, 0.20][macFactor];
  const evTripPenalty = { city: 0.00, mixed: 0.05, touring: 0.11 }[a.penggunaan];
  const hevTripBonus = { city: 0.02, mixed: 0.05, touring: 0.08 }[a.penggunaan];
  const effEV = Math.min(0.86, 0.62 + macBonus * 0.90 - evTripPenalty);
  const effHEV = Math.min(0.80, 0.56 + macBonus * 0.65 + hevTripBonus * 0.90);
  const effICE = Math.max(0.22, 0.34 - macBonus * 0.35);

  const invB = [1 / biayaEV, 1 / biayaHEV, 1 / biayaICE];

  const kBBM = [0.90, 0.75, 0.55];

  const evInfraBase = chargeMode === 'yes' ? 0.80 : chargeMode === 'office' ? 0.62 : 0.44;
  const evInfra = Math.max(0.12, evInfraBase - luarPenalty * 0.22);
  const infra = [evInfra, 0.78, 0.74];

  const budgetCap = { low: 350, mid: 550, high: 900 }[a.budget];
  const priceFit = (price) => {
    const ratio = price / budgetCap;
    return Math.max(0.10, Math.min(0.90, 0.92 - 0.75 * ratio));
  };
  // Approximate OTR references (juta rupiah) for Indonesian market segments.
  const hargaEV = priceFit(470);
  const hargaHEV = priceFit(430);
  const hargaICE = priceFit(320);
  const harga = [hargaEV, hargaHEV, hargaICE];

  const nilai = [0.42, 0.72, 0.60];

  let W = [...AHP_CRITS.map(c => c.bobot)];
  if (a.prioritas === 'opex') { W[0] = 0.21; W[1] = 0.33; W[2] = 0.10; W[3] = 0.18; W[4] = 0.08; W[5] = 0.10; }
  if (a.prioritas === 'capex') { W[0] = 0.14; W[1] = 0.18; W[2] = 0.08; W[3] = 0.18; W[4] = 0.30; W[5] = 0.12; }
  if (a.prioritas === 'green') { W[0] = 0.33; W[1] = 0.20; W[2] = 0.12; W[3] = 0.18; W[4] = 0.07; W[5] = 0.10; }
  if (a.prioritas === 'flex') { W[0] = 0.14; W[1] = 0.19; W[2] = 0.08; W[3] = 0.35; W[4] = 0.12; W[5] = 0.12; }

  const rawScores = [
    [effEV, effHEV, effICE],
    invB,
    kBBM,
    infra,
    harga,
    nilai,
  ];

  const localScores = rawScores.map(scores => {
    const M = buildAlt(scores);
    const { w } = ahpWeights(M);
    return w;
  });

  const global = [0, 1, 2].map(ci =>
    W.reduce((s, wk, ki) => s + wk * localScores[ki][ci], 0)
  );

  return {
    global, W, localScores, rawScores,
    biaya: [biayaEV, biayaHEV, biayaICE],
    kmPP, bbm,
  };
}

function showResult() {
  document.getElementById('quiz-section').classList.remove('active');
  const section = document.getElementById('result-section');
  section.classList.add('active');

  const r = computeAHP(answers);
  const { global, W, localScores } = r;

  const ranked = [0, 1, 2].map((i) => ({ i, s: global[i] })).sort((a, b) => b.s - a.s);
  const winIdx = ranked[0].i;
  const carKeys = ['ev', 'hev', 'ice'];
  const winner = CARS_DATA[carKeys[winIdx]];

  const pct = s => (s * 100).toFixed(1) + '%';

  const critNames = ['Efisiensi energi', 'Biaya operasional', 'Ketahanan krisis BBM', 'Infrastruktur', 'Harga & kredit', 'Nilai jual & servis'];
  const carLabels = ['EV', 'HEV', 'Bensin'];
  const carColsFill = ['#2D6A4F', '#1B4F8A', '#8B3A2A'];

  let ahpRows = '';
  critNames.forEach((cn, ki) => {
    const ls = localScores[ki];
    ahpRows += `<div class="ahp-row">
      <div class="ahp-crit">
        <div style="font-size:12px;font-weight:500;color:var(--ink)">${cn}</div>
        <div style="font-size:10px;color:var(--ink3);margin-top:1px">bobot ${(W[ki] * 100).toFixed(0)}%</div>
      </div>
      <div class="ahp-bars">
        ${[0, 1, 2].map(ci => `
          <div class="ahp-bar-row">
            <div class="ahp-bar-lbl">${carLabels[ci]}</div>
            <div class="ahp-track"><div class="ahp-fill" style="width:${(ls[ci] * 100).toFixed(1)}%;background:${carColsFill[ci]}"></div></div>
            <div class="ahp-val">${(ls[ci] * 100).toFixed(0)}%</div>
          </div>`).join('')}
      </div>
      <div class="ahp-wt">${(W[ki] * 100).toFixed(0)}%</div>
    </div><hr style="border:none;border-top:1px solid var(--border);margin:4px 0">`;
  });

  const runners = ranked.slice(1).map(rk => {
    const c = CARS_DATA[carKeys[rk.i]];
    return `<div class="runner-card">
      <div class="runner-rank">Peringkat ${ranked.indexOf(rk) + 1}</div>
      <div class="runner-name">${c.name}</div>
      <div class="runner-ex">${c.models.slice(0, 2).join(', ')}</div>
      <div class="runner-score" style="color:${rk.i === 0 ? '#2D6A4F' : rk.i === 1 ? '#1B4F8A' : '#8B3A2A'}">${pct(rk.s)}</div>
    </div>`;
  }).join('');

  const prosList = winner.pros.map(p => `<li>${p}</li>`).join('');
  const consList = winner.cons.map(c => `<li>${c}</li>`).join('');
  const modelChips = winner.models.map(m => `<span class="model-chip">${m}</span>`).join('');

  document.getElementById('result-content').innerHTML = `
    <div class="result-hero">
      <div class="result-eyebrow">Hasil analisis AHP Anda</div>
      <div class="result-title">Rekomendasi: <em style="font-style:italic;color:${winIdx === 0 ? '#2D6A4F' : winIdx === 1 ? '#1B4F8A' : '#8B3A2A'}">${winner.name}</em></div>
      <div class="result-sub">Berdasarkan 7 jawaban Anda, dihitung dengan Analytic Hierarchy Process 6 kriteria.</div>
    </div>

    <div class="winner-card ${winner.col}">
      <div class="winner-badge">★ Rekomendasi terbaik untuk Anda</div>
      <div class="winner-type">${winner.name}</div>
      <div style="font-size:13px;opacity:.7;margin-bottom:.75rem">${winner.fullname}</div>
      <div class="winner-desc">${winner.desc}</div>
      <div class="winner-models">${modelChips}</div>
      <div class="winner-score-row">
        <span class="score-big">${pct(global[winIdx])}</span>
        <span>skor AHP - unggul dari ${pct(global[ranked[1].i])} (${CARS_DATA[carKeys[ranked[1].i]].name})</span>
      </div>
    </div>

    <div class="details-grid">
      <div class="detail-card">
        <h4 class="pro">Keunggulan untuk Anda</h4>
        <ul class="detail-list pros">${prosList}</ul>
      </div>
      <div class="detail-card">
        <h4 class="con">Yang perlu dipertimbangkan</h4>
        <ul class="detail-list cons">${consList}</ul>
      </div>
    </div>

    <div class="ahp-card">
      <h3>Rincian kalkulasi AHP</h3>
      <p>Skor lokal tiap alternatif per kriteria × bobot. Bobot disesuaikan dengan prioritas Anda.</p>
      ${ahpRows}
      <div style="display:flex;gap:16px;margin-top:1rem;flex-wrap:wrap">
        ${[0, 1, 2].map(i => `<span style="display:flex;align-items:center;gap:5px;font-size:12px;color:var(--ink2)">
          <span style="width:10px;height:10px;border-radius:2px;background:${carColsFill[i]};display:inline-block"></span>
          ${carLabels[i]}: <b style="font-weight:500">${pct(global[i])}</b>
        </span>`).join('')}
      </div>
    </div>

    <div class="lbl" style="font-size:11px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:var(--ink3);margin-bottom:.75rem">Alternatif lain</div>
    <div class="runners">${runners}</div>

    <button class="btn-restart" onclick="restartQuiz()">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7a6 6 0 1 0 1.2-3.6M1 2v3h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Ulangi dengan jawaban berbeda
    </button>
  `;

  section.scrollTop = 0;
  window.scrollTo(0, 0);
}

function restartQuiz() {
  answers = {};
  currentQ = 0;
  document.getElementById('result-section').classList.remove('active');
  document.getElementById('quiz-section').classList.add('active');
  renderQ(0);
  window.scrollTo(0, 0);
}
