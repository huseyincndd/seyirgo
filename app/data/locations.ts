export const CITIES = [
  'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 'Konya',
  'Gaziantep', 'Mersin', 'Kayseri', 'Eskişehir', 'Kocaeli', 'Samsun',
  'Denizli', 'Trabzon', 'Diyarbakır', 'Erzurum', 'Malatya', 'Şanlıurfa',
  'Van', 'Batman', 'Mardin', 'Elazığ', 'Manisa', 'Balıkesir', 'Aydın'
];

export const DISTRICTS: Record<string, string[]> = {
  'İstanbul': ['Kadıköy', 'Beşiktaş', 'Şişli', 'Üsküdar', 'Beyoğlu', 'Bakırköy', 'Esenyurt', 'Pendik', 'Ümraniye', 'Tuzla', 'Maltepe', 'Başakşehir', 'Avcılar', 'Ataşehir', 'Kartal'],
  'Ankara': ['Çankaya', 'Keçiören', 'Yenimahalle', 'Mamak', 'Etimesgut', 'Sincan', 'Altındağ', 'Pursaklar', 'Gölbaşı', 'Polatlı'],
  'İzmir': ['Karşıyaka', 'Bornova', 'Konak', 'Buca', 'Balçova', 'Çiğli', 'Gaziemir', 'Bayraklı', 'Karabağlar', 'Tire', 'Çeşme', 'Urla'],
  'Bursa': ['Nilüfer', 'Osmangazi', 'Yıldırım', 'İnegöl', 'Gemlik', 'Mudanya', 'Gürsu', 'Kestel', 'Karacabey', 'Mustafakemalpaşa'],
  'Antalya': ['Muratpaşa', 'Kepez', 'Konyaaltı', 'Döşemealtı', 'Alanya', 'Manavgat', 'Serik', 'Kemer', 'Aksu', 'Kumluca'],
  'Adana': ['Seyhan', 'Yüreğir', 'Çukurova', 'Sarıçam', 'Ceyhan', 'Kozan'],
  'Konya': ['Selçuklu', 'Meram', 'Karatay', 'Ereğli', 'Akşehir'],
  'Gaziantep': ['Şahinbey', 'Şehitkamil', 'Nizip', 'İslahiye'],
  'Mersin': ['Akdeniz', 'Mezitli', 'Yenişehir', 'Toroslar', 'Tarsus'],
  'Kayseri': ['Kocasinan', 'Melikgazi', 'Talas', 'Develi'],
  'Eskişehir': ['Odunpazarı', 'Tepebaşı'],
  'Kocaeli': ['İzmit', 'Gebze', 'Darıca', 'Gölcük', 'Körfez', 'Derince', 'Çayırova', 'Kartepe'],
};

// Eğer şehir için ilçe listesi yoksa, varsayılan bir ilçe listesi döndür
export const getDefaultDistricts = (city: string) => {
  return DISTRICTS[city] || ['Merkez', 'Diğer'];
};

export const CUSTOMS_GATES = [
  'Erenköy Gümrük Müdürlüğü (İstanbul)',
  'Muratbey Gümrük Müdürlüğü (İstanbul)',
  'Ambarlı Gümrük Müdürlüğü (İstanbul)',
  'Halkalı Gümrük Müdürlüğü (İstanbul)',
  'Pendik Gümrük Müdürlüğü (İstanbul)',
  'Ankara Gümrük Müdürlüğü (Ankara)',
  'İzmir Gümrük Müdürlüğü (İzmir)',
  'Bursa Gümrük Müdürlüğü (Bursa)',
  'Mersin Gümrük Müdürlüğü (Mersin)',
  'Kapıkule Sınır Kapısı (Edirne)',
  'Hamzabeyli Sınır Kapısı (Edirne)',
  'İpsala Sınır Kapısı (Edirne)',
  'Habur Sınır Kapısı (Şırnak)',
  'Sarp Sınır Kapısı (Artvin)',
  'Gürbulak Sınır Kapısı (Ağrı)',
  'Dilucu Sınır Kapısı (Iğdır)',
];
