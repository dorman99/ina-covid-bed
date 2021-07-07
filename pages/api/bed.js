import axios from "axios";
import cheerio from "cheerio";
import { parseUrl } from "query-string";

const provincesWithCities = [
  {
    province: { key: "11prop", value: "aceh", name: "Aceh" },
    cities: [
      { code: "1101", name: "Simeulue" },
      { code: "1102", name: "Aceh Singkil" },
      { code: "1103", name: "Aceh Selatan" },
      { code: "1104", name: "Aceh Tenggara" },
      { code: "1105", name: "Aceh Timur" },
      { code: "1106", name: "Aceh Tengah" },
      { code: "1107", name: "Aceh Barat" },
      { code: "1108", name: "Aceh Besar" },
      { code: "1109", name: "Pidie" },
      { code: "1110", name: "Bireuen" },
      { code: "1111", name: "Aceh Utara" },
      { code: "1112", name: "Aceh Barat Daya" },
      { code: "1113", name: "Gayo Lues" },
      { code: "1114", name: "Aceh Tamiang" },
      { code: "1115", name: "Nagan Raya" },
      { code: "1116", name: "Aceh Jaya" },
      { code: "1117", name: "Bener Meriah" },
      { code: "1118", name: "Pidie Jaya" },
      { code: "1171", name: "Kota Banda Aceh" },
      { code: "1172", name: "Kota Sabang" },
      { code: "1173", name: "Kota Langsa" },
      { code: "1174", name: "Kota Lhokseumawe" },
      { code: "1175", name: "Kota Subulussalam" },
    ],
  },
  {
    province: {
      key: "12prop",
      value: "sumatera_utara",
      name: "Sumatera Utara",
    },
    cities: [
      { code: "1201", name: "Nias" },
      { code: "1202", name: "Mandailing Natal" },
      { code: "1203", name: "Tapanuli Selatan" },
      { code: "1204", name: "Tapanuli Tengah" },
      { code: "1205", name: "Tapanuli Utara" },
      { code: "1206", name: "Toba Samosir" },
      { code: "1207", name: "Labuhan Batu" },
      { code: "1208", name: "Asahan" },
      { code: "1209", name: "Simalungun" },
      { code: "1210", name: "Dairi" },
      { code: "1211", name: "Karo" },
      { code: "1212", name: "Deli Serdang" },
      { code: "1213", name: "Langkat" },
      { code: "1214", name: "Nias Selatan" },
      { code: "1215", name: "Humbang Hasundutan" },
      { code: "1216", name: "Pakpak Bharat" },
      { code: "1217", name: "Samosir" },
      { code: "1218", name: "Serdang Bedagai" },
      { code: "1219", name: "Batu Bara" },
      { code: "1220", name: "Padang Lawas Utara" },
      { code: "1221", name: "Padang Lawas" },
      { code: "1222", name: "Labuhan Batu Selatan" },
      { code: "1223", name: "Labuhan Batu Utara" },
      { code: "1224", name: "Nias Utara" },
      { code: "1225", name: "Nias Barat" },
      { code: "1271", name: "Kota Sibolga" },
      { code: "1272", name: "Kota Tanjung Balai" },
      { code: "1273", name: "Kota Pematang Siantar" },
      { code: "1274", name: "Kota Tebing Tinggi" },
      { code: "1275", name: "Kota Medan" },
      { code: "1276", name: "Kota Binjai" },
      { code: "1277", name: "Kota Padang Sidempuan" },
      { code: "1278", name: "Kota Gunungsitoli" },
    ],
  },
  {
    province: {
      key: "13prop",
      value: "sumatera_barat",
      name: "Sumatera Barat",
    },
    cities: [
      { code: "1301", name: "Kepulauan Mentawai" },
      { code: "1302", name: "Pesisir Selatan" },
      { code: "1303", name: "Solok" },
      { code: "1304", name: "Sijunjung" },
      { code: "1305", name: "Tanah Datar" },
      { code: "1306", name: "Padang Pariaman" },
      { code: "1307", name: "Agam" },
      { code: "1308", name: "Lima Puluh Kota" },
      { code: "1309", name: "Pasaman" },
      { code: "1310", name: "Solok Selatan" },
      { code: "1311", name: "Dharmasraya" },
      { code: "1312", name: "Pasaman Barat" },
      { code: "1371", name: "Kota Padang" },
      { code: "1372", name: "Kota Solok" },
      { code: "1373", name: "Kota Sawah Lunto" },
      { code: "1374", name: "Kota Padang Panjang" },
      { code: "1375", name: "Kota Bukittinggi" },
      { code: "1376", name: "Kota Payakumbuh" },
      { code: "1377", name: "Kota Pariaman" },
    ],
  },
  {
    province: { key: "14prop", value: "riau", name: "Riau" },
    cities: [
      { code: "1401", name: "Kuantan Singingi" },
      { code: "1402", name: "Indragiri Hulu" },
      { code: "1403", name: "Indragiri Hilir" },
      { code: "1404", name: "Pelalawan" },
      { code: "1405", name: "Siak" },
      { code: "1406", name: "Kampar" },
      { code: "1407", name: "Rokan Hulu" },
      { code: "1408", name: "Bengkalis" },
      { code: "1409", name: "Rokan Hilir" },
      { code: "1410", name: "Kepulauan Meranti" },
      { code: "1471", name: "Kota Pekanbaru" },
      { code: "1473", name: "Kota Dumai" },
    ],
  },
  {
    province: { key: "15prop", value: "jambi", name: "Jambi" },
    cities: [
      { code: "1501", name: "Kerinci" },
      { code: "1502", name: "Merangin" },
      { code: "1503", name: "Sarolangun" },
      { code: "1504", name: "Batang Hari" },
      { code: "1505", name: "Muaro Jambi" },
      { code: "1506", name: "Tanjung Jabung Timur" },
      { code: "1507", name: "Tanjung Jabung Barat" },
      { code: "1508", name: "Tebo" },
      { code: "1509", name: "Bungo" },
      { code: "1571", name: "Kota Jambi" },
      { code: "1572", name: "Kota Sungai penuh" },
    ],
  },
  {
    province: {
      key: "16prop",
      value: "sumatera_selatan",
      name: "Sumatera Selatan",
    },
    cities: [
      { code: "1601", name: "Ogan Komering Ulu" },
      { code: "1602", name: "Ogan Komering Ilir" },
      { code: "1603", name: "Muara Enim" },
      { code: "1604", name: "Lahat" },
      { code: "1605", name: "Musi Rawas" },
      { code: "1606", name: "Musi Banyuasin" },
      { code: "1607", name: "Banyuasin" },
      { code: "1608", name: "Ogan Komering Ulu Selatan" },
      { code: "1609", name: "Ogan Komering Ulu Timur" },
      { code: "1610", name: "Ogan Ilir" },
      { code: "1611", name: "Empat Lawang" },
      { code: "1612", name: "Penukal Abab Lematang Ilir " },
      { code: "1613", name: "Musi Rawas Utara" },
      { code: "1671", name: "Kota Palembang" },
      { code: "1672", name: "Kota Prabumulih" },
      { code: "1673", name: "Kota Pagar Alam" },
      { code: "1674", name: "Kota Lubuk Linggau" },
    ],
  },
  {
    province: { key: "17prop", value: "bengkulu", name: "Bengkulu" },
    cities: [
      { code: "1701", name: "Bengkulu Selatan" },
      { code: "1702", name: "Rejang Lebong" },
      { code: "1703", name: "Bengkulu Utara" },
      { code: "1704", name: "Kaur" },
      { code: "1705", name: "Seluma" },
      { code: "1706", name: "Muko Muko" },
      { code: "1707", name: "Lebong" },
      { code: "1708", name: "Kepahiang" },
      { code: "1709", name: "Bengkulu Tengah" },
      { code: "1771", name: "Kota Bengkulu" },
    ],
  },
  {
    province: { key: "18prop", value: "lampung", name: "Lampung" },
    cities: [
      { code: "1801", name: "Lampung Barat" },
      { code: "1802", name: "Tanggamus" },
      { code: "1803", name: "Lampung Selatan" },
      { code: "1804", name: "Lampung Timur" },
      { code: "1805", name: "Lampung Tengah" },
      { code: "1806", name: "Lampung Utara" },
      { code: "1807", name: "Way Kanan" },
      { code: "1808", name: "Tulang Bawang" },
      { code: "1809", name: "Pesawaran" },
      { code: "1810", name: "Pringsewu" },
      { code: "1811", name: "Mesuji" },
      { code: "1812", name: "Tulang Bawang Barat" },
      { code: "1813", name: "Pesisir Barat" },
      { code: "1871", name: "Kota Bandar Lampung" },
      { code: "1872", name: "Kota Metro" },
    ],
  },
  {
    province: {
      key: "19prop",
      value: "kepulauan_bangka_belitung",
      name: "Kepulauan Bangka Belitung",
    },
    cities: [
      { code: "1901", name: "Bangka" },
      { code: "1902", name: "Belitung" },
      { code: "1903", name: "Bangka Barat" },
      { code: "1904", name: "Bangka Tengah" },
      { code: "1905", name: "Bangka Selatan" },
      { code: "1906", name: "Belitung Timur" },
      { code: "1971", name: "Kota Pangkal Pinang" },
    ],
  },
  {
    province: {
      key: "20prop",
      value: "kepulauan_riau",
      name: "Kepulauan Riau",
    },
    cities: [
      { code: "2101", name: "Karimun" },
      { code: "2102", name: "Bintan" },
      { code: "2103", name: "Natuna" },
      { code: "2104", name: "Lingga" },
      { code: "2105", name: "Kepulauan Anambas" },
      { code: "2171", name: "Kota Batam" },
      { code: "2172", name: "Kota Tanjung Pinang" },
    ],
  },
  {
    province: { key: "31prop", value: "jakarta", name: "Jakarta" },
    cities: [
      { code: "3101", name: "Kepulauan Seribu" },
      { code: "3171", name: "Kota Jakarta Selatan" },
      { code: "3172", name: "Kota Jakarta Timur" },
      { code: "3173", name: "Kota Jakarta Pusat" },
      { code: "3174", name: "Kota Jakarta Barat" },
      { code: "3175", name: "Kota Jakarta Utara" },
    ],
  },
  {
    province: { key: "32prop", value: "jawa_barat", name: "Jawa Barat" },
    cities: [
      { code: "3201", name: "Bogor" },
      { code: "3202", name: "Sukabumi" },
      { code: "3203", name: "Cianjur" },
      { code: "3204", name: "Bandung" },
      { code: "3205", name: "Garut" },
      { code: "3206", name: "Tasikmalaya" },
      { code: "3207", name: "Ciamis" },
      { code: "3208", name: "Kuningan" },
      { code: "3209", name: "Cirebon" },
      { code: "3210", name: "Majalengka" },
      { code: "3211", name: "Sumedang" },
      { code: "3212", name: "Indramayu" },
      { code: "3213", name: "Subang" },
      { code: "3214", name: "Purwakarta" },
      { code: "3215", name: "Karawang" },
      { code: "3216", name: "Bekasi" },
      { code: "3217", name: "Bandung Barat" },
      { code: "3218", name: "Pangandaran" },
      { code: "3271", name: "Kota Bogor" },
      { code: "3272", name: "Kota Sukabumi" },
      { code: "3273", name: "Kota Bandung" },
      { code: "3274", name: "Kota Cirebon" },
      { code: "3275", name: "Kota Bekasi" },
      { code: "3276", name: "Kota Depok" },
      { code: "3277", name: "Kota Cimahi" },
      { code: "3278", name: "Kota Tasikmalaya" },
      { code: "3279", name: "Kota Banjar" },
    ],
  },
  {
    province: { key: "33prop", value: "jawa_tengah", name: "Jawa Tengah" },
    cities: [
      { code: "3301", name: "Cilacap" },
      { code: "3302", name: "Banyumas" },
      { code: "3303", name: "Purbalingga" },
      { code: "3304", name: "Banjarnegara" },
      { code: "3305", name: "Kebumen" },
      { code: "3306", name: "Purworejo" },
      { code: "3307", name: " Wonosobo" },
      { code: "3308", name: "Magelang" },
      { code: "3309", name: "Boyolali" },
      { code: "3310", name: "Klaten" },
      { code: "3311", name: "Sukoharjo" },
      { code: "3312", name: "Wonogiri" },
      { code: "3313", name: "Karanganyar" },
      { code: "3314", name: "Sragen" },
      { code: "3315", name: "Grobogan" },
      { code: "3316", name: "Blora" },
      { code: "3317", name: "Rembang" },
      { code: "3318", name: "Pati" },
      { code: "3319", name: "Kudus" },
      { code: "3320", name: "Jepara" },
      { code: "3321", name: "Demak" },
      { code: "3322", name: "Semarang" },
      { code: "3323", name: "Temanggung" },
      { code: "3324", name: "Kendal" },
      { code: "3325", name: "Batang" },
      { code: "3326", name: "Pekalongan" },
      { code: "3327", name: "Pemalang" },
      { code: "3328", name: "Tegal" },
      { code: "3329", name: "Brebes" },
      { code: "3371", name: "Kota Magelang" },
      { code: "3372", name: "Kota Surakarta" },
      { code: "3373", name: "Kota Salatiga" },
      { code: "3374", name: "Kota Semarang" },
      { code: "3375", name: "Kota Pekalongan" },
      { code: "3376", name: "Kota Tegal" },
    ],
  },
  {
    province: { key: "34prop", value: "yogyakarta", name: "Yogyakarta" },
    cities: [
      { code: "3401", name: "Kulon Progo" },
      { code: "3402", name: "Bantul" },
      { code: "3403", name: "Gunung Kidul" },
      { code: "3404", name: "Sleman" },
      { code: "3471", name: "Kota Yogyakarta" },
    ],
  },
  {
    province: { key: "35prop", value: "jawa_timur", name: "Jawa Timur" },
    cities: [
      { code: "3501", name: "Pacitan" },
      { code: "3502", name: "Ponorogo" },
      { code: "3503", name: "Trenggalek" },
      { code: "3504", name: "Tulungagung" },
      { code: "3505", name: "Blitar" },
      { code: "3506", name: "Kediri" },
      { code: "3507", name: "Malang" },
      { code: "3508", name: "Lumajang" },
      { code: "3509", name: "Jember" },
      { code: "3510", name: "Banyuwangi" },
      { code: "3511", name: "Bondowoso" },
      { code: "3512", name: "Situbondo" },
      { code: "3513", name: "Probolinggo" },
      { code: "3514", name: "Pasuruan" },
      { code: "3515", name: "Sidoarjo" },
      { code: "3516", name: "Mojokerto" },
      { code: "3517", name: "Jombang" },
      { code: "3518", name: "Nganjuk" },
      { code: "3519", name: "Madiun" },
      { code: "3520", name: "Magetan" },
      { code: "3521", name: "Ngawi" },
      { code: "3522", name: "Bojonegoro" },
      { code: "3523", name: "Tuban" },
      { code: "3524", name: "Lamongan" },
      { code: "3525", name: "Gresik" },
      { code: "3526", name: "Bangkalan" },
      { code: "3527", name: "Sampang" },
      { code: "3528", name: "Pamekasan" },
      { code: "3529", name: "Sumenep" },
      { code: "3571", name: "Kota Kediri" },
      { code: "3572", name: "Kota Blitar" },
      { code: "3573", name: "Kota Malang" },
      { code: "3574", name: "Kota Probolinggo" },
      { code: "3575", name: "Kota Pasuruan" },
      { code: "3576", name: "Kota Mojokerto" },
      { code: "3577", name: "Kota Madiun" },
      { code: "3578", name: "Kota Surabaya" },
      { code: "3579", name: "Kota Batu" },
    ],
  },
  {
    province: { key: "36prop", value: "banten", name: "Banten" },
    cities: [
      { code: "3601", name: "Pandeglang" },
      { code: "3602", name: "Lebak" },
      { code: "3603", name: "Tangerang" },
      { code: "3604", name: "Serang" },
      { code: "3671", name: "Kota Tangerang" },
      { code: "3672", name: "Kota Cilegon" },
      { code: "3673", name: "Kota Serang" },
      { code: "3674", name: "Kota Tangerang Selatan" },
    ],
  },
  {
    province: { key: "51prop", value: "bali", name: "Bali" },
    cities: [
      { code: "5101", name: "Jembrana" },
      { code: "5102", name: "Tabanan" },
      { code: "5103", name: "Badung" },
      { code: "5104", name: "Gianyar" },
      { code: "5105", name: "Klungkung" },
      { code: "5106", name: "Bangli" },
      { code: "5107", name: "Karangasem" },
      { code: "5108", name: "Buleleng" },
      { code: "5171", name: "Kota Denpasar" },
    ],
  },
  {
    province: {
      key: "52prop",
      value: "nusa_tenggara_barat",
      name: "Nusa Tenggara Barat",
    },
    cities: [
      { code: "5201", name: "Lombok Barat" },
      { code: "5202", name: "Lombok Tengah" },
      { code: "5203", name: "Lombok Timur" },
      { code: "5204", name: "Sumbawa" },
      { code: "5205", name: "Dompu" },
      { code: "5206", name: "Bima" },
      { code: "5207", name: "Sumbawa Barat" },
      { code: "5208", name: "Lombok Utara" },
      { code: "5271", name: "Kota Mataram" },
      { code: "5272", name: "Kota Bima" },
    ],
  },
  {
    province: {
      key: "53prop",
      value: "nusa_tenggara_timur",
      name: "Nusa Tenggara Timur",
    },
    cities: [
      { code: "5301", name: "Sumba Barat" },
      { code: "5302", name: "Sumba Timur" },
      { code: "5303", name: "Kupang" },
      { code: "5304", name: "Timor Tengah Selatan" },
      { code: "5305", name: "Timor Tengah Utara" },
      { code: "5306", name: "Belu" },
      { code: "5307", name: "Alor" },
      { code: "5308", name: "Lembata" },
      { code: "5309", name: "Flores Timur" },
      { code: "5310", name: "Sikka" },
      { code: "5311", name: "Ende" },
      { code: "5312", name: "Ngada" },
      { code: "5313", name: "Manggarai" },
      { code: "5314", name: "Rote Ndao" },
      { code: "5315", name: "Manggarai Barat" },
      { code: "5316", name: "Sumba Tengah" },
      { code: "5317", name: "Sumba Barat Daya" },
      { code: "5318", name: "Nagekeo" },
      { code: "5319", name: "Manggarai Timur" },
      { code: "5320", name: "Sabu Raijua" },
      { code: "5321", name: "Malaka" },
      { code: "5371", name: "Kota Kupang" },
    ],
  },
  {
    province: {
      key: "61prop",
      value: "kalimantan_barat",
      name: "Kalimantan Barat",
    },
    cities: [
      { code: "6101", name: "Sambas" },
      { code: "6102", name: "Bengkayang" },
      { code: "6103", name: "Landak" },
      { code: "6104", name: "Mempawah" },
      { code: "6105", name: "Sanggau" },
      { code: "6106", name: "Ketapang" },
      { code: "6107", name: "Sintang" },
      { code: "6108", name: "Kapuas Hulu" },
      { code: "6109", name: "Sekadau" },
      { code: "6110", name: "Melawi" },
      { code: "6111", name: "Kayong Utara" },
      { code: "6112", name: "Kubu Raya" },
      { code: "6171", name: "Kota Pontianak" },
      { code: "6172", name: "Kota Singkawang" },
    ],
  },
  {
    province: {
      key: "62prop",
      value: "kalimantan_tengah",
      name: "Kalimantan Tengah",
    },
    cities: [
      { code: "6201", name: "Kotawaringin Barat" },
      { code: "6202", name: "Kotawaringin Timur" },
      { code: "6203", name: "Kapuas" },
      { code: "6204", name: "Barito Selatan" },
      { code: "6205", name: "Barito Utara" },
      { code: "6206", name: "Sukamara" },
      { code: "6207", name: "Lamandau" },
      { code: "6208", name: "Seruyan" },
      { code: "6209", name: "Katingan" },
      { code: "6210", name: "Pulang Pisau" },
      { code: "6211", name: "Gunung Mas" },
      { code: "6212", name: "Barito Timur" },
      { code: "6213", name: "Murung Raya" },
      { code: "6271", name: "Kota Palangka Raya" },
    ],
  },
  {
    province: {
      key: "63prop",
      value: "kalimantan_selatan",
      name: "Kalimantan Selatan",
    },
    cities: [
      { code: "6301", name: "Tanah Laut" },
      { code: "6302", name: "Kota baru" },
      { code: "6303", name: "Banjar" },
      { code: "6304", name: "Barito Kuala" },
      { code: "6305", name: "Tapin" },
      { code: "6306", name: "Hulu Sungai Selatan" },
      { code: "6307", name: "Hulu Sungai Tengah" },
      { code: "6308", name: "Hulu Sungai Utara" },
      { code: "6309", name: "Tabalong" },
      { code: "6310", name: "Tanah Bumbu" },
      { code: "6311", name: "Balangan" },
      { code: "6371", name: "Kota Banjarmasin" },
      { code: "6372", name: "Kota Banjar baru" },
    ],
  },
  {
    province: {
      key: "64prop",
      value: "kalimantan_timur",
      name: "Kalimantan Timur",
    },
    cities: [
      { code: "6401", name: "Paser" },
      { code: "6402", name: "Kutai Barat" },
      { code: "6403", name: "Kutai Kartanegara" },
      { code: "6404", name: "Kutai Timur" },
      { code: "6405", name: "Berau" },
      { code: "6409", name: "Penajam Paser Utara" },
      { code: "6411", name: "Mahakam Hulu" },
      { code: "6471", name: "Kota Balikpapan" },
      { code: "6472", name: "Kota Samarinda" },
      { code: "6474", name: "Kota Bontang" },
    ],
  },
  {
    province: {
      key: "65prop",
      value: "kalimantan_utara",
      name: "Kalimantan Utara",
    },
    cities: [
      { code: "6501", name: "Malinau" },
      { code: "6502", name: "Bulungan" },
      { code: "6503", name: "Tana Tidung" },
      { code: "6504", name: "Nunukan" },
      { code: "6571", name: "Kota Tarakan" },
    ],
  },
  {
    province: {
      key: "71prop",
      value: "sulawesi_utara",
      name: "Sulawesi Utara",
    },
    cities: [
      { code: "7101", name: "Bolaang Mongondow" },
      { code: "7102", name: "Minahasa" },
      { code: "7103", name: "Kepulauan Sangihe" },
      { code: "7104", name: "Kepulauan Talaud" },
      { code: "7105", name: "Minahasa Selatan" },
      { code: "7106", name: "Minahasa Utara" },
      { code: "7107", name: "Bolaang Mongondow Utara" },
      { code: "7108", name: "Kepulauan Siau Tagulandang Biaro" },
      { code: "7109", name: "Minahasa Tenggara" },
      { code: "7110", name: "Bolaang Mongondow Selatan" },
      { code: "7111", name: "Bolaang Mongondow Timur" },
      { code: "7171", name: "Kota Manado" },
      { code: "7172", name: "Kota Bitung" },
      { code: "7173", name: "Kota Tomohon" },
      { code: "7174", name: "Kota Kotamobagu" },
    ],
  },
  {
    province: {
      key: "72prop",
      value: "sulawesi_tengah",
      name: "Sulawesi Tengah",
    },
    cities: [
      { code: "7201", name: "Banggai Kepulauan" },
      { code: "7202", name: "Banggai" },
      { code: "7203", name: "Morowali" },
      { code: "7204", name: "Poso" },
      { code: "7205", name: "Donggala" },
      { code: "7206", name: "Toli-Toli" },
      { code: "7207", name: "Buol" },
      { code: "7208", name: "Parigi Moutong" },
      { code: "7209", name: "Tojo Una-Una" },
      { code: "7210", name: "Sigi" },
      { code: "7211", name: "Banggai Laut" },
      { code: "7212", name: "Morowali Utara" },
      { code: "7271", name: "Kota Palu" },
    ],
  },
  {
    province: {
      key: "73prop",
      value: "sulawesi_selatan",
      name: "Sulawesi Selatan",
    },
    cities: [
      { code: "7301", name: "Kepulauan Selayar" },
      { code: "7302", name: "Bulukumba" },
      { code: "7303", name: "Bantaeng" },
      { code: "7304", name: "Jeneponto" },
      { code: "7305", name: "Takalar" },
      { code: "7306", name: "Gowa" },
      { code: "7307", name: "Sinjai" },
      { code: "7308", name: "Bone" },
      { code: "7309", name: "Maros" },
      { code: "7310", name: "Pangkajene Kepulauan" },
      { code: "7311", name: "Barru" },
      { code: "7312", name: "Soppeng" },
      { code: "7313", name: "Wajo" },
      { code: "7314", name: "Sidenreng Rappang" },
      { code: "7315", name: "Pinrang" },
      { code: "7316", name: "Enrekang" },
      { code: "7317", name: "Luwu" },
      { code: "7318", name: "Tana Toraja" },
      { code: "7322", name: "Luwu Utara" },
      { code: "7325", name: "Luwu Timur" },
      { code: "7326", name: "Toraja Utara" },
      { code: "7371", name: "Kota Makassar" },
      { code: "7372", name: "Kota Pare-pare" },
      { code: "7373", name: "Kota Palopo" },
    ],
  },
  {
    province: {
      key: "74prop",
      value: "sulawesi_tenggara",
      name: "Sulawesi Tenggara",
    },
    cities: [
      { code: "7401", name: "Buton" },
      { code: "7402", name: "Muna" },
      { code: "7403", name: "Konawe" },
      { code: "7404", name: "Kolaka" },
      { code: "7405", name: "Konawe Selatan" },
      { code: "7406", name: "Bombana" },
      { code: "7407", name: "Wakatobi" },
      { code: "7408", name: "Kolaka Utara" },
      { code: "7409", name: "Buton Utara" },
      { code: "7410", name: "Konawe Utara" },
      { code: "7411", name: "Kolaka Timur" },
      { code: "7412", name: "Konawe Kepulauan" },
      { code: "7413", name: "Muna Barat" },
      { code: "7414", name: "Buton Tengah" },
      { code: "7415", name: "Buton Selatan" },
      { code: "7471", name: "Kota Kendari" },
      { code: "7472", name: "Kota Bau-Bau" },
    ],
  },
  {
    province: { key: "75prop", value: "gorontalo", name: "Gorontalo" },
    cities: [
      { code: "7501", name: "Boalemo" },
      { code: "7502", name: "Gorontalo" },
      { code: "7503", name: "Pohuwato" },
      { code: "7504", name: "Bone Bolango" },
      { code: "7505", name: "Gorontalo Utara" },
      { code: "7571", name: "Kota Gorontalo" },
    ],
  },
  {
    province: {
      key: "76prop",
      value: "sulawesi_barat",
      name: "Sulawesi Barat",
    },
    cities: [{ code: "7602", name: "Polewali Mandar" }],
  },
  {
    province: { key: "81prop", value: "maluku", name: "Maluku" },
    cities: [
      { code: "8101", name: "Maluku Tenggara Barat" },
      { code: "8102", name: "Maluku Tenggara" },
      { code: "8103", name: "Maluku Tengah" },
      { code: "8104", name: "Buru" },
      { code: "8105", name: "Kepulauan Aru" },
      { code: "8106", name: "Seram Bagian Barat" },
      { code: "8107", name: "Seram Bagian Timur" },
      { code: "8108", name: "Maluku Barat Daya" },
      { code: "8109", name: "Buru Selatan" },
      { code: "8171", name: "Kota Ambon" },
      { code: "8172", name: "Kota Tual" },
    ],
  },
  {
    province: { key: "82prop", value: "maluku_utara", name: "Maluku Utara" },
    cities: [
      { code: "8201", name: "Halmahera Barat" },
      { code: "8202", name: "Halmahera Tengah" },
      { code: "8203", name: "Kepulauan Sula" },
      { code: "8204", name: "Halmahera Selatan" },
      { code: "8205", name: "Halmahera Utara" },
      { code: "8206", name: "Halmahera Timur" },
      { code: "8207", name: "Pulau Morotai" },
      { code: "8208", name: "Pulau Taliabu" },
      { code: "8271", name: "Kota Ternate" },
      { code: "8272", name: "Kota Tidore Kepulauan" },
    ],
  },
  {
    province: { key: "91prop", value: "papua_barat", name: "Papua Barat" },
    cities: [
      { code: "7601", name: "Majene" },
      { code: "7603", name: "Mamasa" },
      { code: "7604", name: "Mamuju" },
      { code: "7605", name: "Pasangkayu" },
      { code: "7606", name: "Mamuju Tengah" },
      { code: "9101", name: "Fakfak" },
      { code: "9102", name: "Kaimana" },
      { code: "9103", name: "Teluk Wondama" },
      { code: "9104", name: "Teluk Bintuni" },
      { code: "9105", name: "Manokwari" },
      { code: "9106", name: "Sorong Selatan" },
      { code: "9107", name: "Sorong" },
      { code: "9108", name: "Raja Ampat" },
      { code: "9109", name: "Tambrauw" },
      { code: "9110", name: "Maybrat" },
      { code: "9111", name: "Manokwari Selatan" },
      { code: "9112", name: "Pegunungan Arfak" },
      { code: "9171", name: "Kota Sorong" },
    ],
  },
  {
    province: { key: "92prop", value: "papua", name: "Papua" },
    cities: [
      { code: "9201", name: "Merauke" },
      { code: "9202", name: "Jayawijaya" },
      { code: "9203", name: "Jayapura" },
      { code: "9204", name: "Nabire" },
      { code: "9205", name: "Biak Numfor" },
      { code: "9208", name: "Kepulauan Yapen" },
      { code: "9210", name: "Paniai" },
      { code: "9211", name: "Puncak Jaya" },
      { code: "9212", name: "Mimika" },
      { code: "9213", name: "Boven Digoel" },
      { code: "9214", name: "Mappi" },
      { code: "9215", name: "Asmat" },
      { code: "9216", name: "Yahukimo" },
      { code: "9217", name: "Pegunungan Bintang" },
      { code: "9218", name: "Tolikara" },
      { code: "9219", name: "Sarmi" },
      { code: "9220", name: "Keerom" },
      { code: "9226", name: "Waropen" },
      { code: "9227", name: "Supiori" },
      { code: "9228", name: "Mamberamo Raya" },
      { code: "9229", name: "Nduga" },
      { code: "9230", name: "Lanny Jaya" },
      { code: "9231", name: "Mamberamo Tengah" },
      { code: "9232", name: "Yalimo" },
      { code: "9233", name: "Puncak" },
      { code: "9234", name: "Dogiyai" },
      { code: "9235", name: "Intan Jaya" },
      { code: "9236", name: "Deiyai" },
      { code: "9271", name: "Kota Jayapura" },
    ],
  },
];

