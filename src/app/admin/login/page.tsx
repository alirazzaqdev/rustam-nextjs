import { redirect } from 'next/navigation'
import LoginForm from '@/components/forms/LoginForm'

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>
}) {
  const { key } = await searchParams
  const accessKey = process.env.ADMIN_ACCESS_KEY

  if (accessKey && key !== accessKey) {
    redirect('/')
  }

  return <LoginForm />
}
