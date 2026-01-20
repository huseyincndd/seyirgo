
'use client';
import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  Bell, 
  Lock, 
  Shield, 
  Smartphone,
  Mail,
  Save,
  Camera,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';

export default function AyarlarPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  // Form state
  const [profileData, setProfileData] = useState({
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet@abclojistik.com',
    phone: '532 123 45 67',
    tcNo: '12345678901',
    birthYear: '1985',
  });

  const [companyData, setCompanyData] = useState({
    companyName: 'ABC Lojistik Ltd. Şti.',
    taxNo: '1234567890',
    taxOffice: 'Kadıköy Vergi Dairesi',
    address: 'Merkez Mah. İş Cad. No:123, Kadıköy, İstanbul',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    newOffers: true,
    statusUpdates: true,
    marketing: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: 'profile', label: 'Profil Bilgileri', icon: User },
    { id: 'company', label: 'Şirket Bilgileri', icon: Building2 },
    { id: 'notifications', label: 'Bildirimler', icon: Bell },
    { id: 'security', label: 'Güvenlik', icon: Lock },
  ];

  const inputClass = "w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none transition-all focus:border-brand-dark focus:ring-2 focus:ring-brand-dark/5 font-bold text-sm text-slate-800 placeholder:text-gray-400 placeholder:font-medium";
  const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1";

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 pb-20">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-6 py-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight">Ayarlar</h1>
          <p className="text-xs lg:text-sm text-slate-500 font-medium mt-0.5">Hesap ve uygulama ayarlarınızı yönetin</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-100 rounded-xl text-sm font-bold animate-in fade-in slide-in-from-top-2">
            <Check size={16} /> Değişiklikler kaydedildi
          </div>
        )}
      </header>

      <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Tabs */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-200 p-3 shadow-sm sticky top-28">
              <div className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold transition-all group ${
                        isActive
                          ? 'bg-brand-dark text-white shadow-md shadow-brand-dark/20'
                          : 'text-slate-600 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className={isActive ? 'text-brand-orange' : 'text-gray-400 group-hover:text-slate-600'} />
                        {tab.label}
                      </div>
                      {isActive && <ChevronRight size={16} className="text-brand-orange" />}
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 px-2">
                 <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl text-sm font-bold transition-colors">
                    <LogOut size={18} /> Çıkış Yap
                 </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center justify-between mb-8">
                   <h2 className="text-xl font-black text-slate-900">Profil Bilgileri</h2>
                   <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100">ID: TR-8821</span>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-6 mb-10 pb-8 border-b border-gray-100">
                  <div className="w-24 h-24 bg-brand-dark rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-brand-dark/20 ring-4 ring-white">
                    {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{profileData.firstName} {profileData.lastName}</h3>
                    <p className="text-sm text-gray-500 mb-4">Filo Yöneticisi</p>
                    <div className="flex gap-3">
                       <button className="px-4 py-2 bg-white border border-gray-200 text-slate-700 font-bold text-xs rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center gap-2">
                         <Camera size={14} /> Fotoğraf Yükle
                       </button>
                       <button className="px-4 py-2 text-red-600 font-bold text-xs hover:bg-red-50 rounded-lg transition-colors">
                         Kaldır
                       </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Ad</label>
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Soyad</label>
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label className={labelClass}>E-posta</label>
                        <div className="relative">
                           <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                           <input
                           type="email"
                           value={profileData.email}
                           onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                           className={`${inputClass} pl-11`}
                           />
                        </div>
                     </div>

                     <div>
                        <label className={labelClass}>Telefon</label>
                        <div className="flex gap-2">
                           <span className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-500 flex items-center">
                           TR +90
                           </span>
                           <input
                           type="text"
                           value={profileData.phone}
                           onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                           className={inputClass}
                           />
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                    <div>
                      <label className={labelClass}>TC Kimlik No</label>
                      <div className="relative">
                         <input
                           type="text"
                           value={profileData.tcNo}
                           className={`${inputClass} bg-gray-50 text-gray-500`}
                           disabled
                         />
                         <Lock size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1.5 flex items-center gap-1"><AlertCircle size={10} /> Kimlik numarası değiştirilemez.</p>
                    </div>
                    <div>
                      <label className={labelClass}>Doğum Yılı</label>
                      <input
                        type="text"
                        value={profileData.birthYear}
                        className={`${inputClass} bg-gray-50 text-gray-500`}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                  <button 
                    onClick={handleSave}
                    className="px-8 py-3.5 bg-brand-dark text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-dark/20 hover:bg-slate-800 transition-all flex items-center gap-2 transform active:scale-[0.98]"
                  >
                    <Save size={18} /> Değişiklikleri Kaydet
                  </button>
                </div>
              </div>
            )}

            {/* Company Tab */}
            {activeTab === 'company' && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-brand-dark border border-blue-100">
                      <Building2 size={24} />
                   </div>
                   <div>
                      <h2 className="text-xl font-black text-slate-900">Şirket Bilgileri</h2>
                      <p className="text-xs text-gray-500 font-medium">Fatura ve resmi evraklar için kullanılır.</p>
                   </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className={labelClass}>Şirket Ünvanı</label>
                    <input
                      type="text"
                      value={companyData.companyName}
                      onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Vergi No</label>
                      <input
                        type="text"
                        value={companyData.taxNo}
                        onChange={(e) => setCompanyData({ ...companyData, taxNo: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Vergi Dairesi</label>
                      <input
                        type="text"
                        value={companyData.taxOffice}
                        onChange={(e) => setCompanyData({ ...companyData, taxOffice: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Fatura Adresi</label>
                    <textarea
                      value={companyData.address}
                      onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
                      rows={3}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                  <button 
                    onClick={handleSave}
                    className="px-8 py-3.5 bg-brand-dark text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-dark/20 hover:bg-slate-800 transition-all flex items-center gap-2 transform active:scale-[0.98]"
                  >
                    <Save size={18} /> Şirket Bilgilerini Güncelle
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-black text-slate-900 mb-8">Bildirim Tercihleri</h2>

                <div className="space-y-8">
                  {/* Channels */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Kanal Ayarları</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'emailNotifications', label: 'E-posta Bildirimleri', icon: Mail, desc: 'Önemli güncellemeler ve faturalar.' },
                        { key: 'smsNotifications', label: 'SMS Bildirimleri', icon: Smartphone, desc: 'Acil durumlar ve güvenlik kodları.' },
                        { key: 'pushNotifications', label: 'Mobil Bildirimler', icon: Bell, desc: 'Uygulama içi anlık uyarılar.' },
                      ].map((item) => {
                        const Icon = item.icon;
                        const isChecked = notifications[item.key as keyof typeof notifications];
                        return (
                          <label key={item.key} className={`flex items-center justify-between p-4 rounded-xl cursor-pointer border-2 transition-all ${isChecked ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100 hover:border-gray-200'}`}>
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isChecked ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                                <Icon size={20} />
                              </div>
                              <div>
                                <p className={`font-bold text-sm ${isChecked ? 'text-blue-900' : 'text-slate-700'}`}>{item.label}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                              </div>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isChecked ? 'bg-brand-dark border-brand-dark' : 'bg-white border-gray-300'}`}>
                               {isChecked && <Check size={14} className="text-white" />}
                            </div>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                              className="hidden"
                            />
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Types */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Bildirim Konuları</h3>
                    <div className="space-y-1">
                      {[
                        { key: 'newOffers', label: 'Yeni Teklifler', desc: 'İlanlarınıza yeni teklif geldiğinde.' },
                        { key: 'statusUpdates', label: 'Durum Güncellemeleri', desc: 'Taşıma durumu değiştiğinde (Yüklendi, Teslim Edildi vb).' },
                        { key: 'marketing', label: 'Kampanya & Duyuru', desc: 'SeyirGo yenilikleri ve fırsatları.' },
                      ].map((item) => (
                        <label key={item.key} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group">
                          <div>
                            <p className="font-bold text-slate-700 text-sm">{item.label}</p>
                            <p className="text-xs text-gray-500">{item.desc}</p>
                          </div>
                          <div className="relative">
                             <input
                              type="checkbox"
                              checked={notifications[item.key as keyof typeof notifications]}
                              onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-orange"></div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                  <button 
                    onClick={handleSave}
                    className="px-8 py-3.5 bg-brand-dark text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-dark/20 hover:bg-slate-800 transition-all flex items-center gap-2 transform active:scale-[0.98]"
                  >
                    <Save size={18} /> Tercihleri Kaydet
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
                  <h2 className="text-xl font-black text-slate-900 mb-6">Şifre Değiştir</h2>

                  <div className="space-y-4 max-w-lg">
                    <div>
                      <label className={labelClass}>Mevcut Şifre</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className={inputClass}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Yeni Şifre</label>
                      <input
                        type="password"
                        placeholder="En az 8 karakter"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Yeni Şifre (Tekrar)</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <button className="px-8 py-3.5 bg-brand-dark text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-dark/20 hover:bg-slate-800 transition-all flex items-center gap-2 transform active:scale-[0.98]">
                      Şifreyi Güncelle
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 border border-green-100 flex-shrink-0">
                      <Shield size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-900">İki Faktörlü Doğrulama (2FA)</h3>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                        Hesabınızı daha güvenli hale getirmek için her girişte telefonunuza SMS kodu gönderilir.
                      </p>
                      <button className="mt-4 px-5 py-2.5 bg-green-600 text-white font-bold text-xs rounded-xl hover:bg-green-700 transition-colors shadow-md shadow-green-600/20">
                        2FA Etkinleştir
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 rounded-2xl border border-red-100 p-6 md:p-8">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 flex-shrink-0">
                      <AlertCircle size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-red-700">Hesabı Sil</h3>
                      <p className="text-sm text-red-600/70 mt-1 leading-relaxed">
                        Hesabınızı sildiğinizde tüm verileriniz, geçmiş taşımalarınız ve faturalarınız kalıcı olarak silinir. Bu işlem geri alınamaz.
                      </p>
                      <button className="mt-4 px-5 py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl hover:bg-red-700 transition-colors shadow-md shadow-red-600/20">
                        Hesabı Kalıcı Olarak Sil
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
