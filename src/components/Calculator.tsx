import React, { useState } from 'react';
import { Calculator as CalcIcon, Download } from 'lucide-react';

interface CalculationResult {
  min: number;
  max: number;
  work: number;
  materials: number;
  logistics: number;
  urgency: number;
}

const Calculator: React.FC = () => {
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Base rates
  const R = 15; // point
  const L = 20; // light
  const Q = 150; // panel
  const S = 5; // chase meter
  const Z = 80; // RCD
  const OPT = { warm: 120, low: 60, ground: 90, meter: 70 };

  const getMaterialCoef = (value: string): number => {
    if (value.includes('Премиум')) return 0.9;
    if (value.includes('Материалы клиента')) return 0;
    return 0.6; // базовые
  };

  const getLogistics = (region: string): number => {
    if (region.includes('+30')) return 30;
    if (region.includes('Другая')) return 60;
    return 0; // Минск/Брест
  };

  const getUrgency = (val: string): number => {
    return val.includes('Ускоренно') ? 0.15 : 0;
  };

  const parseNum = (id: string): number => {
    const element = document.getElementById(id) as HTMLInputElement;
    const v = parseFloat(element?.value || '0');
    return isNaN(v) ? 0 : v;
  };

  const getSelectValue = (id: string): string => {
    const element = document.getElementById(id) as HTMLSelectElement;
    return element?.value || '';
  };

  const getCheckboxValue = (id: string): boolean => {
    const element = document.getElementById(id) as HTMLInputElement;
    return element?.checked || false;
  };

  const calculate = (): void => {
    const pts = parseNum('fPoints');
    const lgt = parseNum('fLights');
    const chase = parseNum('fChase');

    const panel = getSelectValue('fPanel');
    const panelCost = panel.includes('Новый') || panel.includes('Замена') ? Q : 0;

    const rcd = getSelectValue('fRcd');
    const rcdCost = rcd.includes('Да') ? Z : 0;

    let addons = 0;
    if (getCheckboxValue('optWarm')) addons += OPT.warm;
    if (getCheckboxValue('optLow')) addons += OPT.low;
    if (getCheckboxValue('optGround')) addons += OPT.ground;
    if (getCheckboxValue('optMeter')) addons += OPT.meter;

    const workBase = (pts * R) + (lgt * L) + (chase * S) + panelCost + rcdCost + addons;

    const matCoef = getMaterialCoef(getSelectValue('fMaterials'));
    const materials = workBase * matCoef;

    const logi = getLogistics(getSelectValue('fRegion'));
    const urgPerc = getUrgency(getSelectValue('fUrgency'));
    const urgVal = (workBase + materials + logi) * urgPerc;

    const sum = workBase + materials + logi + urgVal;

    const min = Math.round(sum * 0.95);
    const max = Math.round(sum * 1.10);

    setResult({
      min,
      max,
      work: Math.round(workBase),
      materials: Math.round(materials),
      logistics: Math.round(logi),
      urgency: Math.round(urgVal)
    });
  };

  const downloadPDF = (): void => {
    window.print();
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString('ru-RU');
  };

  return (
    <section id="calc" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-12 pb-16 md:pb-20">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
            Рассчитайте стоимость <span className="text-accent">за 2 минуты</span>
          </h2>
          <p className="mt-2 text-gray-600">
            Предварительный расчёт. Точную цену закрепим в договоре после бесплатного замера.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-7 shadow-sm animate-slide-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Object Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Тип объекта</label>
                <select 
                  id="fType" 
                  className="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-icon p-3 text-sm transition-colors"
                >
                  <option>Студия</option>
                  <option>1-к</option>
                  <option>2-к</option>
                  <option>3-к</option>
                  <option>Дом до 150 м²</option>
                  <option>Другое</option>
                </select>
              </div>

              {/* Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Площадь, м²</label>
                <input 
                  id="fArea" 
                  type="number" 
                  min="0" 
                  className="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-icon p-3 text-sm transition-colors" 
                  placeholder="например, 50" 
                />
              </div>

              {/* Points */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Количество точек</label>
                <input 
                  id="fPoints" 
                  type="number" 
                  min="0" 
                  className="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-icon p-3 text-sm transition-colors" 
                  placeholder="розетки/выключатели" 
                />
              </div>

              {/* Lights */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Светильники</label>
                <input 
                  id="fLights" 
                  type="number" 
                  min="0" 
                  className="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-icon p-3 text-sm transition-colors" 
                  placeholder="кол-во" 
                />
              </div>

              {/* Panel */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Щит</label>
                <select 
                  id="fPanel" 
                  className="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-icon p-3 text-sm transition-colors"
                >
                  <option>Новый щит</option>
                  <option>Замена/сборка</option>
                  <option>Не требуется</option>
                </select>
              </div>

              {/* RCD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">УЗО / дифавтоматы</label>
                <select 
                  id="fRcd" 
                  className="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-icon p-3 text-sm transition-colors"
                >
                  <option>Да</option>
                  <option>Нет</option>
                </select>
              </div>

              {/* Chase */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Штроба, м</label>
                <input 
                  id="fChase" 
                  type="number" 
                  min="0" 
                  className="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-icon p-3 text-sm transition-colors" 
                  placeholder="ориентировочно" 
                />
              </div>

              {/* Materials */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Материалы</label>
                <select 
                  id="fMaterials" 
                  className="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-icon p-3 text-sm transition-colors"
                >
                  <option>Базовые (сертифицированные)</option>
                  <option>Премиум-бренды</option>
                  <option>Материалы клиента</option>
                </select>
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Регион</label>
                <select 
                  id="fRegion" 
                  className="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-icon p-3 text-sm transition-colors"
                >
                  <option>Минск</option>
                  <option>Минск +30 км</option>
                  <option>Брест</option>
                  <option>Брест +30 км</option>
                  <option>Другая область</option>
                </select>
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Срочность</label>
                <select 
                  id="fUrgency" 
                  className="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-icon p-3 text-sm transition-colors"
                >
                  <option>Стандартно</option>
                  <option>Ускоренно</option>
                </select>
              </div>

              {/* Options */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">Доп. опции</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                    <input id="optWarm" type="checkbox" className="accent-primary w-4 h-4" />
                    Тёплый пол (эл.)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                    <input id="optLow" type="checkbox" className="accent-primary w-4 h-4" />
                    Слаботочка (интернет/TV)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                    <input id="optGround" type="checkbox" className="accent-primary w-4 h-4" />
                    Заземление/контур
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                    <input id="optMeter" type="checkbox" className="accent-primary w-4 h-4" />
                    Перенос счётчика
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={calculate}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap
                           rounded-full min-h-[44px] px-6 py-3
                           text-sm sm:text-base font-medium
                           bg-[#FF7F50] text-white hover:brightness-110 transition"
              >
                🧮 <span>Посчитать</span>
              </button>
              <button 
                onClick={downloadPDF}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap
                           rounded-full min-h-[44px] px-6 py-3
                           text-sm sm:text-base font-medium
                           border border-[#1A3A63] text-[#1A3A63] hover:bg-[#1A3A63]/5 transition"
              >
                ⬇️ <span>Скачать PDF</span>
              </button>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              Это предварительный расчёт. Точную цену зафиксируем в договоре после бесплатного выезда на замеры.
            </p>
          </div>

          {/* Result */}
          <div className="rounded-2xl border border-primary bg-primary/5 p-6 md:p-7 shadow-sm animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-white text-xs font-medium mb-6">
              Итоговый расчёт
            </div>
            
            <div className="mb-6">
              <div className="text-3xl md:text-4xl font-bold">
                {result ? (
                  <>
                    <span className="text-primary">{formatNumber(result.min)}</span>
                    <span className="text-primary"> — </span>
                    <span className="text-primary">{formatNumber(result.max)}</span>
                    <span className="ml-1 text-accent">BYN</span>
                  </>
                ) : (
                  <>
                    <span className="text-primary">—</span>
                    <span className="text-primary"> — </span>
                    <span className="text-primary">—</span>
                    <span className="ml-1 text-accent">BYN</span>
                  </>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Диапазон зависит от выбранных материалов и опций
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              <div>
                <p className="text-gray-500 mb-1">Работы</p>
                <p className="font-medium text-gray-800">
                  {result ? `${formatNumber(result.work)} BYN` : '—'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Материалы</p>
                <p className="font-medium text-gray-800">
                  {result ? `${formatNumber(result.materials)} BYN` : '—'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Логистика</p>
                <p className="font-medium text-gray-800">
                  {result ? `${formatNumber(result.logistics)} BYN` : '—'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Срочность</p>
                <p className="font-medium text-gray-800">
                  {result ? `${formatNumber(result.urgency)} BYN` : '—'}
                </p>
              </div>
            </div>

            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-2" />
                Цена фиксируется в договоре
              </li>
              <li>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-2" />
                Оплата по факту
              </li>
              <li>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-2" />
                Бесплатный выезд: Минск +30 км, Брест +30 км
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Нажмите «Скачать PDF», чтобы получить расчёт с брендингом.
        </p>
      </div>
    </section>
  );
};

export default Calculator;