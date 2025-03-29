import { render, screen, fireEvent } from '@testing-library/react';
import ServiceItem from './ServiceItem';
import { MemoryRouter } from 'react-router';

const navigateMock = vi.fn();

vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useNavigate: () => navigateMock
    }
});

import { useNavigate } from 'react-router';

describe('ServiceItem component', () => {
    const service = {
        _id: 'abc123',
        name: 'Deep Cleaning',
        price: 80,
        imageUrl: 'https://image.com',
        likes: [1, 2],
        dislikes: []
    };

    it('should render service data', () => {
        render(
            <MemoryRouter>
                <ServiceItem service={service} />
            </MemoryRouter>
        );

        expect(screen.getByText(/deep cleaning/i)).toBeInTheDocument();
        expect(screen.getByText(/\$80/)).toBeInTheDocument();
        expect(screen.getByAltText(/deep cleaning/i)).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should navigate on button click', () => {
        render(<ServiceItem service={service} />, { wrapper: MemoryRouter });

        fireEvent.click(screen.getByRole('button', { name: /details/i }));

        expect(navigateMock).toHaveBeenCalledWith('/services/abc123/details');
    });
});