import * as XLSX from 'xlsx';

/**
 * Generates an Excel file for a specific certification evaluation.
 * This function is designed to work in the browser.
 */
export const exportCertificationToExcel = (data) => {
  const { finca, lote, cosecha, certification, answers, date, percentage } = data;
  
  // 1. Prepare Rows
  const rows = [
    ['REPORTE DE EVALUACIÓN DE CERTIFICACIÓN'],
    ['BUXTAR - GESTIÓN CAFETERA'],
    [''],
    ['📍 Información General'],
    ['Finca', finca],
    ['Lote', lote],
    ['Cosecha', cosecha],
    ['Certificación', certification.label],
    ['Fecha de Evaluación', date],
    [''],
    ['📈 Resultado de Auditoría'],
    ['Puntaje de Cumplimiento', `${percentage}%`],
    ['Resultado Final', percentage >= 80 ? 'APTO (CUMPLE)' : 'NO APTO (REQUIERE MEJORAS)'],
    [''],
    ['📋 Detalle de Requisitos'],
    ['REQUISITO / PREGUNTA', 'CUMPLIMIENTO'],
  ];

  // 2. Add questions
  certification.questions.forEach(q => {
    rows.push([
      q.text,
      answers[`${certification.id}_${q.id}`] ? 'SÍ' : 'NO'
    ]);
  });

  // 3. Create Worksheet and Workbook
  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  
  // Set column widths
  worksheet['!cols'] = [{ wch: 70 }, { wch: 20 }];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Evaluación');

  // 4. Generate Binary and Trigger Download
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const safeFileName = `Cert_${certification.id}_${finca.replace(/\s+/g, '_')}_${date.replace(/\//g, '-')}.xlsx`;
  link.setAttribute('download', safeFileName);
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
