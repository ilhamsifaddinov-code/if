import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Cpu,
  ShieldCheck,
  Zap,
  Compass,
  ArrowUpRight,
  CheckCircle2,
  Sparkle,
  GraduationCap,
  Calendar,
  Layers,
  Activity,
  Radio,
  Sun,
  Moon,
  SlidersHorizontal,
  Tv,
  RotateCcw,
  TrendingUp,
  Award,
  MapPin,
  Map,
  Navigation
} from 'lucide-react';

// Apple-Style Haptic Audio Synthesizer & Generative Ambient Soundscape
class AppleHapticAudio {
  constructor() {
    this.ctx = null;
    this.enabled = true; // Enabled by default for rich tactile feel
    this.droneNodes = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Generative Ethereal Ambient Drone (Zero external MP3, meditative background)
  startAmbientDrone() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx || this.droneNodes) return;
    try {
      const t = this.ctx.currentTime;
      const masterDroneGain = this.ctx.createGain();
      masterDroneGain.gain.setValueAtTime(0.0001, t);
      masterDroneGain.gain.linearRampToValueAtTime(0.018, t + 1.2);

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(110, t); // A2 fundamental
      osc2.frequency.setValueAtTime(164.81, t); // E3 fifth harmonic

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260, t);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterDroneGain);
      masterDroneGain.connect(this.ctx.destination);

      osc1.start(t);
      osc2.start(t);

      this.droneNodes = { osc1, osc2, masterDroneGain };
    } catch {}
  }

  stopAmbientDrone() {
    if (!this.droneNodes || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      this.droneNodes.masterDroneGain.gain.linearRampToValueAtTime(0.0001, t + 0.6);
      setTimeout(() => {
        if (this.droneNodes) {
          try {
            this.droneNodes.osc1.stop();
            this.droneNodes.osc2.stop();
          } catch {}
          this.droneNodes = null;
        }
      }, 700);
    } catch {}
  }

  // Apple Taptic Engine Click (Double-layer mechanical glass impulse)
  playHapticClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1150, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.022);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.022);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.022);

      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(140, t);
      subOsc.frequency.exponentialRampToValueAtTime(45, t + 0.03);

      subGain.gain.setValueAtTime(0.06, t);
      subGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);

      subOsc.connect(subGain);
      subGain.connect(this.ctx.destination);
      subOsc.start(t);
      subOsc.stop(t + 0.03);
    } catch {}
  }

  // VisionOS Spatial Glide Swoosh (Soft aerodynamic sweep)
  playHapticGlide() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, t);
      osc.frequency.exponentialRampToValueAtTime(540, t + 0.09);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.045, t + 0.035);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.09);
    } catch {}
  }

  // Modal Open / Close Harmonic Chime
  playModalPing(isOpen = true) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const f1 = isOpen ? 520 : 780;
      const f2 = isOpen ? 780 : 520;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f1, t);
      osc.frequency.exponentialRampToValueAtTime(f2, t + 0.08);

      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.08);
    } catch {}
  }
}

const sfx = new AppleHapticAudio();

// 6 Showroom Slides with 3 Authentic Thematic Real Photos Each
const SLIDES = [
  {
    id: 0,
    tag: "KELESHEK KONSEPCIYASÍ • 2030",
    title: "EGER MEN HÁKIM BOLSÁM...",
    subtitle: "Ashıq basqarıw, sanlı transformaciya hám insan qádiri ushın jańa dáwir arxitekturası.",
    shortTitle: "Aqıllı Shahar",
    icon: Compass,
    accentColor: "#0284c7",
    photos: {
      main: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      left: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80"
    },
    photoCaptions: {
      main: "Futuristik Shahar Arxitekturası",
      left: "Sanlı Plaza",
      right: "Smart Kompleks"
    },
    kpis: ["100% Ashıq Byudjet", "24/7 Smart Basqarıw", "0% Byurokratiya"],
    details: [
      "Mámleketlik xızmetlerdi 100% sanlı formatqa ótkeriw hám qáǵazbozlıqtı toqtatıw.",
      "Puqaralar hám biznes ushın birden-bir oraylasqan intellektual basqarıw platforması.",
      "Hár bir qabıllanıp atırǵan hákimlik qararın xalıqqa ashıq esabat retinde kórsetiw."
    ]
  },
  {
    id: 1,
    tag: "01 • TEXNOLOGIYA HÁM JASLAR",
    title: "ZAMANAGÓY IT-ORAY HÁM KOWORKING",
    subtitle: "Hár bir rayonda 24/7 biypul joqarı tezliktegi internet, kompyuter laboratoriyaları hám jas startaplar ushın 0% salıq aymaǵı.",
    shortTitle: "IT-Oray",
    icon: Cpu,
    accentColor: "#0ea5e9",
    photos: {
      main: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      left: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
    },
    photoCaptions: {
      main: "Koworking hám Dastúriy Topar",
      left: "MacBook Lab",
      right: "Bult Serverler"
    },
    kpis: ["5 000+ IT Qánigeler", "$1M Startap Fondı", "0% Salıq Jeńilligi"],
    details: [
      "Barlıq rayon oraylarında zamanagóy koworkingler hám kiber-laboratoriyalar ashıw.",
      "Jas baǵdarlamashılar hám frilanserler ushın tolıq nol stavkalı preferenciyalar.",
      "Global eksport bazarlarına shıǵıwshı Nókis venchur startap fondın shólkemlestiriw."
    ]
  },
  {
    id: 2,
    tag: "02 • EKOLOGIYA HÁM ENERGETIKA",
    title: "JASIL MAKAN HÁM TAZA ENERGIYA",
    subtitle: "Qala hám máhállelerde sayalı eko-parkler, tamshılatıp suwǵarıw sisteması (+60% suw únemlew) hám 100% quyash panelleri.",
    shortTitle: "Jasil Energiya",
    icon: Zap,
    accentColor: "#10b981",
    photos: {
      main: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=1200&q=80",
      left: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
    },
    photoCaptions: {
      main: "Sayalı Jasıl Eko-Park",
      left: "Quyash Panelleri",
      right: "Taza Tábiyat"
    },
    kpis: ["1 Million Terek", "+60% Suw Únemlew", "5 GW Jasıl Energiya"],
    details: [
      "Aralboyı aymaǵında kóp quwatlı quyash hám samal elektr stanciyaların qurıw.",
      "Suw resursların jasalma intellekt arqalı tamshılatıp avtomat suwǵarıw tarmaǵı.",
      "Shólleniwge qarsı jasıl belbewler hám ekologiyalıq oraman zonalardı kóbeytiw."
    ]
  },
  {
    id: 3,
    tag: "03 • SANLÍ HÁKIMIYAT",
    title: "SITUATSION ORAY HÁM ASHÍQ BYUDJET",
    subtitle: "Máhállelerdegi mashqalalardı 24 saatta sheshiwshi AI-sistema hám hár bir tiyınnıń sarplanıwın kórsetiwshi onlayn portal.",
    shortTitle: "Situatsion Oray",
    icon: ShieldCheck,
    accentColor: "#3b82f6",
    photos: {
      main: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      left: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80"
    },
    photoCaptions: {
      main: "Situatsion Boshqarıw Orayı",
      left: "Ashıq Byudjet AI",
      right: "Smart Qala Tarmaǵı"
    },
    kpis: ["24 Saatta Sheshim", "100% Elektron Tender", "-85% Qaǵazbazlıq"],
    details: [
      "IoT kameralar hám intellektual datchikler arqalı qala infrastrukturasın 24/7 qadaǵalaw.",
      "Smart-kontraktlar tiykarında adam aralasıwısız 100% korrupciyasız tenderler.",
      "Xalıq múrájatların avtomat tárizde tiyisli taraw basshılarına biriktiriw hám qadaǵalaw."
    ]
  },
  {
    id: 4,
    tag: "04 • BІLІM HÁM KELESHEK",
    title: "JAŃA ÁWLAD STEAM MEKTEPLERI",
    subtitle: "Barlıq mekteplerde robototexnika, shet tilleri orayları hám eń bilimli muǵallimler ushın 2 ese joqarı ústeme haqı.",
    shortTitle: "STEAM Mektep",
    icon: GraduationCap,
    accentColor: "#6366f1",
    photos: {
      main: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
      left: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
    },
    photoCaptions: {
      main: "STEAM Zamanagóy Mektebi",
      left: "Robototexnika Lab",
      right: "Intellektual Kitapxana"
    },
    kpis: ["100% STEAM Mektep", "2X Muǵallim Aylıǵı", "Xalıqaralıq Grantlar"],
    details: [
      "Hár bir mektepte zamanagóy robototexnika hám kiber-fizikalıq tálim laboratoriyaları.",
      "Muǵallimler ushın xalıqaralıq tálim metodikaları hám 2 ese joqarı aylıq ústemesi.",
      "Qaraqalpaqstan jaslarına dúnyanıń TOP-100 universitetlerine kirisiw grantları."
    ]
  },
  {
    id: 5,
    tag: "05 • ÁMELIY JOL KARTASÍ",
    title: "DÁSLEPKI 100 KÚNLIK ANÍQ NÁTIYJE",
    subtitle: "Wádelerden — ámeliy islerge: tolıq sanlı audit, xalıq penen tikkeley efirde esabat hám 2030-jılǵa shekemgi Bas Strategiya.",
    shortTitle: "100 Kúnlik Nátiyje",
    icon: Calendar,
    accentColor: "#f59e0b",
    photos: {
      main: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80",
      left: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
    },
    photoCaptions: {
      main: "2030 Keleshek Panoraması",
      left: "Investiciya Orayı",
      right: "Jaslar Birligi"
    },
    kpis: ["1-30 Kún: Audit", "31-60 Kún: Infrastruktura", "61-100 Kún: IT-Start"],
    details: [
      "1-30 kún: Aymaqtıń tolıq sanlı hám byudjet auditi, kemshiliklerdi aniqlaw.",
      "31-60 kún: Kommunallıq tarmaqlar hám jol infrastrukturasın jańalaw basqıshı.",
      "61-100 kún: IT-Park filialları, eko-parkler hám birinshi onlayn xalıq esabatı."
    ]
  }
];

