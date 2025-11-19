// script.js (Versi Final)

const questions = [
    {
        id: 1,
        text: "Ketika kamu berjemur di bawah sinar matahari, bagaimana reaksi kulitmu?",
        options: [
            { label: "Mudah merah atau terbakar, jarang menjadi cokelat.", score: -2 }, // Dingin
            { label: "Mudah menjadi cokelat, jarang terbakar.", score: 2 },   // Hangat
            { label: "Tergantung, kadang merah, kadang cokelat.", score: 0 }    // Netral
        ]
    },
    {
        id: 2,
        text: "Saat melihat urat nadi di pergelangan tangan, warna apa yang paling dominan?",
        options: [
            { label: "Biru atau Ungu.", score: -2 }, // Dingin
            { label: "Hijau atau Zaitun.", score: 2 },  // Hangat
            { label: "Sulit dibedakan antara biru/hijau.", score: 0 } // Netral
        ]
    },
    {
        id: 3,
        text: "Warna perhiasan apa yang menurutmu membuat kulitmu terlihat lebih cerah?",
        options: [
            { label: "Perak (Silver) atau Platinum.", score: -1 }, // Dingin
            { label: "Emas (Gold) atau Kuningan.", score: 1 },  // Hangat
            { label: "Keduanya terlihat bagus.", score: 0 } // Netral
        ]
    },
    {
        id: 4,
        text: "Jika kamu menggunakan pakaian putih, warna putih jenis apa yang paling cocok?",
        options: [
            { label: "Putih bersih atau Snow White.", score: -1 }, // Dingin
            { label: "Putih gading (Ivory) atau Krem.", score: 1 },  // Hangat
            { label: "Tidak terlalu membedakan.", score: 0 } // Netral
        ]
    },
    {
        id: 5,
        text: "Warna mata/rambut alami apa yang paling mendominasi penampilanmu?",
        options: [
            { label: "Ashy (dingin) seperti hitam kebiruan, pirang abu-abu.", score: -1 }, // Dingin
            { label: "Golden (hangat) seperti coklat keemasan, merah, atau cokelat madu.", score: 1 },  // Hangat
            { label: "Warna netral (cokelat murni, hitam pekat).", score: 0 } // Netral
        ]
    },
    {
        id: 6,
        text: "Bayangkan warna bibirmu (tanpa lipstik). Cenderung ke arah mana?",
        options: [
            { label: "Pink kebiruan atau keunguan.", score: -1 }, // Dingin
            { label: "Peach atau cokelat kemerahan.", score: 1 },  // Hangat
            { label: "Netral.", score: 0 } // Netral
        ]
    },
    {
        id: 7,
        text: "Ketika kamu memegang kain berwarna oranye, apa yang kamu rasakan?",
        options: [
            { label: "Wajahku terlihat kusam atau pucat.", score: -1 }, // Dingin
            { label: "Wajahku terlihat bersinar dan cerah.", score: 1 },  // Hangat
            { label: "Biasa saja.", score: 0 } // Netral
        ]
    }
];

// Palet Warna Rekomendasi
const recommendations = {
    DINGIN: {
        undertone: "DINGIN",
        desc: "Kulitmu terlihat cerah dengan warna berbasis biru. Pilih warna permata seperti Safir, Merah Ruby, Ungu Terong, dan Hijau Emerald. Warna dingin akan menyeimbangkan rona kekuningan di kulitmu.",
        colors: [
            { name: "Biru Safir", hex: "#0F52BA" },
            { name: "Merah Ruby", hex: "#E0115F" },
            { name: "Ungu Terong", hex: "#4B0082" },
            { name: "Hijau Emerald", hex: "#50C878" }
        ]
    },
    HANGAT: {
        undertone: "HANGAT",
        desc: "Kulitmu terlihat cerah dengan warna berbasis kuning/tanah. Pilih warna hangat seperti Kuning Mustard, Oranye Karat, Hijau Zaitun, dan Cokelat Keemasan. Hindari warna berbasis biru murni.",
        colors: [
            { name: "Kuning Mustard", hex: "#FFDB58" },
            { name: "Hijau Zaitun", hex: "#808000" },
            { name: "Oranye Karat", hex: "#B7410E" },
            { name: "Cokelat Emas", hex: "#B8860B" }
        ]
    },
    NETRAL: {
        undertone: "NETRAL",
        desc: "Kamu beruntung! Hampir semua warna cocok untukmu. Pilihan terbaik adalah warna netral medium seperti abu-abu, beige, dan merah tua agar tampilanmu seimbang.",
        colors: [
            { name: "Abu-abu Medium", hex: "#6C757D" },
            { name: "Beige", hex: "#F5F5DC" },
            { name: "Merah Tua", hex: "#800000" },
            { name: "Teal", hex: "#008080" }
        ]
    }
};

let currentQuestionIndex = 0;
let userAnswers = {}; // Untuk menyimpan skor jawaban: {1: 2, 2: -2, ...}
let totalScore = 0;

