import PropTypes from 'prop-types'

export const Card = ({ children, className = "" }) => (
    <div className={`bg-black dark:bg-gray-900 text-white rounded-xl shadow-sm ${className}`}>
      {children}
    </div>
  )

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}