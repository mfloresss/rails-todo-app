interface UseNavigateProps {
  basePath: string;
}

interface NavigateProps {
  to?: string;
  push?: string;
}

const useNavigate = ({ basePath }: UseNavigateProps) => {
  const currentPath = window.location.pathname;

  const navigate = ({ to, push }: NavigateProps) => {
    (window as Window).location = push
      ? `${currentPath}/${push}`
      : `${basePath}/${to}`;
  };

  return { navigate, currentPath };
};

export { useNavigate };
