/**
 * Green API — free WhatsApp messaging (greenapi.com)
 * Setup: register → scan QR → get idInstance + apiTokenInstance → add to env vars
 *
 * Env vars needed:
 *   GREENAPI_INSTANCE_ID   = your instance id (e.g. 1101234567)
 *   GREENAPI_API_TOKEN     = your api token
 */

function normalizePhone(phone: string): string {
  let num = phone.replace(/\D/g, '')
  if (num.startsWith('0'))  num = '92' + num.slice(1)
  if (!num.startsWith('92')) num = '92' + num
  return num
}

export async function sendWhatsApp(phone: string, message: string): Promise<boolean> {
  const idInstance = process.env.GREENAPI_INSTANCE_ID
  const apiToken   = process.env.GREENAPI_API_TOKEN

  if (!idInstance || !apiToken) return false

  const chatId = `${normalizePhone(phone)}@c.us`

  try {
    const res = await fetch(
      `https://api.greenapi.com/waInstance${idInstance}/sendMessage/${apiToken}`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ chatId, message }),
      }
    )
    return res.ok
  } catch (err) {
    console.error('[whatsapp] send failed:', err)
    return false
  }
}

// ── Message templates ──────────────────────────────────────────────────

export function msgOrderReceived(name: string, orderNumber: string, items: string, total: number, payment: string) {
  return `Assalam o Alaikum *${name}*! 🙏

Aapka order receive ho gaya hai ✅

📦 *Order #:* ${orderNumber}
🛒 *Items:* ${items || 'As discussed'}
💰 *Total:* ${total > 0 ? `PKR ${total.toLocaleString()}` : 'Quote pending'}
💳 *Payment:* ${payment}

Hamari team 2 ghantay mein aapko call karegi.

Shukriya! — *Rustam Battery & Solar Energy House*
📞 +92 321 3770402`
}

export function msgOrderConfirmed(name: string, orderNumber: string, total: number, payment: string) {
  return `Assalam o Alaikum *${name}*! 🎉

Aapka order *confirm* ho gaya hai! ✅

📦 *Order #:* ${orderNumber}
💰 *Total:* ${total > 0 ? `PKR ${total.toLocaleString()}` : 'As agreed'}
💳 *Payment:* ${payment}

Delivery ke liye hamari team jald aap sy rabta karegi.

Shukriya! — *Rustam Battery & Solar Energy House*
📞 +92 321 3770402`
}

export function msgOrderRejected(name: string, orderNumber: string, reason: string) {
  return `Assalam o Alaikum *${name}*!

Afsos, aapka order *#${orderNumber}* is waqt process nahi ho saka ❌

📝 *Wajah:* ${reason}

Madad ke liye hum se rabta karein:
📞 +92 321 3770402

— *Rustam Battery & Solar Energy House*`
}
