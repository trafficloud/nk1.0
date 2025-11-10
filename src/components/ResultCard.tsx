import React, { useState } from "react";
import {
  Calculator, Boxes, Truck, Zap, Info,
  BrickWall, Ruler, AlertTriangle, Phone,
  FileDown, Image as ImageIcon, ChevronDown
} from "lucide-react";
import { generatePDF } from '../utils/pdfGenerator';
import { generateImage } from '../utils/imageGenerator';
import { uploadFileToStorage, generateUniqueFileName } from '../utils/storageHelpers';
import { updateCalculationUrls } from '../utils/calculatorStorage';
import type { CalculationResult } from '../types/database';
import Toast from './Toast';

type Breakdown = {
  works: number;
  materials: number;
  logistics: number;
  rush: number;
};

type Factor = {
  key: string;
  label: string;
};

type FormValues = {
  objectType: string;
  area: string;
  points: string;
  lights: string;
  region: string;
  materials: string;
  urgency: string;
  wallMaterial: string;
  heightGt3: string;
  warmFloor: boolean;
  weakCurrent: boolean;
  grounding: boolean;
  meterMove: boolean;
};

type Props = {
  currency?: string;
  rangeMin: number;
  rangeMax: number;
  breakdown: Breakdown;
  factors: Factor[];
  phone?: string;
  orangeNote?: string;
  sessionId: string;
  submissionId: string | null;
  formValues: FormValues;
};

