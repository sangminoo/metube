import NotFound from "./Icons/NotFound";

const ErrorPage = ({
  title,
  desc,

  children,
}: {
  title: string;
  desc: string;

  children?: React.ReactNode;
}) => {
  return (
    <div>
      <div className="mx-auto h-full  w-screen pt-40 ">
        <div className="flex flex-col items-center justify-center ">
          <div className="flex items-center justify-center">
            <NotFound className="w-72" />
          </div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-xs">{desc}</p>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
