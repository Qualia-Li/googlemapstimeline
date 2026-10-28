/**
 * Strings for the visualizer and the localized tool pages (/ko, /id, /vi, /ja).
 * Locales were picked from Search Console demand: Indonesia, Vietnam, Korea and Japan
 * are the largest non-English-speaking countries by impressions, and Korean and
 * Indonesian users search in their own language (타임라인 비주얼라이저, linimasa visualizer).
 */

export const SITE_URL = "https://www.googlemapstimeline.com";

export const LOCALES = ["ko", "id", "vi", "ja"] as const;
export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Language names shown in the language switcher, each in its own language. */
export const LANGUAGE_NAMES: Record<"en" | Locale, string> = {
  en: "English",
  ko: "한국어",
  id: "Bahasa Indonesia",
  vi: "Tiếng Việt",
  ja: "日本語",
};

/** hreflang map shared by the English home page and every localized page. */
export function homeAlternates(): Record<string, string> {
  const languages: Record<string, string> = { en: SITE_URL, "x-default": SITE_URL };
  for (const l of LOCALES) languages[l] = `${SITE_URL}/${l}`;
  return languages;
}

export interface UiStrings {
  uploadHeading: string;
  uploadAria: string;
  processing: string;
  uploadSuccess: string;
  uploadAnother: string;
  uploadPrompt: string;
  uploadHint: string;
  selectFile: string;
  guideLink: string;
  guideHref: string;
  errJsonOnly: string;
  errNotTimeline: string;
  errRead: string;
  errParse: string;
  errorTitle: string;
  tryAgain: string;
  last24h: string;
  lastWeek: string;
  lastMonth: string;
  uploadDifferent: string;
  totalLocations: string;
  placesVisited: string;
  distance: string;
  journeyLength: string;
  dateRange: string;
  selectedPeriod: string;
  dataPoints: string;
  timelineEntries: string;
  none: string;
  noData: string;
  pickDateRange: string;
  quickSelect: string;
  today: string;
  yesterday: string;
  last7: string;
  last30: string;
  presetLastWeek: string;
  presetLastMonth: string;
  thisYear: string;
  past12: string;
}

export const EN_UI: UiStrings = {
  uploadHeading: "Upload Your Location History",
  uploadAria: "Upload your Google Maps Timeline JSON file",
  processing: "Processing your file...",
  uploadSuccess: "File uploaded successfully!",
  uploadAnother: "Upload a different file",
  uploadPrompt: "Upload your Location History file",
  uploadHint:
    "Drag and drop your Google Maps Timeline (Location History) JSON file here, or click to select",
  selectFile: "Select File",
  guideLink: "Step by step guide to export your Google Maps Timeline data",
  guideHref: "/blog/export-google-timeline-data",
  errJsonOnly: "Please upload a JSON file",
  errNotTimeline: "This doesn't appear to be a Google Maps Timeline (Location History) file",
  errRead: "Error reading the file",
  errParse: "Failed to parse file",
  errorTitle: "Error Loading Data",
  tryAgain: "Try Again",
  last24h: "Last 24 Hours",
  lastWeek: "Last Week",
  lastMonth: "Last Month",
  uploadDifferent: "Upload Different File",
  totalLocations: "Total Locations",
  placesVisited: "Places visited",
  distance: "Distance Traveled",
  journeyLength: "Total journey length",
  dateRange: "Date Range",
  selectedPeriod: "Selected period",
  dataPoints: "Data Points",
  timelineEntries: "Timeline entries",
  none: "None",
  noData: "No location data available for the selected date range",
  pickDateRange: "Pick a date range",
  quickSelect: "Quick Select",
  today: "Today",
  yesterday: "Yesterday",
  last7: "Last 7 days",
  last30: "Last 30 days",
  presetLastWeek: "Last Week",
  presetLastMonth: "Last Month",
  thisYear: "This Year",
  past12: "Past 12 Months",
};

