import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import Login from './Login';

function renderWithContext(ui, { loginMock } = {}) {
    return render(
        <MemoryRouter>
            <UserContext.Provider value={{ login: loginMock }}>
                {ui}
            </UserContext.Provider>
        </MemoryRouter>
    )
}

describe('Login Component', () => {
    it('should render email and password fields', () => {
        renderWithContext(<Login />, { loginMock: vi.fn() });

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('should show validation errors when fields are empty', async () => {
        renderWithContext(<Login />, { loginMock: vi.fn() });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        expect(await screen.findByText(/please enter a valid email/i)).toBeInTheDocument();
        expect(await screen.findByText(/password must be at least/i)).toBeInTheDocument();
    });

    it('should show error for invalid email domain', async () => {
        renderWithContext(<Login />, { loginMock: vi.fn() });

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { name: 'email', value: 'test@yahoo.com' }
        });

        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { name: 'password', value: '12345' }
        });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        expect(await screen.findByText(/only gmail\.com and abv\.bg emails are allowed/i)).toBeInTheDocument();
    });

    it('should show error for short password', async () => {
        renderWithContext(<Login />, { loginMock: vi.fn() });

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { name: 'email', value: 'test@gmail.com' }
        });

        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { name: 'password', value: '123' }
        });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        expect(await screen.findByText(/password must be at least/i)).toBeInTheDocument();
    });

    it('should call login with abv.bg email', async () => {
        const loginMock = vi.fn().mockResolvedValue();
        renderWithContext(<Login />, { loginMock });

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { name: 'email', value: 'user@abv.bg' }
        });

        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { name: 'password', value: '12345' }
        });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(loginMock).toHaveBeenCalledWith('user@abv,bg', '12345');
        });
    });

    it('should call login with gmail.com email', async () => {
        const loginMock = vi.fn().mockResolvedValue();
        renderWithContext(<Login />, { loginMock });

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { name: 'email', value: 'user@gmail.com' }
        });

        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { name: 'password', value: '12345' }
        });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(loginMock).toHaveBeenCalledWith('user@gmail.com', '12345');
        });
    });

    it('should show error message if login fails', async () => {
        const loginMock = vi.fn().mockRejectedValue({ message: 'Invalid email or password.' });
        renderWithContext(<Login />, { loginMock });

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { name: 'email', value: 'user@gmail.com' }
        });

        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { name: 'password', value: '12345' }
        });

        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        
        expect(await screen.findByText(/invalid email or password./i)).toBeInTheDocument();
    });
});
