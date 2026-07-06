import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/db";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@journey.dev";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "journey-admin";

async function seedAdmin() {
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

  await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {},
    create: {
      email: ADMIN_EMAIL,
      passwordHash,
      name: "Journey Admin",
      role: "ADMIN",
    },
  });

  console.log(`Admin user ready: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
}

const CATEGORIES = [
  { slug: "smartphones", nameEn: "Smartphones", nameFa: "گوشی‌های هوشمند", descEn: "Flagship phones, verified and in stock.", descFa: "گوشی‌های پرچمدار، بررسی‌شده و موجود در انبار.", icon: "Smartphone" },
  { slug: "laptops", nameEn: "Laptops", nameFa: "لپ‌تاپ", descEn: "Pro-grade laptops for work and creative work.", descFa: "لپ‌تاپ‌های حرفه‌ای برای کار و امور خلاقانه.", icon: "Laptop" },
  { slug: "audio", nameEn: "Audio", nameFa: "صوتی", descEn: "Headphones and speakers worth the hype.", descFa: "هدفون و اسپیکرهایی که ارزش هیاهویشان را دارند.", icon: "Headphones" },
  { slug: "wearables", nameEn: "Wearables", nameFa: "پوشیدنی‌ها", descEn: "Watches and bands that keep up with you.", descFa: "ساعت‌ها و بندهایی که همراه شما پیش می‌روند.", icon: "Watch" },
  { slug: "tablets", nameEn: "Tablets", nameFa: "تبلت", descEn: "Tablets for work, study, and everything between.", descFa: "تبلت برای کار، تحصیل و هر چیزی بین این دو.", icon: "Tablet" },
  { slug: "accessories", nameEn: "Accessories", nameFa: "لوازم جانبی", descEn: "Cases, chargers, and the small things that matter.", descFa: "قاب، شارژر و چیزهای کوچکی که اهمیت دارند.", icon: "Cable" },
];

async function seedCategories() {
  for (const [index, category] of CATEGORIES.entries()) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: { ...category, order: index },
    });
  }
  console.log(`Categories ready: ${CATEGORIES.map((c) => c.slug).join(", ")}`);
}

async function seedIphone() {
  const slug = "iphone-17-pro-max";

  await prisma.product.upsert({
    where: { slug },
    update: {},
    create: {
      slug,
      nameEn: "iPhone 17 Pro Max",
      nameFa: "آیفون ۱۷ پرو مکس",
      taglineEn: "Titanium-strength design. A19 Pro speed. The most capable iPhone camera yet.",
      taglineFa: "طراحی مقاوم، سرعت تراشه A19 Pro و قوی‌ترین دوربین آیفون تا امروز.",
      descriptionEn:
        "iPhone 17 Pro Max pairs the A19 Pro chip with a 6.9-inch Super Retina XDR display and a 48MP triple-camera system with true 4x telephoto reach. Built from an aluminum unibody with Ceramic Shield 2 on the front and back, it's the most durable and capable iPhone Apple has made.",
      descriptionFa:
        "آیفون ۱۷ پرو مکس ترکیبی از تراشه A19 Pro، نمایشگر ۶.۹ اینچی Super Retina XDR و سیستم دوربین سه‌گانه ۴۸ مگاپیکسلی با زوم تلفوتوی واقعی ۴ برابر است. با بدنه یکپارچه آلومینیومی و Ceramic Shield 2 در جلو و پشت، بادوام‌ترین و قوی‌ترین آیفون ساخته‌شده توسط اپل است.",
      price: 1199,
      compareAtPrice: null,
      currency: "USD",
      category: "smartphones",
      stock: 34,
      featured: true,
      images: {
        create: [
          {
            url: "/products/iphone-17-pro-max/silver.svg",
            alt: "iPhone 17 Pro Max in Silver",
            colorName: "Silver",
            colorHex: "#d4d4d8",
            order: 0,
          },
          {
            url: "/products/iphone-17-pro-max/cosmic-orange.svg",
            alt: "iPhone 17 Pro Max in Cosmic Orange",
            colorName: "Cosmic Orange",
            colorHex: "#c1653a",
            order: 1,
          },
          {
            url: "/products/iphone-17-pro-max/deep-blue.svg",
            alt: "iPhone 17 Pro Max in Deep Blue",
            colorName: "Deep Blue",
            colorHex: "#2f4a63",
            order: 2,
          },
        ],
      },
      specs: {
        create: [
          {
            labelEn: "Display",
            labelFa: "نمایشگر",
            valueEn: "6.9\" Super Retina XDR OLED, ProMotion 120Hz, 3000 nits peak outdoor brightness",
            valueFa: "۶.۹ اینچ Super Retina XDR OLED با ProMotion ۱۲۰ هرتز و روشنایی حداکثر ۳۰۰۰ نیت در فضای باز",
            order: 0,
          },
          {
            labelEn: "Chip",
            labelFa: "پردازنده",
            valueEn: "A19 Pro (6-core CPU, 6-core GPU, 16-core Neural Engine)",
            valueFa: "A19 Pro (پردازنده ۶ هسته‌ای، پردازنده گرافیکی ۶ هسته‌ای، موتور عصبی ۱۶ هسته‌ای)",
            order: 1,
          },
          {
            labelEn: "Rear cameras",
            labelFa: "دوربین‌های پشت",
            valueEn: "48MP Fusion Main, 48MP Ultra Wide, 48MP Telephoto (4x optical, 8x optical-quality)",
            valueFa: "۴۸ مگاپیکسل اصلی Fusion، ۴۸ مگاپیکسل فوق‌عریض، ۴۸ مگاپیکسل تلفوتو (زوم نوری ۴ برابر و کیفیت نوری تا ۸ برابر)",
            order: 2,
          },
          {
            labelEn: "Front camera",
            labelFa: "دوربین جلو",
            valueEn: "18MP Center Stage, ƒ/1.9, autofocus",
            valueFa: "۱۸ مگاپیکسل Center Stage با دیافراگم ƒ/1.9 و فوکوس خودکار",
            order: 3,
          },
          {
            labelEn: "Video",
            labelFa: "فیلم‌برداری",
            valueEn: "4K Dolby Vision up to 120 fps, ProRes, Cinematic mode",
            valueFa: "ضبط ۴K Dolby Vision تا ۱۲۰ فریم بر ثانیه، ProRes و حالت سینمایی",
            order: 4,
          },
          {
            labelEn: "Battery",
            labelFa: "باتری",
            valueEn: "Up to 39 hours video playback; 50% charge in 20 min with 40W adapter",
            valueFa: "تا ۳۹ ساعت پخش ویدیو؛ شارژ ۵۰٪ در ۲۰ دقیقه با آداپتور ۴۰ واتی",
            order: 5,
          },
          {
            labelEn: "Build",
            labelFa: "بدنه",
            valueEn: "Aluminum unibody with Ceramic Shield 2 front and back",
            valueFa: "بدنه یکپارچه آلومینیومی با Ceramic Shield 2 در جلو و پشت",
            order: 6,
          },
          {
            labelEn: "Water resistance",
            labelFa: "مقاومت در برابر آب",
            valueEn: "IP68 (up to 6 meters for 30 minutes)",
            valueFa: "استاندارد IP68 (تا عمق ۶ متر به مدت ۳۰ دقیقه)",
            order: 7,
          },
          {
            labelEn: "Connectivity",
            labelFa: "اتصالات",
            valueEn: "5G, Wi-Fi 7, Bluetooth 6, USB-C (USB 3, 10Gb/s)",
            valueFa: "۵G، Wi-Fi 7، بلوتوث ۶، USB-C (USB 3 با سرعت ۱۰ گیگابیت بر ثانیه)",
            order: 8,
          },
          {
            labelEn: "Storage",
            labelFa: "حافظه",
            valueEn: "256GB",
            valueFa: "۲۵۶ گیگابایت",
            order: 9,
          },
          {
            labelEn: "Colors",
            labelFa: "رنگ‌ها",
            valueEn: "Silver, Cosmic Orange, Deep Blue",
            valueFa: "نقره‌ای، نارنجی کیهانی، آبی تیره",
            order: 10,
          },
        ],
      },
    },
  });

  console.log(`Product ready: ${slug}`);
}

async function main() {
  await seedAdmin();
  await seedCategories();
  await seedIphone();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
