import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import Register from './Register';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
    const actual = await vi.importActual('react-router');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

const mockRegister = vi.fn();

function renderWithContext(ui) {
    return render(
        <UserContext.Provider value={{ register: mockRegister }}>
            <MemoryRouter>{ui}</MemoryRouter>
        </UserContext.Provider>
    );
}

describe('Register component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    });

    it('should render all form fields and button', () => {
        renderWithContext(<Register />);

        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    });

    it('should show validation errors for empty fields', async () => {
        renderWithContext(<Register />);

        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

        expect(await screen.findByText(/username must be at least/i)).toBeInTheDocument();
        expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
        expect(screen.getByText(/password must be at least/i)).toBeInTheDocument();
    });

    it('should show error when passwords do not match', async () => {
        renderWithContext(<Register />);

        fireEvent.change(screen.getByLabelText(/^password$/i), {
            target: { name: 'password', value: '12345' }
        });

        fireEvent.change(screen.getByLabelText(/confirm password/i), {
            target: { name: 'rePassword', value: '54321' }
        });

        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

        expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
    });

    it('calls register with correct data on valid submit', async () => {
        renderWithContext(<Register />);

        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { name: 'username', value: 'ivan' },
        });

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { name: 'email', value: 'ivan@abv.bg' },
        });

        fireEvent.change(screen.getByLabelText(/^password$/i), {
            target: { name: 'password', value: '12345' },
        });

        fireEvent.change(screen.getByLabelText(/confirm password/i), {
            target: { name: 'rePassword', value: '12345' },
        });

        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

        await waitFor(() => {
            expect(mockRegister).toHaveBeenCalledWith('ivan', 'ivan@abv.bg', '12345', '12345');
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    })

    it('shows submit error when registration fails', async () => {
        mockRegister.mockRejectedValueOnce({ message: 'Registration failed' });

        renderWithContext(<Register />);

        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { name: 'username', value: 'testuser' },
        });

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { name: 'email', value: 'test@gmail.com' },
        });

        fireEvent.change(screen.getByLabelText(/^password$/i), {
            target: { name: 'password', value: '12345' },
        });

        fireEvent.change(screen.getByLabelText(/confirm password/i), {
            target: { name: 'rePassword', value: '12345' },
        });

        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

        expect(await screen.findByText(/registration failed/i)).toBeInTheDocument();
    })
});