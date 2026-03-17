// Icons showcase page
'use client';

import { Heading, Text } from '@/shared/components/typography';
import { Icon } from '@/shared/components/ui/Icon';
import * as Icons from '@/shared/lib/icons';

export default function IconsPage() {
  const commonIcons = [
    { name: 'Home', icon: Icons.MdHome },
    { name: 'Search', icon: Icons.MdSearch },
    { name: 'Menu', icon: Icons.MdMenu },
    { name: 'Close', icon: Icons.MdClose },
    { name: 'Add', icon: Icons.MdAdd },
    { name: 'Check', icon: Icons.MdCheck },
    { name: 'Cancel', icon: Icons.MdCancel },
    { name: 'Settings', icon: Icons.MdSettings },
    { name: 'Person', icon: Icons.MdPerson },
    { name: 'Email', icon: Icons.MdEmail },
    { name: 'Phone', icon: Icons.MdPhone },
    { name: 'Location', icon: Icons.MdLocationOn },
    { name: 'Calendar', icon: Icons.MdCalendarToday },
    { name: 'Time', icon: Icons.MdAccessTime },
    { name: 'Edit', icon: Icons.MdEdit },
    { name: 'Delete', icon: Icons.MdDelete },
    { name: 'Save', icon: Icons.MdSave },
    { name: 'Download', icon: Icons.MdDownload },
    { name: 'Upload', icon: Icons.MdUpload },
    { name: 'Share', icon: Icons.MdShare },
    { name: 'Favorite', icon: Icons.MdFavorite },
    { name: 'Star', icon: Icons.MdStar },
    { name: 'Visibility', icon: Icons.MdVisibility },
    { name: 'Lock', icon: Icons.MdLock },
    { name: 'Notifications', icon: Icons.MdNotifications },
    { name: 'Filter', icon: Icons.MdFilterList },
    { name: 'Sort', icon: Icons.MdSort },
    { name: 'More Vert', icon: Icons.MdMoreVert },
    { name: 'More Horiz', icon: Icons.MdMoreHoriz },
    { name: 'Refresh', icon: Icons.MdRefresh },
  ];

  return (
    <div className="p-8 space-y-12 min-h-screen" style={{ backgroundColor: 'var(--current-scheme-background)' }}>
      <section>
        <Heading variant="h1" style={{ color: 'var(--current-scheme-text)' }}>
          Material Icons
        </Heading>
        <Text variant="medium" className="mt-4" style={{ color: 'var(--current-scheme-text)' }}>
          Google Material Icons через react-icons
        </Text>
      </section>

      <section>
        <Heading variant="h2" style={{ color: 'var(--current-scheme-text)', marginBottom: '2rem' }}>
          Common Icons
        </Heading>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {commonIcons.map(({ name, icon }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-[var(--current-scheme-border)] bg-[var(--current-scheme-foreground)]"
            >
              <Icon icon={icon} size={24} className="text-[var(--current-scheme-text)]" />
              <Text variant="small" style={{ color: 'var(--current-scheme-text)' }}>
                {name}
              </Text>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Heading variant="h2" style={{ color: 'var(--current-scheme-text)', marginBottom: '2rem' }}>
          Usage Example
        </Heading>
        <div className="space-y-4 max-w-md">
          <div className="p-4 rounded-lg border border-[var(--current-scheme-border)] bg-[var(--current-scheme-foreground)]">
            <Text variant="small" style={{ color: 'var(--current-scheme-text)', fontFamily: 'monospace' }}>
              {`import { Icon } from '@/shared/components/ui/Icon';
import { MdHome, MdSearch } from '@/shared/lib/icons';

<Icon icon={MdHome} size={24} />
<Icon icon={MdSearch} size={20} />`}
            </Text>
          </div>
        </div>
      </section>
    </div>
  );
}
