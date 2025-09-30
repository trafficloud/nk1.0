import React, { useState } from 'react';
import { useRef } from 'react';
import { Calculator as CalculatorIcon } from 'lucide-react';
import type { Config, Service } from '../types/calculator';
import { calcLineTotal, applyGlobalRules } from '../utils/calculator';

interface ParamsPickerProps {
  schemaId: string;
  cfg: Config;
  value: Record<string, string>;
  onChange: (v: Record<string, string>) => void;
}

function ParamsPicker({ schemaId, cfg, value, onChange }: ParamsPickerProps) {
  const rows = cfg.params.filter(p => p.schema_id === schemaId);
  const params = Array.from(new Set(rows.map(r => r.param)));
  
  return (
    <div className="flex flex-wrap gap-2">
      {params.map(p => {
        const variants = rows.filter(r => r.param === p).map(r => r.variant);
        return (
          <select
            key={p}
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-icon"
            value={value[p] || ""}
            onChange={e => onChange({ ...value, [p]: e.target.value })}
          >
            <option value="">{p}</option>
            {variants.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        );
      })}
    </div>
  );
}

const Calculator: React.FC = () => {
  const [cfg, setCfg] = useState<Config | null>(null);
  const [qty, setQty] = useState<Record<string, number>>({});
  const [chosen, setChosen] = useState<Record<string, Record<string, string>>>({}); 
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/config/electro_calculator_config.json")
      .then(r => {
        if (!r.ok) throw new Error('Failed to load config');
        return r.json();
      })
      .then((config: Config) => {
        setCfg(config);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!cfg) return;
    
    const subtotal = cfg.services.reduce((acc, s) => {
      const q = qty[s.id] || 0;
      if (q <= 0) return acc;
      const params = chosen[s.id] || {};
      return acc + calcLineTotal(s, q, params, cfg);
    }, 0);

    const finalTotal = applyGlobalRules(subtotal, cfg);
    setTotal(finalTotal);
  }, [cfg, qty, chosen]);

  const handleQtyChange = (serviceId: string, value: number) => {
    setQty(prev => ({ ...prev, [serviceId]: value }));
  };

  const handleParamsChange = (serviceId: string, params: Record<string, string>) => {
    setChosen(prev => ({ ...prev, [serviceId]: params }));
  };

  const downloadPDF = (): void => {
    window.print();
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString('ru-RU');
  };

  if (loading) {
    return (
      <section id="calc" className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Загрузка калькулятора...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !cfg) {
    return (
      <section id="calc" className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="text-center">
            <p className="text-red-600">Ошибка загрузки калькулятора: {error}</p>
          </div>
        </div>
      </section>
    );
  }

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
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {cfg.services.map((service: Service) => (
                <div key={service.id} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-start p-3 border border-gray-100 rounded-lg">
                  <div className="font-medium text-sm">{service.name}</div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      step={service.unit === "m" ? 0.1 : 1}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-icon"
                      value={qty[service.id] || 0}
                      onChange={(e) => handleQtyChange(service.id, Number(e.target.value))}
                      placeholder={service.unit === "m" ? "метры" : service.unit === "pcs" ? "шт" : "разово"}
                    />
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {service.unit === "m" ? "м" : service.unit === "pcs" ? "шт" : "раз"}
                    </span>
                  </div>
                  {service.param_schema ? (
                    <ParamsPicker
                      schemaId={service.param_schema}
                      cfg={cfg}
                      value={chosen[service.id] || {}}
                      onChange={(v) => handleParamsChange(service.id, v)}
                    />
                  ) : <div />}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
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
                <span className="text-primary">{formatNumber(total)}</span>
                <span className="ml-1 text-accent">BYN</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Стоимость рассчитана на основе выбранных услуг и параметров
              </p>
            </div>

            <div className="text-sm mb-6">
              <p className="text-gray-500 mb-2">Детализация по услугам:</p>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {cfg.services.filter(s => (qty[s.id] || 0) > 0).map(service => {
                  const q = qty[service.id] || 0;
                  const params = chosen[service.id] || {};
                  const lineTotal = calcLineTotal(service, q, params, cfg);
                  return (
                    <div key={service.id} className="flex justify-between text-xs">
                      <span>{service.name} ({q} {service.unit === "m" ? "м" : service.unit === "pcs" ? "шт" : "раз"})</span>
                      <span>{formatNumber(lineTotal)} BYN</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-2" />
                Цена фиксируется в договоре
              </li>
              <li>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-2" />
                Минимальный заказ: {cfg.pricing_rules.find(r => r.key === "min_order")?.value || "30"} BYN
              </li>
              <li>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-2" />
                Оплата по факту
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Это предварительный расчёт. Точную цену зафиксируем в договоре после бесплатного выезда на замеры.
        </p>
      </div>
    </section>
  );
};

export default Calculator;