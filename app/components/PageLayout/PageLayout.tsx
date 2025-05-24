import NavigationMenu from '@/components/NavigationMenu/NavigationMenu';
import NavigationMenuItem from '@/components/NavigationMenu/NavigationMenuItem';
import NavigationMenuLink from '@/components/NavigationMenu/NavigationMenuLink';
import NavigationMenuList from '@/components/NavigationMenu/NavigationMenuList';
import { cn } from '@/utilities/utilities';
import { Link, useRouter } from '@tanstack/react-router';
import { Hamburger, Home, PanelTopClose, PanelTopOpen, Sun } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { Button } from '../Button/Button';
import ColorModeToggle from '../ColorModeToggle/ColorModeToggle';
import { navigationMenuTriggerStyles } from '../NavigationMenu/NavigationMenuTrigger';

type PageLayoutProps = {
  children: ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isAboveSmall = useMediaQuery('(min-width: 640px)');
  const router = useRouter();

  router.subscribe('onBeforeNavigate', () => {
    if (isNavOpen) {
      setIsNavOpen(false);
    }
  });

  useEffect(() => {
    // Close the navigation menu when the screen size changes
    if (isAboveSmall && !isNavOpen) {
      setIsNavOpen(false);
    }
  }, [isAboveSmall]);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="mr-auto">
            <NavigationMenuLink asChild className={navigationMenuTriggerStyles()} title="Home">
              <Link to="/">
                <Home />
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem className="sm:sr-only">
            <Button onClick={handleNavToggle} variant="ghost">
              {isNavOpen ? <PanelTopClose /> : <PanelTopOpen />} Menu
            </Button>
          </NavigationMenuItem>

          <NavigationMenuItem
            className={cn('max-sm:row-start-2 max-sm:col-start-2', !isNavOpen && 'max-sm:sr-only')}
          >
            <NavigationMenuLink asChild className={navigationMenuTriggerStyles()}>
              <Link to="/contrast-grid">Contrast Grid</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem
            className={cn('max-sm:row-start-3 max-sm:col-start-2', !isNavOpen && 'max-sm:sr-only')}
          >
            <NavigationMenuLink asChild className={navigationMenuTriggerStyles()}>
              <Link to="/palettes">Palettes</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem
            className={cn('max-sm:row-start-4 max-sm:col-start-2', !isNavOpen && 'max-sm:sr-only')}
          >
            <NavigationMenuLink asChild className={navigationMenuTriggerStyles()}>
              <Link to="/showcase">Showcase</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem
            className={cn('max-sm:row-start-5 max-sm:col-start-2', !isNavOpen && 'max-sm:sr-only')}
          >
            <NavigationMenuLink asChild className={navigationMenuTriggerStyles()}>
              <Link to="/libraries">Libraries</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem className="ml-auto max-sm:row-start-1 max-sm:col-start-3">
            <ColorModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <main className="mt-24">{children}</main>
    </>
  );
};

export default PageLayout;
