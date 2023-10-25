import { styled } from 'styled-components';
import Search from '../components/Search';
import Form from '../components/Form';
import Header from "../components/Header"
import CarouselPage from '../components/Carousel';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(90deg, #002F52 35%, #326589);
`

function Home() {
  return (
    <AppContainer>
      <Header/>
      <Search/>
      <CarouselPage/>
      <Form/>
    </AppContainer>
  );
}

export default Home;
