import { jsPDF } from 'jspdf';

interface CertificateData {
  studentName: string;
  courseName: string;
  completionDate: string;
  instructorName: string;
  grade: number;
}

export const generateCertificatePDF = ({
  studentName,
  courseName,
  completionDate,
  instructorName,
  grade
}: CertificateData) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [800, 600]
  });

  // Add background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 800, 600, 'F');

  // Add border
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(2);
  doc.rect(20, 20, 760, 560);

  // Add VPJ logo
  // Note: In a real implementation, you'd need to handle logo loading properly
  doc.addImage('path_to_vpj_logo', 'PNG', 50, 50, 100, 100);

  // Add certificate content
  doc.setFont('times', 'bold');
  doc.setFontSize(48);
  doc.text('CERTIFICADO', 400, 150, { align: 'center' });

  doc.setFont('times', 'normal');
  doc.setFontSize(16);
  doc.text('Este certificado é concedido a', 400, 200, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(24);
  doc.text(studentName, 400, 250, { align: 'center' });

  doc.setFont('times', 'normal');
  doc.setFontSize(16);
  doc.text('pela conclusão com êxito do curso', 400, 300, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(20);
  doc.text(courseName, 400, 350, { align: 'center' });

  // Add completion details
  doc.setFont('times', 'normal');
  doc.setFontSize(14);
  doc.text(`Concluído em: ${completionDate}`, 200, 450);
  doc.text(`Nota Final: ${grade}/10`, 600, 450);

  // Add signatures
  doc.line(200, 500, 350, 500);
  doc.text(instructorName, 275, 520, { align: 'center' });
  doc.text('Instrutor', 275, 540, { align: 'center' });

  return doc;
};