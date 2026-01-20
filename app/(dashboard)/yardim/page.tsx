'use client';
import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronRight,
  MessageSquare,
  Phone,
  Mail,
  FileText,
  Truck,
  CreditCard,
  Shield,
  Users,
  ExternalLink
} from 'lucide-react';

// SSS Kategorileri ve Soruları
const FAQ_CATEGORIES = [
  {
    id: 'general',
    title: 'Genel Sorular',
    icon: HelpCircle,
    questions: [
      {
        q: 'SeyirGo nedir?',
        a: 'SeyirGo, yük verenler ile taşıyıcıları buluşturan dijital bir lojistik platformudur. Güvenli ödeme sistemi ve doğrulanmış taşıyıcı ağımız ile taşımacılık süreçlerinizi kolaylaştırıyoruz.'
      },
      {
        q: 'Platforma nasıl üye olabilirim?',
        a: 'Kayıt Ol butonuna tıklayarak yük veren veya taşıyıcı olarak üyelik oluşturabilirsiniz. Gerekli belgelerinizi yükledikten sonra hesabınız onaylanacaktır.'
      },
      {
        q: 'Hesap onayı ne kadar sürer?',
        a: 'Hesap onay süreci genellikle 24-48 saat içinde tamamlanır. Belgelerinizin eksiksiz olması süreci hızlandırır.'
      },
    ]
  },
  {
    id: 'shipping',
    title: 'Taşımacılık',
    icon: Truck,
    questions: [
      {
        q: 'Yük ilanı nasıl oluştururum?',
        a: 'Dashboard > Yeni Yük İlanı bölümünden yükünüzün detaylarını girerek ilan oluşturabilirsiniz. Kalkış, varış, yük tipi ve tarih bilgilerini ekledikten sonra ilanınız yayınlanır.'
      },
      {
        q: 'Taşıyıcı seçerken nelere dikkat etmeliyim?',
        a: 'Taşıyıcının puan ve yorumlarını, tamamlanan taşıma sayısını ve belge durumunu kontrol edin. Doğrulanmış taşıyıcıları tercih etmenizi öneririz.'
      },
      {
        q: 'Taşıma sürecini nasıl takip ederim?',
        a: 'Aktif Taşımalar sayfasından taşımanızı canlı olarak takip edebilirsiniz. Konum güncellemeleri ve tahmini varış süresi bu sayfada görüntülenir.'
      },
    ]
  },
  {
    id: 'payment',
    title: 'Ödeme & Faturalama',
    icon: CreditCard,
    questions: [
      {
        q: 'Ödeme nasıl yapılır?',
        a: 'Kredi kartı, banka havalesi veya SeyirGo bakiyesi ile ödeme yapabilirsiniz. Ödeme, taşıma tamamlanana kadar güvence altında tutulur.'
      },
      {
        q: 'Fatura nasıl alırım?',
        a: 'Her tamamlanan taşıma için otomatik olarak fatura oluşturulur. Ödemeler sayfasından faturalarınızı indirebilirsiniz.'
      },
      {
        q: 'Para çekme işlemi ne kadar sürer?',
        a: 'Para çekme talepleri 1-3 iş günü içinde hesabınıza aktarılır.'
      },
    ]
  },
  {
    id: 'security',
    title: 'Güvenlik',
    icon: Shield,
    questions: [
      {
        q: 'Verilerim güvende mi?',
        a: 'Evet, tüm verileriniz SSL şifreleme ile korunmaktadır. KVKK uyumlu altyapımız ile kişisel verileriniz güvende.'
      },
      {
        q: 'Şüpheli aktivite fark edersem ne yapmalıyım?',
        a: 'Hemen destek ekibimizle iletişime geçin. Şüpheli durumları 7/24 destek hattımıza bildirebilirsiniz.'
      },
    ]
  },
];

// Destek Kanalları
const SUPPORT_CHANNELS = [
  {
    title: 'Canlı Destek',
    description: 'Hemen bir temsilci ile görüşün',
    icon: MessageSquare,
    action: 'Sohbet Başlat',
    color: 'bg-brand-dark',
  },
  {
    title: 'Telefon',
    description: '0850 123 45 67',
    icon: Phone,
    action: 'Şimdi Ara',
    color: 'bg-green-600',
  },
  {
    title: 'E-posta',
    description: 'destek@seyirgo.net',
    icon: Mail,
    action: 'E-posta Gönder',
    color: 'bg-brand-accent',
  },
];

