
import { toast } from 'sonner';

export const handleError = (error: unknown, defaultMessage: string = 'An error occurred'): string => {
  console.error(error);
  
  if (error instanceof Error) {
    toast.error(error.message || defaultMessage);
    return error.message;
  }
  
  if (typeof error === 'string') {
    toast.error(error || defaultMessage);
    return error;
  }
  
  toast.error(defaultMessage);
  return defaultMessage;
};

export const withErrorHandling = async <T>(
  promise: Promise<T>,
  errorMessage: string = 'An error occurred',
  successMessage?: string
): Promise<T | null> => {
  try {
    const result = await promise;
    if (successMessage) {
      toast.success(successMessage);
    }
    return result;
  } catch (error) {
    handleError(error, errorMessage);
    return null;
  }
};
