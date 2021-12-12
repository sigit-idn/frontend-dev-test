import { FunctionComponent } from "react"
import { Link, useMutation } from "blitz"
import logout from "app/auth/mutations/logout"

const Header: FunctionComponent = () => {
  const [logoutMutation] = useMutation(logout)
  return (
    <header className="w-full bg-white fixed">
      <menu className="flex justify-between mx-8 my-4 font-medium">
        <li>
          <Link href="/boards">Home</Link>
        </li>
        <li>
          <button onClick={async () => await logoutMutation()}>Logout</button>
        </li>
      </menu>
    </header>
  )
}

export default Header
