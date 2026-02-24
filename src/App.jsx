import React, { useState, useRef } from "react";
import InvoiceTemplate from "./components/InvoiceTemplate";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function App() {
  const invoiceRef = useRef();

  const [invoiceData, setInvoiceData] = useState({
  reverseCharge: "",
  invoiceNo: "",
  invoiceDate: "",
  transportMode: "",
  vehicleNumber: "",
  dateOfSupply: "",
  placeOfSupply: "",

  receiver: {
    name: "",
    address: "",
    gstin: "",
    state: "",
    stateCode: ""
  },

  consignee: {
    name: "",
    address: "",
    gstin: "",
    state: "",
    stateCode: ""
  },

  products: [{ name: "", qty: 0, rate: 0 }],

  cgst: 0,
  sgst: 0,
  igst: 0,
  forwardingCharges: 0,
  gstReverseCharge: 0,

  totalInWords: "",
  bankAccount: "",
  ifsc: "",
  terms: ""
});

  const amount = invoiceData.qty * invoiceData.rate;
  const gst = amount * 0.18;
  const total = amount + gst;

  const downloadPDF = async () => {
  const element = invoiceRef.current;

  const canvas = await html2canvas(element, {
    scale: 3,           // High quality
    useCORS: true,
    scrollY: -window.scrollY
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = 210;   // A4 width
  const pageHeight = 297;  // A4 height

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  if (imgHeight <= pageHeight) {
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  } else {
    // Multi-page support (VERY IMPORTANT)
    let position = 0;
    let remainingHeight = imgHeight;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    remainingHeight -= pageHeight;

    while (remainingHeight > 0) {
      position = remainingHeight - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      remainingHeight -= pageHeight;
    }
  }

  pdf.save("invoice.pdf");
};

  return (
    <div>
      <InvoiceTemplate
        ref={invoiceRef}
        data={invoiceData}
        setInvoiceData={setInvoiceData}
        amount={amount}
        gst={gst}
        total={total}
      />

      <div className="print-wrapper">
  <button className="print-btn" onClick={() => window.print()}>
    Print Invoice
  </button>
</div>
    </div>
  );
}

export default App;