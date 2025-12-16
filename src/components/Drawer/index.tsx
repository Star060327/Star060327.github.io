import './index.scss'
interface Props {
  children: React.ReactNode,
  title?: string,
  onClose: () => void
  visible?: boolean
  width?: string | number
  height?: string | number
  position?: 'left' | 'right' | 'top' | 'bottom'
}
export default function Drawer(props:Props) {
  const {visible,onClose,children,title} = props
  return (
    <>
      <div>
        {/* 遮罩层 */}
        {visible && <div className='drawer-mask' onClick={onClose}></div>}     
        {visible && (
          <div className="drawer"> 
          <div className="drawer-header">
            {title&&<h2>{title}</h2>}
          </div>
          <div className="drawer-body">
            {children}
          </div>
        </div>
        )}
      </div>
    </>
  )
}