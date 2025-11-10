import html2canvas from 'html2canvas';
import type { CalculationResult } from '../types/database';

interface FormValues {
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
}

export async function generateImage(
  formValues: FormValues,
  calculationResult: CalculationResult
): Promise<Blob> {
  try {
    const { default: React } = await import('react');
    const { default: ReactDOM } = await import('react-dom/client');
    const { default: PDFTemplate } = await import('../components/PDFTemplate');

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    document.body.appendChild(container);

    const root = ReactDOM.createRoot(container);

    await new Promise<void>((resolve) => {
      root.render(
        React.createElement(PDFTemplate, {
          formValues,
          calculationResult
        })
      );

      setTimeout(resolve, 100);
    });

    const canvas = await html2canvas(container.firstElementChild as HTMLElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    root.unmount();
    document.body.removeChild(container);

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create image blob'));
        }
      }, 'image/png', 1.0);
    });
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Не удалось создать изображение. Попробуйте еще раз.');
  }
}
