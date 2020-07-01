import styled from 'styled-components';

const Background = styled.div`
    background-image: url(/images/hero_cover.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    height: 65vh;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-family: Circular Std;
    font-style: normal;
    font-weight: bold;
    font-size: 42px;
    line-height: 22px;

    color: #A61D24;
`;

const Hero = () => {
  return (
    <Background>
        <Title>Encuentra tu hogar en Alicante</Title>
    </Background>
  );
};
export default Hero;
