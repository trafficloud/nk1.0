import React from 'react';
import type { CalculationResult } from '../types/database';

interface PDFTemplateProps {
  formValues: {
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
  calculationResult: CalculationResult;
}

const PDFTemplate: React.FC<PDFTemplateProps> = ({ formValues, calculationResult }) => {
  const objectTypeLabels: Record<string, string> = {
    apartment: 'Квартира',
    house: 'Дом',
    office: 'Офис',
    commercial: 'Коммерческое помещение'
  };

  const materialsLabels: Record<string, string> = {
    economy: 'Эконом',
    standard: 'Стандарт',
    premium: 'Премиум'
  };

  const urgencyLabels: Record<string, string> = {
    normal: 'Обычная',
    urgent: 'Срочная',
    very_urgent: 'Очень срочная'
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'BYN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div style={{
      width: '210mm',
      minHeight: '297mm',
      padding: '20mm',
      backgroundColor: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      color: '#1A3A63',
      boxSizing: 'border-box'
    }}>
      {/* Header with Branding */}
      <div style={{
        borderBottom: '4px solid #FF7F50',
        paddingBottom: '15px',
        marginBottom: '30px'
      }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#1A3A63',
          margin: '0 0 10px 0'
        }}>
          Расчет стоимости электромонтажных работ
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#666',
          margin: 0
        }}>
          Предварительная смета от {new Date().toLocaleDateString('ru-RU')}
        </p>
      </div>

      {/* Parameters Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1A3A63',
          marginBottom: '15px',
          borderLeft: '4px solid #FF7F50',
          paddingLeft: '10px'
        }}>
          Параметры объекта
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          fontSize: '14px'
        }}>
          <div>
            <strong>Тип объекта:</strong> {objectTypeLabels[formValues.objectType] || formValues.objectType}
          </div>
          <div>
            <strong>Площадь:</strong> {formValues.area} м²
          </div>
          <div>
            <strong>Розетки:</strong> {formValues.points} шт.
          </div>
          <div>
            <strong>Светильники:</strong> {formValues.lights} шт.
          </div>
          <div>
            <strong>Регион:</strong> {formValues.region}
          </div>
          <div>
            <strong>Материалы:</strong> {materialsLabels[formValues.materials] || formValues.materials}
          </div>
          <div>
            <strong>Срочность:</strong> {urgencyLabels[formValues.urgency] || formValues.urgency}
          </div>
          <div>
            <strong>Материал стен:</strong> {formValues.wallMaterial}
          </div>
        </div>
      </div>

      {/* Additional Options */}
      {(formValues.warmFloor || formValues.weakCurrent || formValues.grounding || formValues.meterMove) && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#1A3A63',
            marginBottom: '15px',
            borderLeft: '4px solid #FF7F50',
            paddingLeft: '10px'
          }}>
            Дополнительные опции
          </h2>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
            {formValues.warmFloor && <li>Теплый пол</li>}
            {formValues.weakCurrent && <li>Слаботочные системы</li>}
            {formValues.grounding && <li>Заземление</li>}
            {formValues.meterMove && <li>Перенос счетчика</li>}
          </ul>
        </div>
      )}

      {/* Price Breakdown */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1A3A63',
          marginBottom: '15px',
          borderLeft: '4px solid #FF7F50',
          paddingLeft: '10px'
        }}>
          Детализация стоимости
        </h2>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #1A3A63' }}>
                Категория
              </th>
              <th style={{ padding: '10px', textAlign: 'right', borderBottom: '2px solid #1A3A63' }}>
                Минимум
              </th>
              <th style={{ padding: '10px', textAlign: 'right', borderBottom: '2px solid #1A3A63' }}>
                Максимум
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Работы</td>
              <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                {formatPrice(calculationResult.breakdown.labor.min)}
              </td>
              <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                {formatPrice(calculationResult.breakdown.labor.max)}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Материалы</td>
              <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                {formatPrice(calculationResult.breakdown.materials.min)}
              </td>
              <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                {formatPrice(calculationResult.breakdown.materials.max)}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Логистика</td>
              <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                {formatPrice(calculationResult.breakdown.logistics.min)}
              </td>
              <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                {formatPrice(calculationResult.breakdown.logistics.max)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Services Breakdown */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1A3A63',
          marginBottom: '15px',
          borderLeft: '4px solid #FF7F50',
          paddingLeft: '10px'
        }}>
          Детализация услуг
        </h2>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px'
        }}>
          <tbody>
            <tr>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Розетки и выключатели</td>
              <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                {formatPrice(calculationResult.breakdown.services.points.min)} - {formatPrice(calculationResult.breakdown.services.points.max)}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Освещение</td>
              <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                {formatPrice(calculationResult.breakdown.services.lights.min)} - {formatPrice(calculationResult.breakdown.services.lights.max)}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Электрощиток</td>
              <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                {formatPrice(calculationResult.breakdown.services.panel.min)} - {formatPrice(calculationResult.breakdown.services.panel.max)}
              </td>
            </tr>
            <tr>
              <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Штробление</td>
              <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                {formatPrice(calculationResult.breakdown.services.chase.min)} - {formatPrice(calculationResult.breakdown.services.chase.max)}
              </td>
            </tr>
            {calculationResult.breakdown.services.options && (
              <tr>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Дополнительные опции</td>
                <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                  {formatPrice(calculationResult.breakdown.services.options.min)} - {formatPrice(calculationResult.breakdown.services.options.max)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Total Price */}
      <div style={{
        backgroundColor: '#1A3A63',
        color: '#ffffff',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '30px'
      }}>
        <div style={{ fontSize: '18px', marginBottom: '10px' }}>
          <strong>Итоговая стоимость:</strong>
        </div>
        <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
          {formatPrice(calculationResult.min)} - {formatPrice(calculationResult.max)}
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{
        backgroundColor: '#fff3e0',
        border: '2px solid #FF7F50',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '30px',
        fontSize: '13px'
      }}>
        <strong style={{ color: '#FF7F50' }}>Важно:</strong> Это предварительный расчет. Точная стоимость определяется после осмотра объекта и составления детального проекта.
      </div>

      {/* Call to Action */}
      <div style={{
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <div style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#1A3A63',
          marginBottom: '10px'
        }}>
          Свяжитесь с нами для бесплатной консультации
        </div>
      </div>

      {/* Footer with Contacts */}
      <div style={{
        borderTop: '2px solid #e0e0e0',
        paddingTop: '15px',
        fontSize: '13px',
        color: '#666'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px'
        }}>
          <div>
            <strong>Телефон:</strong> +375 (XX) XXX-XX-XX
          </div>
          <div>
            <strong>Email:</strong> info@electro-service.by
          </div>
          <div>
            <strong>Адрес:</strong> г. Минск, ул. Примерная, д. 1
          </div>
          <div>
            <strong>Сайт:</strong> www.electro-service.by
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFTemplate;
