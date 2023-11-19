import MainContainer from "./style"

interface MainProps {
    children: React.ReactNode;
}

const Main = ({ children }: MainProps) => {

    return (

        <MainContainer>
            {children}
        </MainContainer>
        
    );

};

export default Main;