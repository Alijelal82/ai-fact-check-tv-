# 📺 AI Fact Check TV

قناة الذكاء الاصطناعي المباشرة على دومين `aifactchecktv.online`

## 🎯 المميزات

- 🎤 صوت ElevenLabs احترافي (المذيع: علاء)
- 🎨 هوية بصرية أزرق/فيروزي/أخضر نعناعي
- 📰 10 أخبار AI حقيقية حديثة
- 🔴 شريط أخبار عاجلة متحرك
- 📱 محسّن للآيفون والآيباد
- 🔒 API Key محمي بـ Environment Variables

## 📁 هيكل الملفات

```
ai-fact-check-tv/
├── api/
│   └── tts.js          # Serverless Function (يخفي API Key)
├── public/
│   └── index.html      # الواجهة الرئيسية
├── vercel.json         # إعدادات Vercel
├── package.json        # معلومات المشروع
└── README.md
```

## 🚀 خطوات النشر على Vercel

### الخطوة 1: إنشاء حساب GitHub (مجاني)
1. ادخل: https://github.com/signup
2. سجّل بإيميلك
3. اختر username (مثلاً: `alidatavisionary`)

### الخطوة 2: إنشاء Repository
1. اضغط زر **"+"** في الأعلى → **"New repository"**
2. الاسم: `ai-fact-check-tv`
3. اختر **Public**
4. اضغط **Create repository**

### الخطوة 3: رفع الملفات
الطريقة الأسهل:
1. في الـ repository الجديد، اضغط **"uploading an existing file"**
2. اسحب جميع الملفات
3. اضغط **Commit changes**

### الخطوة 4: ربط بـ Vercel
1. ادخل: https://vercel.com
2. اضغط **Sign Up** → **Continue with GitHub**
3. اختر **"Add New Project"**
4. اختر `ai-fact-check-tv` من قائمة Repositories
5. اضغط **Deploy**

### الخطوة 5: إضافة API Key (مهم!)
1. في Vercel Dashboard → اختر مشروعك
2. اذهب إلى **Settings** → **Environment Variables**
3. أضف متغير جديد:
   - **Name:** `ELEVENLABS_API_KEY`
   - **Value:** الصق مفتاحك (`sk_...`)
   - **Environments:** اختر الكل (Production, Preview, Development)
4. اضغط **Save**
5. ارجع إلى **Deployments** → اضغط **Redeploy** على آخر deployment

### الخطوة 6: ربط الدومين
1. في مشروع Vercel → **Settings** → **Domains**
2. اكتب `aifactchecktv.online`
3. اضغط **Add**
4. Vercel سيعطيك سجلين DNS - انسخهما
5. ادخل Hostinger → **Domains** → `aifactchecktv.online` → **Manage Domain** → **DNS / Nameservers**
6. أضف السجلات التي أعطاك إياها Vercel
7. انتظر 5-30 دقيقة

## 🎬 الاستخدام

افتح `https://aifactchecktv.online` على iPhone أو أي جهاز:
1. اضغط **"ابدأ البث المباشر"**
2. علاء يبدأ بقراءة الأخبار بصوت احترافي
3. الأخبار تتغير تلقائياً كل 15 ثانية
4. شريط الأخبار العاجلة يمشي تحت

## 🛠️ تخصيص

### إضافة أخبار جديدة
عدّل المصفوفة `newsStories` في `public/index.html`:

```javascript
{
  cat: 'AI · الفئة',
  catEn: 'CATEGORY',
  title: 'العنوان بالعربية',
  titleEn: 'Title in English',
  script: 'النص الذي سيقرأه علاء',
  source: 'المصدر',
  img: 'رابط الصورة من Unsplash'
}
```

### تغيير صوت المذيع
عدّل في `api/tts.js`:
```javascript
const VOICE_ID = 'NEW_VOICE_ID_HERE';
```

## 💰 التكاليف

- **Vercel:** مجاني (للاستخدام الشخصي)
- **GitHub:** مجاني
- **Hostinger Domain:** مجاني (مع الخطة)
- **ElevenLabs:** $5/شهر (Starter) أو 10,000 حرف مجاناً
- **المجموع:** **$5/شهر فقط** للصوت الاحترافي

## 📞 الدعم

أي مشاكل أو أسئلة، راجع الـ Console في المتصفح (F12) لرؤية تفاصيل الأخطاء.

---

صُنع بـ ❤️ لـ AI Fact Check
