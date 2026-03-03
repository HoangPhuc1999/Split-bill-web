import { clearTokens } from '@/lib/auth/tokenStore';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
// src/lib/utils/errorHandler.ts
import { toast } from 'react-toastify';

export interface ApiError extends Error {
    status?: number;
    key?: string | null;
    data?: unknown;
}

export const handleApiError = (error: unknown, router?: AppRouterInstance) => {
    if (error && typeof error === 'object' && 'message' in error) {
        const apiError = error as ApiError;

        // Handle specific error cases
        switch (apiError.message) {
            case 'User not found':
                toast.error(
                    'Tài khoản không tồn tại. Vui lòng kiểm tra lại hoặc đăng ký tài khoản mới.'
                );
                // Don't redirect automatically - let user choose to register
                break;

            case 'Invalid credentials':
                toast.error('Tên người dùng hoặc mật khẩu không hợp lệ. Vui lòng thử lại.');
                break;

            case 'Session expired':
                toast.error('Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại.');
                clearTokens();
                if (router) {
                    router.push('/auth');
                }
                break;

            default:
                // Handle by status code if no specific message
                if (apiError.status === 401) {
                    toast.error('Xác thực không thành công. Vui lòng đăng nhập lại.');
                    clearTokens();
                    if (router) {
                        router.push('/auth');
                    }
                } else if (apiError.status === 404) {
                    toast.error('Người dùng không tồn tại.');
                } else if (apiError.status && apiError.status >= 500) {
                    toast.error('Lỗi máy chủ. Vui lòng thử lại sau.');
                } else {
                    toast.error(apiError.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
                }
        }
    } else {
        toast.error('Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.');
    }
};

export const isAuthenticationError = (error: unknown): boolean => {
    if (error && typeof error === 'object') {
        if ('status' in error && error.status === 401) return true;
        if ('message' in error) {
            const message = error.message as string;
            return (
                message.includes('not found') ||
                message.includes('Invalid credentials') ||
                message.includes('Session expired') ||
                message.includes('Not logged in')
            );
        }
    }
    return false;
};
