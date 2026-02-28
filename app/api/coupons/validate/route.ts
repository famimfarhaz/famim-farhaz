import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const code = searchParams.get('code')?.toUpperCase().trim()

        if (!code) {
            return NextResponse.json(
                { error: 'Coupon code is required' },
                { status: 400 }
            )
        }

        const { data: coupon, error } = await supabase
            .from('coupons')
            .select('*')
            .eq('code', code)
            .eq('is_active', true)
            .maybeSingle()

        if (error) {
            console.error('Supabase error:', error)
            return NextResponse.json(
                { error: 'Failed to validate coupon' },
                { status: 500 }
            )
        }

        if (!coupon) {
            return NextResponse.json(
                { valid: false, message: 'Invalid or inactive coupon code' },
                { status: 200 }
            )
        }

        // Check if expired
        if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
            return NextResponse.json(
                { valid: false, message: 'Coupon code has expired' },
                { status: 200 }
            )
        }

        return NextResponse.json({
            valid: true,
            discountPercent: coupon.discount_percent,
            code: coupon.code
        })
    } catch (error) {
        console.error('Request processing error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