// Qaraqalpaqstan 16 Rayon hám Qala Transformaciyası Karta Dataseti
const DISTRICTS_DATA = [
  {
    id: "nukus",
    name: "Nókis Qalası",
    type: "Respublika Orayı",
    coords: "42.4647° N, 59.6004° E",
    kpis: ["IT-Park Rezidentleri: 150+", "+12 000 IT Jumıs", "$40M Eksport"],
    color: "#0284c7",
    relatedSlideId: 1, // IT-Park & Jaslar
    focus: "IT-Park, FinTech xabı hám STEAM Joqarı Oqıw Orayları",
    svgX: 195,
    svgY: 260,
    details: [
      "Xalıqaralıq IT-Park hám jas dastúriy kompaniyalar ushın 0% salıqlı erkin cifrlı zona.",
      "Zamanagóy STEAM texnologiyalar universiteti hám xalıqaralıq kiber-laboratoriyalar.",
      "Qala basqarıwın 100% jasalma intellekt arqalı Situatsion Orayǵa qosıw."
    ]
  },
  {
    id: "moynaq",
    name: "Moynaq Rayonı",
    type: "Aralboyı Aymaǵı",
    coords: "43.7667° N, 59.0333° E",
    kpis: ["2 GW Quyash & Samal", "50 000+ Sayaxatshı", "+3 500 Jumıs Ornı"],
    color: "#10b981",
    relatedSlideId: 2, // Jasıl Energiya & Suw Únemlew
    focus: "Eko-turizm Klasteri hám 2 GW Qayta Tikleniwshi Energiya",
    svgX: 180,
    svgY: 105,
    details: [
      "Aralboyı boylap gigavattlı quyash hám samal elektr stanciyaların qurıw.",
      "Xalıqaralıq 'Kemeler Qábiristanı' tábiyiy muzeyin zamonaviy eko-turizm orayına aylandırıw.",
      "Shólleniwge qarsı saksaul hám jasıl qatlamlardı kóbeytiwshi avtomatlasqan stanciyalar."
    ]
  },
  {
    id: "qonirat",
    name: "Qońırat Rayonı",
    type: "Sanaat & Logistika",
    coords: "43.0417° N, 58.8417° E",
    kpis: ["$350M Ximiya Klasteri", "100% Avto-Logistika", "+6 000 Jumıs"],
    color: "#3b82f6",
    relatedSlideId: 5, // Sanaat, Logistika & Gaz-Ximiya
    focus: "Ximiya, Mashinasazlıq hám Trans-Evraziya Logistika Xabı",
    svgX: 135,
    svgY: 200,
    details: [
      "Qońırat soda zavodı hám gaz-ximiya kompleksin jańa texnologiyalar menen keńeytiw.",
      "Qazaqstan hám Rossiya baǵdarındaǵı xalıqaralıq kóp tarmaqlı multimodal logistika orayı.",
      "Jas qánigeler ushın sanaat injenerligi boyınsha professional kolledjler ashıw."
    ]
  },
  {
    id: "shimbay",
    name: "Shımbay Rayonı",
    type: "Agro-Innovaciya",
    coords: "42.9417° N, 59.7750° E",
    kpis: ["+65% Suw Únemlew", "50+ Agrofirmalar", "15k Gektar Smart Baǵ"],
    color: "#14b8a6",
    relatedSlideId: 4, // Agro-Innovaciya & Intellektual Baǵshılıq
    focus: "Agro-texnopark, Tamshılatıp Suwǵarıw hám Tuqımshılıq Orayı",
    svgX: 250,
    svgY: 215,
    details: [
      "Shımbay dán hám paxta tuqımshılıǵı orayın tolıq laboratoriyalıq sanlastırıw.",
      "Suw resursların qadaǵalawshı IoT datchikler hám lazerli maydan tegislew texnologiyası.",
      "Awıl xojalıǵı ónimlerin muzlatıw hám eksportqa tayarlawshı zamanagóy agro-logistika."
    ]
  },
  {
    id: "xojeli",
    name: "Xójeli Rayonı",
    type: "Sawda & Xızmet",
    coords: "42.4083° N, 59.4500° E",
    kpis: ["Sawda Aylanıwı: +80%", "Kishi Biznes: 1 200+", "+4 500 Jumıs"],
    color: "#f59e0b",
    relatedSlideId: 3, // Ziyarat & Eko-Turizm Klasteri
    focus: "Transport Xabı, Sawda-Ekonomikalıq Erkin Ziyarat Orayı",
    svgX: 165,
    svgY: 285,
    details: [
      "Túrkiyanıń 'Mizdaqxan' tariyxiy kompleksin qamtıǵan xalıqaralıq zıyarat turizmi marshrutı.",
      "Turkmenistan shegarası qasındaǵı zamanagóy kóp funksiyalı sawda-logistika terminalı.",
      "Shańaraqlıq kishi kásipkerlikti qollap-quwatlawshı jeńilletilgen mikrokredit orayı."
    ]
  },
  {
    id: "beruniy",
    name: "Beruniy Rayonı",
    type: "Sanaat & Tariyx",
    coords: "41.6917° N, 60.7500° E",
    kpis: ["$120M Investiciya", "200k+ Turist", "+5 200 Jumıs"],
    color: "#8b5cf6",
    relatedSlideId: 3, // Ziyarat & Tariyxiy Turizm
    focus: "Tariyxiy Turizm, Qurılıs Materialları hám Agrosanaat",
    svgX: 345,
    svgY: 345,
    details: [
      "Áyyemgi Xorezm qorǵanların zamanagóy AR/VR texnologiyaları menen turistlerge kórsetiw.",
      "Tábiyiy bazalt hám kvars qumın qayta islewshi joqarı texnologiyalı zavodlar.",
      "Tamshılatıp suwǵarılǵan intensiv baǵlar hám qawın-ǵawın eksportı klasteri."
    ]
  },
  {
    id: "tortkul",
    name: "Tórtkúl Rayonı",
    type: "Agro-Eksport",
    coords: "41.5667° N, 61.0000° E",
    kpis: ["100 Gektar Issıqxana", "$80M Eksport", "+5 800 Jumıs"],
    color: "#ec4899",
    relatedSlideId: 4, // Intellektual Gidroponika & Agro
    focus: "Intellektual Gidroponika Issıqxanaları hám Qayta Islew",
    svgX: 380,
    svgY: 360,
    details: [
      "Quyash energiyasında isleytuǵın tolıq avtomatlasqan gidroponika issıqxana fermaları.",
      "Miywe hám palız ónimlerin qayta islep qadaqlawshı xalıqaralıq standart zavodlar.",
      "Ámiwdárya boylap eko-agroturizm zonaları hám daryo logistikası."
    ]
  },
  {
    id: "bozataw",
    name: "Bozataw Rayonı",
    type: "Jaslar Zonası",
    coords: "43.0833° N, 59.4167° E",
    kpis: ["10k Gektar Shárwa", "Jaslar Kampusı", "+2 400 Jumıs"],
    color: "#6366f1",
    relatedSlideId: 1, // Jaslar Kampusı
    focus: "Jaslar Jasıl Zonası, Shárwashılıq hám Balıqshılıq Klasteri",
    svgX: 215,
    svgY: 175,
    details: [
      "Qaraqalpaqstan jasları ushın jıllıq IT hám media lagerler mekanı (Jaslar Kampusı).",
      "Kóp tarmaqlı shárwashılıq hám zamanagóy balıqshılıq kól xojalıqları.",
      "Shólleniwge qarsı jasıl energiyalı suw tarmaqların qurıw."
    ]
  },
  {
    id: "kegeyli",
    name: "Kegeyli Rayonı",
    type: "Toqımashılıq",
    coords: "42.7750° N, 59.6083° E",
    kpis: ["4 Jańa Fabrika", "100% Qayta Islew", "+3 100 Jumıs"],
    color: "#06b6d4",
    relatedSlideId: 5, // Kishi Sanaat Zonaları & Fabrikalar
    focus: "Kishi Sanaat Zonaları, Toqımashılıq hám Tikinshilik Klasteri",
    svgX: 220,
    svgY: 225,
    details: [
      "Paxta hám jip-iyiriwdi tolıq tayın kiyim-keshekke aylandırıwshı eko-fabrikalar.",
      "Hayal-qızlar bántligin támiyinlewshi zamanagóy kásip-óner monoorayları.",
      "Máhállelerdegi suw tarmaqların tolıq sanlı monitoringke qosıw."
    ]
  },
  {
    id: "qanlikol",
    name: "Qanlıkól Rayonı",
    type: "Dıyqanshılıq",
    coords: "42.7167° N, 59.1333° E",
    kpis: ["+55% Ónimdarlık", "Smart Kanallar", "+2 800 Jumıs"],
    color: "#84cc16",
    relatedSlideId: 4, // Smart Dıyqanshılıq & Suw
    focus: "Smart Dıyqanshılıq, Lazerli Tegislew hám Suw Únemlew",
    svgX: 160,
    svgY: 245,
    details: [
      "Suw kanalların betonlaw hám avtomat datchikler arqalı suw joǵaltıwın 0 ge túsiriw.",
      "Súyik ónimlerin maydalap qayta islew hám dári-darmaq ósimliklerin egislikke engiziw.",
      "Awıllıq jerlerdegi mektep hám baqshalardı 100% tazalanǵan kran suwı menen támiyinlew."
    ]
  },
  {
    id: "nukus_rayoni",
    name: "Nókis Rayonı (Aqmangıt)",
    type: "Agro-Qala",
    coords: "42.4000° N, 59.5333° E",
    kpis: ["200+ Smart Issıqxana", "Kishi Biznes: +45%", "+3 600 Jumıs"],
    color: "#a855f7",
    relatedSlideId: 4, // Agro-innovaciya
    focus: "Agro-innovaciya, Qala Átirapı Smart Baǵshılıǵı",
    svgX: 200,
    svgY: 290,
    details: [
      "Nókis qalasın tazı awıl xojalıǵı ónimleri menen támiyinleytuǵın 'Jasıl Belbew' baǵları.",
      "Organikalıq turaqlı dıyqanshılıq hám sút-qatıq qayta islew sholpanı.",
      "Zamanagóy kóp qabatlı energiya únemlewshi turaq-jaylar massivi."
    ]
  },
  {
    id: "ellikqala",
    name: "Ellikqala Rayonı",
    type: "Qala-Qorǵanlar",
    coords: "41.8333° N, 60.9167° E",
    kpis: ["50 Tariyxiy Qorǵan", "150k+ Turist", "+4 200 Jumıs"],
    color: "#f97316",
    relatedSlideId: 3, // Arxeologiyalıq Turizm
    focus: "Arxeologiyalıq Turizm, Sharapshılıq hám Baǵshılıq",
    svgX: 360,
    svgY: 310,
    details: [
      "Ayazqala, Topıraq-qala boylap xalıqaralıq arxeologiyalıq turizm infrastrukturası.",
      "Úzimsilik hám qawınshılıq boyınsha geo-brend jaratıw hám eksportqa shıǵarıw.",
      "Sayaxatshılar ushın qol-ónermentler qalashası hám etnografiyalıq mehmanxanalar."
    ]
  },
  {
    id: "qaraozek",
    name: "Qaraózek Rayonı",
    type: "Qazılma Baylıqlar",
    coords: "42.5833° N, 60.0167° E",
    kpis: ["$180M Sanaat Klasteri", "Jańa Kánler", "+3 900 Jumıs"],
    color: "#eab308",
    relatedSlideId: 5, // Sanaat & Metallurgiya
    focus: "Tábiyiy Qazılmalar, Qurılıs Materialları hám Temir-Beton Zavodları",
    svgX: 265,
    svgY: 260,
    details: [
      "Tebinbulaq titan-magnetit kánin qayta islewshi joqarı texnologiyalı metallurgiya.",
      "Zamanagóy keramika hám gips karton ónimlerin islep shıǵarıw zavodları.",
      "Ekologiyalıq taza shárwashılıq zonaları hám jem-azıq klasteri."
    ]
  },
  {
    id: "amiwdarya",
    name: "Ámiwdárya Rayonı (Mańǵıt)",
    type: "Baǵshılıq & Suw",
    coords: "42.1167° N, 60.0667° E",
    kpis: ["30k Gektar Baǵ", "$60M Eksport", "+4 800 Jumıs"],
    color: "#22c55e",
    relatedSlideId: 4, // İntensiv Baǵlar & Suw
    focus: "İntensiv Alma hám Shaptalı Baǵları, Suw Resursları Basqarıwı",
    svgX: 235,
    svgY: 330,
    details: [
      "Ámiwdárya suwın intellektual basqarıw arqalı suw joǵaltıwların keskin azaytıw.",
      "Evropa hám Aziya bazarlarına eksport etiletuǵın intensiv miywe baǵları.",
      "Shashıratqı hám dári-darmaq ósimliklerin óndiriwshi biotexnologiya orayı."
    ]
  },
  {
    id: "shomanay",
    name: "Shomanay Rayonı",
    type: "Shańaraqlıq Biznes",
    coords: "42.6333° N, 58.9167° E",
    kpis: ["100% Sanlı Máhálle", "800+ Kásipker", "+2 200 Jumıs"],
    color: "#64748b",
    relatedSlideId: 1, // Sanlı Máhálle & IT
    focus: "Shańaraqlıq Kásipkerlik, Qol-Ónermentlik hám Sanlı Xızmetler",
    svgX: 135,
    svgY: 260,
    details: [
      "Hár bir máhállede qáǵazbozlıqsız 100% onlayn xızmet kórsetiwshi sanlı oraylar.",
      "Shańaraqlıq qusshılıq hám qoyan baǵıw klasterleri ushın subsidiyalar.",
      "Kásip-óner mektepleri arqalı jaslardı zamonaviy kiber-dastúrlewge oqıtıw."
    ]
  },
  {
    id: "taxtakopir",
    name: "Taxtakópir Rayonı",
    type: "Jasıl Qorǵaw",
    coords: "43.0167° N, 60.2833° E",
    kpis: ["100k Gektar Saksaul", "1.5 GW Quyash", "+3 000 Jumıs"],
    color: "#e11d48",
    relatedSlideId: 2, // Jasıl Energiya & Saksaul
    focus: "Shólleniwge Qarsı Jasıl Qorǵaw, Qarakólshilik hám Quyash Parki",
    svgX: 300,
    svgY: 190,
    details: [
      "Aralqum shóliniń qum kóshiwine qarsı 100 000 gektarlıq qalıń saksaul oramanı.",
      "Kóp quwatlı quyash elektr stanciyaları hám shól shárwashılıǵı klasteri.",
      "Máhállelerge taza ishimlik suwın jetkeriwshi tolıq filtrlew tarmaǵı."
    ]
  }
];

