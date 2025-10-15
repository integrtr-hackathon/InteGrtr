import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Home } from 'lucide-react'
import { Input } from './ui/input'

function Header({ title }) {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity"
          >
            <Home className="h-6 w-6" />
            INTEGRTR
          </button>
          {title && (
            <>
              <div className="h-6 w-px bg-border" />
              <span className="text-muted-foreground">{title}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8"
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
