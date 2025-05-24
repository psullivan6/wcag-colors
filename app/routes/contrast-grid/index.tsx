import { Button } from '@/components/Button/Button';
import { cn } from '@/utilities/utilities';
import { createFileRoute } from '@tanstack/react-router';
import { calcAPCA } from 'apca-w3';
import { formatHex } from 'culori';
import { ComponentPropsWithoutRef, ReactNode, use, useEffect } from 'react';
import { text } from 'stream/consumers';

export const Route = createFileRoute('/contrast-grid/')({
  component: ContrastGridPage,
});

const gridItemLabels = [
  'white',
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950',
  'black',
];

const bgClasses = {
  50: 'bg-blue-50',
  100: 'bg-blue-100',
  200: 'bg-blue-200',
  300: 'bg-blue-300',
  400: 'bg-blue-400',
  500: 'bg-blue-500',
  600: 'bg-blue-600',
  700: 'bg-blue-700',
  800: 'bg-blue-800',
  900: 'bg-blue-900',
  950: 'bg-blue-950',
  white: 'bg-white',
  black: 'bg-black',
};

const textClasses = {
  50: 'text-blue-50',
  100: 'text-blue-100',
  200: 'text-blue-200',
  300: 'text-blue-300',
  400: 'text-blue-400',
  500: 'text-blue-500',
  600: 'text-blue-600',
  700: 'text-blue-700',
  800: 'text-blue-800',
  900: 'text-blue-900',
  950: 'text-blue-950',
  white: 'text-white',
  black: 'text-black',
};

const getCSSVariableValue = (variableName: string) => {
  if (typeof window === 'undefined') {
    return null;
  }

  const element = document.documentElement; // Or any specific element

  const styles = window.getComputedStyle(element);
  const cssVariableValue = styles.getPropertyValue(variableName);

  const hexColor = formatHex(cssVariableValue.trim());

  console.log('hexColor', hexColor);

  return hexColor;
};

const getLc = (colorText: string, colorBg: string) => {
  return calcAPCA(getCSSVariableValue(colorText), getCSSVariableValue(colorBg));
};

type GridItemProps = ComponentPropsWithoutRef<'div'> & {
  children?: ReactNode;
};

const GridItem = ({ children, className, ...props }: GridItemProps) => {
  const textColor = (className?.match(/text-(\w+)-(\d+)/)?.[0] ?? '').replace('text-', 'color-');
  const bgColor = (className?.match(/bg-(\w+)-(\d+)/)?.[0] ?? '').replace('bg-', 'color-');

  const Lc = getLc(`--${textColor}`, `--${bgColor}`);

  return (
    <div
      className={cn(
        'aspect-square rounded-md flex items-center justify-center font-bold',
        className
      )}
      {...props}
    >
      {children}:{Math.round(Lc * 100) / 100}
    </div>
  );
};

function ContrastGridPage() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const fifty = getCSSVariableValue('--color-blue-50');
    const nine50 = getCSSVariableValue('--color-blue-950');

    const score = calcAPCA(fifty, nine50);

    console.log('COLOR\n', getCSSVariableValue('--color-blue-50'), fifty, nine50, score);
  }, []);

  return (
    <>
      <header className="m-4 text-center">
        <h1 className="text-2xl font-bold">Contrast Grid</h1>
        <p>columns = background color</p>
        <p>rows = text color</p>
      </header>

      <section className="max-w-4xl mx-auto mb-9">
        <h2>Misc. Notes</h2>
        <ul>
          <li>Add a toggle button in the header to use keyboard shortcuts or not</li>
          <li>
            Use the command shadcn component to render a command palette to control the font size
            and font weight ... CMD + 1 for 100 font weight; CMS + Shift + + to increment through
            the font size scale
          </li>
        </ul>
      </section>

      <section className="max-w-4xl mx-auto mb-9">
        <h2 className="text-2xl font-bold mb-4">
          <a href="https://github.com/Myndex/SAPC-APCA/blob/master/documentation/APCA_in_a_Nutshell.md#use-case--size-ranges">
            Lightness Contrast Notes
          </a>
        </h2>
        <ul className="list-disc list-inside">
          <li>
            Lc 90 • Preferred level for fluent text and columns of body text with a font no smaller
            than 18px/weight 300 or 14px/weight 400 (normal), or non-body text with a font no
            smaller than 12px/400. Also a recommended minimum for extremely thin fonts with a
            minimum of 24px at weight 200. Lc 90 is a suggested maximum for very large and bold
            fonts (greater than 36px bold), and large areas of color. Small fonts do not have a
            maximum.
          </li>
          <li>
            Lc 75 • The minimum level for columns of body text with a font no smaller than 24px/300
            weight, 18px/400, 16px/500 and 14px/700. This level may be used with non-body text with
            a font no smaller than 15px/400. Also, Lc 75 should be considered a minimum for larger
            for any larger text where readability is important.
          </li>
          <li>
            Lc 60 • The minimum level recommended for content text that is not body, column, or
            block text. In other words, text you want people to read. The minimums: no smaller than
            48px/200, 36px/300, 24px normal weight (400), 21px/500, 18px/600, 16px/700 (bold). These
            values based on the reference font Helvetica. To use these sizes as body text, add Lc
            15.
          </li>
          <li>
            Lc 45 • The minimum for larger, heavier text (36px normal weight or 24px bold) such as
            headlines, and large text that should be fluently readable but is not body text. This is
            also the minimum for pictograms with fine details, or smaller outline icons.
          </li>
          <li>
            Lc 30 • The absolute minimum for any text not listed above, including text considered as
            "spot readable". This includes placeholder text and disabled element text, and some
            non-content like a copyright bug. This is also the minimum for large/solid semantic &
            understandable non-text elements such as "mostly solid" icons or pictograms. Generally
            no less than 5.5px solid in its smallest dimension.
          </li>
          <li>
            Lc 15 • The absolute minimum for any non-semantic non-text that needs to be discernible,
            and is no less than 5px (solid) in its smallest dimension. This may include dividers,
            and in some cases large buttons or thick focus-visible outlines, but does not include
            fine details which have a higher minimum. Designers should treat anything below this
            level as invisible, as it will not be visible for many users. This minimum level should
            be avoided for any items important to the use, understanding, or interaction of the
            site.
          </li>
        </ul>
      </section>

      <div className="overflow-auto">
        <div className="p-3 grid grid-cols-14 grid-rows-14 gap-1 md:gap-2 min-w-md max-w-7xl mx-auto text-[10px] sm:text-sm">
          <>
            <GridItem />

            {gridItemLabels.map((item, index) => (
              <GridItem key={`header-row-${index}`}>{item}</GridItem>
            ))}
          </>

          {gridItemLabels.map((item, index) => (
            <>
              <GridItem key={index}>{item}</GridItem>

              {gridItemLabels.map((textColorItem, nestedIndex) => (
                <GridItem
                  key={`nested-${nestedIndex}`}
                  className={cn(bgClasses[textColorItem], textClasses[item])}
                >
                  I
                </GridItem>
              ))}
            </>
          ))}
        </div>
      </div>
    </>
  );
}
