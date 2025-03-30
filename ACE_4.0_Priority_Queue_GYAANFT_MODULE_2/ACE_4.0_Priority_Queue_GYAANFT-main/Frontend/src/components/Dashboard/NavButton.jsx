import { Button } from "../ui/Button"
import PropTypes from 'prop-types'

export const NavButton = ({ children, active }) => (
  <Button
    variant="ghost"
    size="icon"
    className={`rounded-full  w-10 h-10 ${active ? 'bg-purple-100 text-purple-600' : ''}`}
  >
    {children}
  </Button>
)

NavButton.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool
}