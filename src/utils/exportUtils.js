// src/utils/exportUtils.js
import jsPDF from "jspdf";
import "jspdf-autotable";

// Export data as CSV
export const exportToCSV = (data, filename = "export.csv", headers = null) => {
  if (!data || data.length === 0) return;

  const headerKeys = headers || Object.keys(data[0]);
  const headerRow = headerKeys.join(",");

  const rows = data.map((item) => {
    return headerKeys
      .map((key) => {
        const value = item[key];
        if (
          typeof value === "string" &&
          (value.includes(",") || value.includes('"'))
        ) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value ?? "";
      })
      .join(",");
  });

  const csv = [headerRow, ...rows].join("\n");
  downloadFile(csv, filename, "text/csv");
};

// Export data as JSON
export const exportToJSON = (data, filename = "export.json") => {
  if (!data) return;
  const json = JSON.stringify(data, null, 2);
  downloadFile(json, filename, "application/json");
};

// Export data as Excel (XLS)
export const exportToExcel = (
  data,
  filename = "export.xls",
  headers = null,
) => {
  if (!data || data.length === 0) return;

  const headerKeys = headers || Object.keys(data[0]);
  let html = '<html><head><meta charset="UTF-8"></head><body>';
  html += '<table border="1">';

  html += "<tr>";
  headerKeys.forEach((key) => {
    html += `<th>${key}</th>`;
  });
  html += "</tr>";

  data.forEach((item) => {
    html += "<tr>";
    headerKeys.forEach((key) => {
      const value = item[key] ?? "";
      html += `<td>${value}</td>`;
    });
    html += "</tr>";
  });

  html += "</table></body></html>";
  downloadFile(html, filename, "application/vnd.ms-excel");
};

// Export data as PDF using jsPDF
export const exportToPDF = (
  data,
  filename = "export.pdf",
  title = "Export",
) => {
  if (!data || data.length === 0) return;

  const doc = new jsPDF();
  const headerKeys = Object.keys(data[0]);

  // Add title
  doc.setFontSize(18);
  doc.text(title, 14, 22);
  doc.setFontSize(11);
  doc.text(`Exported on: ${new Date().toLocaleString()}`, 14, 32);

  // Create table
  const tableData = data.map((item) =>
    headerKeys.map((key) => item[key] ?? ""),
  );

  doc.autoTable({
    head: [headerKeys],
    body: tableData,
    startY: 40,
    theme: "striped",
    headStyles: { fillColor: [59, 130, 246] },
  });

  // Save with filename
  doc.save(filename);
};

// Download file helper
export const downloadFile = (content, filename, type = "text/plain") => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Export data in multiple formats
export const exportData = (
  data,
  format = "csv",
  filename = "export",
  headers = null,
) => {
  switch (format.toLowerCase()) {
    case "csv":
      exportToCSV(data, `${filename}.csv`, headers);
      break;
    case "json":
      exportToJSON(data, `${filename}.json`);
      break;
    case "excel":
    case "xls":
      exportToExcel(data, `${filename}.xls`, headers);
      break;
    case "pdf":
      exportToPDF(data, `${filename}.pdf`, "Export Data");
      break;
    default:
      console.error("Unsupported format:", format);
  }
};

// Get supported export formats
export const getSupportedFormats = () => {
  return ["csv", "json", "excel", "pdf"];
};

export default {
  exportToCSV,
  exportToJSON,
  exportToExcel,
  exportToPDF,
  downloadFile,
  exportData,
  getSupportedFormats,
};
