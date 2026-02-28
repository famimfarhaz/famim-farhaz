import React from 'react';
import { generateInvoice } from '@/lib/invoice-generator';
import { InvoiceData } from '@/lib/invoice-generator';

/**
 * A presentational component that mirrors the PDF layout.
 * It can be used on the builder page and the checkout page to give the user a preview.
 */
export const InvoiceUI: React.FC<{ data: InvoiceData }> = ({ data }) => {
    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 space-y-4 font-sans">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">FAMIM FARHAZ</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">STRATEGY &amp; DEVELOPMENT STUDIO</p>
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 text-xs font-semibold px-2 py-1 rounded">DIGITAL PRO‑FORMA</div>
            </div>

            {/* Invoice & Client Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">BILL TO</p>
                    <p className="text-gray-700 dark:text-gray-300">{data.clientName}</p>
                    <p className="text-gray-700 dark:text-gray-300">{data.email}</p>
                </div>
                <div className="text-right">
                    <p className="font-medium text-gray-800 dark:text-gray-200">INVOICE DETAILS</p>
                    <p className="text-gray-700 dark:text-gray-300">Invoice No: #{data.orderId}</p>
                    <p className="text-gray-700 dark:text-gray-300">Date: {data.date}</p>
                    {data.couponCode && <p className="text-gray-700 dark:text-gray-300">Promo: {data.couponCode}</p>}
                </div>
            </div>

            {/* Services Table */}
            <table className="w-full border-collapse mt-4">
                <thead className="bg-gray-100 dark:bg-gray-800">
                    <tr>
                        <th className="text-left p-2 text-xs text-gray-600 dark:text-gray-300">DESCRIPTION</th>
                        <th className="text-right p-2 text-xs text-gray-600 dark:text-gray-300">AMOUNT (USD)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.services.map((svc, idx) => (
                        <tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
                            <td className="p-2 text-sm text-gray-800 dark:text-gray-200">{svc.name}</td>
                            <td className="p-2 text-sm text-gray-800 dark:text-gray-200 text-right">${svc.price.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end space-x-6 text-sm">
                <div className="text-right">
                    <p className="text-gray-600 dark:text-gray-400">SUBTOTAL</p>
                    <p className="font-medium text-gray-800 dark:text-gray-200">${data.total.toLocaleString()}</p>
                    {data.discountAmount > 0 && (
                        <>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">DISCOUNT</p>
                            <p className="font-medium text-gray-800 dark:text-gray-200">-${data.discountAmount.toLocaleString()}</p>
                        </>
                    )}
                    <hr className="my-2" />
                    <p className="text-gray-600 dark:text-gray-400">TOTAL DUE</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-gray-100">${data.discountedTotal.toLocaleString()}</p>
                </div>
            </div>

            {/* Next Steps */}
            <div className="border-t pt-4">
                <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">WHAT HAPPENS NEXT?</h2>
                <ul className="list-disc list-inside text-xs text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                    <li>I will review your requirements personally.</li>
                    <li>Expect a reach‑out via email within the next 24 hours.</li>
                    <li>We will schedule a brief strategy call to finalize the scope.</li>
                </ul>
                <p className="mt-2 text-xs italic text-gray-500 dark:text-gray-400">
                    NOTE: This is a digital pro‑forma invoice issued for order tracking and records. It remains valid until the final tax invoice is issued upon project completion or payment milestone.
                </p>
            </div>

            {/* Download Button */}
            <div className="flex justify-end">
                <button
                    onClick={() => generateInvoice(data)}
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
                >
                    Download PDF
                </button>
            </div>
        </div>
    );
};