const PODIUM_SPACING = 16;

// High-speed, crash-free Canvas Texture Manager with seamless Unsplash photo loading
function usePhotoTexture(url, caption) {
  return useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 1280, 720);
    grad.addColorStop(0, '#1e293b');
    grad.addColorStop(0.5, '#0f172a');
    grad.addColorStop(1, '#020617');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1280, 720);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 1280; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 720);
      ctx.stroke();
    }

    ctx.font = '600 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.textAlign = 'center';
    ctx.fillText(caption || 'Qaraqalpaqstan 2030', 640, 360);

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;

    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        ctx.drawImage(img, 0, 0, 1280, 720);

        const vignette = ctx.createRadialGradient(640, 360, 260, 640, 360, 680);
        vignette.addColorStop(0, 'rgba(0,0,0,0)');
        vignette.addColorStop(1, 'rgba(0,0,0,0.4)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, 1280, 720);

        texture.needsUpdate = true;
      } catch {}
    };
    img.src = url;

    return texture;
  }, [url, caption]);
}

// 3D Spatial Photo Frame Component
function SpatialPhotoFrame({
  texture,
  width,
  height,
  caption,
  isActive = false,
  badgeText = null
}) {
  return (
    <group>
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[width + 0.16, height + 0.16, 0.08]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.12}
          metalness={0.3}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>

      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[width, height]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={0.96}
          roughness={0.03}
          ior={1.5}
          transparent
          opacity={0.25}
        />
      </mesh>

      <mesh position={[0, -height / 2 - 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width * 0.9, 0.4]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

// Multi-Layer Real Photo Showcase Stand
function MultiPhotoShowroomStand({ slide, index, isActive }) {
  const x = index * PODIUM_SPACING;

  const mainTex = usePhotoTexture(slide.photos.main, slide.photoCaptions.main);
  const leftTex = usePhotoTexture(slide.photos.left, slide.photoCaptions.left);
  const rightTex = usePhotoTexture(slide.photos.right, slide.photoCaptions.right);

  return (
    <group position={[x, 0, 0]}>
      <group position={[0, 3.35, 0]}>
        <SpatialPhotoFrame
          texture={mainTex}
          width={5.2}
          height={2.925}
          caption={slide.photoCaptions.main}
          isActive={isActive}
        />
      </group>

      <Float speed={1.3} rotationIntensity={0.06} floatIntensity={0.2} position={[-3.3, 2.95, 0.65]}>
        <group rotation={[0, 0.25, 0]}>
          <SpatialPhotoFrame
            texture={leftTex}
            width={2.2}
            height={1.45}
            caption={slide.photoCaptions.left}
            badgeText="01 DETAL"
          />
        </group>
      </Float>

      <Float speed={1.4} rotationIntensity={0.06} floatIntensity={0.22} position={[3.3, 2.95, 0.65]}>
        <group rotation={[0, -0.25, 0]}>
          <SpatialPhotoFrame
            texture={rightTex}
            width={2.2}
            height={1.45}
            caption={slide.photoCaptions.right}
            badgeText="02 DETAL"
          />
        </group>
      </Float>

      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 3.6, 64]} />
        <meshBasicMaterial
          color={slide.accentColor}
          transparent
          opacity={isActive ? 0.2 : 0.07}
        />
      </mesh>
    </group>
  );
}

