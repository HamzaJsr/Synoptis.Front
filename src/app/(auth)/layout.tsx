import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-brand-light">
      <div className="mb-8">
      </div>
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}
