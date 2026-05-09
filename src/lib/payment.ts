import crypto from 'crypto'

/* ─────────────────────────── JazzCash ─────────────────────────── */

export interface JazzCashParams {
  merchantId: string
  password: string
  integritySalt: string
  amount: number       // PKR
  billRef: string      // unique order ref
  description: string
  returnUrl: string
  mobileNumber?: string
}

export interface JazzCashPayload {
  pp_Version: string
  pp_TxnType: string
  pp_Language: string
  pp_MerchantID: string
  pp_Password: string
  pp_TxnRefNo: string
  pp_Amount: string
  pp_TxnCurrency: string
  pp_TxnDateTime: string
  pp_BillReference: string
  pp_Description: string
  pp_TxnExpiryDateTime: string
  pp_ReturnURL: string
  pp_SecureHash: string
  ppmpf_1?: string
}

function formatDateTime(date: Date): string {
  return date.toISOString().replace(/[-:T]/g, '').slice(0, 14)
}

export function buildJazzCashPayload(params: JazzCashParams): JazzCashPayload {
  const now = new Date()
  const expiry = new Date(now.getTime() + 24 * 60 * 60 * 1000)
  const txnRef = `T${Date.now()}`
  const amountPaisa = String(Math.round(params.amount * 100))

  const fields: Record<string, string> = {
    pp_Version: '1.1',
    pp_TxnType: 'MWALLET',
    pp_Language: 'EN',
    pp_MerchantID: params.merchantId,
    pp_Password: params.password,
    pp_TxnRefNo: txnRef,
    pp_Amount: amountPaisa,
    pp_TxnCurrency: 'PKR',
    pp_TxnDateTime: formatDateTime(now),
    pp_BillReference: params.billRef,
    pp_Description: params.description,
    pp_TxnExpiryDateTime: formatDateTime(expiry),
    pp_ReturnURL: params.returnUrl,
  }
  if (params.mobileNumber) fields.ppmpf_1 = params.mobileNumber

  // Hash = SHA256(salt & sorted-values joined by &)
  const sortedKeys = Object.keys(fields).sort()
  const hashStr = params.integritySalt + '&' + sortedKeys.map((k) => fields[k]).join('&')
  const hash = crypto.createHash('sha256').update(hashStr).digest('hex').toUpperCase()

  return { ...fields, pp_SecureHash: hash } as JazzCashPayload
}

export function verifyJazzCashCallback(
  params: Record<string, string>,
  salt: string
): boolean {
  const receivedHash = params.pp_SecureHash
  const fields = { ...params }
  delete fields.pp_SecureHash

  const sortedKeys = Object.keys(fields).sort()
  const hashStr = salt + '&' + sortedKeys.map((k) => fields[k]).join('&')
  const expected = crypto.createHash('sha256').update(hashStr).digest('hex').toUpperCase()
  return receivedHash === expected
}

export const JAZZCASH_URL =
  process.env.JAZZCASH_ENV === 'production'
    ? 'https://payments.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction'
    : 'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/Payment/DoTransaction'

/* ─────────────────────────── EasyPaisa ─────────────────────────── */

export interface EasyPaisaParams {
  storeId: string
  hashKey: string
  amount: number
  orderRef: string
  mobileNumber: string
  emailAddress: string
  returnUrl: string
}

export function buildEasyPaisaPayload(params: EasyPaisaParams) {
  const timestamp = Date.now().toString()
  const hashStr = `${params.storeId}${params.amount.toFixed(2)}${params.orderRef}${params.mobileNumber}${params.emailAddress}${params.returnUrl}${timestamp}${params.hashKey}`
  const hash = crypto.createHash('sha256').update(hashStr).digest('hex')

  return {
    storeId: params.storeId,
    amount: params.amount.toFixed(2),
    postBackURL: params.returnUrl,
    orderRefNum: params.orderRef,
    mobileNum: params.mobileNumber,
    emailAddress: params.emailAddress,
    timeStamp: timestamp,
    signature: hash,
    encryptedHashRequest: '',
    paymentMethod: 'MA', // Mobile Account
    bank: 'TBANK',
  }
}

export const EASYPAISA_URL =
  process.env.EASYPAISA_ENV === 'production'
    ? 'https://easypaisa.com.pk/easypay/Index.jsf'
    : 'https://easypay.easypaisa.com.pk/easypay-sandbox/Index.jsf'
