import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import ServiceEdit from './ServiceEdit';

vi.mock('../../../services/serviceService', () => ({
    getServiceById: vi.fn(),
    updateService: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router')
    return {
        ...actual,
        useParams: () => ({ id: '123' }),
        useNavigate: () => mockNavigate,
    }
});

import { getServiceById, updateService } from '../../../services/serviceService';

describe('ServiceEdit component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    });

    it('should show loading spinner initially', async () => {
        getServiceById.mockImplementation(() => new Promise(() => { }));

        render(<ServiceEdit />, { wrapper: MemoryRouter });

        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    it('should show error if loading service fails', async () => {
        getServiceById.mockRejectedValueOnce({ message: 'Failed to fetch service' });

        render(<ServiceEdit />, { wrapper: MemoryRouter });

        expect(await screen.findByText(/failed to fetch/i)).toBeInTheDocument();
    });

    it('should display form with loaded data', async () => {
        getServiceById.mockResolvedValueOnce({
            name: 'Test Service',
            description: 'Test description',
            price: '100',
            imageUrl: 'http://example.com/image.jpg'
        });

        render(<ServiceEdit />, { wrapper: MemoryRouter });

        expect(await screen.findByDisplayValue('Test Service')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Test description')).toBeInTheDocument();
        expect(screen.getByDisplayValue('100')).toBeInTheDocument();
        expect(screen.getByDisplayValue('http://example.com/image.jpg')).toBeInTheDocument();
    });

    it('should show validation errors for invalid input', async () => {
        getServiceById.mockResolvedValueOnce({
            name: '',
            description: '',
            price: '',
            imageUrl: ''
        });

        render(<ServiceEdit />, { wrapper: MemoryRouter });

        fireEvent.click(await screen.findByRole('button', { name: /save changes/i }));

        expect(await screen.findByText(/name must be at least/i)).toBeInTheDocument();
        expect(screen.getByText(/description must be at least/i)).toBeInTheDocument();
        expect(screen.getByText(/price must be a number/i)).toBeInTheDocument();
    });

    it('should call updateService and navigates on valid submit', async () => {
        getServiceById.mockResolvedValueOnce({
            name: 'Test Service',
            description: 'Valid description',
            price: '99',
            imageUrl: 'http://img.com'
        });

        updateService.mockResolvedValueOnce();

        render(<ServiceEdit />, { wrapper: MemoryRouter });

        const nameInput = await screen.findByLabelText(/service name/i);
        fireEvent.change(nameInput, {
            target: { name: 'name', value: 'Updated Name' }
        });

        fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

        await waitFor(() => {
            expect(updateService).toHaveBeenCalledWith('123', expect.objectContaining({
                name: 'Updated Name'
            }));
            expect(mockNavigate).toHaveBeenCalledWith('/services/123/details');
        });
    });

    it('should show submit error if update fails', async () => {
        getServiceById.mockResolvedValueOnce({
            name: 'Valid Name',
            description: 'Valid description',
            price: '10',
            imageUrl: 'http://url.com'
        });
        updateService.mockRejectedValueOnce({ message: 'Update failed' });

        render(<ServiceEdit />, { wrapper: MemoryRouter });

        fireEvent.click(await screen.findByRole('button', { name: /save changes/i }));

        expect(await screen.findByText(/update failed/i)).toBeInTheDocument();
    });

    it('should navigate on cancel button click', async () => {
        getServiceById.mockResolvedValueOnce({
            name: 'Test',
            description: 'Test description',
            price: '100',
            imageUrl: 'http://example.com/image.jpg'
        });

        render(<ServiceEdit />, { wrapper: MemoryRouter });

        fireEvent.click(await screen.findByRole('button', { name: /cancel/i }));

        expect(mockNavigate).toHaveBeenCalledWith('/services/123/details');
    });
});