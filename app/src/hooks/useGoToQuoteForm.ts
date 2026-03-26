import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { runScrollToQuoteFormHighlight } from '@/lib/scrollToQuoteForm';

/**
 * Scrolls to the home page quote section. With HashRouter, navigates to `/` first when needed.
 */
export function useGoToQuoteForm() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return useCallback(
    (options?: { beforeNavigate?: () => void }) => {
      options?.beforeNavigate?.();
      if (pathname !== '/') {
        navigate('/');
        window.setTimeout(() => runScrollToQuoteFormHighlight(), 300);
      } else {
        runScrollToQuoteFormHighlight();
      }
    },
    [navigate, pathname]
  );
}
