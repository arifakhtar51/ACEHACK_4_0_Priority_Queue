import { Search } from "lucide-react"
import { Input } from "./Input"

export const SearchBar = () => (
  <div className="relative">
    <Search className="w-4 h-4 absolute left-3  top-1/2 transform -translate-y-1/2 text-gray-400" />
    <Input className="pl-10 max-w-64 rounded-full bg-gray-100 text-black border-0" placeholder="Search" />
  </div> 
)