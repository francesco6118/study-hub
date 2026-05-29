# CLAUDE.md — Çalışma Uygulaması (Study Hub)

Bu dosya projenin anayasasıdır. Çelişki olursa burada yazan kazanır.
Talimatları **kısa, net ve ölçülebilir** tut; uzun ve bulanık kurallar takip edilmez.

---

## 1. Proje Nedir?

Telefonda da rahat çalışan, çalışma odaklı bir web uygulaması ("Study Hub").
Tek kullanıcı (kişisel) bir uygulama; karmaşık çok kullanıcılı altyapı gerekmez.

Çekirdek özellikler:
- Pomodoro zamanlayıcı (çalış/mola döngüsü)
- Ders takvimi + planlama (Google Takvim'e senkron)
- Görev / to-do listesi
- İstatistik ve grafikler
- Çalışma serisi (streak) ve motivasyon
- Ders bazlı notlar ve hedefler

---

## 2. Teknik Kararlar (değiştirme, önce sor)

- **Framework:** React + Vite
- **Dil:** JavaScript (TypeScript'e geçilmeyecek; öğrenme sürecini basit tut)
- **Stil:** Tailwind CSS. Mobil öncelikli (mobile-first) responsive tasarım.
- **State:** React hook'ları (`useState`, `useEffect`, `useContext`). Başta harici state kütüphanesi YOK.
- **Veri saklama:** Şimdilik `localStorage`. Çok cihazlı senkron gerekirse Supabase'e geçeriz (o zaman tartışılacak).
- **Grafikler:** Recharts.
- **Takvim:** Google Calendar API (client-side, Google Identity Services ile). Detay: Bölüm 6.
- **Yayınlama:** Vercel.

---

## 3. Proje Yapısı

```
src/
  components/      # Tekrar kullanılabilir UI parçaları (Button, Card, vb.)
  features/        # Her özellik kendi klasöründe (pomodoro/, calendar/, tasks/, stats/, notes/)
  hooks/           # Özel hook'lar (useTimer, useLocalStorage, vb.)
  lib/             # Yardımcı fonksiyonlar, sabitler, localStorage erişimi
  pages/           # Ana sayfalar/görünümler
  App.jsx
  main.jsx
```

Kurallar:
- Her özellik kendi `features/` klasöründe kalsın; özellikler birbirine sızmasın.
- `localStorage` erişimini tek bir yerden (`lib/storage.js`) yap, her yerde dağıtma.

---

## 4. Kodlama Kuralları

- Bileşenler küçük ve tek işe odaklı olsun. 150 satırı geçen bileşeni böl.
- İsimlendirme İngilizce (component, function, değişken); kullanıcıya görünen metinler **Türkçe**.
- Yeni bir paket (npm install) eklemeden önce bana sor ve nedenini söyle.
- Açıklama gerektiren yerlere kısa yorum ekle; gereksiz yorumla şişirme.
- Mobilde test etmeyi unutma: dokunma hedefleri yeterince büyük, yazılar okunaklı olsun.

---

## 5. Çalışma Şekli (ÖNEMLİ)

- **Faz faz ilerle. Sıradaki faza, ben "tamam geçelim" demeden geçme.**
- Büyük bir değişiklikten önce ne yapacağını 2-3 cümleyle özetle, sonra yap.
- Bir faz bitince aşağıdaki yol haritasında o fazı `[x]` olarak işaretle.
- Çalışan koddan emin olmadan bir sonraki özelliği eklemeyelim.

---

## 6. Faz Yol Haritası

- [x] **Faz 1 — Temel + Pomodoro**
  Vite + React + Tailwind kurulumu. Boş iskeleti Vercel'e at.
  Pomodoro: ayarlanabilir çalışma (vars. 25dk) ve mola (5dk) süresi, başlat/duraklat/sıfırla,
  büyük okunaklı sayaç, süre bitince ses + tarayıcı bildirimi.
- [x] **Faz 2 — Dersler + takvim (yerel)**
  Ders ekleme/silme. Çalışma seansı planlama. Uygulama içi takvim görünümü.
  Her Pomodoro bir derse bağlanabilsin.
- [x] **Faz 3 — Görev listesi**
  To-do ekle/tamamla/sil. Görevler derslere bağlanabilsin.
- [ ] **Faz 4 — İstatistik & grafikler** ← ŞU AN BURADAYIZ
  Tamamlanan pomodoro sayısı, ders başına süre, haftalık grafik (Recharts).
- [ ] **Faz 5 — Streak & motivasyon**
  Günlük seri sayacı, günlük/haftalık hedef, motive edici geri bildirim.
- [ ] **Faz 6 — Ders bazlı not & hedef**
  Her derse not alanı ve hedef belirleme.
- [ ] **Faz 7 — Google Takvim senkronu**
  Planlanan çalışma seanslarını Google Takvim'e yaz. (En zor faz — Bölüm 7'ye bak.)
- [ ] **Faz 8 — Cila + PWA**
  Mobil ince ayar, telefona kurulabilir (PWA) hale getirme, bildirimler.

---

## 7. Google Takvim Senkronu — Notlar

Bu faza gelene kadar dokunma. Geldiğimizde:
- **Yöntem:** Google Identity Services (GIS) ile client-side OAuth token al, sonra
  Google Calendar API v3 ile takvime etkinlik ekle. Backend gerekmez (tek kullanıcı).
- **Scope:** `https://www.googleapis.com/auth/calendar.events`
- **Kuzey'in elle yapacağı kısım** (Claude bunları YAPAMAZ, sadece yönlendirir):
  Google Cloud Console'da proje açmak, Calendar API'yi etkinleştirmek,
  "Web application" tipinde OAuth Client ID oluşturmak, uygulamayı "Testing"
  modunda tutup kendini test kullanıcısı eklemek.
- **GÜVENLİK:** API anahtarı / client secret gibi gizli değerleri ASLA koda gömme.
  Bunları `.env` dosyasına koy ve `.env`'i `.gitignore`'a ekle. Gizli değerleri
  her zaman Kuzey girer.

---

## 8. Komutlar

```bash
npm run dev      # Geliştirme sunucusu (localhost)
npm run build    # Üretim derlemesi
npm run preview  # Derlemeyi yerelde önizle
```

(Bu komutlar Faz 1'de proje kurulunca netleşecek; değişirse burayı güncelle.)

---

## 9. Genel Kurallar / Hatırlatmalar

- Asla gizli anahtar, şifre veya token'ı kaynak koda yazma. Hepsi `.env` içinde.
- `.gitignore` içinde en azından: `node_modules/`, `.env`, `dist/` olsun.
- Kullanıcıya görünen tüm metinler Türkçe.
- Bir şeyden emin değilsen tahmin etme, bana sor.
