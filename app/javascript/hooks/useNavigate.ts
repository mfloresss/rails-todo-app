interface UseNavigateProps {
  basePath: string;
}

interface NavigateProps {
  to: string;
}

const useNavigate = ({ basePath }: UseNavigateProps) => {
  const navigate = ({ to }: NavigateProps) => {
    (window as Window).location = `${basePath}/${to}`;
  };

  return { navigate };
};

export { useNavigate };
