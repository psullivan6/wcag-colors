import { cn } from '@/utilities/utilities';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ComponentProps } from 'react';

function NavigationMenuLink({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        `data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground
        hover:bg-accent hover:text-accent-foreground
        focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1
        flex flex-col gap-1 text-sm transition-all outline-none [&_svg:not([class*='size-'])]:size-4`,
        className
      )}
      {...props}
    />
  );
}

export default NavigationMenuLink;
