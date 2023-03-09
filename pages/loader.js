import loaderStyle from '../styles/loader.module.css'

export default function loader() {
  return (
    <div className={loaderStyle.spinnerBox}>
      <div className={loaderStyle.pulseContainer}>
        <div className={[loaderStyle.pulseBubble, loaderStyle.pulseBubble1]}></div>
        <div className={[loaderStyle.pulseBubble, loaderStyle.pulseBubble2]}></div>
        <div className={[loaderStyle.pulseBubble, loaderStyle.pulseBubble3]}></div>
      </div>
    </div>
  )
}