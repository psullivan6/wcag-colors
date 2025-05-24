import { cn } from '@/utilities/utilities';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ComponentProps } from 'react';

function NavigationMenuList({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        'grid grid-cols-3 sm:grid-cols-[1fr_auto_auto_auto_auto_1fr] group flex-1 list-none justify-between items-center gap-3 max-w-7xl mx-auto p-3 justify-items-center',
        className
      )}
      {...props}
    />
  );
}

export default NavigationMenuList;
