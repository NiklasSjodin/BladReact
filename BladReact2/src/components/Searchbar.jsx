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

export function Searchbar({ 
  className, 
  onSearch, 
  searchResults = [], 
  onSelectItem,
  searchType = 'all', // Can be 'all', 'clubs', 'books', 'booklists'
  placeholder = "Search...",
  ...props 
}) {
  const [query, setQuery] = React.useState("")
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (query) {
      onSearch(query, searchType);
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [query, onSearch, searchType]);

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  const renderSearchResult = (item) => {
    switch (searchType) {
      case 'clubs':
        return (
          <div className="flex items-center">
            {item.imageUrl && (
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-6 h-6 rounded-full mr-2"
              />
            )}
            <span>{item.name}</span>
            <span className="ml-2 text-sm text-muted-foreground">
              ({item.memberCount} members)
            </span>
          </div>
        )
      case 'books':
        return (
          <div className="flex items-center">
            {item.imageUrl && (
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-6 h-6 rounded-full mr-2"
              />
            )}
            <span>{item.name}</span>
            <span className="ml-2 text-sm text-muted-foreground">
              ({item.author})
            </span>
          </div>
        )
      case 'booklists':
        return (
          <div className="flex items-center">
            {item.imageUrl && (
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-6 h-6 rounded-full mr-2"
              />
            )}
            <span>{item.name}</span>
            <span className="ml-2 text-sm text-muted-foreground">
              ({item.bookCount} books)
            </span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={cn("relative w-full max-w-xl rounded-[20px]", className)}>
      <form onSubmit={handleSubmit}>
        <Input
          type="search"
          placeholder={placeholder}
          className="pr-10 rounded-[20px]"
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
              <CommandEmpty>No {searchType} found.</CommandEmpty>
              {searchResults.map((item) => (
                <CommandItem
                  key={item.id}
                  onSelect={() => {
                    setQuery(item.name);
                    setOpen(false);
                    if (onSelectItem) onSelectItem(item);
                  }}
                >
                  {renderSearchResult(item)}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  )
} 