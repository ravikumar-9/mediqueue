import * as React from 'react'
import { Input } from './input'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils' // or your own className merge helper

interface Props extends React.ComponentProps<'input'> {
  Icon: LucideIcon
}

const InputWithIcon = React.forwardRef<HTMLInputElement, Props>(
  ({ Icon, className, ...rest }, ref) => {
    return (
      <div className="relative flex items-center">
        <Icon
          className="absolute left-2 h-5 w-5 text-muted-foreground pointer-events-none"
        />
        <Input
          ref={ref}
          {...rest}
          className={cn('pl-9 h-10', className)}
        />
      </div>
    )
  }
)

InputWithIcon.displayName = 'InputWithIcon'

export default InputWithIcon
