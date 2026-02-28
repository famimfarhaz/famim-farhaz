import { jsPDF } from "jspdf"

export interface InvoiceData {
    clientName: string
    packageName?: string
    email: string
    services: { name: string; price: number }[]
    total: number
    bundleDiscountAmount?: number
    couponDiscountAmount?: number
    discountAmount: number // Total discount
    discountedTotal: number
    couponCode?: string
    date: string
    orderId: string
}

export const generateInvoice = (data: InvoiceData) => {
    const doc = new jsPDF()

    // Settings
    const margin = 20
    const pageWidth = doc.internal.pageSize.getWidth()
    const contentWidth = pageWidth - margin * 2
    let currentY = 25

    // Brand Header
    doc.setFont("helvetica", "bold")
    doc.setFontSize(28)
    doc.setTextColor(0)
    doc.text("FAMIM FARHAZ", margin, currentY)

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(120)
    doc.text("STRATEGY & DEVELOPMENT STUDIO", margin, currentY + 8)

    // Pro-forma Badge
    const badgeText = "DIGITAL PRO-FORMA"
    const badgeWidth = doc.getTextWidth(badgeText) + 10
    doc.setDrawColor(0)
    doc.rect(pageWidth - margin - badgeWidth, currentY - 5, badgeWidth, 8)
    doc.setFontSize(8)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(0)
    doc.text(badgeText, pageWidth - margin - (badgeWidth / 2), currentY + 0.5, { align: "center" })

    currentY += 35

    // Invoice Info & Client Details
    doc.setDrawColor(240)
    doc.line(margin, currentY, pageWidth - margin, currentY)
    currentY += 15

    // Left Side: Bill To
    doc.setFont("helvetica", "bold")
    doc.setFontSize(9)
    doc.setTextColor(150)
    doc.text("BILL TO", margin, currentY)

    doc.setFont("helvetica", "bold")
    doc.setFontSize(11)
    doc.setTextColor(0)
    doc.text(data.clientName.toUpperCase(), margin, currentY + 8)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text(data.email, margin, currentY + 15)

    // Right Side: Order Info
    const rightColX = pageWidth - margin
    doc.setFont("helvetica", "bold")
    doc.setFontSize(9)
    doc.setTextColor(150)
    doc.text("INVOICE DETAILS", rightColX, currentY, { align: "right" })

    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text(`Invoice No: #${data.orderId}`, rightColX, currentY + 8, { align: "right" })
    doc.text(`Date: ${data.date}`, rightColX, currentY + 14, { align: "right" })
    if (data.couponCode) {
        doc.text(`Promo: ${data.couponCode}`, rightColX, currentY + 20, { align: "right" })
    }

    currentY += 40

    // Table Header
    doc.setFillColor("250")
    doc.rect(margin, currentY, contentWidth, 10, "F")
    doc.setFont("helvetica", "bold")
    doc.setFontSize(9)
    doc.setTextColor(0)
    doc.text("DESCRIPTION", margin + 5, currentY + 6.5)
    doc.text("AMOUNT (USD)", pageWidth - margin - 5, currentY + 6.5, { align: "right" })

    currentY += 10

    // Table Rows
    doc.setFont("helvetica", "normal")
    doc.setFontSize(10)
    currentY += 10

    data.services.forEach((service) => {
        doc.setTextColor(0)
        doc.text(service.name.toUpperCase(), margin + 5, currentY)
        doc.text(`$${service.price.toLocaleString()}`, pageWidth - margin - 5, currentY, { align: "right" })

        currentY += 8
        doc.setDrawColor(245)
        doc.line(margin + 5, currentY, pageWidth - margin - 5, currentY)
        currentY += 10
    })

    // Totals Section
    currentY += 5
    const summaryX = pageWidth - margin - 60

    doc.setFontSize(10)
    doc.setTextColor(150)
    doc.text("SUBTOTAL", summaryX, currentY)
    doc.setTextColor(0)
    doc.text(`$${data.total.toLocaleString()}`, pageWidth - margin - 5, currentY, { align: "right" })

    // Discounts Breakdown
    if (data.bundleDiscountAmount && data.bundleDiscountAmount > 0) {
        currentY += 8
        doc.setTextColor(150)
        doc.text(`STRATEGIC BUNDLE (15%)`, summaryX, currentY)
        doc.setTextColor(0)
        doc.text(`-$${data.bundleDiscountAmount.toLocaleString()}`, pageWidth - margin - 5, currentY, { align: "right" })
    }

    if (data.couponDiscountAmount && data.couponDiscountAmount > 0) {
        currentY += 8
        doc.setTextColor(150)
        doc.text(`VOUCHER APPLIED`, summaryX, currentY)
        doc.setTextColor(0)
        doc.text(`-$${data.couponDiscountAmount.toLocaleString()}`, pageWidth - margin - 5, currentY, { align: "right" })
    }

    // Single fallback if neither specific amount is provided but total discount > 0
    if (!data.bundleDiscountAmount && !data.couponDiscountAmount && data.discountAmount > 0) {
        currentY += 8
        doc.setTextColor(150)
        doc.text(`DISCOUNT`, summaryX, currentY)
        doc.setTextColor(0)
        doc.text(`-$${data.discountAmount.toLocaleString()}`, pageWidth - margin - 5, currentY, { align: "right" })
    }

    currentY += 12
    doc.setDrawColor(0)
    doc.setLineWidth(0.5)
    doc.line(summaryX, currentY - 5, pageWidth - margin, currentY - 5)

    doc.setFont("helvetica", "bold")
    doc.setFontSize(12)
    doc.text("TOTAL DUE", summaryX, currentY + 2)
    doc.text(`$${data.discountedTotal.toLocaleString()}`, pageWidth - margin - 5, currentY + 2, { align: "right" })

    // Next Steps & Clarification Section
    currentY += 40
    doc.setDrawColor(240)
    doc.rect(margin, currentY, contentWidth, 45)

    doc.setFontSize(10)
    doc.setFont("helvetica", "bold")
    doc.text("WHAT HAPPENS NEXT?", margin + 8, currentY + 10)

    doc.setFont("helvetica", "normal")
    doc.setFontSize(9)
    doc.setTextColor(100)
    const nextSteps = [
        "1. I will review your requirements personally.",
        "2. Expect a reach-out via email within the next 24 hours.",
        "3. We will schedule a brief strategy call to finalize the scope."
    ]
    nextSteps.forEach((step, i) => {
        doc.text(step, margin + 8, currentY + 18 + (i * 6))
    })

    currentY += 55
    doc.setFontSize(8)
    doc.setFont("helvetica", "italic")
    doc.setTextColor(150)
    doc.text("NOTE: This is a digital pro-forma invoice issued for order tracking and records. It remains valid until the final tax invoice is issued upon project completion or payment milestone.", margin, currentY, { maxWidth: contentWidth })

    // Footer
    currentY = 280
    doc.setFont("helvetica", "normal")
    doc.setFontSize(9)
    doc.setTextColor(180)
    doc.text("FAMIM FARHAZ | STRATEGY-DRIVEN DEVELOPMENT", pageWidth / 2, currentY, { align: "center" })

    // Download
    doc.save(`invoice-${data.orderId}.pdf`)
}
