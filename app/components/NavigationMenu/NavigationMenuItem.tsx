import { cn } from '@/utilities/utilities';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ComponentProps } from 'react';

function NavigationMenuItem({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item text-white"
      className={cn('relative', className)}
      {...props}
    />
  );
}

export default NavigationMenuItem;
