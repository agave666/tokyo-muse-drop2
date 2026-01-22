export interface Model {
  id: string;
  display_name_en: string;
  display_name_ja: string;
  tagline_en: string;
  tagline_ja: string;
  instagram?: string;
  tiktok?: string;
  fansite?: string;
  photos: Photo[];
}

export interface Photo {
  id: string;
  filename: string;
  shoot_note_en: string;
  shoot_note_ja: string;
}

export const models: Model[] = [
  {
    id: 'model1',
    display_name_en: 'Sakura Tanaka',
    display_name_ja: '田中さくら',
    tagline_en: 'Tokyo-based fashion model',
    tagline_ja: '東京発ファッションモデル',
    instagram: 'https://instagram.com/sakura_tanaka',
    tiktok: 'https://tiktok.com/@sakura_tanaka',
    fansite: 'https://example.com/sakura',
    photos: [
      {
        id: 'photo1',
        filename: 'model1_1.jpg',
        shoot_note_en: 'Shot in Shibuya with natural lighting',
        shoot_note_ja: '渋谷で自然光撮影'
      },
      {
        id: 'photo2',
        filename: 'model1_2.jpg',
        shoot_note_en: 'Evening golden hour in Omotesando',
        shoot_note_ja: '表参道でゴールデンアワー撮影'
      },
      {
        id: 'photo3',
        filename: 'model1_3.jpg',
        shoot_note_en: 'Studio session in Harajuku',
        shoot_note_ja: '原宿スタジオ撮影'
      }
    ]
  },
  {
    id: 'model2',
    display_name_en: 'Yuki Matsumoto',
    display_name_ja: '松本ゆき',
    tagline_en: 'Editorial & street style',
    tagline_ja: 'エディトリアル＆ストリート',
    instagram: 'https://instagram.com/yuki_matsumoto',
    tiktok: 'https://tiktok.com/@yuki_matsumoto',
    fansite: 'https://example.com/yuki',
    photos: [
      {
        id: 'photo1',
        filename: 'model2_1.jpg',
        shoot_note_en: 'Urban exploration in Shinjuku',
        shoot_note_ja: '新宿アーバン撮影'
      },
      {
        id: 'photo2',
        filename: 'model2_2.jpg',
        shoot_note_en: 'Night lights in Akihabara',
        shoot_note_ja: '秋葉原ナイトライト撮影'
      },
      {
        id: 'photo3',
        filename: 'model2_3.jpg',
        shoot_note_en: 'Minimalist composition in Ginza',
        shoot_note_ja: '銀座ミニマル撮影'
      }
    ]
  },
  {
    id: 'model3',
    display_name_en: 'Mio Nakamura',
    display_name_ja: '中村美緒',
    tagline_en: 'Contemporary portraiture',
    tagline_ja: 'コンテンポラリーポートレート',
    instagram: 'https://instagram.com/mio_nakamura',
    tiktok: 'https://tiktok.com/@mio_nakamura',
    fansite: 'https://example.com/mio',
    photos: [
      {
        id: 'photo1',
        filename: 'model3_1.jpg',
        shoot_note_en: 'Natural beauty in Yoyogi Park',
        shoot_note_ja: '代々木公園自然美撮影'
      },
      {
        id: 'photo2',
        filename: 'model3_2.jpg',
        shoot_note_en: 'Soft afternoon in Daikanyama',
        shoot_note_ja: '代官山午後の柔らかな光'
      },
      {
        id: 'photo3',
        filename: 'model3_3.jpg',
        shoot_note_en: 'Bold colors in Nakameguro',
        shoot_note_ja: '中目黒ビビッドカラー撮影'
      }
    ]
  },
  {
    id: 'model4',
    display_name_en: 'Rina Kobayashi',
    display_name_ja: '小林里奈',
    tagline_en: 'Avant-garde fashion',
    tagline_ja: 'アバンギャルドファッション',
    instagram: 'https://instagram.com/rina_kobayashi',
    tiktok: 'https://tiktok.com/@rina_kobayashi',
    fansite: 'https://example.com/rina',
    photos: [
      {
        id: 'photo1',
        filename: 'model4_1.jpg',
        shoot_note_en: 'Architectural lines in Roppongi',
        shoot_note_ja: '六本木建築ライン撮影'
      },
      {
        id: 'photo2',
        filename: 'model4_2.jpg',
        shoot_note_en: 'Dramatic shadows in Ebisu',
        shoot_note_ja: '恵比寿ドラマティックシャドウ'
      },
      {
        id: 'photo3',
        filename: 'model4_3.jpg',
        shoot_note_en: 'Monochrome elegance in Marunouchi',
        shoot_note_ja: '丸の内モノクロエレガンス'
      }
    ]
  },
  {
    id: 'model5',
    display_name_en: 'Hana Suzuki',
    display_name_ja: '鈴木花',
    tagline_en: 'Natural & ethereal',
    tagline_ja: 'ナチュラル＆エセリアル',
    instagram: 'https://instagram.com/hana_suzuki',
    tiktok: 'https://tiktok.com/@hana_suzuki',
    fansite: 'https://example.com/hana',
    photos: [
      {
        id: 'photo1',
        filename: 'model5_1.jpg',
        shoot_note_en: 'Cherry blossoms in Ueno',
        shoot_note_ja: '上野桜撮影'
      },
      {
        id: 'photo2',
        filename: 'model5_2.jpg',
        shoot_note_en: 'Soft morning light in Aoyama',
        shoot_note_ja: '青山朝の柔らかな光'
      },
      {
        id: 'photo3',
        filename: 'model5_3.jpg',
        shoot_note_en: 'Dreamy atmosphere in Meguro',
        shoot_note_ja: '目黒ドリーミーな雰囲気'
      }
    ]
  }
];
