// UI Elements showcase page
'use client';

import { useState, useEffect } from 'react';
import { Heading, Text } from '@/shared/components/typography';
import {
  Button,
  Input,
  Textarea,
  Select,
  Tag,
  Checkbox,
  Radio,
  Toggle,
  Tooltip,
  Tabs,
  Filters,
  SliderArrows,
  Icon,
} from '@/shared/components/ui';
import { ThemeToggle } from '@/shared/components/ui/ThemeToggle';
import { useTheme } from '@/shared/hooks/useTheme';
import {
  MdSearch,
  MdInfo,
  MdCalendarToday,
  MdAccessTime,
} from '@/shared/lib/icons';
import { TbCube } from 'react-icons/tb';

export default function UIElementsPage() {
  const { resolvedTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('monthly');
  const [activeFilter, setActiveFilter] = useState('all');
  const [checkbox1, setCheckbox1] = useState(false);
  const [checkbox2, setCheckbox2] = useState(true);
  const [radio, setRadio] = useState('option1');
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(true);

  // Apply theme scheme
  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === 'light') {
      root.style.setProperty('--current-scheme-text', 'var(--scheme-3-text)');
      root.style.setProperty('--current-scheme-background', 'var(--scheme-3-background)');
      root.style.setProperty('--current-scheme-foreground', 'var(--scheme-3-foreground)');
      root.style.setProperty('--current-scheme-border', 'var(--scheme-3-border)');
      root.style.setProperty('--current-scheme-accent', 'var(--scheme-3-accent)');
    } else {
      root.style.setProperty('--current-scheme-text', 'var(--scheme-2-text)');
      root.style.setProperty('--current-scheme-background', 'var(--scheme-2-background)');
      root.style.setProperty('--current-scheme-foreground', 'var(--scheme-2-foreground)');
      root.style.setProperty('--current-scheme-border', 'var(--scheme-2-border)');
      root.style.setProperty('--current-scheme-accent', 'var(--scheme-2-accent)');
    }
  }, [resolvedTheme]);

  // Icon components using Material Icons
  const DotIcon = () => <Icon icon={TbCube} size={16} className="text-[var(--current-scheme-text)]" />;
  const CubeIcon = () => <Icon icon={TbCube} size={20} className="text-[var(--current-scheme-text)]" />;
  const InfoIcon = () => <Icon icon={MdInfo} size={16} className="text-[var(--current-scheme-text)]/70" />;
  const CalendarIcon = () => <Icon icon={MdCalendarToday} size={16} className="text-[var(--current-scheme-text)]/70" />;
  const SearchIcon = () => <Icon icon={MdSearch} size={16} className="text-[var(--current-scheme-text)]/70" />;
  const ClockIcon = () => <Icon icon={MdAccessTime} size={16} className="text-[var(--current-scheme-text)]/70" />;

  return (
    <div className="p-8 space-y-16 min-h-screen" style={{ backgroundColor: 'var(--current-scheme-background)' }}>
      <section className="flex items-center justify-between">
        <Heading variant="h1" style={{ color: 'var(--current-scheme-text)' }}>
          UI ELEMENTS
        </Heading>
        <ThemeToggle />
      </section>

      {/* BUTTONS */}
      <section>
        <Heading variant="h2" style={{ color: 'var(--current-scheme-text)', marginBottom: '2rem' }}>
          BUTTONS
        </Heading>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="primary">Button</Button>
            <Button variant="secondary">Button</Button>
            <Button variant="secondary">Button</Button>
            <Button variant="secondary">Button</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary">Button</Button>
            <Button variant="secondary">Button</Button>
            <Button variant="secondary">Button</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" iconLeft={<CubeIcon />}>Button</Button>
            <Button variant="secondary" iconLeft={<CubeIcon />}>Button</Button>
            <Button variant="secondary" iconLeft={<CubeIcon />}>Button</Button>
            <Button variant="secondary" iconLeft={<CubeIcon />}>Button</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" iconRight={<CubeIcon />}>Button</Button>
            <Button variant="secondary" iconRight={<CubeIcon />}>Button</Button>
            <Button variant="secondary" iconRight={<CubeIcon />}>Button</Button>
            <Button variant="secondary" iconRight={<CubeIcon />}>Button</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" size="icon-only"><CubeIcon /></Button>
            <Button variant="secondary" size="icon-only"><CubeIcon /></Button>
            <Button variant="secondary" size="icon-only"><CubeIcon /></Button>
            <Button variant="secondary" size="icon-only"><CubeIcon /></Button>
          </div>
        </div>
      </section>

      {/* INPUTS */}
      <section>
        <Heading variant="h2" style={{ color: 'var(--scheme-2-text)', marginBottom: '2rem' }}>
          INPUTS
        </Heading>
        <div className="space-y-4 max-w-md">
          <div>
            <Text variant="small" style={{ color: 'var(--current-scheme-text)', marginBottom: '0.5rem' }}>
              TEXT INPUT
            </Text>
            <div className="space-y-3">
              <Input placeholder="Placeholder" />
              <Input placeholder="Placeholder" iconRight={<InfoIcon />} />
              <Input placeholder="Placeholder" iconLeft={<CalendarIcon />} iconRight={<InfoIcon />} />
              <Input placeholder="Search" iconLeft={<SearchIcon />} />
              <Input placeholder="Placeholder" prefix="USD" />
              <Input placeholder="www.volum.io" prefix="http://" />
            </div>
          </div>
          <div>
            <Text variant="small" style={{ color: 'var(--current-scheme-text)', marginBottom: '0.5rem' }}>
              TEXT AREA
            </Text>
            <Textarea rows={4} placeholder="Type your message..." />
          </div>
        </div>
      </section>

      {/* SELECT */}
      <section>
        <Heading variant="h2" style={{ color: 'var(--scheme-2-text)', marginBottom: '2rem' }}>
          SELECT
        </Heading>
        <div className="space-y-3 max-w-md">
          <Select>
            <option>Select one...</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </Select>
          <Select iconLeft={<ClockIcon />}>
            <option>Select one...</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </Select>
        </div>
      </section>

      {/* TAGS */}
      <section>
        <Heading variant="h2" style={{ color: 'var(--scheme-2-text)', marginBottom: '2rem' }}>
          TAGS
        </Heading>
        <div className="flex flex-wrap gap-2">
          <Tag>Category</Tag>
          <Tag onRemove={() => {}}>Category</Tag>
          <Tag>Category</Tag>
          <Tag onRemove={() => {}}>Category</Tag>
        </div>
      </section>

      {/* CHECKBOXES */}
      <section>
        <Heading variant="h2" style={{ color: 'var(--scheme-2-text)', marginBottom: '2rem' }}>
          CHECKBOXES
        </Heading>
        <div className="space-y-4">
          <div>
            <Text variant="small" style={{ color: 'var(--current-scheme-text)', marginBottom: '1rem' }}>
              Basic Checkboxes
            </Text>
            <div className="flex gap-4">
              <Checkbox />
              <Checkbox checked />
            </div>
          </div>
          <div>
            <Text variant="small" style={{ color: 'var(--current-scheme-text)', marginBottom: '1rem' }}>
              Checkbox Cards
            </Text>
            <div className="space-y-3 max-w-md">
              <Checkbox
                card
                icon={<CubeIcon />}
                label="Checkbox"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                checked={checkbox1}
                onChange={(e) => setCheckbox1(e.target.checked)}
              />
              <Checkbox
                card
                icon={<CubeIcon />}
                label="Checkbox"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                checked={checkbox2}
                onChange={(e) => setCheckbox2(e.target.checked)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* RADIOS */}
      <section>
        <Heading variant="h2" style={{ color: 'var(--scheme-2-text)', marginBottom: '2rem' }}>
          RADIOS
        </Heading>
        <div className="space-y-4">
          <div>
            <Text variant="small" style={{ color: 'var(--current-scheme-text)', marginBottom: '1rem' }}>
              Basic Radios
            </Text>
            <div className="flex gap-4">
              <Radio name="basic" />
              <Radio name="basic" checked />
            </div>
          </div>
          <div>
            <Text variant="small" style={{ color: 'var(--current-scheme-text)', marginBottom: '1rem' }}>
              Radio Button Cards
            </Text>
            <div className="space-y-3 max-w-md">
              <Radio
                card
                icon={<CubeIcon />}
                label="Radio button"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                name="card"
                value="option1"
                checked={radio === 'option1'}
                onChange={(e) => setRadio(e.target.value)}
              />
              <Radio
                card
                icon={<CubeIcon />}
                label="Radio button"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                name="card"
                value="option2"
                checked={radio === 'option2'}
                onChange={(e) => setRadio(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Text variant="small" style={{ color: 'var(--current-scheme-text)', marginBottom: '1rem' }}>
              Segmented Radio Buttons
            </Text>
            <div className="flex gap-2">
              <Button variant="secondary">Website design</Button>
              <Button variant="primary">Website design</Button>
            </div>
          </div>
        </div>
      </section>

      {/* TOGGLES */}
      <section>
        <Heading variant="h2" style={{ color: 'var(--scheme-2-text)', marginBottom: '2rem' }}>
          TOGGLES
        </Heading>
        <div className="space-y-4">
          <div>
            <Text variant="small" style={{ color: 'var(--current-scheme-text)', marginBottom: '1rem' }}>
              Basic Toggles
            </Text>
            <div className="flex gap-4">
              <Toggle checked={toggle1} onChange={(e) => setToggle1(e.target.checked)} />
              <Toggle checked={toggle2} onChange={(e) => setToggle2(e.target.checked)} />
            </div>
          </div>
          <div>
            <Text variant="small" style={{ color: 'var(--current-scheme-text)', marginBottom: '1rem' }}>
              Toggle Checkbox Cards
            </Text>
            <div className="space-y-3 max-w-md">
              <Toggle
                card
                label="Toggle checkbox"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim."
                checked={toggle1}
                onChange={(e) => setToggle1(e.target.checked)}
              />
              <Toggle
                card
                label="Toggle checkbox"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim."
                checked={toggle2}
                onChange={(e) => setToggle2(e.target.checked)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* TOOLTIPS */}
      <section>
        <Heading variant="h2" style={{ color: 'var(--scheme-2-text)', marginBottom: '2rem' }}>
          TOOLTIPS
        </Heading>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." position="top">
              <button className="w-10 h-10 rounded-full bg-[var(--current-scheme-foreground)] flex items-center justify-center">
                <DotIcon />
              </button>
            </Tooltip>
            <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." position="right">
              <button className="w-10 h-10 rounded-full bg-[var(--current-scheme-foreground)] flex items-center justify-center">
                <DotIcon />
              </button>
            </Tooltip>
          </div>
          <div className="flex gap-4">
            <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." position="bottom">
              <button className="w-10 h-10 rounded-full bg-[var(--current-scheme-foreground)] flex items-center justify-center">
                <DotIcon />
              </button>
            </Tooltip>
            <Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit." position="left">
              <button className="w-10 h-10 rounded-full bg-[var(--current-scheme-foreground)] flex items-center justify-center">
                <DotIcon />
              </button>
            </Tooltip>
          </div>
          <div className="flex gap-4">
            <Tooltip
              title="Tooltip Title"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Find out more"
              position="bottom"
            >
              <button className="w-10 h-10 rounded-full bg-[var(--current-scheme-foreground)] flex items-center justify-center">
                <DotIcon />
              </button>
            </Tooltip>
            <Tooltip
              title="Tooltip Title"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Find out more"
              position="right"
            >
              <button className="w-10 h-10 rounded-full bg-[var(--current-scheme-foreground)] flex items-center justify-center">
                <DotIcon />
              </button>
            </Tooltip>
          </div>
        </div>
      </section>

      {/* SLIDER ARROWS */}
      <section>
        <Heading variant="h2" style={{ color: 'var(--scheme-2-text)', marginBottom: '2rem' }}>
          SLIDER ARROWS
        </Heading>
        <SliderArrows onPrev={() => {}} onNext={() => {}} />
      </section>

      {/* TABS */}
      <section>
        <Heading variant="h2" style={{ color: 'var(--scheme-2-text)', marginBottom: '2rem' }}>
          TABS
        </Heading>
        <Tabs
          items={[
            { id: 'monthly', label: 'Monthly' },
            { id: 'yearly', label: 'Yearly' },
          ]}
          activeId={activeTab}
          onChange={setActiveTab}
        />
      </section>

      {/* FILTERS */}
      <section>
        <Heading variant="h2" style={{ color: 'var(--scheme-2-text)', marginBottom: '2rem' }}>
          FILTERS
        </Heading>
        <Filters
          items={[
            { id: 'all', label: 'View all' },
            { id: 'cat1', label: 'Category one' },
            { id: 'cat2', label: 'Category two' },
            { id: 'cat3', label: 'Category three' },
            { id: 'cat4', label: 'Category four' },
          ]}
          activeId={activeFilter}
          onChange={setActiveFilter}
        />
      </section>
    </div>
  );
}
