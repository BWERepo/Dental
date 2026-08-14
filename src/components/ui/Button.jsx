import Icon from './Icon'
import './Button.css'

/**
 * One button, five looks. Renders a real <a> when given an href so every
 * call to action is a working link, and a <button> otherwise (e.g. the form).
 *
 * variant: 'primary' | 'secondary' | 'soft' | 'whatsapp' | 'onDark'
 * icon:    any name from components/ui/Icon.jsx, drawn before the label
 */
export default function Button({
  children,
  href,
  variant = 'primary',
  icon,
  external = false,
  className = '',
  ...rest
}) {
  const classes = `btn btn--${variant} ${className}`.trim()
  const content = (
    <>
      {icon && <Icon name={icon} />}
      {children}
    </>
  )

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  )
}
