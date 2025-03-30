import PropTypes from 'prop-types'

export const HeaderIcon = ({ children, className = "", onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center space-x-2 ${className}`}
  >
    {children}
  </div>
)

HeaderIcon.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
}