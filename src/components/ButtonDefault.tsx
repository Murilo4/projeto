import { ButtonType } from '@/types/button'
import Link from 'next/link'

export const ButtonDefault: ButtonType = ({
  text,
  type,
  style = 'outDark',
  link = '',
  shadow,
  radius = 'rounded-2xl',
  paddingx = 'px-0',
  paddingy = 'px-0',
  tailwind,
  submit = false,
  disabled = false,
  onClick,
}) => {
  return (
    <>
      {type === 'button' && (
        <button
          className={`${style === 'outDark' && 'border-2 border-light-blue bg-white text-black hover:bg-blue'} ${style === 'light' && 'bg-white text-black hover:bg-light-blue'} text-base font-medium transition-colors active:outline active:outline-2 active:outline-light-blue900 ${shadow && 'shadow-clean shadow-light-gray250'} ${disabled && 'cursor-not-allowed'} ${radius && radius} ${tailwind && tailwind} ${paddingx} ${paddingy}`}
          type={submit ? 'submit' : 'button'}
          disabled={disabled}
          onClick={onClick}
        >
          {text}
        </button>
      )}
      {/* Other options... */}

      {type === 'link' && (
        <button
          type="button"
          disabled={disabled}
          className={`${style === 'outDark' && 'border-2 border-light-blue bg-white text-black hover:bg-blue'} ${style === 'light' && 'bg-white text-black hover:bg-light-blue'} text-base font-medium transition-colors active:outline active:outline-2 active:outline-light-blue900 ${shadow && 'shadow-clean shadow-light-gray250'} ${disabled && 'cursor-not-allowed'} ${radius && radius} ${tailwind && tailwind} ${paddingx} ${paddingy}`}
        >
          <Link href={link}>{text}</Link>
        </button>
      )}
    </>
  )
}