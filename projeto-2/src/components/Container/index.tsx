import StyledContainer from './style';

interface ContainerProps {
    
    width?: string;
    height?: string;

    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;

    background?: string;
    color?: string;

    border?: string;
    borderRadius?: string;
    boxShadow?: string;

    padding?: string;
    margin?: string;
    gap?: string;

    children: React.ReactNode;

}


const Container = ({ children, ...props }: ContainerProps) => {

    return (

        <StyledContainer {...props}>
            {children}
        </StyledContainer>
        
    );

};

export default Container;
