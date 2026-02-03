function injectNav(activePage = 'home') {
    const navHTML = `
    <nav class="fixed w-full z-40 bg-ramadan-dark/90 backdrop-blur-md border-b border-ramadan-gold/20">
      <div class="container mx-auto px-4 py-3">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <i class="fas fa-moon text-ramadan-gold text-2xl animate-float"></i>
            <a href="index.html" class="text-2xl font-bold text-ramadan-gold font-amiri">رمضان كريم</a>
          </div>
          <div class="hidden xl:flex gap-2 text-sm font-medium">
            <a href="index.html" class="${activePage === 'home' ? 'text-ramadan-gold' : 'hover:text-ramadan-gold text-white'} transition-colors">الرئيسية</a>
            <a href="quran.html" class="${activePage === 'quran' ? 'text-ramadan-gold' : 'hover:text-ramadan-gold text-white'} transition-colors">المصحف</a>
            <a href="bookmarks.html" class="${activePage === 'bookmarks' ? 'text-ramadan-gold' : 'hover:text-ramadan-gold text-white'} transition-colors flex items-center gap-1">المفضلة</a>
            <a href="prayer.html" class="${activePage === 'prayer' ? 'text-ramadan-gold' : 'hover:text-ramadan-gold text-white'} transition-colors">مواقيت الصلاة</a>
            <a href="tracker.html" class="${activePage === 'tracker' ? 'text-ramadan-gold' : 'hover:text-ramadan-gold text-white'} transition-colors">تتبع رمضان</a>
            <a href="tafsir.html" class="${activePage === 'tafsir' ? 'text-ramadan-gold' : 'hover:text-ramadan-gold text-white'} transition-colors">التفسير</a>
            <a href="hadith.html" class="${activePage === 'hadith' ? 'text-ramadan-gold' : 'hover:text-ramadan-gold text-white'} transition-colors">الأحاديث</a>
            <a href="reciters.html" class="${activePage === 'reciters' ? 'text-ramadan-gold' : 'hover:text-ramadan-gold text-white'} transition-colors">القراء</a>
            <a href="radio.html" class="${activePage === 'radio' ? 'text-ramadan-gold' : 'hover:text-ramadan-gold text-white'} transition-colors">الإذاعة</a>
            <a href="adhkar.html" class="${activePage === 'adhkar' ? 'text-ramadan-gold' : 'hover:text-ramadan-gold text-white'} transition-colors">الأذكار</a>
            <a href="names.html" class="${activePage === 'names' ? 'text-ramadan-gold' : 'hover:text-ramadan-gold text-white'} transition-colors">أسماء الله</a>
            <a href="tasbih.html" class="${activePage === 'tasbih' ? 'text-ramadan-gold' : 'hover:text-ramadan-gold text-white'} transition-colors">السبحة</a>
            <a href="verse.html" class="${activePage === 'verse' ? 'text-ramadan-gold' : 'hover:text-ramadan-gold text-white'} transition-colors">آية عشوائية</a>
            <a href="moshaf.html" class="${activePage === 'moshaf' ? 'text-ramadan-gold' : 'hover:text-ramadan-gold text-white'} transition-colors">تحميل المصحف</a>
          </div>
          <button class="xl:hidden text-ramadan-gold p-2" onclick="toggleMobileMenu()" aria-label="قائمة التنقل">
            <i class="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </div>
      <div id="mobileMenu" class="hidden xl:hidden bg-ramadan-dark border-t border-ramadan-gold/20 h-[80vh] overflow-y-auto custom-scrollbar">
        <div class="flex flex-col p-4 gap-2">
            <a href="index.html" class="hover:text-ramadan-gold py-2 border-b border-white/10">الرئيسية</a>
            <a href="quran.html" class="hover:text-ramadan-gold py-2 border-b border-white/10">المصحف الكريم</a>
            <a href="bookmarks.html" class="hover:text-ramadan-gold py-2 border-b border-white/10 flex items-center gap-2 text-ramadan-gold">المفضلة</a>
            <a href="prayer.html" class="hover:text-ramadan-gold py-2 border-b border-white/10">مواقيت الصلاة</a>
            <a href="tracker.html" class="hover:text-ramadan-gold py-2 border-b border-white/10">تتبع رمضان</a>
            <a href="tafsir.html" class="hover:text-ramadan-gold py-2 border-b border-white/10">تفسير القرآن</a>
            <a href="hadith.html" class="hover:text-ramadan-gold py-2 border-b border-white/10">الأحاديث النبوية</a>
            <a href="reciters.html" class="hover:text-ramadan-gold py-2 border-b border-white/10">قراء القرآن</a>
            <a href="radio.html" class="hover:text-ramadan-gold py-2 border-b border-white/10">إذاعة القرآن</a>
            <a href="adhkar.html" class="hover:text-ramadan-gold py-2 border-b border-white/10">الأذكار</a>
            <a href="names.html" class="hover:text-ramadan-gold py-2 border-b border-white/10">أسماء الله الحسنى</a>
            <a href="tasbih.html" class="hover:text-ramadan-gold py-2 border-b border-white/10">السبحة الإلكترونية</a>
            <a href="verse.html" class="hover:text-ramadan-gold py-2 border-b border-white/10">آية عشوائية</a>
            <a href="moshaf.html" class="hover:text-ramadan-gold py-2">تحميل المصحف</a>
        </div>
      </div>
    </nav>`;

    document.getElementById('nav-placeholder').innerHTML = navHTML;
}

function injectFooter() {
    const footerHTML = `
    <footer class="bg-ramadan-dark border-t border-ramadan-gold/20 py-12 relative overflow-hidden mt-20">
      <div class="absolute inset-0 stars opacity-30"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="text-center">
          <div class="flex justify-center items-center gap-3 mb-6">
            <i class="fas fa-moon text-ramadan-gold text-2xl md:text-3xl"></i>
            <span class="text-2xl md:text-3xl font-bold text-ramadan-gold font-amiri">رمضان كريم</span>
          </div>
          <p class="text-gray-400 mb-6 text-sm md:text-base">تقبل الله صيامكم وقيامكم</p>
          <div class="mb-6 py-4 border-t border-b border-white/10 inline-block px-4 md:px-8">
            <p class="text-ramadan-gold font-bold text-base md:text-lg">
              <i class="fas fa-code ml-2"></i> Developed by <span class="text-xl md:text-2xl mx-2">bnkhlid</span>
            </p>
          </div>
          <div class="border-t border-white/10 pt-8 text-xs md:text-sm text-gray-500">
            <p>© 2026 رمضان كريم - جميع الحقوق محفوظة</p>
          </div>
        </div>
      </div>
    </footer>`;

    document.getElementById('footer-placeholder').innerHTML = footerHTML;
}

function toggleMobileMenu() {
    document.getElementById("mobileMenu").classList.toggle("hidden");
}

// Common Tailwind Config
tailwind.config = {
    theme: {
        extend: {
            colors: {
                "ramadan-dark": "#0f172a",
                "ramadan-blue": "#1e3a8a",
                "ramadan-gold": "#fbbf24",
                "ramadan-gold-light": "#fcd34d",
                "ramadan-purple": "#7c3aed",
                "ramadan-emerald": "#059669",
                "ramadan-teal": "#14b8a6",
            },
            fontFamily: {
                amiri: ["Amiri", "serif"],
                tajawal: ["Tajawal", "sans-serif"],
                quran: ["Scheherazade New", "serif"],
            },
        },
    },
};
