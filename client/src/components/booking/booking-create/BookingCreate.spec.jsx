import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate, useParams } from 'react-router';
import BookingCreate from './BookingCreate';

vi.mock('../../../services/bookingService', () => ({
    createBooking: vi.fn(),
}));

import { createBooking } from '../../../services/bookingService';

vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useParams: () => ({ id: '123' }),
        useNavigate: () => vi.fn(),
    }
});

describe('BookingCreate component', () => {
    it('should render date and time inputs', () => {
        render(<MemoryRouter><BookingCreate /></MemoryRouter>);

        expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    });

    it('should show errors when fields are empty', async () => {
        render(<MemoryRouter><BookingCreate /></MemoryRouter>);

        fireEvent.click(screen.getByRole('button', { name: /confirm booking/i }));

        expect(await screen.findByText(/please select a date/i)).toBeInTheDocument();
        expect(await screen.findByText(/please select a time/i)).toBeInTheDocument();
    });

    it('should call createBooking with correct data', async () => {
        const mockCreate = createBooking;
        mockCreate.mockResolvedValueOnce();

        render(<MemoryRouter><BookingCreate /></MemoryRouter>);

        fireEvent.change(screen.getByLabelText(/date/i), {
            target: { value: '2025-10-01' }
        });

        fireEvent.change(screen.getByLabelText(/time/i), {
            target: { value: '14:00' },
        });

        fireEvent.click(screen.getByRole('button', { name: /confirm booking/i }));

        await waitFor(() => {
            expect(mockCreate).toHaveBeenCalledWith({
                serviceId: '123',
                date: '2025-10-01',
                time: '14:00',
            });
        });
    });

    it('displays submit error if booking fails', async () => {
        const mockCreate = createBooking;
        mockCreate.mockRejectedValueOnce({ message: 'Booking failed' });

        render(
            <MemoryRouter>
                <BookingCreate />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/date/i), {
            target: { value: '2025-05-01' },
        });

        fireEvent.change(screen.getByLabelText(/time/i), {
            target: { value: '14:00' },
        });

        fireEvent.click(screen.getByRole('button', { name: /confirm booking/i }));

        expect(await screen.findByText(/booking failed/i)).toBeInTheDocument();
    })
});
