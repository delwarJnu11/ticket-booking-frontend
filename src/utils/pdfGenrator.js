import jsPDF from "jspdf";

export const generatePDF = (ticket) => {
  const doc = new jsPDF();

  // Set styles
  doc.setFillColor(255, 255, 255); // White background color
  doc.setDrawColor(0, 128, 0); // Green border color
  doc.setTextColor(0, 0, 0); // Black text color
  doc.setLineWidth(10); // Border width in units (default is 0.2)

  // Add background color
  doc.rect(
    0,
    0,
    doc.internal.pageSize.getWidth(),
    doc.internal.pageSize.getHeight(),
    "F"
  );

  // Add header text
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold"); // Set font to bold
  doc.text("Ticket", 105, 20, null, null, "center");

  // Add ticket details
  doc.setFont("helvetica", "normal"); // Set font back to normal
  doc.setFontSize(12);
  let y = 40;

  // Mapping object for user-friendly labels
  const labelMappings = {
    passengerName: "Passenger Name",
    email: "Email",
    phone: "Phone",
    nid: "National ID",
    trainName: "Train Name",
    trainCode: "Train Code",
    from: "From",
    to: "To",
    fare: "Fare",
    bookingDate: "Booking Date",
    journeyDate: "Journey Date",
    departureTime: "Departure Time",
  };

  const padding = 5; // Adjust the padding as needed
  const labelWidth = 70; // Width reserved for labels

  Object.entries(ticket).forEach(([key, value]) => {
    // Use labelMappings to display user-friendly labels
    const label = labelMappings[key] || key; // If there's no mapping, use the key itself
    doc.text(`${label}:`, 10, y);
    doc.text(`${value}`, 10 + labelWidth + padding, y);
    y += 10;
  });

  // Draw border
  doc.rect(
    0,
    0,
    doc.internal.pageSize.getWidth(),
    doc.internal.pageSize.getHeight()
  );

  // Save the PDF
  doc.save("ticket.pdf");
};
