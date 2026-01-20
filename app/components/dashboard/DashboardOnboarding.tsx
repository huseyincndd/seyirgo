'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { driver, Driver, DriveStep, Side } from 'driver.js';
import 'driver.js/dist/driver.css';
import { Sparkles, Play, X, ChevronRight, Package, Truck, Route, FileText, CheckCircle, HelpCircle } from 'lucide-react';

interface DashboardOnboardingProps {
  userType: 'shipper' | 'carrier';
}

// YÜK VEREN için adımlar
const getShipperSteps = (onNavigate: (path: string) => void): DriveStep[] => [
  {
    popover: {
      title: 'SeyirGo Yük Veren Paneli',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 12px;"><strong>Yük veren panelinize hoş geldiniz.</strong></p>
          <p style="color: #6b7280; margin-bottom: 16px;">Bu rehber, platformu etkili kullanmanız için gerekli tüm bilgileri adım adım sunacaktır.</p>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px;">
            <p style="font-weight: 600; margin-bottom: 8px; color: #1e40af;">Süreç Özeti:</p>
            <ol style="margin: 0; padding-left: 18px; color: #475569;">
              <li style="margin-bottom: 4px;">Yük ilanı oluşturma</li>
              <li style="margin-bottom: 4px;">Gelen teklifleri değerlendirme</li>
              <li style="margin-bottom: 4px;">Taşıma sürecini takip etme</li>
              <li>Teslim onayı ve değerlendirme</li>
            </ol>
          </div>
        </div>
      `,
      side: 'over-center' as Side,
    },
  },
  {
    element: '#sb-dash',
    popover: {
      title: 'Genel Bakış Sayfası',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 10px;">Ana kontrol paneliniz. Burada tüm önemli bilgileri tek bakışta görebilirsiniz:</p>
          <ul style="margin: 0; padding-left: 18px; color: #475569;">
            <li style="margin-bottom: 6px;"><strong>İstatistikler:</strong> Toplam ilan, bekleyen teklif, aktif taşıma sayıları</li>
            <li style="margin-bottom: 6px;"><strong>Bekleyen İşlemler:</strong> Değerlendirmeniz gereken teklifler</li>
            <li style="margin-bottom: 6px;"><strong>Canlı Takip:</strong> Yoldaki taşımalarınızın anlık durumu</li>
            <li><strong>Son İlanlar:</strong> Oluşturduğunuz son yük ilanları</li>
          </ul>
        </div>
      `,
      side: 'right' as Side,
      align: 'start' as const,
    },
  },
  {
    element: '#header-new-load-btn',
    popover: {
      title: 'Hızlı Yük İlanı Oluşturma',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 10px;">Bu buton her zaman sağ üst köşede görünür ve hızlı erişim sağlar.</p>
          <div style="background: #fef3c7; border-left: 3px solid #f59e0b; padding: 10px 12px; border-radius: 0 6px 6px 0;">
            <p style="margin: 0; color: #92400e; font-size: 13px;"><strong>İpucu:</strong> Yeni yük taşıtmak istediğinizde bu butonu kullanarak hızlıca form sayfasına ulaşabilirsiniz.</p>
          </div>
        </div>
      `,
      side: 'bottom' as Side,
      align: 'end' as const,
    },
  },
  {
    element: '#sb-new',
    popover: {
      title: 'Yeni Yük İlanı Sayfası',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 10px;">Yük ilanı oluştururken doldurmanız gereken bilgiler:</p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
            <div style="background: #f1f5f9; padding: 8px; border-radius: 6px; font-size: 12px;">
              <strong style="display: block; margin-bottom: 2px;">Yük Bilgileri</strong>
              <span style="color: #64748b;">Başlık, ağırlık, hacim</span>
            </div>
            <div style="background: #f1f5f9; padding: 8px; border-radius: 6px; font-size: 12px;">
              <strong style="display: block; margin-bottom: 2px;">Rota</strong>
              <span style="color: #64748b;">Kalkış ve varış noktası</span>
            </div>
            <div style="background: #f1f5f9; padding: 8px; border-radius: 6px; font-size: 12px;">
              <strong style="display: block; margin-bottom: 2px;">Araç Tipi</strong>
              <span style="color: #64748b;">Tır, kamyon, frigo vs.</span>
            </div>
            <div style="background: #f1f5f9; padding: 8px; border-radius: 6px; font-size: 12px;">
              <strong style="display: block; margin-bottom: 2px;">Fiyat</strong>
              <span style="color: #64748b;">Sabit veya teklif bekle</span>
            </div>
          </div>
          <p style="color: #16a34a; font-weight: 500; font-size: 13px;">Şimdi bu sayfaya gidelim ve detaylıca inceleyelim.</p>
        </div>
      `,
      side: 'right' as Side,
      onNextClick: () => {
        onNavigate('/shipper/yeni-ilan');
      },
    },
  },
  {
    popover: {
      title: 'Yük İlanı Formu',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 12px;">Şu anda <strong>Yeni Yük İlanı</strong> sayfasındasınız.</p>
          <p style="margin-bottom: 10px;">Form 4 adımdan oluşmaktadır:</p>
          <ol style="margin: 0; padding-left: 18px; color: #475569;">
            <li style="margin-bottom: 6px;"><strong>Yük Bilgileri:</strong> Yükün başlığı, tipi, ağırlığı</li>
            <li style="margin-bottom: 6px;"><strong>Rota Bilgileri:</strong> Nereden nereye taşınacak</li>
            <li style="margin-bottom: 6px;"><strong>Taşıma Detayları:</strong> Araç tipi ve tarih</li>
            <li><strong>Fiyat & Onay:</strong> Bütçe belirleme ve yayınlama</li>
          </ol>
          <div style="margin-top: 12px; background: #eff6ff; border: 1px solid #bfdbfe; padding: 10px 12px; border-radius: 6px;">
            <p style="margin: 0; color: #1e40af; font-size: 13px;">İlan yayınlandıktan sonra taşıyıcılar teklif vermeye başlar.</p>
          </div>
        </div>
      `,
      side: 'over-center' as Side,
    },
  },
  {
    element: '#sb-loads',
    popover: {
      title: 'Yüklerim Sayfası',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 10px;">Tüm yük ilanlarınızın listelendiği sayfa.</p>
          <div style="margin-bottom: 10px;">
            <p style="font-weight: 600; margin-bottom: 6px;">Durum Göstergeleri:</p>
            <div style="display: flex; flex-direction: column; gap: 4px; font-size: 12px;">
              <span><span style="display: inline-block; width: 8px; height: 8px; background: #eab308; border-radius: 50%; margin-right: 6px;"></span>Teklif Bekliyor</span>
              <span><span style="display: inline-block; width: 8px; height: 8px; background: #22c55e; border-radius: 50%; margin-right: 6px;"></span>Aktif (Taşıyıcı kabul edildi)</span>
              <span><span style="display: inline-block; width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; margin-right: 6px;"></span>Taşımada (Yolda)</span>
              <span><span style="display: inline-block; width: 8px; height: 8px; background: #6b7280; border-radius: 50%; margin-right: 6px;"></span>Tamamlandı</span>
            </div>
          </div>
          <p style="color: #475569; font-size: 13px;">Bu sayfayı inceleyelim.</p>
        </div>
      `,
      side: 'right' as Side,
      onNextClick: () => {
        onNavigate('/shipper/yukler');
      },
    },
  },
  {
    popover: {
      title: 'Yüklerim - Liste Görünümü',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 12px;"><strong>Yüklerim</strong> sayfasında tüm ilanlarınızı yönetebilirsiniz.</p>
          <p style="margin-bottom: 10px;">Bu sayfada yapabilecekleriniz:</p>
          <ul style="margin: 0; padding-left: 18px; color: #475569;">
            <li style="margin-bottom: 4px;">Arama ve filtreleme</li>
            <li style="margin-bottom: 4px;">İlan detaylarını görüntüleme</li>
            <li style="margin-bottom: 4px;">Düzenleme ve silme işlemleri</li>
            <li>Teklif sayısını görme</li>
          </ul>
        </div>
      `,
      side: 'over-center' as Side,
    },
  },
  {
    element: '#sb-offers',
    popover: {
      title: 'Teklifler Sayfası',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 10px;">Taşıyıcılardan gelen tüm teklifleri bu sayfada değerlendirirsiniz.</p>
          <p style="margin-bottom: 10px;"><strong>Her teklifte göreceğiniz bilgiler:</strong></p>
          <ul style="margin: 0; padding-left: 18px; color: #475569; font-size: 13px;">
            <li style="margin-bottom: 4px;">Taşıyıcı firma adı ve puanı</li>
            <li style="margin-bottom: 4px;">Tamamladığı iş sayısı</li>
            <li style="margin-bottom: 4px;">Fiyat teklifi</li>
            <li style="margin-bottom: 4px;">Taşıyıcının notu</li>
          </ul>
          <div style="margin-top: 10px; display: flex; gap: 8px;">
            <span style="background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 600;">Kabul Et</span>
            <span style="background: #fee2e2; color: #991b1b; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 600;">Reddet</span>
          </div>
        </div>
      `,
      side: 'right' as Side,
      onNextClick: () => {
        onNavigate('/shipper/teklifler');
      },
    },
  },
  {
    popover: {
      title: 'Teklifleri Değerlendirin',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 12px;"><strong>Teklifler</strong> sayfasındasınız.</p>
          <p style="margin-bottom: 10px;">Karar verirken dikkat edilecek kriterler:</p>
          <ul style="margin: 0; padding-left: 18px; color: #475569;">
            <li style="margin-bottom: 4px;"><strong>Puan:</strong> Taşıyıcının geçmiş performansı</li>
            <li style="margin-bottom: 4px;"><strong>Deneyim:</strong> Tamamladığı iş sayısı</li>
            <li style="margin-bottom: 4px;"><strong>Fiyat:</strong> Bütçenize uygunluğu</li>
            <li><strong>Doğrulama:</strong> Firma belgelerinin onaylı olması</li>
          </ul>
        </div>
      `,
      side: 'over-center' as Side,
    },
  },
  {
    element: '#sb-active',
    popover: {
      title: 'Aktif Taşımalar',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 10px;">Kabul ettiğiniz teklifler burada canlı olarak takip edilir.</p>
          <p style="margin-bottom: 8px;"><strong>Takip edebileceğiniz bilgiler:</strong></p>
          <ul style="margin: 0; padding-left: 18px; color: #475569; font-size: 13px;">
            <li style="margin-bottom: 4px;">Anlık konum ve ilerleme durumu</li>
            <li style="margin-bottom: 4px;">Tahmini varış süresi</li>
            <li style="margin-bottom: 4px;">Taşıyıcı iletişim bilgileri</li>
            <li>Durum güncellemeleri</li>
          </ul>
        </div>
      `,
      side: 'right' as Side,
      onNextClick: () => {
        onNavigate('/shipper');
      },
    },
  },
  {
    popover: {
      title: 'Rehber Tamamlandı',
      description: `
        <div style="line-height: 1.7; text-align: center;">
          <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #1e40af, #3b82f6); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
            <svg width="28" height="28" fill="white" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
          </div>
          <p style="font-size: 15px; font-weight: 600; margin-bottom: 12px;">Yük veren panelini kullanmaya hazırsınız.</p>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-bottom: 12px;">
            <p style="margin: 0; color: #1e40af; font-size: 13px;"><strong>Başlamak için:</strong> "Yeni Yük İlanı" butonuna tıklayarak ilk ilanınızı oluşturun.</p>
          </div>
          <p style="color: #6b7280; font-size: 12px;">Bu rehberi sağ alt köşedeki yardım butonundan tekrar başlatabilirsiniz.</p>
        </div>
      `,
      side: 'over-center' as Side,
    },
  },
];

