const axios = require("axios");

const API_URL = "https://sokrabecddiicnejkqyf.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNva3JhYmVjZGRpaWNuZWprcXlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMjA2NjAsImV4cCI6MjA5Njg5NjY2MH0.aUZ-AdEhOCLIBwb5aTcUWr4A3FZ5g-pQpTnmlysguyk";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  Prefer: "resolution=merge-duplicates"
};

const customers = [
  { id: "CST-101", name: "Ahmad Subarjo", phone: "08121111001", email: "ahmad@gmail.com", membership_id: "MBR-PLT", points: 520 },
  { id: "CST-102", name: "Budi Setiawan", phone: "08121111002", email: "budi@gmail.com", membership_id: "MBR-GLD", points: 310 },
  { id: "CST-103", name: "Citra Lestari", phone: "08121111003", email: "citra@gmail.com", membership_id: "MBR-SLV", points: 80 },
  { id: "CST-104", name: "Dewi Sartika", phone: "08121111004", email: "dewi@gmail.com", membership_id: "MBR-SLV", points: 15 },
  { id: "CST-105", name: "Eko Prasetyo", phone: "08121111005", email: "eko@gmail.com", membership_id: "MBR-PLT", points: 640 },
  { id: "CST-106", name: "Fitriani Santoso", phone: "08121111006", email: "fitri@gmail.com", membership_id: "MBR-GLD", points: 290 },
  { id: "CST-107", name: "Gilang Ramadhan", phone: "08121111007", email: "gilang@gmail.com", membership_id: "MBR-SLV", points: 45 },
  { id: "CST-108", name: "Hendra Wijaya", phone: "08121111008", email: "hendra@gmail.com", membership_id: "MBR-PLT", points: 710 },
  { id: "CST-109", name: "Indah Permatasari", phone: "08121111009", email: "indah@gmail.com", membership_id: "MBR-GLD", points: 220 },
  { id: "CST-110", name: "Joko Susilo", phone: "08121111010", email: "joko.susilo@gmail.com", membership_id: "MBR-SLV", points: 90 },
  { id: "CST-111", name: "Kartika Sari", phone: "08121111011", email: "kartika@gmail.com", membership_id: "MBR-PLT", points: 880 },
  { id: "CST-112", name: "Lukman Hakim", phone: "08121111012", email: "lukman@gmail.com", membership_id: "MBR-GLD", points: 410 },
  { id: "CST-113", name: "Mega Utami", phone: "08121111013", email: "mega@gmail.com", membership_id: "MBR-SLV", points: 30 },
  { id: "CST-114", name: "Novianti Putri", phone: "08121111014", email: "novi@gmail.com", membership_id: "MBR-SLV", points: 50 },
  { id: "CST-115", name: "Oki Rian", phone: "08121111015", email: "oki@gmail.com", membership_id: "MBR-PLT", points: 950 },
  { id: "CST-116", name: "Putri Rahayu", phone: "08121111016", email: "putri@gmail.com", membership_id: "MBR-GLD", points: 380 },
  { id: "CST-117", name: "Qori Amelia", phone: "08121111017", email: "qori@gmail.com", membership_id: "MBR-SLV", points: 120 },
  { id: "CST-118", name: "Rian Hidayat", phone: "08121111018", email: "rian@gmail.com", membership_id: "MBR-PLT", points: 1100 },
  { id: "CST-119", name: "Siti Aminah", phone: "08121111019", email: "siti@gmail.com", membership_id: "MBR-GLD", points: 450 },
  { id: "CST-120", name: "Taufik Hidayat", phone: "08121111020", email: "taufik@gmail.com", membership_id: "MBR-SLV", points: 75 },
  { id: "CST-121", name: "Umar Syarif", phone: "08121111021", email: "umar@gmail.com", membership_id: "MBR-PLT", points: 615 },
  { id: "CST-122", name: "Vina Panduwinata", phone: "08121111022", email: "vina@gmail.com", membership_id: "MBR-GLD", points: 280 },
  { id: "CST-123", name: "Wawan Hermawan", phone: "08121111023", email: "wawan@gmail.com", membership_id: "MBR-SLV", points: 10 },
  { id: "CST-124", name: "Xena Alexandra", phone: "08121111024", email: "xena@gmail.com", membership_id: "MBR-SLV", points: 20 },
  { id: "CST-125", name: "Yudi Suryadi", phone: "08121111025", email: "yudi@gmail.com", membership_id: "MBR-PLT", points: 550 },
  { id: "CST-126", name: "Zahra Aulia", phone: "08121111026", email: "zahra@gmail.com", membership_id: "MBR-GLD", points: 300 },
  { id: "CST-127", name: "Adi Nugroho", phone: "08121111027", email: "adi@gmail.com", membership_id: "MBR-SLV", points: 95 },
  { id: "CST-128", name: "Bambang Pamungkas", phone: "08121111028", email: "bambang@gmail.com", membership_id: "MBR-PLT", points: 780 },
  { id: "CST-129", name: "Cynthia Bella", phone: "08121111029", email: "cynthia@gmail.com", membership_id: "MBR-GLD", points: 210 },
  { id: "CST-130", name: "Deni Sumargo", phone: "08121111030", email: "deni@gmail.com", membership_id: "MBR-SLV", points: 60 },
  { id: "CST-131", name: "Elvira Devinamira", phone: "08121111031", email: "elvira@gmail.com", membership_id: "MBR-PLT", points: 840 },
  { id: "CST-132", name: "Fendy Chow", phone: "08121111032", email: "fendy@gmail.com", membership_id: "MBR-GLD", points: 340 },
  { id: "CST-133", name: "Gita Gutawa", phone: "08121111033", email: "gita@gmail.com", membership_id: "MBR-SLV", points: 40 },
  { id: "CST-134", name: "Hary Tanoe", phone: "08121111034", email: "hary@gmail.com", membership_id: "MBR-SLV", points: 90 },
  { id: "CST-135", name: "Irfan Bachdim", phone: "08121111035", email: "irfan@gmail.com", membership_id: "MBR-PLT", points: 1020 },
  { id: "CST-136", name: "Jessica Mila", phone: "08121111036", email: "jessica@gmail.com", membership_id: "MBR-GLD", points: 260 },
  { id: "CST-137", name: "Kevin Julio", phone: "08121111037", email: "kevin@gmail.com", membership_id: "MBR-SLV", points: 110 },
  { id: "CST-138", name: "Luna Maya", phone: "08121111038", email: "luna@gmail.com", membership_id: "MBR-PLT", points: 1250 },
  { id: "CST-139", name: "Maudy Ayunda", phone: "08121111039", email: "maudy@gmail.com", membership_id: "MBR-GLD", points: 490 },
  { id: "CST-140", name: "Nadiem Makarim", phone: "08121111040", email: "nadiem@gmail.com", membership_id: "MBR-SLV", points: 85 },
  { id: "CST-141", name: "Olga Syahputra", phone: "08121111041", email: "olga@gmail.com", membership_id: "MBR-PLT", points: 510 },
  { id: "CST-142", name: "Pevita Pearce", phone: "08121111042", email: "pevita@gmail.com", membership_id: "MBR-GLD", points: 370 },
  { id: "CST-143", name: "Raffi Ahmad", phone: "08121111043", email: "raffi@gmail.com", membership_id: "MBR-SLV", points: 200 },
  { id: "CST-144", name: "Sule Sutisna", phone: "08121111044", email: "sule@gmail.com", membership_id: "MBR-SLV", points: 50 },
  { id: "CST-145", name: "Tora Sudiro", phone: "08121111045", email: "tora@gmail.com", membership_id: "MBR-PLT", points: 670 },
  { id: "CST-146", name: "Uus Kartolo", phone: "08121111046", email: "uus@gmail.com", membership_id: "MBR-GLD", points: 290 },
  { id: "CST-147", name: "Vicky Prasetyo", phone: "08121111047", email: "vicky@gmail.com", membership_id: "MBR-SLV", points: 15 },
  { id: "CST-148", name: "Wulan Guritno", phone: "08121111048", email: "wulan@gmail.com", membership_id: "MBR-PLT", points: 890 },
  { id: "CST-149", name: "Yuki Kato", phone: "08121111049", email: "yuki@gmail.com", membership_id: "MBR-GLD", points: 430 },
  { id: "CST-150", name: "Zaskia Mecca", phone: "08121111050", email: "zaskia@gmail.com", membership_id: "MBR-SLV", points: 130 }
];

