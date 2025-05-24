import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/showcase/')({
  component: ShowcasePage,
});

function ShowcasePage() {
  return <div>A showcase of examples using the chosen color or palette</div>;
}
