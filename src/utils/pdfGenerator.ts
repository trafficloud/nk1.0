import jsPDF from 'jspdf';
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

export async function generatePDF(
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

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    return pdf.output('blob');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Не удалось создать PDF. Попробуйте еще раз.');
  }
}
