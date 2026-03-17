// Typography showcase page
import { Heading, Text, Tagline } from '@/shared/components/typography';

export default function TypographyPage() {
  return (
    <div className="p-8 space-y-12">
      <section>
        <Heading variant="display">Display Heading</Heading>
        <Heading variant="h1">Heading 1</Heading>
        <Heading variant="h2">Heading 2</Heading>
        <Heading variant="h3">Heading 3</Heading>
        <Heading variant="h4">Heading 4</Heading>
        <Heading variant="h5">Heading 5</Heading>
        <Heading variant="h6">Heading 6</Heading>
      </section>

      <section>
        <Tagline>Tagline Text</Tagline>
      </section>

      <section className="space-y-4">
        <Text variant="large" weight="extrabold">Text Large Extra Bold</Text>
        <Text variant="large" weight="bold">Text Large Bold</Text>
        <Text variant="large" weight="semibold">Text Large Semi Bold</Text>
        <Text variant="large" weight="medium">Text Large Medium</Text>
        <Text variant="large" weight="normal">Text Large Normal</Text>
        <Text variant="large" weight="light">Text Large Light</Text>
      </section>

      <section className="space-y-4">
        <Text variant="medium" weight="extrabold">Text Medium Extra Bold</Text>
        <Text variant="medium" weight="bold">Text Medium Bold</Text>
        <Text variant="medium" weight="semibold">Text Medium Semi Bold</Text>
        <Text variant="medium" weight="medium">Text Medium Medium</Text>
        <Text variant="medium" weight="normal">Text Medium Normal</Text>
        <Text variant="medium" weight="light">Text Medium Light</Text>
      </section>

      <section className="space-y-4">
        <Text variant="regular" weight="extrabold">Text Regular Extra Bold</Text>
        <Text variant="regular" weight="bold">Text Regular Bold</Text>
        <Text variant="regular" weight="semibold">Text Regular Semi Bold</Text>
        <Text variant="regular" weight="medium">Text Regular Medium</Text>
        <Text variant="regular" weight="normal">Text Regular Normal</Text>
        <Text variant="regular" weight="light">Text Regular Light</Text>
      </section>

      <section className="space-y-4">
        <Text variant="small" weight="extrabold">Text Small Extra Bold</Text>
        <Text variant="small" weight="bold">Text Small Bold</Text>
        <Text variant="small" weight="semibold">Text Small Semi Bold</Text>
        <Text variant="small" weight="medium">Text Small Medium</Text>
        <Text variant="small" weight="normal">Text Small Normal</Text>
        <Text variant="small" weight="light">Text Small Light</Text>
      </section>

      <section className="space-y-4">
        <Text variant="tiny" weight="extrabold">Text Tiny Extra Bold</Text>
        <Text variant="tiny" weight="bold">Text Tiny Bold</Text>
        <Text variant="tiny" weight="semibold">Text Tiny Semi Bold</Text>
        <Text variant="tiny" weight="medium">Text Tiny Medium</Text>
        <Text variant="tiny" weight="normal">Text Tiny Normal</Text>
        <Text variant="tiny" weight="light">Text Tiny Light</Text>
      </section>
    </div>
  );
}