// Ambil elemen DOM
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const submitBtn = document.getElementById('submit-btn');
const questionContainer = document.getElementById('question-container');
const progressBar = document.getElementById('progress-bar');
const quizArea = document.getElementById('quiz-area');
const resultArea = document.getElementById('result-area');
const undertoneResultDiv = document.getElementById('undertone-result');
const colorPaletteDiv = document.getElementById('color-palette');

// --- FUNGSI UTAMA ---

function updateProgress() {
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = progress + '%';
    progressBar.setAttribute('aria-valuenow', progress);
}

// Fungsi untuk menangani transisi animasi (UX)
function transitionQuestion(action, callback) {
    questionContainer.classList.add('fade-out'); // Mulai fade-out
    
    // Tunggu animasi selesai (300ms)
    setTimeout(() => {
        if (action === 'NEXT') {
            currentQuestionIndex++;
        } else if (action === 'PREV') {
            currentQuestionIndex--;
        }
        
        callback(); // Muat konten baru
        
        // Hapus fade-out dan tambahkan fade-in untuk tampilan baru
        questionContainer.classList.remove('fade-out');
        questionContainer.classList.add('fade-in');

        // Hapus kelas fade-in setelah sedikit waktu agar bisa digunakan lagi
        setTimeout(() => {
            questionContainer.classList.remove('fade-in');
        }, 100);
        
    }, 300); 
}

function loadQuestion(index) {
    updateProgress();
    
    // Tampilkan tombol yang relevan
    prevBtn.style.display = index > 0 ? 'inline-block' : 'none';
    nextBtn.style.display = index < questions.length - 1 ? 'inline-block' : 'none';
    submitBtn.style.display = index === questions.length - 1 ? 'inline-block' : 'none';
    
    const q = questions[index];
    let html = `<h4 class="mb-3">(${q.id}/${questions.length}) ${q.text}</h4>`;
    
    q.options.forEach(option => {
        // Interaktivitas: Radio button dengan data-score
        const isChecked = userAnswers[q.id] === option.score;
        html += `
            <div class="form-check py-2 border-bottom">
                <input class="form-check-input" type="radio" name="q${q.id}" id="q${q.id}opt${option.score}" value="${option.score}" data-score="${option.score}" ${isChecked ? 'checked' : ''}>
                <label class="form-check-label w-100" for="q${q.id}opt${option.score}">
                    ${option.label}
                </label>
            </div>
        `;
    });

    questionContainer.innerHTML = html;
}

function handleAnswerSelection() {
    const qId = questions[currentQuestionIndex].id;
    const selected = document.querySelector(`input[name="q${qId}"]:checked`);
    
    if (selected) {
        // Ambil skor dari atribut value (Implementasi Teknis)
        const score = parseInt(selected.value);
        userAnswers[qId] = score; // Simpan jawaban
        return true; // Jawaban berhasil disimpan
    }
    
    alert("Harap pilih salah satu jawaban sebelum melanjutkan!");
    return false; // Gagal menyimpan
}

function calculateResult() {
    // Implementasi Teknis: Menghitung total skor (Algoritma Simulasi AI)
    totalScore = Object.values(userAnswers).reduce((sum, score) => sum + score, 0);

    let resultKey;
    if (totalScore < -2) {
        resultKey = 'DINGIN';
    } else if (totalScore > 2) {
        resultKey = 'HANGAT';
    } else {
        resultKey = 'NETRAL';
    }

    // Tampilkan Hasil (Solusi & Kreativitas + UX)
    const result = recommendations[resultKey];
    
    undertoneResultDiv.innerHTML = `
        <div class="recommendation-box">
            <h3 class="text-info">${result.undertone}</h3>
            <p class="lead">${result.desc}</p>
            <p class="small text-muted">Total Skor Analisis: ${totalScore}</p>
        </div>
    `;

    // Tampilkan Palet Warna
    colorPaletteDiv.innerHTML = result.colors.map(color => `
        <div class="col-6 col-md-3 mb-3">
            <div class="card p-3 text-center" style="background-color: ${color.hex}; color: ${isLight(color.hex) ? '#333' : '#FFF'};">
                <strong>${color.name}</strong>
            </div>
        </div>
    `).join('');
    
    // Terapkan Fade-out dan Fade-in untuk transisi dari Quiz ke Result
    quizArea.classList.add('fade-out');
    setTimeout(() => {
        quizArea.style.display = 'none';
        resultArea.style.display = 'block';
        resultArea.classList.add('fade-in');
    }, 300);
}

// Fungsi pembantu untuk menentukan teks pada palet warna (UX)
function isLight(hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5;
}


// --- EVENT LISTENERS (Interaktivitas) ---

startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none';
    currentQuestionIndex = 0;
    questionContainer.innerHTML = ''; // Kosongkan placeholder
    loadQuestion(currentQuestionIndex);
    // Tampilkan tombol navigasi untuk pertanyaan pertama
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
});

nextBtn.addEventListener('click', () => {
    if (handleAnswerSelection()) {
        transitionQuestion('NEXT', () => loadQuestion(currentQuestionIndex));
    }
});

prevBtn.addEventListener('click', () => {
    transitionQuestion('PREV', () => loadQuestion(currentQuestionIndex));
});

submitBtn.addEventListener('click', () => {
    if (handleAnswerSelection()) {
        calculateResult();
    }
});