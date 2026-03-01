import { HomeConfigResponse } from '../../types/homeConfig';

export const mockHomeConfig: HomeConfigResponse = {
  version: 1,
  updated_at: '2026-03-01T10:00:00.000Z',
  blocks: [
    {
      id: 'block-banner-1',
      type: 'banner_carousel',
      data: [
        { id: 'banner-1', imageUrl: 'https://picsum.photos/id/401/1200/420' },
        { id: 'banner-2', imageUrl: 'https://picsum.photos/id/402/1200/420' },
        { id: 'banner-3', imageUrl: 'https://picsum.photos/id/403/1200/420' },
      ],
    },
    {
      id: 'block-space-1',
      type: 'spacer',
      data: { height: 10 },
    },
    {
      id: 'block-featured-shops-medical',
      type: 'featured_shops',
      title: 'Medical Shops',
      categoryId: 'medical',
      data: [
        {
          id: 'med-1',
          name: 'City Care Pharmacy',
          rating: 4.5,
          eta: '10 mins',
          imageUrl: 'https://picsum.photos/id/611/420/260',
          timing: '9:00 AM - 10:00 PM',
        },
        {
          id: 'med-2',
          name: 'Health Plus Store',
          rating: 4.4,
          eta: '15 mins',
          imageUrl: 'https://picsum.photos/id/612/420/260',
          timing: '8:30 AM - 11:00 PM',
        },
        {
          id: 'med-3',
          name: 'Apollo Generic Hub',
          rating: 4.3,
          eta: '12 mins',
          imageUrl: 'https://picsum.photos/id/613/420/260',
          timing: '9:00 AM - 9:30 PM',
        },
      ],
    },
    {
      id: 'block-featured-shops-general',
      type: 'featured_shops',
      title: 'General Stores',
      categoryId: 'general',
      data: [
        {
          id: 'gen-1',
          name: 'Daily Needs Mart',
          rating: 4.6,
          eta: '9 mins',
          imageUrl: 'https://picsum.photos/id/614/420/260',
          timing: '8:00 AM - 11:30 PM',
        },
        {
          id: 'gen-2',
          name: 'Neighborhood Kirana',
          rating: 4.2,
          eta: '11 mins',
          imageUrl: 'https://picsum.photos/id/615/420/260',
          timing: '7:30 AM - 10:30 PM',
        },
        {
          id: 'gen-3',
          name: 'Family Super Store',
          rating: 4.1,
          eta: '14 mins',
          imageUrl: 'https://picsum.photos/id/616/420/260',
          timing: '8:00 AM - 10:00 PM',
        },
      ],
    },
    {
      id: 'block-featured-shops-clothes',
      type: 'featured_shops',
      title: 'Clothes Shops',
      categoryId: 'clothes',
      data: [
        {
          id: 'clo-1',
          name: 'Fashion Lane',
          rating: 4.0,
          eta: '18 mins',
          imageUrl: 'https://picsum.photos/id/617/420/260',
          timing: '10:00 AM - 9:00 PM',
        },
        {
          id: 'clo-2',
          name: 'Urban Wear Point',
          rating: 4.3,
          eta: '20 mins',
          imageUrl: 'https://picsum.photos/id/618/420/260',
          timing: '10:30 AM - 9:30 PM',
        },
        {
          id: 'clo-3',
          name: 'Classic Outfit House',
          rating: 4.1,
          eta: '16 mins',
          imageUrl: 'https://picsum.photos/id/619/420/260',
          timing: '10:00 AM - 8:30 PM',
        },
      ],
    },
    {
      id: 'block-space-2',
      type: 'spacer',
      data: { height: 8 },
    },
  ],
};
