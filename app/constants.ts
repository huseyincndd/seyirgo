import { Truck, Package, ShieldCheck, Clock, Users, Globe } from 'lucide-react';
import { NavItem, StatItem, FeatureItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Anasayfa', href: '/' },
  { label: 'Kurumsal', href: '/kurumsal' },
  { label: 'Hizmetlerimiz', href: '/hizmetler' },
  { label: 'İletişim', href: '/iletisim' },
];

export const CONTACT_INFO = {
  phone1: '0850 123 45 67',
  phone2: '0532 987 65 43',
  email: 'info@seyirgo.net'
};

export const FEATURES: FeatureItem[] = [
  {
    title: 'Güvenli Ödeme',
    description: 'Ödemeleriniz SeyirGo güvencesi altındadır. Taşıma tamamlanana kadar paranız güvende.',
    icon: ShieldCheck
  },
  {
    title: 'Hızlı Eşleşme',
    description: 'Yükünüzü sisteme girin, saniyeler içinde uygun araç sahiplerinden teklif alın.',
    icon: Clock
  },
  {
    title: 'Doğrulanmış Taşıyıcılar',
    description: 'Tüm taşıyıcılarımız detaylı belge kontrolünden geçer ve onaylanır.',
    icon: Users
  }
];

export const STATS: StatItem[] = [
  { value: '10,000+', label: 'Başarılı Taşıma', icon: Truck },
  { value: '5,000+', label: 'Kayıtlı Taşıyıcı', icon: Users },
  { value: '81', label: 'İl Hizmeti', icon: Globe },
];