export default function ResultCard({
  currency = "BYN",
  rangeMin,
  rangeMax,
  breakdown,
  factors,
  phone = "tel:+375290000000",
  orangeNote = "Для формирования итоговой цены закажите бесплатный выезд специалиста для просчета.",
  sessionId,
  submissionId,
  formValues
}: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingType, setGeneratingType] = useState<'pdf' | 'image' | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const calculationResult: CalculationResult = {
    min: rangeMin,
    max: rangeMax,
    breakdown: {
      labor: { min: breakdown.works * 0.6, max: breakdown.works * 0.7 },
      materials: { min: breakdown.materials * 0.9, max: breakdown.materials },
      logistics: { min: breakdown.logistics, max: breakdown.logistics },
      services: {
        points: { min: 0, max: 0 },
        lights: { min: 0, max: 0 },
        panel: { min: 0, max: 0 },
        chase: { min: 0, max: 0 },
        options: { min: 0, max: 0 }
      }
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setIsGenerating(true);
      setGeneratingType('pdf');
      setShowDropdown(false);
      setToast({ message: 'Генерация PDF...', type: 'info' });

      const pdfBlob = await generatePDF(formValues, calculationResult);

      setToast({ message: 'Загрузка в облако...', type: 'info' });

      const fileName = generateUniqueFileName(sessionId, 'pdf');
      const pdfUrl = await uploadFileToStorage(pdfBlob, fileName, 'calculator-exports');

      if (submissionId) {
        await updateCalculationUrls(submissionId, pdfUrl, undefined);
      }

      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Расчет_электромонтаж_${new Date().toLocaleDateString('ru-RU')}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setToast({ message: 'PDF успешно сохранен!', type: 'success' });
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setToast({ message: 'Не удалось создать PDF. Попробуйте еще раз.', type: 'error' });
    } finally {
      setIsGenerating(false);
      setGeneratingType(null);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const handleDownloadImage = async () => {
    try {
      setIsGenerating(true);
      setGeneratingType('image');
      setShowDropdown(false);
      setToast({ message: 'Генерация изображения...', type: 'info' });

      const imageBlob = await generateImage(formValues, calculationResult);

      setToast({ message: 'Загрузка в облако...', type: 'info' });

      const fileName = generateUniqueFileName(sessionId, 'png');
      const imageUrl = await uploadFileToStorage(imageBlob, fileName, 'calculator-exports');

      if (submissionId) {
        await updateCalculationUrls(submissionId, undefined, imageUrl);
      }

      const url = URL.createObjectURL(imageBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Расчет_электромонтаж_${new Date().toLocaleDateString('ru-RU')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setToast({ message: 'Изображение успешно сохранено!', type: 'success' });
    } catch (error) {
      console.error('Error downloading image:', error);
      setToast({ message: 'Не удалось создать изображение. Попробуйте еще раз.', type: 'error' });
    } finally {
      setIsGenerating(false);
      setGeneratingType(null);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <section className="bg-white rounded-2xl ring-1 ring-[#1A3A63]/20 shadow-[0_6px_24px_-8px_rgba(10,20,40,0.25)] nk-hover p-6 md:p-7" data-reveal>
        <div className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white shadow-sm">
          Итоговый расчёт
        </div>

        <div className="mt-4 flex items-end gap-2">
          <h3 className="text-3xl md:text-4xl leading-[0.95] font-extrabold text-primary tracking-[-0.02em]">
            {fmt(rangeMin)} — {fmt(rangeMax)}
            <span className="ml-2 text-accent">{currency}</span>
          </h3>
        </div>

        <p className="mt-3 text-[15px] text-gray-600">
          Диапазон зависит от выбранных материалов и опций
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StatRow icon={<Calculator className="h-4 w-4" />} label="Работы" value={breakdown.works} currency={currency} />
          <StatRow icon={<Boxes className="h-4 w-4" />} label="Материалы" value={breakdown.materials} currency={currency} />
          <StatRow icon={<Truck className="h-4 w-4" />} label="Логистика" value={breakdown.logistics} currency={currency} />
          <StatRow icon={<Zap className="h-4 w-4" />} label="Срочность" value={breakdown.rush} currency={currency} />
        </div>

        {factors.length > 0 && (
          <div className="mt-7">
            <div className="mb-3 flex items-center gap-2">
              <Info className="h-4 w-4 text-gray-600" />
              <h4 className="text-[15px] font-semibold text-primary">Факторы ценообразования</h4>
            </div>

            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {factors.map((f, i) => (
                <li
                  key={i}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-[13px] text-gray-700 shadow-sm"
                >
                  <span className="text-gray-500">
                    {getFactorIcon(f.key)}
                  </span>
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-7 rounded-xl bg-accent/10 px-4 py-3 text-[15px] font-semibold text-accent">
          {orangeNote}
        </div>

        <ul className="mt-5 space-y-2 text-[15px] text-primary">
          <Bullet>Цена фиксируется в договоре</Bullet>
          <Bullet>Поэтапная оплата</Bullet>
          <Bullet>Бесплатный выезд специалиста : Брест +30 км</Bullet>
        </ul>

        {/* Export Dropdown */}
        <div className="mt-7 relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 rounded-full bg-[#1A3A63] text-white px-6 sm:px-8 py-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>
                  {generatingType === 'pdf' ? 'Создание PDF...' : 'Создание изображения...'}
                </span>
              </>
            ) : (
              <>
                <FileDown className="h-5 w-5" strokeWidth={1.75} />
                <span>Экспорт результата</span>
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>

          {showDropdown && !isGenerating && (
            <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-10">
              <button
                onClick={handleDownloadPDF}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
              >
                <FileDown className="h-5 w-5 text-[#1A3A63]" />
                <div>
                  <div className="font-semibold text-[#1A3A63]">Скачать PDF</div>
                  <div className="text-xs text-gray-500">Готовый расчет для печати</div>
                </div>
              </button>
              <button
                onClick={handleDownloadImage}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-t border-gray-200"
              >
                <ImageIcon className="h-5 w-5 text-[#1A3A63]" />
                <div>
                  <div className="font-semibold text-[#1A3A63]">Сохранить как изображение</div>
                  <div className="text-xs text-gray-500">PNG формат для соцсетей</div>
                </div>
              </button>
            </div>
          )}
        </div>

        <div className="mt-4">
          <a
            href={phone}
            className="inline-flex items-center gap-2 rounded-full bg-[#FF7F50] text-white px-6 sm:px-8 py-3 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 w-full justify-center"
          >
            <Phone className="h-5 w-5" strokeWidth={1.75} />
            Заказать выезд
          </a>
        </div>
      </section>
    </>
  );
}

function StatRow({
  icon,
  label,
  value,
  currency,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  currency: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-gray-500">{icon}</span>
        <span className="text-[14px] text-gray-600">{label}</span>
      </div>
      <div className="text-sm font-semibold text-primary">
        {fmt(value)} {currency}
      </div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-[7px] inline-block h-2 w-2 rounded-full bg-accent" />
      <span>{children}</span>
    </li>
  );
}

function getFactorIcon(key: string) {
  if (key.includes("wall") || key.includes("стен")) {
    return <BrickWall className="h-4 w-4" />;
  }
  if (key.includes("height") || key.includes("высота") || key.includes("потолк")) {
    return <Ruler className="h-4 w-4" />;
  }
  if (key.includes("region") || key.includes("регион") || key.includes("выезд") || key.includes("город")) {
    return <Truck className="h-4 w-4" />;
  }
  if (key.includes("rush") || key.includes("срочн") || key.includes("ускор")) {
    return <Zap className="h-4 w-4" />;
  }
  if (key.includes("hidden") || key.includes("непредвид") || key.includes("риск")) {
    return <AlertTriangle className="h-4 w-4" />;
  }
  return <Info className="h-4 w-4" />;
}

function fmt(n: number) {
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 }).format(n);
}
