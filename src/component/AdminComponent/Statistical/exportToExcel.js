import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/**
 * Hàm xuất file Excel thống kê doanh thu theo tháng.
 * @param {Array} data - Dữ liệu doanh thu theo tháng [{ month: "January", totalSales: 1000 }, ...].
 * @param {number} totalRevenue - Tổng doanh thu trong năm.
 */
const exportToExcel = (data, totalRevenue) => {
  // Chuẩn bị dữ liệu cho bảng chính
  const worksheetData = [["Month", "Total Sales (VNĐ)"]]; // Tiêu đề cột
  data.forEach((item) => {
    worksheetData.push([
      item.month,
      item.totalSales.toLocaleString("vi"), // Format số
    ]);
  });

  // Thêm ghi chú
  worksheetData.push([]);
  worksheetData.push(["Note: All values are in VNĐ."]);

  // Tạo worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // Cấu hình định dạng tiêu đề
  const range = XLSX.utils.decode_range(worksheet["!ref"]); // Xác định phạm vi dữ liệu
  for (let col = range.s.c; col <= range.e.c; col++) {
    const cell = XLSX.utils.encode_cell({ r: 0, c: col }); // Lấy ô đầu tiên (tiêu đề)
    worksheet[cell].s = {
      font: { bold: true, color: { rgb: "FFFFFF" } }, // Chữ đậm và trắng
      fill: { fgColor: { rgb: "4CAF50" } }, // Nền xanh lá cây
      alignment: { horizontal: "center", vertical: "center" }, // Căn giữa
    };
  }

  // Áp dụng định dạng cho toàn bộ cột
  for (let col = range.s.c; col <= range.e.c; col++) {
    const colWidth = col === 0 ? 15 : 20; // Độ rộng từng cột
    if (!worksheet["!cols"]) worksheet["!cols"] = [];
    worksheet["!cols"][col] = { width: colWidth };
  }

  // Định dạng ghi chú (dòng cuối)
  const noteCell = XLSX.utils.encode_cell({
    r: worksheetData.length - 1,
    c: 0,
  });
  worksheet[noteCell].s = {
    font: { italic: true, color: { rgb: "999999" } },
    alignment: { horizontal: "left" },
  };

  // Tạo thêm sheet tổng quan
  const addSummarySheet = (workbook, totalRevenue) => {
    const summaryData = [
      ["Overview"],
      ["Total Revenue", totalRevenue.toLocaleString("vi")],
    ];
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);

    // Định dạng tiêu đề tổng quan
    summarySheet["A1"].s = {
      font: { bold: true, sz: 16 }, // Chữ lớn và đậm
      alignment: { horizontal: "center" },
    };

    // Định dạng dữ liệu
    const totalCell = XLSX.utils.encode_cell({ r: 1, c: 1 });
    summarySheet[totalCell].s = {
      font: { color: { rgb: "4CAF50" }, bold: true },
      alignment: { horizontal: "right" },
    };

    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");
  };

  // Tạo workbook và thêm các sheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Monthly Sales");
  addSummarySheet(workbook, totalRevenue);

  // Xuất file Excel
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `Monthly_Sales_Statistics_${new Date().getFullYear()}.xlsx`);
};

export default exportToExcel;
