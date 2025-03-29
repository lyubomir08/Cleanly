import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ServiceCreate from './ServiceCreate';

vi.mock('../../../services/serviceService', () => ({
    createService: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    }
});

import { createService } from '../../../services/serviceService';

describe('ServiceCreate component', () => {
    it('should render all form inputs and button', () => {
        render(<ServiceCreate />, { wrapper: MemoryRouter });

        expect(screen.getByLabelText(/service name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/image url/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create service/i })).toBeInTheDocument();
    });

    it('should show validation errors on invalid input', async () => {
        render(<ServiceCreate />, { wrapper: MemoryRouter });

        fireEvent.click(screen.getByRole('button', { name: /create service/i }));

        expect(await screen.findByText(/service name must be at least/i)).toBeInTheDocument();
        expect(screen.getByText(/description must be at least/i)).toBeInTheDocument();
        expect(screen.getByText(/price must be a number/i)).toBeInTheDocument();
        expect(screen.getByText(/image url must start/i)).toBeInTheDocument();
    });

    it('should call createService with valid data and navigates', async () => {
        createService.mockResolvedValueOnce();

        render(<ServiceCreate />, { wrapper: MemoryRouter });

        fireEvent.change(screen.getByLabelText(/service name/i), {
            target: { name: 'name', value: 'Test Service' }
        });
        fireEvent.change(screen.getByLabelText(/description/i), {
            target: { name: 'description', value: 'This is a long enough description' }
        });
        fireEvent.change(screen.getByLabelText(/price/i), {
            target: { name: 'price', value: '50' }
        });
        fireEvent.change(screen.getByLabelText(/image url/i), {
            target: { name: 'imageUrl', value: 'http://example.com/image.jpg' }
        });

        fireEvent.click(screen.getByRole('button', { name: /create service/i }));

        await waitFor(() => {
            expect(createService).toHaveBeenCalledWith({
                name: 'Test Service',
                description: 'This is a long enough description',
                price: '50',
                imageUrl: 'http://example.com/image.jpg'
            });

            expect(mockNavigate).toHaveBeenCalledWith('/services');
        });
    });

    it('should show submit error if service creation fails', async () => {
        createService.mockRejectedValueOnce({ message: 'Failed to create service' });

        render(<ServiceCreate />, { wrapper: MemoryRouter });

        fireEvent.change(screen.getByLabelText(/service name/i), {
            target: { name: 'name', value: 'Valid Name' }
        });
        fireEvent.change(screen.getByLabelText(/description/i), {
            target: { name: 'description', value: 'Valid description text' }
        });
        fireEvent.change(screen.getByLabelText(/price/i), {
            target: { name: 'price', value: '10' }
        });
        fireEvent.change(screen.getByLabelText(/image url/i), {
            target: { name: 'imageUrl', value: 'http://example.com/image.jpg' }
        });

        fireEvent.click(screen.getByRole('button', { name: /create service/i }));

        expect(await screen.findByText(/failed to create service/i)).toBeInTheDocument();
    });
});