import { Avatar, AvatarFallback, AvatarImage } from "./Avatar"
import { useAuth0 } from "@auth0/auth0-react"
import LogoutButton from "../LogoutButton"

export const UserProfile = () => {
  const { user, isAuthenticated } = useAuth0()

  if (!isAuthenticated || !user) return null

  return (
    <div className="flex items-center space-x-2">
      <Avatar className="w-8 h-8">
        <AvatarImage src={user.picture || "/default-avatar.png"} />
        <AvatarFallback>{user.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="text-sm">
        <div>{user.name}</div>
        <div className="text-xs text-gray-700 dark:text-gray-400">{user.email}</div>
      </div>
      <div><LogoutButton/></div>
    </div>
  )
}
