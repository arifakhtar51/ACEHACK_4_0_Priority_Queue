import PropTypes from 'prop-types'

export const Avatar = ({ className = "", children, ...props }) => (
    <div 
      className={`relative inline-block rounded-full overflow-hidden 
      bg-gray-200 ${className}`} 
      {...props}
    >
      {children}
    </div>
  )
  
Avatar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

export const AvatarImage = ({ src, alt = "", className = "", ...props }) => (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      {...props}
    />
  )
  
AvatarImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string
}

export const AvatarFallback = ({ className = "", children, ...props }) => (
    <div 
      className={`w-full h-full flex items-center justify-center 
      bg-gray-200 text-gray-600 font-medium ${className}`} 
      {...props}
    >
      {children}
    </div>
  )

AvatarFallback.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}