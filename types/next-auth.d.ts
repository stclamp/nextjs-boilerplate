import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  export interface UserObject {
    id: string | null
    first_name: string | null
    last_name: string | null
    email: string | null
    avatar: string | null
    plan: 'free' | 'starter' | 'pro' | 'unlimited'
    period: 'Y' | 'M' | null | '3Y'
    credit: number
    is_staff: boolean
    isLoggedIn: boolean
    is_trial_end: boolean
    stripe_customer_id: string | null
    is_unlocked: boolean
    next_billing_date: string | null
    fb_user_id: string | null
    detector_credits: number
    referral: Referral
    fb_no_email: boolean
    limit_monthly: number
    limit_per_request: number
    ai_detector_monthly_limit: number
    ai_detector_per_request_limit: number
    total_word_used_current_period: number
    email_confirmed: boolean
    renewal_date_str: string | null
    next_invoice_date_timestamp: number | null
    login_provider: 'google' | 'facebook' | 'email' | null
    downgraded_to_free: boolean
    previous_paid_plan_details: PreviousPaidPlanDetails | null
    trial_ended_without_purchase: boolean
    accepted_terms: boolean
    canceled_subscription: {
      comment: string
    } | null
    plan_monthly_limit: number
    plan_per_request_limit: number
    subscription_paused: boolean
    can_pause_subscription: boolean
    subscription_resumes_at: number | null
    created_at: string
    last_login: string
    subscription_status: 'active' | 'trailing' | 'canceled'
    total_word_used_free_plan: number
    total_words_humanizer: number
    subscribed_at: string
    trial_end: string | null
    subscription_canceled: boolean
    applied_discount_code: boolean
    reactivation_count: number
    first_subscription_date: string | null
    last_cancellation_date: string | null
  }
  export interface Session extends DefaultSession {
    user: UserObject & DefaultSession['user']
    access: string
    error?: string | null
  }

  export interface User {
    user: UserObject
    access: string
    refresh: string
    expiresAt: number
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserObject
    access: string
    refresh: string
    expiresAt: number
    error?: string | null
  }
}
