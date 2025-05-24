import { cn } from '@/utilities/utilities';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import NavigationMenuViewport from './NavigationMenuViewport';

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        'group/navigation-menu fixed top-0 left-4 right-4 items-center isolate max-w-4xl mx-auto my-4 rounded-4xl bg-black/40 shadow-lg ring-1 ring-black/5 backdrop-blur-sm',
        className
      )}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

export default NavigationMenu;
