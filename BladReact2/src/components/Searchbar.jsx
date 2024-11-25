"use client"

import * as React from "react"
import { Search } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export function Searchbar({ className, onSearch, searchResults = [], onSelectClub, ...props }) {
  const [query, setQuery] = React.useState("")
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (query) {
      onSearch(query);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [query, onSearch]);

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div className={cn("relative w-full max-w-xl", className)}>
      <form onSubmit={handleSubmit}>
        <Input
          type="search"
          placeholder="Search book clubs..."
          className="pr-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          {...props}
        />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
      </form>
      {open && (
        <div className="absolute w-full z-[9999]">
          <Command className="w-full mt-1 shadow-md border border-border">
            <CommandList className="max-h-[300px] overflow-y-auto">
              <CommandEmpty>No book clubs found.</CommandEmpty>
              {searchResults.map((club) => (
                <CommandItem
                  key={club.id}
                  onSelect={() => {
                    setQuery(club.name);
                    setOpen(false);
                    if (onSelectClub) onSelectClub(club);
                  }}
                >
                  <div className="flex items-center">
                    {club.imageUrl && (
                      <img 
                        src={club.imageUrl} 
                        alt={club.name} 
                        className="w-6 h-6 rounded-full mr-2"
                      />
                    )}
                    <span>{club.name}</span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({club.memberCount} members)
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  )
} 