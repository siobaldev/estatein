import { toast } from "sonner";
import {
  CheckCircleIcon,
  WarningOctagonIcon,
  InfoIcon,
  SpinnerIcon,
} from "@phosphor-icons/react/ssr";

interface CustomToastProps {
  title: string;
  description?: string;
  type: "success" | "error" | "loading" | "info";
}

const CustomToast = ({ title, description, type }: CustomToastProps) => {
  // Icon map based on toast type
  const icons = {
    success: (
      <CheckCircleIcon
        weight="fill"
        className="size-5 text-(--color-toast-icon) md:size-6 lg:size-7 xl:size-8"
      />
    ),
    error: (
      <WarningOctagonIcon
        weight="fill"
        className="size-5 text-(--color-toast-icon) md:size-6 lg:size-7 xl:size-8"
      />
    ),
    loading: (
      <SpinnerIcon className="size-5 animate-spin text-(--color-toast-icon) md:size-6 lg:size-7 xl:size-8" />
    ),
    info: (
      <InfoIcon
        weight="fill"
        className="size-5 text-(--color-toast-icon) md:size-6 lg:size-7 xl:size-8"
      />
    ),
  };

  return (
    // Main toast container - data-toast is used for styling per type
    <div
      data-toast={type}
      className="flex max-w-150 items-center gap-x-2.5 rounded-lg border border-(--color-toast-border) p-4 shadow-lg select-none lg:p-6"
      style={{ background: "var(--color-toast-bg)" }}
    >
      {/* Icon section */}
      <div className="mt-0.5 shrink-0">{icons[type]}</div>

      {/* Text content */}
      <div className="min-w-0 flex-1">
        <p className="text-body font-semibold text-(--color-toast-icon)">
          {title}
        </p>

        {/* Show description only if provided */}
        {description && (
          <p className="text-foreground mt-1 text-sm font-medium xl:text-base">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

// Helper object to trigger different toast types
export const showCustomToast = {
  // Success toast
  success: (
    title: string,
    description?: string,
    options?: { id?: string | number; duration?: number },
  ) => {
    return toast.custom(
      () => (
        <CustomToast title={title} description={description} type="success" />
      ),
      options,
    );
  },

  // Error toast
  error: (
    title: string,
    description?: string,
    options?: { id?: string | number; duration?: number },
  ) => {
    return toast.custom(
      () => (
        <CustomToast title={title} description={description} type="error" />
      ),
      options,
    );
  },

  // Loading toast
  loading: (
    title: string,
    description?: string,
    options?: { id?: string | number; duration?: number },
  ) => {
    return toast.custom(
      () => (
        <CustomToast title={title} description={description} type="loading" />
      ),
      options,
    );
  },

  // Info toast
  info: (
    title: string,
    description?: string,
    options?: { id?: string | number; duration?: number },
  ) => {
    return toast.custom(
      () => <CustomToast title={title} description={description} type="info" />,
      options,
    );
  },
};
