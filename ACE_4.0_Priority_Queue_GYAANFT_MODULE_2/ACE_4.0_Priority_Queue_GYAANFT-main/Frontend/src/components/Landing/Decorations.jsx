export const StarDecoration = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
  
  export const CurveDecoration = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 35C5 35 15 35 20 20C25 5 35 5 35 5" stroke="#2DD4BF" strokeWidth="2" />
    </svg>
  )
  
  export const DotDecoration = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="8" fill="#FCD34D" />
    </svg>
  )
  
  export const PlayIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2" />
      <path d="M16 12L10 15.464V8.536L16 12Z" fill="currentColor" />
    </svg>
  )
  
  export function Stars() {
    return (
      <div className="absolute top-20 right-20 animate-[spin_10s_linear_infinite]">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0L23.5 16.5L40 20L23.5 23.5L20 40L16.5 23.5L0 20L16.5 16.5L20 0Z" fill="#ADFF00" fillOpacity="0.5"/>
        </svg>
      </div>
    );
  }
  
  export function Curves() {
    return (
      <div className="absolute bottom-10 left-10 ">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 50C10 25 25 10 50 10C75 10 90 25 90 50C90 75 75 90 50 90" stroke="#ADFF00" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]"/>
        </svg>
      </div>
    );
  }
  
  export function Dots() {
    return (
      <div className="absolute top-40 right-40 animate-[float_4s_ease-in-out_infinite]">
        <div className="grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <div 
              key={i} 
              className="w-2 h-2 bg-[#ADFF00] rounded-full animate-[pulse_2s_ease-in-out_infinite]" 
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    );
  }
  
  export function HeroIcons() {
    return (
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full">
        {/* Brain Icon */}
        <div className="absolute top-10 right-20 animate-float" style={{ animationDelay: '0.5s' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#ADFF00" opacity="0.5">
            <path d="M12 2a9 9 0 0 1 9 9c0 3.03-1.53 5.82-4 7.47V22h-2v-3h-6v3H7v-3.54c-2.47-1.65-4-4.46-4-7.46a9 9 0 0 1 9-9zm-4 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
          </svg>
        </div>

        {/* Globe Icon */}
        <div className="absolute top-40 right-10 animate-float" style={{ animationDelay: '0.8s' }}>
          <svg width="35" height="35" viewBox="0 0 24 24" fill="#ADFF00" opacity="0.5">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>

        {/* Code Icon */}
        <div className="absolute bottom-20 right-20 animate-float" style={{ animationDelay: '1.2s' }}>
          <svg width="35" height="35" viewBox="0 0 24 24" fill="#ADFF00" opacity="0.5">
            <path d="M8 3a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2H3v2h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2v-2H8v-5a2 2 0 0 0-2-2 2 2 0 0 0 2-2V5h2V3H8zm8 0a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1v2h-1a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2v-2h2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5h-2V3h2z"/>
          </svg>
        </div>

        {/* Chat/Community Icon */}
        <div className="absolute bottom-40 right-10 animate-float" style={{ animationDelay: '1.5s' }}>
          <svg width="35" height="35" viewBox="0 0 24 24" fill="#ADFF00" opacity="0.5">
            <path d="M12 3c5.5 0 10 3.58 10 8s-4.5 8-10 8c-1.24 0-2.43-.18-3.53-.5C5.55 21 2 21 2 21c2.33-2.33 2.7-3.9 2.75-4.5C3.05 15.07 2 13.13 2 11c0-4.42 4.5-8 10-8z"/>
          </svg>
        </div>
      </div>
    );
  }
  
  