// TAŞIYICI için adımlar
const getCarrierSteps = (onNavigate: (path: string) => void): DriveStep[] => [
  {
    popover: {
      title: 'SeyirGo Taşıyıcı Paneli',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 12px;"><strong>Taşıyıcı panelinize hoş geldiniz.</strong></p>
          <p style="color: #6b7280; margin-bottom: 16px;">Bu rehber, rotanıza uygun yükleri nasıl bulacağınızı ve kazanç elde etmeye nasıl başlayacağınızı gösterecektir.</p>
          <div style="background: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 14px;">
            <p style="font-weight: 600; margin-bottom: 8px; color: #c2410c;">Süreç Özeti:</p>
            <ol style="margin: 0; padding-left: 18px; color: #78350f;">
              <li style="margin-bottom: 4px;">Araçlarınızı sisteme kaydedin</li>
              <li style="margin-bottom: 4px;">Gittiğiniz rotaları tanımlayın</li>
              <li style="margin-bottom: 4px;">Size uygun yüklere teklif verin</li>
              <li>Taşıma yapın ve kazanın</li>
            </ol>
          </div>
        </div>
      `,
      side: 'over-center' as Side,
    },
  },
  {
    element: '#cb-vehicles',
    popover: {
      title: 'Araçlarım - İlk Adım',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 10px;"><strong>Öncelikle araçlarınızı kaydetmeniz gerekmektedir.</strong></p>
          <p style="margin-bottom: 10px;">Her araç için gerekli bilgiler:</p>
          <ul style="margin: 0; padding-left: 18px; color: #475569; font-size: 13px;">
            <li style="margin-bottom: 4px;">Plaka ve araç tipi</li>
            <li style="margin-bottom: 4px;">Kapasite (ton/m³)</li>
            <li style="margin-bottom: 4px;">Sigorta, muayene, ruhsat belgeleri</li>
          </ul>
          <div style="margin-top: 10px; background: #fef3c7; border-left: 3px solid #f59e0b; padding: 8px 10px; border-radius: 0 6px 6px 0;">
            <p style="margin: 0; color: #92400e; font-size: 12px;"><strong>Önemli:</strong> Araç eklemeden rota oluşturamazsınız.</p>
          </div>
        </div>
      `,
      side: 'right' as Side,
      onNextClick: () => {
        onNavigate('/carrier/araclarim');
      },
    },
  },
  {
    popover: {
      title: 'Araç Yönetimi',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 12px;"><strong>Araçlarım</strong> sayfasındasınız.</p>
          <p style="margin-bottom: 10px;">Bu sayfada:</p>
          <ul style="margin: 0; padding-left: 18px; color: #475569;">
            <li style="margin-bottom: 4px;">Yeni araç ekleyebilirsiniz</li>
            <li style="margin-bottom: 4px;">Mevcut araçları düzenleyebilirsiniz</li>
            <li style="margin-bottom: 4px;">Belgelerinizi yükleyebilirsiniz</li>
            <li>Araç durumunu güncelleyebilirsiniz (Müsait/Meşgul/Bakımda)</li>
          </ul>
        </div>
      `,
      side: 'over-center' as Side,
    },
  },
  {
    element: '#cb-dash',
    popover: {
      title: 'Genel Bakış',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 10px;">Ana kontrol paneliniz.</p>
          <ul style="margin: 0; padding-left: 18px; color: #475569;">
            <li style="margin-bottom: 6px;"><strong>Aktif Rotalar:</strong> Tanımladığınız güzergahlar</li>
            <li style="margin-bottom: 6px;"><strong>Uygun Yükler:</strong> Rotalarınıza eşleşen yükler</li>
            <li style="margin-bottom: 6px;"><strong>Aktif Taşımalar:</strong> Devam eden işler</li>
            <li><strong>Kazanç Özeti:</strong> Haftalık/aylık gelir</li>
          </ul>
        </div>
      `,
      side: 'right' as Side,
      align: 'start' as const,
    },
  },
  {
    element: '#header-new-route-btn',
    popover: {
      title: 'Hızlı Rota Ekleme',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 10px;">Bu buton her zaman görünür ve hızlı erişim sağlar.</p>
          <p style="color: #475569; font-size: 13px;">Yeni bir yolculuğa çıkmadan önce rotanızı tanımlayarak size uygun yüklerin otomatik eşleşmesini sağlayın.</p>
        </div>
      `,
      side: 'bottom' as Side,
      align: 'end' as const,
    },
  },
  {
    element: '#cb-new-route',
    popover: {
      title: 'Rota Ekleme Sayfası',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 10px;"><strong>Nereye gidiyorsunuz?</strong> Bize söyleyin, uygun yükleri bulalım.</p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 10px;">
            <div style="background: #f1f5f9; padding: 8px; border-radius: 6px; font-size: 12px;">
              <strong style="display: block;">Kalkış</strong>
              <span style="color: #64748b;">Nereden?</span>
            </div>
            <div style="background: #f1f5f9; padding: 8px; border-radius: 6px; font-size: 12px;">
              <strong style="display: block;">Varış</strong>
              <span style="color: #64748b;">Nereye?</span>
            </div>
          </div>
          <p style="color: #16a34a; font-size: 13px;">Bu sayfayı inceleyelim.</p>
        </div>
      `,
      side: 'right' as Side,
      onNextClick: () => {
        onNavigate('/carrier/rota-ekle');
      },
    },
  },
  {
    popover: {
      title: 'Rota Oluşturma Formu',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 12px;"><strong>Rota Ekle</strong> sayfasındasınız.</p>
          <p style="margin-bottom: 10px;">Form adımları:</p>
          <ol style="margin: 0; padding-left: 18px; color: #475569;">
            <li style="margin-bottom: 4px;"><strong>Rota Bilgileri:</strong> Kalkış, varış ve ara duraklar</li>
            <li style="margin-bottom: 4px;"><strong>Tarih & Araç:</strong> Ne zaman ve hangi araçla</li>
            <li style="margin-bottom: 4px;"><strong>Tercihler:</strong> Kabul ettiğiniz yük tipleri</li>
            <li><strong>Onay:</strong> Özet ve yayınlama</li>
          </ol>
          <div style="margin-top: 10px; background: #eff6ff; border: 1px solid #bfdbfe; padding: 8px 10px; border-radius: 6px;">
            <p style="margin: 0; color: #1e40af; font-size: 12px;">Rota yayınlandığında uygun yükler otomatik eşleşir.</p>
          </div>
        </div>
      `,
      side: 'over-center' as Side,
    },
  },
  {
    element: '#cb-loads',
    popover: {
      title: 'Uygun Yükler - Temel Sayfa',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 10px;"><strong>En önemli sayfanız.</strong> Rotalarınıza göre sistem otomatik eşleştirme yapar.</p>
          <p style="margin-bottom: 8px;">Bu sayfada:</p>
          <ul style="margin: 0; padding-left: 18px; color: #475569; font-size: 13px;">
            <li style="margin-bottom: 4px;">Her rotanıza uyan yükler listelenir</li>
            <li style="margin-bottom: 4px;">Yük detaylarını inceleyebilirsiniz</li>
            <li>Beğendiğiniz yüklere teklif verebilirsiniz</li>
          </ul>
        </div>
      `,
      side: 'right' as Side,
      onNextClick: () => {
        onNavigate('/carrier/uygun-yukler');
      },
    },
  },
  {
    popover: {
      title: 'Yük Eşleştirme Sistemi',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 12px;"><strong>Uygun Yükler</strong> sayfasındasınız.</p>
          <p style="margin-bottom: 10px;">Yükler rotalarınıza göre gruplandırılır. Her yük kartında:</p>
          <ul style="margin: 0; padding-left: 18px; color: #475569;">
            <li style="margin-bottom: 4px;">Yük başlığı ve ağırlığı</li>
            <li style="margin-bottom: 4px;">Kalkış ve varış noktası</li>
            <li style="margin-bottom: 4px;">Tarih ve fiyat bilgisi</li>
            <li><strong>"Teklif Ver"</strong> butonu</li>
          </ul>
        </div>
      `,
      side: 'over-center' as Side,
    },
  },
  {
    element: '#cb-offers',
    popover: {
      title: 'Tekliflerim',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 10px;">Verdiğiniz tüm tekliflerin durumunu takip edin.</p>
          <div style="margin-bottom: 10px;">
            <div style="display: flex; flex-direction: column; gap: 4px; font-size: 12px;">
              <span><span style="display: inline-block; width: 8px; height: 8px; background: #eab308; border-radius: 50%; margin-right: 6px;"></span>Değerlendirmede</span>
              <span><span style="display: inline-block; width: 8px; height: 8px; background: #22c55e; border-radius: 50%; margin-right: 6px;"></span>Kabul Edildi</span>
              <span><span style="display: inline-block; width: 8px; height: 8px; background: #dc2626; border-radius: 50%; margin-right: 6px;"></span>Reddedildi</span>
            </div>
          </div>
          <p style="color: #475569; font-size: 13px;">Kabul edilen teklifler Aktif Taşımalar'a aktarılır.</p>
        </div>
      `,
      side: 'right' as Side,
      onNextClick: () => {
        onNavigate('/carrier/tekliflerim');
      },
    },
  },
  {
    popover: {
      title: 'Teklif Takibi',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 12px;"><strong>Tekliflerim</strong> sayfasındasınız.</p>
          <p style="margin-bottom: 10px;">Bu sayfada:</p>
          <ul style="margin: 0; padding-left: 18px; color: #475569;">
            <li style="margin-bottom: 4px;">Tüm tekliflerinizi görüntüleyebilirsiniz</li>
            <li style="margin-bottom: 4px;">Duruma göre filtreleme yapabilirsiniz</li>
            <li>Bekleyen teklifleri iptal edebilirsiniz</li>
          </ul>
        </div>
      `,
      side: 'over-center' as Side,
    },
  },
  {
    element: '#cb-active',
    popover: {
      title: 'Aktif Taşımalar',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 10px;">Kabul edilen teklifler burada yönetilir.</p>
          <ul style="margin: 0; padding-left: 18px; color: #475569; font-size: 13px;">
            <li style="margin-bottom: 4px;">Taşıma durumunu güncelleyin</li>
            <li style="margin-bottom: 4px;">Fotoğraf yükleyin</li>
            <li style="margin-bottom: 4px;">Yük sahibiyle iletişim kurun</li>
            <li>Teslimatı onaylayın</li>
          </ul>
        </div>
      `,
      side: 'right' as Side,
      onNextClick: () => {
        onNavigate('/carrier/aktif-tasimalar');
      },
    },
  },
  {
    popover: {
      title: 'Taşıma Yönetimi',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 12px;"><strong>Aktif Taşımalar</strong> sayfasındasınız.</p>
          <p style="margin-bottom: 10px;">Her taşıma kartında:</p>
          <ul style="margin: 0; padding-left: 18px; color: #475569;">
            <li style="margin-bottom: 4px;">İlerleme çubuğu ve konum</li>
            <li style="margin-bottom: 4px;">Yük sahibi bilgileri</li>
            <li style="margin-bottom: 4px;">Arama ve mesaj butonları</li>
            <li style="margin-bottom: 4px;">Fotoğraf yükleme</li>
            <li>Teslim onaylama</li>
          </ul>
        </div>
      `,
      side: 'over-center' as Side,
    },
  },
  {
    element: '#cb-earnings',
    popover: {
      title: 'Kazançlar',
      description: `
        <div style="line-height: 1.7;">
          <p style="margin-bottom: 10px;">Tüm kazançlarınızın detaylı raporları.</p>
          <ul style="margin: 0; padding-left: 18px; color: #475569; font-size: 13px;">
            <li style="margin-bottom: 4px;">Günlük/Haftalık/Aylık özet</li>
            <li style="margin-bottom: 4px;">Taşıma bazlı gelir</li>
            <li>Ödeme geçmişi</li>
          </ul>
        </div>
      `,
      side: 'right' as Side,
      onNextClick: () => {
        onNavigate('/carrier');
      },
    },
  },
  {
    popover: {
      title: 'Rehber Tamamlandı',
      description: `
        <div style="line-height: 1.7; text-align: center;">
          <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #ea580c, #f97316); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
            <svg width="28" height="28" fill="white" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
          </div>
          <p style="font-size: 15px; font-weight: 600; margin-bottom: 12px;">Taşıyıcı panelini kullanmaya hazırsınız.</p>
          <div style="background: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 12px; margin-bottom: 12px; text-align: left;">
            <p style="margin: 0 0 8px; color: #c2410c; font-size: 13px;"><strong>Başlamak için:</strong></p>
            <ol style="margin: 0; padding-left: 16px; color: #78350f; font-size: 12px;">
              <li>Araçlarım sayfasından araç ekleyin</li>
              <li>Rota Ekle ile güzergahınızı belirtin</li>
              <li>Uygun Yükler sayfasından teklif verin</li>
            </ol>
          </div>
          <p style="color: #6b7280; font-size: 12px;">Bu rehberi sağ alt köşedeki yardım butonundan tekrar başlatabilirsiniz.</p>
        </div>
      `,
      side: 'over-center' as Side,
    },
  },
];

const DashboardOnboarding: React.FC<DashboardOnboardingProps> = ({ userType }) => {
  const router = useRouter();
  const pathname = usePathname();
  const driverRef = React.useRef<Driver | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasSeenTour, setHasSeenTour] = useState(true);

  const isShipper = userType === 'shipper';
  const accentBg = isShipper ? 'bg-brand-dark' : 'bg-brand-orange';

  const handleNavigate = useCallback((path: string) => {
    router.push(path);
    setTimeout(() => {
      driverRef.current?.moveNext();
    }, 500);
  }, [router]);

  useEffect(() => {
    const tourKey = isShipper ? 'seyirgo-shipper-tour-v3' : 'seyirgo-carrier-tour-v3';
    const seen = localStorage.getItem(tourKey);
    
    console.log('[Onboarding] Tour key:', tourKey, '| Seen:', seen);
    
    setHasSeenTour(!!seen);
    
    if (!seen) {
      console.log('[Onboarding] First time user, showing welcome modal in 800ms');
      const timer = setTimeout(() => setShowWelcome(true), 800);
      return () => clearTimeout(timer);
    }
  }, [isShipper]);

  useEffect(() => {
    const steps = isShipper ? getShipperSteps(handleNavigate) : getCarrierSteps(handleNavigate);
    
    const driverInstance = driver({
      showProgress: true,
      animate: true,
      allowClose: true,
      stagePadding: 10,
      stageRadius: 10,
      overlayColor: 'rgba(15, 23, 42, 0.75)',
      popoverClass: 'seyirgo-driver-popover',
      progressText: '{{current}} / {{total}}',
      nextBtnText: 'Devam',
      prevBtnText: 'Geri',
      doneBtnText: 'Tamamla',
      onDestroyStarted: () => {
        const tourKey = isShipper ? 'seyirgo-shipper-tour-v3' : 'seyirgo-carrier-tour-v3';
        localStorage.setItem(tourKey, 'true');
        setHasSeenTour(true);
        driverInstance.destroy();
      },
      steps: steps,
    });

    driverRef.current = driverInstance;
    return () => driverInstance.destroy();
  }, [isShipper, handleNavigate]);

  const startTour = useCallback(() => {
    setShowWelcome(false);
    const basePath = isShipper ? '/shipper' : '/carrier';
    if (pathname !== basePath) {
      router.push(basePath);
      setTimeout(() => driverRef.current?.drive(), 400);
    } else {
      setTimeout(() => driverRef.current?.drive(), 200);
    }
  }, [isShipper, pathname, router]);

  const skipTour = useCallback(() => {
    const tourKey = isShipper ? 'seyirgo-shipper-tour-v3' : 'seyirgo-carrier-tour-v3';
    localStorage.setItem(tourKey, 'true');
    setHasSeenTour(true);
    setShowWelcome(false);
  }, [isShipper]);

  // Reset tour - can be called from console: window.resetSeyirgoTour()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as unknown as { resetSeyirgoTour: () => void }).resetSeyirgoTour = () => {
        localStorage.removeItem('seyirgo-shipper-tour-v3');
        localStorage.removeItem('seyirgo-carrier-tour-v3');
        console.log('[Onboarding] Tour reset! Refresh the page to see the welcome modal.');
        window.location.reload();
      };
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        .driver-popover.seyirgo-driver-popover {
          background: white;
          border-radius: 12px;
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.35);
          max-width: 400px;
          padding: 0;
          border: 1px solid #e2e8f0;
        }
        .driver-popover.seyirgo-driver-popover .driver-popover-title {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          padding: 18px 20px 0;
          margin: 0;
        }
        .driver-popover.seyirgo-driver-popover .driver-popover-description {
          font-size: 13px;
          color: #334155;
          padding: 10px 20px 18px;
          margin: 0;
        }
        .driver-popover.seyirgo-driver-popover .driver-popover-footer {
          padding: 14px 20px;
          border-top: 1px solid #e2e8f0;
          background: #f8fafc;
          border-radius: 0 0 12px 12px;
        }
        .driver-popover.seyirgo-driver-popover .driver-popover-progress-text {
          font-size: 11px;
          font-weight: 600;
          color: #64748b;
        }
        .driver-popover.seyirgo-driver-popover .driver-popover-prev-btn {
          padding: 8px 14px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 6px;
          background: #f1f5f9;
          color: #475569;
          border: none;
          cursor: pointer;
        }
        .driver-popover.seyirgo-driver-popover .driver-popover-next-btn,
        .driver-popover.seyirgo-driver-popover .driver-popover-close-btn {
          padding: 8px 16px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 6px;
          background: ${isShipper ? '#1e40af' : '#ea580c'};
          color: white;
          border: none;
          cursor: pointer;
        }
        .driver-popover.seyirgo-driver-popover button.driver-popover-close-btn.driver-popover-close-btn-inside {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #f1f5f9;
          color: #64748b;
          padding: 4px;
          border-radius: 6px;
          width: 24px;
          height: 24px;
        }
      `}</style>

      {showWelcome && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={skipTour}></div>
          <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <button onClick={skipTour} className="absolute top-3 right-3 p-1.5 hover:bg-gray-100 rounded-lg">
              <X size={18} className="text-gray-400" />
            </button>
            <div className="text-center">
              <div className={`w-16 h-16 ${accentBg} rounded-xl flex items-center justify-center mx-auto mb-5`}>
                <Sparkles size={32} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {isShipper ? 'Yük Veren Paneli' : 'Taşıyıcı Paneli'}
              </h2>
              <p className="text-gray-500 text-sm mb-5">
                {isShipper ? 'Platform kullanımını adım adım öğrenin.' : 'Yük bulmaya ve kazanmaya başlayın.'}
              </p>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {isShipper ? (
                  <>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <Package size={20} className="mx-auto mb-1 text-blue-600" />
                      <p className="text-xs text-gray-600">Yük İlanı</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <FileText size={20} className="mx-auto mb-1 text-purple-600" />
                      <p className="text-xs text-gray-600">Teklif Al</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <CheckCircle size={20} className="mx-auto mb-1 text-green-600" />
                      <p className="text-xs text-gray-600">Takip Et</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <Truck size={20} className="mx-auto mb-1 text-orange-600" />
                      <p className="text-xs text-gray-600">Araç Ekle</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <Route size={20} className="mx-auto mb-1 text-green-600" />
                      <p className="text-xs text-gray-600">Rota Belirle</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <CheckCircle size={20} className="mx-auto mb-1 text-blue-600" />
                      <p className="text-xs text-gray-600">Kazan</p>
                    </div>
                  </>
                )}
              </div>
              <div className="flex gap-3">
                <button onClick={skipTour} className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-600 font-semibold text-sm rounded-lg">
                  Sonra
                </button>
                <button onClick={startTour} className={`flex-1 px-4 py-2.5 ${accentBg} text-white font-semibold text-sm rounded-lg flex items-center justify-center gap-1.5`}>
                  <Play size={16} /> Başlat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {hasSeenTour && (
        <button
          onClick={() => driverRef.current?.drive()}
          className={`fixed bottom-5 right-5 z-50 p-3 ${accentBg} text-white rounded-full shadow-lg hover:brightness-110 transition-all`}
          title="Paneli Keşfet"
        >
          <HelpCircle size={22} />
        </button>
      )}
    </>
  );
};

export default DashboardOnboarding;
