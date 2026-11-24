
const AuthContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='min-h-fit mt-5 h-full flex items-center justify-center px-4'>{children}</div>
  )
}

export default AuthContainer