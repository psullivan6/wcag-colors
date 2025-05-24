import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/palettes/')({
  component: PalettesPage,
});

function PalettesPage() {
  return <div>Hello "/palettes/"!</div>;
}
