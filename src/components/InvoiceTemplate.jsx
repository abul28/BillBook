import React, { forwardRef } from "react";
import "../styles/Invoice.css";

const InvoiceTemplate = forwardRef(({ data, setInvoiceData }, ref) => {

  const handleChange = (field, value) => {
    setInvoiceData({ ...data, [field]: value });
  };

  const handleReceiverChange = (field, value) => {
    setInvoiceData({
      ...data,
      receiver: { ...data.receiver, [field]: value }
    });
  };

  const handleConsigneeChange = (field, value) => {
    setInvoiceData({
      ...data,
      consignee: { ...data.consignee, [field]: value }
    });
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...data.products];
    updatedProducts[index][field] = value;
    setInvoiceData({ ...data, products: updatedProducts });
  };

  const addProduct = () => {
    setInvoiceData({
      ...data,
      products: [...data.products, { name: "", qty: 0, rate: 0 }]
    });
  };

  const removeProduct = (index) => {
    const updatedProducts = data.products.filter((_, i) => i !== index);

    if (updatedProducts.length === 0) {
      updatedProducts.push({ name: "", qty: 0, rate: 0 });
    }

    setInvoiceData({
      ...data,
      products: updatedProducts
    });
  };

  // ================= CALCULATION =================

  const totalBeforeTax = data.products.reduce(
    (sum, item) => sum + (Number(item.qty) * Number(item.rate)),
    0
  );

  const autoGST = totalBeforeTax * 0.18;

  const manualTax =
    Number(data.cgst || 0) +
    Number(data.sgst || 0);

  const appliedTax = manualTax > 0 ? manualTax : autoGST;

  const totalTax =
    appliedTax +
    Number(data.gstReverseCharge || 0);

  const totalAfterTax =
    totalBeforeTax +
    totalTax +
    Number(data.forwardingCharges || 0);

  // =================================================

  return (
    <div className="invoice-wrapper" ref={ref}>
      <table className="main-table">
        <tbody>

          {/* HEADER */}
          <tr>
            <td colSpan="2" className="header">
  <div className="header-container">

    <div className="header-left"></div>

    <div className="header-center">
      <div className="company-name">DEEPSHIKA METAL</div>
      <div>(Manufactures & Wholesale Dealers in Aluminum Circle & Home Utensils)</div>
      <div>
        Plot No : 36A, Sidco Industrial Estate ELAMBALUR - Perambalur (Dt) - 621 212.
      </div>
    </div>

    <div className="header-right">
      Cell : 76392 50904 <br />
      97892 91368
    </div>

  </div>
</td>
          </tr>

          {/* GST */}
          <tr>
            <td>GSTIN: 33AAZFD0827F1ZE</td>
            <td className="center bold">TAX INVOICE</td>
          </tr>

          {/* TOP DETAILS */}
          <tr>
            <td>
              Reverse Charge:
              <input
                className="dotted-input"
                value={data.reverseCharge || ""}
                onChange={(e) => handleChange("reverseCharge", e.target.value)}
              />

              Invoice No:
              <input
                className="dotted-input"
                value={data.invoiceNo || ""}
                onChange={(e) => handleChange("invoiceNo", e.target.value)}
              />

              Invoice Date:
              <input
                type="date"
                className="dotted-input"
                value={data.invoiceDate || ""}
                onChange={(e) => handleChange("invoiceDate", e.target.value)}
              />
            </td>

            <td>
              Transport Mode:
              <input
                className="dotted-input"
                value={data.transportMode || ""}
                onChange={(e) => handleChange("transportMode", e.target.value)}
              />

              Vehicle Number:
              <input
                className="dotted-input"
                value={data.vehicleNumber || ""}
                onChange={(e) => handleChange("vehicleNumber", e.target.value)}
              />

              Date of Supply:
              <input
                type="date"
                className="dotted-input"
                value={data.dateOfSupply || ""}
                onChange={(e) => handleChange("dateOfSupply", e.target.value)}
              />

              Place of Supply:
              <input
                className="dotted-input"
                value={data.placeOfSupply || ""}
                onChange={(e) => handleChange("placeOfSupply", e.target.value)}
              />
            </td>
          </tr>

          {/* RECEIVER & CONSIGNEE */}
          <tr>
            <td>
              <b>Details of Receiver / Billed to:</b><br/>

              Name:
              <input
                className="dotted-input"
                value={data.receiver?.name || ""}
                onChange={(e) => handleReceiverChange("name", e.target.value)}
              />

              Address:
              <input
                className="dotted-input"
                value={data.receiver?.address || ""}
                onChange={(e) => handleReceiverChange("address", e.target.value)}
              />

              GSTIN:
              <input
                className="dotted-input"
                value={data.receiver?.gstin || ""}
                onChange={(e) => handleReceiverChange("gstin", e.target.value)}
              />

              State:
              <input
                className="dotted-input short"
                value={data.receiver?.state || ""}
                onChange={(e) => handleReceiverChange("state", e.target.value)}
              />

              State Code:
              <input
                className="dotted-input short"
                value={data.receiver?.stateCode || ""}
                onChange={(e) => handleReceiverChange("stateCode", e.target.value)}
              />
            </td>

            <td>
              <b>Details of Consignee / Shipped to:</b><br/>

              Name:
              <input
                className="dotted-input"
                value={data.consignee?.name || ""}
                onChange={(e) => handleConsigneeChange("name", e.target.value)}
              />

              Address:
              <input
                className="dotted-input"
                value={data.consignee?.address || ""}
                onChange={(e) => handleConsigneeChange("address", e.target.value)}
              />

              GSTIN:
              <input
                className="dotted-input"
                value={data.consignee?.gstin || ""}
                onChange={(e) => handleConsigneeChange("gstin", e.target.value)}
              />

              State:
              <input
                className="dotted-input short"
                value={data.consignee?.state || ""}
                onChange={(e) => handleConsigneeChange("state", e.target.value)}
              />

              State Code:
              <input
                className="dotted-input short"
                value={data.consignee?.stateCode || ""}
                onChange={(e) => handleConsigneeChange("stateCode", e.target.value)}
              />
            </td>
          </tr>

          {/* PRODUCTS */}
          <tr>
            <td colSpan="2">
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Sl No</th>
                    <th>Name of Product</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.products.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>

                      <td>
                        <input
                          className="dotted-input"
                          value={item.name}
                          onChange={(e) =>
                            handleProductChange(index, "name", e.target.value)
                          }
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          className="dotted-input"
                          value={item.qty}
                          onChange={(e) =>
                            handleProductChange(index, "qty", Number(e.target.value))
                          }
                        />
                      </td>

                      <td>
                        <input
                          type="number"
                          className="dotted-input"
                          value={item.rate}
                          onChange={(e) =>
                            handleProductChange(index, "rate", Number(e.target.value))
                          }
                        />
                      </td>

                      <td>{(item.qty * item.rate).toFixed(2)}</td>

                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => removeProduct(index)}
                        >
                          ❌
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button className="add-btn" onClick={addProduct}>
                + Add Product
              </button>
            </td>
          </tr>

          {/* TOTAL SECTION */}
          <tr>
            <td>
              Total Invoice Amount in Words:
              <input
                className="dotted-input"
                value={data.totalInWords || ""}
                onChange={(e) => handleChange("totalInWords", e.target.value)}
              />

              <br /><br />
              <b>Bank Details</b><br />

              A/C No:
              <input
                className="dotted-input"
                value={data.bankAccount || ""}
                onChange={(e) => handleChange("bankAccount", e.target.value)}
              />

              IFSC Code:
              <input
                className="dotted-input"
                value={data.ifsc || ""}
                onChange={(e) => handleChange("ifsc", e.target.value)}
              />

              <hr />

              Terms & Conditions:
              <input
                className="dotted-input"
                value={data.terms || ""}
                onChange={(e) => handleChange("terms", e.target.value)}
              />
            </td>

            <td>
              <table className="total-table">
                <tbody>
                  <tr>
                    <td>Total Before Tax</td>
                    <td>{totalBeforeTax.toFixed(2)}</td>
                  </tr>

                  <tr>
                    <td>CGST (Optional)</td>
                    <td>
                      <input
                        type="number"
                        className="dotted-input"
                        value={data.cgst || ""}
                        onChange={(e) =>
                          handleChange("cgst", Number(e.target.value))
                        }
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>SGST (Optional)</td>
                    <td>
                      <input
                        type="number"
                        className="dotted-input"
                        value={data.sgst || ""}
                        onChange={(e) =>
                          handleChange("sgst", Number(e.target.value))
                        }
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>GST (18%)</td>
                    <td>{appliedTax.toFixed(2)}</td>
                  </tr>

                  <tr>
                    <td>GST on Reverse Charge</td>
                    <td>
                      <input
                        type="number"
                        className="dotted-input"
                        value={data.gstReverseCharge || ""}
                        onChange={(e) =>
                          handleChange("gstReverseCharge", Number(e.target.value))
                        }
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Forwarding Charges</td>
                    <td>
                      <input
                        type="number"
                        className="dotted-input"
                        value={data.forwardingCharges || ""}
                        onChange={(e) =>
                          handleChange("forwardingCharges", Number(e.target.value))
                        }
                      />
                    </td>
                  </tr>

                  <tr className="bold">
                    <td>Total Amount After Tax</td>
                    <td>{totalAfterTax.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* SIGNATURE */}
          <tr>
            <td colSpan="2" className="signature">
              For DEEPSHIKA METAL <br /><br /><br />
              Authorised Signatory
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  );
});

export default InvoiceTemplate;