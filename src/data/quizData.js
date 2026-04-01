// Har bir modul uchun test savollari
// Modul ID larga mos ravishda tuzilgan

export const quizData = {
    // Modul 1: PHP Asoslari (1-4 darslar)
    1: {
        title: "PHP Asoslari",
        description: "PHP haqida asosiy bilimlaringizni sinab ko'ring",
        passingScore: 70,
        questions: [
            {
                id: 1,
                question: "PHP qisqartmasi nimani anglatadi?",
                options: [
                    "Personal Home Page",
                    "PHP: Hypertext Preprocessor",
                    "Private Host Protocol",
                    "Programming Helpful Platform"
                ],
                correct: 1,
                explanation: "PHP dastlab 'Personal Home Page' deb atalgan, ammo hozirda rasman 'PHP: Hypertext Preprocessor' deb nomlanadi."
            },
            {
                id: 2,
                question: "PHP da o'zgaruvchilar qaysi belgi bilan boshlanadi?",
                options: ["#", "@", "$", "&"],
                correct: 2,
                explanation: "PHPda barcha o'zgaruvchilar $ (dollar) belgisi bilan boshlanadi. Masalan: $ism = 'Ali';"
            },
            {
                id: 3,
                question: "PHP faylining kengaytmasi qanday?",
                options: [".html", ".php", ".py", ".js"],
                correct: 1,
                explanation: "PHP fayllari .php kengaytmasi bilan saqlanadi."
            },
            {
                id: 4,
                question: "PHP kodi qaysi teglar orasida yoziladi?",
                options: [
                    "<script> ... </script>",
                    "<% ... %>",
                    "<?php ... ?>",
                    "<php> ... </php>"
                ],
                correct: 2,
                explanation: "PHP kodi <?php ... ?> teglar orasida yoziladi."
            },
            {
                id: 5,
                question: "PHP da ekranga matn chiqarish uchun qaysi buyruq ishlatiladi?",
                options: ["print()", "echo", "console.log()", "write()"],
                correct: 1,
                explanation: "PHP da echo buyrug'i ekranga matn chiqarish uchun eng ko'p ishlatiladigan usuldir."
            },
            {
                id: 6,
                question: "PHP qaysi tomondan (server/client) ishlaydigan til?",
                options: [
                    "Faqat client (brauzer) tomonda",
                    "Server tomonda",
                    "Ikkalasida ham",
                    "Hech qayerda"
                ],
                correct: 1,
                explanation: "PHP server tomonida (server-side) ishlaydigan dasturlash tilidir."
            },
            {
                id: 7,
                question: "PHP da qatorni tugatish uchun qaysi belgi qo'yiladi?",
                options: [".", ":", ";", ","],
                correct: 2,
                explanation: "PHPda har bir bayonot (statement) oxirida nuqta-vergul (;) qo'yilishi shart."
            },
            {
                id: 8,
                question: "Quyidagilardan qaysi biri PHP da to'g'ri izoh (comment) yozish usuli?",
                options: [
                    "<!-- bu izoh -->",
                    "// bu izoh",
                    "** bu izoh **",
                    "## bu izoh"
                ],
                correct: 1,
                explanation: "PHPda bir qatorli izoh uchun // yoki #, ko'p qatorli izoh uchun /* ... */ ishlatiladi."
            },
            {
                id: 9,
                question: "PHP da string (matn) qanday yoziladi?",
                options: [
                    "Faqat qo'shtirnoq ichida (\"...\")",
                    "Faqat bittatirnoq ichida ('...')",
                    "Qo'shtirnoq yoki bittatirnoq ichida",
                    "Tirnoqsiz yoziladi"
                ],
                correct: 2,
                explanation: "PHPda stringlarni qo'shtirnoq (\") yoki bittatirnoq (') ichida yozish mumkin."
            },
            {
                id: 10,
                question: "PHP da $x = 5; yozilganda $x ning turi nima bo'ladi?",
                options: ["string", "float", "integer", "boolean"],
                correct: 2,
                explanation: "5 butun son bo'lganligi uchun $x ning turi integer (butun son) bo'ladi."
            }
        ]
    },

    // Modul 2: Ma'lumot Turlari (5-9 darslar)
    2: {
        title: "Ma'lumot Turlari",
        description: "String, Array, Operatorlar haqidagi bilimlaringizni sinab ko'ring",
        passingScore: 70,
        questions: [
            {
                id: 1,
                question: "PHPda quyidagilardan qaysi biri skalyar ma'lumot turi emas?",
                options: ["string", "integer", "array", "boolean"],
                correct: 2,
                explanation: "Array bu compound (murakkab) tur, skalyar turlar: string, integer, float, boolean."
            },
            {
                id: 2,
                question: "strlen() funksiyasi nima qiladi?",
                options: [
                    "Stringni teskari qiladi",
                    "String uzunligini qaytaradi",
                    "Stringni katta harfga o'giradi",
                    "Stringni bo'ladi"
                ],
                correct: 1,
                explanation: "strlen() funksiyasi string uzunligini (belgilar sonini) qaytaradi."
            },
            {
                id: 3,
                question: "PHP da associative array qanday yaratiladi?",
                options: [
                    "$arr = [1, 2, 3];",
                    "$arr = ['ism' => 'Ali', 'yosh' => 25];",
                    "$arr = array_new();",
                    "$arr = {ism: 'Ali'};"
                ],
                correct: 1,
                explanation: "Assotsiativ massiv => operatori bilan kalit-qiymat juftlari orqali yaratiladi."
            },
            {
                id: 4,
                question: "'==' va '===' operatorlarning farqi nima?",
                options: [
                    "Farqi yo'q, ikkalasi bir xil",
                    "== qiymatni solishtiradi, === qiymat va turni solishtiradi",
                    "=== faqat stringlarni solishtiradi",
                    "== faqat sonlarni solishtiradi"
                ],
                correct: 1,
                explanation: "== faqat qiymatni, === esa qiymat va turni birga solishtiradi. Masalan: 5 == '5' true, lekin 5 === '5' false."
            },
            {
                id: 5,
                question: "PHP da . (nuqta) operatori nima uchun ishlatiladi?",
                options: [
                    "Bo'lish amali",
                    "Stringlarni birlashtirish (concatenation)",
                    "Qo'shish amali",
                    "Massiv yaratish"
                ],
                correct: 1,
                explanation: ". (nuqta) operatori PHP da stringlarni birlashtirish uchun ishlatiladi. Masalan: 'Salom' . ' Dunyo'"
            },
            {
                id: 6,
                question: "count() funksiyasi nima qaytaradi?",
                options: [
                    "Massiv elementlarini saralaydi",
                    "Massivdagi elementlar sonini qaytaradi",
                    "Massivni tozalaydi",
                    "Massivga element qo'shadi"
                ],
                correct: 1,
                explanation: "count() massivdagi elementlar sonini qaytaradi."
            },
            {
                id: 7,
                question: "PHP da float turi nima?",
                options: [
                    "Butun son",
                    "Mantiqiy qiymat",
                    "Kasrli (o'nlik) son",
                    "Matn"
                ],
                correct: 2,
                explanation: "Float (yoki double) kasrli sonlarni ifodalash uchun ishlatiladi. Masalan: 3.14"
            },
            {
                id: 8,
                question: "gettype() funksiyasi nima qiladi?",
                options: [
                    "O'zgaruvchining qiymatini o'zgartiradi",
                    "O'zgaruvchining turini string sifatida qaytaradi",
                    "O'zgaruvchini o'chiradi",
                    "O'zgaruvchini nusxalaydi"
                ],
                correct: 1,
                explanation: "gettype() o'zgaruvchining ma'lumot turini aniqlaydi va string sifatida qaytaradi."
            },
            {
                id: 9,
                question: "PHP da massivga oxiriga element qo'shish uchun qaysi funksiya ishlatiladi?",
                options: ["array_add()", "array_push()", "array_insert()", "array_append()"],
                correct: 1,
                explanation: "array_push() massiv oxiriga bir yoki bir nechta element qo'shadi."
            },
            {
                id: 10,
                question: "PHP da NULL nima?",
                options: [
                    "0 ga teng",
                    "Bo'sh string",
                    "O'zgaruvchining qiymati yo'qligini bildiradi",
                    "Xatolik"
                ],
                correct: 2,
                explanation: "NULL o'zgaruvchining qiymati yo'qligini bildiradi. Faqat bitta qiymati bor: null."
            }
        ]
    },

    // Modul 3: Nazorat Tuzilmalari (10-16 darslar)
    3: {
        title: "Nazorat Tuzilmalari",
        description: "If/Else, Switch, Loop (tsikllar) haqidagi bilimlaringizni sinab ko'ring",
        passingScore: 70,
        questions: [
            {
                id: 1,
                question: "if/else blokida shart noto'g'ri bo'lganda qaysi blok bajariladi?",
                options: ["if bloki", "else bloki", "Ikkalasi ham", "Hech biri"],
                correct: 1,
                explanation: "Shart noto'g'ri (false) bo'lganda else blokidagi kod bajariladi."
            },
            {
                id: 2,
                question: "switch case da break yozmaslik oqibatida nima bo'ladi?",
                options: [
                    "Xatolik chiqadi",
                    "Keyingi case larga ham o'tib ketadi (fall-through)",
                    "Dastur to'xtaydi",
                    "Hech narsa bo'lmaydi"
                ],
                correct: 1,
                explanation: "break yozilmasa, mos case topilgandan keyin qolgan barcha case lar ham bajariladi (fall-through)."
            },
            {
                id: 3,
                question: "for ($i = 0; $i < 5; $i++) tsikli necha marta bajariladi?",
                options: ["4 marta", "5 marta", "6 marta", "Cheksiz"],
                correct: 1,
                explanation: "$i 0 dan boshlab 4 gacha (5 ta qiymat: 0,1,2,3,4) bo'lgani uchun tsikl 5 marta bajariladi."
            },
            {
                id: 4,
                question: "while va do...while tsikllarining farqi nima?",
                options: [
                    "Farqi yo'q",
                    "do...while kamida 1 marta bajarilishni kafolatlaydi",
                    "while tezroq ishlaydi",
                    "do...while faqat sonlar bilan ishlaydi"
                ],
                correct: 1,
                explanation: "do...while tsikli avval kodni bajarib, keyin shartni tekshiradi — shu sababli kamida 1 marta bajariladi."
            },
            {
                id: 5,
                question: "foreach tsikli nima uchun ishlatiladi?",
                options: [
                    "Faqat sonlar bilan ishlash",
                    "Massiv elementlari ustida aylanish",
                    "Fayllarni o'qish",
                    "Funksiya yaratish"
                ],
                correct: 1,
                explanation: "foreach tsikli massiv elementlari ustida qulay tarzda aylanish (iteratsiya) uchun ishlatiladi."
            },
            {
                id: 6,
                question: "break operatori nima qiladi?",
                options: [
                    "Dasturni to'xtatadi",
                    "Tsiklni to'xtatadi va undan chiqadi",
                    "Keyingi iteratsiyaga o'tadi",
                    "Xatolik chiqaradi"
                ],
                correct: 1,
                explanation: "break tsiklni (yoki switch) to'xtatadi va undan to'liq chiqadi."
            },
            {
                id: 7,
                question: "continue operatori nima qiladi?",
                options: [
                    "Tsiklni to'xtatadi",
                    "Hozirgi iteratsiyani tashlab, keyingisiga o'tadi",
                    "Dasturni qayta boshlaydi",
                    "Yangi tsikl yaratadi"
                ],
                correct: 1,
                explanation: "continue joriy iteratsiyaning qolgan qismini tashlab, keyingi iteratsiyaga o'tadi."
            },
            {
                id: 8,
                question: "elseif (yoki else if) nima uchun ishlatiladi?",
                options: [
                    "Birinchi shart noto'g'ri bo'lganda yangi shartni tekshirish uchun",
                    "Tsiklni boshqarish uchun",
                    "Massivlarni solishtirish uchun",
                    "Funksiya yaratish uchun"
                ],
                correct: 0,
                explanation: "elseif birinchi if sharti noto'g'ri bo'lganda yangi qo'shimcha shartni tekshirish imkonini beradi."
            },
            {
                id: 9,
                question: "Quyidagi kodning natijasi nima? $x = 10; if ($x > 5) { echo 'Katta'; } else { echo 'Kichik'; }",
                options: ["Kichik", "Katta", "Xatolik", "Hech narsa"],
                correct: 1,
                explanation: "$x = 10 va 10 > 5 true bo'lgani uchun 'Katta' chiqadi."
            },
            {
                id: 10,
                question: "Ternary operator (?:) qanday ishlaydi?",
                options: [
                    "Tsikl yaratadi",
                    "Qisqa if/else shart: shart ? true_qiymat : false_qiymat",
                    "Massivni saralaydi",
                    "O'zgaruvchini o'chiradi"
                ],
                correct: 1,
                explanation: "Ternary operator if/else ning qisqacha yozilishi: $natija = ($x > 5) ? 'Katta' : 'Kichik';"
            }
        ]
    },

    // Modul 4: Funksiyalar va OOP (17-58 darslar)
    4: {
        title: "Funksiyalar va OOP",
        description: "Funksiyalar, OOP va ilg'or mavzularni sinab ko'ring",
        passingScore: 70,
        questions: [
            {
                id: 1,
                question: "PHP da funksiya qanday e'lon qilinadi?",
                options: [
                    "def funksiya_nomi()",
                    "function funksiya_nomi()",
                    "fn funksiya_nomi()",
                    "func funksiya_nomi()"
                ],
                correct: 1,
                explanation: "PHPda funksiya function kalit so'zi bilan e'lon qilinadi."
            },
            {
                id: 2,
                question: "return operatori nima qiladi?",
                options: [
                    "Funksiyaga qiymat uzatadi",
                    "Funksiyadan qiymat qaytaradi va uni to'xtatadi",
                    "Funksiyani chaqiradi",
                    "Funksiyani o'chiradi"
                ],
                correct: 1,
                explanation: "return funksiya ichidan qiymat qaytaradi va funksiya bajarilishini to'xtatadi."
            },
            {
                id: 3,
                question: "OOP da class nima?",
                options: [
                    "O'zgaruvchi turi",
                    "Ob'ektlar uchun shablon (blueprint)",
                    "Massivning turi",
                    "Funksiyaning nomi"
                ],
                correct: 1,
                explanation: "Class — bu ob'ektlar yaratish uchun shablon. Undagi xususiyatlar va metodlar ob'ektga ko'chiriladi."
            },
            {
                id: 4,
                question: "new kalit so'zi nima uchun ishlatiladi?",
                options: [
                    "Yangi funksiya yaratish",
                    "Classdan yangi ob'ekt yaratish",
                    "Yangi fayl yaratish",
                    "Yangi massiv yaratish"
                ],
                correct: 1,
                explanation: "new kalit so'zi class dan yangi ob'ekt (instance) yaratish uchun ishlatiladi."
            },
            {
                id: 5,
                question: "Constructor (__construct) qachon chaqiriladi?",
                options: [
                    "Ob'ekt o'chirilganda",
                    "Ob'ekt yaratilganda avtomatik chaqiriladi",
                    "Faqat qo'lda chaqirilganda",
                    "Dastur tugaganda"
                ],
                correct: 1,
                explanation: "__construct() metodi ob'ekt yaratilganda avtomatik ravishda chaqiriladi."
            },
            {
                id: 6,
                question: "public, private, protected — bular nima?",
                options: [
                    "Ma'lumot turlari",
                    "Kirish modifikatorlari (access modifiers)",
                    "Tsikl turlari",
                    "Funksiya turlari"
                ],
                correct: 1,
                explanation: "Bu kirish modifikatorlari: public — hamma joydan, private — faqat class ichidan, protected — class va farzandlaridan foydalanish mumkin."
            },
            {
                id: 7,
                question: "Merosxo'rlik (Inheritance) uchun qaysi kalit so'z ishlatiladi?",
                options: ["inherits", "extends", "implements", "includes"],
                correct: 1,
                explanation: "extends kalit so'zi bola class ni ota class dan meros olish uchun ishlatiladi."
            },
            {
                id: 8,
                question: "Abstract class haqida qaysi gap to'g'ri?",
                options: [
                    "Undan ob'ekt yaratish mumkin",
                    "Undan ob'ekt yaratish mumkin emas, faqat meros olish mumkin",
                    "Faqat bitta metod bo'lishi mumkin",
                    "Static bo'lishi shart"
                ],
                correct: 1,
                explanation: "Abstract classdan bevosita ob'ekt yaratib bo'lmaydi — faqat extends qilgan bolalar class lardan yaratish mumkin."
            },
            {
                id: 9,
                question: "Interface va Abstract class ning farqi nima?",
                options: [
                    "Farqi yo'q",
                    "Interface da faqat metod imzolari, abstract da bir qism metod tanasi bo'lishi mumkin",
                    "Interface faqat PHP 8 da ishlaydi",
                    "Abstract class tezroq ishlaydi"
                ],
                correct: 1,
                explanation: "Interface da faqat metod nomlari (imzolari) bo'ladi, abstract class da esa ba'zi metodlarning tanasi ham bo'lishi mumkin."
            },
            {
                id: 10,
                question: "static metod va xususiyat qanday chaqiriladi?",
                options: [
                    "$obj->metod()",
                    "ClassName::metod()",
                    "new ClassName->metod()",
                    "this->metod()"
                ],
                correct: 1,
                explanation: "Static metod va xususiyatlar :: (scope resolution operator) orqali chaqiriladi, ob'ekt yaratish shart emas."
            }
        ]
    },

    // Modul 5: Ma'lumotlar Bazasi (59-60 darslar)
    5: {
        title: "Ma'lumotlar Bazasi",
        description: "MySQL va ma'lumotlar bazasi haqidagi bilimlaringizni sinab ko'ring",
        passingScore: 70,
        questions: [
            {
                id: 1,
                question: "PHP da MySQL ga ulanish uchun eng zamonaviy usul qaysi?",
                options: ["mysql_connect()", "PDO", "fopen()", "curl_init()"],
                correct: 1,
                explanation: "PDO (PHP Data Objects) eng zamonaviy va xavfsiz usul bo'lib, turli ma'lumotlar bazalari bilan ishlash imkonini beradi."
            },
            {
                id: 2,
                question: "SQL da ma'lumot olish uchun qaysi buyruq ishlatiladi?",
                options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
                correct: 2,
                explanation: "SELECT buyrug'i ma'lumotlar bazasidan ma'lumotlarni o'qish (olish) uchun ishlatiladi."
            },
            {
                id: 3,
                question: "SQL Injection nima?",
                options: [
                    "Ma'lumot bazaga ma'lumot kiritish",
                    "Xakerlar zararli SQL kodni kiritib, bazani buzishi",
                    "Yangi jadval yaratish",
                    "Ma'lumot bazani optimallashtirish"
                ],
                correct: 1,
                explanation: "SQL Injection — haker foydalanuvchi kiritish maydoniga zararli SQL kod yozib, ma'lumotlar bazasiga ruxsatsiz kirishi yoki uni buzishi."
            },
            {
                id: 4,
                question: "Prepared statements nima uchun ishlatiladi?",
                options: [
                    "Kodni tezlashtirish",
                    "SQL Injection xurujidan himoyalanish",
                    "Yangi jadval yaratish",
                    "Ma'lumot bazani o'chirish"
                ],
                correct: 1,
                explanation: "Prepared statements SQL Injection dan himoya qiladi, chunki SQL buyruq va ma'lumotlar alohida yuboriladi."
            },
            {
                id: 5,
                question: "PDO da xatolikni ushlash uchun nima ishlatiladi?",
                options: [
                    "if/else",
                    "try/catch",
                    "switch/case",
                    "for tsikli"
                ],
                correct: 1,
                explanation: "PDO da xatoliklarni try/catch bloki orqali ushlab, PDOException bilan ishlash mumkin."
            },
            {
                id: 6,
                question: "INSERT INTO buyrug'i nima qiladi?",
                options: [
                    "Jadvaldan ma'lumot o'qiydi",
                    "Jadvalga yangi ma'lumot kiritadi",
                    "Jadvaldagi ma'lumotni yangilaydi",
                    "Jadvaldagi ma'lumotni o'chiradi"
                ],
                correct: 1,
                explanation: "INSERT INTO ma'lumotlar bazasining jadvaliga yangi qator (ma'lumot) qo'shish uchun ishlatiladi."
            },
            {
                id: 7,
                question: "WHERE kalit so'zi nima uchun ishlatiladi?",
                options: [
                    "Yangi jadval yaratish",
                    "Ma'lumotlarni filtrlash (shartga ko'ra tanlash)",
                    "Ma'lumot bazani o'chirish",
                    "Indeks yaratish"
                ],
                correct: 1,
                explanation: "WHERE SQL so'rovlarida ma'lumotlarni shartga ko'ra filtrlash uchun ishlatiladi."
            },
            {
                id: 8,
                question: "fetchAll() metodi nima qaytaradi?",
                options: [
                    "Bitta qatorni",
                    "Barcha natija qatorlarini massiv sifatida",
                    "Faqat birinchi ustunni",
                    "Xatolik xabarini"
                ],
                correct: 1,
                explanation: "fetchAll() so'rov natijasidagi barcha qatorlarni massiv sifatida qaytaradi."
            },
            {
                id: 9,
                question: "UPDATE buyrug'i nima qiladi?",
                options: [
                    "Jadvalni o'chiradi",
                    "Mavjud ma'lumotlarni yangilaydi",
                    "Yangi jadval yaratadi",
                    "Ma'lumot bazaga ulanadi"
                ],
                correct: 1,
                explanation: "UPDATE buyrug'i mavjud qatordagi ma'lumotlarni yangilash (o'zgartirish) uchun ishlatiladi."
            },
            {
                id: 10,
                question: "PHP da ma'lumotlar bazasiga ulanishni yopish uchun nima qilish kerak?",
                options: [
                    "close_db()",
                    "PDO ob'ektini null ga o'rnatish ($pdo = null)",
                    "disconnect()",
                    "Hech narsa qilish shart emas"
                ],
                correct: 1,
                explanation: "PDO da ulanishni yopish uchun ob'ektni null ga o'rnatish kifoya: $pdo = null;"
            }
        ]
    }
};
