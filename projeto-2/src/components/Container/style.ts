import { styled } from 'styled-components';

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

}

const StyledContainer = styled.div<ContainerProps>`

    width: ${(props: ContainerProps) => props.width ? props.width : '100%'};
    height: ${(props: ContainerProps) => props.height ? props.height : '100%'};

    display: flex;
    flex-direction: ${(props: ContainerProps) => props.flexDirection ? props.flexDirection : 'row'};
    justify-content: ${(props: ContainerProps) => props.justifyContent ? props.justifyContent : 'center'};
    align-items: ${(props: ContainerProps) => props.alignItems ? props.alignItems : 'center'};

    background-color: ${(props: ContainerProps) => props.background ? props.background : '#ffffff'};
    color: ${(props: ContainerProps) => props.color ? props.color : '#000000'};

    border: ${(props: ContainerProps) => props.border ? props.border : 'none'};
    border-radius: ${(props: ContainerProps) => props.borderRadius ? props.borderRadius : '0'};

    box-shadow: ${(props: ContainerProps) => props.boxShadow ? props.boxShadow : 'none'};

    padding: ${(props: ContainerProps) => props.padding ? props.padding : '0'};
    margin: ${(props: ContainerProps) => props.margin ? props.margin : '0'};
    gap: ${(props: ContainerProps) => props.gap ? props.gap : '0'};

`;

export default StyledContainer;