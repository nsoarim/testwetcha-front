import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Nav from '../../components/Nav/Nav';
import SearchList from '../Search/SearchList';

function Main() {
  return (
    <div>
      <Nav />
      <SearchList />
      <Footer />
    </div>
  );
}
export default Main;
