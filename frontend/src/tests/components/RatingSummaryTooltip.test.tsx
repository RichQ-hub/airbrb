import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import RatingSummaryTooltip from '../../components/RatingSummaryTooltip'
import { MemoryRouter } from 'react-router-dom';

describe('Rating Summary Tooltip', () => {
  it('renders tooltip when hovered', async () => {
    render(
      <MemoryRouter>
        <RatingSummaryTooltip
          listingId={1}
          height='1rem'
          rating={1}
          reviews={[]}
        />
      </MemoryRouter>
    )
    
    expect(screen.queryByRole('dialog')).toBeNull();
    fireEvent.mouseEnter(screen.getByRole('rating-summary'))
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  })

  it('closes on mouse leaving tooltip', async () => {
    render(
      <MemoryRouter>
        <RatingSummaryTooltip
          listingId={1}
          height='1rem'
          rating={1}
          reviews={[]}
        />
      </MemoryRouter>
    )
    
    expect(screen.queryByRole('dialog')).toBeNull();
    fireEvent.mouseEnter(screen.getByRole('rating-summary'))
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
    fireEvent.mouseLeave(screen.getByRole('rating-summary'));
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  })

})