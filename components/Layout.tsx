import {
  Box,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  ListItemButton,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Settings,
  Logout,
  ExpandLess,
  ExpandMore,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const drawerWidth = 280;

const menuItems = [
  { label: 'Dashboard', href: '/' },
  {
    category: 'HUMAN RESOURCES',
    items: [
      { label: 'Employees', href: '/hr-payroll' },
      { label: 'Attendance', href: '/attendance' },
      { label: 'Payroll', href: '/payroll' },
    ],
  },
  {
    category: 'PROCUREMENT & VENDORS',
    items: [
      { label: 'Vendor Management', href: '/vendor-management' },
      { label: 'Purchase Orders', href: '/purchase-orders' },
      { label: 'Raw Material Supply', href: '/raw-material-supply' },
    ],
  },
  {
    category: 'INVENTORY & WAREHOUSE',
    items: [
      { label: 'Raw Materials', href: '/raw-materials' },
      { label: 'WIP & Finished Goods', href: '/wip-finished-goods' },
      { label: 'Finished Goods', href: '/finished-goods' },
    ],
  },
  {
    category: 'MANUFACTURING & PRODUCTION',
    items: [
      { label: 'Production Planning', href: '/production-planning' },
      { label: 'Work Orders', href: '/work-orders' },
      { label: 'Shop Floor Control', href: '/shop-floor-control' },
    ],
  },
  {
    category: 'SALES & DISTRIBUTION',
    items: [
      { label: 'Dealer Management', href: '/dealer-management' },
      { label: 'Sales Orders', href: '/sales-orders' },
      { label: 'Logistics & Dispatch', href: '/logistics-dispatch' },
    ],
  },
  {
    category: 'WARRANTY & SERVICE',
    items: [
      { label: 'Warranty Claims', href: '/warranty-claims' },
      { label: 'Repairs & Support', href: '/repairs-support' },
      { label: 'Customer Service', href: '/customer-service' },
    ],
  },
  {
    category: 'FINANCE & ACCOUNTS',
    items: [
      { label: 'Billing & Invoicing', href: '/billing-invoicing' },
      { label: 'Accounts Payable', href: '/accounts-payable' },
      { label: 'Costing & P&L', href: '/costing-pl' },
    ],
  },
  {
    category: 'QUALITY MANAGEMENT',
    items: [
      { label: 'IQC / IPQC / FQC', href: '/quality-control' },
      { label: 'NCR & CAPA', href: '/ncr-capa' },
      { label: 'Testing & Compliance', href: '/testing-compliance' },
    ],
  },
];

interface LayoutProps {
  children: ReactNode;
  title: string;
  drawerOpen?: boolean;
}

// Map routes to their categories - outside component
const routeToCategoryMap: { [key: string]: string } = {
  '/hr-payroll': 'HUMAN RESOURCES',
  '/attendance': 'HUMAN RESOURCES',
  '/payroll': 'HUMAN RESOURCES',
  '/vendor-management': 'PROCUREMENT & VENDORS',
  '/purchase-orders': 'PROCUREMENT & VENDORS',
  '/raw-material-supply': 'PROCUREMENT & VENDORS',
  '/raw-materials': 'INVENTORY & WAREHOUSE',
  '/wip-finished-goods': 'INVENTORY & WAREHOUSE',
  '/finished-goods': 'INVENTORY & WAREHOUSE',
  '/production-planning': 'MANUFACTURING & PRODUCTION',
  '/work-orders': 'MANUFACTURING & PRODUCTION',
  '/shop-floor-control': 'MANUFACTURING & PRODUCTION',
  '/dealer-management': 'SALES & DISTRIBUTION',
  '/sales-orders': 'SALES & DISTRIBUTION',
  '/logistics-dispatch': 'SALES & DISTRIBUTION',
  '/warranty-claims': 'WARRANTY & SERVICE',
  '/repairs-support': 'WARRANTY & SERVICE',
  '/customer-service': 'WARRANTY & SERVICE',
  '/billing-invoicing': 'FINANCE & ACCOUNTS',
  '/accounts-payable': 'FINANCE & ACCOUNTS',
  '/costing-pl': 'FINANCE & ACCOUNTS',
  '/quality-control': 'QUALITY MANAGEMENT',
  '/ncr-capa': 'QUALITY MANAGEMENT',
  '/testing-compliance': 'QUALITY MANAGEMENT',
};

export default function Layout({ children, title, drawerOpen = false }: LayoutProps) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const categoryRef = useRef<string | null>(null);

  // Initialize on mount and update only when category changes
  useEffect(() => {
    if (!router.isReady) return;
    
    const newCategory = routeToCategoryMap[router.pathname] || null;
    
    // Only update state if the category actually changed
    if (newCategory !== categoryRef.current) {
      categoryRef.current = newCategory;
      setExpandedCategory(newCategory);
    }
  }, [router.pathname, router.isReady]);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleMobileDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleMobileDrawerClose = () => {
    setMobileDrawerOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1, 
          boxShadow: 'none', 
          borderBottom: '1px solid #e0e0e0',
          width: '100%', 
          backgroundColor: '#ffffff',
          top: 0,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: { xs: 56, sm: 64 }, px: { xs: 1, sm: 2 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleMobileDrawerToggle}
                sx={{ mr: 1 }}
              >
                {mobileDrawerOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}
            <Image src="/logo-white.png" alt="Logo" width={32} height={32} />
          </Box>
          <Box sx={{ display: 'flex', gap: 1, opacity: drawerOpen ? 0 : 1, transition: 'opacity 0.3s' }}>
            <Settings sx={{ cursor: 'pointer', fontSize: { xs: 18, sm: 20 }, color: '#333333' }} />
            <Logout sx={{ cursor: 'pointer', fontSize: { xs: 18, sm: 20 }, color: '#333333' }} />
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flex: 1, mt: { xs: 7, sm: 8 } }}>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <Box 
            sx={{ 
              width: drawerWidth, 
              position: 'fixed', 
              left: 0, 
              top: { xs: 56, sm: 64 }, 
              height: 'calc(100vh - 56px)',
              overflowY: 'auto',
              pl: 2, 
              pr: 2,
              display: { xs: 'none', md: 'block' },
              borderRight: '1px solid #e0e0e0',
              backgroundColor: '#ffffff',
            }}
          >
            <SidebarContent expandedCategory={expandedCategory} toggleCategory={toggleCategory} />
          </Box>
        )}

        {/* Mobile Drawer */}
        {isMobile && (
          <Drawer
            anchor="left"
            open={mobileDrawerOpen}
            onClose={handleMobileDrawerClose}
            sx={{
              '& .MuiDrawer-paper': {
                width: '75vw',
                maxWidth: 280,
                mt: { xs: 7, sm: 8 },
              },
            }}
          >
            <SidebarContent expandedCategory={expandedCategory} toggleCategory={toggleCategory} />
          </Drawer>
        )}

        {/* Main Content */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: { xs: 1.5, sm: 2, md: 3 }, 
            display: 'flex', 
            justifyContent: 'center',
            ml: { xs: 0, md: `${drawerWidth}px` },
            width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
            overflowX: 'hidden',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

interface SidebarContentProps {
  expandedCategory: string | null;
  toggleCategory: (category: string) => void;
}

function SidebarContent({ expandedCategory, toggleCategory }: SidebarContentProps) {
  const router = useRouter();

  return (
    <List sx={{ pt: 0 }}>
      {menuItems.map((item, index) => {
        if ('href' in item) {
          // Dashboard item
          return (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem component="div" sx={{ cursor: 'pointer', color: '#333333', '&:hover': { backgroundColor: '#f5f5f5' }, py: 0.5, px: 1, minWidth: 'auto' }}>
                <ListItemText primary={item.label} primaryTypographyProps={{ variant: 'body2', sx: { color: '#333333' } }} />
              </ListItem>
            </Link>
          );
        } else {
          // Category with items
          const isExpanded = expandedCategory === item.category;
          return (
            <Box key={item.category}>
              <ListItemButton
                onClick={() => toggleCategory(item.category)}
                sx={{
                  py: 0.5,
                  px: 1,
                  mt: 1,
                  mb: 0.5,
                  backgroundColor: 'transparent !important',
                  borderRadius: '4px',
                  '&:hover': { backgroundColor: '#f5f5f5' },
                  '&.Mui-selected': { backgroundColor: 'transparent !important' },
                  '&.Mui-selected:hover': { backgroundColor: '#f5f5f5' },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: isExpanded ? 700 : 400,
                    color: isExpanded ? '#000000' : '#333333',
                    flex: 1,
                    textTransform: 'lowercase',
                    '&::first-letter': {
                      textTransform: 'uppercase',
                    },
                  }}
                >
                  {item.category}
                </Typography>
                {isExpanded ? <ExpandLess sx={{ fontSize: 18 }} /> : <ExpandMore sx={{ fontSize: 18 }} />}
              </ListItemButton>
              {isExpanded && (
                <List component="div" disablePadding>
                  {item.items.map((subItem) => (
                    <Link key={subItem.href} href={subItem.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <ListItem
                        component="div"
                        sx={{
                          cursor: 'pointer',
                          color: '#333333',
                          '&:hover': { backgroundColor: '#f5f5f5' },
                          py: 0.5,
                          px: 2,
                          minWidth: 'auto',
                        }}
                      >
                        <ListItemText primary={subItem.label} primaryTypographyProps={{ variant: 'body2', sx: { color: '#333333' } }} />
                      </ListItem>
                    </Link>
                  ))}
                </List>
              )}
            </Box>
          );
        }
      })}
    </List>
  );
}