// Pure Minimalist Studio Environment
function StudioAtmosphere({ isDarkMode }) {
  return (
    <group>
      <mesh position={[35, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[160, 50]} />
        <meshStandardMaterial
          color={isDarkMode ? "#080c14" : "#ffffff"}
          roughness={isDarkMode ? 0.12 : 0.18}
          metalness={isDarkMode ? 0.8 : 0.08}
        />
      </mesh>

      {[-4, -1, 2, 5].map((zPos, idx) => (
        <mesh key={idx} position={[35, 0.005, zPos]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[160, 0.015]} />
          <meshBasicMaterial
            color={isDarkMode ? "#1e293b" : "#e2e8f0"}
            transparent
            opacity={isDarkMode ? 0.6 : 0.4}
          />
        </mesh>
      ))}

      <Sparkles
        count={isDarkMode ? 95 : 70}
        scale={[120, 12, 20]}
        position={[35, 3, 0]}
        size={isDarkMode ? 1.8 : 1.6}
        speed={0.2}
        opacity={isDarkMode ? 0.55 : 0.35}
        color={isDarkMode ? "#38bdf8" : "#bae6fd"}
      />
    </group>
  );
}

// Buttery Smooth Gallery Camera Glide
function GalleryCameraRig({ activeIndex, isKeynoteMode }) {
  const currentLookAt = useRef(new THREE.Vector3(0, 3.15, 0));

  useFrame((state, delta) => {
    const isMobile = state.size.width < 768;
    const targetX = activeIndex * PODIUM_SPACING;
    const targetY = isKeynoteMode ? 3.0 : (isMobile ? 3.35 : 3.15);
    const targetZ = isKeynoteMode ? 7.6 : (isMobile ? 9.8 : 8.1);

    const parallaxX = state.pointer.x * (isKeynoteMode ? 0.15 : (isMobile ? 0.08 : 0.35));
    const parallaxY = state.pointer.y * (isKeynoteMode ? 0.08 : (isMobile ? 0.04 : 0.15));

    const speed = isKeynoteMode ? 1.8 : 2.6;

    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      targetX + parallaxX,
      speed,
      delta
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      targetY + parallaxY,
      speed,
      delta
    );
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      targetZ,
      speed,
      delta
    );

    currentLookAt.current.x = THREE.MathUtils.damp(
      currentLookAt.current.x,
      targetX,
      speed + 0.2,
      delta
    );
    currentLookAt.current.y = THREE.MathUtils.damp(
      currentLookAt.current.y,
      isMobile ? 3.35 : 3.15,
      speed + 0.2,
      delta
    );
    currentLookAt.current.z = THREE.MathUtils.damp(
      currentLookAt.current.z,
      0,
      speed + 0.2,
      delta
    );

    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}

// Floating Interactive Cyberpunk Radar / Compass Widget
function TechRadarCompass({ currentSlide, totalSlides, accentColor, onInteract }) {
  const [isHovered, setIsHovered] = useState(false);
  const azimuthAngle = Math.round((currentSlide / totalSlides) * 360);

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
        if (onInteract) onInteract();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className="hidden md:flex items-center gap-3 px-3.5 py-2 rounded-2xl glass-panel pointer-events-auto cursor-pointer transition-all duration-300 hover:shadow-lg border border-white/95"
      style={{
        boxShadow: isHovered
          ? `0 12px 28px -6px ${accentColor}30, 0 0 1px 1px rgba(255,255,255,0.95) inset`
          : undefined
      }}
      title="Interactive Tactical Radar • Azimuth Telemetry"
    >
      <div className="relative w-10 h-10 rounded-full border border-slate-300/80 flex items-center justify-center overflow-hidden bg-slate-900/5">
        <div
          className={`absolute inset-0 rounded-full ${
            isHovered ? 'animate-radar-sweep-fast' : 'animate-radar-sweep'
          }`}
          style={{
            background: `conic-gradient(from 0deg, ${accentColor}45 0deg, transparent 70deg, transparent 360deg)`
          }}
        />

        <div className="absolute w-6 h-6 rounded-full border border-slate-300/60" />
        <div className="absolute w-3 h-3 rounded-full border border-slate-300/40" />

        <div className="absolute w-full h-[1px] bg-slate-400/25" />
        <div className="absolute h-full w-[1px] bg-slate-400/25" />

        <span className="absolute top-0.5 text-[6.5px] font-mono font-bold text-slate-500">N</span>
        <span className="absolute bottom-0.5 text-[6.5px] font-mono font-bold text-slate-400">S</span>
        <span className="absolute right-0.5 text-[6.5px] font-mono font-bold text-slate-400">E</span>
        <span className="absolute left-0.5 text-[6.5px] font-mono font-bold text-slate-400">W</span>

        <div
          className="absolute w-2 h-2 rounded-full border border-white transition-all duration-700 ease-out"
          style={{
            backgroundColor: accentColor,
            transform: `rotate(${azimuthAngle}deg) translate(13px) rotate(-${azimuthAngle}deg)`,
            boxShadow: `0 0 8px ${accentColor}`
          }}
        />
      </div>

      <div className="flex flex-col font-mono text-[9px] text-slate-500 leading-tight">
        <div className="flex items-center gap-1.5 font-bold text-slate-800">
          <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: accentColor }} />
          <span>SYS.RADAR • {isHovered ? 'SPEED' : 'SYNC'}</span>
        </div>
        <div className="text-slate-600 font-semibold">
          AZIMUTH: <span className="text-sky-700">{String(azimuthAngle).padStart(3, '0')}°</span>
        </div>
        <div className="text-[8px] text-slate-400 tracking-tight">
          NUKUS • 42.46°N
        </div>
      </div>
    </div>
  );
}

