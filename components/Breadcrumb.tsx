import { Box, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  prevHref?: string;
  nextHref?: string;
}

export default function Breadcrumb({ items, prevHref, nextHref }: BreadcrumbProps) {
  return (
    <Box sx={{ mb: 3 }}>
      {/* Breadcrumb with Navigation Arrows */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* Previous Arrow */}
        {prevHref && (
          <Link href={prevHref} style={{ textDecoration: 'none' }}>
            <ChevronLeft sx={{ fontSize: 18, color: '#333333', cursor: 'pointer', '&:hover': { color: '#666666' } }} />
          </Link>
        )}

        {/* Breadcrumb Items */}
        {items.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {item.href ? (
              <Link href={item.href} style={{ textDecoration: 'none' }}>
                <Typography
                  variant="body2"
                  sx={{ color: '#333333', cursor: 'pointer', '&:hover': { color: '#666666' } }}
                >
                  {item.label}
                </Typography>
              </Link>
            ) : (
              <Typography variant="body2" sx={{ color: '#333333', fontWeight: 500 }}>
                {item.label}
              </Typography>
            )}
            {index < items.length - 1 && (
              <Typography variant="body2" sx={{ color: '#999999' }}>
                /
              </Typography>
            )}
          </Box>
        ))}

        {/* Next Arrow */}
        {nextHref && (
          <Link href={nextHref} style={{ textDecoration: 'none' }}>
            <ChevronRight sx={{ fontSize: 18, color: '#333333', cursor: 'pointer', '&:hover': { color: '#666666' } }} />
          </Link>
        )}
      </Box>
    </Box>
  );
}
