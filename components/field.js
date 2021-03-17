import Image from 'next/image'
import styles from '../styles/Home.module.css'
export default function Field({ name, label, type, autoComplete, required, src, alt, placeholder }) {
  return (
    <div className={styles.fg}>
    <label id={[name, 'label'].join('-')} htmlFor={[name, 'input'].join('-')}>
  {label} {required ? <span title="Required"></span> : undefined}
</label>
    <div className={styles.ind}>
    <Image src={src} alt={alt} className={styles.img} width={28} height={28}/>
    <input
  autoComplete={autoComplete}
  id={[name, 'input'].join('-')}
  name={name}
  required={required}
  type={type}
  placeholder={placeholder}/>
    </div>
    </div>

  )
}
