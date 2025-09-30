import React, { useState, useEffect } from 'react';
import { Calculator as CalculatorIcon } from 'lucide-react';
import { loadConfig, Config } from '../types/calculator';
import { getProcessedFormValues, calculateTotal, FormValues } from '../utils/calculator';

interface CalculationResult {
  min: number;
  max: number;
  currency: string;
  breakdown: {
    works: number;
    materials: number;
    logistics: number;
    rush: number;
  };
  factors: string[];
  orangeNote: string;
}

const Calculator: React.FC = () => {
  const [config, setConfig] = useState<Config | null>(null);
  const [result, setResult] = useState<CalculationResult | null>(null);
  
  // Form state
  const [fWallMaterial, setFWallMaterial] = useState('Не знаю');
  const [fCeilingHeight, setFCeilingHeight] = useState('Нет');
  const [fType, setFType] = useState('Студия');
  const [fArea, setFArea] = useState('');
  const [fPoints, setFPoints] = useState('');
  const [fLights, setFLights] = useState('');
  const [fPanel, setFPanel] = useState('Новый щит');
  const [fRcd, setFRcd] = useState('Да');
  const [fChase, setFChase] = useState('');
  const [fMaterials, setFMaterials] = useState('Базовые (сертифицированные)');
  const [fRegion, setFRegion] = useState('Брест');
  const [fUrgency, setFUrgency] = useState('Стандартно');
  const [optWarm, setOptWarm] = useState(false);
  const [optLow, setOptLow] = useState(false);
  const [optGround, setOptGround] = useState(false);
  const [optMeter, setOptMeter] = useState(false);

  // Load config on mount
  useEffect(() => {
    const loadCalculatorConfig = async () => {
      try {
        const cfg = await loadConfig();
        setConfig(cfg);
      } catch (error) {
        console.error('Failed to load calculator config:', error);
      }
    };
    
    loadCalculatorConfig();
  }, []);

  const calculate = (): void => {
    if (!config) return;
    
    const formValues: FormValues = {
      objectType: fType,
      area: Number(fArea) || 0,
      points: Number(fPoints) || 0,
      lights: Number(fLights) || 0,
      panel: fPanel,
      rcd: fRcd,
      chaseM: Number(fChase) || 0,
      materialsTier: fMaterials,
      region: fRegion,
      urgency: fUrgency,
      warmFloor: optWarm,
      weakCurrent: optLow,
      grounding: optGround,
      meterMove: optMeter,
      wallMaterial: fWallMaterial,
      heightGT3: fCeilingHeight
    };
    
    const processedForm = getProcessedFormValues(formValues);
    const calculationResult = calculateTotal(processedForm, config);
    
    setResult(calculationResult);
  };

  const downloadPDF = (): void => {
    window.print();
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString('ru-RU');
  };

  return (
    <section id="calc" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
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
            {/* New fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Wall Material */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Материал стен</label>
                <select
                  name="wallMaterial"
                  value={fWallMaterial}
                  onChange={(e) => setFWallMaterial(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-icon p-3 text-sm transition-colors"
                >
                  <option>Не знаю</option>
                  <option>Кирпич</option>
                  <option>Бетон</option>
                  <option>Г-с блок</option>
                </select>
              </div>
              {/* Ceiling Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Высота потолка &gt; 3 м</label>
                <select
                  name="heightGT3"
                  value={fCeilingHeight}
                  onChange={(e) => setFCeilingHeight(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-icon p-3 text-sm transition-colors"
                >
                  <option>Нет</option>
                  <option>Да</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Object Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Тип объекта</label>
                <select 
                  name="objectType"
                  value={fType}
                  onChange={(e) => setFType(e.target.value)}
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
                  name="area"
                  value={fArea}
                  onChange={(e) => setFArea(e.target.value)}
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
                  name="points"
                  value={fPoints}
                  onChange={(e) => setFPoints(e.target.value)}
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
                  name="lights"
                  value={fLights}
                  onChange={(e) => setFLights(e.target.value)}
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
                  name="panel"
                  value={fPanel}
                  onChange={(e) => setFPanel(e.target.value)}
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
                  name="rcd"
                  value={fRcd}
                  onChange={(e) => setFRcd(e.target.value)}
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
                  name="chaseM"
                  value={fChase}
                  onChange={(e) => setFChase(e.target.value)}
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
                  name="materialsTier"
                  value={fMaterials}
                  onChange={(e) => setFMaterials(e.target.value)}
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
                  name="region"
                  value={fRegion}
                  onChange={(e) => setFRegion(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-icon p-3 text-sm transition-colors"
                >
                  <option>Брест</option>
                  <option>Брест +30 км</option>
                  <option>Другая область</option>
                </select>
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Срочность</label>
                <select 
                  name="urgency"
                  value={fUrgency}
                  onChange={(e) => setFUrgency(e.target.value)}
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
                    <input 
                      name="opt_warmfloor"
                      type="checkbox" 
                      checked={optWarm}
                      onChange={(e) => setOptWarm(e.target.checked)}
                      className="accent-primary w-4 h-4" 
                    />
                    Тёплый пол (эл.)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                    <input 
                      name="opt_weak"
                      type="checkbox" 
                      checked={optLow}
                      onChange={(e) => setOptLow(e.target.checked)}
                      className="accent-primary w-4 h-4" 
                    />
                    Слаботочка (интернет/TV)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                    <input 
                      name="opt_ground"
                      type="checkbox" 
                      checked={optGround}
                      onChange={(e) => setOptGround(e.target.checked)}
                      className="accent-primary w-4 h-4" 
                    />
                    Заземление/контур
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                    <input 
                      name="opt_meter_move"
                      type="checkbox" 
                      checked={optMeter}
                      onChange={(e) => setOptMeter(e.target.checked)}
                      className="accent-primary w-4 h-4" 
                    />
                    Перенос счётчика
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={calculate}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap min-w-[180px]
                           rounded-xl min-h-[44px] px-6 py-3
                           text-sm sm:text-base font-medium
                           bg-[#FF7F50] text-white hover:brightness-110 transition"
              >
                <CalculatorIcon className="w-5 h-5" /> <span>Посчитать</span>
              </button>
              <button 
                onClick={downloadPDF}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap min-w-[180px]
                           rounded-xl min-h-[44px] px-6 py-3
                           text-sm sm:text-base font-medium
                           border border-[#1A3A63] text-[#1A3A63] hover:bg-[#1A3A63]/5 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                <span>Скачать PDF</span>
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
                    <span className="ml-1 text-accent">{result.currency}</span>
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
                  {result ? `${formatNumber(result.breakdown.works)} ${result.currency}` : '—'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Материалы</p>
                <p className="font-medium text-gray-800">
                  {result ? `${formatNumber(result.breakdown.materials)} ${result.currency}` : '—'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Логистика</p>
                <p className="font-medium text-gray-800">
                  {result ? `${formatNumber(result.breakdown.logistics)} ${result.currency}` : '—'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Срочность</p>
                <p className="font-medium text-gray-800">
                  {result ? `${formatNumber(result.breakdown.rush)} ${result.currency}` : '—'}
                </p>
              </div>
            </div>

            {/* Factors */}
            {result && result.factors.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">Факторы ценообразования:</p>
                <div className="flex flex-wrap gap-2">
                  {result.factors.map((factor, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600"
                    >
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Orange Note */}
            {result && result.orangeNote && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-orange-500">
                  {result.orangeNote}
                </p>
              </div>
            )}

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