export default async function getBedAvailability(req, res) {
  if (req.method !== "GET") {
    res
      .status(405)
      .json({ status: 405, data: null, error: "Method not allowed." });
    return;
  }

  const provinceWithCity = provincesWithCities.find(
    (pwc) => pwc.province.value === "yogyakarta"
  );

  const provKey = provinceWithCity.province.key;
  const url = `http://yankes.kemkes.go.id/app/siranap/rumah_sakit?jenis=1&propinsi=${provKey}`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const hospitalNameArr = [];
    const bedAvailable = [];
    const address = [];
    const updatedAt = [];
    const bedQueue = [];
    const hotline = [];
    const bedDetailLink = [];

    $("h5").filter((i, el) => {
      const data = $(el);
      hospitalNameArr.push(
        data
          .first()
          .text()
          .split(" ")
          .filter((i) => i !== "")
          .join(" ")
      );
    });

    $("b").filter((i, el) => {
      const data = $(el);
      bedAvailable.push(data.first().text());
    });

    $("p").filter((i, el) => {
      const data = $(el);

      // Address
      if (
        data
          .first()
          .text()
          .split(" ")
          .filter((i) => i !== "")[0] !== "\n"
      ) {
        address.push(
          data
            .first()
            .text()
            .split(" ")
            .filter((i) => i !== "")
            .join(" ")
        );
      }

      // Updated At
      if (
        data
          .first()
          .text()
          .split(" ")
          .filter((i) => i !== "")
          .includes("diupdate")
      ) {
        if (
          data
            .first()
            .text()
            .split(" ")
            .filter((i) => i !== "")
            .reverse()[5] === "kurang"
        ) {
          updatedAt.push(0);
        }

        if (
          data
            .first()
            .text()
            .split(" ")
            .filter((i) => i !== "")
            .reverse()[2] === "menit"
        ) {
          updatedAt.push(
            Number(
              data
                .first()
                .text()
                .split(" ")
                .filter((i) => i !== "")
                .reverse()[3]
            )
          );
        }

        if (
          data
            .first()
            .text()
            .split(" ")
            .filter((i) => i !== "")
            .reverse()[2] === "jam"
        ) {
          updatedAt.push(
            Number(
              data
                .first()
                .text()
                .split(" ")
                .filter((i) => i !== "")
                .reverse()[3]
            ) * 60
          );
        }
      }

      // Bed Queue
      if (
        data
          .first()
          .text()
          .split(" ")
          .filter((i) => i !== "")
          .includes("antrian")
      ) {
        if (
          data
            .first()
            .text()
            .split(" ")
            .filter((i) => i !== "")[1] === "tanpa"
        ) {
          bedQueue.push(0);
        }

        if (
          data
            .first()
            .text()
            .split(" ")
            .filter((i) => i !== "")[1] === "dengan"
        ) {
          bedQueue.push(
            Number(
              data
                .first()
                .text()
                .split(" ")
                .filter((i) => i !== "")[3]
            )
          );
        }
      }

      // Hotline
      if (
        data
          .first()
          .text()
          .split(" ")
          .filter((i) => i !== "")
          .includes("konfirmasi")
      ) {
        if (
          data
            .first()
            .text()
            .split(" ")
            .filter((i) => i !== "")
            .filter((i) => i !== "\n")[0] === "hotline"
        ) {
          hotline.push("");
        }

        if (
          data
            .first()
            .text()
            .split(" ")
            .filter((i) => i !== "")
            .filter((i) => i !== "\n")[0] === "konfirmasi"
        ) {
          hotline.push(
            data
              .first()
              .text()
              .split(" ")
              .filter((i) => i !== "")
              .filter((i) => i !== "\n")[2]
          );
        }
      }
    });

    $("a").filter((i, el) => {
      const data = $(el);
      const link = data.attr("href");
      const { query } = parseUrl(link);
      bedDetailLink.push({ link, hospital_code: query.kode_rs });
    });

    hospitalNameArr.shift();

    const filteredAvailableBed = hospitalNameArr
      .map((hos, idx) => ({
        name: hos,
        address: address[idx],
        available_bed: Number(bedAvailable[idx]) || 0,
        bed_queue: bedQueue[idx],
        hotline: hotline[idx],
        bed_detail_link: bedDetailLink[idx].link,
        hospital_code: bedDetailLink[idx].hospital_code,
        updated_at_minutes: updatedAt[idx],
      }))
      .filter((hos) => hos.available_bed > 0);

    const filteredAvailableBedWithLocation = filteredAvailableBed.map((hos) => {
      const url = `http://yankes.kemkes.go.id/app/siranap/rumah_sakit/${hos.hospital_code}`;
      return axios
        .get(url)
        .then((res) => ({
          ...hos,
          lat: res.data.data.alt,
          lon: res.data.data.long,
        }))
        .catch((e) => {
          console.log(e);
          res.status(500).json({
            status: 500,
            data: null,
            error: "Internal server error. (filteredAvailableBedWithLocation)",
          });
        });
    });

    const newArr = await Promise.all(filteredAvailableBedWithLocation);

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");

    return res.json({ status: 200, data: newArr, error: null });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ status: 500, data: null, error: "Internal server error." });
  }
}