export default function YardimPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>('general');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-2xl font-black text-gray-900">Yardım Merkezi</h1>
        <p className="text-gray-500 font-medium mt-2">
          Sorularınızın cevaplarını bulun veya destek ekibimizle iletişime geçin
        </p>

        {/* Search */}
        <div className="mt-6 relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Soru veya konu ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-dark/10 focus:border-brand-dark shadow-sm"
          />
        </div>
      </div>

      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SUPPORT_CHANNELS.map((channel) => {
          const Icon = channel.icon;
          return (
            <div 
              key={channel.title}
              className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:border-gray-300 transition-colors"
            >
              <div className={`w-14 h-14 ${channel.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4`}>
                <Icon size={24} />
              </div>
              <h3 className="font-bold text-gray-900">{channel.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{channel.description}</p>
              <button className={`mt-4 px-4 py-2 ${channel.color} text-white font-bold text-sm rounded-xl hover:brightness-110 transition-colors`}>
                {channel.action}
              </button>
            </div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Sıkça Sorulan Sorular</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {FAQ_CATEGORIES.map((category) => {
            const Icon = category.icon;
            const isExpanded = expandedCategory === category.id;

            return (
              <div key={category.id}>
                {/* Category Header */}
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600">
                      <Icon size={20} />
                    </div>
                    <span className="font-bold text-gray-900">{category.title}</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {category.questions.length} soru
                    </span>
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Questions */}
                {isExpanded && (
                  <div className="bg-gray-50 border-t border-gray-100">
                    {category.questions.map((item, idx) => {
                      const questionId = `${category.id}-${idx}`;
                      const isQuestionExpanded = expandedQuestion === questionId;

                      return (
                        <div key={idx} className="border-b border-gray-100 last:border-0">
                          <button
                            onClick={() => setExpandedQuestion(isQuestionExpanded ? null : questionId)}
                            className="w-full px-6 py-4 flex items-start justify-between text-left hover:bg-gray-100 transition-colors"
                          >
                            <span className="font-medium text-gray-900 pr-4">{item.q}</span>
                            <ChevronRight 
                              size={18} 
                              className={`text-gray-400 flex-shrink-0 mt-0.5 transition-transform ${isQuestionExpanded ? 'rotate-90' : ''}`}
                            />
                          </button>
                          {isQuestionExpanded && (
                            <div className="px-6 pb-4">
                              <p className="text-gray-600 text-sm leading-relaxed bg-white p-4 rounded-xl border border-gray-100">
                                {item.a}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a 
          href="#" 
          className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-4 hover:border-gray-300 transition-colors group"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-brand-dark">
            <FileText size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 group-hover:text-brand-dark transition-colors">
              Kullanım Kılavuzu
            </h3>
            <p className="text-sm text-gray-500">Platform kullanımı hakkında detaylı rehber</p>
          </div>
          <ExternalLink size={18} className="text-gray-400" />
        </a>

        <a 
          href="#" 
          className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-4 hover:border-gray-300 transition-colors group"
        >
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
            <Users size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 group-hover:text-brand-dark transition-colors">
              Topluluk Forumu
            </h3>
            <p className="text-sm text-gray-500">Diğer kullanıcılarla deneyim paylaşın</p>
          </div>
          <ExternalLink size={18} className="text-gray-400" />
        </a>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-br from-brand-dark to-brand-light rounded-2xl p-8 text-center text-white">
        <h2 className="text-xl font-black mb-2">Aradığınızı bulamadınız mı?</h2>
        <p className="text-blue-100 mb-6">Destek ekibimiz size yardımcı olmak için hazır.</p>
        <button className="px-6 py-3 bg-white text-brand-dark font-bold rounded-xl hover:bg-blue-50 transition-colors">
          Destek Talebi Oluştur
        </button>
      </div>
    </div>
  );
}
