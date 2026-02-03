import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { clientName, packageName, email, phone, couponCode, requirements, packageDetails, totalPrice, orderType } = body

        // basic validation
        if (!clientName || !email || !packageDetails) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const { data, error } = await supabase
            .from('orders')
            .insert([
                {
                    client_name: clientName,
                    package_name: packageName,
                    email,
                    requirements,
                    package_details: packageDetails,
                    total_price: totalPrice,
                    order_type: orderType || 'fixed',
                    status: orderType === 'negotiation' ? 'negotiating' : 'pending',
                    contact_info: { phone, couponCode }
                }
            ])

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json(
                { error: 'Failed to create order', details: error.message },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true, message: "Order created successfully" })
    } catch (error) {
        console.error('Request processing error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
