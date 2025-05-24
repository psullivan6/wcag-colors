import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/libraries/')({
  component: LibrariesPage,
});

function LibrariesPage() {
  return <div>A page with tabs for colors of each major design system</div>;
}