const products = [
  { id: "PRD-101", category: "Nasi Box", name: "Nasi Box Rendang Padang", price: 38000, image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=800" },
  { id: "PRD-102", category: "Nasi Box", name: "Nasi Box Ayam Bakar Solo", price: 32000, image: "https://images.unsplash.com/photo-1604908176997-125f25cc500f?w=800" },
  { id: "PRD-103", category: "Nasi Box", name: "Nasi Box Empal Geprek", price: 40000, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800" },
  { id: "PRD-104", category: "Nasi Box", name: "Nasi Box Bebek Goreng", price: 45000, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800" },
  { id: "PRD-105", category: "Nasi Box", name: "Nasi Box Cumi Cabe Ijo", price: 35000, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800" },
  { id: "PRD-106", category: "Snack Box", name: "Snack Box Pastel & Risoles", price: 15000, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800" },
  { id: "PRD-107", category: "Snack Box", name: "Snack Box Kroket & Lemper", price: 16500, image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800" },
  { id: "PRD-108", category: "Snack Box", name: "Snack Box Lapis Legit Premium", price: 22000, image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800" },
  { id: "PRD-109", category: "Snack Box", name: "Snack Box Soes & Fruit Pie", price: 19000, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800" },
  { id: "PRD-110", category: "Coffee & Drinks", name: "Es Kopi Susu Gula Aren", price: 18000, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800" },
  { id: "PRD-111", category: "Coffee & Drinks", name: "Es Matcha Latte Creamy", price: 21000, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800" },
  { id: "PRD-112", category: "Coffee & Drinks", name: "Healthy Jus Avocado", price: 25000, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800" },
  { id: "PRD-113", category: "Catering Paket", name: "Paket Catering Nasi Kuning Tumpeng", price: 350000, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800" },
  { id: "PRD-114", category: "Catering Paket", name: "Paket Catering Bento Box Kids", price: 28000, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800" },
  { id: "PRD-115", category: "Catering Paket", name: "Paket Catering Nasi Liwet Bancakan", price: 450000, image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800" }
];

const suppliers = [
  { id: "SPL-101", name: "UD Ayam Segar Jaya", phone: "08122222301" },
  { id: "SPL-102", name: "Toko Sembako Beras Ibu", phone: "08122222302" },
  { id: "SPL-103", name: "PD Sayur Mayur Lestari", phone: "08122222303" },
  { id: "SPL-104", name: "CV Kemasan Plastik Pack", phone: "08122222304" },
  { id: "SPL-105", name: "Distributor Kopi Nusantara", phone: "08122222305" }
];

const inventory = [
  { id: "STK-101", product_name: "Beras Pandan Wangi (kg)", stock: 240, supplier_id: "SPL-102" },
  { id: "STK-102", product_name: "Daging Sapi Pilihan (kg)", stock: 65, supplier_id: "SPL-101" },
  { id: "STK-103", product_name: "Sayur Cabe Ijo Mix (pack)", stock: 80, supplier_id: "SPL-103" },
  { id: "STK-104", product_name: "Kopi Robusta Gayo (kg)", stock: 35, supplier_id: "SPL-105" },
  { id: "STK-105", product_name: "Minyak Goreng Bimoli (lt)", stock: 120, supplier_id: "SPL-102" },
  { id: "STK-106", product_name: "Box Kemasan Craft (pcs)", stock: 1500, supplier_id: "SPL-104" }
];

const promotions = [
  { id: "PRM-101", title: "[Flash Sale] Diskon Spesial Awal Bulan", discount: 0.15, start_date: "2026-07-01", end_date: "2026-07-31" },
  { id: "PRM-102", title: "[Promo Gajian] Potongan Flat Rp 25k", discount: 25000, start_date: "2026-07-25", end_date: "2026-07-30" },
  { id: "PRM-103", title: "[Gratis Ongkir] Potongan Ongkir Hemat", discount: 15000, start_date: "2026-07-01", end_date: "2026-07-20" }
];

// Generate 50 orders logically distributed among 50 customers
const orders = [];
const orderDetails = [];
const feedbacks = [];

const statuses = ["Pending", "Diproses", "Selesai", "Dibatalkan"];

for (let i = 1; i <= 50; i++) {
  const ordId = `ORD-${100 + i}`;
  const cstId = `CST-${101 + ((i - 1) % 50)}`; // matches CST-101 to CST-150
  
  // Logical status distribution: mostly Selesai, some Diproses/Pending, very few Dibatalkan
  let statusVal = "Selesai";
  if (i === 48 || i === 49) statusVal = "Diproses";
  if (i === 50) statusVal = "Pending";
  if (i === 15 || i === 35) statusVal = "Dibatalkan";

  // Pick random products for details
  const prod1 = products[(i - 1) % products.length];
  const prod2 = products[i % products.length];
  
  const qty1 = ((i % 3) + 1) * 2; // e.g. 2, 4, 6
  const qty2 = ((i % 2) + 1);     // e.g. 1, 2
  
  const sub1 = Number(prod1.price) * qty1;
  const sub2 = Number(prod2.price) * qty2;
  const subtotal = sub1 + sub2;

  // loyalty / promo discount
  let disc = 0;
  let promoCodeUsed = "";
  if (i % 3 === 0) {
    disc = Math.round(subtotal * 0.10); // 10% members
  } else if (i % 5 === 0) {
    disc = 25000; // flat promo
    promoCodeUsed = "PRM-102";
  }
  const totalVal = Math.max(1000, subtotal - disc);

  // Status serialization logic: Status[Event: Date][Note: ...][Discount: ...][Promo: ...]
  const eventDate = `2026-07-${String(10 + (i % 20)).padStart(2, "0")}`;
  let statusPacked = statusVal;
  statusPacked += `[Event: ${eventDate}]`;
  statusPacked += `[Note: Rasa agak pedas, packing rapi]`;
  if (disc > 0) statusPacked += `[Discount: ${disc}]`;
  if (promoCodeUsed) statusPacked += `[Promo: ${promoCodeUsed}]`;

  orders.push({
    id: ordId,
    customer_id: cstId,
    order_date: new Date(2026, 6, i % 28, 10 + (i % 8), i * 11 % 60).toISOString(),
    total: totalVal,
    status: statusPacked
  });

  orderDetails.push({
    id: `DTL-${ordId}-1`,
    order_id: ordId,
    product_id: prod1.id,
    qty: qty1,
    subtotal: sub1
  });

  orderDetails.push({
    id: `DTL-${ordId}-2`,
    order_id: ordId,
    product_id: prod2.id,
    qty: qty2,
    subtotal: sub2
  });

  // Logical Feedback for some orders
  if (i % 3 === 0) {
    feedbacks.push({
      id: `FDB-${100 + i}`,
      customer_id: cstId,
      rating: (i % 2 === 0) ? 5 : 4,
      comment: `Catering mantap untuk acara keluarga! Menu ${prod1.name} sangat lezat.`,
      reply: (i % 6 === 0) ? "Terima kasih banyak kak atas dukungannya!" : "",
      created_at: new Date(2026, 6, i % 28, 12, 0).toISOString()
    });
  }
}

async function seedDatabase() {
  console.log("Seeding Supabase Database with 50 logic-safe records...");
  try {
    // 1. Insert Customers
    await axios.post(`${API_URL}/customers`, customers, { headers });
    console.log("✅ Customers seeded successfully!");

    // 2. Insert Products
    await axios.post(`${API_URL}/products`, products, { headers });
    console.log("✅ Products seeded successfully!");

    // 3. Insert Suppliers
    await axios.post(`${API_URL}/suppliers`, suppliers, { headers });
    console.log("✅ Suppliers seeded successfully!");

    // 4. Insert Inventory
    await axios.post(`${API_URL}/inventory`, inventory, { headers });
    console.log("✅ Inventory seeded successfully!");

    // 5. Insert Promotions
    await axios.post(`${API_URL}/promotions`, promotions, { headers });
    console.log("✅ Promotions seeded successfully!");

    // 6. Insert Orders
    await axios.post(`${API_URL}/orders`, orders, { headers });
    console.log("✅ Orders seeded successfully!");

    // 7. Insert Order Details
    await axios.post(`${API_URL}/order_details`, orderDetails, { headers });
    console.log("✅ Order Details seeded successfully!");

    // 8. Insert Feedback
    await axios.post(`${API_URL}/feedback`, feedbacks, { headers });
    console.log("✅ Feedbacks seeded successfully!");

    console.log("🏆 Seeding completed successfully with zero primary key collision errors.");
  } catch (error) {
    console.error("❌ Seeding failed:", error.response?.data || error.message);
  }
}

seedDatabase();