export interface LocalePage {
  /** BCP 47 tag for Intl date formatting and og:locale. */
  intl: string;
  ogLocale: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  howToTitle: string;
  steps: { title: string; body: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  englishGuides: string;
  ui: UiStrings;
}

export const LOCALE_PAGES: Record<Locale, LocalePage> = {
  ko: {
    intl: "ko-KR",
    ogLocale: "ko_KR",
    metaTitle: "타임라인 비주얼라이저 - 구글 타임라인을 지도로 보기 (무료)",
    metaDescription:
      "구글 타임라인 비주얼라이저: 구글 지도 타임라인 JSON 파일을 올리면 다녀온 장소와 이동 경로를 지도에 표시합니다. 무료이며 데이터는 브라우저 밖으로 나가지 않습니다.",
    h1: "타임라인 비주얼라이저 (구글 지도 타임라인)",
    intro:
      "구글 지도에서 내보낸 타임라인 파일을 올리면 방문한 장소, 이동 경로, 총 이동 거리를 지도 위에서 바로 확인할 수 있습니다. 회원가입이나 앱 설치가 필요 없고, 파일은 서버로 전송되지 않고 내 브라우저에서만 처리됩니다.",
    howToTitle: "사용 방법",
    steps: [
      {
        title: "1. 타임라인 데이터 내보내기 (안드로이드)",
        body: "휴대전화 설정 > 위치 > 위치 서비스 > 타임라인 > 타임라인 데이터 내보내기를 누르면 Timeline.json 파일이 저장됩니다.",
      },
      {
        title: "1. 타임라인 데이터 내보내기 (아이폰)",
        body: "구글 지도 앱에서 프로필 사진 > 내 타임라인 > 오른쪽 위 점 세 개(⋯) > 위치 및 개인정보 보호 설정 > 타임라인 데이터 내보내기를 누르고, 파일을 에어드롭이나 이메일로 컴퓨터에 옮깁니다.",
      },
      {
        title: "2. 파일 올리기",
        body: "위의 업로드 상자에 JSON 파일을 끌어다 놓거나 '파일 선택'을 누릅니다. 안드로이드의 Timeline.json과 아이폰의 location-history.json 모두 지원합니다.",
      },
      {
        title: "3. 기간 선택",
        body: "날짜 범위를 고르면 그 기간에 방문한 장소와 이동 경로, 이동 거리가 지도와 통계로 표시됩니다.",
      },
    ],
    faqTitle: "자주 묻는 질문",
    faq: [
      { q: "무료인가요?", a: "네, 완전히 무료입니다." },
      {
        q: "내 위치 데이터는 안전한가요?",
        a: "네. 이 사이트에는 데이터를 받는 백엔드 서버가 없습니다. 모든 처리는 내 브라우저 안에서만 이루어지며 파일은 어디에도 업로드되지 않습니다.",
      },
      {
        q: "구글 공식 서비스인가요?",
        a: "아니요. 여행 경로를 지도로 보고 싶었던 개발자가 만든 독립 프로젝트이며 구글과는 관계가 없습니다.",
      },
      {
        q: "앱을 다운로드해야 하나요?",
        a: "아니요. 웹 브라우저에서 바로 쓰는 도구라 설치할 것이 없습니다. 휴대전화 브라우저에서도 열 수 있지만 큰 파일은 컴퓨터에서 여는 편이 편합니다.",
      },
      {
        q: "코드를 직접 확인할 수 있나요?",
        a: "네. 소스 코드는 github.com/Qualia-Li/googlemapstimeline 에 공개되어 있고, API 키 없이 직접 호스팅할 수도 있습니다.",
      },
    ],
    englishGuides: "더 자세한 영어 가이드",
    ui: {
      uploadHeading: "위치 기록 파일 올리기",
      uploadAria: "구글 지도 타임라인 JSON 파일 올리기",
      processing: "파일을 처리하는 중...",
      uploadSuccess: "파일을 불러왔습니다!",
      uploadAnother: "다른 파일 올리기",
      uploadPrompt: "위치 기록(타임라인) 파일을 올려 주세요",
      uploadHint: "구글 지도 타임라인 JSON 파일을 여기에 끌어다 놓거나 클릭해서 선택하세요",
      selectFile: "파일 선택",
      guideLink: "구글 지도 타임라인 데이터 내보내는 방법 (영어)",
      guideHref: "/export-google-maps-timeline",
      errJsonOnly: "JSON 파일을 올려 주세요",
      errNotTimeline: "구글 지도 타임라인(위치 기록) 파일이 아닌 것 같습니다",
      errRead: "파일을 읽는 중 오류가 발생했습니다",
      errParse: "파일을 해석하지 못했습니다",
      errorTitle: "데이터를 불러오지 못했습니다",
      tryAgain: "다시 시도",
      last24h: "최근 24시간",
      lastWeek: "최근 1주",
      lastMonth: "지난달",
      uploadDifferent: "다른 파일 올리기",
      totalLocations: "방문 장소",
      placesVisited: "다녀온 곳",
      distance: "이동 거리",
      journeyLength: "총 이동 거리",
      dateRange: "기간",
      selectedPeriod: "선택한 기간",
      dataPoints: "데이터 수",
      timelineEntries: "타임라인 항목",
      none: "없음",
      noData: "선택한 기간에 위치 데이터가 없습니다",
      pickDateRange: "기간 선택",
      quickSelect: "빠른 선택",
      today: "오늘",
      yesterday: "어제",
      last7: "최근 7일",
      last30: "최근 30일",
      presetLastWeek: "지난주",
      presetLastMonth: "지난달",
      thisYear: "올해",
      past12: "최근 12개월",
    },
  },
  id: {
    intl: "id-ID",
    ogLocale: "id_ID",
    metaTitle: "Linimasa Visualizer - Lihat Linimasa Google Maps di Peta (Gratis)",
    metaDescription:
      "Linimasa visualizer gratis: unggah file JSON Linimasa Google Maps dan lihat tempat yang pernah dikunjungi serta rute perjalanan di peta. Data tidak pernah keluar dari browser.",
    h1: "Linimasa Visualizer (Timeline Visualizer Google Maps)",
    intro:
      "Unggah file Linimasa yang diekspor dari Google Maps untuk melihat tempat yang pernah Anda kunjungi, rute perjalanan, dan total jarak tempuh di peta interaktif. Tidak perlu daftar akun atau instal aplikasi, dan file diproses di browser Anda sendiri, tidak dikirim ke server.",
    howToTitle: "Cara menggunakan",
    steps: [
      {
        title: "1. Ekspor data Linimasa (Android)",
        body: "Buka Setelan ponsel > Lokasi > Layanan lokasi > Linimasa > Ekspor data Linimasa. File Timeline.json akan tersimpan di ponsel.",
      },
      {
        title: "1. Ekspor data Linimasa (iPhone)",
        body: "Di aplikasi Google Maps, ketuk foto profil > Linimasa Anda > titik tiga (⋯) di kanan atas > Setelan lokasi & privasi > Ekspor data Linimasa, lalu kirim file ke komputer lewat AirDrop atau email.",
      },
      {
        title: "2. Unggah file",
        body: "Tarik file JSON ke kotak unggah di atas atau klik 'Pilih File'. Timeline.json dari Android dan location-history.json dari iPhone sama-sama didukung.",
      },
      {
        title: "3. Pilih rentang tanggal",
        body: "Pilih tanggal untuk melihat tempat yang dikunjungi, rute, dan jarak tempuh pada periode itu.",
      },
    ],
    faqTitle: "Pertanyaan yang sering diajukan",
    faq: [
      { q: "Apakah gratis?", a: "Ya, sepenuhnya gratis." },
      {
        q: "Apakah data lokasi saya aman?",
        a: "Ya. Situs ini tidak punya server backend yang menerima data. Semua pemrosesan terjadi di browser Anda dan file tidak diunggah ke mana pun.",
      },
      {
        q: "Apakah ini layanan resmi Google?",
        a: "Bukan. Ini proyek independen buatan seorang programmer yang ingin melihat rute perjalanannya di peta, dan tidak berafiliasi dengan Google.",
      },
      {
        q: "Apakah perlu download aplikasi?",
        a: "Tidak. Alat ini berjalan langsung di browser, jadi tidak ada yang perlu diinstal. Bisa dibuka di browser ponsel, tetapi file besar lebih nyaman dibuka di komputer.",
      },
      {
        q: "Bisakah saya memeriksa kodenya?",
        a: "Bisa. Kode sumbernya terbuka di github.com/Qualia-Li/googlemapstimeline dan bisa Anda host sendiri tanpa API key.",
      },
    ],
    englishGuides: "Panduan lengkap (bahasa Inggris)",
    ui: {
      uploadHeading: "Unggah Riwayat Lokasi Anda",
      uploadAria: "Unggah file JSON Linimasa Google Maps",
      processing: "Memproses file...",
      uploadSuccess: "File berhasil diunggah!",
      uploadAnother: "Unggah file lain",
      uploadPrompt: "Unggah file Riwayat Lokasi (Linimasa) Anda",
      uploadHint: "Tarik dan lepas file JSON Linimasa Google Maps di sini, atau klik untuk memilih",
      selectFile: "Pilih File",
      guideLink: "Cara ekspor data Linimasa Google Maps (bahasa Inggris)",
      guideHref: "/export-google-maps-timeline",
      errJsonOnly: "Silakan unggah file JSON",
      errNotTimeline: "File ini tampaknya bukan file Linimasa (Riwayat Lokasi) Google Maps",
      errRead: "Gagal membaca file",
      errParse: "Gagal memproses file",
      errorTitle: "Gagal Memuat Data",
      tryAgain: "Coba Lagi",
      last24h: "24 Jam Terakhir",
      lastWeek: "Minggu Terakhir",
      lastMonth: "Bulan Lalu",
      uploadDifferent: "Unggah File Lain",
      totalLocations: "Total Lokasi",
      placesVisited: "Tempat yang dikunjungi",
      distance: "Jarak Tempuh",
      journeyLength: "Total panjang perjalanan",
      dateRange: "Rentang Tanggal",
      selectedPeriod: "Periode terpilih",
      dataPoints: "Titik Data",
      timelineEntries: "Entri Linimasa",
      none: "Tidak ada",
      noData: "Tidak ada data lokasi pada rentang tanggal yang dipilih",
      pickDateRange: "Pilih rentang tanggal",
      quickSelect: "Pilihan Cepat",
      today: "Hari ini",
      yesterday: "Kemarin",
      last7: "7 hari terakhir",
      last30: "30 hari terakhir",
      presetLastWeek: "Minggu lalu",
      presetLastMonth: "Bulan lalu",
      thisYear: "Tahun ini",
      past12: "12 bulan terakhir",
    },
  },
  vi: {
    intl: "vi-VN",
    ogLocale: "vi_VN",
    metaTitle: "Timeline Visualizer - Xem Dòng thời gian Google Maps trên bản đồ (Miễn phí)",
    metaDescription:
      "Timeline visualizer miễn phí: tải lên tệp JSON Dòng thời gian Google Maps để xem những nơi đã đến và lộ trình di chuyển trên bản đồ. Dữ liệu không rời khỏi trình duyệt của bạn.",
    h1: "Timeline Visualizer: Xem Dòng thời gian Google Maps",
    intro:
      "Tải lên tệp Dòng thời gian xuất từ Google Maps để xem những nơi bạn đã đến, lộ trình di chuyển và tổng quãng đường trên bản đồ tương tác. Không cần đăng ký hay cài ứng dụng, tệp được xử lý ngay trong trình duyệt và không gửi lên máy chủ nào.",
    howToTitle: "Cách sử dụng",
    steps: [
      {
        title: "1. Xuất dữ liệu Dòng thời gian (Android)",
        body: "Mở Cài đặt điện thoại > Vị trí > Dịch vụ vị trí > Dòng thời gian > Xuất dữ liệu Dòng thời gian. Tệp Timeline.json sẽ được lưu vào máy.",
      },
      {
        title: "1. Xuất dữ liệu Dòng thời gian (iPhone)",
        body: "Trong ứng dụng Google Maps, chạm ảnh hồ sơ > Dòng thời gian của bạn > dấu ba chấm (⋯) ở góc trên > Cài đặt vị trí và quyền riêng tư > Xuất dữ liệu Dòng thời gian, rồi gửi tệp sang máy tính bằng AirDrop hoặc email.",
      },
      {
        title: "2. Tải tệp lên",
        body: "Kéo tệp JSON vào ô tải lên ở trên hoặc bấm 'Chọn tệp'. Hỗ trợ cả Timeline.json của Android và location-history.json của iPhone.",
      },
      {
        title: "3. Chọn khoảng thời gian",
        body: "Chọn ngày để xem các địa điểm đã đến, lộ trình và quãng đường di chuyển trong khoảng thời gian đó.",
      },
    ],
    faqTitle: "Câu hỏi thường gặp",
    faq: [
      { q: "Công cụ này có miễn phí không?", a: "Có, hoàn toàn miễn phí." },
      {
        q: "Dữ liệu vị trí của tôi có an toàn không?",
        a: "Có. Trang web không có máy chủ backend nhận dữ liệu. Mọi xử lý đều diễn ra trong trình duyệt của bạn và tệp không được tải lên đâu cả.",
      },
      {
        q: "Đây có phải dịch vụ chính thức của Google không?",
        a: "Không. Đây là dự án độc lập của một lập trình viên muốn xem lại lộ trình du lịch của mình trên bản đồ, không liên kết với Google.",
      },
      {
        q: "Có cần tải ứng dụng không?",
        a: "Không. Công cụ chạy trực tiếp trên trình duyệt nên không cần cài đặt. Bạn có thể mở trên điện thoại, nhưng tệp lớn sẽ dễ xem hơn trên máy tính.",
      },
      {
        q: "Tôi có thể kiểm tra mã nguồn không?",
        a: "Có. Mã nguồn được công khai tại github.com/Qualia-Li/googlemapstimeline và bạn có thể tự host mà không cần API key.",
      },
    ],
    englishGuides: "Hướng dẫn chi tiết (tiếng Anh)",
    ui: {
      uploadHeading: "Tải lên Lịch sử vị trí",
      uploadAria: "Tải lên tệp JSON Dòng thời gian Google Maps",
      processing: "Đang xử lý tệp...",
      uploadSuccess: "Tải tệp lên thành công!",
      uploadAnother: "Tải tệp khác",
      uploadPrompt: "Tải lên tệp Lịch sử vị trí (Dòng thời gian)",
      uploadHint: "Kéo và thả tệp JSON Dòng thời gian Google Maps vào đây, hoặc bấm để chọn",
      selectFile: "Chọn tệp",
      guideLink: "Cách xuất dữ liệu Dòng thời gian Google Maps (tiếng Anh)",
      guideHref: "/export-google-maps-timeline",
      errJsonOnly: "Vui lòng tải lên tệp JSON",
      errNotTimeline: "Tệp này có vẻ không phải tệp Dòng thời gian (Lịch sử vị trí) của Google Maps",
      errRead: "Lỗi khi đọc tệp",
      errParse: "Không đọc được nội dung tệp",
      errorTitle: "Không tải được dữ liệu",
      tryAgain: "Thử lại",
      last24h: "24 giờ qua",
      lastWeek: "Tuần qua",
      lastMonth: "Tháng trước",
      uploadDifferent: "Tải tệp khác",
      totalLocations: "Tổng số địa điểm",
      placesVisited: "Nơi đã đến",
      distance: "Quãng đường",
      journeyLength: "Tổng quãng đường di chuyển",
      dateRange: "Khoảng thời gian",
      selectedPeriod: "Thời gian đã chọn",
      dataPoints: "Điểm dữ liệu",
      timelineEntries: "Mục Dòng thời gian",
      none: "Không có",
      noData: "Không có dữ liệu vị trí trong khoảng thời gian đã chọn",
      pickDateRange: "Chọn khoảng thời gian",
      quickSelect: "Chọn nhanh",
      today: "Hôm nay",
      yesterday: "Hôm qua",
      last7: "7 ngày qua",
      last30: "30 ngày qua",
      presetLastWeek: "Tuần trước",
      presetLastMonth: "Tháng trước",
      thisYear: "Năm nay",
      past12: "12 tháng qua",
    },
  },
  ja: {
    intl: "ja-JP",
    ogLocale: "ja_JP",
    metaTitle: "Timeline Visualizer - Googleマップのタイムラインを地図で見る（無料）",
    metaDescription:
      "無料のタイムラインビジュアライザー。GoogleマップのタイムラインJSONファイルを読み込むと、訪れた場所と移動ルートを地図に表示します。データはブラウザの外に送信されません。",
    h1: "Timeline Visualizer（Googleマップ タイムライン ビューア）",
    intro:
      "Googleマップから書き出したタイムラインのファイルを読み込むと、訪れた場所、移動ルート、総移動距離をインタラクティブな地図で確認できます。登録もアプリのインストールも不要で、ファイルはサーバーに送られずブラウザ内だけで処理されます。",
    howToTitle: "使い方",
    steps: [
      {
        title: "1. タイムラインのデータをエクスポート（Android）",
        body: "端末の設定 > 位置情報 > 位置情報サービス > タイムライン > タイムライン データをエクスポート を開くと、Timeline.json が保存されます。",
      },
      {
        title: "1. タイムラインのデータをエクスポート（iPhone）",
        body: "Googleマップアプリでプロフィール写真 > タイムライン > 右上のその他アイコン（⋯）> 位置情報とプライバシーの設定 > タイムライン データをエクスポート をタップし、AirDrop やメールでパソコンに送ります。",
      },
      {
        title: "2. ファイルを読み込む",
        body: "上のアップロード欄に JSON ファイルをドラッグするか「ファイルを選択」を押します。Android の Timeline.json と iPhone の location-history.json のどちらにも対応しています。",
      },
      {
        title: "3. 期間を選ぶ",
        body: "日付の範囲を選ぶと、その期間に訪れた場所、移動ルート、移動距離が地図と統計に表示されます。",
      },
    ],
    faqTitle: "よくある質問",
    faq: [
      { q: "無料ですか？", a: "はい、完全に無料です。" },
      {
        q: "位置情報データは安全ですか？",
        a: "はい。このサイトにはデータを受け取るバックエンドサーバーがありません。処理はすべてお使いのブラウザ内で行われ、ファイルはどこにもアップロードされません。",
      },
      {
        q: "Google の公式サービスですか？",
        a: "いいえ。旅行のルートを地図で見たかった開発者による個人プロジェクトで、Google とは関係ありません。",
      },
      {
        q: "アプリのダウンロードは必要ですか？",
        a: "いいえ。ブラウザで直接動くツールなのでインストールは不要です。スマートフォンのブラウザでも開けますが、大きなファイルはパソコンのほうが快適です。",
      },
      {
        q: "コードを確認できますか？",
        a: "はい。ソースコードは github.com/Qualia-Li/googlemapstimeline で公開しており、API キーなしで自分でホストすることもできます。",
      },
    ],
    englishGuides: "詳しいガイド（英語）",
    ui: {
      uploadHeading: "ロケーション履歴を読み込む",
      uploadAria: "Googleマップ タイムラインの JSON ファイルを読み込む",
      processing: "ファイルを処理しています...",
      uploadSuccess: "ファイルを読み込みました！",
      uploadAnother: "別のファイルを読み込む",
      uploadPrompt: "ロケーション履歴（タイムライン）のファイルを読み込んでください",
      uploadHint: "GoogleマップのタイムラインJSONファイルをここにドラッグ＆ドロップするか、クリックして選択してください",
      selectFile: "ファイルを選択",
      guideLink: "Googleマップ タイムラインのデータをエクスポートする方法（英語）",
      guideHref: "/export-google-maps-timeline",
      errJsonOnly: "JSON ファイルを選んでください",
      errNotTimeline: "Googleマップのタイムライン（ロケーション履歴）のファイルではないようです",
      errRead: "ファイルの読み込み中にエラーが発生しました",
      errParse: "ファイルを解析できませんでした",
      errorTitle: "データを読み込めませんでした",
      tryAgain: "もう一度試す",
      last24h: "過去24時間",
      lastWeek: "過去1週間",
      lastMonth: "先月",
      uploadDifferent: "別のファイルを読み込む",
      totalLocations: "場所の数",
      placesVisited: "訪れた場所",
      distance: "移動距離",
      journeyLength: "総移動距離",
      dateRange: "期間",
      selectedPeriod: "選択した期間",
      dataPoints: "データ件数",
      timelineEntries: "タイムラインの項目",
      none: "なし",
      noData: "選択した期間の位置情報データはありません",
      pickDateRange: "期間を選択",
      quickSelect: "クイック選択",
      today: "今日",
      yesterday: "昨日",
      last7: "過去7日間",
      last30: "過去30日間",
      presetLastWeek: "先週",
      presetLastMonth: "先月",
      thisYear: "今年",
      past12: "過去12か月",
    },
  },
};