// Custom Magnetic Luxury Cursor
function CustomMagneticCursor({ accentColor }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = mouseX;
    let ringY = mouseY;
    let animId = null;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      const target = e.target;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('.glass-button') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animId = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    animId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot hidden md:block"
        style={{ backgroundColor: accentColor }}
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring hidden md:block ${isHovered ? 'cursor-active' : ''}`}
        style={{ borderColor: isHovered ? accentColor : `${accentColor}70` }}
      />
    </>
  );
}

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [progress, setProgress] = useState(0);

  // 1. Dark Mode / Day Mode Theme Toggle
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 2. Interactive Civic Budget Simulator State
  const [showBudgetSimulator, setShowBudgetSimulator] = useState(false);
  const [budgetValues, setBudgetValues] = useState({
    it: 28,
    green: 26,
    steam: 24,
    infra: 22
  });

  // 3. Keynote Presentation Mode State
  const [isKeynoteMode, setIsKeynoteMode] = useState(false);

  // 4. Qaraqalpaqstan 16 Rayon Map State
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedDistrictId, setSelectedDistrictId] = useState('nukus');

  // Live real-time digital clock in HH:MM:SS format
  const [currentTime, setCurrentTime] = useState(() => {
    const d = new Date();
    return d.toTimeString().split(' ')[0];
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      setCurrentTime(d.toTimeString().split(' ')[0]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Ambient soundscape drone handling
  useEffect(() => {
    if (soundEnabled) {
      sfx.startAmbientDrone();
    } else {
      sfx.stopAmbientDrone();
    }
  }, [soundEnabled]);

  const SLIDE_DURATION = 9000;

  useEffect(() => {
    if (!isAutoPlaying) return;

    const intervalStep = 50;
    const progressIncrement = (intervalStep / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % SLIDES.length);
          if (soundEnabled) sfx.playHapticGlide();
          return 0;
        }
        return prev + progressIncrement;
      });
    }, intervalStep);

    return () => clearInterval(timer);
  }, [isAutoPlaying, soundEnabled]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsAutoPlaying((prev) => !prev);
        if (soundEnabled) sfx.playHapticClick();
      } else if (e.key.toLowerCase() === 'p') {
        setIsKeynoteMode((prev) => !prev);
        if (soundEnabled) sfx.playModalPing(true);
      } else if (e.key.toLowerCase() === 'b') {
        setShowBudgetSimulator((prev) => !prev);
        if (soundEnabled) sfx.playModalPing(true);
      } else if (e.key.toLowerCase() === 'm') {
        setShowMapModal((prev) => !prev);
        if (soundEnabled) sfx.playModalPing(true);
      } else if (e.key === 'Escape') {
        setShowDetailModal(false);
        setShowBudgetSimulator(false);
        setShowMapModal(false);
        setIsKeynoteMode(false);
        if (soundEnabled) sfx.playModalPing(false);
      }
    };

    let wheelTimeout = null;
    const handleWheel = (e) => {
      if (wheelTimeout) return;
      if (Math.abs(e.deltaY) > 35) {
        if (e.deltaY > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        wheelTimeout = setTimeout(() => {
          wheelTimeout = null;
        }, 750);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [soundEnabled]);

  const goToSlide = (index) => {
    if (index === currentSlide) return;
    setCurrentSlide(index);
    setProgress(0);
    if (soundEnabled) sfx.playHapticClick();
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
    if (soundEnabled) sfx.playHapticGlide();
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
    if (soundEnabled) sfx.playHapticGlide();
  };

  // Touch Swipe Gesture Handling for Mobile Devices (Smooth thumb swipe left/right)
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
      const deltaX = touchStartX.current - e.changedTouches[0].clientX;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      // If horizontal swipe is dominant and significant (> 45px)
      if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
        if (deltaX > 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    }
  };

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sfx.enabled = nextState;
    if (nextState) {
      sfx.playHapticClick();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
      if (soundEnabled) sfx.playHapticClick();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
        if (soundEnabled) sfx.playHapticClick();
      }
    }
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    if (soundEnabled) sfx.playHapticClick();
  };

  const activeSlideData = SLIDES[currentSlide];
  const activeDistrict = DISTRICTS_DATA.find((d) => d.id === selectedDistrictId) || DISTRICTS_DATA[0];

  const totalBudgetTrln = 10.0;
  const itAmount = ((totalBudgetTrln * budgetValues.it) / 100).toFixed(1);
  const greenAmount = ((totalBudgetTrln * budgetValues.green) / 100).toFixed(1);
  const steamAmount = ((totalBudgetTrln * budgetValues.steam) / 100).toFixed(1);
  const infraAmount = ((totalBudgetTrln * budgetValues.infra) / 100).toFixed(1);
  const aiScore = (
    78 +
    budgetValues.it * 0.25 +
    budgetValues.green * 0.22 +
    budgetValues.steam * 0.24
  ).toFixed(1);

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative w-screen h-screen overflow-hidden select-none font-sans ${
        isDarkMode ? 'dark-theme' : ''
      }`}
      style={{
        background: isDarkMode ? '#030712' : '#f8fafc',
        color: isDarkMode ? '#f8fafc' : '#1D1D1F'
      }}
    >
      <CustomMagneticCursor accentColor={activeSlideData.accentColor} />

      <div className="cinematic-vignette" />

      <div className="film-grain" />

      {/* 3D WebGL Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 3.15, 8.1], fov: 44 }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance'
          }}
        >
          <color attach="background" args={[isDarkMode ? '#030712' : '#f8fafc']} />
          <fog attach="fog" args={[isDarkMode ? '#030712' : '#f8fafc', 14, 40]} />

          <GalleryCameraRig activeIndex={currentSlide} isKeynoteMode={isKeynoteMode} />

          <ambientLight intensity={isDarkMode ? 0.9 : 1.5} color="#ffffff" />
          <directionalLight
            position={[0, 20, 10]}
            intensity={isDarkMode ? 1.6 : 2.0}
            color="#ffffff"
          />
          <directionalLight
            position={[-15, 10, 8]}
            intensity={isDarkMode ? 1.4 : 1.0}
            color={isDarkMode ? '#0284c7' : '#e0f2fe'}
          />
          <directionalLight
            position={[15, 10, 8]}
            intensity={isDarkMode ? 0.9 : 1.0}
            color="#ffffff"
          />

          <StudioAtmosphere isDarkMode={isDarkMode} />

          {SLIDES.map((slide, index) => (
            <MultiPhotoShowroomStand
              key={slide.id}
              slide={slide}
              index={index}
              isActive={index === currentSlide}
            />
          ))}
        </Canvas>
      </div>

      {/* KEYNOTE MODE OVERLAY */}
      <AnimatePresence>
        {isKeynoteMode && (
          <div className="absolute inset-0 z-40 pointer-events-none flex flex-col justify-between p-8 sm:p-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-between pointer-events-auto"
            >
              <div className="flex items-center gap-3 px-4 py-2 rounded-full glass-panel">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-wider text-slate-800 dark:text-slate-100">
                  KEYNOTE TAQDÍMOT REJIMI
                </span>
                <span className="text-slate-400">|</span>
                <span className="text-xs font-mono text-slate-500">
                  STAND 0{currentSlide + 1} / 0{SLIDES.length}
                </span>
              </div>

              <button
                onClick={() => {
                  setIsKeynoteMode(false);
                  if (soundEnabled) sfx.playHapticClick();
                }}
                className="px-4 py-2 rounded-full glass-button text-xs font-mono font-semibold text-slate-700 cursor-pointer shadow-md"
              >
                ESC / P — SHÍǴÍW
              </button>
            </motion.div>

            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="glass-panel px-6 sm:px-8 py-4 sm:py-5 rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-3xl border border-white/90">
                <span className="text-[10px] sm:text-[11px] font-bold font-mono text-sky-700 tracking-widest uppercase mb-1 block">
                  {activeSlideData.tag}
                </span>
                <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight mb-1.5 sm:mb-2 text-slate-900 dark:text-white">
                  {activeSlideData.title}
                </h2>
                <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
                  {activeSlideData.subtitle}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* NORMAL HUD */}
      {!isKeynoteMode && (
        <>
          {/* Top Header / Apple VisionOS HUD */}
          <header className="absolute top-0 left-0 right-0 z-30 px-3 sm:px-10 py-2 sm:py-3.5 pt-safe flex items-center justify-between pointer-events-auto">
            {/* Left: Brand & Telemetry HUD */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl glass-pill flex items-center justify-center shrink-0 shadow-xs relative">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-sky-700 dark:text-sky-400 font-mono">
                    QARAQALPAQSTAN 2030
                  </span>
                  <span className="hidden xs:inline px-1.5 py-0.2 text-[8.5px] sm:text-[9px] font-semibold bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded border border-white dark:border-slate-700">
                    SHOWROOM
                  </span>
                </div>

                <div className="flex items-center gap-1 sm:gap-2 text-[9px] sm:text-[10px] font-mono text-slate-500 mt-0.5">
                  <span className="text-slate-800 dark:text-slate-200 font-bold tracking-tight">
                    NUKUS
                  </span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>ACTIVE</span>
                  </span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="px-1 py-0.2 bg-slate-100/90 dark:bg-slate-800 rounded text-slate-700 dark:text-slate-300 font-semibold tabular-nums">
                    {currentTime}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Center Live Track Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hidden xl:flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-pill"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300 tracking-wide font-mono">
                SHOWCASE: LIVE
              </span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300 font-mono">
                STAND: 0{currentSlide + 1} / 0{SLIDES.length}
              </span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="text-xs font-semibold text-sky-700 dark:text-sky-400">
                {activeSlideData.shortTitle}
              </span>
            </motion.div>

            {/* Right Action Bar */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex items-center gap-1.5 sm:gap-2"
            >
              {/* 🗺️ INTERACTIVE DISTRICT MAP BUTTON */}
              <button
                onClick={() => {
                  setShowMapModal(true);
                  if (soundEnabled) sfx.playModalPing(true);
                }}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full glass-button text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 cursor-pointer shadow-xs border border-emerald-500/30"
                title="Qaraqalpaqstan 16 Rayon Transformaciyası Kartası (M)"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                <span className="hidden sm:inline">Rayonlar Kartası</span>
              </button>

              {/* Interactive Budget Simulator Button */}
              <button
                onClick={() => {
                  setShowBudgetSimulator(true);
                  if (soundEnabled) sfx.playModalPing(true);
                }}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-button text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer shadow-xs"
                title="Byudjet & Smart Qala Simulyatorı (B)"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-sky-600" />
                <span>Byudjet AI</span>
              </button>

              {/* Keynote Mode Toggle Button */}
              <button
                onClick={() => {
                  setIsKeynoteMode(true);
                  if (soundEnabled) sfx.playModalPing(true);
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-button text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer shadow-xs"
                title="Keynote Taqdimot Rejimi (P)"
              >
                <Tv className="w-3.5 h-3.5 text-indigo-600" />
                <span>Keynote</span>
              </button>

              {/* Dark / Light Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                aria-label="Tema almastırıw"
                title={isDarkMode ? "Kúndizgi rejim (Day)" : "Túngi rejim (Cyber Dark)"}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full glass-button flex items-center justify-center text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                {isDarkMode ? (
                  <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
                )}
              </button>

              {/* Sound Toggle Button */}
              <button
                onClick={toggleSound}
                aria-label="Dawıs"
                title={soundEnabled ? "Dawıstı óshiriw" : "Dawıstı qosıw"}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full glass-button flex items-center justify-center text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                {soundEnabled ? (
                  <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                )}
              </button>

              {/* Auto-Play Toggle Button */}
              <button
                onClick={() => {
                  setIsAutoPlaying(!isAutoPlaying);
                  if (soundEnabled) sfx.playHapticClick();
                }}
                aria-label="Avto-almastırıw"
                title={isAutoPlaying ? "Toqtatıw" : "Dawam etiw"}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full glass-button flex items-center justify-center text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                {isAutoPlaying ? (
                  <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700 dark:text-slate-200" />
                ) : (
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600 ml-0.5" />
                )}
              </button>

              {/* Fullscreen Toggle Button */}
              <button
                onClick={toggleFullscreen}
                aria-label="Tolıq ekran"
                title="Tolıq ekran"
                className="hidden sm:flex w-9 h-9 rounded-full glass-button items-center justify-center text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-4 h-4 text-slate-700 dark:text-slate-200" />
                ) : (
                  <Maximize2 className="w-4 h-4 text-slate-700 dark:text-slate-200" />
                )}
              </button>
            </motion.div>
          </header>

          {/* Floating 3D Interactive Cyberpunk Radar Widget */}
          <div className="hidden sm:block absolute bottom-3 right-5 sm:bottom-4 sm:right-8 z-30 pointer-events-auto">
            <TechRadarCompass
              currentSlide={currentSlide}
              totalSlides={SLIDES.length}
              accentColor={activeSlideData.accentColor}
              onInteract={() => {
                if (soundEnabled) sfx.playHapticClick();
              }}
            />
          </div>

          {/* Bottom Information Card */}
          <div className="absolute bottom-16 sm:bottom-14 md:bottom-12 left-0 right-0 z-20 pointer-events-none flex justify-center px-3 sm:px-4">
            <div className="w-full max-w-xl pointer-events-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 25, filter: 'blur(8px)', scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                  exit={{ opacity: 0, y: 15, filter: 'blur(8px)', scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    delay: 0.35
                  }}
                  className="glass-panel rounded-2xl p-3 sm:p-4.5 relative overflow-hidden backdrop-blur-2xl bg-white/85 shadow-[0_15px_40px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)] border border-white/95"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9.5px] sm:text-[10px] font-bold tracking-wider uppercase bg-white/95 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-white dark:border-slate-700 shadow-xs">
                      <Sparkle className="w-3 h-3 text-sky-500 fill-sky-500/20" />
                      {activeSlideData.tag}
                    </span>

                    <div className="flex items-center gap-1 font-mono text-xs font-semibold text-slate-400">
                      <span className="text-slate-800 dark:text-slate-100 font-bold">
                        0{currentSlide + 1}
                      </span>
                      <span>/</span>
                      <span>0{SLIDES.length}</span>
                    </div>
                  </div>

                  <h2 className="text-sm sm:text-lg font-extrabold tracking-tight text-[#1D1D1F] dark:text-white leading-snug mb-0.5 truncate sm:whitespace-normal">
                    {activeSlideData.title}
                  </h2>
                  <p className="text-[10.5px] sm:text-xs text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-2 line-clamp-2 sm:line-clamp-none">
                    {activeSlideData.subtitle}
                  </p>

                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-2">
                    {activeSlideData.kpis.map((kpi, i) => (
                      <div
                        key={i}
                        className="p-1 sm:p-1.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-white/90 dark:border-slate-700 backdrop-blur-md text-center"
                      >
                        <div className="text-[9px] sm:text-[11px] font-bold text-slate-800 dark:text-slate-100 tracking-tight truncate">
                          {kpi}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setShowDetailModal(true);
                        if (soundEnabled) sfx.playModalPing(true);
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-sky-600 text-white font-medium text-xs shadow-sm hover:bg-slate-800 dark:hover:bg-sky-500 transition-all cursor-pointer hover:shadow-md active:scale-98"
                    >
                      <span>Tolıq kóz-qaras</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={handleNext}
                      className="px-3 py-1.5 rounded-xl glass-button text-slate-700 dark:text-slate-200 font-medium text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span>Keyingi</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Floating Control Bar */}
          <footer className="absolute bottom-2 sm:bottom-3.5 left-0 right-0 z-30 flex flex-col items-center gap-0.5 sm:gap-1 px-3 sm:px-4 pointer-events-auto pb-safe">
            <div className="glass-panel px-3 sm:px-5 py-1 sm:py-1.5 rounded-full flex items-center gap-2 sm:gap-4 shadow-lg backdrop-blur-2xl bg-white/70 border border-white">
              <button
                onClick={handlePrev}
                aria-label="Aldınǵı slayd"
                title="Aldınǵı stend (←)"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full glass-button flex items-center justify-center text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1 sm:gap-1.5">
                {SLIDES.map((slide, idx) => {
                  const isActive = idx === currentSlide;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => goToSlide(idx)}
                      aria-label={`Stend ${idx + 1}: ${slide.shortTitle}`}
                      title={`${idx + 1}. ${slide.shortTitle}`}
                      className="group relative py-1 cursor-pointer flex items-center"
                    >
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 relative overflow-hidden ${
                          isActive
                            ? 'w-6 sm:w-12 bg-slate-200 dark:bg-slate-700'
                            : 'w-2 sm:w-2.5 bg-slate-300/60 dark:bg-slate-600/60 hover:bg-slate-400'
                        }`}
                      >
                        {isActive && (
                          <div
                            className="absolute inset-0 bg-sky-500 rounded-full transition-all duration-100 ease-linear"
                            style={{ width: `${progress}%` }}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleNext}
                aria-label="Keyingi slayd"
                title="Keyingi stend (→)"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full glass-button flex items-center justify-center text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <div className="h-3.5 sm:h-4 w-[1px] bg-slate-300 dark:bg-slate-700 mx-0.5" />

              {/* 🗺️ Rayonlar Kartası Quick Button in Bottom Dock */}
              <button
                onClick={() => {
                  setShowMapModal(true);
                  if (soundEnabled) sfx.playModalPing(true);
                }}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all cursor-pointer shadow-xs"
                title="Qaraqalpaqstan 16 Rayon Transformaciyası Kartası (M)"
              >
                <MapPin className="w-3 h-3 text-emerald-500" />
                <span className="hidden xs:inline sm:inline">Rayonlar</span>
              </button>
            </div>

            <div className="text-[8.5px] sm:text-[9px] font-medium text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
              <span>SWIPE / CLICK TO EXPLORE</span>
              <span>•</span>
              <span className="font-mono">9s Avto-glide</span>
            </div>
          </footer>
        </>
      )}

      {/* Detailed Modal Drawer */}
      <AnimatePresence>
        {showDetailModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowDetailModal(false);
                if (soundEnabled) sfx.playModalPing(false);
              }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 25 }}
              transition={{ type: "spring", stiffness: 85, damping: 20 }}
              className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 bg-white/95 dark:bg-slate-900/95 shadow-2xl z-10 max-h-[85vh] overflow-y-auto backdrop-blur-3xl border border-white dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-700">
                  {activeSlideData.tag}
                </span>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    if (soundEnabled) sfx.playModalPing(false);
                  }}
                  className="w-8 h-8 rounded-full glass-button flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {activeSlideData.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {activeSlideData.subtitle}
              </p>

              <div className="grid grid-cols-3 gap-2 mb-6">
                <div>
                  <img
                    src={activeSlideData.photos.main}
                    alt={activeSlideData.photoCaptions.main}
                    className="w-full h-20 object-cover rounded-xl border border-white dark:border-slate-700 shadow-xs"
                  />
                  <span className="text-[10px] text-slate-500 block text-center mt-1 truncate">
                    {activeSlideData.photoCaptions.main}
                  </span>
                </div>
                <div>
                  <img
                    src={activeSlideData.photos.left}
                    alt={activeSlideData.photoCaptions.left}
                    className="w-full h-20 object-cover rounded-xl border border-white dark:border-slate-700 shadow-xs"
                  />
                  <span className="text-[10px] text-slate-500 block text-center mt-1 truncate">
                    {activeSlideData.photoCaptions.left}
                  </span>
                </div>
                <div>
                  <img
                    src={activeSlideData.photos.right}
                    alt={activeSlideData.photoCaptions.right}
                    className="w-full h-20 object-cover rounded-xl border border-white dark:border-slate-700 shadow-xs"
                  />
                  <span className="text-[10px] text-slate-500 block text-center mt-1 truncate">
                    {activeSlideData.photoCaptions.right}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">
                  Ámeliy qádemler hám baǵdarlar:
                </h4>
                {activeSlideData.details.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-white/90 dark:border-slate-700 shadow-xs"
                  >
                    <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-normal">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-700 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">
                  Stand 0{currentSlide + 1} / 0{SLIDES.length}
                </span>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    if (soundEnabled) sfx.playModalPing(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-sky-600 text-white text-xs font-semibold hover:bg-slate-800 dark:hover:bg-sky-500 transition-colors cursor-pointer"
                >
                  Túsindim
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive "Byudjet & Smart Qala" Simulator Modal */}
      <AnimatePresence>
        {showBudgetSimulator && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowBudgetSimulator(false);
                if (soundEnabled) sfx.playModalPing(false);
              }}
              className="absolute inset-0 bg-black/30 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 25 }}
              transition={{ type: "spring", stiffness: 85, damping: 20 }}
              className="relative w-full max-w-xl glass-panel rounded-3xl p-6 sm:p-8 bg-white/95 dark:bg-slate-900/95 shadow-2xl z-10 max-h-[90vh] overflow-y-auto backdrop-blur-3xl border border-white dark:border-slate-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping" />
                  <span className="text-xs font-mono font-bold uppercase text-sky-700 dark:text-sky-400">
                    AI BYUDJET SIMULYATORÍ • 2030
                  </span>
                </div>
                <button
                  onClick={() => {
                    setShowBudgetSimulator(false);
                    if (soundEnabled) sfx.playModalPing(false);
                  }}
                  className="w-8 h-8 rounded-full glass-button flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1.5">
                Qaraqalpaqstan Byudjet Bóliniwi
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
                Jıllıq 10.0 Trillion So'mlıq mámleketlik investiciyalardı óz qáleyińizshe bólistiriń hám kútiletuǵın nátiyjelardi real waqtta bahalań:
              </p>

              <div className="space-y-4 mb-6">
                <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-white/80 dark:border-slate-700">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      01. IT & Jaslar Startapları
                    </span>
                    <span className="font-mono font-bold text-sky-600">
                      {budgetValues.it}% ({itAmount} Trln)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={budgetValues.it}
                    onChange={(e) => {
                      setBudgetValues((prev) => ({ ...prev, it: Number(e.target.value) }));
                      if (soundEnabled) sfx.playHapticClick();
                    }}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-600"
                  />
                  <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
                    <span>Kútiletuǵın kórsetkish:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      +{Math.round(budgetValues.it * 180)} IT Qánigeler
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-white/80 dark:border-slate-700">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      02. Jasıl Energiya & Suw Únemlew
                    </span>
                    <span className="font-mono font-bold text-emerald-600">
                      {budgetValues.green}% ({greenAmount} Trln)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={budgetValues.green}
                    onChange={(e) => {
                      setBudgetValues((prev) => ({ ...prev, green: Number(e.target.value) }));
                      if (soundEnabled) sfx.playHapticClick();
                    }}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
                    <span>Kútiletuǵın kórsetkish:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      +{(budgetValues.green * 0.18).toFixed(1)} GW Taza Quwat
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-white/80 dark:border-slate-700">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      03. STEAM Mektepleri & Muǵallimler
                    </span>
                    <span className="font-mono font-bold text-indigo-600">
                      {budgetValues.steam}% ({steamAmount} Trln)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={budgetValues.steam}
                    onChange={(e) => {
                      setBudgetValues((prev) => ({ ...prev, steam: Number(e.target.value) }));
                      if (soundEnabled) sfx.playHapticClick();
                    }}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
                    <span>Kútiletuǵın kórsetkish:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      +{Math.round(budgetValues.steam * 3.8)} Jańa Laboratoriyalar
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 border border-white/80 dark:border-slate-700">
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      04. Smart Basqarıw & Infrastruktura
                    </span>
                    <span className="font-mono font-bold text-amber-600">
                      {budgetValues.infra}% ({infraAmount} Trln)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={budgetValues.infra}
                    onChange={(e) => {
                      setBudgetValues((prev) => ({ ...prev, infra: Number(e.target.value) }));
                      if (soundEnabled) sfx.playHapticClick();
                    }}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                  <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
                    <span>Kútiletuǵın kórsetkish:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      -{Math.round(budgetValues.infra * 2.5)}% Byurokratiya
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-500/10 via-indigo-500/10 to-emerald-500/10 border border-sky-300/40 dark:border-sky-700 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block uppercase">
                    AI Strategiyalıq Nátiyjelilik:
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                      {aiScore} / 100
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950">
                      OPTIMAL DÁREJE
                    </span>
                  </div>
                </div>
                <Award className="w-8 h-8 text-sky-600 dark:text-sky-400" />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    setBudgetValues({ it: 28, green: 26, steam: 24, infra: 22 });
                    if (soundEnabled) sfx.playHapticClick();
                  }}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Dáslepki jaǵday</span>
                </button>

                <button
                  onClick={() => {
                    setShowBudgetSimulator(false);
                    if (soundEnabled) sfx.playHapticClick();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-sky-600 text-white text-xs font-semibold hover:bg-slate-800 dark:hover:bg-sky-500 transition-colors cursor-pointer shadow-md"
                >
                  Saqlaw hám Qabıl etiw
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🗺️ 16 RAYON HÁM QALA INTERAKTIV KARTASÍ MODALÍ */}
      <AnimatePresence>
        {showMapModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowMapModal(false);
                if (soundEnabled) sfx.playModalPing(false);
              }}
              className="absolute inset-0 bg-black/35 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 25 }}
              transition={{ type: "spring", stiffness: 85, damping: 20 }}
              className="relative w-full max-w-5xl glass-panel rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 bg-white/95 dark:bg-slate-900/95 shadow-2xl z-10 max-h-[92vh] overflow-y-auto backdrop-blur-3xl border border-white dark:border-slate-700"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-3 pb-2.5 sm:pb-3 border-b border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-600">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400">
                        QARAQALPAQSTAN 2030 • INTERAKTIV KARTA
                      </span>
                      <span className="px-1.5 py-0.2 text-[8.5px] sm:text-[9px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 rounded-md">
                        16 RAYON
                      </span>
                    </div>
                    <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                      Rayonlar Transformaciyası hám Arnawlı Strategiyalar
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowMapModal(false);
                    if (soundEnabled) sfx.playModalPing(false);
                  }}
                  className="w-8 h-8 rounded-full glass-button flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer shrink-0"
                >
                  ✕
                </button>
              </div>

              {/* Two Column Interactive Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-5">
                {/* Left Column: Interactive Vector Map & Quick Selector */}
                <div className="lg:col-span-7 flex flex-col gap-2.5 sm:gap-3">
                  {/* District Pills Quick Selector */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none touch-pan-x select-none">
                    {DISTRICTS_DATA.map((district) => {
                      const isSelected = district.id === selectedDistrictId;
                      return (
                        <button
                          key={district.id}
                          onClick={() => {
                            setSelectedDistrictId(district.id);
                            if (soundEnabled) sfx.playHapticClick();
                          }}
                          className={`shrink-0 px-2 sm:px-2.5 py-1 rounded-lg text-[9.5px] sm:text-[10px] font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-slate-900 text-white dark:bg-sky-500 shadow-xs scale-102'
                              : 'bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200/60 dark:border-slate-700'
                          }`}
                        >
                          {district.name.split(' ')[0]}
                        </button>
                      );
                    })}
                  </div>

                  {/* High-Tech Vector Map Display Canvas */}
                  <div className="relative w-full h-[220px] sm:h-[360px] rounded-2xl bg-gradient-to-br from-slate-100/80 via-white/50 to-slate-200/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border border-white dark:border-slate-800 overflow-hidden flex items-center justify-center shadow-inner">
                    {/* Background Radar Grid Coordinates */}
                    <div className="absolute inset-0 opacity-15 dark:opacity-20 pointer-events-none">
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#mapGrid)" />
                      </svg>
                    </div>

                    {/* Interactive SVG Qaraqalpaqstan Map Boundary & Pins */}
                    <svg
                      viewBox="0 0 450 420"
                      className="w-full h-full max-h-[350px] p-2 select-none"
                    >
                      {/* Stylized Territorial Outline of Karakalpakstan */}
                      <path
                        d="M 120 70 L 220 50 L 320 80 L 390 150 L 410 270 L 360 380 L 280 400 L 190 350 L 120 310 L 80 230 L 70 140 Z"
                        fill={isDarkMode ? "rgba(30, 41, 59, 0.45)" : "rgba(226, 232, 240, 0.5)"}
                        stroke={isDarkMode ? "#334155" : "#cbd5e1"}
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />

                      {/* Aral Sea Basin Contour (North) */}
                      <ellipse
                        cx="210"
                        cy="95"
                        rx="60"
                        ry="35"
                        fill={isDarkMode ? "rgba(2, 132, 199, 0.15)" : "rgba(186, 230, 253, 0.4)"}
                        stroke="#0ea5e9"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                      <text
                        x="210"
                        y="95"
                        textAnchor="middle"
                        fill="#0284c7"
                        fontSize="8"
                        fontFamily="monospace"
                        fontWeight="bold"
                        opacity="0.8"
                      >
                        ARAL TEŃIZI (AYMAQ)
                      </text>

                      {/* Geographic Region Watermarks */}
                      <text
                        x="105"
                        y="150"
                        textAnchor="middle"
                        fill={isDarkMode ? "#475569" : "#94a3b8"}
                        fontSize="7"
                        fontFamily="monospace"
                        fontWeight="bold"
                        letterSpacing="1"
                        opacity="0.6"
                      >
                        ÚSTIRT PLATOSÍ
                      </text>

                      <text
                        x="345"
                        y="220"
                        textAnchor="middle"
                        fill={isDarkMode ? "#475569" : "#94a3b8"}
                        fontSize="7"
                        fontFamily="monospace"
                        fontWeight="bold"
                        letterSpacing="1"
                        opacity="0.6"
                      >
                        QÍZÍLQUM SHÓLI
                      </text>

                      {/* Amu Darya River Stylized Flow Path */}
                      <path
                        d="M 390 380 Q 280 320 220 280 T 170 210"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        opacity="0.6"
                      />
                      <text
                        x="300"
                        y="340"
                        fill="#0284c7"
                        fontSize="6.5"
                        fontFamily="monospace"
                        fontWeight="bold"
                        opacity="0.75"
                      >
                        ÁMIWDÁRYA
                      </text>

                      {/* Inter-District Cyber Synergy Network Grid Lines */}
                      <g stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3 4" opacity="0.35">
                        <line x1="195" y1="260" x2="180" y2="105" /> {/* Nukus -> Moynaq */}
                        <line x1="195" y1="260" x2="135" y2="200" /> {/* Nukus -> Qonirat */}
                        <line x1="195" y1="260" x2="165" y2="285" /> {/* Nukus -> Xojeli */}
                        <line x1="195" y1="260" x2="250" y2="215" /> {/* Nukus -> Shimbay */}
                        <line x1="195" y1="260" x2="220" y2="225" /> {/* Nukus -> Kegeyli */}
                        <line x1="195" y1="260" x2="235" y2="330" /> {/* Nukus -> Amiwdarya */}
                        <line x1="345" y1="345" x2="380" y2="360" /> {/* Beruniy -> Tortkul */}
                        <line x1="345" y1="345" x2="360" y2="310" /> {/* Beruniy -> Ellikqala */}
                        <line x1="250" y1="215" x2="215" y2="175" /> {/* Shimbay -> Bozataw */}
                        <line x1="250" y1="215" x2="265" y2="260" /> {/* Shimbay -> Qaraozek */}
                        <line x1="265" y1="260" x2="300" y2="190" /> {/* Qaraozek -> Taxtakopir */}
                      </g>

                      {/* 16 Interactive District Pins */}
                      {DISTRICTS_DATA.map((dist) => {
                        const isSelected = dist.id === selectedDistrictId;
                        return (
                          <g
                            key={dist.id}
                            onClick={() => {
                              setSelectedDistrictId(dist.id);
                              if (soundEnabled) sfx.playHapticClick();
                            }}
                            className="cursor-pointer transition-transform duration-300"
                            style={{
                              transformOrigin: `${dist.svgX}px ${dist.svgY}px`
                            }}
                          >
                            {/* Pulse Halo for Selected District */}
                            {isSelected && (
                              <circle
                                cx={dist.svgX}
                                cy={dist.svgY}
                                r="18"
                                fill={dist.color}
                                opacity="0.28"
                                className="animate-ping"
                              />
                            )}

                            {/* Outer Node Ring */}
                            <circle
                              cx={dist.svgX}
                              cy={dist.svgY}
                              r={isSelected ? "9" : "6"}
                              fill={isSelected ? dist.color : (isDarkMode ? "#1e293b" : "#ffffff")}
                              stroke={dist.color}
                              strokeWidth={isSelected ? "2.5" : "1.5"}
                              className="transition-all duration-300 shadow-md"
                            />

                            {/* Inner Center Dot */}
                            <circle
                              cx={dist.svgX}
                              cy={dist.svgY}
                              r={isSelected ? "3.5" : "2.5"}
                              fill={isSelected ? "#ffffff" : dist.color}
                            />

                            {/* District Label Text with High Contrast Halo */}
                            <text
                              x={dist.svgX}
                              y={dist.svgY + (dist.svgY > 300 ? -11 : 14)}
                              textAnchor="middle"
                              fill={isSelected ? (isDarkMode ? "#38bdf8" : "#0284c7") : (isDarkMode ? "#cbd5e1" : "#334155")}
                              fontSize={isSelected ? "9.5" : "7.5"}
                              fontWeight={isSelected ? "bold" : "600"}
                              fontFamily="sans-serif"
                              className="pointer-events-none select-none transition-all duration-300"
                              style={{
                                textShadow: isDarkMode
                                  ? '0 1px 3px rgba(0,0,0,0.8)'
                                  : '0 1px 2px rgba(255,255,255,0.9)'
                              }}
                            >
                              {dist.name.replace(" Rayonı", "").replace(" Qalası", "")}
                            </text>
                          </g>
                        );
                      })}
                    </svg>

                    {/* Map Legend Overlay */}
                    <div className="absolute bottom-2 left-3 flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/85 dark:bg-slate-900/85 backdrop-blur-xs text-[9px] font-mono text-slate-500 border border-slate-200/50 dark:border-slate-800">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>16 RAYON & QALA NODELARI</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Detailed Strategic Plan Card for Selected District */}
                <div className="lg:col-span-5 flex flex-col justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-white/90 dark:border-slate-700/80 shadow-xs">
                  <div>
                    {/* Header: Title, Type & Coordinates */}
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[9.5px] sm:text-[10px] font-bold tracking-wider uppercase text-white shadow-xs"
                        style={{ backgroundColor: activeDistrict.color }}
                      >
                        {activeDistrict.type}
                      </span>
                      <span className="font-mono text-[8.5px] sm:text-[9px] text-slate-400">
                        {activeDistrict.coords}
                      </span>
                    </div>

                    <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1">
                      {activeDistrict.name}
                    </h4>

                    {/* Focus Banner */}
                    <div className="p-2 sm:p-2.5 rounded-xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 mb-2.5 sm:mb-3.5">
                      <span className="text-[9.5px] sm:text-[10px] font-mono font-bold text-sky-700 dark:text-sky-400 block uppercase mb-0.5">
                        Bas Rawajlanıw Baǵdarı:
                      </span>
                      <p className="text-[11px] sm:text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                        {activeDistrict.focus}
                      </p>
                    </div>

                    {/* 3 KPI Badges Row */}
                    <div className="grid grid-cols-3 gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                      {activeDistrict.kpis.map((kpi, idx) => (
                        <div
                          key={idx}
                          className="p-1 sm:p-1.5 rounded-xl bg-white/90 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 text-center"
                        >
                          <span className="text-[8.5px] sm:text-[9.5px] font-bold text-slate-800 dark:text-slate-200 block truncate">
                            {kpi}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Concrete 3 Action Checkpoints */}
                    <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                      <span className="text-[9.5px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Ámeliy Isler hám Loyihalar:
                      </span>
                      {activeDistrict.details.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/80 dark:bg-slate-800/80 border border-white dark:border-slate-700 shadow-xs"
                        >
                          <CheckCircle2
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 mt-0.5"
                            style={{ color: activeDistrict.color }}
                          />
                          <p className="text-[10px] sm:text-[11px] text-slate-700 dark:text-slate-300 leading-tight">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Selector Actions */}
                  <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setShowMapModal(false);
                        goToSlide(activeDistrict.relatedSlideId);
                        if (soundEnabled) sfx.playModalPing(false);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-sky-600 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-800 dark:hover:bg-sky-500 transition-all cursor-pointer shadow-xs"
                      title="Ushbu rayonnıń bas baǵdarına baylanıslı 3D stendti ashıw"
                    >
                      <Sparkle className="w-3.5 h-3.5 text-sky-400" />
                      <span>3D Stendti Kóriw</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-400">
                        {DISTRICTS_DATA.findIndex((d) => d.id === selectedDistrictId) + 1} / {DISTRICTS_DATA.length}
                      </span>

                      <button
                        onClick={() => {
                          const curIdx = DISTRICTS_DATA.findIndex((d) => d.id === selectedDistrictId);
                          const nextIdx = (curIdx + 1) % DISTRICTS_DATA.length;
                          setSelectedDistrictId(DISTRICTS_DATA[nextIdx].id);
                          if (soundEnabled) sfx.playHapticClick();
                        }}
                        className="px-3 py-1.5 rounded-xl glass-button text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Keyingi</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
