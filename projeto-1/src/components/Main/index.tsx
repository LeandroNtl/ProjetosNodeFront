import StyledMain from "./style";


interface MainProps {
    children: React.ReactNode;
};

const Main = ({ children }: MainProps) => {

    return (
        <StyledMain>
            {children}
        </StyledMain>
    );

};

export default Main;