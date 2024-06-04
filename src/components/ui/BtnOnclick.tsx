type RestartButtonProps = {
    onClick?: () => void;
    children: React.ReactNode;
};

const OnclickButton = ({ onClick,children }: RestartButtonProps) => {
    return (
        <button className="w-full text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-full text-sm px-5 py-2.5 mt-2" type="button" onClick={onClick}>
            {children}
        </button>
    );
};

export default OnclickButton;
