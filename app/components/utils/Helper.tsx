import { toast } from 'react-hot-toast';
import { AxiosResponse } from 'axios';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

function formatMonth(month: number) {
  if (month < 10) {
    return '0' + month;
  }
  return month;
}

export const getDateString = (
  startDateInput: string,
  endDateInput: string
): string => {
  let startDateString = '';
  let endDateString = '';

  if (startDateInput) {
    const startDate = new Date(startDateInput);
    const startDay = startDate.getDate();
    const startMonth = startDate.getMonth();
    const startYear = startDate.getFullYear();
    startDateString = `${startDay}.${formatMonth(startMonth)}.${startYear}`;
  }

  if (endDateInput) {
    const endDate = new Date(endDateInput);
    const endDay = endDate.getDate();
    const endMonth = endDate.getMonth();
    const endYear = endDate.getFullYear();
    endDateString = `${endDay}.${formatMonth(endMonth)}.${endYear}`;
  }

  return startDateString + ' - ' + endDateString;
};

export const updateData = async (
  submitResponse: Promise<AxiosResponse<any, any>>,
  setIsLoading: (isLoading: boolean) => void,
  t: (key: string, location: any) => string,
  onClose: () => void,
  router: AppRouterInstance,
  successMessage: string,
  onReset?: () => void
) => {
  const exceptionsLocation = { element: 'exceptions' };
  setIsLoading(true);
  console.log(submitResponse);
  try {
    submitResponse.then((response: AxiosResponse<any, any>) => {
      if (response.data?.error) {
        toast.error(t(response.data.error, exceptionsLocation));
      } else {
        toast.success(successMessage);
        onClose();
        if (onReset) {
          onReset();
        }
        router.refresh();
      }
    });
  } catch (error) {
    toast.error(
      error instanceof Error
        ? t(error.message, exceptionsLocation)
        : t('unknownError', exceptionsLocation)
    );
  } finally {
    setIsLoading(false);
  }
};
