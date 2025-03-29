import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import ServiceCatalog from './ServiceCatalog'

vi.mock('../../../services/serviceService', () => ({
    getAllServices: vi.fn(),
    filterServices: vi.fn(),
}));

import { getAllServices, filterServices } from '../../../services/serviceService';

describe('ServiceCatalog component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    });

    it('should render filter inputs and button', () => {
        render(<ServiceCatalog />, { wrapper: MemoryRouter });

        expect(screen.getByPlaceholderText(/search by name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/min price/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/max price/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /apply filters/i })).toBeInTheDocument();
    });

    it('should call getAllServices on mount', async () => {
        getAllServices.mockResolvedValueOnce([]);

        render(<ServiceCatalog />, { wrapper: MemoryRouter });

        await waitFor(() => {
            expect(getAllServices).toHaveBeenCalled();
        });
    });

    it('should show error on load failure', async () => {
        getAllServices.mockRejectedValueOnce({ message: 'Failed to load' });

        render(<ServiceCatalog />, { wrapper: MemoryRouter });

        expect(await screen.findByText(/failed to load/i)).toBeInTheDocument();
    });

    it('should show "no services found" if response is empty', async () => {
        getAllServices.mockResolvedValueOnce([]);

        render(<ServiceCatalog />, { wrapper: MemoryRouter });

        expect(await screen.findByText(/no services found/i)).toBeInTheDocument();
    });

    it('should display services when data is returned', async () => {
        getAllServices.mockResolvedValueOnce([
            {
                _id: '1',
                name: 'Test Service',
                price: 50,
                imageUrl: 'https://example.com/image.jpg',
                likes: [],
                dislikes: []
            }
        ]);

        render(<ServiceCatalog />, { wrapper: MemoryRouter });

        expect(await screen.findByText(/test service/i)).toBeInTheDocument();
        expect(screen.getByText(/\$50/)).toBeInTheDocument();
    })

    it('should call filterServices on form submit', async () => {
        getAllServices.mockResolvedValueOnce([]);
        filterServices.mockResolvedValueOnce([]);

        render(<ServiceCatalog />, { wrapper: MemoryRouter });

        fireEvent.change(screen.getByPlaceholderText(/min price/i), {
            target: { value: '20' }
        });

        fireEvent.click(screen.getByRole('button', { name: /apply filters/i }));

        await waitFor(() => {
            expect(filterServices).toHaveBeenCalled()
        });
    })
});