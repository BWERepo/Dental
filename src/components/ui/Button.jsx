import './Button.css'

/**
 * One button, three looks. Renders a real <a> when given an href so every
 * call to action is a working link, and a <button> otherwise (e.g. the form).
 *
 * variant: 'primary' | 'secondary' | 'onDark'
 */
export default function Button({
  children,
  href,
  variant = 'primary',
  external = false,
  className = '',
  ...rest
}) {
  const classes = `btn btn--${variant} ${className}`.trim()

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
