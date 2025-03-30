import PropTypes from 'prop-types'

export const StatusBadge = ({ status }) => (
    <span className={`text-xs px-2 py-1 rounded-full ${
      status === 'completed' 
        ? 'bg-green-100 text-green-800' 
        : 'bg-yellow-100 text-yellow-800'
    }`}>
      {status === 'completed' ? 'Completed ✓' : 'Upcoming'}
    </span>
  )

StatusBadge.propTypes = {
  status: PropTypes.oneOf(['completed', 'upcoming']).isRequired
}