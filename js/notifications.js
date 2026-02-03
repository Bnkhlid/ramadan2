// Notifications Module for Ramadan App

let notificationPermission = 'default';
let prayerTimes = null;
let adhkarList = [];

// Initialize notifications
async function initNotifications() {
    // Check if notifications are supported
    if (!('Notification' in window)) {
        console.log('This browser does not support notifications');
        return false;
    }

    // Check current permission
    notificationPermission = Notification.permission;

    // Register service worker
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/service-worker.js');
            console.log('Service Worker registered:', registration);
        } catch (error) {
            console.error('Service Worker registration failed:', error);
        }
    }

    // Load adhkar for hourly notifications
    loadAdhkarForNotifications();

    // If already granted, start scheduling
    if (notificationPermission === 'granted') {
        startNotificationScheduling();
    }

    return true;
}

// Request notification permission
async function requestNotificationPermission() {
    if (!('Notification' in window)) {
        return false;
    }

    try {
        const permission = await Notification.requestPermission();
        notificationPermission = permission;

        if (permission === 'granted') {
            showNotification('تم تفعيل الإشعارات', 'سنرسل لك تذكيرات بمواقيت الصلاة والأذكار');
            startNotificationScheduling();
            return true;
        } else {
            console.log('Notification permission denied');
            return false;
        }
    } catch (error) {
        console.error('Error requesting notification permission:', error);
        return false;
    }
}

// Show a notification
function showNotification(title, body, tag = 'ramadan', url = '/index.html') {
    if (notificationPermission !== 'granted') return;

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        // Use service worker to show notification
        navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification(title, {
                body: body,
                icon: '/images/icon-192.png?v=1',
                badge: '/images/icon-192.png?v=1',
                vibrate: [200, 100, 200],
                tag: tag,
                requireInteraction: false,
                data: { url: url },
                dir: 'rtl',
                lang: 'ar'
            });
        });
    } else {
        // Fallback to regular notification
        new Notification(title, {
            body: body,
            icon: '/images/icon-192.png?v=1',
            vibrate: [200, 100, 200],
            tag: tag,
            dir: 'rtl',
            lang: 'ar'
        });
    }
}

// Fetch prayer times for notifications
async function fetchPrayerTimesForNotifications() {
    try {
        // Get user location
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        const today = new Date();
        const timestamp = Math.floor(today.getTime() / 1000);

        const response = await fetch(
            `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=5`
        );
        const data = await response.json();

        if (data.code === 200) {
            prayerTimes = data.data.timings;
            schedulePrayerNotifications();
        }
    } catch (error) {
        console.error('Error fetching prayer times:', error);
        // Fallback to Cairo
        try {
            const today = new Date();
            const timestamp = Math.floor(today.getTime() / 1000);
            const response = await fetch(
                `https://api.aladhan.com/v1/timingsByCity/${timestamp}?city=Cairo&country=Egypt&method=5`
            );
            const data = await response.json();
            if (data.code === 200) {
                prayerTimes = data.data.timings;
                schedulePrayerNotifications();
            }
        } catch (fallbackError) {
            console.error('Fallback prayer times failed:', fallbackError);
        }
    }
}

// Schedule prayer time notifications
function schedulePrayerNotifications() {
    if (!prayerTimes) return;

    const prayers = [
        { name: 'الفجر', time: prayerTimes.Fajr, icon: '🌅' },
        { name: 'الظهر', time: prayerTimes.Dhuhr, icon: '☀️' },
        { name: 'العصر', time: prayerTimes.Asr, icon: '🌤️' },
        { name: 'المغرب', time: prayerTimes.Maghrib, icon: '🌆' },
        { name: 'العشاء', time: prayerTimes.Isha, icon: '🌙' }
    ];

    const now = new Date();

    prayers.forEach(prayer => {
        const [hours, minutes] = prayer.time.split(':');
        const prayerTime = new Date();
        prayerTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        // If prayer time hasn't passed today
        if (prayerTime > now) {
            const timeUntil = prayerTime - now;
            setTimeout(() => {
                showNotification(
                    `${prayer.icon} حان وقت ${prayer.name}`,
                    `حان الآن موعد صلاة ${prayer.name}. بارك الله فيك`,
                    `prayer-${prayer.name}`,
                    '/prayer.html'
                );
            }, timeUntil);
        }
    });

    // Schedule pre-iftar notification (30 min before Maghrib)
    const [maghribHours, maghribMinutes] = prayerTimes.Maghrib.split(':');
    const iftarTime = new Date();
    iftarTime.setHours(parseInt(maghribHours), parseInt(maghribMinutes), 0, 0);
    iftarTime.setMinutes(iftarTime.getMinutes() - 30);

    if (iftarTime > now) {
        const timeUntil = iftarTime - now;
        setTimeout(() => {
            showNotification(
                '⏰ قرب موعد الإفطار',
                'باقي 30 دقيقة على أذان المغرب. جهز إفطارك',
                'pre-iftar',
                '/index.html'
            );
        }, timeUntil);
    }
}

// Load adhkar for hourly notifications
async function loadAdhkarForNotifications() {
    try {
        const response = await fetch('data/adkar.json?v=2');
        const data = await response.json();
        // Since it's a flat array, just take all of them
        adhkarList = data;
    } catch (error) {
        console.error('Error loading adhkar:', error);
        // Fallback adhkar
        adhkarList = [
            { text: 'سبحان الله وبحمده، سبحان الله العظيم' },
            { text: 'لا إله إلا الله وحده لا شريك له' },
            { text: 'اللهم صل وسلم على نبينا محمد' },
            { text: 'أستغفر الله وأتوب إليه' },
            { text: 'الحمد لله رب العالمين' }
        ];
    }
}

// Schedule hourly adhkar notifications
function scheduleHourlyAdhkar() {
    setInterval(() => {
        if (adhkarList.length > 0) {
            const randomDhikr = adhkarList[Math.floor(Math.random() * adhkarList.length)];
            showNotification(
                '📿 ذكر من الأذكار',
                randomDhikr.content || randomDhikr.text || 'سبحان الله وبحمده',
                'hourly-dhikr',
                '/adhkar.html'
            );
        }
    }, 60 * 60 * 1000); // Every hour
}

// Start all notification scheduling
function startNotificationScheduling() {
    // Fetch and schedule prayer times
    fetchPrayerTimesForNotifications();

    // Schedule hourly adhkar
    scheduleHourlyAdhkar();

    // Refresh prayer times daily at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const timeUntilMidnight = tomorrow - now;

    setTimeout(() => {
        fetchPrayerTimesForNotifications();
        // Set daily refresh
        setInterval(() => {
            fetchPrayerTimesForNotifications();
        }, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);
}

// Check if notifications are enabled
function areNotificationsEnabled() {
    return notificationPermission === 'granted';
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNotifications,
        requestNotificationPermission,
        showNotification,
        areNotificationsEnabled
    };
}
