import PropTypes from 'prop-types'

export const Input = ({ className = "", ...props }) => (
    <input
      className={`w-full px-3 py-2 rounded-full text-black border border-gray-200 
      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent 
      transition-all duration-200 ${className}`}
      {...props}
    />
  )

Input.propTypes = {
  className: PropTypes.string
}