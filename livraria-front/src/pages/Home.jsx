import { LuBook } from 'react-icons/lu';
import '../styles/Home.css';
import LivroInfo from '../components/LivroInfo/LivroInfo';

export default function Home() {
    return (
        <div className='app-all'>
            <div className="app-title-area">
                <LuBook fontSize={55} />
                <h1 className="app-title">Livraria</h1>
            </div>
            <h2 className='app-subtitle'>Exemplo de CRUD feito com livraria</h2>
            <LivroInfo />
        </div>
    );
}