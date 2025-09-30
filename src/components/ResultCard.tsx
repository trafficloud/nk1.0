import React from "react";
import {
  Calculator, Boxes, Truck, Zap, Info,
  BrickWall, Ruler, AlertTriangle, Phone
} from "lucide-react";

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

type Props = {
  className?: string;
  currency?: string;
  rangeMin: number;
  rangeMax: number;
  breakdown: Breakdown;
  factors: Factor[];
  phone?: string; // tel:+37529...
  orangeNote?: string;
};

export default function ResultCard({
  className = "",
  currency = "BYN",
  rangeMin,
  rangeMax,
  breakdown,
  factors,
  phone = "tel:+375290000000",
  orangeNote = "Для формирования итоговой цены закажите бесплатный выезд специалиста для просчета.",
}: Props) {
  return (
    <section className={`rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-7 shadow-sm animate-slide-up ${className}`}>
      {/* Бейдж */}
      <div className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white shadow-sm">
        Итоговый расчёт
      </div>

      {/* Вилка цены — как на твоём макете: крупно, плотное межбуквье */}
      <div className="mt-4 flex items-end gap-2">
        <h3 className="text-3xl md:text-4xl leading-[0.95] font-extrabold text-primary tracking-[-0.02em]">
          {fmt(rangeMin)} — {fmt(rangeMax)}
          <span className="ml-2 text-accent">{currency}</span>
        </h3>
      </div>

      <p className="mt-3 text-[15px] text-gray-600">
        Диапазон зависит от выбранных материалов и опций
      </p>

      {/* Разбивка 2×2 */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatRow icon={<Calculator className="h-4 w-4" />} label="Работы" value={breakdown.works} currency={currency} />
        <StatRow icon={<Boxes className="h-4 w-4" />} label="Материалы" value={breakdown.materials} currency={currency} />
        <StatRow icon={<Truck className="h-4 w-4" />} label="Логистика" value={breakdown.logistics} currency={currency} />
        <StatRow icon={<Zap className="h-4 w-4" />} label="Срочность" value={breakdown.rush} currency={currency} />
      </div>

      {/* Факторы с иконками в «код-стиле» */}
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

      {/* Оранжевая ремарка */}
      <div className="mt-7 rounded-xl bg-accent/10 px-4 py-3 text-[15px] font-semibold text-accent">
        {orangeNote}
      </div>

      {/* Буллеты */}
      <ul className="mt-5 space-y-2 text-[15px] text-primary">
        <Bullet>Цена фиксируется в договоре</Bullet>
        <Bullet>Поэтапная оплата</Bullet>
        <Bullet>Бесплатный выезд специалиста : Брест +30 км</Bullet>
      </ul>

      {/* Финальная кнопка — звонок менеджеру */}
      <div className="mt-7 lg:mt-auto">
        <a
          href={phone}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm sm:text-base font-medium text-white shadow-md transition hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-accent/60"
        >
          <Phone className="h-5 w-5" />
          Заказать выезд
        </a>
      </div>
    </section>
  );
}

/* ——— Подкомпоненты ——— */

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

// 667.5 → "667,5"
function fmt(n: number) {
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 }).format(n);
}